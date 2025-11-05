"use client";

import React, { useEffect, useState } from 'react';

interface ScrollIndicatorProps {
  className?: string;
}

export default function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);

      const handleScroll = () => {
        // Hide indicator after user starts scrolling
        if (window.scrollY > 50) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  if (!mounted || isReducedMotion || !visible) {
    return null;
  }

  return (
    <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 ${className}`}>
      <div className="flex flex-col items-center cursor-pointer group">
        <svg
          className="w-5 h-5 text-neutral-400 dark:text-neutral-500 animate-bounce-slow group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 18L4 6h16L12 18z" />
        </svg>
        <div className="w-px h-6 bg-gradient-to-b from-neutral-400/60 dark:from-neutral-500/60 to-transparent mt-2" />
      </div>
    </div>
  );
}

