"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 600,
  distance = 50,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
}: ScrollRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [hasRevealed, setHasRevealed] = useState(false);

  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Track when element enters view for the first time
  useEffect(() => {
    if (inView && !hasRevealed) {
      setHasRevealed(true);
    }
  }, [inView, hasRevealed]);

  const getTransform = () => {
    if (!mounted || isReducedMotion) {
      return 'translate3d(0, 0, 0)';
    }

    // Always start hidden until it enters view
    if (!hasRevealed) {
      switch (direction) {
        case 'up':
          return `translate3d(0, ${distance}px, 0)`;
        case 'down':
          return `translate3d(0, ${-distance}px, 0)`;
        case 'left':
          return `translate3d(${distance}px, 0, 0)`;
        case 'right':
          return `translate3d(${-distance}px, 0, 0)`;
        case 'fade':
          return 'translate3d(0, 0, 0)';
        default:
          return `translate3d(0, ${distance}px, 0)`;
      }
    }

    return 'translate3d(0, 0, 0)';
  };

  const getOpacity = () => {
    if (!mounted || isReducedMotion) {
      return 1;
    }
    // Always start invisible until it enters view
    return hasRevealed ? 1 : 0;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: getTransform(),
        opacity: getOpacity(),
        transition: mounted && !isReducedMotion
          ? `transform ${duration}ms ease-out ${delay}ms, opacity ${duration}ms ease-out ${delay}ms`
          : 'none',
        willChange: mounted && !inView && !isReducedMotion ? 'transform, opacity' : 'auto',
      }}
    >
      {children}
    </div>
  );
}

