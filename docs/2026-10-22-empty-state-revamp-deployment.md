# Empty-state design system revamp and production deployment - 2026-10-22

## Source and release

- Repository: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
- Branch: `codex/assurance-helix-hero-20260926`
- Code commit: `cc5c9ee` (`feat(marketing): add shared empty-state design system`)
- Prior production version: `645e711a-a23a-4423-8c20-d6e8c093a509`
- New production version: `ffe4337d-8b08-4e4f-a837-0ed085b8ea5c`
- Worker: `certamaris-site`, 100% of production traffic
- Deploy command: `npx wrangler deploy --config wrangler.jsonc --keep-vars --env=""`

## Audit finding

The three company empty-state routes rendered the same thin block: one heading,
one paragraph, two generic actions, and an email line. The content was honest,
but the pages did not distinguish directory, hiring, and media contexts or give
readers enough factual routing context.

The root cause was three route-specific copies of the same minimal template,
with no reusable state primitive and no dedicated visual/regression gate.

## Implemented

- Added `components/EmptyState.tsx` with page and compact sizes.
- Added distinct partnership, careers, press, resources, and search motifs.
- Rebuilt `/about/partners`, `/about/careers`, and `/about/press` around the
  shared state console.
- Added one primary action, three routing steps, and four related paths per
  company route.
- Reused the compact primitive for Resources no-match and Command Palette
  no-match states.
- Added `scripts/qa/empty-state-qa.mjs`; it covers 3 routes, 12 viewport /
  orientation checks, 72 screenshots per run, H1 count, overflow, broken
  images, target size, interactions, and axe.
- Added the three company routes to the existing responsive-a11y and UX audit
  route sets.
- Integrated the empty-state journey into `npm run qa`.
- Documented the component in `docs/empty-state-design-system.md`.

No route, pricing value, compliance disclaimer, contact routing behavior,
navigation destination, footer link, hero, or Pixel Grid setting was removed.

## Visual QA

| Set | Path | Result |
| --- | --- | --- |
| Live before | `qa-artifacts/empty-state-revamp-2026-10-22/before/screenshots` | 72 full/fold captures |
| Local after | `qa-artifacts/empty-state-revamp-2026-10-22/after/screenshots` | 72 full/fold captures + 2 no-match captures |
| Live after | `qa-artifacts/empty-state-revamp-2026-10-22/live-after/screenshots` | 72 full/fold captures + 2 no-match captures |

Viewport/orientation checks: 360x800, 800x360, 390x844, 844x390, 430x932,
932x430, 768x1024, 1024x768, 1280x800, 800x1280, 1440x900, and 900x1440.

Result: zero horizontal overflow, zero clipped/broken images, zero target-size
failures inside the state surfaces, one H1 per route, one page-level primary
action, three process steps, and four related links on every route.

## Gates

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS, exit 0 |
| `npm run build:static` | PASS, 111 routes, exit 0 |
| `npm run qa` | PASS, 0 failed steps; 105 pages, 4,493 internal links |
| `npm run qa:responsive-a11y` | PASS, 19 routes x 9 viewports, 0 issues, 0 broken images |
| `npm run qa:ux-audit` | PASS, 25 routes, 5 feature captures, 0 failures |
| `node scripts/qa/empty-state-qa.mjs --label after --verify` | PASS, 72 screenshots, 0 failures |
| `node scripts/qa/empty-state-qa.mjs --label live-after --verify --base https://certamaris.com` | PASS, 72 screenshots, 0 failures |
| `npm run qa:lighthouse` | Command PASS; scores `/=60`, `/security=68`, `/pricing=64`; CLS 0 / 0 / 0.0002 |
| Axe mobile + desktop for all three routes | 0 serious or critical violations |

The responsive-a11y harness records 282 console entries on the local static
server. These are the documented Next static-export `_rsc` prefetch 404s; the
dedicated gate classifies them as local-only. The same 3-route production
matrix reported zero console, page, or network errors.

## Production readback

All routes returned HTTP 200 with the expected title and canonical:

| Route | H1 | Variant | Shell |
| --- | --- | --- | --- |
| `/about/partners` | 1 | `partnership` | nav, page hero, Pixel Grid, footer present |
| `/about/careers` | 1 | `careers` | nav, page hero, Pixel Grid, footer present |
| `/about/press` | 1 | `press` | nav, page hero, Pixel Grid, footer present |

Homepage readback returned HTTP 200 with one H1 and preserved the approved hero
video, poster, Pixel Grid, and footer markers. Worker version readback confirmed
both contact secrets remain attached after `--keep-vars`.

## Residuals

- `npm audit --omit=dev --audit-level=high` still fails on four pre-existing
  package findings (`next`, `sharp`, `source-map-js`, and
  `baseline-browser-mapping`). No dependency versions changed in this pass.
  The site is a static export served by a Worker, but the toolchain advisories
  still require a deliberate dependency-maintenance release.
- Five accepted SEO warnings remain for legacy legal aliases and duplicate
  not-found HTML. They predate this pass.
- Lighthouse is a smoke check without a score threshold in this repo; the
  observed mobile scores are below 90 and remain a separate performance task.

## Rollback

```powershell
npx wrangler versions deploy 645e711a-a23a-4423-8c20-d6e8c093a509@100% --config wrangler.jsonc -y
```
