"use client";
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamic import - load immediately since splash will wait for it
const ThreeSceneLazy = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => null,
});

interface ThreeHeroProps {
  className?: string;
}

export default function ThreeHero({ className = "" }: ThreeHeroProps) {
  // Load immediately - splash screen will wait for scene to be ready
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 h-screen w-screen ${className}`}>
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-black" />
      <div className="absolute inset-0">
        <ThreeSceneLazy />
      </div>
    </div>
  );
}
