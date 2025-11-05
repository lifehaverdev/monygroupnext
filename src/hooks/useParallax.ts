"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  disabled?: boolean;
}

export function useParallax({
  speed = 0.5,
  direction = 'up',
  offset = 0,
  disabled = false,
}: UseParallaxOptions = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  // Check for reduced motion preference after mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
      }
    });
  }, []);

  useEffect(() => {
    if (!mounted || disabled || prefersReducedMotion) {
      setScrollY(0);
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, disabled, prefersReducedMotion, mounted]);

  const transform = useMemo(() => {
    // Always return the same initial transform during SSR and initial client render
    if (!mounted || disabled || prefersReducedMotion) {
      return 'translate3d(0, 0, 0)';
    }

    const value = scrollY * speed + offset;
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${value}px, 0)`;
      case 'down':
        return `translate3d(0, ${-value}px, 0)`;
      case 'left':
        return `translate3d(${value}px, 0, 0)`;
      case 'right':
        return `translate3d(${-value}px, 0, 0)`;
      default:
        return `translate3d(0, ${value}px, 0)`;
    }
  }, [scrollY, speed, direction, offset, disabled, prefersReducedMotion, mounted]);

  return {
    transform,
    scrollY,
    progress: useMemo(() => {
      if (typeof window === 'undefined') return 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      return maxScroll > 0 ? scrollY / maxScroll : 0;
    }, [scrollY]),
  };
}

