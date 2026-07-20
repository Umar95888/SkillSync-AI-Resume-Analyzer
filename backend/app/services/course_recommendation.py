import json


def recommend_courses(missing_skills):

    with open(
        "app/data/course_data.json",
        "r",
        encoding="utf-8"
    ) as f:

        course_data = json.load(f)

    recommendations = []

    for skill in missing_skills:

        if skill in course_data:

            recommendations.append({

                "skill": skill,

                "courses": course_data[skill]

            })

    return recommendations