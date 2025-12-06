/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "City name is required" },
      { status: 400 }
    );
  }

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY in env" },
        { status: 500 }
      );
    }

    // PROMPT
    const prompt = `
Generate synthetic pollutant data for the city "${city}".  
Return only this JSON:
{
  "pm2_5": number,
  "pm10": number,
  "no": number,
  "no2": number,
  "co": number,
  "so2": number,
  "o3": number
}
`;

    // GEMINI REQUEST
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 150 },
        }),
      }
    );

    const result = await geminiRes.json();
    let text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let pollutants;
    try {
      pollutants = JSON.parse(text);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to parse Gemini output", raw: text },
        { status: 500 }
      );
    }

    // 2) SEND TO BACKEND PREDICT
    const backendURL = process.env.NEXT_PUBLIC_BASE_URL; // FIXED

    const predictRes = await fetch(`${backendURL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pollutants),
    });

    const predictData = await predictRes.json();

    if (!predictRes.ok) {
      return NextResponse.json(
        { error: "Backend prediction failed", details: predictData },
        { status: 500 }
      );
    }

    return NextResponse.json({
      city,
      pollutants,
      predictedAQI: predictData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
