"use client";

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to calculate scroll progress (0-1) for an element
 * Returns progress value where 0 = element not yet in view, 1 = fully scrolled past
 */
export function useScrollProgress(elementRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  const calculateProgress = useCallback(() => {
    if (!elementRef.current || typeof window === 'undefined') {
      setProgress(0);
      return;
    }

    const rect = elementRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    
    // Calculate distance from viewport center
    const distanceFromCenter = elementCenter - viewportCenter;
    
    // Normalize to 0-1 range
    // When element center is at viewport center, progress = 0.5
    // When element is above center, progress < 0.5
    // When element is below center, progress > 0.5
    const normalizedProgress = 0.5 + (distanceFromCenter / viewportHeight);
    
    // Clamp to 0-1 range
    setProgress(Math.max(0, Math.min(1, normalizedProgress)));
  }, [elementRef]);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(calculateProgress);
    };

    calculateProgress(); // Initial calculation
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [calculateProgress]);

  return progress;
}

