import re


ACTION_WORDS = [
    "developed",
    "built",
    "created",
    "implemented",
    "designed",
    "optimized",
    "improved",
    "managed",
    "analyzed",
    "engineered",
    "automated",
    "integrated",
    "deployed",
    "led",
    "achieved",
]


def calculate_ats_score(resume_text, skills):
    text = resume_text.lower()

    breakdown = {}
    suggestions = []

    # --------------------------------
    # 1. Skills / Keywords - 30
    # --------------------------------
    skill_score = min(len(skills) / 10 * 30, 30)
    breakdown["skills_keywords"] = round(skill_score)

    if len(skills) < 5:
        suggestions.append(
            "Add more relevant technical skills to your resume."
        )

    # --------------------------------
    # 2. Resume Sections - 20
    # --------------------------------
    sections = {
        "Education": [
            "education",
            "academic background",
        ],
        "Experience": [
            "experience",
            "work experience",
            "internship",
        ],
        "Projects": [
            "projects",
            "project",
        ],
        "Skills": [
            "skills",
            "technical skills",
        ],
        "Certifications": [
            "certification",
            "certifications",
            "certificate",
        ],
    }

    found_sections = 0

    for section, keywords in sections.items():
        if any(keyword in text for keyword in keywords):
            found_sections += 1

    section_score = (found_sections / len(sections)) * 20
    breakdown["resume_sections"] = round(section_score)

    if found_sections < 5:
        suggestions.append(
            "Add or clearly label standard resume sections."
        )

    # --------------------------------
    # 3. Projects - 15
    # --------------------------------
    project_score = 15 if "project" in text else 0
    breakdown["projects"] = project_score

    if project_score == 0:
        suggestions.append(
            "Add relevant academic or personal projects."
        )

    # --------------------------------
    # 4. Education - 10
    # --------------------------------
    education_keywords = [
        "b.tech",
        "btech",
        "bachelor",
        "degree",
        "college",
        "university",
        "education",
    ]

    education_score = 10 if any(
        word in text for word in education_keywords
    ) else 0

    breakdown["education"] = education_score

    if education_score == 0:
        suggestions.append(
            "Add your education details clearly."
        )

    # --------------------------------
    # 5. Experience - 10
    # --------------------------------
    experience_keywords = [
        "experience",
        "internship",
        "intern",
        "worked",
        "employment",
    ]

    experience_score = 10 if any(
        word in text for word in experience_keywords
    ) else 0

    breakdown["experience"] = experience_score

    if experience_score == 0:
        suggestions.append(
            "Add internship, work experience, or relevant practical experience."
        )

    # --------------------------------
    # 6. Contact Details - 5
    # --------------------------------
    email_found = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        resume_text,
    )

    phone_found = re.search(
        r"(?:\+91[-\s]?)?[6-9]\d{9}",
        resume_text,
    )

    contact_score = 5 if email_found and phone_found else 0
    breakdown["contact_details"] = contact_score

    if not email_found:
        suggestions.append(
            "Add a professional email address."
        )

    if not phone_found:
        suggestions.append(
            "Add a valid phone number."
        )

    # --------------------------------
    # 7. Achievements - 5
    # --------------------------------
    achievement_keywords = [
        "achievement",
        "achievements",
        "award",
        "awards",
        "hackathon",
        "winner",
        "rank",
        "percentage",
        "cgpa",
    ]

    achievement_score = 5 if any(
        word in text for word in achievement_keywords
    ) else 0

    breakdown["achievements"] = achievement_score

    if achievement_score == 0:
        suggestions.append(
            "Add measurable achievements, awards, or results."
        )

    # --------------------------------
    # 8. Action Words - 5
    # --------------------------------
    action_count = sum(
        1 for word in ACTION_WORDS
        if re.search(r"\b" + re.escape(word) + r"\b", text)
    )

    action_score = min(action_count / 5 * 5, 5)
    breakdown["action_words"] = round(action_score)

    if action_count < 3:
        suggestions.append(
            "Use stronger action words such as developed, implemented, optimized, or designed."
        )

    # --------------------------------
    # Final Score
    # --------------------------------
    score = sum(breakdown.values())

    # Avoid unrealistic perfect scores
    if score >= 95:
        score = 94

    return {
        "score": score,
        "breakdown": breakdown,
        "suggestions": suggestions,
        "sections_found": found_sections,
        "action_words_found": action_count,
    }