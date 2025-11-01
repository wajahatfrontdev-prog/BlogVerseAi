from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Allow frontend access (Next.js)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend running successfully with Groq!"}


@app.post("/generate-blog")
async def generate_blog(request: Request):
    data = await request.json()
    topic = data.get("topic")

    if not topic:
        return {"error": "Please provide a topic."}

    try:
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            return {"error": "GROQ_API_KEY missing in .env"}

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }

        # ✅ Updated to use a supported model
        # Recommended alternatives: llama-3.3-70b-versatile or llama-3.1-8b-instant
        payload = {
            "model": "llama-3.3-70b-versatile",  # Updated model
            "messages": [
                {"role": "system", "content": "You are a professional, SEO-optimized blog writer."},
                {"role": "user", "content": f"Write a detailed, well-structured blog on: {topic}. Include introduction, main points, and conclusion."}
            ],
            "temperature": 0.7,
            "max_tokens": 1500
        }

        response = requests.post("https://api.groq.com/openai/v1/chat/completions", json=payload, headers=headers)
        result = response.json()

        if response.status_code != 200:
            error_msg = result.get("error", {}).get("message", "Groq API request failed.")
            return {"error": f"API Error: {error_msg}"}

        blog_content = result["choices"][0]["message"]["content"]

        return {
            "title": f"Insightful Article on on {topic}",
            "blog": blog_content.strip()
        }

    except Exception as e:
        return {"error": str(e)}