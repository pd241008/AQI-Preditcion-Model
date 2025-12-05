import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pollutants = body.pollutants || body;

    const required = ["pm2_5", "pm10", "no2", "so2", "co", "o3"];

    const clean: Record<string, number> = {};

    // 🔥 Clean incoming data
    for (const key of required) {
      let val = pollutants[key];

      if (val === undefined || val === null || val === "") val = 0;

      if (typeof val === "string") {
        val = parseFloat(val.replace(/[^\d.-]/g, ""));
      }

      clean[key] = isNaN(Number(val)) ? 0 : Number(val);
    }

    // 🔥 Load backend URL from ENV
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_BACKEND_URL in .env" },
        { status: 500 }
      );
    }

    console.log("📤 Sending to HF backend:", clean);

    // 🔥 Send to HuggingFace model
    const response = await fetch(`${BACKEND_URL}/test-predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean),
    });

    if (!response.ok) {
      let errMessage = "Prediction failed";
      try {
        const err = await response.json();
        errMessage = err.detail || errMessage;
      } catch {}
      return NextResponse.json({ error: errMessage }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error("❌ Prediction API Error:", error);
    return NextResponse.json(
      { error: "Unexpected error during prediction" },
      { status: 500 }
    );
  }
}
