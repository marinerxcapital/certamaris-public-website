# CERTAMARIS MARKETING REVAMP - FINAL HANDOFF (2026-09-26)

Owner directive: *CertaMaris Codex Marketing Website Revamp + Video Directive, 2026-09-26.*
Executed against the marketing live SoT
`C:\certamaris-startup-site-pnpm\certamaris-startup-site`.

## 1. Summary of completed work

The `certamaris.com` landing page was materially rebuilt around the owner-supplied vessel
footage as the signature first screen, then re-sequenced so the value proposition precedes
the technical proof:

1. **New cinematic hero.** Full-bleed, silent, looping aerial vessel footage behind a
   corrected navy scrim, with the category eyebrow, the existing H1, a concise supporting
   line, two live CTAs, the `#sample-record` anchor, and a factual coverage strip.
2. **Weights handled properly.** A dedicated web derivative pipeline produced a 720p
   desktop loop, a 480p mobile loop, and two poster stills. The 42 MB source is never served.
3. **Existing product proof preserved.** The 2026-09-26 Assurance Helix exhibit now owns its
   own band directly beneath the footage. Geometry, labels, motion, and object order are
   untouched.
4. **Value proposition added.** A five-domain capability band (maritime cybersecurity,
   cyber-risk intelligence, compliance, assurance, operational resilience) using only
   capability already published on `/platform`, `/solutions`, and `/compliance`.
5. **Composition cleaned up.** The `#sample-record` plane moved into its own client island so
   the page order is hero, helix, pillars, sample record, then the existing narrative.

Everything else on the site - navigation, footer, legal library, pricing, demo tour, trust
centre, contact path, and the `app.certamaris.com` handoff - was preserved as found.

## 2. Major files and components changed

| File | Change |
|---|---|
| `components/HeroVesselFilm.tsx` | New. Media layer: poster-first, hydration-attached loop, skip conditions. |
| `components/HomeHero.tsx` | Rewritten. Video band + coverage strip + preserved helix band. |
| `components/HomeCapabilityBand.tsx` | New. Five-domain pillar band. |
| `components/HomeSampleRecord.tsx` | New. Extracted `#sample-record` plane with its persona copy. |
| `components/Button.tsx` | Added `outline-inverse` variant for actions over footage. |
| `lib/content.ts` | Added `homeCapabilityPillars`. |
| `app/page.tsx` | New section order and the capability band. |
| `app/globals.css` | `.hero-cinematic*`, `.hero-film*`, `.hero-assurance*`, `.home-capability-grid`; helix entrance made transform-only (`helixNodeIn` + `helixDotIn`). |
| `worker/index.ts` | `/media/` added to `isStableAsset` for long-lived caching. |
| `next.config.ts` | `/media/:path*` cache header for Node-hosted parity. |
| `.gitignore` | `media-source` ignored. |
| `scripts/media/build-hero-media.ps1` | New. Deterministic ffmpeg derivation incl. seamless crossfade loop. |
| `scripts/qa/check-hero-media.mjs` | New. 35-check hero contract; supports `--base` for production. |
| `scripts/qa/run-all.mjs`, `package.json` | Wired `qa:hero-media` into the suite. |
| `scripts/qa/responsive-a11y-qa.mjs`, `check-product-experience.mjs`, `ux-audit-browser-qa.mjs`, `audit-crawl.mjs` | Honour `CHROMIUM_PATH`; serve `video/mp4`; axe node targets; optional console dump. |

## 3. Video source, derivative, and poster files

| Role | Path |
|---|---|
| Owner source (unchanged) | `C:\Users\Skyler B. Brown\Desktop\CertaMaris Public Marketing Website Landing Page Video.mov` |
| In-repo reference copy | `media-source/CertaMaris-vessel-hero-source-2026-09-26.mov` (gitignored) |
| Desktop loop | `public/media/certamaris-vessel-hero-2026-09.mp4` |
| Mobile loop | `public/media/certamaris-vessel-hero-2026-09-mobile.mp4` |
| Poster (primary) | `public/media/certamaris-vessel-hero-2026-09-poster.webp` |
| Poster (fallback) | `public/media/certamaris-vessel-hero-2026-09-poster.jpg` |

Sizes and hashes are recorded in `docs/2026-09-26-landing-video-hero-deployment.md`.

## 4. Major UI/UX decisions

- Footage is the first-screen visual; product proof is the second band, so promise and proof
  are adjacent instead of competing.
- The copy column is held to a 41 rem measure over a scrim that is darkest on the left, which
  keeps contrast independent of which frame is on screen.
- The capability band is a hairline grid rather than a field of floating cards, to stay
  institutional instead of decorative.
- Five pillars close the grid with a spanning final cell at both the 2- and 3-column
  breakpoints, so there is never an empty track.
- Hero band height is capped so the next band always peeks into the first viewport.
- No new dependency, no new third-party runtime, no new tracker.

## 5. Accessibility and performance protections

