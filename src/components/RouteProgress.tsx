"use client";

import { useEffect, useRef } from "react";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";

NProgress.configure({ showSpinner: false, minimum: 0.15 });

export default function RouteProgress() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    NProgress.start();
    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
