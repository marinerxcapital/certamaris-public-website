# Public Site Truth Reconciliation — Deployment Record

Date: 2026-08-12

Repository: `marinerxcapital/certamaris-public-website`

Branch: `codex/public-site-polish-20260812`

Starting HEAD: `55d821b67a1216db32f0b7d5afd8b3268181fe12`

Merge HEAD: `90db330fe492aff1e2fafcaecf98913172e53c86`

PR: #3

Production URL: `https://certamaris.com`

## Scope

Truth reconciliation and polish continuation, deployed to production.

## Changes

### Pixel Grid legibility

- `.pixel-grid-background` opacity confirmed at `0.65` (was `0.92` on `main`).
- Updated the stale explanatory comment to reflect the 2026-08-12 legibility intent.
- First-party animation and reduced-motion freeze preserved.

### SSO/SCIM truth reconciliation

- Verified the product has no SAML/OIDC/SCIM implementation (tenant provisioning is
  an operator-runbook action; MFA is contact-based).
- Changed SSO/SCIM from "included"/"available when configured" to "Planned" across:
  - `lib/faq-pricing.ts` (pricing tiers, package tiers, comparison matrix, FAQ answer, recommender)
  - `lib/product-hierarchy.ts` (integrations catalogue)
  - `app/pricing/page.tsx` (`Planned` comparison rendering)
- FAQ JSON-LD automatically reflects the updated answer.

### Contact delivery language

- Removed internal-uncertainty copy ("If delivery is configured... / If delivery is unavailable").
- Rewrote to confident routing copy with a direct-email fallback.
- Updated `.env.example` and `lib/constants.ts` to describe the Cloudflare Worker
  delivery path (removed obsolete Vercel/Netlify references).

## Validation

- `npm run typecheck` PASS
- `npm run build:static` PASS (106 static pages)
- `npm run qa:content` PASS (117 files)
- `npm run qa:links` PASS (8,475 hrefs / 0 broken)
- `npm run qa:seo` PASS (100 pages)
- `npm run qa:product-proof` PASS (17 screens / 4 derivatives)
- `npm run qa:founder` PASS (11/11)
- `npm run test:contact` PASS (7/7)
- `npm run test:worker` PASS (5/5)
- `node scripts/qa/perf-hero.mjs` PASS (frame median 16.7ms, p95 33.3ms)

## Production verification

GitHub Actions run `31633637194` (validate + deploy production Worker) passed.

Verified live at `https://certamaris.com`:

- `/contact` — new routing copy present; old "If delivery is configured" absent.
- `/pricing` — SSO/SCIM renders "Planned".
- `/faq` — SSO/SCIM "planned enterprise identity capabilities" answer present.
- Pixel Grid CSS — `.pixel-grid-background { opacity: .65 }` served.

## Remaining / not addressed

- Footer social/external links — canonical URLs not present in repo; no fabricated hrefs.
- Production contact delivery provider — the Worker implements delivery, but the
  Cloudflare binding/secret configuration must be verified in the Cloudflare dashboard.
- Broader hero/typography/a11y/perf/responsive polish remains for a follow-up sprint.
