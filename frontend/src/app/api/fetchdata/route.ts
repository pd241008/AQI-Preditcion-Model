import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    if (!city) {
      return NextResponse.json(
        { error: "City name is required" },
        { status: 400 }
      );
    }

    // 🔥 Load HF backend ENV
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_BACKEND_URL in .env" },
        { status: 500 }
      );
    }

    // 🔥 Call HuggingFace backend endpoint
    const res = await fetch(`${BACKEND_URL}/fetchData?city=${city}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch pollutant data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ city, pollutants: data });

  } catch (error) {
    console.error("❌ FetchData API Error:", error);
    return NextResponse.json(
      { error: "Unexpected error while fetching data" },
      { status: 500 }
    );
  }
}
