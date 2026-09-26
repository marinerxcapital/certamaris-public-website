# Landing-page cinematic vessel hero + marketing revamp - deployed and verified

**Date:** 2026-09-26
**Surface:** public marketing landing page (`https://certamaris.com`) only.
`app.certamaris.com` / `platform.certamaris.com` were **not** touched.
**Repo:** `C:\certamaris-startup-site-pnpm\certamaris-startup-site` (marketing live SoT)
**Worker:** `certamaris-site` version `ea419440-583c-46c9-8208-24306cd4e7f9` @100%
**Previous live version:** `c2be68c9-259c-4ece-a254-9aebc64ca8f8` @100% (2026-09-26 logo-mark deploy)
**Branch:** `codex/assurance-helix-hero-20260926`

---

## 1. Source asset

| Item | Value |
|---|---|
| Owner-supplied file | `C:\Users\Skyler B. Brown\Desktop\CertaMaris Public Marketing Website Landing Page Video.mov` |
| Size / SHA-256 | 42,062,551 bytes / `5052E7302AB11C66B8C167D968569F9DE9697DA6CDD9835E817957F25A58258E` |
| Probed codec | `hevc (Main)` / hvc1, **1280x720**, **25 fps**, **43.56 s**, ~7,721 kb/s, `yuvj420p` (full range), bt709 |
| In-repo reference copy | `media-source/CertaMaris-vessel-hero-source-2026-09-26.mov` (byte-identical SHA-256 match; `media-source/` is gitignored) |

The directive described the attached file as H.264 910x512 / 30 fps / ~26 MB. The file
actually supplied is HEVC 1280x720 / 25 fps / 43.56 s / ~42 MB. The real file was probed
rather than assumed, and every derivative below is cut from it at native resolution -
nothing was upscaled.

## 2. Derivatives (web payload)

All four files live in `public/media/` and are committed. They are produced only by
`scripts/media/build-hero-media.ps1` - do not hand-edit them.

| File | Bytes | SHA-256 | Notes |
|---|---|---|---|
| `certamaris-vessel-hero-2026-09.mp4` | 8,084,813 | `F490F234EED12CFF9ADF574ECFFA52C5D08B03A076A2B3615BF13F89BAFFF126` | H.264 High, `yuv420p` tv-range, bt709, 1280x720, 25 fps, 42.04 s, ~1,538 kb/s, no audio, `+faststart` |
| `certamaris-vessel-hero-2026-09-mobile.mp4` | 3,563,597 | `496F0444FD3D28F44947E085C0D6E53AC435CEE5363B65ACF53FBE9A0A5C53A7` | same encode at 854x480, ~678 kb/s - served to viewports at or below 767 px |
| `certamaris-vessel-hero-2026-09-poster.webp` | 57,390 | `43310EAE63F5920F86A7E54A43DFB065A9513D8CB8B84A47066FDBEDD92BD30D` | poster / LCP candidate, WebP q84, 1280x720 |
| `certamaris-vessel-hero-2026-09-poster.jpg` | 76,945 | `4B02C9B8DE4F438A6E4543C71EEB703E28674405CDb8DCC3353539098A40E9A2` | `<video poster>` fallback encoder |

**Loop strategy.** The source is one continuous 43.56 s aerial orbit, so a hard cut at
the loop point is visible. The build cross-fades the final 1.5 s into the first 1.5 s
with `xfade`, then concatenates the untouched middle: the clip starts and ends on the
same frame and loops seamlessly. Nothing is re-ordered, sped up, or synthesised, so the
footage still represents the supplied source.

**Poster frame.** t = 40.5 s of the *original* source - dark open water with the vessel
mid-frame - chosen because it must also read as a complete still under
`prefers-reduced-motion` and when autoplay is blocked.

Metadata is stripped (`-map_metadata -1`); no audio track is encoded at all.

## 3. Landing-page implementation

### First screen - cinematic footage

- `components/HeroVesselFilm.tsx` (new) owns the media layer.
- **Poster-first:** the server render is a 57 KB WebP `<img>` with
  `fetchpriority="high"`. The `<video>` element is **not** in the static HTML; it is
  attached after hydration, so the loop can never become the LCP bottleneck and no-JS
  visitors download no video.
- The loop is `muted`, `loop`, `playsInline`, `autoPlay`, `preload="metadata"`,
  `disablePictureInPicture`, `tabIndex={-1}` and `aria-hidden="true"` - decorative
  reinforcement, never the source of meaning.
- The poster carries the accessible text alternative
  (`<p class="sr-only">Background footage: an aerial view of a laden tanker under way in open water.</p>`).
- **Skip conditions** leave the poster in place, which is a complete state: reduced
  motion, `navigator.connection.saveData`, an effective 2G connection, or a rejected
  `play()`. On skip the `<video>` element is never mounted.
- Width tiers: 1280x720 above 767 px, 854x480 at or below it.
- A corrected navy gradient scrim (100deg plus 180deg layers) guarantees headline and
  CTA contrast regardless of which frame is showing.

### Hero copy and conversion

