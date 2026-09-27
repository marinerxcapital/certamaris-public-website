# Pixel Grid restored, vessel video and Assurance Helix removed from the landing page

**Date:** 2026-09-26 (owner correction, same day as the video-hero pass)
**Surface:** public marketing site (`https://certamaris.com`). `app.certamaris.com` untouched.
**Repo:** `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
**Worker:** `certamaris-site` version `8852bbb1-dd35-4492-bb5b-c61319027f51` @100%
**Previous live version (for rollback):** `ea419440-583c-46c9-8208-24306cd4e7f9`
**Code commit:** `58764a4` (local; not pushed - GitHub Actions remains owner-blocked)
**Owner direction:** "Remove the dna strand and the ship. Bring back the animated pixel grids."

---

## 1. What the owner asked for, and what was done

| Owner ask | Action |
|---|---|
| Remove the DNA strand | The **Assurance Helix** exhibit is unmounted from the landing page. Its band, heading, legend, vessel tag and record tag are gone from `/`. |
| Remove the ship | The cinematic vessel hero is **deleted**, not just unhidden: the `<video>`/poster layer, the four derived media files, the media component, the hero-media QA guard and its npm script, the `/media/` cache rules, and the `video/mp4` MIME additions are all removed. `https://certamaris.com/media/*` now 404s. |
| Bring back the animated pixel grids | The first-party sitewide **Pixel Grid canvas** (`components/PixelGridBackground.tsx`) is mounted again in `app/layout.tsx`, and the CSS that had disabled it (`display: none`, `opacity: 0`) is gone. Section shells are translucent again so the grid reads through. |

The pre-helix, owner-approved hero is restored in its place: category label,
headline, supporting line, two actions and the sample-record anchor on the left,
and one restrained panel holding a **real product screenshot** (Executive
Readiness) on the right. The proof is the product surface itself.

## 2. Pixel Grid restoration detail

Restored to the configuration the owner last approved, not invented:

| Item | Value |
|---|---|
| Component | `components/PixelGridBackground.tsx` - one fixed, sitewide first-party canvas, no external script, no WebGL |
| Layer opacity | `0.28` (`--pixel-grid-background`, `app/globals.css`) |
| Canvas params | unchanged: `#F4F8FF`-to-`#012B6D` palette, 72px blocks, 8 levels, 1.15 scale, 24deg drift, ~20fps, DPR cap 1.5 |
| Reduced motion | the component paints one static frame and never starts the drift loop; the sitewide reduced-motion block also neutralises transitions |
| Section shells | `.section-surface` transparent; `--surface-page: rgba(251,253,255,0.76)`; `--surface-paper: rgba(243,247,250,0.92)` |
| Hero band | `.hero-section` background set to `transparent` and the opaque `.landing-hero::before` overlay deleted, so the grid is the hero background |
| Fallback | `html { background: #f6f9fc }` paints before the canvas's first frame |

The single knob for grid strength is `.pixel-grid-background { opacity }` in
`app/globals.css`. It is 0.28 because that is the value the owner's design notes
record as approved for readability over transparent sections.

## 3. Files changed in this revert

| File | Change |
|---|---|
| `app/layout.tsx` | Re-mounted `<PixelGridBackground />` behind the `z-10` shell. |
| `app/globals.css` | Removed the `display:none` retirement rules; restored the 0.28 fixed canvas rules and canvas sizing; restored translucent `--surface-page`/`--surface-paper` and translucent section shells; `.hero-section` transparent; deleted the opaque `.landing-hero::before`; restored the two-column hero layout (`minmax(0,0.82fr) / minmax(0,1.18fr)`, centred); added `.hero-product-panel` and `.hero-executive-frame`; deleted all `.hero-cinematic*`, `.hero-film*` and `.hero-assurance*` rules. |
| `components/HomeHero.tsx` | Rewritten: Pixel-Grid hero with copy plus the Executive Readiness product screenshot panel. No video, no helix. |
| `components/HeroVesselFilm.tsx` | **Deleted.** |
| `components/Button.tsx` | Removed the now-unused `outline-inverse` variant. |
| `public/media/*` | **Deleted** (both loops + both posters). The path 404s in production. |
| `scripts/qa/check-hero-media.mjs` | **Deleted.** |
| `package.json` | Removed `qa:hero-media`. |
| `scripts/qa/run-all.mjs` | Removed the hero-media step. |
| `worker/index.ts` | Removed `/media/` from `isStableAsset`. |
| `next.config.ts` | Removed the `/media/:path*` cache header block. |

