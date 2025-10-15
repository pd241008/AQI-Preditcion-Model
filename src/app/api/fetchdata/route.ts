import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city)
    return NextResponse.json(
      { error: "City name is required" },
      { status: 400 }
    );

  try {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const prompt = `Provide the latest air quality pollutant data for ${city}.
    Include numerical values for: pm2_5, pm10, no, no2, co, so2, o3.
    Return only pure JSON (no markdown, no code blocks) in this format:
    {"pm2_5": value, "pm10": value, "no": value, "no2": value, "co": value, "so2": value, "o3": value}.`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const result = await response.json();

    console.log("🌐 Gemini API raw response:", JSON.stringify(result, null, 2));

    let text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // 🧹 Clean up Markdown code block formatting if present
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("📜 Cleaned Gemini text:", text);

    let pollutants;
    try {
      pollutants = JSON.parse(text);
    } catch (err) {
      console.warn("⚠️ Could not parse Gemini JSON, fallback to raw:", err);
      pollutants = { rawResponse: text };
    }

    // 🧩 Check structure before returning
    console.log("🧩 Final pollutants object:", pollutants);

    return NextResponse.json({ city, pollutants });
  } catch (err) {
    console.error("❌ Gemini fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
