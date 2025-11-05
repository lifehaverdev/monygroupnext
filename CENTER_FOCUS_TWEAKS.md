# Center Focus Reveal - Tweaking Guide

This document explains all the adjustable parameters for fine-tuning the center-focused scroll reveal effect used in Services and Projects sections.

## Quick Reference Locations

- **Page Layout**: `src/app/page.tsx` (lines ~56-110)
- **Component Logic**: `src/components/CenterFocusReveal.tsx`

---

## 1. Sticky Header Positioning

**Location**: `src/app/page.tsx` - Lines 59, 103

**Parameter**: `className="sticky top-[30vh]"`

**What it does**: Controls where the section header sticks when scrolling

**How to adjust**:
- `top-[30vh]` = Sticks at 30% from top of viewport (current)
- `top-[25vh]` = Higher up, more centered
- `top-[35vh]` = Lower down, less centered
- `top-24` = Fixed pixel distance (96px from top)
- `top-1/2` = Center of viewport (may overlap with content)

**Recommendation**: Start with `25vh`-`35vh` range for balanced positioning

---

## 2. Item Spacing (Gap Between Items)

**Location**: `src/app/page.tsx` - Lines 66, 110

**Parameter**: `className="flex flex-col gap-[40vh]"`

**What it does**: Vertical spacing between sequential items

**How to adjust**:
- `gap-[40vh]` = 40% of viewport height (current)
- `gap-[35vh]` = Closer together, more items visible at once
- `gap-[50vh]` = Further apart, more focused on one item
- `gap-[60vh]` = Very spaced out (previous setting)
- `gap-24` = Fixed pixel spacing (less responsive)

**Recommendation**: `35vh`-`45vh` for balanced spacing

---

## 3. Fade Distance (When Items Start Fading)

**Location**: `src/components/CenterFocusReveal.tsx` - Line 65

**Parameter**: `const maxDistance = viewportHeight * 0.5;`

**What it does**: Controls how far from center items start fading out

**How to adjust**:
- `0.5` = Items fade when 50% of viewport height away from center (current)
- `0.4` = Fade starts earlier, faster fade-out
- `0.6` = Fade starts later, items visible longer
- `0.3` = Very aggressive fade, only visible when very centered

**Recommendation**: `0.4`-`0.6` for most use cases

---

## 4. Opacity Fade Curve

**Location**: `src/components/CenterFocusReveal.tsx` - Line 68

**Parameter**: `const opacityValue = Math.max(0, 1 - distanceFromCenter / maxDistance);`

**What it does**: Linear fade from center to edge

**How to adjust** (for different fade curves):
- **Linear** (current): `1 - distanceFromCenter / maxDistance`
- **Ease-out**: `Math.pow(1 - distanceFromCenter / maxDistance, 2)`
- **Ease-in**: `1 - Math.pow(distanceFromCenter / maxDistance, 2)`
- **Smooth curve**: `Math.pow(Math.cos((distanceFromCenter / maxDistance) * Math.PI / 2), 2)`

**Recommendation**: Linear is clearest; try ease-out for smoother fade

---

## 5. Transform/Translate Y (Vertical Movement)

**Location**: `src/components/CenterFocusReveal.tsx` - Line 71

**Parameter**: `const translateY = Math.max(0, (distanceFromCenter / maxDistance) * 40);`

**What it does**: How much items move vertically as they fade

**How to adjust**:
- `40` = Moves 40px down when fully faded (current)
- `20` = Subtle movement
- `60` = More dramatic movement
- `0` = No vertical movement, only fade

**Recommendation**: `20`-`40` for subtle effect

---

## 6. Parallax Speed

**Location**: `src/app/page.tsx` - Lines 67, 77, 87, 117, 124, 131

**Parameter**: `speed={0.2}` (or 0.25, 0.3, etc.)

**What it does**: How fast items move relative to scroll (parallax effect)

**How to adjust**:
- `0.2` = Very slow, subtle parallax
- `0.3` = Moderate parallax
- `0.5` = More noticeable parallax
- `0.1` = Almost no parallax
- `0` = No parallax (disabled)

