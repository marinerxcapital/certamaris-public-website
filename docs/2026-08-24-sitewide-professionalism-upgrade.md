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

Production screenshots will be added after deployment.

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

Pending PR merge and production deployment.

## Production Verification

Pending deployment.

## Status

IN PROGRESS until production deploy and live verification complete.
