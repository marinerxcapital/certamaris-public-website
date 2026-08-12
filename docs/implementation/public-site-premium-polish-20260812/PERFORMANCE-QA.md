# Performance QA

## Build

Command:

```powershell
npm run build:static
```

Result: PASS

Evidence:

- Next.js compiled successfully.
- Static generation completed for `106/106` pages.
- Static export warnings about custom headers are existing Next.js static-export limitations.

## Pixel Grid / Animation Smoke

Command:

```powershell
$env:CHROMIUM_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; node scripts/qa/perf-hero.mjs
```

Measured result:

```text
load=14042ms cells=0 frame median=33.3ms p95=33.8ms max=37.4ms frames>33ms=211/240
```

Interpretation:

- The local headless run showed roughly a 30 fps cadence for the hero animation sample.
- This sprint did not increase Pixel Grid complexity or remove the Pixel Grid identity.
- No Lighthouse/Core Web Vitals numbers are claimed from this sprint because Lighthouse was not run.

## Asset / Screenshot Loading

Product-proof integrity remained intact:

- 17 registry screens.
- 4 responsive derivatives per screen.
- Render QA verified Dashboard V2 images at 7 viewport sizes.