**Recommendation**: `0.2`-`0.3` for subtle depth effect

---

## 7. Transition Duration

**Location**: `src/components/CenterFocusReveal.tsx` - Line 116

**Parameter**: `transition: 'opacity 200ms ease-out, transform 200ms ease-out'`

**What it does**: How quickly opacity/transform changes animate

**How to adjust**:
- `200ms` = Fast, snappy (current)
- `300ms` = Medium speed
- `400ms` = Slower, smoother
- `100ms` = Very fast, may feel janky

**Recommendation**: `200ms`-`300ms` for smooth but responsive feel

---

## 8. Header Bottom Margin

**Location**: `src/app/page.tsx` - Lines 59, 103

**Parameter**: `className="... mb-12"`

**What it does**: Space between sticky header and first item

**How to adjust**:
- `mb-12` = 48px spacing (current)
- `mb-8` = 32px (tighter)
- `mb-16` = 64px (more space)
- `mb-20` = 80px (very spacious)

**Recommendation**: `mb-8`-`mb-16` depending on desired spacing

---

## 9. Header Scroll Reveal

**Location**: `src/app/page.tsx` - Lines 60, 104

**Parameter**: `<ScrollReveal direction="up" distance={30} delay={0} threshold={0.1}>`

**What it does**: How the header animates in

**Adjustable sub-parameters**:
- `distance={30}` = How far it moves from below (30px)
- `delay={0}` = Animation delay (0ms)
- `threshold={0.1}` = Triggers when 10% visible

**How to adjust**:
- Distance: `20`-`50` for subtle to dramatic
- Delay: `0`-`200` for immediate to staggered
- Threshold: `0.05`-`0.2` for early to late trigger

---

## 10. Component rootMargin (Advanced)

**Location**: `src/components/CenterFocusReveal.tsx` - Line 28

**Parameter**: `rootMargin: '50% 0px'`

**What it does**: Intersection observer trigger zone

**How to adjust**:
- `'50% 0px'` = Triggers when 50% of viewport height away (current)
- `'40% 0px'` = Triggers earlier
- `'60% 0px'` = Triggers later
- `'0px'` = Only triggers when element enters viewport

**Recommendation**: Usually leave as-is unless experiencing trigger issues

---

## Quick Tuning Checklist

For **faster fade-out** (items disappear quicker):
- Reduce `maxDistance` (Line 65): `0.5` → `0.4`
- Reduce `gap-[40vh]` → `gap-[35vh]`

For **items visible longer**:
- Increase `maxDistance`: `0.5` → `0.6`
- Increase `gap-[40vh]` → `gap-[50vh]`

For **more centered header**:
- Reduce `top-[30vh]` → `top-[25vh]`

For **more spacing between items**:
- Increase `gap-[40vh]` → `gap-[45vh]` or `gap-[50vh]`

For **subtler parallax**:
- Reduce speeds: `0.2`-`0.3` → `0.15`-`0.25`

For **smoother transitions**:
- Increase transition duration: `200ms` → `300ms`

---

## Example: Balanced Settings

```tsx
// Header - more centered
<div className="sticky top-[25vh] z-10 mb-10">

// Spacing - balanced
<div className="flex flex-col gap-[38vh]">

// Component - moderate fade
const maxDistance = viewportHeight * 0.45;
const translateY = Math.max(0, (distanceFromCenter / maxDistance) * 30);
```

---

## Testing Tips

1. **Test at different viewport heights**: Use browser dev tools to check mobile/tablet/desktop
2. **Scroll slowly**: Watch how items fade in/out
3. **Check header position**: Ensure it doesn't overlap with content
4. **Verify spacing**: Only one item should be prominent at a time
5. **Adjust incrementally**: Change one parameter at a time to see the effect

---

## Need More Control?

If you need even finer control, you can modify the fade calculation in `CenterFocusReveal.tsx` line 68 to use different easing functions or add minimum opacity thresholds.

