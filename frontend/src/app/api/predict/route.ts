import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pollutants = body?.pollutants || body;

    const API_URL = process.env.ML_BACKEND_URL;
    const HF_TOKEN = process.env.HF_API_KEY;

    if (!API_URL) {
      return NextResponse.json(
        { error: "ML_BACKEND_URL missing in environment variables" },
        { status: 500 }
      );
    }

    if (!HF_TOKEN) {
      return NextResponse.json(
        { error: "HF_API_KEY missing in environment variables" },
        { status: 500 }
      );
    }

    const hfResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pollutants),
    });

    const data = await hfResponse.json();
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: "Prediction failed", details: String(err) },
      { status: 500 }
    );
  }
}
