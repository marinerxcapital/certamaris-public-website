# Full-site second polish LIVE - 2026-11-09

**Production:** https://certamaris.com - Cloudflare Worker `certamaris-site`
version `6f5e4be4-d9d6-481b-a2ac-88f57bde4fe5` @100%
**Previous version:** `f4047440-be48-4d22-80f1-0d1a0bc1c1b6`
**Branch:** `codex/assurance-helix-hero-20260926`
**Code commit:** `7f1fe6f`
**Deployment:** direct local Wrangler deployment; GitHub Actions was not used

## Scope

This pass improved the public marketing site's route-family composition and
performance QA without changing routes, pricing, legal wording, contact
delivery contracts, authenticated app behavior, or product-data truth.

## Shipped

- Added `components/PageHeroSignal.tsx`, a reusable factual hero rail for
  route-family context and next actions.
- Added route-specific hero signals to Solutions, Security, Resources, FAQ,
  Compliance, Trust, and Contact pages using existing counts, labels, and
  boundaries only.
- Reduced excessive interior hero height and aligned hero side content to the
  visual center.
- Raised contact intent links and solution jump links to the 44px target-size
  contract.
- Changed hero video preload from `auto` to `metadata` so the poster can carry
  first paint while playback remains available after hydration.
- Preserved the current live ship/video direction after source/live
  reconciliation; no historical hero deletion or reintroduction was performed.
- Repaired `scripts/qa/lighthouse-performance.mjs` so Windows invokes
  `npx.cmd`, removes stale per-run JSON, records process failures, supports
  seven representative routes, and cannot report stale artifacts as passing.

## Validation

- `npm run typecheck` — PASS.
- `npm run build:static` — PASS; 111 routes.
- `npm run qa` — PASS; 0 failed steps.
- `npm run qa:responsive-a11y` — PASS; 19 routes × 9 viewports, 0 issues,
  0 broken images.
- `npm run qa:ux-audit` — PASS; 25 routes, 5 features, 0 failures.
- `npm run qa:lightbox` — PASS locally and live.
- Local full visual matrix — PASS; 95 routes, 340 observations, 0 failures.
- Wrangler dry run — PASS.
- Live route audit — PASS; 103/103 routes.
- Live product-image audit — PASS; zero unloaded images across demo, platform,
  compliance, security, solutions, and resources.
- Live full visual matrix — PASS; 95 routes, 340 observations, 0 failures.
- Fresh Lighthouse run — PASS with truthful process status 0 for all seven
  routes. Current results:

| Route | Score | LCP | TBT | CLS |
|---|---:|---:|---:|---:|
| `/` | 77 | 3,824 ms | 428 ms | 0 |
| `/platform` | 63 | 4,166 ms | 734 ms | 0 |
| `/security` | 94 | 1,415 ms | 263 ms | 0 |
| `/pricing` | 77 | 2,337 ms | 627 ms | 0 |
| `/resources` | 90 | 1,384 ms | 380 ms | 0 |
| `/contact` | 91 | 1,132 ms | 365 ms | 0 |
| `/demo` | 83 | 1,531 ms | 670 ms | 0.0341 |

Fresh Lighthouse evidence:
`artifacts/lighthouse/polish-live-20261109/summary.json`.

## Live readback

- `/`, `/platform`, `/security`, `/resources`, `/solutions`, `/compliance`,
  and `/demo` returned HTTP 200.
- Live response retained CSP, HSTS preload, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, and canonical metadata.
- Wrangler version `6f5e4be4-d9d6-481b-a2ac-88f57bde4fe5` read back from the
  provider with the expected ASSETS, KV, and rate-limit bindings.

## Residuals

- Platform and homepage LCP/TBT remain the next performance focus; the current
  values are fresh and truthful, but not a final performance target.
- Chrome DevTools performance-trace MCP was unavailable in this session, so
  trace-level LCP breakdown and network dependency graphs were not claimed.
- Pre-existing generated SEO working-tree edits remain uncommitted and were
  preserved: `docs/seo/INTERNAL_LINK_MAP.md` and
  `docs/seo/SEO_TECHNICAL_AUDIT.json`.

## Rollback

```powershell
npx wrangler versions deploy f4047440-be48-4d22-80f1-0d1a0bc1c1b6@100% --config wrangler.jsonc -y
```

**Status:** PRODUCTION DEPLOYED AND LIVE-VERIFIED

**Completed:** Codex / 2026-11-09 18:40 UTC
