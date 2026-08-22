# 2026-08-22 Public Website Unreasonable Excellence Deployment

## Scope

Upgrade the CertaMaris public marketing website for serious maritime buyers by improving first-viewport scan speed, pricing comprehension, trust/procurement diligence, contact request clarity, responsive polish, and generated-HTML regression coverage.

## Root Cause / Audit Findings

Fresh screenshots showed the site was credible but not yet as efficient as it could be for qualified buyers:

- Pricing first viewport showed the pricing premise but not the actual package and minimum ARR structure.
- Buyer diligence existed, but the package read as a document grid rather than a clear review sequence.
- Procurement first viewport was sparse for a high-intent security/procurement route.
- Contact route preserved truthful fallback language, but buyers could use a concise checklist for what to include.
- Mobile menu and core routes remained readable after the prior conversion pass; no new design system was needed.

## Files Changed

- `components/BuyerDiligencePacket.tsx`
- `app/pricing/page.tsx`
- `app/trust/procurement/page.tsx`
- `app/contact/page.tsx`
- `app/globals.css`
- `scripts/qa/check-excellence-path.mjs`
- `scripts/qa/check-buyer-paths.mjs`
- `scripts/qa/run-all.mjs`
- `package.json`
- `docs/implementation/unreasonable-excellence-20260822/`
- `docs/2026-08-22-unreasonable-excellence-deployment.md`
- `README.md`
- `docs/AGENT_MEMORY.md`
- `docs/CODEX_MARKETING_TAKEOVER.md`

## Implementation

- Shared diligence packet now presents a four-step forwardable review route: inspect proof, confirm fit, review diligence, request materials.
- Pricing hero now exposes Core, Assurance, and Enterprise price structure in the first viewport using existing published `pricingTiers` data.
- Procurement hero now gives high-intent buyers immediate links to public security controls, the assurance-model one-pager, and the procurement request route.
- Contact page now includes a concise checklist for the fastest useful request.
- Page hero and mobile home hero spacing were tightened without changing the Pixel Grid/Liquid Glass brand system.
- `qa:excellence` was added and included in `npm run qa`.

## Preserved Constraints

- No invented customers, certifications, revenue, guarantees, integrations, legal claims, or contact-delivery status.
- Root social metadata and preview asset remain `/og/certamaris-link-preview-2026-08-v2.png`.
- Regulatory boundary and no-certification/no-guarantee language remain intact.
- Contact form fallback/direct email behavior remains truthful.

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

Evidence:

- Static export: 107 generated pages.
- Full QA: 0 failed steps.
- Responsive/a11y: 12 routes, 4 viewports, 0 issues, 0 broken images.
- Link-preview: exactly one `og:image`, exactly one `twitter:image`, preserved absolute versioned preview URL.
- Excellence-path: 29 checks passed across `/`, `/pricing`, `/trust`, `/trust/procurement`, and `/contact`.

Non-blocking notes:

- `npm run qa:product-proof:render` timed out twice, including a 6-minute run; the required product-proof integrity check and screenshot review passed.
- `scripts/qa/perf-hero.mjs` returned `cells=0`, so it should be updated before being used as current Pixel Grid performance evidence.

## Deployment

- Feature commit: `399920b`
- PR: #14 (`https://github.com/marinerxcapital/certamaris-public-website/pull/14`)
- Merge commit: `8a6331554025af500c83e050eb33b220a2caa415`
- PR validation: GitHub Actions run `32556922541`, job `96992484622`, passed
- Production deployment: GitHub Actions run `32556978238`, validate job `96992622323`, deploy job `96992697549`, passed
- Production Worker: `certamaris-site`
- Production root ETag after deploy: `"82a210908a5433f9fdb216a2b0f5836e"`
- Production preview image ETag: `"9559a90840a76c84816f63f278e4405c"`

Production screenshots captured:

- `docs/implementation/unreasonable-excellence-20260822/screenshots/production/01-home-desktop.png`
- `docs/implementation/unreasonable-excellence-20260822/screenshots/production/02-pricing-desktop.png`
- `docs/implementation/unreasonable-excellence-20260822/screenshots/production/03-trust-desktop.png`
- `docs/implementation/unreasonable-excellence-20260822/screenshots/production/04-procurement-desktop.png`
- `docs/implementation/unreasonable-excellence-20260822/screenshots/production/05-contact-desktop.png`
- `docs/implementation/unreasonable-excellence-20260822/screenshots/production/06-home-mobile.png`
- `docs/implementation/unreasonable-excellence-20260822/screenshots/production/07-pricing-mobile.png`
- `docs/implementation/unreasonable-excellence-20260822/screenshots/production/08-contact-mobile.png`

## Production Verification

- `curl -I -L https://certamaris.com/`: final `200 OK`, `Content-Type: text/html`, `CF-Cache-Status: HIT`, `Cache-Control: public, max-age=0, s-maxage=300, stale-while-revalidate=86400`, ETag `"82a210908a5433f9fdb216a2b0f5836e"`.
- `curl -I -L https://www.certamaris.com/`: `301 Moved Permanently` to `https://certamaris.com/`, then `200 OK` with the same root ETag.
- Live root HTML contains `Forwardable review route`, `/pricing`, `/trust/procurement`, `/contact?intent=procurement`, and `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`.
- Live root HTML does not contain `certamaris-og.jpg`.
- Live metadata contains `<link rel="canonical" href="https://certamaris.com"/>`.
- Live metadata contains one `og:image` and one `twitter:image`, both pointing to `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`.
- Live `/pricing`: `200`, ETag `W/"c4accbf757ef110c18737a313b561aa3"`, contains `Package snapshot`, `Core`, `Assurance`, `Enterprise`, `$15,000 / year`, `#package-comparison`.
- Live `/trust`: `200`, ETag `W/"0741c52d546181a027ff4ca1a2ddc8ef"`, contains `Forwardable review route`, `/trust/ai-policy`, `/legal/privacy`.
- Live `/trust/procurement`: `200`, ETag `W/"e8e978a5b53b1884a6a58c71d7e5abc0"`, contains `Procurement review path`, `Public security controls`, `Assurance model one-pager`, `/contact?intent=procurement`.
- Live `/contact`: `200`, ETag `W/"f4580274a7c93a31839c49d65b89cbcf"`, contains `Fastest useful request`, `Fleet size and vessel types in scope`, `Forwardable review route`.
- Live preview image `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png`: `200`, `Content-Type: image/png`, `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`, `121623` bytes, dimensions `1200x630`.
- Twitterbot-style root fetch received the current preview image URL and no old `certamaris-og.jpg` reference.

## External Cache Note

Apple/iMessage and other preview clients can retain their own URL-level preview cache independently after production changes. The production source is corrected for fresh crawls and continues to serve the current versioned social preview image.

## Status

RESOLVED.
