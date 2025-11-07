"use client";

import { useEffect, useState } from "react";
import { useReadiness } from "../contexts/ReadinessContext";

export default function NavigationSplash() {
  const [visible, setVisible] = useState(false);
  const [tartanOpacity, setTartanOpacity] = useState(0);
  const { 
    overallProgress, 
    progress,
    isNavigating, 
    setIsNavigating,
    setTartanProgress, 
    setFontProgress, 
    setPageProgress 
  } = useReadiness();
  const [fontReady, setFontReadyState] = useState(false);

  // Show/hide splash based on navigation state
  useEffect(() => {
    if (isNavigating) {
      setVisible(true);
      setTartanOpacity(0);
      setFontReadyState(false);
    } else {
      // Fade out when navigation completes
      setVisible(false);
    }
  }, [isNavigating]);

  // Preload tartan image with progress tracking (only when navigating)
  useEffect(() => {
    if (!isNavigating) return;

    const img = new Image();
    
    // Handle image ready state
    const handleImageReady = () => {
      setTartanProgress(100);
      // Fade in tartan smoothly with a small delay to ensure visibility
      setTimeout(() => {
        requestAnimationFrame(() => {
          setTartanOpacity(0.25);
        });
      }, 50);
    };

    // Simulate progress as image loads
    setTartanProgress(10);
    
    img.onload = () => {
      handleImageReady();
    };

    img.onerror = () => {
      // If image fails, still mark as complete
      setTartanProgress(100);
      setTartanOpacity(0.25);
    };

    // Set src - if already cached, onload may fire immediately
    img.src = '/patterns/remiliatartan.jpeg';

    // Check if image is already complete (cached) - check after setting src
    if (img.complete && img.naturalWidth > 0) {
      // Image is cached, handle immediately
      handleImageReady();
    }

    // Track loading progress if available
    if (img.decode) {
      img.decode()
        .then(() => {
          setTartanProgress(100);
        })
        .catch(() => {
          setTartanProgress(100);
        });
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isNavigating, setTartanProgress]);

  // Detect font loading with proper progress tracking (only when navigating)
  useEffect(() => {
    if (!isNavigating) return;

    let checkInterval: NodeJS.Timeout;
    let earlyShowTimeout: NodeJS.Timeout;
    let attempts = 0;
    const maxAttempts = 30; // 3 seconds max
    let isMounted = true;
    let textShown = false;

    const showText = () => {
      if (!isMounted || textShown) return;
      textShown = true;
      setFontReadyState(true);
      setFontProgress(100);
    };

    const checkFont = async () => {
      if (!isMounted) return;
      setFontProgress(10);
      
      // Strategy 1: Show text early after 300ms (font-display: swap will handle the swap)
      earlyShowTimeout = setTimeout(() => {
        if (!textShown) {
          showText();
        }
      }, 300);
      
      try {
        // Strategy 2: Check if font is already loaded
        const checkFontLoaded = () => {
          if (!document.fonts) return false;
          return document.fonts.check('12px RemiliaMincho');
        };

        // Quick initial check
        if (checkFontLoaded()) {
          if (earlyShowTimeout) clearTimeout(earlyShowTimeout);
          showText();
          return;
        }

        // Strategy 3: Wait for fonts API (with shorter timeout)
        if (document.fonts && document.fonts.ready) {
          await Promise.race([
            document.fonts.ready,
            new Promise(resolve => setTimeout(resolve, 1000)), // Shorter timeout
          ]);
          if (!isMounted) return;
          setFontProgress(50);
          
          // Check again after fonts.ready
          if (checkFontLoaded()) {
            if (earlyShowTimeout) clearTimeout(earlyShowTimeout);
            showText();
            return;
          }
        }

        // Strategy 4: Poll for font loading (more aggressive, shorter interval)
        checkInterval = setInterval(() => {
          if (!isMounted) {
            clearInterval(checkInterval);
            return;
          }
          
          attempts++;
          const loaded = checkFontLoaded();
          
          if (loaded) {
            clearInterval(checkInterval);
            if (earlyShowTimeout) clearTimeout(earlyShowTimeout);
            showText();
          } else if (attempts >= maxAttempts) {
            clearInterval(checkInterval);
            if (earlyShowTimeout) clearTimeout(earlyShowTimeout);
            // Font might not be detected but is likely loaded, show text anyway
            showText();
          } else {
            // Update progress based on attempts
            const newProgress = Math.min(90, 50 + (attempts / maxAttempts) * 40);
            setFontProgress(newProgress);
          }
        }, 50); // Check more frequently (50ms instead of 100ms)
      } catch (error) {
        // Fallback: show text immediately
        if (earlyShowTimeout) clearTimeout(earlyShowTimeout);
        if (isMounted && !textShown) {
          showText();
        }
      }
    };

    checkFont();

    return () => {
      isMounted = false;
      if (checkInterval) clearInterval(checkInterval);
      if (earlyShowTimeout) clearTimeout(earlyShowTimeout);
    };
  }, [isNavigating, setFontProgress]);

  // Mark page as ready when navigation starts
  useEffect(() => {
    if (!isNavigating) return;

    // Page starts loading immediately
    setPageProgress(50);
    
    // Mark page as ready after a short delay (allows React to hydrate)
    const pageReadyTimeout = setTimeout(() => {
      setPageProgress(100);
    }, 100);

    return () => clearTimeout(pageReadyTimeout);
  }, [isNavigating, setPageProgress]);

  // Hide splash when scene is ready (scene progress reaches 100%)
  useEffect(() => {
    if (!isNavigating) return;
    
    if (progress.scene === 100) {
      // Small delay to ensure smooth transition
      const fadeDelay = setTimeout(() => {
        setVisible(false);
        setIsNavigating(false);
      }, 300);

      return () => clearTimeout(fadeDelay);
    }
  }, [progress.scene, isNavigating, setIsNavigating]);

  // Safety timeout: dismiss after max 5 seconds regardless of readiness
  useEffect(() => {
    if (!isNavigating) return;

    const safetyTimeout = setTimeout(() => {
      setVisible(false);
      setIsNavigating(false);
    }, 5000);

    return () => clearTimeout(safetyTimeout);
  }, [isNavigating, setIsNavigating]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-400 ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Pattern layer with fade-in transition */}
      <div 
        className="absolute inset-0 bg-tartan-blur"
        style={{
          opacity: tartanOpacity,
          transition: 'opacity 0.6s ease-in-out',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded">
          <div 
            className="h-full bg-[#B71E34] transition-all duration-300 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        {/* Only show text after font is ready */}
        {fontReady && (
          <p className="font-remilia text-sm tracking-wide">Preparing for you…</p>
        )}
      </div>
    </div>
  );
}

