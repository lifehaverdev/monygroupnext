"use client";
import dynamic from "next/dynamic";
import React from "react";
import useIdle from "../../hooks/useIdle";

const ThreeSceneLazy = dynamic(() => import("../ThreeScene"), { ssr: false, loading: () => null });

const portraits = {
  frontLeft: "/images/portraits/arthurt1.jpeg",
  frontRight: "/images/portraits/arthurt2.jpeg",
  backLeft: "/images/portraits/arthurt3.jpeg",
  backRight: "/images/portraits/arthurt4.jpeg",
} as const;

export default function PortraitScene() {
  const idle = useIdle(1500);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen">
      {/* subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-black" />
      {idle && (
        <div className="absolute inset-0">
          <ThreeSceneLazy images={portraits} />
        </div>
      )}
    </div>
  );
}
