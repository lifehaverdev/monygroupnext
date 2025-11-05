# Style Debugging Guide

## The Problem
Sticky headers are not aligning consistently between Services and Projects sections, despite using identical code.

## Root Cause Investigation

### 1. Layout Container Centering
**Location**: `src/app/layout.tsx` line 139
```tsx
<main className="container mx-auto py-8 flex-1">
```

**Issue**: The `container` class + `mx-auto` creates a centered container that wraps all page content. This can interfere with nested grid layouts.

**What to check**:
- Open browser DevTools
- Inspect the `<main>` element
- Check computed styles for `margin-left`, `margin-right`, `max-width`
- Verify if `container` class is adding unexpected constraints

### 2. Section Container Centering
**Location**: `src/app/page.tsx` lines 62, 110
```tsx
<div className="max-w-5xl mx-auto px-4">
```

**Issue**: Another centering layer. Combined with layout centering, this creates nested centering.

**What to check**:
- Inspect both Services and Projects section containers
- Compare computed `margin-left` and `margin-right` values
- Check if `px-4` padding is affecting alignment

### 3. ScrollReveal Component Inline Styles
**Location**: `src/components/ScrollReveal.tsx` lines 99-106

**Issue**: ScrollReveal adds inline styles (`transform`, `opacity`, `transition`). These shouldn't affect positioning but could interfere.

**What to check**:
- Inspect the ScrollReveal wrapper div
- Check if inline `style` attribute is overriding classes
- Verify `transform` isn't moving elements horizontally

### 4. CenterFocusReveal Component Inline Styles
**Location**: `src/components/CenterFocusReveal.tsx` lines 113-118

**Issue**: Adds inline styles for `opacity`, `transform`, `transition`. The `transform` might be affecting positioning.

**What to check**:
- Inspect CenterFocusReveal wrapper divs
- Check computed `transform` values
- Verify if `translate3d` is moving elements horizontally

### 5. Grid Column Calculation
**Location**: `src/app/page.tsx` line 10
```tsx
const SECTION_GRID_LAYOUT = "grid grid-cols-[200px_1fr] gap-4";
```

**Issue**: Grid columns might be calculated differently if parent containers have different widths due to padding/margins.

**What to check**:
- Inspect both grid containers
- Compare computed `grid-template-columns` values
- Check if `200px` is actually `200px` or being calculated differently

## Debugging Steps

### Step 1: Browser DevTools Inspection
1. Open DevTools (F12)
2. Select the Services sticky header
3. In Computed tab, note:
   - `position` (should be `sticky`)
   - `left`, `right`, `margin-left`, `margin-right`
   - `width`, `max-width`
   - `grid-column` (if it's in a grid)
4. Repeat for Projects sticky header
5. Compare the values - they should be identical

### Step 2: Check Parent Containers
1. Inspect Services section container: `#services`
2. Inspect Projects section container: `#projects`
3. Compare their computed styles:
   - `width`
   - `margin-left`, `margin-right`
   - `padding-left`, `padding-right`
   - `max-width`

### Step 3: Check Grid Layouts
1. Inspect Services grid: `.grid.grid-cols-\[200px_1fr\]`
2. Inspect Projects grid: `.grid.grid-cols-\[200px_1fr\]`
3. Compare:
   - `grid-template-columns` (should be `200px 1fr`)
   - `gap` (should be `16px`)
   - `width` of grid container

### Step 4: Check for CSS Specificity Issues
1. In DevTools, look at the Styles panel
2. Check if any rules are crossed out (overridden)
3. Look for rules with `!important`
4. Check for conflicting classes

### Step 5: Check Inline Styles
1. Inspect ScrollReveal divs
2. Check `style` attribute values
3. Verify `transform` isn't affecting horizontal position
4. Check if `opacity` or other properties are interfering

## Potential Fixes

### Fix 1: Remove Container Centering from Layout
If layout centering is the issue, we could:
- Remove `container` class from `<main>`
- Or use `container` but remove `mx-auto`
- Or add a wrapper that breaks out of container

### Fix 2: Use CSS Variables for Alignment
Create CSS variables for header column width:
```css
:root {
  --section-header-width: 200px;
}
```
Then use: `grid-cols-[var(--section-header-width)_1fr]`

### Fix 3: Use Absolute Positioning for Headers
Instead of grid, use absolute positioning within relative container:
```tsx
<div className="relative">
  <div className="absolute left-4 sticky top-[30vh]">Header</div>
  <div className="ml-[220px]">Content</div>
</div>
```

### Fix 4: Force Alignment with CSS
Add explicit alignment:
```css
#services .grid,
#projects .grid {
  grid-template-columns: 200px 1fr !important;
}
```

## Quick Test: Force Alignment
Add this temporarily to see if it works:
```tsx
<div className={SECTION_GRID_LAYOUT} style={{ gridTemplateColumns: '200px 1fr' }}>
```

If this works, the issue is CSS specificity or class parsing.

## What to Report Back

When inspecting, please share:
1. **Computed styles** for both sticky header divs (Services vs Projects)
2. **Computed styles** for both grid containers
3. **Any crossed-out rules** in the Styles panel
4. **Actual rendered HTML** - does the grid-cols class render correctly?
5. **Browser used** (Chrome, Firefox, Safari, etc.)

This will help identify the exact source of the style conflict.

