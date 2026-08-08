import os
import requests
from dotenv import load_dotenv

# Load Environment Variables
load_dotenv()

APP_ID = os.getenv("ADZUNA_APP_ID")
APP_KEY = os.getenv("ADZUNA_APP_KEY")

BASE_URL = "https://api.adzuna.com/v1/api/jobs/in/search/1"


def search_live_jobs(skills, results=20):
    """
    Fetch live jobs from Adzuna API.
    """

    if not APP_ID or not APP_KEY:
        print("Adzuna API credentials not found.")
        return []

    TOP_SKILLS = skills[:5]

    query = " OR ".join(TOP_SKILLS)

    params = {
        "app_id": APP_ID,
        "app_key": APP_KEY,
        "results_per_page": results,
        "what": query,
        "content-type": "application/json"
    }

    try:

        response = requests.get(
            BASE_URL,
            params=params,
            timeout=15
        )

        response.raise_for_status()

        data = response.json()

        jobs = []

        for job in data.get("results", []):

            jobs.append({

                "Title": job.get(
                    "title",
                    "Not Available"
                ),

                "Company": job.get(
                    "company",
                    {}
                ).get(
                    "display_name",
                    "Not Available"
                ),

                "Location": job.get(
                    "location",
                    {}
                ).get(
                    "display_name",
                    "Not Available"
                ),

                "Salary": (
                    f"{job.get('salary_min', 'Not Available')} - "
                    f"{job.get('salary_max', 'Not Available')}"
                ),

                "Description": job.get(
                    "description",
                    ""
                ),

                "Apply Link": job.get(
                    "redirect_url",
                    ""
                ),

                "Created": job.get(
                    "created",
                    "Not Available"
                ),

                "Category": job.get(
                    "category",
                    {}
                ).get(
                    "label",
                    "Not Available"
                ),

                "Contract Type": job.get(
                    "contract_type",
                    "Not Available"
                ),

                "Contract Time": job.get(
                    "contract_time",
                    "Not Available"
                ),

                "Type": "Live Job"
            })

        return jobs

    except requests.exceptions.RequestException as e:

        print(f"Live Job API Error : {e}")

        return []