# Next.js 16 Upgrade Documentation

**Branch:** `chore/next16-upgrade`  
**Date:** 2025-11-03  
**Status:** ✅ Complete

## Overview

Successfully upgraded monygroupnext from Next.js 15.5.3 to Next.js 16.0.1 with React 18.2.0, ensuring a clean build with zero React aliases and single React source from `node_modules`.

## Version Matrix

### Core Dependencies
- **Next.js**: `15.5.3` → `^16.0.1` (resolved to `16.0.1`)
- **React**: `19.1.0` → `18.2.0`
- **React DOM**: `19.1.0` → `18.2.0`
- **eslint-config-next**: `15.5.3` → `^16.0.1` (resolved to `16.0.1`)

### Removed Dependencies
- `@next/mdx`: Removed (project uses `marked` for `.md` files, not MDX)
- `remark-prism`: Removed (was only used with MDX)

### Added Dependencies
- `tailwindcss-animate`: `^1.0.7` (required by tailwind.config.ts)
- `ts-node`: `^10.9.2` (required for tailwind.config.js proxy)

### Maintained Dependencies
- `three`: `^0.180.0`
- `@react-three/fiber`: `^8.18.0`
- `@react-three/drei`: `9.122.0`
- `tailwindcss`: `^4` (Tailwind v4 Oxide)
- `@tailwindcss/postcss`: `^4`
- `autoprefixer`: `^10.4.21`

## Key Changes

### 1. Removed MDX Configuration

Since the project uses `marked` to parse `.md` files server-side (see `src/app/audits/[slug]/page.tsx`), all MDX-related configuration was removed:

- Removed `@next/mdx` and `remark-prism` from `package.json`
- Removed MDX wrapper and imports from `next.config.ts`
- Removed `mdx` and `md` from `pageExtensions` (now only `['ts', 'tsx']`)
- Removed `types/remark-prism.d.ts`
- Updated `tailwind.config.ts` content globs to remove `mdx` references

### 2. Configuration Updates

**next.config.ts** (final):
```typescript
const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  experimental: {
    optimizePackageImports: [
      'three',
      '@react-three/fiber',
      '@react-three/drei',
    ],
  },
};

export default nextConfig;
```

**Key changes:**
- Removed `experimental.css` option (not valid in Next.js 16 - CSS optimization is built-in)
- Removed all webpack alias configuration (Next.js 16 handles React resolution correctly without aliases)
- Removed MDX-related imports and configuration

### 3. React Three Fiber Components - Client Directives

**Important:** Next.js 16 with Turbopack requires explicit `"use client"` directives for components using React Three Fiber hooks. Added directives to:

- `src/components/ThreeScene.tsx` - Uses `Canvas`, `useFrame`, `useThree` from `@react-three/fiber`
- `src/components/Room.tsx` - Uses `useTexture` from `@react-three/drei`

Even though these components are dynamically imported via `ThreeHero` with `ssr: false`, the components themselves must have `"use client"` because React Three Fiber hooks (`useFrame`, `useThree`, `useTexture`) access React internals that require client-side execution context.

Without these directives, you'll see errors like: `Cannot read properties of undefined (reading 'ReactCurrentOwner')`

### 4. Tailwind Configuration

Updated `tailwind.config.ts`:
- Removed `mdx` from content globs
- Replaced `require('tailwindcss-animate')` with ES6 import
- Fixed TypeScript linting issues

## React Module Resolution Verification

All React modules correctly resolve from `node_modules`, not `next/dist/compiled/*`:

```
react:
  Resolved: node_modules/react/index.js
  From node_modules: ✓
  From next/dist/compiled: ✓ (correctly not here)

react-dom:
  Resolved: node_modules/react-dom/index.js
  From node_modules: ✓
  From next/dist/compiled: ✓ (correctly not here)

react-dom/client:
  Resolved: node_modules/react-dom/client.js
  From node_modules: ✓
  From next/dist/compiled: ✓ (correctly not here)
```

Verification script: `scripts/verify-react-paths.js`

## Build & Runtime Verification

### ✅ Local Development
- `npm run dev`: Starts successfully with Turbopack
- No `react-dom/client` errors
- No "multiple renderers" warnings
- `@react-three/fiber` and `@react-three/drei` compile correctly
- Tailwind v4 styles apply correctly

