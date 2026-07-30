# CertaMaris Pixel Grid params + full-page visibility

Date: 2026-07-30  
Source path: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
Scope: Public marketing site only (`certamaris.com`). No app/API/auth/DB/Cyber Twin changes.

## Objectives

1. Make the existing Pixel Grid the clearly visible full-page background (header through footer).
2. Apply owner-supplied AI Designer effect parameters.
3. Keep a single runtime load and a single effect instance.

## Layering model

- Host: `app/layout.tsx` site root
- Effect: one `PixelGridBackground` with `fixed inset-0 z-0 pointer-events-none`
- Content shell: Nav + main + Footer wrapped in `relative z-10`
- Section shells (`section-surface--page` / `--paper` / hero): **transparent** (no full-bleed opaque washes)
- Readability: translucent cards, hero signal panel, sticky nav chrome
- Final CTA band: translucent navy `rgba(11, 42, 74, 0.88)` + blur
- Footer: solid navy for link contrast
- Reduced motion: `.pixel-grid-background { display: none }` under `prefers-reduced-motion: reduce`
- Runtime watermark: `[data-aifx-wm] { display: none !important }`

## Pixel Grid configuration (canonical)

```tsx
<div
  data-aifx="blocky"
  data-aifx-colors="#F4F8FF,#DCEAFF,#A9C9FF,#4F91FF,#006CFE,#012B6D"
  data-aifx-bg="#FBFDFF"
  data-aifx-bg-alpha="1"
  data-aifx-speed="0.16"
  data-aifx-block-size="72"
  data-aifx-levels="8"
  data-aifx-scale="1.15"
  data-aifx-drift-angle="24"
  data-aifx-glint="0.14"
  data-aifx-contrast="1.45"
  className="pixel-grid-background fixed inset-0 z-0 pointer-events-none"
  aria-hidden="true"
/>
```

| Param | Value |
|---|---|
| colors | `#F4F8FF,#DCEAFF,#A9C9FF,#4F91FF,#006CFE,#012B6D` |
| bg | `#FBFDFF` |
| bg-alpha | `1` |
| speed | `0.16` |
| block-size | `72` |
| levels | `8` |
| scale | `1.15` |
| drift-angle | `24` |
| glint | `0.14` |
| contrast | `1.45` |

## Runtime (reuse once)

- Script: `https://cdn.aidesigner.ai/effects/runtime/v1.js`
- Load point: single `next/script` in `app/layout.tsx` (`strategy="afterInteractive"`)
- Effect instances: **one** root host only

## Host CSS visibility

- Desktop/tablet `.pixel-grid-background` opacity: `0.78`
- Mobile (`max-width: 767px`) opacity: `0.62`
- Canvas / child fill: width/height 100% of fixed host

## Files touched

| File | Change |
|---|---|
| `components/PixelGridBackground.tsx` | Owner params + fixed full-screen defaults |
| `app/layout.tsx` | `z-0` grid + `relative z-10` content; single runtime |
| `app/globals.css` | Transparent section surfaces; remove hiding washes; opacity/canvas rules |
| `app/page.tsx` | Drop hero `isolate` that blocked clear layering |
| `components/PageHero.tsx` | Transparent hero shell + content z-10 |
| `components/Footer.tsx` | Brand footer surface via CSS class (solid navy) |

## Validation

| Check | Result |
|---|---|
| `npm.cmd run typecheck` | **PASS** |
| `npm.cmd run build:static` | **PASS** (expected static-export header/rewrite warnings) |
| Runtime count | One aidesigner script in layout |
| Effect count | One `data-aifx="blocky"` host |
| Layout / a11y / mobile | Preserved (no structural route or interaction changes) |
| Lint / unit test scripts | N/A (not defined in package) |

## Explicit non-goals

- No production Worker deploy in this step (owner-directed when ready)
- No authenticated app / Railway API / Neon / Cyber Twin edits
- No monorepo cutover

## Next

- Owner: deploy marketing Worker when ready so live `certamaris.com` picks up params + visibility.
