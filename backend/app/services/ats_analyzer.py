"""
=========================================================
SkillSync V2 - ats_analyzer.py
=========================================================

Purpose
-------
Analyze a resume like an ATS (Applicant Tracking System)
and generate:
- ATS Score
- Score Breakdown
- Improvement Suggestions

Note:
This score is an educational estimate, not an official ATS.
"""

import re

ACTION_WORDS = [
    "developed","built","created","implemented","designed",
    "optimized","improved","managed","analyzed",
    "engineered","automated","integrated","deployed",
    "led","achieved"
]


# =========================================================
# Check standard resume sections
# =========================================================
def section_score(text):
    """
    Checks whether common resume sections exist.
    Maximum Score = 20
    """
    sections = {
        "Education":["education","b.tech","bachelor"],
        "Experience":["experience","internship"],
        "Projects":["project","projects"],
        "Skills":["skills","technical skills"],
        "Certifications":["certificate","certification"]
    }

    found = 0

    for keywords in sections.values():
        if any(k in text for k in keywords):
            found += 1

    score = round((found/len(sections))*20)

    return score, found


# =========================================================
# Contact Information
# =========================================================
def contact_score(resume_text):
    """
    Checks email and phone number.
    Maximum Score = 10
    """
    email = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        resume_text
    )

    phone = re.search(
        r"(?:\+91[-\s]?)?[6-9]\d{9}",
        resume_text
    )

    score = 0

    if email:
        score += 5

    if phone:
        score += 5

    return score, bool(email), bool(phone)


# =========================================================
# Action Words
# =========================================================
def action_word_score(text):
    """
    Strong action words improve ATS readability.
    Maximum Score = 10
    """
    count = 0

    for word in ACTION_WORDS:
        if re.search(r"\b"+re.escape(word)+r"\b", text):
            count += 1

    return min(count,10), count


# =========================================================
# Skill Score
# =========================================================
def skill_score(skills):
    """
    Gives score according to number of extracted skills.
    Maximum Score = 30
    """
    return min(len(skills)*2,30)


# =========================================================
# Calculate Final ATS Score
# =========================================================
def calculate_ats_score(resume_text, skills):
    """
    Main function used by routes.py
    """

    text = resume_text.lower()

    breakdown = {}
    suggestions = []

    # Skills
    breakdown["skills"] = skill_score(skills)

    if len(skills) < 8:
        suggestions.append(
            "Add more technical skills relevant to your target role."
        )

    # Sections
    sec_score, sec_found = section_score(text)
    breakdown["sections"] = sec_score

    if sec_found < 5:
        suggestions.append(
            "Include all standard resume sections."
        )

    # Projects
    project = 15 if "project" in text else 5
    breakdown["projects"] = project

    if project < 15:
        suggestions.append(
            "Add at least one strong project."
        )

    # Contact
    contact, email_ok, phone_ok = contact_score(resume_text)
    breakdown["contact"] = contact

    if not email_ok:
        suggestions.append("Add a professional email address.")

    if not phone_ok:
        suggestions.append("Add a valid phone number.")

    # Action Words
    action, count = action_word_score(text)
    breakdown["action_words"] = action

    if count < 5:
        suggestions.append(
            "Use action verbs like Developed, Built, Implemented."
        )

    total = sum(breakdown.values())

    # Prevent unrealistic perfect scores
    if total > 92:
        total = 92

    # Rating
    if total >= 85:
        rating = "Excellent"
    elif total >= 70:
        rating = "Good"
    elif total >= 55:
        rating = "Average"
    else:
        rating = "Needs Improvement"

    return {
        "score": total,
        "rating": rating,
        "breakdown": breakdown,
        "suggestions": suggestions,
        "sections_found": sec_found,
        "action_words_found": count
    }