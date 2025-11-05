/**
 * Centralized Parallax Animation Configuration
 * 
 * All parallax and scroll reveal parameters in one place for easy tweaking.
 * Adjust values here to change animation behavior across the site.
 * 
 * TIP: Make small incremental changes (0.05-0.1) and test in browser.
 * TIP: Higher values = more dramatic effect, lower values = subtler effect.
 */

// ============================================
// ScrollReveal Configuration
// ============================================
// Used for: About section, Contact section, Sticky headers
// Controls: How elements fade/slide in when scrolling into view

export const scrollRevealConfig = {
  // About section - main intro content
  about: {
    direction: 'up' as const, // 'up' | 'down' | 'left' | 'right' | 'fade'
    distance: 60, // Pixels to move during reveal (30-100 recommended, higher = more dramatic)
    delay: 200, // Milliseconds before animation starts (0-500 recommended, creates staggered effect)
    threshold: 0.3, // How much of element must be visible to trigger (0-1, 0.1 = 10% visible)
    rootMargin: '30px', // Trigger zone around viewport ('0px' = exact edge, '50px' = 50px before edge)
  },

  // Contact section - final call-to-action
  contact: {
    direction: 'up' as const, // 'up' | 'down' | 'left' | 'right' | 'fade'
    distance: 50, // Pixels to move during reveal (30-80 recommended, slightly less than About for subtlety)
    delay: 150, // Milliseconds before animation starts (0-300 recommended)
  },

  // Sticky headers (Services, Projects) - section labels
  stickyHeader: {
    direction: 'up' as const, // 'up' | 'down' | 'left' | 'right' | 'fade'
    distance: 30, // Pixels to move (20-40 recommended, subtle for headers)
    delay: 0, // No delay - headers appear immediately when section enters view
    threshold: 0.1, // Trigger early (10% visible) so headers are ready when content scrolls
  },
} as const;

// ============================================
// CenterFocusReveal Configuration
// ============================================
// Used for: Services items, Projects items
// Controls: Parallax speed + fade effect based on viewport center position

export const centerFocusConfig = {
  // Services items - all use the same speed for consistency
  services: {
    speed: 0.3, // Parallax speed multiplier (0.1-0.5 recommended, 0.3 = moderate depth effect)
    // Lower = subtler parallax, Higher = more dramatic movement
    delay: 0, // No delay - items animate as soon as they enter viewport
  },

  // Projects items - individual speeds for visual variety
  projects: {
    cultExecutives: {
      speed: 0.15, // Slowest - subtle parallax (0.1-0.25 range for subtle)
      delay: 0,
    },
    stationThisBot: {
      speed: 0.2, // Medium - moderate parallax (0.2-0.3 range for moderate)
      delay: 0,
    },
    stationSeries: {
      speed: 0.25, // Fastest - more noticeable parallax (0.3-0.4 range for dramatic)
      delay: 0,
    },
    // TIP: Varying speeds across items creates visual rhythm and interest
  },
} as const;

// ============================================
// Layout Spacing Configuration
// ============================================
// Used for: Item spacing, header positioning, grid layout

export const layoutConfig = {
  // Vertical spacing between items (Services & Projects)
  itemGap: '45vh', // Viewport height units ('35vh' | '40vh' | '45vh' | '50vh' | '60vh')
  // Lower (35vh) = items closer, more visible at once
  // Higher (50vh+) = items further apart, more focused on one at a time
  // TIP: 45vh provides better spacing - one item prominent, previous/next fading out gracefully
  
  // Sticky header position from top of viewport
  stickyHeaderTop: '30vh', // Viewport height units ('25vh' | '30vh' | '35vh' | '40vh')
  // Lower (25vh) = header higher up, more centered
  // Higher (35vh) = header lower down, less centered
  // TIP: 30vh keeps header visible but doesn't interfere with content
  
  // Header column width in grid layout
  headerColumnWidth: '200px', // Fixed pixel width ('150px' | '200px' | '250px' | '300px')
  // Narrower = more space for content cards
  // Wider = more breathing room for headers
  // TIP: 200px fits most header text without overlap
} as const;

