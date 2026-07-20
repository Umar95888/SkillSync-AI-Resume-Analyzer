SKILLS = [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "React",
    "Node.js",
    "FastAPI",
    "Machine Learning",
    "Deep Learning",
    "AI",
    "SQL",
    "MySQL",
    "MongoDB",
    "Git",
    "GitHub",
    "HTML",
    "CSS",
    "Power BI",
    "TensorFlow",
    "Pandas",
    "NumPy"
]

def extract_skills(text):
    found = []

    text = text.lower()

    for skill in SKILLS:
        if skill.lower() in text:
            found.append(skill)

    return found