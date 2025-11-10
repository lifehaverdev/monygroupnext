"use client";
import dynamic from "next/dynamic";
import React from "react";

const ThreeSceneLazy = dynamic(() => import("./ThreeScene"), { 
  ssr: false, 
  loading: () => null 
});

interface PageSceneProps {
  className?: string;
}

/**
 * Shared component for displaying Three.js scene backgrounds on pages.
 * Automatically detects the current page slug and loads images from
 * /images/displays/{slug}/ directory.
 * 
 * To add a new page scene, simply create a folder in displays/ with
 * 4 numbered JPEG files (1.jpeg, 2.jpeg, 3.jpeg, 4.jpeg).
 */
export default function PageScene({ className = "" }: PageSceneProps) {
  return (
    <div className={`pointer-events-none fixed inset-0 -z-10 h-screen w-screen ${className}`}>
      {/* Gradient overlay for readability - softer dark mode gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950" />
      <div className="absolute inset-0">
        <ThreeSceneLazy />
      </div>
    </div>
  );
}

