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

    // Read API URL from env
    const BASE_URL = process.env.ML_BACKEND_URL;

    if (!BASE_URL) {
      return NextResponse.json(
        { error: "ML_BACKEND_URL is not set in environment variables" },
        { status: 500 }
      );
    }

    // Build external API URL
    const externalUrl = `${BASE_URL}/fetchData?city=${encodeURIComponent(city)}`;

    const response = await fetch(externalUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from ML backend" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
