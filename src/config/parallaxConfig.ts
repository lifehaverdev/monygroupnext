/**
 * Awwwards-Style Parallax Configuration
 * 
 * Precise, cinematic scroll experience with perfect timing, rhythm, and spacing.
 * One element at a time, no clutter, clean and intentional.
 */

// ============================================
// ScrollReveal Configuration
// ============================================
// Synchronized timing - all reveals happen at same scroll position
// Consistent duration - everything choreographed

export const scrollRevealConfig = {
  // About section - main intro content
  about: {
    direction: 'up' as const,
    distance: 60,
    delay: 0, // No delays - synchronized
    duration: 600, // Consistent duration for all
    threshold: 0.5, // Trigger at 50% viewport (precise position)
    rootMargin: '0px', // Exact trigger point
  },

  // Contact section - final call-to-action
  contact: {
    direction: 'up' as const,
    distance: 60,
    delay: 0, // Synchronized with all other reveals
    duration: 600, // Same duration
    threshold: 0.5,
    rootMargin: '0px',
  },

  // Sticky headers (Services, Projects) - section labels
  stickyHeader: {
    direction: 'up' as const,
    distance: 30,
    delay: 0, // No delays
    duration: 600, // Consistent
    threshold: 0.5, // Precise trigger
    rootMargin: '0px',
  },
} as const;

// ============================================
// CenterFocusReveal Configuration
// ============================================
// Binary visibility - elements are either fully visible or fully hidden
// Single consistent parallax speed for all items

export const centerFocusConfig = {
  // Services items - all use same speed for consistency
  services: {
    speed: 0.2, // Single consistent speed (subtle parallax)
    delay: 0,
    // Binary visibility threshold - element visible when center is within 50% of viewport center
    visibilityThreshold: 0.5, // 50% viewport = fully visible, else hidden
  },

  // Projects items - all use same speed (no variety, consistency is key)
  projects: {
    cultExecutives: {
      speed: 0.2, // Same speed for all
      delay: 0,
      visibilityThreshold: 0.5,
    },
    stationThisBot: {
      speed: 0.2, // Same speed for all
      delay: 0,
      visibilityThreshold: 0.5,
    },
    stationSeries: {
      speed: 0.2, // Same speed for all
      delay: 0,
      visibilityThreshold: 0.5,
    },
  },
} as const;

// ============================================
// Layout Spacing Configuration (Awwwards-Style)
// ============================================
// Perfect spacing - one item per viewport (100vh)
// Center alignment - everything perfectly centered

export const layoutConfig = {
  // Vertical spacing between items - one full viewport per item
  itemGap: '100vh', // Full screen per item (Awwwards-style)
  
  // Sticky header position - top left (below navbar)
  stickyHeaderTop: '5rem', // Top position from viewport top (accounts for navbar ~64px)
  stickyHeaderLeft: '2rem', // Left position from viewport left
  
  // Header column width - minimal, clean
  headerColumnWidth: '200px',
  
  // Section spacing - consistent gaps between major sections
  sectionGap: '80vh', // Space between major sections (About, Services, Projects, Contact)
} as const;