- Eyebrow: `Maritime cyber assurance`.
- H1 (unchanged, one per page): Know readiness before survey - across every vessel.
- Primary CTA `Request a demo` to `/contact?intent=demo`; secondary `See the product` to
  `/demo#scrub-tour`; plus the existing `#sample-record` anchor.
- New `Button` variant `outline-inverse` for the low-emphasis action over footage.
- Coverage strip (factual, no invented metrics): IMO MSC.428(98) and IACS UR E26/E27
  workflows / evidence-to-package assurance record / fleet, vessel, and shoreside
  operations.

### Second screen - product proof preserved

The 2026-09-26 **Assurance Helix** exhibit was preserved intact and moved into its own
band directly beneath the footage (`components/HomeHero.tsx`), with the explanatory
column beside it. No helix geometry, label, motion contract, or object order changed.

### Screens 3+ - value proposition before technical depth

- `components/HomeCapabilityBand.tsx` (new) plus `homeCapabilityPillars` in
  `lib/content.ts` add five plain-language domains - maritime cybersecurity, cyber-risk
  intelligence, compliance, assurance, operational resilience - each grounded in
  capability already published on `/platform`, `/solutions`, and `/compliance`.
- `components/HomeSampleRecord.tsx` (new) lifts the `#sample-record` plane out of the
  hero component so the persona-selection client island stays isolated. The markup and
  anchors are unchanged.
- New page order: hero footage, assurance helix, capability pillars, sample record,
  product moment, before/after, trust and pricing, buyer diligence, founder, final CTA.

### Infrastructure

- `worker/index.ts`: `/media/` added to `isStableAsset`, so derivatives are served
  `public, max-age=604800, stale-while-revalidate=86400`.
- `next.config.ts`: matching `/media/:path*` header block for Node-hosted parity.
- `.gitignore`: `media-source` added so the 42 MB reference copy is never committed.
- CSP was **not** relaxed: the existing `media-src 'self'` and `img-src 'self' data:`
  already cover the footage and posters.

## 4. Accessibility work

- One H1 per page; the hero headline remains `#hero-title`.
- Decorative media is `aria-hidden`; a visually-hidden text alternative describes the footage.
- Reduced motion mounts no video element at all - the poster is the state, not a fallback.
- New coverage, pillar, and assurance copy was checked against the sitewide contrast system.
- **Regression found and fixed:** `@keyframes helixNodeIn` started `.helix-node` (and the
  vessel/record chips) at `opacity: 0.5`, which measured **3.38:1** on the 11.5 px mono
  labels while the splash was in flight. The label-bearing containers now settle on
  transform only; a separate `helixDotIn` keeps the decorative dot fade.
- `qa:responsive-a11y` now honours `CHROMIUM_PATH` (it previously could not launch in this
  environment), reports axe node targets, and prints the first unique console errors when
  `QA_VERBOSE_CONSOLE=1`.

## 5. Performance work

- First-paint payload added by the hero: **57 KB** (poster). The 8.08 MB / 3.56 MB loops
  are fetched only after hydration, only when the device qualifies, and stream
  progressively from a `+faststart` file.
- Mobile gets a 480p derivative (44 percent of the desktop payload) instead of the 720p file.
- Below-the-fold content and the Assurance Helix keep their existing reveal behaviour;
  nothing new blocks first render.
- The source stays at native 1280x720; CSS scales it, and no upscale is claimed.

## 6. SEO / security review

- No metadata, canonical, Open Graph, Twitter, robots, or sitemap change.
  `check-link-preview` still passes 14/14 and `check-seo` reports the same single
  pre-existing duplicate.
- No new dependency, tracker, remote font, or third-party script.
- No new inline script or style; the Worker CSP continues to hash inline blocks and still
  emits `media-src 'self'`, `img-src 'self' data:`, `object-src 'none'`,
  `frame-ancestors 'none'`.
- No new form endpoint, redirect, or unvalidated input path.

## 7. Verification executed 2026-09-26

| Gate | Command | Result |
|---|---|---|
| Static export | `npm run build:static` | PASS - 110 pages |
| Types | `npm run typecheck` | PASS |
| Unit | `test:pricing` / `test:contact` / `test:worker` | PASS 12/12, 9/9, 5/5 |
| Content guard | `qa` step `content-qa` | PASS - 150 files clean |
| Hero media contract (new) | `npm run qa:hero-media` | PASS 35/35 |
| Responsive + a11y | `qa:responsive-a11y` | PASS - 16 routes x 9 viewports, 0 axe violations, 0 overflow, 0 broken images |
| Full sitemap crawl | `node scripts/qa/audit-crawl.mjs after` | PASS - 94 routes desktop + mobile: 0 axe-violating pages, 0 overflow pages, 0 console errors |
| Route inventory | `check-routes --out --include-planned` | PASS 103 |
| Buyer path, excellence path, product boundary, founder, link preview | `qa` suite | PASS |
| Production hero contract | `check-hero-media.mjs --base https://certamaris.com` | PASS 26/26 |
| Production routes | `check-routes.mjs --base https://certamaris.com` | PASS 103, 0 fail |

### Pre-existing failures

