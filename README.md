# Nirbachan AI 🇮🇳🗳️
**Intelligent Election Process Assistant for India**

Nirbachan is a highly interactive, AI-powered web application designed to educate users about the Indian election process. Featuring a modern "Indian Cultural Fusion" aesthetic, the platform combines gamified learning, real-time AI assistance, and simulated election modules to create a next-generation civic-tech experience.

---

## 🌟 Key Features

* **🤖 AI Election Assistant (Nirbachan Chatbot)**
  * Multilingual (English, Hindi, Bengali) conversational AI powered by Google Gemini.
  * Instant answers to queries regarding voter eligibility, required documents, and polling locations.
* **🗳️ Mock EVM Simulator**
  * Interactive Electronic Voting Machine interface with biometric simulation.
  * Experience the full voting loop, complete with VVPAT mock verification.
* **📊 Live Election Dashboard**
  * Simulated real-time dashboards showcasing voting trends.
  * Dynamic charts utilizing Recharts for data visualization.
* **🧭 Interactive Election Journey**
  * A step-by-step animated timeline guiding first-time voters from registration (NVSP/Form 6) to result declaration.
* **🎮 Gamified Learning & Quiz**
  * Test your civic knowledge, track scores, and earn the "Election Expert" badge.
* **✨ Premium "Antigravity" UI**
  * Built with React, TailwindCSS, and Framer Motion for buttery-smooth animations and glassmorphic designs.

---

## 🛠️ Technology Stack

**Frontend:**
* React 19 + Vite
* TailwindCSS v3 (Styling & Design System)
* Framer Motion (Complex Animations & UI Interactions)
* React Router DOM (Navigation)
* Recharts (Data Visualization)
* Lucide React (Iconography)

**Backend:**
* Python + FastAPI
* Google Generative AI SDK (Gemini 1.5 Pro)
* Uvicorn (ASGI Server)
* Pydantic & python-dotenv

---

## 🚀 Running the Project Locally

### Prerequisites
* Node.js (v20+ recommended)
* Python (3.9+)

### 1. Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```
**Environment Variables:**
Create a `.env` file in the `backend/` directory and add your Google API key:
```env
GOOGLE_API_KEY="your_google_gemini_api_key"
```

**Start the FastAPI Server:**
```bash
python main.py
# Server runs on http://localhost:8000
```

### 2. Setup Frontend
```bash
cd frontend
npm install
```
**Environment Variables:**
Create a `.env` file in the `frontend/` directory to point to the backend:
```env
VITE_API_URL="http://localhost:8000"
```

**Start the Vite Development Server:**
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## 💡 Designed for Hackathons
This project embodies a "Hackathon Level" execution by incorporating a premium UI, real AI integrations, and a creative feature set (like the fingerprint scanner simulation) designed to impress judges and users alike.
