'use client';

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CloudSun, Gauge } from "lucide-react";

export default function HeroLanding() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 py-20">

      {/* 🌈 Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-100 via-white to-blue-50 opacity-80" />

      {/* 🎨 Decorative Gradient Blobs */}
      <div className="absolute top-10 left-10 h-56 w-56 bg-blue-300/30 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-10 right-10 h-56 w-56 bg-purple-300/30 blur-3xl rounded-full -z-10" />

      {/* 🔥 Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-800"
      >
        Predict Air Quality  
        <span className="text-blue-600">. Smarter.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-5 text-lg md:text-xl max-w-2xl text-neutral-600"
      >
        Real-time AQI prediction powered by Machine Learning, Gemini AI,
        and a FastAPI backend — deployed in a fully modern cloud pipeline.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10 flex flex-col md:flex-row gap-4"
      >
        <a
          href="/predict"
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium flex items-center gap-2 hover:bg-blue-700 transition"
        >
          Start Prediction <ArrowRight size={18} />
        </a>

        <a
          href="https://github.com/pd241008/AQI-Preditcion-Model"
          target="_blank"
          className="px-6 py-3 rounded-xl border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 transition"
        >
          View on GitHub
        </a>
      </motion.div>

      {/* Feature Highlights */}
      <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl w-full">

        <mot
