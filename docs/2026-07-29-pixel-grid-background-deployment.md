# CertaMaris Pixel Grid Background Deployment Log

Date: 2026-07-29
Source path: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
Scope: Replace decorative background systems with the supplied AI Designer Pixel Grid effect.

## Current background system

- Runtime: `https://cdn.aidesigner.ai/effects/runtime/v1.js`
- Runtime loading point: `app/layout.tsx`
- Effect component: `components/PixelGridBackground.tsx`
- Effect instance count in source: one root Pixel Grid layer
- Pointer behavior: `pointer-events: none`
- Layering: fixed negative z-index background inside the root `relative isolate` container
- Reduced motion: the Pixel Grid layer is hidden by the global `prefers-reduced-motion: reduce` CSS rule
- Runtime watermark: the injected `data-aifx-wm` element is hidden so it does not overlay product proof or mobile content

## Pixel Grid configuration

```tsx
<div
  data-aifx="blocky"
  data-aifx-colors="#f4f8ff,#dceaff,#a9c9ff,#4f91ff,#006cfe"
  data-aifx-bg="#fbfdff"
  data-aifx-speed="0.24"
  data-aifx-block-size="56"
  data-aifx-levels="8"
  data-aifx-scale="1.15"
  data-aifx-drift-angle="24"
  data-aifx-glint="0.08"
  data-aifx-contrast="0.78"
  className="absolute inset-0 -z-10 pointer-events-none"
  aria-hidden="true"
/>
```

The live component adds the system class `pixel-grid-background` and uses a root fixed-position variant so one shared effect can cover the marketing site without duplicate runtime instances.

## Visibility tuning

- Current Pixel Grid opacity: `0.46` on desktop/tablet and `0.32` below 768px.
- Current Pixel Grid speed: `0.24`.
- Current Pixel Grid block size: `56`.
- Current section surface overlay: `0.86` opacity on page/paper surfaces and `0.68` on the homepage hero.
- Current mobile surface overlay: `0.90` on page/paper surfaces and `0.84` on the homepage hero.
- The effect remains disabled under `prefers-reduced-motion: reduce`.

## Removed background systems

- `components/SiteBackground.tsx`
- `components/Silk.tsx`
- `components/HeroVideo.tsx`
- `components/MotionField.tsx`
- `types/vanta.d.ts`
- `public/bg/*`
- `public/video/*`
- `@react-three/fiber`
- `three`
- `@types/three`

## Source updates

- `app/layout.tsx` loads the AI Designer runtime once and renders the shared Pixel Grid layer.
- `app/page.tsx` no longer renders hero video or homepage motion fields.
- `app/globals.css` removes old animated/gradient/video background CSS and adds Pixel Grid opacity, section overlays, and reduced-motion handling.
- `components/Section.tsx` and `components/PageHero.tsx` use the same surface overlay model so the Pixel Grid is visible without reducing content contrast.
- `next.config.ts` and `worker/index.ts` allow the AI Designer script in CSP report-only headers and remove stable-cache handling for deleted `/video/*` and `/bg/*` assets.

## Validation checklist

- `npm.cmd run typecheck`: PASS.
- `npm.cmd run build:static`: PASS. Existing static-export warnings about headers/rewrites not applying during export remain expected because the Cloudflare Worker applies those production headers and RSC rewrites.
- `npm.cmd audit --omit=dev --audit-level=high`: PASS, 0 vulnerabilities.
- Lint script: NOT APPLICABLE, no `lint` script exists.
- Test script: NOT APPLICABLE, no `test` script exists.
- Local Worker browser QA: PASS on 60 route/viewport checks: 20 public routes across 1440px, 768px, and 390px.
- Browser console and network: PASS, zero console warnings/errors and zero HTTP responses >= 400 through local Worker QA.
- Pixel Grid runtime: PASS, one root `data-aifx="blocky"` instance and one runtime script after hydration.
- Old background DOM: PASS, zero `.site-background`, `.site-background-silk`, `.motion-field`, `.hero-video-frame`, or `video` elements.
- Reduced motion: PASS, `prefers-reduced-motion: reduce` matched and the Pixel Grid layer computed to `display: none`.
- Mobile nav: PASS, drawer opened with no duplicate labels.
- Product lightbox: PASS, first product screenshot opened and Escape closed the lightbox.
- Final screenshots saved under `qa-screenshots/pixel-grid-final-home-desktop.png`, `qa-screenshots/pixel-grid-final-home-tablet.png`, and `qa-screenshots/pixel-grid-final-home-mobile.png`.
## Deployment result

- Implementation commit: `6e5664e38de8b31d7a32190c614c00b690261019`
- Initial deployed Worker version: `ef4b2c12-5b61-40dd-ad4d-e0ecdd5b68fb`
- `origin/main` verification after push: PASS, remote `main` matched local implementation commit.
- Live HTTP verification: PASS, all 20 public routes returned HTTP 200.
- Live RSC prefetch verification: PASS, `/platform/__next.platform.__PAGE__.txt?_rsc=pixelcheck` returned HTTP 200.
- Live HTML verification: PASS after cache revalidation, `https://certamaris.com/` includes the AI Designer runtime and Pixel Grid markup and no longer includes `hero-fog`.
- Live browser QA: PASS on 60 route/viewport checks across 1440px, 768px, and 390px.
- Live browser console and network: PASS, zero console warnings/errors and zero HTTP responses >= 400.
- Live mobile nav: PASS, no duplicate labels.
- Live product lightbox: PASS, first product screenshot opened and Escape closed the lightbox.
- Live reduced motion: PASS, `prefers-reduced-motion: reduce` matched and the Pixel Grid layer computed to `display: none`.

This log was updated after the live deployment and requires a docs-only follow-up commit so the source tree records the completed rollout.
