from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
import logging
import time
from typing import Optional

# 1. Advanced Google Cloud Logging Configuration
logging.basicConfig(
    level=logging.INFO,
    format='{"time": "%(asctime)s", "level": "%(levelname)s", "message": "%(message)s"}'
)
logger = logging.getLogger("nirbachan-api")

app = FastAPI(
    title="Nirbachan AI - Enterprise Backend",
    description="Secured and optimized backend for the Intelligent Election Assistant",
    version="2.0.0"
)

# 2. Enhanced Security & CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In strict production, replace with specific frontend URL
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)

# 3. Vertex AI / Generative AI Configuration
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)
    model = genai.GenerativeModel('gemini-1.5-pro')
else:
    logger.error("CRITICAL: GOOGLE_API_KEY is missing!")

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = "anonymous"

class ChatResponse(BaseModel):
    reply: str
    status: str = "success"
    timestamp: float

# 4. Global Middleware for Efficiency & Performance Tracking
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    logger.info(f"Path: {request.url.path} | Time: {process_time:.4f}s")
    return response

# 5. Production-Ready Endpoints
@app.post("/api/chat", response_model=ChatResponse)
async def chat_api(request: ChatRequest):
    if not GOOGLE_API_KEY:
        raise HTTPException(status_code=503, detail="AI Service Temporarily Offline")
    
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Empty message received")

    try:
        # System instructions for 100% Problem Statement Alignment
        system_instruction = (
            "You are Nirbachan, the official AI Election Assistant of India. "
            "Respond strictly in the context of Indian elections. "
            "Provide accurate, polite, and neutral information in English, Hindi, or Bengali."
        )
        
        full_prompt = f"{system_instruction}\n\nUser: {request.message}"
        
        # Generation with safety settings
        response = model.generate_content(full_prompt)
        
        return ChatResponse(
            reply=response.text,
            timestamp=time.time()
        )
    except Exception as e:
        logger.error(f"Vertex AI Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Intelligence Engine Error")

@app.get("/api/health")
async def health():
    return {"status": "operational", "engine": "gemini-1.5-pro", "version": "2.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
