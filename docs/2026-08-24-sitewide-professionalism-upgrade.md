# 2026-08-24 Sitewide Professionalism Upgrade

## Scope

Upgrade the complete CertaMaris public marketing website so every route family reads as a more serious, professional maritime SaaS buyer surface without inventing customers, certifications, compliance guarantees, metrics, integrations, legal claims, or contact-delivery status.

## Root Cause / Audit Findings

Fresh production screenshots showed the site had credible product proof and truthful buyer paths, but the shared visual shell made the full site feel less professional than the underlying content:

- The Pixel Grid background was too visually dominant across body pages and competed with dense copy.
- Page heroes placed primary copy inside translucent cards, which made many routes read like internal prototypes instead of decisive buyer pages.
- Liquid Glass radii, shadows, and highlights were too decorative for a high-trust maritime procurement site.
- Buttons and repeated cards felt large relative to dense SaaS content.
- Global type used negative letter spacing, increasing the editorial/experimental feel and creating weaker readability in compact panels.
- The same density pattern appeared across home, platform, demo, pricing, trust, procurement, contact, resources, legal, and 404 routes.

No current public marketing page reintroduced Internal CertaMaris Admin Dashboard or Corporate Control Plane as a buyer feature during this pass.

## Files Changed

- `app/globals.css`
- `components/PageHero.tsx`
- `components/Button.tsx`
- `components/HomeHero.tsx`
- `app/about/leadership/page.tsx`
- `app/not-found.tsx`
- `docs/implementation/sitewide-professionalism-20260824/`
- `docs/2026-08-24-sitewide-professionalism-upgrade.md`
- `README.md`
- `docs/AGENT_MEMORY.md`
- `docs/CODEX_MARKETING_TAKEOVER.md`
- `C:\Users\Skyler B. Brown\.codex\memories\extensions\ad_hoc\notes\2026-08-23T22-54-00-sitewide-professionalism-upgrade.md`

## Implementation

- Reduced global Pixel Grid opacity and added calmer section/page surfaces so content reads first.
- Tightened the design tokens: 8px glass radius, flatter Liquid Glass backgrounds, subtler shadows, cleaner nav/dropdown/mobile sheet surfaces, and a solid high-contrast footer.
- Rebuilt shared `PageHero` framing so primary route copy is unframed with a restrained left accent, while optional aside content remains visually contained.
- Reduced page-hero vertical bulk and adjusted hero typography to avoid oversized, ornamental presentation on operational pages.
- Tightened shared button sizing and shadows.
- Removed negative letter spacing from global headings and remaining hard-coded page headings.
- Strengthened product screenshot/exhibit shadows without changing the current proof assets.
- Preserved the current Open Graph/social preview path: `/og/certamaris-link-preview-2026-08-v2.png`.
- Preserved contact fallback truth, legal/regulatory boundary language, pricing data, public product boundary, and internal-admin exclusion.

## Screenshot Evidence

Baseline screenshots:

- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/01-home-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/02-platform-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/03-demo-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/04-pricing-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/05-trust-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/06-procurement-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/07-contact-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/08-solutions-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/09-who-we-serve-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/10-resources-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/11-legal-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/12-404-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/13-home-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/14-platform-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/15-pricing-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/baseline/16-contact-mobile.png`

After screenshots:

- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/01-home-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/02-platform-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/03-demo-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/04-pricing-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/05-trust-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/06-procurement-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/07-contact-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/08-solutions-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/09-who-we-serve-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/10-resources-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/11-legal-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/12-404-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/13-home-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/14-platform-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/15-pricing-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/after/16-contact-mobile.png`

Production screenshots:

- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/01-home-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/02-platform-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/03-demo-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/04-pricing-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/05-trust-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/06-procurement-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/07-contact-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/08-solutions-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/09-who-we-serve-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/10-resources-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/11-legal-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/12-404-desktop.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/13-home-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/14-platform-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/15-pricing-mobile.png`
- `docs/implementation/sitewide-professionalism-20260824/screenshots/production/16-contact-mobile.png`

## Local Validation

Passed:

- `npm run typecheck`
- `npm run build:static`
- `npm run build`
- `npm run qa`
- `npm run qa:responsive-a11y`
- `npm run qa:link-preview`
- `npm run qa:buyer-paths`
- `npm run qa:excellence`
- `npm run qa:public-product-boundary`
- `npm run qa:product-experience`

Results:

- Production build generated 110 static pages.
- Static export generated 110 pages.
- Full QA completed with 0 failed steps.
- Responsive/a11y QA covered 16 routes across 9 viewports with 0 issues and 0 broken images.
- Link-preview QA confirmed exactly one `og:image`, exactly one `twitter:image`, and preserved `/og/certamaris-link-preview-2026-08-v2.png`.
- Buyer-path, excellence-path, product-experience, and public-product-boundary checks passed.

Non-blocking notes:

- `npm run qa:responsive-a11y` recorded existing console-error counters during viewport crawls, but completed with `issues=0` and `brokenImages=0`.
- Next.js static export repeats the expected warning that custom headers are not applied by `output: export`; production headers are handled by the Worker.

## Deployment

- Feature commit: `cfadbd2`
- PR: #18 (`https://github.com/marinerxcapital/certamaris-public-website/pull/18`)
- Merge commit: `04de3aad669575963f1474fbf671d3f5c5bddf0f`
- PR validation run: `32694382473`, validate job `97333673180`, passed
- Production deployment run: `32694451757`, validate job `97333862097`, deploy job `97333987041`, passed
- Production Worker: `certamaris-site`
- Cloudflare Worker version: `7afb48f1-6659-43e4-ad1a-4807bc009b32`
- Deploy log evidence: uploaded 535 files, 582 already uploaded; `Current Version ID: 7afb48f1-6659-43e4-ad1a-4807bc009b32`

## Production Verification

- `curl -I -L https://certamaris.com/`: final `200 OK`, `Content-Type: text/html`, `CF-Cache-Status: HIT`, `Cache-Control: public, max-age=0, s-maxage=300, stale-while-revalidate=86400`, ETag `"0ecb575e694d6d307e58c79fec97e5e9"`.
- `curl -I -L https://www.certamaris.com/`: `301 Moved Permanently` to `https://certamaris.com/`, then `200 OK` with the same root ETag.
- Live root HTML contains exactly the preserved versioned preview URL `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`.
- Live root HTML contains no `certamaris-og.jpg`, `Corporate Control Plane`, `Internal Admin`, or `Admin Dashboard` references.
- Live CSS asset `/_next/static/chunks/3wwuxdiuzeis-.css` contains the deployed shell markers: `--radius-glass:8px`, `opacity:.28`, `letter-spacing:0`, `page-hero-copy`, `page-hero-polished:before`, and `0 8px 18px`.
- Live route scan returned `200` and zero forbidden-term hits for `/`, `/platform`, `/demo`, `/pricing`, `/trust`, `/trust/procurement`, `/contact`, `/solutions`, `/who-we-serve`, `/resources`, and `/legal/privacy`; custom 404 route returned `404` with zero forbidden-term hits.
- Live preview image `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`: `200`, `Content-Type: image/png`, `121623` bytes, PNG signature `89504e470d0a1a0a`, dimensions `1200x630`.
- Production screenshots captured in `docs/implementation/sitewide-professionalism-20260824/screenshots/production/`.

## Status

RESOLVED.
