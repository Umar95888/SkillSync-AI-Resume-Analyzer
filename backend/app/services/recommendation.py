import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from app.services.live_jobs import search_live_jobs

def load_datasets():
    jobs = pd.read_csv("app/data/JobData.csv")
    internships = pd.read_csv("app/data/internship_data.csv")
    jobs.rename(columns={"Company_Name":"Company Name"}, inplace=True)
    return jobs, internships

def recommend_jobs(user_skills, top_n=10):
    jobs,_=load_datasets()
    jobs["Skills"]=jobs["Skills"].fillna("")
    jobs["Links"]=jobs["Links"].fillna("")
    v=TfidfVectorizer()
    X=v.fit_transform(jobs["Skills"])
    u=v.transform([user_skills])
    jobs["Match Score"]=cosine_similarity(u,X).flatten()
    return jobs.sort_values("Match Score",ascending=False).head(top_n)

def recommend_internships(user_skills, top_n=10):
    _,intern=load_datasets()
    intern["Skills"]=intern["Skills"].fillna("")
    intern["Website Link"]=intern["Website Link"].fillna("")
    v=TfidfVectorizer()
    X=v.fit_transform(intern["Skills"])
    u=v.transform([user_skills])
    intern["Match Score"]=cosine_similarity(u,X).flatten()
    return intern.sort_values("Match Score",ascending=False).head(top_n)

def recommend_live_jobs(user_skills, top_n=10):
    jobs=search_live_jobs(user_skills.split(),results=30)
    if not jobs:
        return None
    df=pd.DataFrame(jobs)
    df["Description"]=df["Description"].fillna("")
    v=TfidfVectorizer(stop_words="english")
    X=v.fit_transform(df["Description"])
    u=v.transform([user_skills])
    df["Match Score"]=cosine_similarity(u,X).flatten()
    df["Skills"]=df["Description"]
    df["Duration"]="Full Time"
    need=["Title","Company","Location","Duration","Salary","Skills","Match Score","Type","Apply Link"]
    for c in need:
        if c not in df.columns:
            df[c]="Not Available"
    return df[need].sort_values("Match Score",ascending=False).head(top_n)

def recommend_all(user_skills, top_n=10):
    live=recommend_live_jobs(user_skills,top_n)
    if live is not None:
        return live
    jobs=recommend_jobs(user_skills,top_n)
    interns=recommend_internships(user_skills,top_n)
    jobs["Type"]="Job"
    interns["Type"]="Internship"
    jobs["Location"]="Not Available"
    jobs["Duration"]="Full Time"
    jobs=jobs.rename(columns={"JobTitles":"Title","Company Name":"Company","Links":"Apply Link","Stipend":"Salary"})
    interns=interns.rename(columns={"Role":"Title","Company Name":"Company","Website Link":"Apply Link","Stipend":"Salary"})
    cols=["Title","Company","Location","Duration","Salary","Skills","Match Score","Type","Apply Link"]
    combined=pd.concat([jobs[cols],interns[cols]],ignore_index=True)
    combined=combined.fillna("Not Available")
    combined["Apply Link"]=combined["Apply Link"].astype(str)
    return combined.sort_values("Match Score",ascending=False).head(top_n)
