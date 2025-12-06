import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pollutants = body?.pollutants || body;

    const API_URL = process.env.ML_BACKEND_URL;
    const HF_TOKEN = process.env.HF_API_KEY;

    if (!API_URL) {
      return NextResponse.json(
        { error: "Missing ML_BACKEND_URL" },
        { status: 500 }
      );
    }

    // Send to backend correctly: /predict only
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pollutants),
    });

    const data = await response.json();
    return NextResponse.json(data);

  } catch (err) {
    return NextResponse.json(
      { error: "Prediction failed", details: String(err) },
      { status: 500 }
    );
  }
}
