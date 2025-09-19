"use client";

// Inspired by Chrome Labs idle-until-urgent strategy.
// Calls requestIdleCallback when available, falling back to setTimeout.
// Additionally resolves on first user interaction (pointer/keyboard) to avoid stalling.
import { useEffect, useState } from "react";

export default function useIdle(delay = 0): boolean {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (idle) return;
    let idleId: number | undefined;

    const onIdle = () => setIdle(true);

    if (typeof window !== "undefined" && window.requestIdleCallback) {
      idleId = window.requestIdleCallback(onIdle, { timeout: 2000 });
    } else {
      idleId = setTimeout(onIdle, delay || 1500) as unknown as number;
    }

    return () => {
      if (idleId != null) {
        if (window.cancelIdleCallback) {
          window.cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
    };
  }, [idle, delay]);

  useEffect(() => {
    if (idle) return;
    const interact = () => setIdle(true);
    window.addEventListener("pointerdown", interact, { once: true, passive: true });
    window.addEventListener("keydown", interact, { once: true, passive: true });
    return () => {
      window.removeEventListener("pointerdown", interact);
      window.removeEventListener("keydown", interact);
    };
  }, [idle]);

  return idle;
}
