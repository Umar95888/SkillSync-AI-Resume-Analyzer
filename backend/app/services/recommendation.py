import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def load_datasets():
    """
    Load both job and internship datasets.
    """

    jobs = pd.read_csv("app/data/JobData.csv")
    internships = pd.read_csv("app/data/internship_data.csv")

    # Make column names consistent
    jobs.rename(columns={
        "Company_Name": "Company Name"
    }, inplace=True)

    return jobs, internships


def recommend_jobs(user_skills, top_n=10):

    jobs, _ = load_datasets()

    jobs["Skills"] = jobs["Skills"].fillna("")
    jobs["Links"] = jobs["Links"].fillna("")

    vectorizer = TfidfVectorizer()

    job_vectors = vectorizer.fit_transform(jobs["Skills"])

    user_vector = vectorizer.transform([user_skills])

    similarity = cosine_similarity(user_vector, job_vectors).flatten()

    jobs["Match Score"] = similarity

    recommendations = jobs.sort_values(
        by="Match Score",
        ascending=False
    ).head(top_n)

    return recommendations


def recommend_internships(user_skills, top_n=10):

    _, internships = load_datasets()

    internships["Skills"] = internships["Skills"].fillna("")
    internships["Website Link"] = internships["Website Link"].fillna("")

    vectorizer = TfidfVectorizer()

    internship_vectors = vectorizer.fit_transform(
        internships["Skills"]
    )

    user_vector = vectorizer.transform([user_skills])

    similarity = cosine_similarity(
        user_vector,
        internship_vectors
    ).flatten()

    internships["Match Score"] = similarity

    recommendations = internships.sort_values(
        by="Match Score",
        ascending=False
    ).head(top_n)

    return recommendations


def recommend_all(user_skills, top_n=10):

    jobs = recommend_jobs(user_skills, top_n)
    internships = recommend_internships(user_skills, top_n)

    jobs["Type"] = "Job"
    internships["Type"] = "Internship"

    # Add missing columns in Job dataset
    jobs["Location"] = "Not Available"
    jobs["Duration"] = "Full Time"

    # Rename columns
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

    # Select columns
    jobs = jobs[
        [
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
    ]

    internships = internships[
        [
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
    ]

    combined = pd.concat(
        [jobs, internships],
        ignore_index=True
    )

    combined = combined.fillna("Not Available")

    combined["Apply Link"] = combined["Apply Link"].astype(str)

    combined = combined.sort_values(
        by="Match Score",
        ascending=False
    )

    return combined.head(top_n)