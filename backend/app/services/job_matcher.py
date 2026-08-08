"""
=========================================================
SkillSync V2 - AI Job Matcher
=========================================================

This module compares a user's resume with a job description
and calculates an AI Match Score.

Used by:
- recommendation.py
- routes.py

Features:
✔ Skill Matching
✔ Keyword Similarity
✔ Title Matching
✔ Experience Matching
✔ Salary Score
✔ Missing Skills
✔ Recommendation Reasons
"""

"""
=========================================================
SkillSync V3 - AI Job Matcher
=========================================================

Compares Resume with Job Description
and calculates an AI Match Score.
"""

import re
from rapidfuzz import fuzz

from app.services.skill_database import (
    SKILLS,
    SKILL_ALIASES
)

# =========================================================
# Master Skill List
# =========================================================

ALL_SKILLS = []

for category in SKILLS.values():
    ALL_SKILLS.extend(category)

ALL_SKILLS = list(set(ALL_SKILLS))


# =========================================================
# Normalize Text
# =========================================================

def normalize_text(text):

    if not text:
        return ""

    text = text.lower()

    text = re.sub(r"[^a-z0-9+#.\s]", " ", text)

    text = re.sub(r"\s+", " ", text)

    return text.strip()


# =========================================================
# Extract Skills From Job Description
# =========================================================

def extract_job_skills(job_description):

    text = normalize_text(job_description)

    found = set()

    # Original Skills
    for skill in ALL_SKILLS:

        if skill.lower() in text:

            found.add(skill)

    # Skill Aliases
    for alias, original in SKILL_ALIASES.items():

        if alias.lower() in text:

            found.add(original)

    return sorted(found)

# =========================================================
# Extract skills from Job Description
#
# Example:
# Job Description -> "Python, React, SQL"
# Output -> ["Python","React","SQL"]
# =========================================================
def extract_job_skills(job_description):
    text = normalize_text(job_description)
    found = set()

    # Search using original skill names
    for skill in ALL_SKILLS:
        if skill.lower() in text:
            found.add(skill)

    # Search using aliases
    for alias, original in SKILL_ALIASES.items():
        if alias in text:
            found.add(original)

    return sorted(found)


# =========================================================
# Calculate Skill Match
# =========================================================

def calculate_skill_match(resume_skills, job_skills):

    if not job_skills:
        return 0, []

    matched = []

    for resume_skill in resume_skills:

        for job_skill in job_skills:

            similarity = fuzz.ratio(
                resume_skill.lower(),
                job_skill.lower()
            )

            if similarity >= 85:

                matched.append(job_skill)

                break

    matched = list(set(matched))

    score = round(
        (len(matched) / len(job_skills)) * 100
    )

    return score, matched

# =========================================================
# Find skills required by the job but missing in resume
# =========================================================
def find_missing_skills(resume_skills, job_skills):
    return [s for s in job_skills if s not in resume_skills]


# =========================================================
# Compare Resume Text and Job Description using RapidFuzz
#
# Returns similarity score (0-100)
# =========================================================
def calculate_keyword_score(resume_text, job_description):
    return fuzz.token_set_ratio(
        resume_text or "",
        job_description or ""
    )


# =========================================================
# Calculate Job Title Match Score
# =========================================================

def calculate_title_score(resume_skills, title):

    title = normalize_text(title)

    score = 0

    # Resume skills present in title
    for skill in resume_skills:

        if fuzz.partial_ratio(
            skill.lower(),
            title
        ) >= 85:

            score += 12

    # Important Job Keywords
    keywords = {

        "developer": 15,
        "engineer": 15,
        "software": 12,
        "backend": 10,
        "frontend": 10,
        "full stack": 12,
        "python": 12,
        "java": 12,
        "react": 12,
        "node": 12,
        "intern": 15,
        "internship": 15,
        "fresher": 15,
        "entry level": 15,
        "machine learning": 12,
        "artificial intelligence": 12,
        "data": 10

    }

    for word, points in keywords.items():

        if word in title:

            score += points

    return min(score, 100)

# =========================================================
# Experience Score
# =========================================================

def calculate_experience_score(job_description):

    text = normalize_text(job_description)

    # Best for Students / Freshers
    if any(keyword in text for keyword in [
        "intern",
        "internship",
        "fresher",
        "freshers",
        "entry level",
        "graduate",
        "campus hiring",
        "0-1 year",
        "0 to 1 year"
    ]):
        return 100

    # Junior Roles
    if any(keyword in text for keyword in [
        "1-2 years",
        "1 to 2 years",
        "junior"
    ]):
        return 80

    # Mid Level
    if any(keyword in text for keyword in [
        "2-3 years",
        "2 to 3 years"
    ]):
        return 60

    # Senior
    if any(keyword in text for keyword in [
        "3-5 years",
        "5+ years",
        "senior",
        "lead"
    ]):
        return 30

    return 70

# =========================================================
# Salary Score
# =========================================================

def calculate_salary_score(job):

    salary = str(job.get("Salary", "")).lower()

    if (
        not salary or
        "not available" in salary or
        "none" in salary
    ):
        return 50

    return 100


# =========================================================
# Final AI Match Score
# =========================================================

def calculate_final_score(resume_text, resume_skills, job):

    description = job.get("Description", "")
    title = job.get("Title", "")
    location = str(job.get("Location", "")).lower()

    job_skills = extract_job_skills(description)

    # Individual Scores
    skill_score, matched = calculate_skill_match(
        resume_skills,
        job_skills
    )

    keyword_score = calculate_keyword_score(
        resume_text,
        description
    )

    title_score = calculate_title_score(
        resume_skills,
        title
    )

    experience_score = calculate_experience_score(
        description
    )

    salary_score = calculate_salary_score(job)

    # Bonus for Remote Jobs
    location_score = 100 if (
        "remote" in location or
        "work from home" in location
    ) else 70

    # Weighted Final Score
    final_score = round(

        skill_score * 0.50 +

        keyword_score * 0.15 +

        title_score * 0.15 +

        experience_score * 0.10 +

        salary_score * 0.05 +

        location_score * 0.05

    )

    final_score = max(0, min(final_score, 100))

    return {

        "match_score": final_score,

        "matched_skills": matched,

        "missing_skills": find_missing_skills(
            resume_skills,
            job_skills
        ),

        "job_skills": job_skills
    }

# =========================================================
# Human Readable Recommendation
# =========================================================

def why_recommended(job, matched_skills, missing_skills):

    reasons = []

    # Skills
    if matched_skills:
        reasons.append(
            f"✓ Matches {len(matched_skills)} required skills."
        )

    if missing_skills:
        reasons.append(
            f"✓ Missing only {len(missing_skills)} skills."
        )

    # Salary
    salary = str(job.get("Salary", ""))

    if salary and "Not Available" not in salary:
        reasons.append("✓ Salary information available.")

    # Location
    location = str(job.get("Location", ""))

    if (
        "remote" in location.lower() or
        "work from home" in location.lower()
    ):
        reasons.append("✓ Remote / Work From Home opportunity.")

    elif location:
        reasons.append(f"✓ Location: {location}")

    # Experience
    contract = str(job.get("Contract Time", ""))

    if contract and contract != "Not Available":
        reasons.append(f"✓ {contract.title()} position.")

    reasons.append("✓ AI recommended based on resume analysis.")

    return reasons