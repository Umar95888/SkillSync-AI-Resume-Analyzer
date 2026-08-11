"""
Central Skill Database
Used by:
- skill_extractor.py
- job_matcher.py
- ats_analyzer.py
"""

SKILLS = {

    "Programming Languages": [
        "Python",
        "Java",
        "C",
        "C++",
        "JavaScript",
        "TypeScript",
        "Go",
        "Rust"
    ],

    "Frontend": [
        "HTML",
        "CSS",
        "Bootstrap",
        "Tailwind CSS",
        "React",
        "Next.js",
        "Angular",
        "Vue.js"
    ],

    "Backend": [
        "Node.js",
        "Express.js",
        "FastAPI",
        "Flask",
        "Django",
        "Spring Boot"
    ],

    "Database": [
        "SQL",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
        "Firebase"
    ],

    "Cloud": [
        "AWS",
        "Azure",
        "Google Cloud",
        "GCP"
    ],

    "DevOps": [
        "Docker",
        "Kubernetes",
        "Git",
        "GitHub",
        "Linux",
        "CI/CD"
    ],

    "AI/ML": [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "NLP",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "OpenCV"
    ],

    "Tools": [
        "VS Code",
        "Postman",
        "Figma",
        "Power BI",
        "Excel"
    ]
}


# ----------------------------
# Skill Synonyms
# ----------------------------

SKILL_ALIASES = {

    "reactjs": "React",
    "react.js": "React",

    "nodejs": "Node.js",
    "node js": "Node.js",

    "js": "JavaScript",

    "ts": "TypeScript",

    "ml": "Machine Learning",

    "ai": "Artificial Intelligence",

    "mongo": "MongoDB",

    "postgres": "PostgreSQL",

    "tensorflow2": "TensorFlow"
}