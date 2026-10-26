# CertaMaris full-site polish and production deployment - 2026-10-26

## Release

- Repository: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
- Branch: `codex/assurance-helix-hero-20260926`
- Source commit: `f093a87`
- Documentation commit: `53f5ac8`
- Prior production Worker: `certamaris-site` version
  `106e7258-b712-4252-9331-8ca4718e21ed`
- New production Worker: `certamaris-site` version
  `a17ddd35-f7c8-4e6b-8c5a-3b77f1d13b79` @100%
- Deployment time: 2026-10-26T17:16:23Z
- Live site: https://certamaris.com

## Audit basis

The pass audited 105 exported HTML documents: 95 canonical/indexable routes and
10 intentional noindex utility or legacy-alias pages. Every canonical route was
rendered at 390x844 and 1440x900. The family matrix covered 15 routes at 10
viewport/orientation sizes. Full-page axe coverage covered all 95 sitemap routes
at desktop and mobile.

## Defects found and fixed

1. **Responsive clipping on 37 routes.** Shared CSS Grid children retained
   `min-width: auto`, forcing long page-hero copy, product exhibits, legal
   sidebars, and the AI-policy grid beyond the mobile viewport. Because
   `overflow-x: clip` suppressed scrollWidth, the previous automated overflow
   check missed the visible clipping.
2. **Fixed-width page-hero proof panels.** `PageHero` children needed explicit
   shrink permission on mobile; the shared component now constrains both copy
   and aside columns.
3. **Legal and AI-policy content columns.** Legal document grids, the markdown
   panel, and the AI-policy two-column content could force their mobile columns
   wider than the viewport.
4. **Long-page navigation.** Security, Trust, About, and Standards & Guidelines
   exceeded 10,000px on mobile without an outline. A shared `PageOutline`
   component now supplies accessible anchor navigation.
5. **Sub-44px controls.** FAQ category links, FAQ triggers, breadcrumbs, jump
   navigation, resource filters, product-exhibit actions, demo controls, and
   related-route links now meet a 44px minimum target.
6. **Repeated external-link names.** Official-source and related-platform links
   now include framework-specific programmatic context instead of dozens of
   indistinguishable “Official source” links.

## Source changes

- Shared responsive layout: `app/globals.css`, `components/PageHero.tsx`,
  `components/LegalDocumentPage.tsx`, `components/LegalMarkdown.tsx`,
  `app/trust/ai-policy/page.tsx`.
- Long-page navigation: `components/PageOutline.tsx`,
  `app/security/page.tsx`, `app/trust/page.tsx`, `app/about/page.tsx`,
  `app/compliance/guidelines/page.tsx`.
- Interaction targets and link naming: `components/Breadcrumbs.tsx`,
  `components/FaqAccordion.tsx`, `app/faq/page.tsx`,
  `components/ResourcesFilter.tsx`, `components/ProductScreens.tsx`,
  `components/DemoTourGallery.tsx`, `components/ProductCinematicMoment.tsx`,
  `components/FrameworkDetail.tsx`, `components/LeadershipGrid.tsx`,
  `app/compliance/official-sources/page.tsx`.
- Route-template related-link targets: `app/platform/[slug]/page.tsx`,
  `app/solutions/[slug]/page.tsx`, `app/who-we-serve/[slug]/page.tsx`.

No route was removed. Pricing, compliance text, legal text, contact routing,
official-source authority, Pixel Grid, hero video, navigation destinations,
and contact secrets were preserved.

## Verification

| Command | Result |
| --- | --- |
| `npm run typecheck` | Exit 0 |
| `npm run build:static` | Exit 0; 111 generated routes |
| `npm run qa` with installed Chrome | Exit 0; 0 failed steps |
| `npm run qa:responsive-a11y` | Exit 0; 19 routes x 9 viewports; 0 issues |
| `npm run qa:ux-audit` | Exit 0; 25 routes, 5 features; 0 failures |
| `npm run qa:empty-states` | Exit 0; 3 routes x 12 viewports; 0 failures |
| `npm run qa:seo` | Exit 0; 105 pages |
| `npm run qa:seo-audit` | Exit 0; 95 indexable / 95 sitemap; 0 errors |
| `npm run qa:links` | Exit 0; 4,509 internal hrefs resolved |
| `npm run qa:link-preview` | Exit 0; 14/14 |
| `node scripts/qa/check-meta-lengths.mjs` | Exit 0; 105 pages |
| `node scripts/qa/check-routes.mjs --out --include-planned` | Exit 0; 103/103 |
| `npm run test:worker` | Exit 0; 6/6 |
| `npm run qa:lighthouse` | Exit 0; 60 / 68 / 64; CLS 0 / 0 / 0.0002 |
| Full-sitemap axe crawl | Exit 0; 95 desktop + 95 mobile; 0 axe pages, 0 overflow |
| Final 95-route visual crawl | Exit 0; 340 observations; 0 failures |
| Image load and alt crawl | Exit 0; 95 routes; 0 issues |

## Live readback

- 103/103 required routes and assets returned 200.
- Six legacy paths returned 301 to their canonical destinations.
- 95 sitemap URLs; `/sitemap` included; aliases excluded.
- 95 live pages returned 200 with one H1, self-canonical URL, index/follow,
  title, unique description, and OG image.
- 358 live JSON-LD blocks parsed with 0 errors.
- Live mobile clipping audit: 0 clipped pages.
- Live visual crawl: 95 routes, 340 observations, 0 failures, 0 console errors,
  0 network errors, 0 horizontal-overflow findings, 0 broken images.
- Page-outline anchors verified at 390x844 and 1440x900 for Security, Trust,
  About, and Standards & Guidelines; targets clear the sticky header.
- `www` redirects 301 to the apex; HSTS, CSP, nosniff, Referrer-Policy,
  Permissions-Policy, and X-Frame-Options remain present.
- Pixel Grid, homepage hero video, navigation, footer, and contact bindings
  remain present.

## Evidence

- Full matrix: `docs/full-site-polish/PAGE_POLISH_MATRIX.json`
- QA evidence: `docs/full-site-polish/QA_EVIDENCE.md`
- Before screenshots: `qa-artifacts/seo-opt-2026-10-22/polish-before-20261026/`
- Local after screenshots: `qa-artifacts/seo-opt-2026-10-22/polish-final-20261026/`
- Live after screenshots: `qa-artifacts/seo-opt-2026-10-22/full-site-polish-live-20261026/`
- Page-outline captures: `qa-artifacts/full-site-polish-2026-10-26/page-outline/`
- Clipping proof: `qa-artifacts/full-site-polish-2026-10-26/clipping-audit-final.json`
- Live semantic proof: `qa-artifacts/full-site-polish-2026-10-26/live-semantic-audit-final.json`
- Image/alt proof: `qa-artifacts/full-site-polish-2026-10-26/image-alt-scroll-audit.json`
- Axe data: `audit/polish-final-20261026/results.json`

## Residual limitations

- No Search Console, analytics, ranking, query-volume, backlink, conversion, or
  competitor export was available. No such outcomes are claimed.
- Lighthouse mobile scores remain 60/68/64 for `/`, `/security`, and `/pricing`;
  performance is a separate optimization project.
- Four pre-existing dependency audit findings remain (`next`, `sharp`,
  `source-map-js`, `baseline-browser-mapping`).
- The local static test harness still emits expected Next RSC-prefetch console
  noise; the live browser crawl reported zero console and network errors.

## Rollback

```powershell
npx wrangler versions deploy 106e7258-b712-4252-9331-8ca4718e21ed@100% --config wrangler.jsonc -y
```
