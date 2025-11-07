"use client";

import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import ParallaxElement from './ParallaxElement';

interface CenterFocusRevealProps {
  children: ReactNode;
  speed?: number;
  delay?: number;
  className?: string;
  visibilityThreshold?: number; // Threshold for binary visibility (default 0.5 = 50% viewport)
}

/**
 * Awwwards-style center focus reveal with binary visibility
 * Element is either fully visible (opacity 1) or fully hidden (opacity 0)
 * No gradual fades - clean, precise, one element at a time
 */
export default function CenterFocusReveal({
  children,
  speed = 0.2,
  delay = 0,
  className = '',
  visibilityThreshold = 0.5, // 50% viewport = fully visible, else hidden
}: CenterFocusRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '50% 0px',
    triggerOnce: false,
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

  useEffect(() => {
    if (!mounted || isReducedMotion || !elementRef.current) return;

    let rafId: number | null = null;

    const updateVisibility = () => {
      if (!elementRef.current) return;

      rafId = requestAnimationFrame(() => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        
        // Calculate distance from viewport center
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        
        // Binary visibility: element is visible if within threshold distance
        // threshold is a multiplier of viewport height (0.5 = 50% of viewport)
        const thresholdDistance = viewportHeight * visibilityThreshold;
        
        // Binary on/off - no gradual fade
        const isVisible = distanceFromCenter <= thresholdDistance;
        const opacityValue = isVisible ? 1.0 : 0.0;
        
        setOpacity(opacityValue);
      });
    };

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      updateVisibility();
    };

    updateVisibility();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [mounted, isReducedMotion, inView, visibilityThreshold]);

  if (!mounted || isReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={(node) => {
        elementRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref && 'current' in ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={className}
      style={{
        opacity,
        transition: mounted && !isReducedMotion ? 'opacity 300ms ease-out' : 'none',
        willChange: mounted && !isReducedMotion ? 'opacity' : 'auto',
      }}
    >
      <ParallaxElement speed={speed} direction="up" disabled={isReducedMotion}>
        {children}
      </ParallaxElement>
    </div>
  );
}

