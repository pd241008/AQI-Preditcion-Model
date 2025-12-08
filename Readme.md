🌫️ AQI Prediction System

A full-stack Next.js + FastAPI + Machine Learning system that predicts Air Quality Index (AQI) using real-time pollutant values generated using Gemini AI and processed by a trained DecisionTreeRegressor ML model deployed on Hugging Face Spaces.

This project features:

✔️ A modern, animated Next.js UI
✔️ A FastAPI backend hosted on Hugging Face Spaces
✔️ A trained DecisionTreeRegressor using CPCB dataset
✔️ Perfect integration between Gemini → Backend → Frontend

🚀 Features

🔮 Real-time AQI Prediction using a trained ML model

🤖 Gemini-powered pollutant value generation

☁️ FastAPI backend deployed on Hugging Face Spaces

▲ Next.js frontend deployed on Vercel

🎬 Dynamic UI with animated transitions & result screen

🔐 Secure API routes inside Next.js

⚡ Instant ML inference (model loads on startup)

🗂️ Project Structure
├── frontend/                   # Next.js App Router (UI)
│   ├── app/                    # Pages, components, API routes
│   ├── public/                 # Static assets
│   ├── styles/                 # Global styles
│   └── package.json            # Dependencies
│
├── backend/                    # FastAPI ML backend (Hugging Face)
│   ├── main.py                 # FastAPI app + prediction endpoint
│   ├── model.pkl               # Trained DecisionTreeRegressor model
│   ├── requirements.txt        # Backend dependencies
│   └── README.md               # Backend documentation
│
└── README.md                   # Project documentation (this file)

🛠️ Tech Stack (Frontend)
Next.js 14

App Router

Server Actions

SSR Rendering

TailwindCSS

Fully utility-first styling

TypeScript

Strict type-safety

📦 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yourusername/aqi-prediction-system.git
cd aqi-prediction-system

2️⃣ Install Frontend Dependencies
cd frontend
npm install

3️⃣ Run the Dev Server
npm run dev

4️⃣ Visit in Browser
http://localhost:3000

🌐 API Overview

Your backend includes an exposed prediction API for AQI.

Endpoint
POST /predict

Body Example
{
  "pm2_5": 55,
  "pm10": 120,
  "so2": 8,
  "no2": 22,
  "co": 0.7,
  "o3": 31
}

Response
{
  "predicted_aqi": 142,
  "category": "Unhealthy for Sensitive Groups"
}

📜 License

This project is licensed under the MIT License — free to use and modify.
