from app.services.ats_analyzer import calculate_ats_score
from app.services.interview_questions import generate_questions
from app.services.resume_summary import generate_resume_summary
from fastapi import APIRouter, UploadFile, File
import os
import shutil
import uuid
from app.services.resume_parser import extract_text
from app.services.skill_extractor import extract_skills
from app.services.recommendation import recommend_all
from app.services.course_recommendation import recommend_courses
from app.services.live_jobs import search_live_jobs

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Important skills
REQUIRED_SKILLS = [
    "Python",
    "C++",
    "Java",
    "JavaScript",
    "TypeScript",

    "HTML",
    "CSS",
    "React",
    "Next.js",
    "Angular",

    "Node.js",
    "Express.js",
    "FastAPI",
    "Flask",
    "Django",

    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",

    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "Linux",

    "AWS",
    "Azure",

    "Machine Learning",
    "Deep Learning",
    "NLP",
    "TensorFlow",
    "PyTorch"
]


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        return {
            "error": "Only PDF files are allowed."
        }

    safe_filename = f"{uuid.uuid4()}.pdf"
    file_path = os.path.join(UPLOAD_FOLDER, safe_filename)

    # Save Resume
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
    
    recommendations = recommend_all(
        resume_text,
        skills
    )

    # ==========================
    # ATS Resume Analysis
    # ==========================

    ats_result = calculate_ats_score(
    resume_text,
    skills
    )

    resume_score = ats_result["score"]

    # -----------------------------------------------------
    # Skill Gap Analysis
    # -----------------------------------------------------

    missing_skills = [
        skill for skill in REQUIRED_SKILLS
        if skill not in skills
    ]

    skill_analysis = []

    matched_count = 0

    for skill in REQUIRED_SKILLS:

        found = skill in skills

        if found:
            matched_count += 1

        skill_analysis.append({
            "skill": skill,
            "status": "Found" if found else "Missing"
        })

    skill_match_percentage = round(
        (matched_count / len(REQUIRED_SKILLS)) * 100
    )
   
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

    "ats_analysis": ats_result,

    "resume_summary": resume_summary,
    "skills": skills,
    "missing_skills": missing_skills,
    "course_recommendations": course_recommendations,
    "resume_suggestions": resume_suggestions,
    "skill_analysis": skill_analysis,
    "skill_match_percentage": skill_match_percentage,
    "interview_questions": interview_questions,

    "recommendations": recommendations.to_dict(
        orient="records"
    )

}
@router.get("/test-live-jobs")
def test_live_jobs():

    jobs = search_live_jobs(
        ["Python", "React", "SQL"]
    )

    return {
        "count": len(jobs),
        "jobs": jobs[:3]
    }