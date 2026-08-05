import os
import requests
from dotenv import load_dotenv

load_dotenv()

APP_ID = os.getenv("ADZUNA_APP_ID")
APP_KEY = os.getenv("ADZUNA_APP_KEY")

print("APP_ID:", APP_ID)
print("APP_KEY:", APP_KEY)

def search_live_jobs(skills, results=20):
    """
    Fetch live jobs from Adzuna API.
    """

    query = " ".join(skills)

    url = (
        "https://api.adzuna.com/v1/api/jobs/in/search/1"
    )

    params = {
        "app_id": APP_ID,
        "app_key": APP_KEY,
        "results_per_page": results,
        "what": query,
        "content-type": "application/json",
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=10
        )
        print(response.status_code)
        print(response.text)

        response.raise_for_status()

        data = response.json()

        jobs = []

        for job in data.get("results", []):

            jobs.append({

                "Title": job.get("title", "Not Available"),

                "Company":
                    job.get("company", {})
                       .get("display_name",
                            "Not Available"),

                "Location":
                    job.get("location", {})
                       .get("display_name",
                            "Not Available"),

                "Salary":
                    f"{job.get('salary_min','')} - "
                    f"{job.get('salary_max','')}",

                "Description":
                    job.get("description", ""),

                "Apply Link":
                    job.get("redirect_url", ""),

                "Type": "Job",

                "Match Score": 0
            })

        return jobs

    except Exception as e:
        print("=" * 50)
        print("LIVE JOB API ERROR")
        print(e)

        if 'response' in locals():
            print(response.status_code)
            print(response.text)

        print("=" * 50)

        return []