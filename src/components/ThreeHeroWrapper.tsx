"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// This wrapper exists solely to create a clean server/client boundary.
// It prevents Turbopack from statically analyzing the R3F module graph
// when imported from server components.
const ThreeHeroClient = dynamic(() => import('./ThreeHero'), {
  ssr: false,
  loading: () => null,
});

export default function ThreeHeroWrapper(props: { className?: string }) {
  return <ThreeHeroClient {...props} />;
}
