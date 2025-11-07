"use client";

import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParallax } from '../hooks/useParallax';
import { cn } from '../lib/utils';

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  offset?: number;
  className?: string;
  disabled?: boolean;
  threshold?: number;
}

export default function ParallaxElement({
  children,
  speed = 0.6,
  direction = 'up',
  offset = 0,
  className = '',
  disabled = false,
  threshold = 0,
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false,
  });

  // Check for reduced motion preference after mount
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calculate element position relative to viewport
  useEffect(() => {
    if (!mounted || !elementRef.current || disabled || isReducedMotion || !inView) {
      setElementTop(0);
      setElementHeight(0);
      return;
    }

    let rafId: number | null = null;

    const updatePosition = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          setElementTop(rect.top);
          setElementHeight(rect.height);
        }
      });
    };

    updatePosition(); // Initial calculation
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [disabled, isReducedMotion, inView, mounted]);

  // Calculate parallax transform based on element's position in viewport
  const getTransform = () => {
    // Always return the same initial transform during SSR and initial client render
    if (!mounted || disabled || isReducedMotion || !inView || typeof window === 'undefined') {
      return 'translate3d(0, 0, 0)';
    }

    const viewportHeight = window.innerHeight;
    const elementCenter = elementTop + elementHeight / 2;
    const viewportCenter = viewportHeight / 2;
    
    // Calculate distance from viewport center (-1 to 1)
    const distanceFromCenter = (elementCenter - viewportCenter) / viewportHeight;
    
    // Apply speed multiplier
    const parallaxValue = distanceFromCenter * speed * 100 + offset;
    
    switch (direction) {
      case 'up':
        return `translate3d(0, ${parallaxValue}px, 0)`;
      case 'down':
        return `translate3d(0, ${-parallaxValue}px, 0)`;
      case 'left':
        return `translate3d(${parallaxValue}px, 0, 0)`;
      case 'right':
        return `translate3d(${-parallaxValue}px, 0, 0)`;
      default:
        return `translate3d(0, ${parallaxValue}px, 0)`;
    }
  };

  const transform = getTransform();

  return (
    <div
      ref={(node) => {
        elementRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className={cn('parallax-element', className)}
      style={{
        transform,
        willChange: disabled || isReducedMotion ? 'auto' : 'transform',
      }}
    >
      {children}
    </div>
  );
}

