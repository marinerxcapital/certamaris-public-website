# Public Site — Delivery Verification + Typography System

Date: 2026-08-12

Repository: `marinerxcapital/certamaris-public-website`

Branch: `codex/public-site-polish-20260812`

## Contact delivery verification (resolved — not configured)

Verified against the live Cloudflare Worker `certamaris-site` via the Cloudflare
API (`workers/scripts/{name}/settings`) and `wrangler secret list`:

- Bindings present: `ASSETS`, `CONTACT_GLOBAL_RATE_LIMITER`,
  `CONTACT_IDEMPOTENCY` (KV), `CONTACT_RATE_LIMITER`.
- **No `send_email` binding** (`CONTACT_EMAIL`).
- **No plain-text vars** (`CONTACT_FORWARD_ENDPOINT`).
- **No secrets** (`wrangler secret list` returned `[]`; no
  `CONTACT_FORWARD_SECRET`).
- Email Routing on `certamaris.com` zone is `enabled: false` / `unconfigured`,
  with no destination addresses and only a disabled catch-all drop rule.

Conclusion: every `POST /api/contact` submission reaches `deliverContact` and
throws `DeliveryUnavailableError` ("No approved delivery provider is
configured"), returning 503 with the direct-email fallback. The worker code and
anti-abuse controls are correct; delivery is simply not wired.

### Exact owner action to enable delivery

Choose one path:

1. **Native Cloudflare Email Workers** (zero-cost, recommended):
   - Enable Email Routing on the `certamaris.com` zone.
   - Add and verify a destination mailbox (e.g. `sales@certamaris.com`).
   - Add a `send_email` binding named `CONTACT_EMAIL` plus
     `CONTACT_EMAIL_FROM` / `CONTACT_EMAIL_TO` (vars) to `wrangler.jsonc`.
2. **Signed forwarder**:
   - Set `CONTACT_FORWARD_ENDPOINT` (var) and `CONTACT_FORWARD_SECRET`
     (secret) to an approved email-forwarding endpoint.

Until then the contact page copy is kept truthful: it presents the form and the
direct email address as parallel options without claiming active delivery
routing.

## Typography system (hero + scale normalization)

- Added a semantic type scale to `app/globals.css`:
  `.hero-display`, `.page-h1` (+ `--elevated`), `.section-h2` (+ `--lg`),
  `.card-h3`. Each uses responsive `clamp()` consistent with the existing
  `h1`–`h4` defaults.
- Migrated `PageHero` (subpage H1 choke point) and the homepage hero H1 to the
  new roles.
- Migrated the single largest section-heading drift
  (`text-[28px] sm:text-[34px] leading-[1.14]`, 25 occurrences across 11
  files) to `.section-h2 section-h2--lg` with zero rendered-value change.
- Added `scripts/qa/responsive-a11y-qa.mjs` (12 key routes × 360/390/768/1440)
  and wired it as `npm run qa:responsive-a11y`.

## Browser QA result

- 0 horizontal overflow (360/390/768/1440).
- 0 broken images.
- 0 serious/critical axe violations (WCAG 2.x A/AA tag set).
- Console "errors" are navigation-abort and `__next.*.txt?_rsc` artifacts; the
  latter are rewritten by the Worker's `rewriteRscRequest` in production.
- `perf-hero.mjs`: frame median 16.7 ms, p95 33.3 ms (smooth Pixel Grid).

## Validation

- `npm run typecheck` PASS
- `npm run build:static` PASS (106 static pages)
- `npm run qa:content` PASS, `npm run qa:links` PASS (8,475 hrefs)
- `npm run qa:seo` PASS (100 pages), `npm run qa:product-proof` PASS
- `npm run qa:responsive-a11y` PASS (0 issues)
