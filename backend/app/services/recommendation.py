"""
=========================================================
SkillSync V2 - recommendation.py
=========================================================

Purpose
-------
This file is responsible for generating job and internship
recommendations.

Flow
----
Resume
   ↓
Extract Skills
   ↓
Fetch Live Jobs
   ↓
Calculate AI Match Score
   ↓
Sort Jobs
   ↓
Fallback to CSV (if API fails)
"""

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.services.live_jobs import search_live_jobs
from app.services.job_matcher import (
    calculate_final_score,
    why_recommended
)

# =========================================================
# Load Local Datasets
# =========================================================
def load_datasets():
    """
    Purpose:
        Load local CSV files.

    Returns:
        jobs dataframe,
        internships dataframe
    """
    jobs = pd.read_csv("app/data/JobData.csv")
    internships = pd.read_csv("app/data/internship_data.csv")
    jobs.rename(columns={"Company_Name": "Company Name"}, inplace=True)
    return jobs, internships


# =========================================================
# Recommend Jobs from CSV Dataset
# =========================================================
def recommend_jobs(user_skills, top_n=10):
    """
    Uses TF-IDF + Cosine Similarity to recommend jobs
    from the local dataset.
    """
    jobs, _ = load_datasets()

    jobs["Skills"] = jobs["Skills"].fillna("")
    jobs["Links"] = jobs["Links"].fillna("")

    vectorizer = TfidfVectorizer()
    job_vectors = vectorizer.fit_transform(jobs["Skills"])
    user_vector = vectorizer.transform([user_skills])

    jobs["Match Score"] = cosine_similarity(
        user_vector,
        job_vectors
    ).flatten()

    return jobs.sort_values(
        by="Match Score",
        ascending=False
    ).head(top_n)


# =========================================================
# Recommend Internships from CSV Dataset
# =========================================================
def recommend_internships(user_skills, top_n=10):
    """
    Uses TF-IDF + Cosine Similarity to recommend
    internships.
    """
    _, internships = load_datasets()

    internships["Skills"] = internships["Skills"].fillna("")
    internships["Website Link"] = internships["Website Link"].fillna("")

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(internships["Skills"])
    user_vector = vectorizer.transform([user_skills])

    internships["Match Score"] = cosine_similarity(
        user_vector,
        vectors
    ).flatten()

    return internships.sort_values(
        by="Match Score",
        ascending=False
    ).head(top_n)


# =========================================================
# Recommend Live Jobs
# =========================================================
def recommend_live_jobs(resume_text, resume_skills, top_n=10):
    """
    Fetch live jobs from Adzuna API and rank them using
    the AI Job Matcher.
    """

    # Search using extracted skills
    jobs = search_live_jobs(
    resume_skills,
    results=30
    )

    # If nothing found, try generic search
    if not jobs:

        jobs = search_live_jobs(
            ["Software Developer"],
            results=30
        )

    if not jobs:
        return None

    rows = []

    for job in jobs:

        # Calculate AI match for every job
        ai = calculate_final_score(
            resume_text,
            resume_skills,
            job
        )

        rows.append({
            "Title": job.get("Title", "Not Available"),
            "Company": job.get("Company", "Not Available"),
            "Location": str(
                job.get("Location", "Not Available")
            ).replace("('", "").replace("',)", ""),
            "Duration": job.get("Contract Time", "Full Time"),
            "Salary": job.get("Salary", "Not Available"),

            # Skills extracted from Job Description
            "Skills": ", ".join(ai["job_skills"]),

            # AI Matching Result
            "Match Score": ai["match_score"],
            "Matched Skills": ai["matched_skills"],
            "Missing Skills": ai["missing_skills"],

            # Human-readable explanation
            "Why Recommended": why_recommended(
                job,
                ai["matched_skills"],
                ai["missing_skills"]
            ),

            "Type": "Live Job",
            "Apply Link": job.get("Apply Link", "")
        })

    df = pd.DataFrame(rows)

    # Highest score first
    df = df.sort_values(
        by="Match Score",
        ascending=False
    )

    df.reset_index(
        drop=True,
        inplace=True
    )

    return df.head(top_n)


# =========================================================
# Final Recommendation Engine
# =========================================================
def recommend_all(resume_text, resume_skills, top_n=10):
    """
    Main function used by routes.py

    1. Try Live Jobs.
    2. If API fails, use CSV datasets.
    """

    live = recommend_live_jobs(
        resume_text,
        resume_skills,
        top_n
    )

    if live is not None and not live.empty:
        return live

    # Convert skills list into one string
    user_skills = " ".join(resume_skills)

    jobs = recommend_jobs(user_skills, top_n)
    internships = recommend_internships(user_skills, top_n)

    jobs["Type"] = "Job"
    internships["Type"] = "Internship"

    jobs["Location"] = "Not Available"
    jobs["Duration"] = "Full Time"

    jobs = jobs.rename(columns={
        "JobTitles": "Title",
        "Company Name": "Company",
        "Links": "Apply Link",
        "Stipend": "Salary"
    })

    internships = internships.rename(columns={
        "Role": "Title",
        "Company Name": "Company",
        "Website Link": "Apply Link",
        "Stipend": "Salary"
    })

    columns = [
        "Title",
        "Company",
        "Location",
        "Duration",
        "Salary",
        "Skills",
        "Match Score",
        "Type",
        "Apply Link"
    ]

    # Merge jobs + internships

    combined = pd.concat(
        [jobs[columns], internships[columns]],
        ignore_index=True
    )

    # Remove duplicate jobs
    combined.drop_duplicates(
        subset=["Title", "Company"],
        keep="first",
        inplace=True
    )

    combined.fillna("Not Available", inplace=True)

    # Clean Apply Links
    combined["Apply Link"] = (
        combined["Apply Link"]
        .fillna("")
        .astype(str)
    )

    # =========================================================
    # Clean Location Format
    # =========================================================
    combined["Location"] = (
        combined["Location"]
        .astype(str)
        .str.replace("('", "", regex=False)
        .str.replace("',)", "", regex=False)
        .str.replace('("', "", regex=False)
        .str.replace('",)', "", regex=False)
    )

    # =========================================================
    # Convert Skills String into List
    # =========================================================
    def convert_skills(skill_text):

        if not isinstance(skill_text, str):
            return []

        skill_text = (
            skill_text.replace("[", "")
            .replace("]", "")
            .replace("'", "")
            .replace('"', "")
        )

        return [
            skill.strip()
            for skill in skill_text.split(",")
            if skill.strip()
        ]

    combined["Skills"] = combined["Skills"].apply(convert_skills)
    
    # =====================================================
    # Better Ranking
    # =====================================================

    # Highest Match Score First
    combined = combined.sort_values(
        by="Match Score",
        ascending=False
    )

    # Reset Index
    combined.reset_index(
        drop=True,
        inplace=True
    )

    # Return Top Results
    return combined.head(top_n)