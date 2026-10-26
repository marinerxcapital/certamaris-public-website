# CertaMaris full-site polish

Release date: 2026-10-26

## Outcome

- 105 HTML documents audited.
- 95 canonical routes and 10 noindex utility/alias pages.
- Every canonical route rendered at 390x844 and 1440x900.
- 15 representative routes checked across 10 viewport/orientation sizes.
- 37 routes with real mobile clipping were fixed.
- 0 routes with clipped text remain.
- 4 long-content pages received accessible page outlines.
- 95 desktop and 95 mobile routes passed the full-sitemap axe crawl.
- 95 routes passed a scrolled image-load and alt audit.
- Local and live visual crawls each produced 340 observations with 0 failures.

## Primary artifacts

- `PAGE_POLISH_MATRIX.json` - per-route status, intent, metadata, evidence, and
  responsive verification.
- `QA_EVIDENCE.md` - commands, results, counts, and artifact locations.
- `../2026-10-26-full-site-polish-deployment.md` - release, Worker versions,
  live readback, residuals, and rollback.

## Shared systems changed

- `components/PageHero.tsx`
- `components/PageOutline.tsx`
- `components/LegalDocumentPage.tsx`
- `components/LegalMarkdown.tsx`
- `components/Breadcrumbs.tsx`
- `components/FaqAccordion.tsx`
- `components/ResourcesFilter.tsx`
- `components/ProductScreens.tsx`
- `components/DemoTourGallery.tsx`
- `components/ProductCinematicMoment.tsx`
- `components/FrameworkDetail.tsx`
- `components/LeadershipGrid.tsx`
- `app/globals.css`

Route templates using the shared PageHero, legal, product, solution, audience,
FAQ, resource, compliance, and trust surfaces inherit the fixes.
