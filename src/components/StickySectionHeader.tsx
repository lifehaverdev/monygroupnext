"use client";

import React, { useEffect, useState } from 'react';
import { layoutConfig } from '../config/parallaxConfig';

interface StickySectionHeaderProps {
  children: React.ReactNode;
  sectionId: string; // ID of the parent section to watch
}

/**
 * Sticky header that only appears when its parent section is in view
 * Uses Intersection Observer to show/hide based on section visibility
 */
export default function StickySectionHeader({
  children,
  sectionId,
}: StickySectionHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set up observer for the parent section
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    let observer: IntersectionObserver | null = null;
    let timeoutId: NodeJS.Timeout;

    // Wait a bit for DOM to be ready
    timeoutId = setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (!section) {
        console.warn(`StickySectionHeader: Section with id "${sectionId}" not found`);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Header is visible when section is intersecting
            setIsVisible(entry.isIntersecting);
          });
        },
        {
          threshold: [0, 0.1, 0.5, 1], // Multiple thresholds for better detection
          rootMargin: '0px', // Show when any part of section is in viewport
        }
      );

      observer.observe(section);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [sectionId, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: layoutConfig.stickyHeaderTop,
        left: layoutConfig.stickyHeaderLeft,
        zIndex: 10,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 300ms ease-in-out',
        width: 'fit-content',
      }}
    >
      {children}
    </div>
  );
}

