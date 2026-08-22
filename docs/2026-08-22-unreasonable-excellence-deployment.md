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

Pending until PR merge and production deployment:

- Commit SHA: pending
- PR: pending
- GitHub Actions run: pending
- Cloudflare deployment: pending
- Production ETag: pending

## Production Verification

Pending until production deploy:

- `https://certamaris.com`
- `https://www.certamaris.com`
- Key improved routes: `/pricing`, `/trust`, `/trust/procurement`, `/contact`
- Root metadata and social preview image
- Buyer diligence links and generated HTML
- Desktop/mobile production screenshots

## Status

Local validation complete; production deployment pending.