An isolated `git worktree` of `69074a1` (HEAD before this change) was built and run
through the same gates. Each failure below is the same class there, so none is caused by
this work.

| Gate | Symptom | Baseline evidence |
|---|---|---|
| `product-experience journeys` | Two homepage checks wait for `[data-qa="fleet-assurance-workbench"]` and the `Release package` lifecycle heading. Neither `FleetAssuranceWorkbench` nor `AssuranceLifecycleTeaser` is mounted anywhere in `app/` or `components/` - the 2026-09-20 homepage compression removed them. | Baseline built homepage contains neither marker; baseline run fails identically. |
| `check-seo` | Duplicate title `Privacy Policy - CertaMaris` on `legal/privacy.html` and `privacy.html` (`/privacy` is `noIndex`; the check has no `noIndex` exemption). Already recorded as an owner content decision on 2026-09-26. | Baseline FAIL identical, 104 pages. |
| `check-links` | 54 "broken" `/_next/static/chunks/app/<route>/%5Bslug%5D/page-*.js` hrefs. The file on disk is literally `[slug]/page-*.js`; the checker does not percent-decode the dynamic-segment directory. | Baseline FAIL identical, 54 links of 7,112 href checks. |
| `qa:ux-audit` | Stale feature-capture selector, same missing `fleet-assurance-workbench` target. | Baseline fails identically. |
| Console counter | `qa:responsive-a11y` counts about 350 `Failed to load resource: 404` messages produced by the harness's own minimal static server, not the site. | Baseline 343, this build 352 - same message class; `issues=0` on both. |
| `npm run ci:validate` | Fails at `npm audit --omit=dev --audit-level=high` on `next@16.2.12` (fix `16.3.6`, outside the pinned range) and `sharp@0.35.3`. Owner-gated dependency bump already recorded in `docs/ci-billing.md`. Exposure is low for this deployment (static export, no Next server, `images.unoptimized`). | Unchanged by this work - no dependency was added. |

## 8. Production verification

- Worker `ea419440-583c-46c9-8208-24306cd4e7f9` at 100 percent (`wrangler deployments status`).
- `https://certamaris.com/` returns 200. Live HTML contains `hero-cinematic`,
  `certamaris-vessel-hero-2026-09-poster.webp`, `hero-assurance`, and
  `home-capability-grid`; the retired `hero-section` class is gone; exactly one `<h1>`.
- Real-browser production harness (`check-hero-media.mjs --base https://certamaris.com`):
  **26/26 PASS** - desktop attached and played the 720p loop, mobile used the 480p
  derivative, reduced motion mounted no video, zero overflow at every viewport.
- Media headers: `content-type: video/mp4` and
  `cache-control: public, max-age=604800, stale-while-revalidate=86400`. Posters return 200.
- Routes 200: `/platform`, `/pricing`, `/contact`, `/demo`, `/trust`, `/security`,
  `/legal/privacy`, `/legal/terms`, `/sitemap.xml`, `/robots.txt`,
  `/.well-known/security.txt`, `/og/certamaris-link-preview-2026-08-v2.png`.
- `https://www.certamaris.com/` returns 301 to the apex; `/security.txt` returns 301 to
  `/.well-known/security.txt`.
- `https://app.certamaris.com/auth/login` returns 200 - marketing to application
  continuity intact.
- Response headers unchanged in shape: HSTS `max-age=31536000; includeSubDomains; preload`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-Frame-Options: DENY`,
  and a CSP that still allows only `'self'` media plus hashed inline script and style.

Evidence artifacts (gitignored, on this machine): `qa-artifacts/hero-media/` (hero
screenshots, local and `-prod`) and `audit/after/` (188 desktop and mobile screenshots,
`results.json`, and `console-errors-*.json`, both empty).

## 9. Deploy and rollback

```powershell
cd C:\certamaris-startup-site-pnpm\certamaris-startup-site
npm run build:static
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

```powershell
# rollback to the previous live version
npx wrangler versions deploy c2be68c9-259c-4ece-a254-9aebc64ca8f8@100% --config wrangler.jsonc -y
```

Media can be regenerated deterministically with
`pwsh scripts/media/build-hero-media.ps1` (the original source must be present at
`media-source/CertaMaris-vessel-hero-source-2026-09-26.mov`, or pass `-Source`).

## 10. Remaining open items

1. **GitHub Actions remains blocked (owner-side).** Account billing lock plus the
   dependency advisories above. Unchanged by this work; production shipped through the
   documented local Wrangler path in `docs/ci-billing.md`.
2. **Stale product-experience checks.** `scripts/qa/check-product-experience.mjs` and the
   `ux-audit` feature captures still target homepage modules removed by the 2026-09-20
   compression. Repairing or retiring them is a QA-scope owner decision - deliberately
   not changed here, because editing the check could mask a real IA regression.
3. **Desktop hero payload is 8.08 MB.** Chosen deliberately for native-resolution loop
   quality; if bandwidth matters more than fidelity, raising `-Crf` in the media script
   drops it materially with no other code change.

---

SIGNED-BY: Codex - running DeepSeek V4 Flash Vision Exp (opencode Go)
DATE: 2026-09-26
STATUS: COMPLETE
