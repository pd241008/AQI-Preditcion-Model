import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const pollutants = body.pollutants || body;
    const expectedKeys = ["pm2_5", "pm10", "no", "no2", "co", "so2", "o3"];

    const cleanData: Record<string, number> = {};

    // Clean + sanitize values
    for (const key of expectedKeys) {
      let value = pollutants[key];

      if (value === null || value === undefined || value === "") value = 0;

      if (typeof value === "string") {
        value = parseFloat(value.replace(/[^\d.-]/g, ""));
      }

      cleanData[key] = isNaN(value) ? 0 : Number(value);
    }

    console.log("📤 Sending to FastAPI:", cleanData);

    const FASTAPI_URL = process.env.FASTAPI_URL;
    if (!FASTAPI_URL) {
      return NextResponse.json(
        { error: "FASTAPI_URL missing in environment" },
        { status: 500 }
      );
    }

    // FIXED YOUR ENDPOINT HERE
    const response = await fetch(`${FASTAPI_URL}/test-predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanData),
    });

    if (!response.ok) {
      let msg = "Prediction failed";
      try {
        const err = await response.json();
        msg = err.detail || msg;
      } catch {}

      return NextResponse.json({ detail: msg }, { status: response.status });
    }

    const result = await response.json();
    console.log("✅ FastAPI response:", result);

    return NextResponse.json(result);
  } catch (err) {
    console.error("❌ Predict error:", err);
    return NextResponse.json(
      { detail: "Invalid data or backend unreachable" },
      { status: 500 }
    );
  }
}
