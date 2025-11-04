# Deployment Guide

## Vercel Environment Variables

To prevent Tailwind Oxide native binding errors on Vercel, set the following environment variable:

**Project → Settings → Environment Variables**

Add:
- **Key**: `TAILWIND_DISABLE_OXIDE`
- **Value**: `1`
- **Environments**: Preview + Production

This disables the native Oxide bindings and uses the JavaScript fallback, which works reliably across all Vercel build environments.

