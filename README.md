# Mony Group – Next.js 14 Skeleton

A stripped-down starter built with:

* Next.js 15 (App Router, TypeScript)
* Tailwind CSS
* MDX (`@next/mdx` + `remark-prism`)
* ESLint (core-web-vitals) + Prettier

## Local dev
```bash
npm install
npm run dev # http://localhost:3000
```

## Production build
```bash
npm run build
npm start
```

## Deploy
Push to GitHub – Vercel will detect the project and use `npm run build`.

## Project structure (key paths)
```
src/app/
  layout.tsx           # header + footer
  page.tsx             # Home stub
  audits/
    page.tsx           # audits list
    [slug]/page.tsx    # audit detail
  about/page.tsx
  contact/page.tsx
```

---
Generated via `create-next-app --ts --tailwind` and trimmed to essentials.

## Adding audit reports

1. Drop your Markdown file into `audits-src/` – the filename (without extension) becomes the URL slug.
2. Use absolute paths beginning with `/brand/…` for any images or icons.
3. Visit `/audits/<slug>` in dev or production to see the rendered report.
