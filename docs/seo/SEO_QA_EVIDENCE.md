# CertaMaris SEO QA Evidence

Evidence generated during the 2026-10-22 SEO optimization pass.

## Static SEO

- `npm run qa:seo-audit`
  - 105 exported HTML pages
  - 95 indexable routes
  - 95 sitemap URLs
  - 0 hard errors
  - 0 warnings
  - 0 JSON-LD parse errors
  - 97 routes with inbound internal links
- `node scripts/qa/check-meta-lengths.mjs`
  - 105 pages
  - 0 titles over 60 characters
  - 0 descriptions over 160 characters
- `npm run qa:seo`
  - 105 pages
  - title/H1 checks pass
  - intentional noindex alias duplicates classified separately
- `npm run qa:links`
  - 4,509 internal hrefs resolved
- `npm run qa:link-preview`
  - 14/14 checks pass

## Visual crawl

Artifact roots:

- Before: `qa-artifacts/seo-opt-2026-10-22/before/`
- After: `qa-artifacts/seo-opt-2026-10-22/after/`
- Live after: recorded after production deployment

Coverage:

- 95 sitemap routes at 390x844 and 1440x900.
- Above-the-fold and full-page screenshots for every route at those widths.
- 15 representative routes across 10 viewport/orientation checks:
  360x800, 800x360, 390x844, 844x390, 430x932, 932x430, 768x1024,
  1024x768, 1280x800, and 1440x900.
- 340 observations in each before/after run.
- 0 horizontal overflow failures.
- 0 missing or multiple-H1 failures.
- 0 broken-image failures.
- 0 unexplained console or network failures after exact local-only
  static-harness classification.

## Accessibility

- Existing `qa:responsive-a11y`: 19 routes x 9 viewports, 0 reported issues,
  0 broken images.
- Existing `qa:ux-audit`: 25 routes and 5 interactive feature captures,
  0 failures.
- Full-sitemap axe crawl: 95 routes at desktop and mobile. Desktop axe scans
  found 0 pages with violations; both viewports found 0 horizontal-overflow
  pages and 0 console errors. Evidence: `audit/after-seo/results.json`.

## Build and regression

- `npm run typecheck`
- `npm run build:static`
- `npm run qa`
- `npm run test:worker`
- `npm run qa:lighthouse`

Final results:

- `npm run typecheck`: exit 0
- `npm run build:static`: exit 0; 111 generated routes
- `npm run qa`: exit 0; 0 failed steps
- `npm run qa:responsive-a11y`: exit 0; 0 reported issues
- `npm run qa:ux-audit`: exit 0; 0 failures
- `npm run qa:seo-audit`: exit 0; 95 indexable / 95 sitemap, 0 hard errors
- `node scripts/qa/check-meta-lengths.mjs`: exit 0
- `npm run qa:links`: exit 0; 4,509 hrefs resolved
- `npm run qa:link-preview`: exit 0; 14/14
- `npm run test:worker`: exit 0; 15/15
- `npm run qa:lighthouse`: exit 0; CLS thresholds pass

Environment note: the first bare `npm run qa` invocation exited 1 at
`product-experience journeys` because the bundled Playwright Chromium failed to
start on this Windows host (`Invalid file descriptor to ICU data received`).
The same suite passed with
`CHROMIUM_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"`; this
is the repository's established browser-parity workaround.

## Live verification

Artifact roots:

- `qa-artifacts/seo-opt-2026-10-22/live-after/`
- `qa-artifacts/seo-opt-2026-10-22/live-final-20261023/`

- 95 sitemap routes.
- 340 observations: 95 routes x 2 widths with fold/full screenshots, plus 15
  representative routes x 10 viewport/orientation checks.
- 0 failures.
- 0 console errors.
- 0 network errors.
- 0 horizontal-overflow observations.
- 0 broken-image observations.
- 0 H1-count failures.

Production Worker: `106e7258-b712-4252-9331-8ca4718e21ed`.

Final live readback also verified:

- `node scripts/qa/check-routes.mjs --base https://certamaris.com --include-planned`
  exit 0: 103/103 required route and asset checks.
- Six legacy paths returned HTTP 301 to their canonical destinations.
- `sitemap.xml` returned 200 with 95 unique URLs and included `/sitemap` while
  excluding the `/privacy` alias.
- `robots.txt` returned 200 and declared
  `Sitemap: https://certamaris.com/sitemap.xml`.
