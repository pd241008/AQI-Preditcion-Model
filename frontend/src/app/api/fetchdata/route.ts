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
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    // 1) GET SYNTHETIC POLLUTANT DATA
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

    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" +
        GEMINI_API_KEY,
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

    const pollutants = JSON.parse(text);

    // 2) SEND TO ML BACKEND VIA NEXT.JS predict API
    const predictRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/predict`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pollutants),
      }
    );

    const predicted = await predictRes.json();

    return NextResponse.json({
      city,
      pollutants,
      predicted,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
