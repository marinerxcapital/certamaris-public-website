# 2026-08-24 UX and Accessibility Audit Fix Deployment

## Scope

Implemented the eight-priority UX/accessibility audit pass from the 2026-08-24 CertaMaris screenshot review without adding customer, certification, regulatory approval, integration, telemetry, or guarantee claims.

## Fixes Shipped

| Priority | Status | Detail |
|---|---|---|
| 1. CSP blocked inline-style product exhibits | Resolved | `Reveal`/`RevealGroup` now use class toggles instead of Framer inline motion styles. Product exhibit screenshots render as the independent base layer, with SVG annotation pins as a separate overlay. `EvidenceChain` no longer depends on inline scroll-motion transforms. |
| 2. Sticky header overlap | Resolved | Added sitewide `scroll-padding-top` and `scroll-margin-top` for anchors and QA/programmatic targets, including `[id]` and `[data-qa]`. Live checks passed for `/platform/evidence`, `/demo?stage=CAP#chain-inspector`, `/resources`, and `/security`. |
| 3. Platform maturity label contradiction | Resolved | Removed uniform module status chips from `/platform` and linked buyers to `/security` and `/trust/procurement` for maturity/configuration/NDA status context. |
| 4. Undocumented demo codes | Resolved | Removed `FLT` and `VSL` from the demo scrub rail; the tour now stays inside the canonical REQ, CTL, EVD, FND, RSK, CAP, QA, PKG subset. |
| 5. Homepage lifecycle selected state | Resolved | Lifecycle buttons now share a single clamped state update path for hover, focus, click, and keyboard navigation. PKG state is covered by browser QA. |
| 6. Repeated diligence boilerplate | Resolved | Full buyer diligence packet remains on `/trust`; `/pricing` and `/contact` now use shorter Trust Center/procurement pointers. |
| 7. Persona template pattern | Resolved | All eight `/who-we-serve/*` pages now include role-specific sample artifact modules in addition to the existing record-path section. |
| 8. Stale sample dates | Resolved | `lib/sample-record.ts` sample dates now use rolling `Demo day` labels instead of fixed 2026 calendar dates for the chain inspector. |

## QA Added

- `scripts/qa/ux-audit-browser-qa.mjs` / `npm run qa:ux-audit`
  - Captures 21 full-page desktop screenshots at 1440x1100.
  - Captures five focused feature sections.
  - Records HTTP status, console/CSP messages, page errors, overflow state, product-exhibit visibility, anchor offset, and serious/critical axe violations.
- `scripts/qa/lighthouse-performance.mjs` / `npm run qa:lighthouse`
  - Runs Lighthouse performance smoke on `/`, `/security`, and `/pricing`.
  - Records score, LCP, and CLS. CLS over 0.1 fails the check.

## Local Validation

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run test:pricing` | Pass: 12/12 |
| `npm run build:static` | Pass: 110 static pages generated; expected Next static-export header warning remains because production headers are Worker-enforced |
| `npm run qa` | Pass: 0 failed steps |
| `npm run ci:validate` | Pass: production dependency audit found 0 vulnerabilities; typecheck, pricing tests, static build passed |
| `npm run qa:responsive-a11y` | Pass: 16 routes x 9 viewports, `issues=0`, `brokenImages=0` |
| `npm run qa:ux-audit` | Pass: 21 routes, 5 focused feature captures, `failures=0` |
| `npm run qa:lighthouse` | Pass: `/` score 60, LCP 7564 ms, CLS 0; `/security` score 68, LCP 6454 ms, CLS 0; `/pricing` score 64, LCP 6769 ms, CLS 0.0002 |
| `node scripts/qa/check-routes.mjs --base http://127.0.0.1:4173 --include-planned` | Pass: 103 HTTP routes/assets |
| `npx wrangler deploy --config wrangler.jsonc --keep-vars --dry-run` | Pass: 1422 assets read, Worker bundle validated |

## Preview / Staging

- Non-traffic Worker version upload succeeded:
  - Version ID: `cd876a8f-2548-4149-ae87-f2ffe33877bb`
  - Message: `UX audit fix preview 2026-08-24`
- Temporary un-routed preview Worker upload also succeeded:
  - Worker: `certamaris-site-ux-audit-preview`
  - Version ID: `a2606191-048e-449f-afdd-9b621f03c2d5`
- Browser-verifiable staging URL was not available because the production Worker configuration has `workers_dev: false`, `preview_urls: false`, and the temporary preview had no deployed targets. Local browser QA was completed before production, and the full browser audit was rerun against live production immediately after deploy.

## Production Deployment

| Item | Value |
|---|---|
| Repository | `marinerxcapital/certamaris-public-website` |
| Branch | `main` |
| Commit | `46f03705d05cc22168f8f68424b8841ecf47ef03` |
| GitHub Actions run | `32808497558` |
| Validate job | `97683211841`, success |
| Deploy job | `97683361549`, success |
| Cloudflare Worker | `certamaris-site` |
| Cloudflare deployment | `d6b71100-fcb6-44a6-9d97-d7498cd0d069` |
| Cloudflare Worker version | `e7253dff-1989-4d63-bc20-c847c38b828d` at 100% |
| Production domain | `https://certamaris.com` |

## Production Verification

| Check | Result |
|---|---|
| `HEAD https://certamaris.com/platform` | 200, strict CSP present, HTML cache policy present |
| `npm run qa:ux-audit -- --base=https://certamaris.com` | Pass: 21 routes, 5 feature captures, `failures=0` |
| Live CSP/browser console | Pass: `CSP_MESSAGES=0`, `ROUTE_PAGE_ERRORS=0` |
| Live overflow | Pass: `OVERFLOW_ROUTES=0`, `OVERFLOW_FEATURES=0` |
| Live axe | Pass: `AXE_VIOLATIONS=0` serious/critical |
| Live product exhibits | Pass: `/platform`, `/security`, and `/resources` product-exhibit groups visibly loaded with underlying screenshots |
| Live header offset | Pass: `/platform/evidence`, `/demo?stage=CAP#chain-inspector`, `/resources`, `/security` |
| Live route crawl | Pass: 103 production routes/assets returned 200 |
| Live sitemap crawl | Pass: 94 sitemap URLs returned successful responses |

## Artifact Pointers

Ignored local QA artifacts from this run:

- `artifacts/qa-final-predeploy-20260824.log`
- `artifacts/ci-validate-post-rebase-20260824.log`
- `artifacts/ux-audit-post-rebase-20260824.log`
- `artifacts/ux-audit-browser-production-20260824.log`
- `artifacts/routes-production-20260824.log`
- `artifacts/sitemap-production-crawl-20260824.json`
- `artifacts/lighthouse/summary.json`
- `qa-artifacts/ux-audit-local-2026-08-25T04-17-05-415Z/`
- `qa-artifacts/ux-audit-remote-2026-08-25T04-21-34-922Z/`

## Remaining Notes

- The accessible staging browser URL requested by the audit was not available from current Worker configuration. This is pre-existing deployment topology, not a product regression.
- Lighthouse local synthetic scores remain moderate on the three longest pages, but CLS is stable and no audit failure was introduced. Future performance work should focus on LCP reduction for the homepage, security, and pricing routes.
- Contact forwarding remains owner-configured and fail-closed; this pass did not alter contact-delivery secrets or claim delivery is configured.

## Status

Resolved and live-verified on `https://certamaris.com`.
