# Repository State Report

**Date:** 2025-11-03  
**Context:** Post-rollback state (see [ROLLBACK_SUMMARY.md](../ROLLBACK_SUMMARY.md))  
**Branch:** `chore/revert-to-pre-fresh-start`

## Runtime Environment

- **Node.js:** v22.12.0
- **npm:** 10.9.0
- **Lockfile:** `package-lock.json` (npm)

## Package Versions Matrix

| Package | Version | Type |
|---------|---------|------|
| **next** | 15.5.3 | production |
| **react** | 19.1.0 | production |
| **react-dom** | 19.1.0 | production |
| **tailwindcss** | ^4 | dev |
| **@tailwindcss/postcss** | ^4 | dev |
| **postcss** | (via tailwindcss) | dev |
| **autoprefixer** | ^10.4.21 | production |
| **three** | ^0.180.0 | production |
| **@react-three/fiber** | ^9.3.0 | production |
| **@react-three/drei** | ^9.101.8 | production |
| **marked** | ^12.0.2 | production |
| **remark-prism** | ^1.3.6 | production |
| **@next/mdx** | 15.5.3 | production |

**Note:** `@next/mdx` and `remark-prism` are installed but MDX files are not present. Configuration exists in `next.config.ts` but may be unused.

## Configuration Scan

### next.config.ts

```typescript
- MDX configured via @next/mdx with remark-prism plugin
- pageExtensions: ['ts', 'tsx', 'md', 'mdx']
- experimental.css: true (CSS optimization)
- experimental.optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei']
- No webpack customizations
- No resolve.alias for React or Next.js
- No swc/turbopack toggles (Turbopack is default in Next.js 15.5.3)
```

**React/Next.js Aliases:** None found ✅

### tailwind.config.ts / tailwind.config.js

- **Oxide:** Yes (Tailwind v4 via `@tailwindcss/postcss`)
- **Content globs:** `['./src/**/*.{ts,tsx,mdx}', './app/**/*.{ts,tsx,mdx}']`
- **Plugins:** 
  - `tailwindcss-animate` (required via require)
  - Custom plugin for heading utilities
  - Custom plugin for gradient-primary utility
- **Proxy setup:** `tailwind.config.js` uses ts-node to proxy to TypeScript config

### postcss.config.mjs

```javascript
plugins: [
  '@tailwindcss/postcss',  // Tailwind v4 Oxide
  'autoprefixer'
]
```

### tsconfig.json

```json
paths: {
  "@/*": ["./src/*"]
}
baseUrl: (not set)
```

**Module Resolution:** Uses `bundler` resolution (Next.js default).

### Environment Files

**No `.env*` files found** in repository root.

## Code Hot Spots

### React DOM Client

**`react-dom/client` imports:** None found in source code ✅

Only references exist in `docs/upgrade-next16.md` (documentation only).

### createRoot Usage

**`createRoot` calls:** None found ✅

### Portals

**`createPortal` / `Portal` usage:** None found ✅

### drei Html Component

**drei `Html` usage:** None found ✅

drei imports found:
- `OrbitControls` from `@react-three/drei` (ThreeScene.tsx)
- `useTexture` from `@react-three/drei` (Room.tsx)

### Dynamic R3F Canvas Imports

**Dynamic imports with `ssr: false`:**

1. `src/components/about/PortraitScene.tsx:6`
   ```typescript
   const ThreeSceneLazy = dynamic(() => import("../ThreeScene"), { 
     ssr: false, 
     loading: () => null 
   });
   ```

2. `src/components/about/Hero.tsx:8`
   ```typescript
   ssr: false
   ```

3. `src/components/ThreeHero.tsx:8`
   ```typescript
   ssr: false
   ```

**Canvas usage:**
- Direct import in `src/components/ThreeScene.tsx:3`: `import { Canvas } from '@react-three/fiber';`

### Markdown/MDX Rendering Pipeline

**Markdown processing:**

1. **Server-side (marked):**
   - `src/app/audits/[slug]/page.tsx:5,30`
   - Uses `marked.parse(md)` to render `.md` files from `audits-src/`
   - No client-side hydration

2. **MDX configuration:**
   - `next.config.ts:2,4-8` configures `@next/mdx` with `remark-prism`
   - **No `.mdx` files found** in repository
   - Configuration present but unused (legacy from previous setup?)

**Loader conflict risk:** Low - `marked` handles `.md` files server-side, MDX config would handle `.mdx` files if they existed.

## Build Status

### Last Successful Build

**Command:** `npm run build`

**Output:**
```
✓ Generating static pages (9/9)
Finalizing page optimization ...
Collecting build traces ...

Route (app)                                 Size  First Load JS
┌ ○ /                                    1.72 kB         107 kB
├ ○ /_not-found                            991 B         103 kB
├ ○ /about                               1.75 kB         104 kB
├ ○ /audits                                162 B         106 kB
├ ƒ /audits/[slug]                         134 B         102 kB
├ ○ /contact                               134 B         102 kB
└ ○ /test/glass                          12.3 kB         114 kB
+ First Load JS shared by all             102 kB
```

**Status:** ✅ Build successful  
**Warnings:** 1 ESLint warning about `<img>` usage in `BrandImg.tsx` (suggests Next.js `Image`)

### Production Server Test

**Command:** `npm run start`  
**Status:** ✅ Successful (per ROLLBACK_SUMMARY.md)

## Red Flags & Risks

### 🟡 Minor Issues

1. **MDX Configuration Unused**
   - `@next/mdx` and `remark-prism` installed but no `.mdx` files exist
   - Configuration in `next.config.ts` may be dead code
   - **Impact:** Low - no runtime issues, slight bundle overhead

2. **React 19 with Next.js 15.5.3**
   - React 19.1.0 is newer than Next.js 15.5.3's recommended React 18.x
   - **Impact:** Unknown - may have compatibility edge cases
   - **Note:** This was the pre-rollback state; reverts restored this combination

### ✅ Green Flags

1. **No React Aliases** - Clean module resolution
2. **No `react-dom/client` in source** - No hydration conflicts
3. **Proper SSR handling** - Three.js components use `ssr: false`
4. **Tailwind v4 Oxide** - Modern CSS engine
5. **No Edge Runtime** - All routes use Node.js runtime
6. **Single React Instance** - No duplicate React warnings observed

## Quick Wins

1. **Remove MDX dependencies** if not planning to use MDX
   - Remove `@next/mdx` and `remark-prism` from `package.json`
   - Simplify `next.config.ts` (remove `withMDX` wrapper)
   - Remove `types/remark-prism.d.ts`

2. **Fix ESLint warning** in `BrandImg.tsx`
   - Replace `<img>` with Next.js `Image` component for optimization

3. **Add explicit React version compatibility check**
   - Document React 19 + Next.js 15.5.3 compatibility status
   - Consider pinning to React 18.x if issues arise

## Blockers

**None identified** - Repository is in a stable, buildable state.

## Vercel Deployment Notes

**Settings to verify:**
- Node.js version: Should match local (22.12.0 or compatible)
- Build command: `npm run build` (default)
- Framework preset: Next.js (auto-detected)
- Environment variables: None configured locally (verify Vercel dashboard)

**Recommended:** Ensure Node.js 22.x is selected in Vercel project settings to match local environment.

---

**Report Generated:** 2025-11-03  
**Next Steps:** Review for accuracy, address quick wins if desired, proceed with development.

