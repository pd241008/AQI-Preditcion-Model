import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Support both `{ pollutants: {...} }` and flat `{...}` input
    const pollutants = data.pollutants || data;

    // Validate expected keys
    const expectedKeys = ["pm2_5", "pm10", "no", "no2", "co", "so2", "o3"];
    const cleanData: Record<string, number> = {};

    for (const key of expectedKeys) {
      let value = pollutants[key];
      if (value === undefined || value === null || value === "") value = 0;

      // Ensure it's a number
      if (typeof value === "string") {
        value = parseFloat(value.replace(/[^\d.-]/g, ""));
      }

      cleanData[key] = isNaN(value) ? 0 : Number(value);
    }

    console.log("🧩 Clean data being sent to FastAPI:", cleanData);

    // Send to your FastAPI backend
    const response = await fetch(`${process.env.FASTAPI_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanData),
    });

    // Handle any non-OK response
    if (!response.ok) {
      let errorMsg = "Prediction failed.";
      try {
        const error = await response.json();
        errorMsg = error.detail || errorMsg;
      } catch {
        console.warn("⚠️ Non-JSON error response from FastAPI");
      }
      return NextResponse.json(
        { detail: errorMsg },
        { status: response.status }
      );
    }

    // Get prediction result
    const result = await response.json();
    console.log("✅ FastAPI prediction response:", result);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("❌ Prediction error:", err);
    return NextResponse.json(
      { detail: "Backend connection failed or invalid JSON received" },
      { status: 500 }
    );
  }
}
