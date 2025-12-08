# 🌍 AI-Powered AQI Prediction System

## **_Real-Time Air Quality Estimation using ML, MLOps, Next.js, Gemini API & FastAPI_**

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel" />
  <img src="https://img.shields.io/badge/Backend-HuggingFace-yellow?logo=huggingface" />
  <img src="https://img.shields.io/badge/MLOps-Python%20%7C%20FastAPI-blue" />
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
  <img src="https://img.shields.io/badge/Google-Gemini-blue?logo=google" />
</p>

| Component | Status / Link |
| :--- | :--- |
| **🚀 Live App** | [https://aqi-preditcion-model.vercel.app/](https://aqi-preditcion-model.vercel.app/) |
| **⚙️ ML Backend (FastAPI)** | [https://huggingface.co/spaces/Flamzey/my-ml-backend](https://huggingface.co/spaces/Flamzey/my-ml-backend) |
| **📘 Training Notebook** | _(Google Colab Used)_ |
| **📊 Dataset** | CPCB - Central Pollution Control Board |

---

## 💡 Overview

This project is a **full-stack, production-ready Air Quality Index (AQI) Prediction System** demonstrating a complete MLOps pipeline across multiple cloud platforms. It integrates a trained **DecisionTreeRegressor** model with a modern, high-performance web stack.

The system predicts the overall AQI based on six core pollutants: **PM2.5, PM10, NO₂, SO₂, CO, and O₃**.

### ✨ Highlight Feature: Gemini API for Real-Time Data

Instead of relying on costly external APIs, the application uses the **Google Gemini API** as a creative proxy to **generate synthetic, real-time pollutant data** based on a user-provided city. This ensures the demo is live, dynamic, and cost-effective.

---

## 🔗 Architecture & Data Flow

This project follows a complete **MLOps pipeline** utilizing a Serverless architecture (Vercel) and a containerized ML inference service (Hugging Face Spaces).



The flow is as follows:

1.  **User Input** (City Name) on the **Next.js Frontend**.
2.  **Next.js API Route** calls **Google Gemini** with a prompt (e.g., "Generate pollutant levels for Delhi...").
3.  **Gemini** returns the synthetic pollutant values.
4.  **Next.js** sends the pollutant payload to the **FastAPI Backend**.
5.  **FastAPI** loads the pre-trained **DecisionTreeRegressor** model.
6.  **FastAPI** computes the **AQI** and **Category**.
7.  The final result is displayed on the **Next.js UI**.

---

## 🧠 Machine Learning Pipeline

### 📌 Model & Training

| Detail | Description |
| :--- | :--- |
| **Algorithm** | **DecisionTreeRegressor** |
| **Dataset** | CPCB Pollutant Data (cleaned) |
| **Key Features** | PM2.5, PM10, SO₂, NO₂, CO, O₃ |
| **Training Tool** | Google Colab |
| **Export Format** | `model.pkl` |

### 🎯 Why Decision Tree?

* **Fast Inference:** Extremely quick prediction time, ideal for a **zero-latency** serverless/edge deployment.
* **Lightweight:** Small file size, reducing cold-start time.
* **Interpretability:** High transparency in how AQI is calculated from pollutants.

---

## ⚙ Backend Service (FastAPI)

The backend is a high-performance **FastAPI** service deployed on **Hugging Face Spaces**.

### Key Features
* **High-Performance:** Utilizes FastAPI for speed and asynchronous operations.
* **Zero Latency:** The `model.pkl` is loaded **once** at service startup, resulting in near-zero latency for subsequent prediction requests.
* **Robustness:** **Pydantic validation** ensures a clean, expected request payload.
* **Deployment:** Dockerized and served on Hugging Face Spaces.

### `/predict` Endpoint

Used by the frontend to get the predicted AQI.

**Method:** `POST`

| Parameter | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| **pm2_5** | `float` | `87.1` | Particulate matter $< 2.5 \mu m$ |
| **pm10** | `float` | `122.5` | Particulate matter $< 10 \mu m$ |
| **so2** | `float` | `18.0` | Sulfur Dioxide |
| **no2** | `float` | `34.7` | Nitrogen Dioxide |
| **co** | `float` | `0.52` | Carbon Monoxide |
| **o3** | `float` | `21.4` | Ozone |

**Example Request:**
```json
{
  "pm2_5": 87.1,
  "pm10": 122.5,
  "so2": 18.0,
  "no2": 34.7,
  "co": 0.52,
  "o3": 21.4
}
```

###🎨 Frontend (Next.js 14 + TailwindCSS)

The frontend provides a clean, modern, and mobile-first experience.

Frontend Features
Modern UI: Built with Next.js 14 and TailwindCSS.

Serverless Proxy: Uses Next.js API Routes to safely handle the Gemini API key and orchestrate the request flow.

Visualisation: Clear AQI category and numerical display.

Dynamic Content: City-based imagery (via Unsplash proxy) and loading animations.

🧪 Running Locally
To set up and run the project components on your local machine:

1. Backend (FastAPI)
```Bash

# Move to the backend directory
cd backend
```
# Install dependencies
```
pip install -r requirements.txt
```
# Run the API server
# --reload enables auto-restart on code changes
```uvicorn main:app --reload

```
2. Frontend (Next.js)
Bash
```
# Move to the frontend directory
cd frontend

# Install dependencies
npm install
```
# Run the Next.js development server
# Access at http://localhost:3000

```npm run dev```
🪵 Repository Structure
Bash
```
📦 AQI-Prediction-Model
├── frontend/             # Next.js 14 + Tailwind (Vercel deployment)
│   ├── app/
│   └── components/
│
├── backend/              # FastAPI ML Backend (Hugging Face Spaces deployment)
│   ├── main.py
│   ├── model.pkl         # Pre-trained DecisionTreeRegressor
│   └── requirements.txt
```
