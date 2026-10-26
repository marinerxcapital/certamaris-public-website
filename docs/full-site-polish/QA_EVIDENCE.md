# CertaMaris full-site polish QA evidence - 2026-10-26

## Coverage

- 105 exported HTML documents.
- 95 canonical/indexable routes.
- 10 intentional noindex utility or legacy-alias pages.
- Every canonical route captured at 390x844 and 1440x900.
- Fifteen representative routes captured across 10 viewport/orientation sizes:
  360x800, 800x360, 390x844, 844x390, 430x932, 932x430, 768x1024,
  1024x768, 1280x800, and 1440x900.
- Full-sitemap axe crawl: 95 routes at desktop and mobile.
- Final local visual observations: 340.
- Final live visual observations: 340.

## Vision findings

The visual review found real mobile clipping on 37 routes. Long page-hero
headings, intro copy, proof exhibits, legal metadata columns, and the AI-policy
grid extended past the right edge while `overflow-x: clip` kept document
`scrollWidth` at the viewport width. A dedicated bounding-box audit now detects
this class of defect and excludes legitimate horizontal scroll containers.

Before: 37 pages with clipped text.

After: 0 pages with clipped text.

## Final local results

- `npm run typecheck`: exit 0
- `npm run build:static`: exit 0; 111 generated routes
- `npm run qa`: exit 0 with installed Chrome
- `npm run qa:responsive-a11y`: exit 0; 19 routes x 9 viewports
- `npm run qa:ux-audit`: exit 0; 25 routes, 5 features
- `npm run qa:empty-states`: exit 0; 72 screenshots; 0 failures
- `npm run qa:seo`: exit 0; 105 pages
- `npm run qa:seo-audit`: exit 0; 95/95 parity; 0 errors, 0 warnings
- `npm run qa:links`: exit 0; 4,509 internal hrefs
- `npm run qa:link-preview`: exit 0; 14/14
- `check-meta-lengths.mjs`: exit 0; 105 pages
- `check-routes.mjs --out --include-planned`: exit 0; 103/103
- `npm run test:worker`: exit 0; 6/6
- `npm run qa:lighthouse`: exit 0; scores 60 / 68 / 64
- `audit-crawl.mjs polish-final-20261026 --no-shots`: exit 0; 95 desktop +
  95 mobile; 0 axe pages, 0 overflow, 0 console errors

## Final live results

- Required route/assets: 103/103 HTTP 200.
- Legacy aliases: six 301 redirects verified.
- Sitemap: 95 URLs, `/sitemap` present, aliases absent.
- Live canonical pages: 95/95 HTTP 200.
- One H1 per page: 95/95.
- Self-canonical and index/follow: 95/95.
- Unique title and description: 95/95.
- OG image present: 95/95.
- JSON-LD: 358 blocks, 0 parse errors.
- Mobile clipping: 0 pages.
- Live visual crawl: 340 observations, 0 failures, 0 console errors,
  0 network errors, 0 horizontal-overflow findings, 0 broken images.
- Page-outline anchors: 4 routes x 2 widths; all targets clear the sticky header.

## Artifact locations

- Before: `qa-artifacts/seo-opt-2026-10-22/polish-before-20261026/`
- Final local: `qa-artifacts/seo-opt-2026-10-22/polish-final-20261026/`
- Final live: `qa-artifacts/seo-opt-2026-10-22/full-site-polish-live-20261026/`
- Page outlines: `qa-artifacts/full-site-polish-2026-10-26/page-outline/`
- Clipping final: `qa-artifacts/full-site-polish-2026-10-26/clipping-audit-final.json`
- Live semantic: `qa-artifacts/full-site-polish-2026-10-26/live-semantic-audit-final.json`
- Image/alt scroll audit: `qa-artifacts/full-site-polish-2026-10-26/image-alt-scroll-audit.json`
- Axe results: `audit/polish-final-20261026/results.json`