Retained deliberately (dormant, nothing ships and nothing is wired):

- `components/AssuranceHelix.tsx` + `lib/assurance-helix.ts` - unmounted from `/`, still in the repo.
- `scripts/media/build-hero-media.ps1` and the gitignored `media-source/` reference copy of the
  owner's footage. Re-running that script regenerates the four media files; the component
  itself is in git history at `e37f0e9`.
- `.gitignore` still ignores `media-source` so a 42 MB source can never be committed by accident.

## 4. Verification

| Gate | Command | Result |
|---|---|---|
| Static export | `npm run build:static` | PASS - 110 pages |
| Types | `npm run typecheck` | PASS |
| Content guard | `qa` step `content-qa` | PASS - 150 files clean |
| Responsive + a11y | `qa:responsive-a11y` | PASS - 16 routes x 9 viewports: **0 axe violations, 0 overflow, 0 broken images** |
| Full sitemap crawl | `node scripts/qa/audit-crawl.mjs after` | PASS - **94 routes desktop + mobile: 0 axe-violating pages, 0 overflow pages, 0 console errors** |
| Route inventory | `check-routes --out --include-planned` | PASS 103 |
| Buyer path, excellence path, product boundary, founder, link preview | `qa` suite | PASS |
| Production render | real Chrome against `https://certamaris.com` | PASS - grid canvas present and painted, 0 console errors, 0 overflow, one H1, no helix, no `<video>`, hero panel present |

The three `npm run qa` failures (`product-experience journeys`, `check-seo`,
`check-links`) and the `ci:validate` `npm audit` failure are unchanged and were
already proven pre-existing at HEAD `69074a1` in an isolated worktree - see
`docs/2026-09-26-landing-video-hero-deployment.md` section 7.

## 5. Production verification

- Worker `8852bbb1-dd35-4492-bb5b-c61319027f51` at 100% (`wrangler deployments status`).
- `https://certamaris.com/` returns 200 (130,424 bytes, down from 155,417) and contains
  `pixel-grid-background`, `hero-section`, `hero-product-panel` and `hero-executive-frame`,
  with `hero-helix` and `hero-cinematic` absent, no `<video>` element and exactly one `<h1>`.
- `https://certamaris.com/media/certamaris-vessel-hero-2026-09.mp4` returns **404** - the ship
  payload is gone from the edge, not merely unused.
- Hero render verified in a real browser at 1280x900 and 390x844: the grid canvas is present
  and painted, zero console errors, zero horizontal overflow, headline
  "Know readiness before survey - across every vessel." intact.
- Marketing to application continuity unchanged (`https://app.certamaris.com/auth/login` 200);
  CSP, HSTS and the other security headers are unchanged and still allow only `'self'` media.

## 6. Rollback

```powershell
cd C:\certamaris-startup-site-pnpm\certamaris-startup-site
npx wrangler versions deploy ea419440-583c-46c9-8208-24306cd4e7f9@100% --config wrangler.jsonc -y
```

`ea419440-...` is the vessel-video build (restores the ship hero). `300ee9d3-...` is the
intermediate deploy of this same revert before the unused `outline-inverse` Button variant was
cleaned out; rolling back to it changes nothing visible.

---

SIGNED-BY: Codex - running DeepSeek V4 Flash Vision Exp (opencode Go)
DATE: 2026-09-26
STATUS: COMPLETE
