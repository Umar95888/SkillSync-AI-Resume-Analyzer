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

    resume_text_lower = resume_text.lower()


    # =====================================================
    # Skill-specific suggestions
    # =====================================================

    skill_advice = {

        "Python":
            "If you know Python, add a Python project and mention the libraries or frameworks you used.",

        "Java":
            "If you know Java, mention a Java project and highlight OOP, collections, or backend experience.",

        "C++":
            "If you know C++, add a C++ project or DSA experience to demonstrate practical usage.",

        "JavaScript":
            "If you know JavaScript, mention a web project and the JavaScript features or APIs you used.",

        "React":
            "If you know React, add a React project and mention components, hooks, APIs, or state management used.",

        "Node.js":
            "If you know Node.js, mention a backend project and describe the APIs or services you developed.",

        "SQL":
            "Add SQL experience through a project and mention joins, queries, database design, or data analysis.",

        "MongoDB":
            "If you know MongoDB, mention how you used collections, queries, or aggregation in a project.",

        "Git":
            "Mention Git and GitHub usage in your projects, especially branching, commits, and collaboration.",

        "Docker":
            "If you know Docker, mention how you containerized or deployed one of your projects.",

        "AWS":
            "If you know AWS, mention the AWS services you used and explain how they were used in your project.",

        "HTML":
            "Mention HTML5 and semantic HTML when describing your frontend projects.",

        "CSS":
            "Mention responsive design, Flexbox, Grid, or other CSS techniques used in your projects.",

        "TypeScript":
            "If you know TypeScript, mention how you used types, interfaces, or generics in a project.",

        "FastAPI":
            "If you know FastAPI, mention the REST APIs, validation, or backend services you built with it.",

        "Flask":
            "If you know Flask, describe the APIs or web application you developed using Flask.",

        "Django":
            "If you know Django, mention models, ORM, authentication, or REST APIs used in your project.",

        "MySQL":
            "Mention your MySQL database experience and describe the queries, schema, or tables used.",

        "PostgreSQL":
            "Mention PostgreSQL usage and explain how you designed or queried the database.",

        "Kubernetes":
            "If you know Kubernetes, mention deployments, services, pods, or container orchestration experience.",

        "Linux":
            "Mention Linux usage if you used it for development, deployment, servers, or DevOps tasks.",

        "Machine Learning":
            "Add a machine learning project and mention the dataset, algorithm, evaluation metric, and result.",

        "Deep Learning":
            "If you have deep learning experience, mention the model architecture, dataset, framework, and result.",

        "NLP":
            "Mention an NLP project and explain preprocessing, feature extraction, model, and evaluation.",

        "TensorFlow":
            "If you used TensorFlow, mention the model, dataset, training process, and evaluation result.",

        "PyTorch":
            "If you used PyTorch, mention the model architecture, dataset, training process, and results.",

        "Pandas":
            "Mention how you used Pandas for data cleaning, transformation, analysis, or preprocessing.",

        "NumPy":
            "Mention NumPy if you used it for numerical operations, arrays, or machine learning preprocessing.",

        "Scikit-learn":
            "Mention the Scikit-learn algorithms, preprocessing techniques, and evaluation metrics used in your project."
    }


    # =====================================================
    # 1. Missing important skills
    # =====================================================

    important_missing = []

    for skill in missing_skills:

        if skill in skill_advice:
            important_missing.append(skill)


    # Add maximum 2 skill-based suggestions
    for skill in important_missing[:2]:

        suggestion = skill_advice[skill]

        # Only suggest it if the skill is actually missing.
        resume_suggestions.append(suggestion)


    # =====================================================
    # 2. Project Section Analysis
    # =====================================================

    project_keywords = [
        "project",
        "projects",
        "developed",
        "developing",
        "built",
        "created",
        "implemented"
    ]

    has_project = any(
        keyword in resume_text_lower
        for keyword in project_keywords
    )

    if not has_project:

        resume_suggestions.append(
            "Add 2–3 relevant academic or personal projects with technologies, your role, and measurable results."
        )

    else:

        # Check whether technologies are mentioned near project-related content
        technology_keywords = [
            "python",
            "java",
            "javascript",
            "react",
            "node",
            "sql",
            "machine learning",
            "tensorflow",
            "django",
            "flask"
        ]

        has_project_technology = any(
            keyword in resume_text_lower
            for keyword in technology_keywords
        )

        if not has_project_technology:

            resume_suggestions.append(
                "Improve your project descriptions by clearly mentioning the technologies and tools used."
            )


    # =====================================================
    # 3. Quantifiable Results
    # =====================================================

    has_numbers = any(
        char.isdigit()
        for char in resume_text
    )

    if not has_numbers:

        resume_suggestions.append(
            "Add measurable results to your experience and projects, such as performance improvements, users, accuracy, or time saved."
        )


    # =====================================================
    # 4. Experience Section
    # =====================================================

    experience_keywords = [
        "experience",
        "internship",
        "intern",
        "worked",
        "employment"
    ]

    has_experience = any(
        keyword in resume_text_lower
        for keyword in experience_keywords
    )

    if not has_experience:

        resume_suggestions.append(
            "If you have internship, freelance, training, or practical experience, add it with clear responsibilities and achievements."
        )


    # =====================================================
    # 5. Certification Section
    # =====================================================

    certification_keywords = [
        "certificate",
        "certification",
        "certified",
        "course completion"
    ]

    has_certification = any(
        keyword in resume_text_lower
        for keyword in certification_keywords
    )

    if not has_certification:

        resume_suggestions.append(
            "Add relevant certifications or completed technical courses if you have them."
        )


    # =====================================================
    # 6. Summary / Objective
    # =====================================================

    summary_keywords = [
        "summary",
        "objective",
        "profile"
    ]

    has_summary = any(
        keyword in resume_text_lower
        for keyword in summary_keywords
    )

    if not has_summary:

        resume_suggestions.append(
            "Add a short professional summary focused on your technical skills, projects, and career goal."
        )


    # =====================================================
    # 7. Avoid Too Many Suggestions
    # =====================================================

    # Keep the most useful suggestions only
    resume_suggestions = resume_suggestions[:5]


    # Remove duplicate suggestions
    resume_suggestions = list(
        dict.fromkeys(resume_suggestions)
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