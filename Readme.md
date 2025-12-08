🌫️ AQI Prediction System

A full-stack Next.js + FastAPI + Machine Learning application that predicts Air Quality Index (AQI) using real pollutant data generated via Gemini AI and processed by a trained ML model deployed on Hugging Face.

The project includes:
✔ A modern, animated Next.js UI
✔ A FastAPI backend hosted on Hugging Face Spaces
✔ A DecisionTreeRegressor ML model trained with CPCB data
✔ API routes that connect Gemini → Backend → Frontend seamlessly

🚀 Features

📡 Real-time AQI prediction using a trained ML model

🤖 Gemini-powered pollutant data generation

🌐 FastAPI backend deployed on Hugging Face Spaces

⚛️ Next.js frontend deployed on Vercel

🎨 Dynamic UI with animated result screens

🔒 Secure server-side API handling in Next.js

⚡ Instant ML inference (model loaded at startup)

📂 Project Structure
├── frontend/                 # Next.js App Router (UI)
│   ├── app/                  # Pages, components, API routes
│   ├── public/               # Static assets
│   ├── styles/               # Global styles
│   └── package.json
│
├── backend/                  # FastAPI ML backend (Hugging Face)
│   ├── main.py               # FastAPI app + prediction endpoint
│   ├── model.pkl             # Trained DecisionTreeRegressor model
│   ├── requirements.txt
│   └── README.md             # Backend documentation
│
└── README.md                 # Project documentation (this file)

🛠️ Tech Stack
Frontend

Next.js 14 – App Router, SSR & server actions

TailwindCSS – Utility-first styling

TypeScript – Type safety

Vercel – Deployment platform

Backend

FastAPI – High-performance backend for ML inference

Pydantic – Request validation

scikit-learn – DecisionTreeRegressor model

Hugging Face Spaces – Backend deployment

📦 Installation & Setup
1. Clone the repository
git clone https://github.com/pd241008/AQI-Preditcion-Model.git
cd AQI-Preditcion-Model

🔧 Frontend Setup
2. Install dependencies
npm install

3. Run the development server
npm run dev

4. View in browser
http://localhost:3000

⚙️ Backend (FastAPI) Setup
Install dependencies
pip install -r requirements.txt

Run backend locally
uvicorn main:app --host 0.0.0.0 --port 7860

API docs available at
http://localhost:7860/docs

🌐 API Usage

The backend exposes a simple prediction API used by the frontend and external clients.

📌 Endpoint:

POST /predict

Request Body
{
  "pm2_5": 82.3,
  "pm10": 115.2,
  "so2": 19.4,
  "no2": 32.1,
  "co": 0.45,
  "o3": 21.8
}

Response Example
{
  "aqi": 164,
  "category": "Moderate"
}

🧠 Machine Learning Model

Algorithm: DecisionTreeRegressor

Dataset: CPCB pollutant dataset

Trained in Google Colab

Exported as model.pkl

Loaded into memory at startup for instant predictions

🚀 Live Deployments
🌐 Frontend (Next.js – Vercel)

🔗 https://aqi-preditcion-model.vercel.app/

🧠 Backend (FastAPI – Hugging Face Spaces)

🔗 https://flamzey-my-ml-backend.hf.space/

📘 Training Notebook (Google Colab)

🔗 https://colab.research.google.com/drive/1yRokjOy6-zvB4cbnNrYgXtAqx6cWlcyx

📜 License

This project is licensed under the MIT License.
