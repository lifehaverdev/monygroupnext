"use client";

import { useEffect, useRef } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";
import { useReadiness } from "../contexts/ReadinessContext";

NProgress.configure({ showSpinner: false, minimum: 0.15 });

// Pages that use Three.js backgrounds
const THREE_JS_PAGES = ['/', '/about', '/audits'];

export default function RouteProgress() {
  const pathname = usePathname();
  const firstRender = useRef(true);
  const readiness = useReadiness();
  const { resetProgress, setIsNavigating } = readiness;

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Safety check: ensure functions are available
    if (!resetProgress || !setIsNavigating) {
      console.warn('ReadinessContext functions not available');
      return;
    }

    const isThreeJsPage = THREE_JS_PAGES.includes(pathname);

    if (isThreeJsPage) {
      // Reset progress and trigger navigation splash
      resetProgress();
      setIsNavigating(true);
    } else {
      // Use NProgress for non-Three.js pages and ensure navigation state is cleared
      setIsNavigating(false);
      NProgress.start();
      const timer = setTimeout(() => {
        NProgress.done();
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [pathname, resetProgress, setIsNavigating]);

  return null;
}
