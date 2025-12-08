"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from "react";
import { Loader2, Zap, Cloud, AlertTriangle, Search } from "lucide-react";

// --- Interfaces ---
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

export default function OldHome() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FetchResponse | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        aqi: Math.round(result.aqi),
        category: result.category,
      });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred during prediction.");
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
    setData(null);

    try {
      const res = await fetch(
        `/api/fetchdata?city=${encodeURIComponent(city.trim())}`
      );
      const json = await res.json();

      if (!res.ok)
        throw new Error(json.error || `Failed to fetch data for "${city}"`);

      setData(json);
      await handlePredict(json.pollutants);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred while fetching data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const getAQIStyle = (category: string) => {
    switch (category) {
      case "Good":
        return { color: "text-green-600", bg: "bg-green-100", ring: "ring-green-400" };
      case "Moderate":
        return { color: "text-yellow-600", bg: "bg-yellow-100", ring: "ring-yellow-400" };
      case "Unhealthy for Sensitive Groups":
        return { color: "text-orange-600", bg: "bg-orange-100", ring: "ring-orange-400" };
      case "Unhealthy":
        return { color: "text-red-600", bg: "bg-red-100", ring: "ring-red-400" };
      case "Very Unhealthy":
        return { color: "text-purple-600", bg: "bg-purple-100", ring: "ring-purple-400" };
      case "Hazardous":
        return { color: "text-rose-700", bg: "bg-rose-100", ring: "ring-rose-500" };
      default:
        return { color: "text-gray-600", bg: "bg-gray-100", ring: "ring-gray-400" };
    }
  };

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
      {/* Header */}
      <header className="max-w-4xl mx-auto pt-12 pb-8 text-center">
        <h1 className="text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
          Global Air Quality Index Predictor
        </h1>
        <p className="text-lg text-gray-500">
          Real-time pollutant data and AQI prediction for any city.
        </p>
      </header>

      {/* Search Input */}
      <div className="max-w-3xl mx-auto mb-8 bg-white shadow-2xl rounded-xl p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetchData()}
              placeholder="E.g., London, Mumbai, New York..."
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3"
            />
          </div>

          <button
            onClick={handleFetchData}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
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

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
        {error && (
          <div className="flex items-center justify-center p-4 mb-8 text-red-700 bg-red-50 border-l-4 border-red-500 rounded-md shadow-lg">
            <AlertTriangle className="w-6 h-6 mr-3" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prediction */}
          <div className="lg:col-span-2">
            {prediction && (
              <div
                className={`p-8 rounded-3xl shadow-2xl ${
                  getAQIStyle(prediction.category).bg
                }`}
              >
                <p className="text-xl font-medium">
                  Predicted AQI for <span className="font-bold">{data?.city || city}</span>
                </p>

                <div
                  className={`relative w-48 h-48 mx-auto my-6 rounded-full border-8 ${
                    getAQIStyle(prediction.category).ring
                  } flex items-center justify-center`}
                >
                  <div className="text-7xl font-black">{prediction.aqi}</div>
                </div>

                <div
                  className={`text-2xl font-bold text-center ${
                    getAQIStyle(prediction.category).color
                  }`}
                >
                  {prediction.category}
                </div>
              </div>
            )}
          </div>

          {/* Pollutant Card */}
          {data && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-700">
                <Cloud className="w-6 h-6 mr-2 text-cyan-500" />
                Raw Pollutant Levels
              </h2>

              <ul>
                <PollutantItem name="PM₂.₅" value={data.pollutants.pm2_5} />
                <PollutantItem name="PM₁₀" value={data.pollutants.pm10} />
                <PollutantItem name="Nitrogen Monoxide (NO)" value={data.pollutants.no} />
                <PollutantItem name="Nitrogen Dioxide (NO₂)" value={data.pollutants.no2} />
                <PollutantItem name="Carbon Monoxide (CO)" value={data.pollutants.co} />
                <PollutantItem name="Sulfur Dioxide (SO₂)" value={data.pollutants.so2} />
                <PollutantItem name="Ozone (O₃)" value={data.pollutants.o3} />
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
