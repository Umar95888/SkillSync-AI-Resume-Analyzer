def generate_resume_summary(skills):
    """
    Generate an AI-like professional summary.
    """

    if not skills:
        return (
            "Motivated student eager to learn new technologies "
            "and build a career in software development."
        )

    top_skills = ", ".join(skills[:5])

    summary = (
        f"Computer Science student with knowledge of {top_skills}. "
        f"Passionate about Software Development, Web Development, "
        f"Artificial Intelligence, and problem solving. "
        f"Looking for internships and entry-level opportunities "
        f"to apply technical skills and continue learning."
    )

    return summary