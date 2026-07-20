from app.services.interview_questions import generate_questions
from app.services.resume_summary import generate_resume_summary
from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.services.resume_parser import extract_text
from app.services.skill_extractor import extract_skills
from app.services.recommendation import recommend_all
from app.services.course_recommendation import recommend_courses

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Important skills
REQUIRED_SKILLS = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "MongoDB",
    "Git",
    "Docker",
    "AWS",
    "HTML",
    "CSS"
]


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    # Save Resume
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract Resume Text
    resume_text = extract_text(file_path)

    # Extract Skills
    skills = extract_skills(resume_text)

    #Interview Questions
    interview_questions = generate_questions(skills)

    #Resume summary
    resume_summary = generate_resume_summary(skills)

    # Job Recommendation
    user_skills = " ".join(skills)
    recommendations = recommend_all(user_skills)

    # ==========================
    # ATS Resume Score
    # ==========================

    resume_score = 40

    # Skill Score
    resume_score += min(len(skills) * 3, 30)

    # Projects
    if "project" in resume_text.lower():
        resume_score += 10

    # Certifications
    if (
        "certificate" in resume_text.lower()
        or "certification" in resume_text.lower()
    ):
        resume_score += 10

    # Education
    if (
        "b.tech" in resume_text.lower()
        or "bachelor" in resume_text.lower()
    ):
        resume_score += 10

    resume_score = min(resume_score, 100)

    # ==========================
    # Missing Skills
    # ==========================

    missing_skills = [
        skill
        for skill in REQUIRED_SKILLS
        if skill not in skills
    ]
    
    # Skill Gap Analysis
    skill_analysis = []

    for skill in REQUIRED_SKILLS:
            skill_analysis.append({
            "skill": skill,
            "status": "Found" if skill in skills else "Missing"
        })

    skill_match_percentage = round(
        (len(skills) / len(REQUIRED_SKILLS)) * 100
    )

    if skill_match_percentage > 100:
            skill_match_percentage = 100

    # ==========================
    # Course Recommendation
    # ==========================

    course_recommendations = recommend_courses(
        missing_skills
    )

    # ==========================
    # AI Resume Suggestions
    # ==========================

    resume_suggestions = []

    if "Docker" in missing_skills:
        resume_suggestions.append(
            "Learn Docker and add it to your resume."
        )

    if "AWS" in missing_skills:
        resume_suggestions.append(
            "Learn AWS Cloud Fundamentals."
        )

    if "Git" in missing_skills:
        resume_suggestions.append(
            "Mention Git and GitHub projects."
        )

    if "project" not in resume_text.lower():
        resume_suggestions.append(
            "Add personal or academic projects."
        )

    if (
        "certificate" not in resume_text.lower()
        and "certification" not in resume_text.lower()
    ):
        resume_suggestions.append(
            "Add relevant certifications."
        )

    if len(skills) < 8:
        resume_suggestions.append(
            "Increase your technical skills."
        )

    # ==========================
    # Response
    # ==========================

    return {
        "filename": file.filename,
        "message": "Resume uploaded successfully",
        "resume_score": resume_score,
        "resume_summary": resume_summary,
        "skills": skills,
        "missing_skills": missing_skills,
        "course_recommendations": course_recommendations,
        "resume_suggestions": resume_suggestions,
        "skill_analysis": skill_analysis,
        "skill_match_percentage": skill_match_percentage,
        "interview_questions": interview_questions,
        "recommendations": recommendations.to_dict(orient="records")
    }