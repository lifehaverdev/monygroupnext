# About Page Specification

This document outlines the structure, placeholder copy, and implementation notes for the **About** page in the *monygroupnext* project.

---

## Table of Contents
1. Hero
2. Core Values
3. Team
4. Timeline
5. Tech Stack
6. Press & Recognition
7. CTA Footer
8. Component & File Map
9. Performance Checklist

---

## 1. Hero
*Component*: `components/about/Hero.tsx`

| Element | Placeholder Copy / Notes |
|---------|--------------------------|
| Headline | "Crafting Liquid-Glass Web Experiences" |
| Sub-headline | "Sleek. Kinetic. Immersive." |
| Background | Three.js morphing glass shader via existing `ThreeHero` util. |

**Implementation Notes**
- Render as a *client* component because it uses WebGL.
- Import with `dynamic(..., { ssr: false, loading: () => <div className="h-[60vh] bg-muted" /> })`.
- Provide `prefers-reduced-motion` fallback (static gradient).

---

## 2. Core Values
*Component*: `components/about/CoreValues.tsx`

Cards (3-4):
1. **Craftsmanship** – "Pixel-perfect detail in every build."
2. **Performance** – "Speed is a feature, not a luxury."
3. **Transparency** – "Open processes, honest communication."
4. **Playfulness** *(optional)* – "We code with a wink." 😉

Use iconography from `@heroicons/react` (outline set).

---

## 3. Team
*Component*: `components/about/TeamGrid.tsx`

Placeholder people:
| Name | Role | Fun Fact |
|------|------|----------|
| Alex Wave | Creative Lead | Can solve a Rubik’s Cube blindfolded. |
| Jamie Flux | WebGL Engineer | Keeps a terrarium of bioluminescent algae. |
| Riley Spark | UI/UX Designer | Runs a typography meme account. |

Photos to be saved under `public/about/team/` with filenames matching kebab-case names.

Hover effect: scale-up & reveal fun fact overlay. Ensure `alt` text.

---

## 4. Timeline
*Component*: `components/about/Timeline.tsx`

Milestones (sample):
- **2021** – Studio founded in Tokyo.
- **2022** – Launched *LiquidGlass* demo; featured on *HN*. 
- **2023** – Partnered with ACME Corp for immersive product launch.
- **2025** – Lighthouse scores ≥95 across 30+ client sites.

Reveal animation on scroll via `framer-motion` `useInView`.

---

## 5. Tech Stack
*Component*: `components/about/TechStack.tsx`

Interactive carousel or grid:
- **Next.js 14**
- **React Server Components**
- **Three.js**
- **Tailwind CSS**
- **PostCSS**
- **Vercel Edge**

Each logo displays tooltip blurb on hover/focus.

---

## 6. Press & Recognition
*Component*: `components/about/PressWall.tsx`

Logos: *Smashing Mag*, *CSS-Tricks*, *Lighthouse 95+ Badge*, etc. Use grayscale and reduce opacity until hover.

---

## 7. CTA Footer
*Component*: `components/about/CTASection.tsx`

Copy: "Let’s create something fluid together."

Button: reuse `EmailCTAButton` from `components/EmailCTAButton.tsx`.

Background: subtle glass-blur with gradient mask.

---

## 8. Component & File Map
```
src/
  components/
    about/
      Hero.tsx          // WebGL hero section
      CoreValues.tsx    // Value cards grid
      TeamGrid.tsx      // Photo grid with hover reveals
      Timeline.tsx      // Animated timeline list
      TechStack.tsx     // Tech logos carousel/grid
      PressWall.tsx     // Press & recognition logos
      CTASection.tsx    // Footer call-to-action
  app/
    about/
      page.tsx          // Assembles above components in order
```

---

## 9. Performance Checklist (acceptance criteria)
- ☐ Page loads ≤ **2 s** on simulated 3G.
- ☐ All images lazy-load with `loading="lazy"`.
- ☐ Heavy assets dynamically imported & memoised.
- ☐ Respect `prefers-reduced-motion`.
- ☐ Keyboard navigation covers all interactive elements.
- ☐ Lighthouse scores ≥ **95** across performance, accessibility, best-practices, SEO.

---

*Last updated: September 19, 2025*
