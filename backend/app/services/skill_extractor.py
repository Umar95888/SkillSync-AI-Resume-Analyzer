import re

from app.services.skill_database import (
    SKILLS,
    SKILL_ALIASES
)


def normalize_text(text):
    """
    Convert text to lowercase and remove extra spaces.
    """
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text


def get_all_skills():
    """
    Combine all skills from every category.
    """
    all_skills = []

    for category in SKILLS.values():
        all_skills.extend(category)

    return all_skills


def extract_skills(text):
    """
    Extract technical skills from resume text.
    """

    text = normalize_text(text)

    found_skills = set()

    # ----------------------------
    # Check Original Skills
    # ----------------------------

    for skill in get_all_skills():

        if skill.lower() in text:
            found_skills.add(skill)

    # ----------------------------
    # Check Skill Aliases
    # ----------------------------

    for alias, original in SKILL_ALIASES.items():

        if alias in text:
            found_skills.add(original)

    return sorted(found_skills)


def categorize_skills(skills):
    """
    Group extracted skills category-wise.
    """

    categorized = {}

    for category, category_skills in SKILLS.items():

        matched = []

        for skill in skills:

            if skill in category_skills:
                matched.append(skill)

        if matched:
            categorized[category] = matched

    return categorized


def get_skill_statistics(skills):
    """
    Return useful statistics.
    """

    categorized = categorize_skills(skills)

    return {

        "total_skills": len(skills),

        "categories": categorized

    }