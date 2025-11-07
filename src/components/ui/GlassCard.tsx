"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { isMobileDevice } from '../../lib/device';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'sm' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
}

  const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', hover = false, children, ...props }, ref) => {
    const glassRef = useRef<HTMLDivElement>(null);
    const [isInParallax, setIsInParallax] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Combine refs
    const combinedRef = (node: HTMLDivElement | null) => {
      glassRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    useEffect(() => {
      setMounted(true);
      setIsMobile(isMobileDevice());
    }, []);

    // Check if glass card is inside a transformed container (parallax, scroll reveal, etc.)
    // Any transform on a parent creates a stacking context that blocks the filter from seeing fixed background
    useEffect(() => {
      if (!mounted || !glassRef.current) return;

      const checkTransformedParent = () => {
        if (!glassRef.current) return;
        
        let parent = glassRef.current.parentElement;
        while (parent && parent !== document.body) {
          // Check for parallax-element class
          if (parent.classList.contains('parallax-element')) {
            setIsInParallax(true);
            return;
          }
          
          // Check if parent has a transform property set (even if it's identity matrix)
          // This is important because ScrollReveal applies transform via inline style
          const inlineTransform = parent.style.transform;
          if (inlineTransform && inlineTransform !== 'none') {
            // Parent has transform set via inline style - this creates a stacking context
            setIsInParallax(true);
            return;
          }
          
          // Also check computed transform (for cases where transform is applied via CSS)
          const style = window.getComputedStyle(parent);
          const transform = style.transform;
          if (transform && transform !== 'none' && transform !== 'matrix(1, 0, 0, 1, 0, 0)') {
            // Parent has a transform - this creates a stacking context
            setIsInParallax(true);
            return;
          }
          
          parent = parent.parentElement;
        }
        setIsInParallax(false);
      };

      checkTransformedParent();
      
      // Use MutationObserver to watch for DOM changes and style changes
      const observer = new MutationObserver(() => {
        // Small delay to ensure styles are computed
        requestAnimationFrame(checkTransformedParent);
      });
      
      if (glassRef.current) {
        observer.observe(document.body, { 
          childList: true, 
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class']
        });
      }

      // Also check on scroll/resize as transforms may change
      const handleUpdate = () => requestAnimationFrame(checkTransformedParent);
      window.addEventListener('scroll', handleUpdate, { passive: true });
      window.addEventListener('resize', handleUpdate, { passive: true });

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleUpdate);
        window.removeEventListener('resize', handleUpdate);
      };
    }, [mounted]);

    // Create and manage fixed filter layer OUTSIDE any transformed parents
    // SKIP ON MOBILE: Expensive SVG filters cause compositing issues with Three.js on mobile
    useEffect(() => {
      // Don't create filter layer on mobile devices - causes Three.js disruption
      if (!mounted || !isInParallax || !glassRef.current || isMobile) return;

      let filterLayer: HTMLDivElement | null = null;
      let rafId: number | null = null;
      let resizeObserver: ResizeObserver | null = null;
      let intersectionObserver: IntersectionObserver | null = null;
      let lastUpdateTime = 0;
      const MOBILE_THROTTLE_MS = 100; // Throttle updates on mobile (though we skip entirely)
      const DESKTOP_THROTTLE_MS = 16; // ~60fps on desktop

      // Small delay to ensure glass card is fully rendered and positioned
      const timeoutId = setTimeout(() => {
        if (!glassRef.current) return;

        // Create filter layer and append to body (outside any transformed parents)
        // This ensures it's in the same coordinate space as the fixed background
        filterLayer = document.createElement('div');
        filterLayer.className = 'glass-filter-layer-fixed';
        filterLayer.setAttribute('aria-hidden', 'true');
        filterLayer.setAttribute('data-glass-id', `glass-${Math.random().toString(36).substr(2, 9)}`);
        document.body.appendChild(filterLayer);

        const updateFilterPosition = () => {
          if (!glassRef.current || !filterLayer?.parentElement) return;

          const rect = glassRef.current.getBoundingClientRect();
          const computedStyle = window.getComputedStyle(glassRef.current);
          
          // Position and size to match glass card exactly (using viewport coordinates)
          // Since filter layer is fixed and glass card might be transformed, we use getBoundingClientRect
          // which gives us the viewport-relative position
          filterLayer.style.top = `${rect.top}px`;
          filterLayer.style.left = `${rect.left}px`;
          filterLayer.style.width = `${rect.width}px`;
          filterLayer.style.height = `${rect.height}px`;
          
          // Match border radius from glass card
          filterLayer.style.borderRadius = computedStyle.borderRadius || '1rem';
        };

        // Throttled update function with time-based throttling
        const scheduleUpdate = () => {
          const now = performance.now();
          const throttleMs = isMobile ? MOBILE_THROTTLE_MS : DESKTOP_THROTTLE_MS;
          
          if (now - lastUpdateTime < throttleMs) {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
              const nowAfterRAF = performance.now();
              if (nowAfterRAF - lastUpdateTime >= throttleMs) {
                updateFilterPosition();
                lastUpdateTime = nowAfterRAF;
              }
              rafId = null;
            });
            return;
          }

          lastUpdateTime = now;
          if (rafId !== null) return;
          rafId = requestAnimationFrame(() => {
            updateFilterPosition();
            rafId = null;
          });
        };

        // Initial position
        updateFilterPosition();

        // Use IntersectionObserver to only update when glass card is visible
        // This significantly reduces unnecessary updates when cards are off-screen
        intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Card is visible, allow updates
                updateFilterPosition();
              }
            });
          },
          {
            root: null,
            rootMargin: '50px', // Start updating slightly before card enters viewport
            threshold: 0,
          }
        );

        if (glassRef.current) {
          intersectionObserver.observe(glassRef.current);
        }

        // Update on scroll and resize with throttling
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate, { passive: true });

        // Use ResizeObserver to watch for size changes
        resizeObserver = new ResizeObserver(scheduleUpdate);
        if (glassRef.current) {
          resizeObserver.observe(glassRef.current);
        }
      }, 50); // Small delay to ensure DOM is ready

      // Cleanup function
      return () => {
        clearTimeout(timeoutId);
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
        }
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        if (intersectionObserver) {
          intersectionObserver.disconnect();
        }
        // Remove filter layer from DOM
        if (filterLayer?.parentElement) {
          filterLayer.parentElement.removeChild(filterLayer);
        }
      };
    }, [mounted, isInParallax, isMobile]);

    return (
      <>
        <div
          ref={combinedRef}
          className={cn(
            'glass',
            {
              'glass-sm': variant === 'sm',
              'glass-lg': variant === 'lg',
              'glass-hover': hover,
              'glass-in-parallax': isInParallax,
            },
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
