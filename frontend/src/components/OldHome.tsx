/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
    } catch (err: any) {
      setError(err.message);
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
      </
