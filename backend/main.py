from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI(title="AQI Prediction API")

# Allow frontend (Next.js) requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained model
try:
    with open("aqi_model.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully")
except Exception as e:
    print("❌ Failed to load model:", e)
    model = None

# Input schema
class AQIRequest(BaseModel):
    pm2_5: float
    pm10: float
    no: float
    no2: float
    co: float
    so2: float
    o3: float

# Compute category
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

@app.get("/")
def home():
    return {"message": "AQI API running"}

@app.post("/predict")
def predict(data: AQIRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        X = np.array([
            data.pm2_5,
            data.pm10,
            data.no,
            data.no2,
            data.co,
            data.so2,
            data.o3
        ]).reshape(1, -1)

        aqi = float(model.predict(X)[0])
        category = compute_aqi_category(aqi)
        return {"aqi": round(aqi, 2), "category": category}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {e}")
