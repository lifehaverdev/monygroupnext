/**
 * Device detection utilities
 * Used to detect mobile/touch devices for performance optimizations
 */

/**
 * Detects if the current device is a mobile/touch device
 * Uses multiple heuristics for reliable detection:
 * - Touch capability check
 * - Pointer type check
 * - Screen size check
 * - User agent check (as fallback)
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR - assume desktop
  }

  // Check for touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check pointer type (coarse = touch, fine = mouse)
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const hasNoHover = window.matchMedia('(hover: none)').matches;

  // Check screen size (mobile devices typically have smaller screens)
  const isSmallScreen = window.innerWidth < 768;

  // User agent check as additional fallback
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

  // Device is mobile if:
  // - Has touch AND (coarse pointer OR no hover) OR
  // - Small screen with touch capability OR
  // - Mobile user agent detected
  return (hasTouch && (hasCoarsePointer || hasNoHover)) || (isSmallScreen && hasTouch) || isMobileUA;
}

/**
 * Hook-like function to get mobile state (for use in components)
 * Returns a state that updates on mount
 */
export function useIsMobile(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return isMobileDevice();
}

