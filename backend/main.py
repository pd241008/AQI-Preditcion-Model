from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np
import os

app = FastAPI(title="AQI Prediction API")

# -----------------------------
# CORS SETTINGS FOR PRODUCTION
# -----------------------------

HF_SPACE_URL = "https://flamzey-my-ml-backend.hf.space"
NEXTJS_URL = "https://YOUR_NEXTJS_DOMAIN"  # Optional

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        HF_SPACE_URL,
        NEXTJS_URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# LOAD MODEL
# -----------------------------
try:
    with open("aqi_model.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully")
except Exception as e:
    print("❌ Failed to load model:", e)
    model = None


# -----------------------------
# Request Schema (MAIN)
# -----------------------------
class AQIRequest(BaseModel):
    pm2_5: float
    pm10: float
    no: float
    no2: float
    co: float
    so2: float
    o3: float


# -----------------------------
# Compute AQI Category
# -----------------------------
def compute_aqi_category(aqi: float) -> str:
    if aqi <= 50:
        return "Good"
    elif aqi <= 100:
        return "Moderate"
    elif aqi <= 150:
        return "Unhealthy for Sensitive Groups"
    elif aqi <= 200:
        return "Unhealthy"
    elif aqi <= 300:
        return "Very Unhealthy"
    else:
        return "Hazardous"


# -----------------------------
# Root Route
# -----------------------------
@app.get("/")
def home():
    return {"status": "Backend running", "space": HF_SPACE_URL}


# -----------------------------
# MAIN PREDICT ROUTE
# -----------------------------
@app.post("/predict")
def predict(data: AQIRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        values = np.array([
            data.pm2_5,
            data.pm10,
            data.no,
            data.no2,
            data.co,
            data.so2,
            data.o3
        ]).reshape(1, -1)

        prediction = float(model.predict(values)[0])
        category = compute_aqi_category(prediction)

        return {
            "aqi": round(prediction, 2),
            "category": category
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {e}")


# -----------------------------
# TEST PREDICT ROUTE
# -----------------------------
class AQITestRequest(BaseModel):
    pm2_5: float
    pm10: float
    no: float
    no2: float
    co: float
    so2: float
    o3: float


@app.post("/test-predict")
def test_predict(data: AQITestRequest):
    """This route mirrors the model input exactly."""
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        features = np.array([
            data.pm2_5,
            data.pm10,
            data.no,
            data.no2,
            data.co,
            data.so2,
            data.o3
        ]).reshape(1, -1)

        predicted = float(model.predict(features)[0])

        return {"aqi": predicted}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {e}")


