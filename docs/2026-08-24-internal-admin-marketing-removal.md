# 2026-08-24 Internal Admin Marketing Removal

**Status:** RESOLVED.  
**Production site:** https://certamaris.com  
**Worker:** `certamaris-site`  
**Repo:** `marinerxcapital/certamaris-public-website`

## Problem Statement

The public marketing site must not advertise the Internal CertaMaris Admin Dashboard, Corporate Control Plane, employee-only administration, internal support access, or internal operations tooling as client-facing buyer value.

## Root Cause

Earlier public product-proof content reused sanitized internal admin-dashboard framing. That introduced a public platform module, navigation references, and screenshot assets for Corporate Control Plane / Dashboard V2 material even though those surfaces are internal CertaMaris employee tooling, not a customer product.

## Files Changed

- `lib/constants.ts`
- `lib/product-hierarchy.ts`
- `lib/product-screens.ts`
- `components/DemoTourGallery.tsx`
- `app/platform/page.tsx`
- `app/demo/page.tsx`
- `app/trust/ai-policy/page.tsx`
- `app/contact/page.tsx`
- `lib/demo-scrub.ts`
- `lib/security-trust.ts`
- `lib/trust-corporate.ts`
- `lib/solutions-audience.ts`
- `lib/faq-pricing.ts`
- `lib/legal-documents.ts`
- `worker/index.ts`
- `scripts/qa/expected-routes.mjs`
- `scripts/qa/check-product-proof-render.mjs`
- `scripts/qa/check-public-product-boundary.mjs`
- `scripts/qa/run-all.mjs`
- `package.json`
- Deleted `public/product/dashboard-v2/corporate-control-plane.png`
- Deleted `public/product/dashboard-v2/optimized/corporate-control-plane-1440.webp`
- Deleted `public/product/dashboard-v2/optimized/corporate-control-plane-960.webp`
- Deleted `public/product/dashboard-v2/optimized/corporate-control-plane-640.webp`
- Deleted `public/product/dashboard-v2/optimized/corporate-control-plane-384.webp`

## Implementation

- Removed `/platform/corporate-control-plane` from generated public product modules.
- Removed Corporate Control Plane from product navigation and footer product links.
- Added a production Worker redirect from `/platform/corporate-control-plane` to `/platform/client-company-portal`.
- Removed internal-admin screenshot assets from active public paths.
- Reframed public product proof around client company/fleet/vessel workflows.
- Reworded demo, trust, contact, AI-policy, and legal/DPA text so internal assistance is not presented as product access.
- Preserved current OG/social metadata path: `/og/certamaris-link-preview-2026-08-v2.png`.
- Preserved contact fallback truth and no-certification/no-guarantee language.

## Tests And Evidence

Local checks passed:

- `npm run typecheck`
- `npm run build:static`
- `npm run build`
- `npm run qa`
- `npm run qa:responsive-a11y`
- `npm run qa:link-preview`
- `npm run qa:buyer-paths`
- `npm run qa:excellence`
- `npm run qa:public-product-boundary`
- `npm run test:worker`

New guard:

- `scripts/qa/check-public-product-boundary.mjs`
- npm script: `qa:public-product-boundary`
- Included in `npm run qa`

Screenshot evidence:

- `docs/implementation/remove-internal-admin-marketing-20260823/screenshots/baseline/`
- `docs/implementation/remove-internal-admin-marketing-20260823/screenshots/after/`

Generated source evidence:

- Bounded `out/` HTML/XML grep for forbidden phrases returned no hits.
- `npm run qa:public-product-boundary` passed with 105 generated HTML/XML files inspected.

## Deployment

| Item | Value |
|---|---|
| PR | #16 |
| Implementation commit | `55b969d` |
| Merge commit | `5bc636f3bfa1cd121370bdfe45ae395f18771a3b` |
| PR merged | 2026-08-24T04:13:19Z |
| GitHub Actions run | `32689192150` |
| Validate job | `97319662825` |
| Deploy job | `97319790456` |
| Cloudflare Worker version | `cebd0500-53d5-4ee3-9e75-5c13b8479950` |
| Deployment result | Success |

## Production Verification

Completed 2026-08-24T04:15Z.

| Check | Result |
|---|---|
| `curl -I -L https://certamaris.com/` | `200 OK`, `Content-Type: text/html`, `CF-Cache-Status: HIT`, ETag `"e8c1921b620c1206bd851f2dcaf96512"` |
| `curl -I -L https://www.certamaris.com/` | `301` to `https://certamaris.com/`, then `200 OK` |
| `curl -I -L https://certamaris.com/platform/corporate-control-plane` | `301` to `https://certamaris.com/platform/client-company-portal`, then `200 OK` |
| Live route source scan | `/`, `/platform`, `/demo`, `/pricing`, `/trust`, `/trust/procurement`, and `/contact` clean for forbidden internal-admin phrases |
| Crawler-style source scan | Same routes clean with `facebookexternalhit/1.1` user agent |
| Root metadata | Canonical `https://certamaris.com`; `og:image` and `twitter:image` both `https://certamaris.com/og/certamaris-link-preview-2026-08-v2.png` |
| Preview image | `200 OK`, `Content-Type: image/png`, `121623` bytes, `1200x630` |
| Production screenshots | `docs/implementation/remove-internal-admin-marketing-20260823/screenshots/production/` |

## Residual Risks

- Historical implementation docs may still mention prior internal-admin terminology as history. They are not active production marketing copy.
- Third-party caches may retain old page snapshots independently, but the production HTML source will be verified after deployment.

## Final Status

RESOLVED.
