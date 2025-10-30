"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import heavy Three.js hero to avoid blocking SSR
const ThreeHero = dynamic(() => import("../ThreeHero"), {
  ssr: false,
  loading: () => <div className="h-[60vh] bg-gradient-to-br from-slate-800 to-slate-900" />,
});

export default function Hero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center">
      {/* Background */}
      <ThreeHero />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Crafting Liquid-Glass Web Experiences
        </h1>
        <p className="mt-4 text-xl text-slate-200">
          Sleek. Kinetic. Immersive.
        </p>
      </div>
    </section>
  );
}
