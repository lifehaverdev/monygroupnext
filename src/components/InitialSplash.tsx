"use client";

import { useEffect, useState } from "react";
import { useReadiness } from "../contexts/ReadinessContext";

export default function InitialSplash() {
  const [visible, setVisible] = useState(true);
  const [finished, setFinished] = useState(false);
  const [tartanOpacity, setTartanOpacity] = useState(0);
  const { overallProgress, allReady, setTartanProgress, setFontProgress, setPageProgress } = useReadiness();
  const [fontReady, setFontReadyState] = useState(false);

  // Preload tartan image with progress tracking
  useEffect(() => {
    const img = new Image();
    img.src = '/patterns/remiliatartan.jpeg';
    
    // Simulate progress as image loads
    setTartanProgress(10);
    
    img.onload = () => {
      setTartanProgress(100);
      // Fade in tartan smoothly
      requestAnimationFrame(() => {
        setTartanOpacity(0.25);
      });
    };

    img.onerror = () => {
      // If image fails, still mark as complete
      setTartanProgress(100);
      setTartanOpacity(0.25);
    };

    // Track loading progress if available
    if (img.decode) {
      img.decode().then(() => {
        setTartanProgress(100);
      }).catch(() => {
        setTartanProgress(100);
      });
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [setTartanProgress]);

  // Detect font loading with proper progress tracking
  // Strategy: Show text early (after 300ms OR when font is ready, whichever comes first)
  useEffect(() => {
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
  }, [setFontProgress]);

  // Mark page as ready when component mounts (page is loading)
  useEffect(() => {
    // Page starts loading immediately
    setPageProgress(50);
    
    // Mark page as ready after a short delay (allows React to hydrate)
    const pageReadyTimeout = setTimeout(() => {
      setPageProgress(100);
    }, 100);

    return () => clearTimeout(pageReadyTimeout);
  }, [setPageProgress]);

  // Safety timeout: dismiss after max 8 seconds regardless of readiness
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setFinished(true), 400);
    }, 8000);

    return () => clearTimeout(safetyTimeout);
  }, []);

  // Dismiss splash when all readiness signals are ready
  useEffect(() => {
    if (!allReady) return;

    // Small delay to ensure smooth transition
    const fadeDelay = setTimeout(() => setVisible(false), 300);
    const removeDelay = setTimeout(() => setFinished(true), 700); // unmount after fade

    return () => {
      clearTimeout(fadeDelay);
      clearTimeout(removeDelay);
    };
  }, [allReady]);

  if (finished) return null;

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
