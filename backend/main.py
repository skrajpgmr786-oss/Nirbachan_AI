from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Google Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print("Warning: GOOGLE_API_KEY not found in environment variables.")
else:
    genai.configure(api_key=GOOGLE_API_KEY)

app = FastAPI(title="Nirbachan AI Backend")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str

# System prompt to define the persona of the Nirbachan AI
SYSTEM_PROMPT = """
You are Nirbachan, an intelligent, helpful, and polite AI Election Assistant for India. 
Your goal is to educate users about the Indian election process.
You can answer questions about:
- Voter registration and eligibility (e.g., minimum age 18, Form 6)
- The voting process (EVMs, VVPATs)
- Polling booth locations (general advice on how to find them using NVSP)
- Election timelines and general rules.
Always keep your answers concise, informative, and encouraging. 
You can understand and respond in English, Hindi, and Bengali.
If a user asks something unrelated to Indian elections, politely steer the conversation back to elections.
"""

@app.post("/api/chat")
async def chat_endpoint(chat_msg: ChatMessage):
    if not GOOGLE_API_KEY:
        return {"reply": "AI service is currently unavailable (Missing API Key). Please try again later."}
        
    try:
        # Initialize the model (using gemini-pro)
        model = genai.GenerativeModel('gemini-1.5-pro')
        
        # Combine system prompt with user message
        prompt = f"{SYSTEM_PROMPT}\n\nUser: {chat_msg.message}\nNirbachan:"
        
        response = model.generate_content(prompt)
        
        return {"reply": response.text}
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        raise HTTPException(status_code=500, detail="Failed to process request")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
