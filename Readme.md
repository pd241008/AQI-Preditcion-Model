# 🌍 AQI Prediction Model  
*An AI-powered web application for forecasting Air Quality Index (AQI) using real-time data and machine learning.*

---

## 🧠 Overview  
The **AQI Prediction Model** predicts the Air Quality Index based on pollutant concentrations using a trained ML model.  
It combines a **Flask (Python)** backend for prediction logic with a **Next.js (React + TypeScript)** frontend for a sleek, responsive interface.

This project aims to increase environmental awareness by providing actionable insights on air quality in cities worldwide.

---

## 🚀 Features  
✅ Predict AQI based on pollutant inputs (PM2.5, PM10, NO₂, SO₂, CO, O₃)  
✅ Real-time integration with AQICN API *(optional)*  
✅ Interactive and minimalistic UI built with **Next.js + Tailwind CSS**  
✅ Machine Learning backend (Flask + scikit-learn / TensorFlow)  
✅ Fully responsive with dynamic result visualization  
✅ Easy deployment on **Vercel** (frontend) and **Render / Railway / AWS / Heroku** (backend)

---

## 🏗️ Project Structure  
```
AQI-Preditcion-Model/
│
├── backend/                 # Flask backend + ML model
│   ├── app.py               # API routes
│   ├── model/               # Trained ML model files (.pkl / .h5 / .json)
│   ├── requirements.txt     # Python dependencies
│   └── utils/               # Helper scripts (preprocessing, evaluation)
│
├── frontend/                # Next.js + Tailwind frontend
│   ├── pages/               # Next.js pages
│   ├── components/          # Reusable UI components
│   ├── public/              # Static assets
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

## 🛠 Installation Guide

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/pd241008/AQI-Preditcion-Model.git
cd AQI-Preditcion-Model
```

---

### 2️⃣ Backend Setup (Flask + Python)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 🔧 Environment Variables  
Create a `.env` file in the backend directory:
```
FLASK_APP=app.py
FLASK_ENV=development
MODEL_PATH=./model/aqi_model.pkl
PORT=5000
```

#### ▶️ Run the Backend
```bash
python app.py
# or
flask run --port=5000
```

Your backend API will be available at **http://localhost:5000**

---

### 3️⃣ Frontend Setup (Next.js + Tailwind)
```bash
cd ../frontend
npm install
```

#### 🔧 Environment Variables  
Create a `.env.local` file in the `frontend` directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### ▶️ Run the Frontend
```bash
npm run dev
```

Visit the app at **http://localhost:3000**

---

## 🧬 API Usage  
**Endpoint:** `POST /predict`  
**Request Body:**
```json
{
  "pm2_5": 35.6,
  "pm10": 78.1,
  "no2": 45.3,
  "so2": 12.0,
  "co": 0.8,
  "o3": 60.2
}
```
**Response:**
```json
{
  "predicted_aqi": 118,
  "category": "Unhealthy for Sensitive Groups"
}
```

---

## 🧠 Model Details  
- **Framework:** Scikit-learn / TensorFlow  
- **Algorithm:** Random Forest Regressor  
- **Input Features:** PM2.5, PM10, NO₂, SO₂, CO, O₃  
- **Output:** AQI value and classification (Good, Moderate, Unhealthy, etc.)  
- **Dataset:** Trained using AQICN + public government AQI datasets

---

## 🧩 Technologies Used  
| Layer | Technology |
|-------|-------------|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | Flask, Python |
| ML Model | Scikit-learn / TensorFlow |
| Data | AQICN / Kaggle AQI datasets |
| Deployment | Vercel (frontend), Render / Railway (backend) |

---

## 🧭 Deployment Guide

### 🧱 Backend (Flask)
1. Push your backend code to GitHub.
2. Use **Render**, **Railway**, or **Heroku** for free hosting.
3. Set environment variables (`MODEL_PATH`, `PORT`, etc.).
4. Deploy.

### 🌐 Frontend (Next.js)
1. Push your frontend code to GitHub.
2. Import the repo into **Vercel**.
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://<your-backend-url>
   ```
4. Deploy — done! 🎉

---

## 📊 Example Workflow  
1. Enter pollutant values manually or fetch real-time data.  
2. Click **Predict AQI**.  
3. The backend processes the input → returns predicted AQI.  
4. The frontend displays category, health info, and visualization.

---

## 🤝 Contributing  
Contributions are welcome!  
To contribute:
1. Fork the repo  
2. Create a new branch (`feature/new-idea`)  
3. Commit changes  
4. Open a Pull Request 🎯

---

## 📜 License  
This project is licensed under the **MIT License**.  
© 2025 Prathmesh Desai

---

## 📬 Contact  
**Author:** Prathmesh Desai  
📧 Email: your.email@example.com  
🌐 GitHub: [@pd241008](https://github.com/pd241008)

---

## 🌱 Roadmap  
- [ ] Integrate real-time AQI data from AQICN API  
- [ ] Add historical AQI trend graphs  
- [ ] Include Google Maps for location-based AQI  
- [ ] Deploy backend to cloud for global access  
- [ ] Improve model accuracy with meteorological data  

---

⭐ **If you find this project helpful, please give it a star on GitHub!**  
Every ⭐ motivates further open-source work 🌿
