/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from "react";
import { Loader2, Zap, Cloud, AlertTriangle, Search } from "lucide-react"; // Using lucide-react for modern icons

// --- Interfaces (No Change) ---
interface Pollutants {
  pm2_5: number;
  pm10: number;
  no: number;
  no2: number;
  co: number;
  so2: number;
  o3: number;
}

interface FetchResponse {
  city: string;
  pollutants: Pollutants;
}

interface PredictionResponse {
  aqi: number;
  category: string;
}
// --- End Interfaces ---

export default function HomePage() {
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchResponse | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reusing the prediction logic as it's solid
  const handlePredict = useCallback(async (pollutants: Pollutants) => {
    try {
      const res = await fetch(`/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pollutants),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.detail || "Prediction failed");

      setPrediction({
        aqi: Math.round(result.aqi), // Rounding AQI for cleaner display
        category: result.category,
      });
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  const handleFetchData = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);
    setData(null); // Clear previous data when starting a new fetch

    try {
      const res = await fetch(
        `/api/fetchdata?city=${encodeURIComponent(city.trim())}`
      );
      const json = await res.json();

      if (!res.ok)
        throw new Error(json.error || `Failed to fetch data for "${city}"`);

      setData(json);
      await handlePredict(json.pollutants);
    } catch (err: any) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Modernized color logic for better contrast and vibrancy
  const getAQIStyle = (category: string) => {
    switch (category) {
      case "Good":
        return {
          color: "text-green-600",
          bg: "bg-green-100",
          ring: "ring-green-400",
        };
      case "Moderate":
        return {
          color: "text-yellow-600",
          bg: "bg-yellow-100",
          ring: "ring-yellow-400",
        };
      case "Unhealthy for Sensitive Groups":
        return {
          color: "text-orange-600",
          bg: "bg-orange-100",
          ring: "ring-orange-400",
        };
      case "Unhealthy":
        return {
          color: "text-red-600",
          bg: "bg-red-100",
          ring: "ring-red-400",
        };
      case "Very Unhealthy":
        return {
          color: "text-purple-600",
          bg: "bg-purple-100",
          ring: "ring-purple-400",
        };
      case "Hazardous":
        return {
          color: "text-rose-700",
          bg: "bg-rose-100",
          ring: "ring-rose-500",
        };
      default:
        return {
          color: "text-gray-600",
          bg: "bg-gray-100",
          ring: "ring-gray-400",
        };
    }
  };

  // Helper component for pollutant items
  const PollutantItem = ({ name, value }: { name: string; value: number }) => (
    <li className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0 group">
      <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">
        {name}
      </span>
      <span className="font-semibold text-gray-800 text-lg group-hover:text-blue-800 transition-colors">
        {value.toFixed(2)}
      </span>
    </li>
  );

  return (
    <main className="min-h-screen bg-white text-gray-900 p-4 sm:p-8">
      {/* Header and Input Section */}
      <header className="max-w-4xl mx-auto pt-12 pb-8 text-center">
        <h1 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
          Global Air Quality Index Predictor
        </h1>
        <p className="text-lg text-gray-500">
          Real-time pollutant data and AQI prediction for any city.
        </p>
      </header>

      <div className="max-w-3xl mx-auto mb-8 bg-white shadow-2xl rounded-xl p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetchData()}
              placeholder="E.g., London, Mumbai, New York..."
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-base focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
              disabled={loading}
            />
          </div>
          <button
            onClick={handleFetchData}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-base">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Fetching...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" /> Predict AQI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content (Error, Data, Prediction) */}
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="flex items-center justify-center p-4 mb-8 text-red-700 bg-red-50 border-l-4 border-red-500 rounded-md shadow-lg transition-opacity duration-300 animate-fadeIn">
            <AlertTriangle className="w-6 h-6 mr-3" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Data & Prediction Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AQI Prediction Card (Center/Left) */}
          <div className="lg:col-span-2">
            {loading && !data && (
              <div className="h-80 w-full flex items-center justify-center bg-gray-50 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center text-gray-500">
                  <Cloud className="w-10 h-10 mx-auto animate-pulse" />
                  <p className="mt-2 text-lg">Gathering air quality data...</p>
                </div>
              </div>
            )}

            {prediction && (
              <div
                className={`flex flex-col items-center justify-center p-8 rounded-3xl shadow-2xl transition duration-500 transform lg:h-full min-h-80 ${
                  getAQIStyle(prediction.category).bg
                } border border-gray-200`}>
                <p className="text-xl font-medium mb-2 text-gray-600">
                  Predicted AQI for{" "}
                  <span className="font-bold text-gray-800">
                    {data?.city || city}
                  </span>
                </p>

                {/* Animated AQI Circle */}
                <div
                  className={`relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center rounded-full transition-all duration-700 my-4 shadow-xl border-8 ${
                    getAQIStyle(prediction.category).ring
                  }`}>
                  <div className="absolute inset-0 rounded-full bg-white opacity-80 backdrop-blur-sm"></div>
                  <div className="z-10 text-center">
                    <div className="text-7xl sm:text-8xl font-black transition-transform duration-700 animate-scaleIn text-gray-800">
                      {prediction.aqi}
                    </div>
                  </div>
                </div>

                <div
                  className={`text-2xl sm:text-3xl font-bold transition-colors duration-700 px-4 py-1 rounded-full ${
                    getAQIStyle(prediction.category).color
                  } bg-white shadow-md`}>
                  {prediction.category}
                </div>
                <p className="text-sm mt-3 text-gray-600 max-w-sm text-center">
                  This level indicates **&quot;{prediction.category}&rdquo;**
                  air quality, which may affect sensitive groups.
                </p>
              </div>
            )}
          </div>

          {/* Pollutant Data Card (Right) */}
          {data && (
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100 transition duration-500 ease-out transform hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-3 flex items-center">
                <Cloud className="w-6 h-6 mr-2 text-cyan-500" />
                Raw Pollutant Levels
              </h2>
              <ul className="divide-y divide-gray-100">
                <PollutantItem
                  name="PM₂.₅"
                  value={data.pollutants.pm2_5}
                />
                <PollutantItem
                  name="PM₁₀"
                  value={data.pollutants.pm10}
                />
                <PollutantItem
                  name="Nitrogen Monoxide (NO)"
                  value={data.pollutants.no}
                />
                <PollutantItem
                  name="Nitrogen Dioxide (NO₂)"
                  value={data.pollutants.no2}
                />
                <PollutantItem
                  name="Carbon Monoxide (CO)"
                  value={data.pollutants.co}
                />
                <PollutantItem
                  name="Sulfur Dioxide (SO₂)"
                  value={data.pollutants.so2}
                />
                <PollutantItem
                  name="Ozone (O₃)"
                  value={data.pollutants.o3}
                />
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
