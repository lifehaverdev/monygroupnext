
---

# MONY VAULT — Brand Specification

This document defines how to use the MONY VAULT brand assets consistently across internal reports, documentation, and published audit artifacts. This guide is intended for internal team members and future contributors. These are guidelines, not hard enforcement rules, but should be followed whenever possible.

---

## 1) Brand Purpose

MONY VAULT is the security research and auditing division of MONY GROUP LLC. The brand should convey clarity, precision, credibility, and restraint — with beauty-first execution. Visual elements should feel intentional and minimal, without ornamental excess in core materials.

---

## 2) Directory Structure (current as of writing)

```
brand/
├── badges/
├── covers/
├── fonts/
├── icon/
├── logo/
├── wordmark/
└── masterbrandsecurity.svg
```

All exports of logos, badges, and report cover elements originate from `masterbrandsecurity.svg` and must not be manually altered outside of the master file except to convert text to paths or produce deployment variants.

---

## 3) Logos & Wordmarks

Location: `brand/wordmark/`

Use SVG versions whenever possible. PNGs are present only for previews.

Reference examples:
`<img src="wordmark/lockup_horiz_black.svg" width="260">`
`<img src="wordmark/lockup_stack_white.svg" width="200">`

Usage rules:

* Horizontal lockup is preferred for covers and titles.
* Stacked lockup may be used in tight square compositions.
* White version only on dark or colored backgrounds.
* Grey/mono version for low-contrast or muted contexts.

The isolated diamond icon is stored at:
`brand/logo/diamond.svg`

---

## 4) Severity Icons

Location: `brand/icon/`

Severity icons are used inside audit reports for classification of findings only. They should not be repurposed for navigation or decoration.

Reference example:
`<img src="icon/icon-sev-critical.svg" width="22">`

Icon files are available in colored and mono versions.

---

## 5) Audit Badges

Location: `brand/badges/`

Badges reflect review or approval states and may be embedded in READMEs, website footers, or PDF covers.

Examples:
`<img src="badges/audited.svg" width="260">`
`<img src="badges/independent.svg" width="260">`
`<img src="badges/secured.svg" width="260">`

Badges should remain in SVG format and be exported via `masterbrandsecurity.svg` when finalized.

---

## 6) Typography

Primary Typeface: **Red Hat Text**
Location: `brand/fonts/Red_Hat_Text/`

Used for all headings, body text, tables, and diagrams.

Secondary / Decorative Typeface: **Remilia Mincho**
Location: `brand/fonts/RemiliaMincho-Regular.otf`

Usage rules:

* Only for decorative small tags or ornamental marks.
* Not used for core audit content or findings.
* Only used in web/PDF outputs where embedding is controlled.

For maximum portability in final delivered assets (PDF, embedded SVG), convert all text to paths prior to issuance.

---

## 7) Color Palette

Use functional naming for clarity:

mv-bg            = background (light papers, interface neutral)
mv-fg            = primary text color
mv-accent        = primary brand cyan/blue for titles and emphasis
mv-accent-dark   = deeper brand counterpart
mv-muted         = gray used for subtitles, meta text
mv-border        = stroke and dividers

Suggested concrete values (can be refined during polish phase):
mv-bg            = #FFFFFF
mv-fg            = #0E1218
mv-accent        = #58C3FF → #0090F9 (gradient)
mv-accent-dark   = #003B74
mv-muted         = #6B7280
mv-border        = #B8C2CC

Palette may expand if needed, but additions should remain neutral, desaturated, and consistent with the existing tone.

---

## 8) Covers & Report Assets

Location: `brand/covers/`

These SVGs reference the wordmark and will serve as the top layer of delivered audit reports. Light and dark variants exist. Do not export to production until text is final and all embedded fonts are converted to outlines.

---

## 9) Master Source File

`masterbrandsecurity.svg` contains all asset components in a single controlled environment. All exports (badges, lockups, covers) should be derived from this file.

Rules:

* Do not edit exported files directly.
* Convert text to paths before export.
* Embed or flatten external references when exporting final deliverables.

---

## 10) Future Additions

To be added in subsequent revisions of this spec:

* README footer lockups
* HTML/CSS theme for on-site audit pages
* Printable PDF stylesheet
* Signing mark / verification stamp

---


