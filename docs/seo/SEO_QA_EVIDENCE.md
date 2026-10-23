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
- Full-sitemap axe crawl: recorded in `audit/after-seo/results.json`.

## Build and regression

- `npm run typecheck`
- `npm run build:static`
- `npm run qa`
- `npm run test:worker`
- `npm run qa:lighthouse`

Exact exit codes and final live results are recorded in the dated deployment
record after deployment.
