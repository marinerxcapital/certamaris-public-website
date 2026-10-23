# SEO optimization and production deployment - 2026-10-22

## Release

- Repository: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
- Branch: `codex/assurance-helix-hero-20260926`
- Code commit: `58e9c53`
- Documentation commit: `5700177`
- Prior production version: `ffe4337d-8b08-4e4f-a837-0ed085b8ea5c`
- New production version: `106e7258-b712-4252-9331-8ca4718e21ed`
- Worker: `certamaris-site`, 100% production traffic
- Deploy command: `npx wrangler deploy --config wrangler.jsonc --keep-vars --env=""`

## Baseline

The static site had 105 rendered HTML pages, 4,493 resolving internal links,
unique titles, one H1 per page, a branded social preview, and established
metadata/schema helpers. The audit found:

1. Four legal meta descriptions exceeded 160 characters.
2. Three legal aliases were noindex but retained self-canonical metadata.
3. `/industries` and `/sample-platform` remained indexable in the static export
   even though production redirected them.
4. `/sitemap` was indexable but absent from sitemap.xml.
5. Several templates published BreadcrumbList schema without visible
   breadcrumbs.
6. The homepage title was only the brand name.
7. The founder portrait was declared as a 1200x630 PNG social image despite
   being a 1251x1361 JPEG.
8. SEO QA lacked strict sitemap/indexability parity and schema-content checks.

## Implemented

- Added shared alias canonical targets and corrected social image MIME handling
  in `lib/metadata.ts`.
- Added a category-focused homepage title:
  `Maritime Cyber Compliance Software — CertaMaris`.
- Shortened four legal descriptions without changing legal body text.
- Added permanent Worker redirects and test coverage for:
  `/industries`, `/sample-platform`, `/privacy`, `/terms`,
  `/trust/subprocessors`, and `/platform/corporate-control-plane`.
- Made redirect fallback pages noindex,follow and canonical to final routes.
- Added `/sitemap` to sitemap.xml, producing exact 95/95 parity.
- Added visible breadcrumbs to every template that publishes BreadcrumbList
  schema.
- Corrected `/about/leadership` to use the approved branded social card.
- Added `seo-audit.mjs` for canonical, metadata, sitemap, robots, JSON-LD,
  OG-image, internal-link, and indexability integrity.
- Added `seo-visual-qa.mjs` for full-sitemap screenshots, H1 checks, overflow,
  broken images, console/network capture, and route-family viewport coverage.
- Integrated strict SEO audit and metadata-length checks into `npm run qa`.

No pricing, compliance-body, legal-body, contact-routing, navigation
destination, Pixel Grid, or homepage hero content was removed.

## Verification

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS, exit 0 |
| `npm run build:static` | PASS, 111 generated routes, exit 0 |
| `npm run qa` | PASS, 0 failed steps with `CHROMIUM_PATH` set to installed Chrome; the bare invocation first hit the known bundled-Chromium Windows ICU launch defect |
| `npm run qa:responsive-a11y` | PASS, 19 routes x 9 viewports, 0 issues |
| `npm run qa:ux-audit` | PASS, 25 routes, 5 features, 0 failures |
| `npm run qa:seo` | PASS, 105 pages, intentional noindex duplicates classified |
| `npm run qa:seo-audit` | PASS, 95 indexable / 95 sitemap, 0 errors, 0 warnings |
| `node scripts/qa/check-meta-lengths.mjs` | PASS, 0 titles >60, 0 descriptions >160 |
| `npm run qa:links` | PASS, 4,509 internal hrefs resolved |
| `npm run qa:link-preview` | PASS, 14/14 |
| `npm run test:worker` | PASS, 15/15 |
| `npm run qa:lighthouse` | Command PASS; scores 60 / 68 / 64; CLS 0 / 0 / 0.0002 |
| Full-sitemap axe crawl | 95 desktop + 95 mobile routes; 0 axe pages, 0 overflow, 0 console errors |
| SEO visual crawl, local | 95 routes, 340 observations, 0 failures |
| SEO visual crawl, live | 95 routes, 340 observations, 0 failures |

## Visual evidence

- Before: `qa-artifacts/seo-opt-2026-10-22/before/screenshots/`
- Local after: `qa-artifacts/seo-opt-2026-10-22/after/screenshots/`
- Live after: `qa-artifacts/seo-opt-2026-10-22/live-after/screenshots/`
- Final live rerun: `qa-artifacts/seo-opt-2026-10-22/live-final-20261023/screenshots/`
- Full-sitemap axe data: `audit/after-seo/results.json`

Coverage:

- Every sitemap route at 390x844 and 1440x900.
- Above-the-fold and full-page captures at both widths.
- 15 representative routes across 10 viewport/orientation sizes from 360x800
  through 1440x900.
- Live totals: 0 overflow, 0 broken images, 0 H1-count failures, 0 console
  errors, 0 network errors.

## Live readback

- All 103 required route/asset checks returned HTTP 200 after redirects.
- Six legacy paths were independently checked without following redirects and
  returned 301 to the intended final URLs.
- Homepage returned 200 with title `Maritime Cyber Compliance Software`,
  a 139-character description, and canonical `https://certamaris.com`.
- `/about/leadership` uses the approved 1200x630 branded PNG social card.
- sitemap.xml contains 95 URLs and includes `/sitemap`; legacy aliases are
  absent.
- robots.txt declares `https://certamaris.com/sitemap.xml`.
- `/compliance/imo` and topic pages render breadcrumbs and matching
  BreadcrumbList schema.
- Pixel Grid and footer markers remain present on topic pages.
- All six legacy routes returned 301 to their canonical destinations.
- Worker version readback confirms contact secrets, KV, rate limits, and ASSETS
  remain attached.
- Final live browser rerun: 95 sitemap routes, 340 observations, 0 failures,
  0 console errors, 0 network errors, 0 overflow, 0 broken images, and 0 H1
  failures.
- A separate live metadata readback fetched all 95 sitemap pages: all returned
  200 with one H1, self-canonical URL, `index, follow`, a title, a unique
  description, and an OG image; all 358 JSON-LD blocks parsed with 0 errors.

## Residuals

- No Search Console, analytics, ranking, query-volume, backlink, or competitor
  export was available. No such metrics or outcomes are claimed.
- Lighthouse mobile scores remain below 90 and are a separate performance
  project; no score threshold is configured in the repository.
- `npm audit --omit=dev --audit-level=high` still reports pre-existing Next.js,
  sharp, source-map-js, and baseline-browser-mapping findings. No dependency
  versions changed in this release.
- GitHub Actions remains outside this local Wrangler release path, consistent
  with the repository's recorded owner-side CI blockers.

## Rollback

```powershell
npx wrangler versions deploy ffe4337d-8b08-4e4f-a837-0ed085b8ea5c@100% --config wrangler.jsonc -y
```
