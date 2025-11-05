"use client";

import React, { ReactNode, useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import ParallaxElement from './ParallaxElement';

interface CenterFocusRevealProps {
  children: ReactNode;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function CenterFocusReveal({
  children,
  speed = 0.3,
  delay = 0,
  className = '',
}: CenterFocusRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [transform, setTransform] = useState('translate3d(0, 40px, 0)');
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

    const updateOpacity = () => {
      if (!elementRef.current) return;

      rafId = requestAnimationFrame(() => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        
        // Calculate distance from viewport center
        const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
        
        // Create a readable focus zone with fade in/out
        // - focusZone: Items stay fully opaque in this range (readable area)
        // - fadeZone: Items fade in/out in this range (transition area)
        const focusZone = viewportHeight * 0.15; // 15% of viewport - fully opaque range
        const fadeZone = viewportHeight * 0.25; // 25% of viewport - fade transition range
        const maxDistance = focusZone + fadeZone; // 40% total - fade out complete
        
        // Calculate opacity with plateau for readability
        let opacityValue: number;
        if (distanceFromCenter <= focusZone) {
          // In focus zone - fully opaque for reading
          opacityValue = 1.0;
        } else if (distanceFromCenter <= maxDistance) {
          // In fade zone - transition from 1.0 to 0.0
          const fadeProgress = (distanceFromCenter - focusZone) / fadeZone;
          opacityValue = Math.max(0, 1 - fadeProgress);
        } else {
          // Beyond fade zone - fully transparent
          opacityValue = 0;
        }
        
        // Calculate transform: subtle movement during fade
        let translateY: number;
        if (distanceFromCenter <= focusZone) {
          // In focus - minimal movement
          translateY = 0;
        } else if (distanceFromCenter <= maxDistance) {
          // Fading - move slightly based on distance
          const fadeProgress = (distanceFromCenter - focusZone) / fadeZone;
          translateY = fadeProgress * 30; // Move up to 30px as fading
        } else {
          // Beyond fade - maintain position
          translateY = 30;
        }
        
        setOpacity(opacityValue);
        setTransform(`translate3d(0, ${translateY}px, 0)`);
      });
    };

    const handleScroll = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      updateOpacity();
    };

    updateOpacity();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [mounted, isReducedMotion, inView]);

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
        transform,
        transition: mounted && !isReducedMotion ? 'opacity 200ms ease-out, transform 200ms ease-out' : 'none',
        willChange: mounted && !isReducedMotion ? 'opacity, transform' : 'auto',
      }}
    >
      <ParallaxElement speed={speed} direction="up" disabled={isReducedMotion}>
        {children}
      </ParallaxElement>
    </div>
  );
}

