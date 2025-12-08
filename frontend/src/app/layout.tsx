import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AQI Prediction System | ML + FastAPI + Next.js",
  description:
    "A modern full-stack Air Quality Index prediction system using Next.js, FastAPI, Google Gemini, and a trained ML model deployed on HuggingFace Spaces.",
  keywords: [
    "AQI Prediction",
    "Air Quality Index",
    "Machine Learning",
    "FastAPI",
    "Next.js",
    "Google Gemini",
    "HuggingFace",
    "ML Deployment",
    "Environmental AI",
    "Air Pollution Analysis",
  ],
  authors: [{ name: "Prathmesh Desai" }],
  openGraph: {
    title: "AQI Prediction System",
    description:
      "Real-time AQI prediction using Machine Learning, Gemini AI, and FastAPI deployment.",
    url: "https://aqi-preditcion-model.vercel.app/",
    siteName: "AQI Prediction System",
    type: "website",
  },
  twitter: {
    title: "AQI Prediction System",
    description:
      "Real-time AQI analysis using ML + Gemini + FastAPI + Next.js.",
    card: "summary_large_image",
  },
  metadataBase: new URL("https://aqi-preditcion-model.vercel.app"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
