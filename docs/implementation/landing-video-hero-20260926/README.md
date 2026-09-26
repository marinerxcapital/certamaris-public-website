# Implementation record - landing video hero (2026-09-26)

Companion to `docs/2026-09-26-landing-video-hero-deployment.md`. This folder holds the
contracts a future agent must not silently change.

## Layout contract

```
app/page.tsx
  <HomeHero />              components/HomeHero.tsx
    .hero-cinematic         video band  (HeroVesselFilm media layer + copy + coverage strip)
    .hero-assurance         Assurance Helix product-proof band
  <Section id="capabilities">   components/HomeCapabilityBand.tsx
  <HomeSampleRecord />          components/HomeSampleRecord.tsx   -> #sample-record
  <Section id="product-moment"> ProductCinematicMoment
  <Section id="before-after">   BeforeAfterComparison
  <Section id="trust-pricing">  trust + pricing teasers
  <Section id="buyer-diligence"> diligence packet
  founder section
  final CTA
```

Band heights: `.hero-cinematic__band { min-height: clamp(520px, 78svh, 860px) }`
(`clamp(480px, 74svh, 640px)` below 768 px). The cap is deliberate so the next band is
always partly visible in the first viewport on mobile and desktop.

## Media contract

| Aspect | Contract |
|---|---|
| Server render | poster `<img src="/media/certamaris-vessel-hero-2026-09-poster.webp">` only |
| Static HTML | contains **no** `<video>` element |
| Desktop (>767 px) | `/media/certamaris-vessel-hero-2026-09.mp4` (1280x720) |
| Mobile (<=767 px) | `/media/certamaris-vessel-hero-2026-09-mobile.mp4` (854x480) |
| Attributes | `autoPlay muted loop playsInline preload="metadata" disablePictureInPicture tabIndex={-1} aria-hidden="true"` |
| Not mounted when | `prefers-reduced-motion: reduce`, `saveData`, effective 2G, or rejected `play()` |
| Playing signal | `.hero-film[data-live="true"]` fades the video in over 900 ms |
| Scrim | two navy gradients inside `.hero-film__scrim`; text contrast must not depend on the frame |

## Object order (never reorder)

`REQ -> APP -> CTL -> ASM -> EVD -> FND -> RSK -> CAP -> QA -> PKG`

Displayed demo ids: `REQ-026 -> APP-014 -> CTL-041 -> ASM-023 -> EVD-238 -> FND-031 ->
RSK-009 -> CAP-017 -> QA-066 -> PKG-004`.

## Motion contract

Entrance uses `helixNodeIn` (transform only) on label-bearing elements plus `helixDotIn`
(opacity) on decorative dots, then ambient drift, object progression, and bounded pointer
response. Label-bearing containers must never animate below full opacity: doing so drops
the 11.5 px mono labels to 3.38:1 against their white chip, below WCAG AA.

## Content contract

Hero and pillar copy is limited to capability already published elsewhere on the site:
IMO MSC.428(98), IACS UR E26/E27, evidence/findings/corrective actions, readiness
packages, regulatory change tracking, fleet/vessel/shoreside scope. No customers, counts,
certifications, telemetry, or guarantees were added.

## Regenerating the media

```powershell
pwsh scripts/media/build-hero-media.ps1
npm run qa:hero-media        # 35 checks incl. size budget, poster-first, both width tiers
```

Verify the deployed result with:

```powershell
node scripts/qa/check-hero-media.mjs --base https://certamaris.com
```

---

SIGNED-BY: Codex - running DeepSeek V4 Flash Vision Exp (opencode Go)
DATE: 2026-09-26
STATUS: COMPLETE
