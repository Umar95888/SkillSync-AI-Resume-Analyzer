from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://skill-sync-ai-resume-analyzer-omega.vercel.app",
        "https://skill-sync-ai-resume-analyzer-2v7n147z3.vercel.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "SkillSync API Running Successfully"
    }