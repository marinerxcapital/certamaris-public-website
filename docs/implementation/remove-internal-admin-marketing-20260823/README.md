# Remove internal admin marketing from public website

**Status:** Pre-deployment validation complete; production verification pending PR/merge/deploy.  
**Date:** 2026-08-24  
**Repo:** `marinerxcapital/certamaris-public-website`  
**Branch:** `codex/remove-internal-admin-marketing-20260823`  
**Worker:** `certamaris-site`

## Problem

The public marketing website presented internal CertaMaris employee-only administration concepts as buyer-facing product proof. In particular, active public navigation, platform content, demo copy, and screenshot metadata referenced the Internal Admin / Corporate Control Plane / Dashboard V2 lineage as if it were a customer module.

The buyer-facing product story must stay limited to client company, fleet, vessel, evidence, findings, corrective action, cybersecurity plan, readiness package, trust, procurement, legal, and contact surfaces.

## Root Cause

The product proof and platform hierarchy content reused sanitized internal admin-dashboard material from an earlier product-experience pass. That content was added to public IA without enough boundary separation between:

- Customer-usable client company / fleet / vessel workflows.
- Internal CertaMaris employee-only administration and operating tooling.

## Active Public References Found

| Area | Reference | Resolution |
|---|---|---|
| `lib/constants.ts` | Product nav/footer linked `Corporate Control Plane` to `/platform/corporate-control-plane` | Removed from product nav; footer product link now uses `Client Company Portal` |
| `lib/product-hierarchy.ts` | `CertaMaris Corporate Administration` hierarchy level and `corporate-control-plane` module | Removed public module and route generation |
| `public/product/dashboard-v2/corporate-control-plane.png` | Internal admin screenshot asset | Deleted from active public asset tree |
| `public/product/dashboard-v2/optimized/corporate-control-plane-*.webp` | Responsive derivatives of internal screenshot | Deleted from active public asset tree |
| `components/DemoTourGallery.tsx` | `Corporate control plane` tab and `corporate oversight` copy | Reframed as client-facing fleet governance/company oversight |
| `app/platform/page.tsx` | Platform headline began with corporate administration | Reframed to company/fleet -> vessel -> controlled work objects |
| `app/demo/page.tsx`, `lib/demo-scrub.ts`, `lib/product-screens.ts` | Public copy/alt text used `Dashboard V2` framing | Reframed to product proof/client-facing screenshot labels |
| `scripts/qa/expected-routes.mjs` | Expected `/platform/corporate-control-plane` | Removed expected route |
| `worker/index.ts` | Removed route had no explicit production redirect | Added 301 redirect to `/platform/client-company-portal` |
| Trust/contact/policy copy | Phrases like `support access`, `internal owner`, and `internal administrative summaries` | Reworded to operational assistance / CertaMaris contact language |

Historical docs may retain prior terms when they are clearly implementation history and not active production copy.

## Implementation Summary

- Removed the client-facing `/platform/corporate-control-plane` module from generated platform routes.
- Removed the corporate control plane product navigation/footer entry.
- Deleted active public internal-admin screenshot assets and optimized derivatives.
- Preserved client-facing product proof screens for vessel, evidence, findings, cybersecurity plans, reports/readiness, fleet governance, and related workflows.
- Reframed demo and platform language around client company/fleet/vessel assurance workflow.
- Added Worker redirect from `/platform/corporate-control-plane` to `/platform/client-company-portal`.
- Preserved Open Graph/social preview path: `/og/certamaris-link-preview-2026-08-v2.png`.
- Preserved truthful contact fallback behavior.

## Regression Guard

Added `scripts/qa/check-public-product-boundary.mjs` and `npm run qa:public-product-boundary`.

The guard inspects generated `out/` HTML/XML and asserts:

- No forbidden public phrases ship in production HTML.
- Removed internal-admin route is not generated.
- Removed internal screenshot paths are not referenced.
- Root still has one `og:image`, one `twitter:image`, and the versioned OG path.
- Client-facing product and buyer-path snippets remain present.

The guard is included in `npm run qa`.

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
- `screenshots/baseline/09-platform-mobile.png`
- `screenshots/baseline/10-mobile-menu.png`

After screenshots:

- `screenshots/after/01-home-desktop.png`
- `screenshots/after/02-platform-desktop.png`
- `screenshots/after/03-demo-desktop.png`
- `screenshots/after/04-pricing-desktop.png`
- `screenshots/after/05-trust-desktop.png`
- `screenshots/after/06-procurement-desktop.png`
- `screenshots/after/07-contact-desktop.png`
- `screenshots/after/08-home-mobile.png`
- `screenshots/after/09-platform-mobile.png`
- `screenshots/after/10-mobile-menu.png`

Production screenshots will be added after deployment.

## Local Validation

Passed locally on 2026-08-24:

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
- Bounded generated HTML/XML grep for forbidden phrases returned no hits.

Known non-blocking warnings:

- Node module type warning for stripped TypeScript test files.
- Next static export warning that custom headers are not applied in `output: export`; production Worker handles headers.
- Existing SEO duplicate-title/H1 warnings for expected legacy/canonical pairs.
- `qa:responsive-a11y` reports console-error counts but final `issues=0`, `brokenImages=0`.

## Deployment Tracking

| Item | Value |
|---|---|
| PR | Pending |
| Commit | Pending |
| GitHub Actions validate run/job | Pending |
| GitHub Actions deploy run/job | Pending |
| Cloudflare Worker version | Pending |
| Live verification | Pending |

## Final Status

Pending production deployment and live verification.
