from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import numpy as np

# Define simple test request model
class AQITestRequest(BaseModel):
    pm2_5: float
    pm10: float
    so2: float
    no2: float
    co: float
    o3: float
    temperature: float
    humidity: float

# Load the model
try:
    with open("aqi_model.pkl", "rb") as f:
        model = pickle.load(f)
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

app = FastAPI()

# Test prediction endpoint
@app.post("/test-predict")
async def test_predict(data: AQITestRequest):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded.")

    try:
        # Convert to feature array in correct order
        features = np.array([
            data.pm2_5, data.pm10, data.so2, data.no2, 
            data.co, data.o3, data.temperature, data.humidity
        ]).reshape(1, -1)

        # Direct model prediction
        predicted_aqi = model.predict(features)[0]

        return {"aqi": float(predicted_aqi)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {e}")


