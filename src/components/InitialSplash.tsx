"use client";

import { useEffect, useState } from "react";

export default function InitialSplash() {
  const [visible, setVisible] = useState(true);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fadeDelay = setTimeout(() => setVisible(false), 1100); // show while bar fills
    const removeDelay = setTimeout(() => setFinished(true), 1500); // unmount after fade

    return () => {
      clearTimeout(fadeDelay);
      clearTimeout(removeDelay);
    };
  }, []);

  if (finished) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-400 ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Pattern layer */}
      <div className="absolute inset-0 opacity-25 bg-tartan-blur" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded">
          <div className="h-full bg-[#B71E34] animate-loader" />
        </div>
        <p className="font-remilia text-sm tracking-wide">Preparing for you…</p>
      </div>
    </div>
  );
}
