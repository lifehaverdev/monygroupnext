"use client";
import dynamic from 'next/dynamic';
import React from 'react';
import useIdle from '../hooks/useIdle';

// Dynamic import wrapped so bundle is fetched only when idle or after first interaction.
const ThreeSceneLazy = dynamic(() => import('./ThreeScene'), {
  ssr: false,
  loading: () => null,
});

export default function ThreeHero() {
  const idle = useIdle(1500);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen">
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-black" />
      {idle && (
        <div className="absolute inset-0">
          <ThreeSceneLazy />
        </div>
      )}
    </div>
  );
}
