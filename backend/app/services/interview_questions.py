INTERVIEW_QUESTIONS = {

    "Python": [
        "What is the difference between a list and a tuple?",
        "Explain decorators in Python.",
        "What are generators?",
        "What is the difference between deep copy and shallow copy?",
        "Explain *args and **kwargs."
    ],

    "Java": [
        "Explain the four pillars of OOP.",
        "Difference between JDK, JRE and JVM.",
        "What is method overloading?",
        "What is method overriding?",
        "Explain Exception Handling."
    ],

    "JavaScript": [
        "What is hoisting?",
        "Difference between var, let and const.",
        "Explain closures.",
        "What are promises?",
        "What is async/await?"
    ],

    "React": [
        "What are React Hooks?",
        "Explain useEffect().",
        "Difference between State and Props.",
        "What is Virtual DOM?",
        "What is Context API?"
    ],

    "Node.js": [
        "What is Express?",
        "Explain middleware.",
        "What is npm?",
        "Difference between synchronous and asynchronous code?",
        "What is event loop?"
    ],

    "SQL": [
        "Difference between DELETE, DROP and TRUNCATE.",
        "Explain JOIN types.",
        "What is Normalization?",
        "Primary Key vs Foreign Key?",
        "Write a query to find second highest salary."
    ],

    "HTML": [
        "What are semantic tags?",
        "Difference between div and span?",
        "What is the purpose of DOCTYPE?",
        "Explain forms.",
        "Difference between id and class."
    ],

    "CSS": [
        "Difference between Flexbox and Grid.",
        "What is Box Model?",
        "Difference between relative and absolute positioning?",
        "Explain media queries.",
        "What are pseudo classes?"
    ],

    "Git": [
        "Difference between Git and GitHub.",
        "What is Git merge?",
        "What is Git rebase?",
        "Explain pull request.",
        "Difference between fetch and pull."
    ],

    "MongoDB": [
        "SQL vs MongoDB.",
        "What is BSON?",
        "Explain aggregation.",
        "Difference between find() and aggregate().",
        "What are indexes?"
    ]
}


def generate_questions(skills):

    questions = []

    for skill in skills:

        if skill in INTERVIEW_QUESTIONS:

            questions.append({
                "skill": skill,
                "questions": INTERVIEW_QUESTIONS[skill]
            })

    return questions