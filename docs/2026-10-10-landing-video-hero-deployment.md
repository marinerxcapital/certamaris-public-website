# Homepage approved hero video - deployed and verified

**Date:** 2026-10-10
**Surface:** public marketing homepage (`https://certamaris.com`) only. Authenticated app and API were not touched.
**Repository:** `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
**Branch:** `codex/assurance-helix-hero-20260926`
**Code commit:** `27fe0ca`
**Worker:** `certamaris-site` version `fdad693e-e162-4074-80a6-dddcc41bbdbc`
**Previous live version:** `7a735921-c1e0-4245-8ad4-217c34704933`

## Implementation

- Replaced the homepage `ProductExhibit` screenshot with `HeroVideo`.
- Preserved the existing navigation architecture, pixel-grid background, copy, button destinations, and downstream homepage sections.
- Added a white rounded showcase frame with subtle border/shadow, a noninteractive product-demo label row, and a 16:9 responsive video surface.
- Added `autoplay`, `muted`, `loop`, `playsInline`, `preload="auto"`, `disablePictureInPicture`, `controls={false}`, and `controlsList` to the video element. No play button, timeline, volume control, or fullscreen control is rendered.
- Added a poster frame and a reduced-motion effect that pauses at the poster frame while preserving the autoplay contract for normal motion settings.

## Media

Source: attached `4-CertaMaris-Landing-Page-Hero-Video.mov`.

| Asset | Details |
| --- | --- |
| `public/videos/certamaris-hero-demo.mp4` | H.264 High, yuv420p, 1280×720, 24 fps, 10 s, no audio, `+faststart`, 2,768,705 bytes, SHA-256 `01D080B8E7207C15D434623EC0DA10C1A60DD59A90EA6095E12A1763E4C5A2BC` |
| `public/videos/certamaris-hero-poster.jpg` | JPEG poster, 1280×720, 118,717 bytes, SHA-256 `C356CB7FA5114B1BF8B696ED4EF6AB82666608F895D8247EC8A5802ED40477CF` |

The source MOV is HEVC and was encoded to H.264 for broad browser playback. No source media or temporary filenames ship.

## Validation

| Check | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run build:static` | PASS; 111 routes generated |
| `npm run test:pricing` | PASS; 12/12 |
| `npm run qa:product-experience` with installed Chrome | PASS; 5/5 |
| `npm run qa:public-product-boundary` | PASS; 21/21 |
| `npm run qa:content` | PASS; 154 files |
| `CHROMIUM_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" npm run qa:responsive-a11y` | PASS; 0 issues, 0 broken images, 16 routes × 9 viewports |
| Local Chrome hero harness | PASS; desktop/mobile video decoded and advanced, controls absent, overflow 0 |
| Reduced-motion hero harness | PASS; video paused at poster frame |

The static responsive harness reports existing RSC prefetch 404 console messages from its minimal server; they do not create QA issues. The production Chrome readback reports zero console errors.

## Production readback

- `GET /` returned 200 and contains the hero MP4/poster references and approved headline.
- `HEAD /videos/certamaris-hero-demo.mp4` returned 200 with `Content-Type: video/mp4`.
- `HEAD /videos/certamaris-hero-poster.jpg` returned 200 with `Content-Type: image/jpeg`.
- Desktop 1440×900 and mobile 390×844 returned 200, `readyState=4`, 1280×720 decoded video, `paused=false`, advanced `currentTime`, zero console errors, and zero horizontal overflow.
- Reduced-motion 390×844 returned `paused=true`, `currentTime=0`, and retained the required media attributes.
- CTA destinations remain `/contact?intent=demo` and `/demo#scrub-tour`.

## Residuals

- `npm audit --omit=dev --audit-level=high` remains red on four pre-existing advisories in pinned dependencies. This release added no dependency and did not widen the audit scope.
- GitHub Actions was not used. The documented local Wrangler path deployed the approved marketing surface directly.

## Rollback

```powershell
npx wrangler versions deploy 7a735921-c1e0-4245-8ad4-217c34704933@100% --config wrangler.jsonc -y
```

**Status:** COMPLETE
