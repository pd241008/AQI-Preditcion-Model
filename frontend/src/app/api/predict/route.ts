import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pollutants = body?.pollutants || body;

    const API_URL = process.env.ML_BACKEND_URL; // Optional: alternate backend URL
    const HF_SPACE_URL = process.env.NEXT_PUBLIC_BASE_URL; // Huggingface backend
    const HF_TOKEN = process.env.HF_API_KEY;

    if (!HF_TOKEN) {
      return NextResponse.json(
        { error: "HF_API_KEY missing in environment variables" },
        { status: 500 }
      );
    }

    const finalBackendURL = API_URL || `${HF_SPACE_URL}/predict`;

    // SEND TO BACKEND
    const response = await fetch(finalBackendURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pollutants),
    });

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "Prediction failed", details: String(err) },
      { status: 500 }
    );
  }
}