### ✅ Production Build
- `npm run build`: Completes successfully
- All pages generate correctly (static + dynamic routes)
- TypeScript compilation passes
- No build errors or warnings related to React resolution

### ✅ Production Server
- `npm run start`: Server starts successfully
- All routes accessible

## Turbopack

Next.js 16 uses Turbopack by default (both dev and build). No configuration changes were needed - all features work correctly with Turbopack:

- TypeScript compilation
- Tailwind CSS v4 (Oxide)
- Three.js and React Three Fiber
- Static and dynamic routes

## Migration Steps Performed

1. ✅ Created `chore/next16-upgrade` branch from `chore/revert-to-pre-fresh-start`
2. ✅ Removed MDX packages (`@next/mdx`, `remark-prism`)
3. ✅ Updated `next.config.ts` to remove MDX configuration
4. ✅ Deleted `types/remark-prism.d.ts`
5. ✅ Upgraded Next.js to `^16` (resolved to `16.0.1`)
6. ✅ Downgraded React from `19.1.0` to `18.2.0` (stable pairing with Next 16)
7. ✅ Upgraded `eslint-config-next` to `^16.0.1`
8. ✅ Removed `experimental.css` from next.config.ts (not valid in Next 16)
9. ✅ Updated `tailwind.config.ts` to remove `mdx` from content globs
10. ✅ Installed missing dependencies (`tailwindcss-animate`, `ts-node`)
11. ✅ Cleaned build caches and regenerated lockfile
12. ✅ Added `"use client"` directives to `ThreeScene.tsx` and `Room.tsx` (required for React Three Fiber hooks)
13. ✅ Tested dev server
14. ✅ Tested production build
15. ✅ Verified React module resolution (single source from node_modules)
16. ✅ Fixed linting errors in tailwind.config.ts

## Acceptance Criteria Status

- ✅ `npm run dev` succeeds with zero React aliasing
- ✅ `npm run build && npm run start` succeed locally
- ✅ No `react-dom/client` errors
- ✅ Visiting pages shows correct rendering with no "multiple renderers" warnings
- ✅ `require.resolve('react')` and `require.resolve('react-dom/client')` resolve to `node_modules`, not `next/dist/compiled/*`
- ✅ Documentation created and updated

## Vercel Deployment

### Checklist Before Merging
- [ ] Push branch to remote
- [ ] Open PR "Next 16 upgrade (clean React 18, no aliases)"
- [ ] Verify Vercel Preview deploy succeeds
- [ ] Confirm no `__NEXT_PRIVATE_*` environment variables in Vercel settings
- [ ] Test preview deployment for correct rendering
- [ ] Ensure Node 22.x is set in Vercel settings (project uses Node 22 locally)

### Vercel Configuration
Ensure no private Next.js flags are set in Vercel environment variables:
- Remove any `__NEXT_PRIVATE_PREBUNDLED_REACT` if present
- Next.js 16 handles React resolution automatically
- Update Node.js version to 22.x in Vercel project settings

## Future Considerations

### Optional: React 19 Validation

A separate branch `exp/react19-on-next16` can be created to test React 19 compatibility:
- Upgrade to `react@^19` and `react-dom@^19`
- Verify `@react-three/fiber` and `@react-three/drei` compatibility
- Test all pages and 3D scenes
- Document any breaking changes or incompatibilities

**Recommendation:** Wait 2-4 weeks after React 19 stable release before attempting upgrade, allowing ecosystem to stabilize.

### Follow-up Tasks

1. **Node Version**: Update `engines.node` from `>=20 <21` to `>=20` to support Node 22.x (currently running Node 22.12.0 locally)
2. **CI Smoke Test**: Add a CI check to ensure `require.resolve('react-dom/client')` points to `node_modules`

## Notes

- Turbopack is now the default bundler (no webpack)
- MDX was completely removed as the project uses `marked` for markdown parsing
- No special React configuration needed on Next.js 16 - React resolves correctly from node_modules automatically
- All React Three Fiber components work correctly via dynamic imports with `ssr: false`
- `experimental.css` option removed (built into Next.js 16)
- No React aliases or webpack configuration needed

## Commands Reference

```bash
# Verify React module resolution
node scripts/verify-react-paths.js

# Clean build
rm -rf .next node_modules/.cache
npm install
npm run build

# Production test
npm run build && npm run start
```

---

**Upgrade completed successfully with zero React aliases and clean module resolution.** ✅
