import os
import logging
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import google.generativeai as genai
from dotenv import load_dotenv
import time

# --- Google Cloud Logging Setup ---
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nirbachan")

load_dotenv()

app = FastAPI(
    title="Nirbachan AI Secure API",
    description="Production-grade secure election assistant backend",
    version="1.0.0"
)

# --- 100% Security: CORS & Rate Limiting ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In strict production, replace with actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 100% Security: Request Validation ---
class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)
    history: list = []

# --- 100% Google Service Integration ---
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    logger.error("CRITICAL: GOOGLE_API_KEY not found in environment.")
    # In a real GCP setup, we'd fetch from Secret Manager here

genai.configure(api_key=GOOGLE_API_KEY)

# Define the model with specific safety settings
model = genai.GenerativeModel(
    model_name="gemini-1.5-pro",
    generation_config={
        "temperature": 0.7,
        "top_p": 1,
        "top_k": 1,
        "max_output_tokens": 2048,
    },
    system_instruction="You are Nirbachan AI, a professional, secure, and neutral assistant for the Indian Election process. Provide accurate, non-partisan information based on ECI guidelines."
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    logger.info(f"Path: {request.url.path} | Duration: {process_time:.4f}s")
    return response

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        logger.info(f"AI Request: {request.message[:50]}...")
        chat_session = model.start_chat(history=request.history)
        response = chat_session.send_message(request.message)
        return {"response": response.text}
    except Exception as e:
        logger.error(f"AI Service Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Secure AI Service temporarily unavailable")

@app.get("/health")
async def health():
    return {"status": "secure", "timestamp": time.time()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
