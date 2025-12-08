🌍 AI-Powered AQI Prediction SystemReal-Time Air Quality Estimation using ML, MLOps, Next.js, Gemini API & FastAPI<p align="center"><img src="https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel" /><img src="https://img.shields.io/badge/Backend-HuggingFace-yellow?logo=huggingface" /><img src="https://img.shields.io/badge/MLOps-Python%20%7C%20FastAPI-blue" /><img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" /><img src="https://img.shields.io/badge/Google-Gemini-blue?logo=google" /></p>ComponentStatus / Link🚀 Live Apphttps://aqi-preditcion-model.vercel.app/⚙️ ML Backend (FastAPI)https://huggingface.co/spaces/Flamzey/my-ml-backend📘 Training Notebook(Google Colab Used)📊 DatasetCPCB - Central Pollution Control Board💡 OverviewThis project is a full-stack, production-ready Air Quality Index (AQI) Prediction System demonstrating a complete MLOps pipeline across multiple cloud platforms. It integrates a trained DecisionTreeRegressor model with a modern, high-performance web stack.The system predicts the overall AQI based on six core pollutants: PM2.5, PM10, NO₂, SO₂, CO, and O₃.✨ Highlight Feature: Gemini API for Real-Time DataInstead of relying on costly external APIs, the application uses the Google Gemini API as a creative proxy to generate synthetic, real-time pollutant data based on a user-provided city. This ensures the demo is live, dynamic, and cost-effective.🔗 Architecture & Data FlowThis project follows a complete MLOps pipeline utilizing a Serverless architecture (Vercel) and a containerized ML inference service (Hugging Face Spaces).The flow is as follows:User Input (City Name) on the Next.js Frontend.Next.js API Route calls Google Gemini with a prompt (e.g., "Generate pollutant levels for Delhi...").Gemini returns the synthetic pollutant values.Next.js sends the pollutant payload to the FastAPI Backend.FastAPI loads the pre-trained DecisionTreeRegressor model.FastAPI computes the AQI and Category.The final result is displayed on the Next.js UI.🧠 Machine Learning Pipeline📌 Model & TrainingDetailDescriptionAlgorithmDecisionTreeRegressorDatasetCPCB Pollutant Data (cleaned)Key FeaturesPM2.5, PM10, SO₂, NO₂, CO, O₃Training ToolGoogle ColabExport Formatmodel.pkl🎯 Why Decision Tree?Fast Inference: Extremely quick prediction time, ideal for a zero-latency serverless/edge deployment.Lightweight: Small file size, reducing cold-start time.Interpretability: High transparency in how AQI is calculated from pollutants.⚙ Backend Service (FastAPI)The backend is a high-performance FastAPI service deployed on Hugging Face Spaces.Key FeaturesHigh-Performance: Utilizes FastAPI for speed and asynchronous operations.Zero Latency: The model.pkl is loaded once at service startup, resulting in near-zero latency for subsequent prediction requests.Robustness: Pydantic validation ensures a clean, expected request payload.Deployment: Dockerized and served on Hugging Face Spaces./predict EndpointUsed by the frontend to get the predicted AQI.Method: POSTParameterTypeExampleDescriptionpm2_5float87.1Particulate matter $\lt 2.5 \mu m$pm10float122.5Particulate matter $\lt 10 \mu m$so2float18.0Sulfur Dioxideno2float34.7Nitrogen Dioxidecofloat0.52Carbon Monoxideo3float21.4OzoneExample Request:JSON{
  "pm2_5": 87.1,
  "pm10": 122.5,
  "so2": 18.0,
  "no2": 34.7,
  "co": 0.52,
  "o3": 21.4
}
Example Response:JSON{
  "aqi": 162,
  "category": "Moderate"
}
🎨 Frontend (Next.js 14 + TailwindCSS)The frontend provides a clean, modern, and mobile-first experience.Frontend FeaturesModern UI: Built with Next.js 14 and TailwindCSS.Serverless Proxy: Uses Next.js API Routes to safely handle the Gemini API key and orchestrate the request flow.Visualisation: Clear AQI category and numerical display.Dynamic Content: City-based imagery (via Unsplash proxy) and loading animations.🧪 Running LocallyTo set up and run the project components on your local machine:1. Backend (FastAPI)Bash# Move to the backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the API server
# --reload enables auto-restart on code changes
uvicorn main:app --reload
2. Frontend (Next.js)Bash# Move to the frontend directory
cd frontend

# Install dependencies
npm install

# Run the Next.js development server
# Access at http://localhost:3000
npm run dev
🪵 Repository StructureBash📦 AQI-Prediction-Model
├── frontend/             # Next.js 14 + Tailwind (Vercel deployment)
│   ├── app/
│   └── components/
│
├── backend/              # FastAPI ML Backend (Hugging Face Spaces deployment)
│   ├── main.py
│   ├── model.pkl         # Pre-trained DecisionTreeRegressor
│   └── requirements.txt
│
└── notebooks/            # Jupyter/Colab notebooks for model training & analysis
