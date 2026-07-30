# CertaMaris Pixel Grid Background Deployment Log

Date: 2026-07-29 (initial) · **Updated: 2026-07-30** (params + full-page visibility)  
Source path: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
Scope: AI Designer Pixel Grid as the marketing site background.

> For the latest param set and visibility layering, also see  
> `docs/2026-07-30-pixel-grid-params-visibility-deployment.md`.

## Current background system

- Runtime: `https://cdn.aidesigner.ai/effects/runtime/v1.js` (**loaded once** in `app/layout.tsx`)
- Effect component: `components/PixelGridBackground.tsx`
- Effect instance count in source: **one** root Pixel Grid layer
- Pointer behavior: `pointer-events: none`
- Layering: `fixed inset-0 z-0` behind content shell `relative z-10`
- Reduced motion: Pixel Grid hidden via global `prefers-reduced-motion: reduce` CSS rule
- Runtime watermark: injected `data-aifx-wm` hidden so it does not overlay product proof or mobile content

## Pixel Grid configuration (current)

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

## Visibility tuning (current)

- Pixel Grid CSS opacity: `0.78` desktop/tablet; `0.62` below 768px
- Section page/paper shells: **transparent** (no full-bleed opaque washes)
- Cards / nav / hero panels: translucent surfaces for readability
- Final CTA: translucent navy band; footer solid navy
- Effect disabled under `prefers-reduced-motion: reduce`

## Removed background systems (still removed)

- `components/SiteBackground.tsx`, `Silk.tsx`, `HeroVideo.tsx`, `MotionField.tsx`
- `types/vanta.d.ts`, `public/bg/*`, `public/video/*`
- `@react-three/fiber`, `three`, `@types/three`

## Historical validation (2026-07-29 deploy)

- Initial implementation commit: `6e5664e38de8b31d7a32190c614c00b690261019`
- Initial Worker version: `ef4b2c12-5b61-40dd-ad4d-e0ecdd5b68fb`
- Live QA of that build is recorded in the original rollout notes below this revision.

## 2026-07-30 local verification (params + visibility)

- `npm.cmd run typecheck`: **PASS**
- `npm.cmd run build:static`: **PASS** (expected export header warnings)
- Single runtime script + single `data-aifx="blocky"` host confirmed in source
- Production marketing deploy of this revision: **pending owner**
