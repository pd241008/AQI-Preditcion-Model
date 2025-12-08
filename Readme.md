🌫️ AQI Prediction Backend — FastAPI + ML Model
High-Performance ML Inference API deployed on Hugging Face Spaces

This Space hosts the backend inference server for the AI-Powered AQI Prediction System.
It serves a trained machine learning model that predicts Air Quality Index (AQI) based on six pollutant values.

The backend is built using:

⚡ FastAPI (high-performance async API framework)

🧠 DecisionTreeRegressor (trained on CPCB dataset)

🛡 Pydantic for request validation

📡 CORS enabled for integration with Vercel + Next.js frontend

🚀 Model loaded at startup → ultra-fast predictions

Frontend Repo: https://github.com/pd241008/AQI-Preditcion-Model

Frontend Live App: https://aqi-preditcion-model.vercel.app/

📌 1. API Overview

This backend exposes a single public endpoint:

POST /predict


It accepts pollutant concentrations and returns:

Predicted AQI value

AQI category (Good, Satisfactory, Moderate, Poor, Very Poor, Severe)

The endpoint is used by the Next.js serverless backend to display results in the UI.

📥 2. Request Format
POST /predict
Request Body (JSON)
{
  "pm2_5": 82.3,
  "pm10": 115.2,
  "so2": 19.4,
  "no2": 32.1,
  "co": 0.45,
  "o3": 21.8
}

Field Description
Pollutant	Unit	Example	Description
pm2_5	µg/m³	82.3	Fine particulate matter
pm10	µg/m³	115.2	Coarse particulate matter
so2	µg/m³	19.4	Sulfur Dioxide
no2	µg/m³	32.1	Nitrogen Dioxide
co	mg/m³	0.45	Carbon Monoxide
o3	µg/m³	21.8	Ground-level Ozone

Pydantic automatically validates types and structural correctness.

📤 3. Response Format
Successful Response (200)
{
  "aqi": 164,
  "category": "Moderate"
}

Fields
Field	Description
aqi	Predicted AQI value calculated by the model
category	Air quality classification (Govt. AQI scale)
⚠️ 4. Error Handling
Invalid Request Body (422)
{
  "detail": [
    {
      "loc": ["body", "pm2_5"],
      "msg": "value is not a valid float",
      "type": "type_error.float"
    }
  ]
}

Model or Internal Error (500)
{
  "error": "Model failed to predict"
}

🧠 5. Model Details
Property	Description
Algorithm	DecisionTreeRegressor
Training Notebook	Google Colab
Dataset	CPCB (Central Pollution Control Board)
Exported Model	model.pkl
Preprocessing	Scaling, NaN cleaning, feature selection
Input Features	PM2.5, PM10, SO2, NO2, CO, O3

The model is loaded once at app startup:

with open("model.pkl", "rb") as f:
    model = pickle.load(f)


This ensures instant predictions (no repeated disk I/O).

🧪 6. Testing the API
Using cURL
curl -X POST https://<your-space-url>/predict \
-H "Content-Type: application/json" \
-d '{
  "pm2_5": 80,
  "pm10": 110,
  "so2": 14,
  "no2": 30,
  "co": 0.5,
  "o3": 21
}'

Using JavaScript (fetch)
const res = await fetch("https://<your-space>/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    pm2_5: 75,
    pm10: 105,
    so2: 12,
    no2: 26,
    co: 0.48,
    o3: 20
  })
});

const data = await res.json();
console.log(data);

Using Python
import requests

payload = {
    "pm2_5": 88,
    "pm10": 120,
    "so2": 18,
    "no2": 35,
    "co": 0.52,
    "o3": 22
}

r = requests.post("https://<your-space>/predict", json=payload)
print(r.json())

🔧 7. Running Locally
Install dependencies
pip install -r requirements.txt

Start FastAPI server
uvicorn main:app --host 0.0.0.0 --port 7860

Local docs available at:
http://localhost:7860/docs
http://localhost:7860/redoc

🌐 8. Frontend Integration

This backend powers the AQI Prediction App deployed on Vercel.

Frontend URL:
👉 https://aqi-preditcion-model.vercel.app/

The frontend uses a Next.js API Route, which in turn:

Calls Google Gemini → generates pollutant data

Sends pollutants to this backend → gets AQI prediction

Displays results in UI

This keeps API keys secure and ensures a clean architecture.

🚀 9. Deployment Notes (For Maintainers)

Running on Hugging Face Spaces (Docker environment)

Model must be stored as:

/code/model.pkl


HF automatically installs dependencies from requirements.txt

App exposed on port 7860

Entry point must be named:

app = FastAPI(...)


To restart Space:
➡️ "Restart this Space"

To update:
➡️ Commit → HF auto-deploys

🏁 10. Contact / Issues

If you encounter problems or want to contribute:
🛠 GitHub Issues: https://github.com/pd241008/AQI-Preditcion-Model/issues

📩 Developer: Prathmesh Desai (Flamzey)
