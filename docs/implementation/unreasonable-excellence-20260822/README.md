# CertaMaris Public Website Unreasonable Excellence Pass

Date started: 2026-08-21 23:22 America/Los_Angeles  
Completed: 2026-08-22 06:28 UTC  
Branch: `codex/unreasonable-excellence-20260822`  
Production repo: `marinerxcapital/certamaris-public-website`  
Production Worker: `certamaris-site`  
Live domain: `https://certamaris.com`

## Problem Statement

The public website was already credible, but fresh screenshots showed several buyer-readiness gaps:

- Pricing did not expose package economics in the first viewport; qualified buyers had to scroll before seeing actual package structure.
- Trust and contact routes had the right materials, but the diligence path read as a flat document list instead of a review sequence.
- Procurement had a sparse first viewport for a high-intent buyer route.
- Home and page heroes could be compressed slightly without hiding the Pixel Grid or changing the brand system.

No customer logos, certifications, commercial guarantees, delivery promises, or regulatory claims were added.

## Screenshot Evidence

Baseline screenshots:

- `screenshots/baseline/01-home-desktop.png`
- `screenshots/baseline/02-platform-desktop.png`
- `screenshots/baseline/03-demo-desktop.png`
- `screenshots/baseline/04-pricing-desktop.png`
- `screenshots/baseline/05-trust-desktop.png`
- `screenshots/baseline/06-procurement-desktop.png`
- `screenshots/baseline/07-contact-desktop.png`
- `screenshots/baseline/08-home-mobile.png`
- `screenshots/baseline/09-pricing-mobile.png`
- `screenshots/baseline/10-contact-mobile.png`
- `screenshots/baseline/11-mobile-menu.png`

After screenshots:

- `screenshots/after/01-home-desktop.png`
- `screenshots/after/02-pricing-desktop.png`
- `screenshots/after/03-trust-desktop.png`
- `screenshots/after/04-procurement-desktop.png`
- `screenshots/after/05-contact-desktop.png`
- `screenshots/after/06-home-mobile.png`
- `screenshots/after/07-pricing-mobile.png`
- `screenshots/after/08-contact-mobile.png`

Production screenshots:

- `screenshots/production/01-home-desktop.png`
- `screenshots/production/02-pricing-desktop.png`
- `screenshots/production/03-trust-desktop.png`
- `screenshots/production/04-procurement-desktop.png`
- `screenshots/production/05-contact-desktop.png`
- `screenshots/production/06-home-mobile.png`
- `screenshots/production/07-pricing-mobile.png`
- `screenshots/production/08-contact-mobile.png`

## Implementation

Files changed:

- `components/BuyerDiligencePacket.tsx`
- `app/pricing/page.tsx`
- `app/trust/procurement/page.tsx`
- `app/contact/page.tsx`
- `app/globals.css`
- `scripts/qa/check-excellence-path.mjs`
- `scripts/qa/check-buyer-paths.mjs`
- `scripts/qa/run-all.mjs`
- `package.json`

Changes:

- Added a forwardable four-step buyer review route to the shared diligence packet: proof, package fit, procurement/legal review, request.
- Replaced the pricing hero's simple buyer-path link list with a package snapshot using the existing `pricingTiers` data.
- Added a procurement hero review path linking public security controls, assurance model, and the procurement request flow.
- Added a contact-page checklist for the fastest useful request while preserving truthful follow-up and direct-email fallback language.
- Reduced `PageHero` minimum height and tightened mobile homepage hero text/persona spacing without removing the Pixel Grid or Liquid Glass system.
- Added `npm run qa:excellence` and wired it into `npm run qa` to assert the new generated-HTML buyer readiness surfaces.

Preserved:

- Current Open Graph/social preview path: `/og/certamaris-link-preview-2026-08-v2.png`
- Pixel Grid / Liquid Glass brand language
- Product proof assets and sample record
- Regulatory boundary and no-certification/no-guarantee language
- Contact fallback behavior and no delivery-status overclaim

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

Results:

- Static export generated 107 pages.
- Full QA completed with 0 failed steps.
- Responsive/a11y QA covered 12 routes across 360, 390, 768, and 1440 widths with 0 issues and 0 broken images.
- Link-preview QA confirmed exactly one `og:image`, exactly one `twitter:image`, and the preserved versioned preview PNG.
- Buyer-path QA and excellence-path QA confirmed generated HTML contains the expected proof, pricing, diligence, procurement, and contact route links.

Non-blocking limitation:

- `npm run qa:product-proof:render` did not return before the 6-minute command timeout. `npm run qa:product-proof`, screenshots, static build, full QA, and responsive/a11y QA passed.
- Local `scripts/qa/perf-hero.mjs` completed but reported `cells=0`, so it is not treated as Core Web Vitals evidence for the current Pixel Grid canvas implementation.

## Deployment

- Feature commit: `399920b`
- PR: #14 (`https://github.com/marinerxcapital/certamaris-public-website/pull/14`)
- Merge commit: `8a6331554025af500c83e050eb33b220a2caa415`
- PR validation run: `32556922541`, job `96992484622`, passed
- Production deploy run: `32556978238`, validate job `96992622323`, deploy job `96992697549`, passed
- Production root ETag after deploy: `"82a210908a5433f9fdb216a2b0f5836e"`
- Production preview image ETag: `"9559a90840a76c84816f63f278e4405c"`

## Production Verification

- `https://certamaris.com/` returned `200 OK`, `Content-Type: text/html`, `CF-Cache-Status: HIT`, `Cache-Control: public, max-age=0, s-maxage=300, stale-while-revalidate=86400`.
- `https://www.certamaris.com/` returned `301 Moved Permanently` to `https://certamaris.com/`, then `200 OK`.
- Live root HTML contains `Forwardable review route`, `/pricing`, `/trust/procurement`, `/contact?intent=procurement`.
- Live `/pricing` contains `Package snapshot`, `Core`, `Assurance`, `Enterprise`, `$15,000 / year`, and `#package-comparison`.
- Live `/trust/procurement` contains `Procurement review path`, `Public security controls`, `Assurance model one-pager`, and `/contact?intent=procurement`.
- Live `/contact` contains `Fastest useful request`, `Fleet size and vessel types in scope`, and `Forwardable review route`.
- Live metadata contains `<link rel="canonical" href="https://certamaris.com"/>`.
- Live metadata contains exactly one `og:image` and one `twitter:image`, both pointing to `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`.
- Live root HTML does not contain `certamaris-og.jpg`.
- Live preview image returned `200`, `Content-Type: image/png`, `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`, `121623` bytes, dimensions `1200x630`.
- Twitterbot-style root fetch received the current preview image URL and no old `certamaris-og.jpg` reference.

## External Cache Note

Apple/iMessage and other preview clients can retain their own URL-level cache independently of CertaMaris production. The production source is corrected for fresh crawls.

## Status

RESOLVED.