- One H1; decorative media `aria-hidden`; visually-hidden text alternative for the footage.
- Reduced motion mounts no video element at all and keeps the poster plus all copy.
- Autoplay can never carry audio: the derivative has no audio track and the element is muted.
- Hero contrast regression fixed (`helixNodeIn` opacity 0.5 to transform-only), verified by
  axe at 0 serious/critical violations across 94 routes at desktop and mobile.
- Poster paints first (57 KB, `fetchpriority="high"`); the loop loads only after hydration and
  only when the device qualifies; mobile uses the 480p variant.

## 6. Test and build commands run

```bash
npm run build:static
npm run typecheck
npm run test:pricing
npm run test:contact
npm run test:worker
npm run qa
npm run qa:hero-media
npm run qa:responsive-a11y
npm run qa:link-preview
node scripts/qa/audit-crawl.mjs after
node scripts/qa/check-hero-media.mjs --base https://certamaris.com
node scripts/qa/check-routes.mjs --base https://certamaris.com --include-planned
```

(`qa:responsive-a11y` and the browser steps need `CHROMIUM_PATH` pointing at the installed
Chrome, because the cached Playwright headless shell cannot start in this environment.)

## 7. Results for every gate

PASS: `build:static` (110 pages), `typecheck`, `test:pricing` 12/12, `test:contact` 9/9,
`test:worker` 5/5, `qa` content guard (150 files clean), `qa:hero-media` 35/35,
`qa:responsive-a11y` (16 routes x 9 viewports: 0 axe violations, 0 overflow, 0 broken
images), `audit-crawl after` (94 routes x desktop + mobile: 0 axe-violating pages, 0
overflow pages, 0 console errors), `check-routes --out` 103, buyer path, excellence path,
public product boundary, founder, link preview 14/14, production hero contract 26/26,
production routes 103 pass / 0 fail.

FAIL, all pre-existing and each reproduced in an isolated HEAD worktree:

- `product-experience journeys` - two homepage checks target `[data-qa="fleet-assurance-workbench"]`
  and the `Release package` lifecycle heading; neither component is mounted anywhere after the
  2026-09-20 homepage compression.
- `check-seo` - duplicate `Privacy Policy` title on `/privacy` and `/legal/privacy`; already an
  owner content decision, and `/privacy` is `noIndex`.
- `check-links` - 54 percent-encoded `%5Bslug%5D` dynamic-chunk hrefs the checker cannot
  resolve against the literal `[slug]` directory on disk.
- `qa:ux-audit` - stale feature-capture selector (same missing workbench).
- `npm run ci:validate` - `npm audit` on the pre-existing `next@16.2.12` and `sharp@0.35.3`
  advisories; owner-gated dependency bump, low exposure for a static export.
- Roughly 350 console 404s counted by `qa:responsive-a11y`, emitted by that harness's own
  minimal static server (baseline 343, same message class, `issues=0` on both).

## 8. Deployment status

Deployed. Worker `certamaris-site` version `ea419440-583c-46c9-8208-24306cd4e7f9` at 100
percent, built from this working tree with `npm run build:static` and
`npx wrangler deploy --config wrangler.jsonc --keep-vars` - the documented local path in
`docs/ci-billing.md`. GitHub Actions remains owner-blocked and was not used.
Previous live version for rollback: `c2be68c9-259c-4ece-a254-9aebc64ca8f8`.

## 9. Production URLs checked

- `https://certamaris.com/` - 200, new hero markers present, retired `hero-section` gone, one H1.
- `https://www.certamaris.com/` - 301 to the apex.
- `/media/certamaris-vessel-hero-2026-09.mp4`, `-mobile.mp4`, `-poster.webp`, `-poster.jpg` -
  200, `video/mp4` for the loops, week-long cache.
- `/platform`, `/pricing`, `/contact`, `/demo`, `/trust`, `/security`, `/legal/privacy`,
  `/legal/terms`, `/sitemap.xml`, `/robots.txt`, `/.well-known/security.txt`,
  `/og/certamaris-link-preview-2026-08-v2.png` - 200.
- `/security.txt` - 301 to `/.well-known/security.txt`.
- `https://app.certamaris.com/auth/login` - 200; marketing to application continuity intact.

## 10. Remaining issues

1. GitHub Actions deploy is still blocked by the owner-side account billing lock plus the
   pre-existing dependency advisories. Production shipped locally; nothing in this work
   depends on CI.
2. The stale `product-experience` / `ux-audit` homepage selectors and the `check-links`
   percent-encoding gap are real QA-tooling debt, left untouched deliberately so a check
   cannot be quietly edited to hide a regression. Owner call.
3. The desktop loop is 8.08 MB by choice; raising `-Crf` in the media script lowers it.

No other blocker.

---

SIGNED-BY: Codex - running DeepSeek V4 Flash Vision Exp (opencode Go)
DATE: 2026-09-26
STATUS: COMPLETE
