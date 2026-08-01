# Public marketing remediation release — 2026-08-01

## Release state

- Repository: `marinerxcapital/certamaris-public-website`
- Source tip: `dee919b681a8c455c45687596f5bb942aaa57a5a`
- Worker: `certamaris-site`
- Active version: `5069d85c-068a-4fff-83ce-7605e02115cc`
- Deployed: `2026-08-01T18:16:24.206Z`
- Domain: `https://certamaris.com`
- Classification: **partially completed / contact delivery blocked**

## Source commits

- `267729d` — harden the contact intake and delivery contract.
- `db16c24` — improve product gallery inspection and optimize brand assets.
- `3553a34` — harden the edge policy and publish live service health.
- `dee919b` — replace internal QA wording and deepen topic content.

## Implemented

- Contact intake now enforces a 32 KiB request ceiling, strict content types and keys, per-field limits, Cloudflare edge rate limits, KV idempotency, HMAC-capable forwarding, redacted structured logs, request IDs, and safe native POST/303 behavior.
- Product gallery triggers have label/name parity; the shared lightbox has original-source loading, fit/100/150/200 zoom, keyboard panning, and an open-original action.
- Homepage/contact contrast, pricing mobile scroll-region accessibility, responsive footer/favicons, and platform/solution prefetch behavior were corrected.
- CSP hashes unavoidable Next scripts, rejects arbitrary inline scripts, and adds `object-src 'none'`, `frame-ancestors 'none'`, and `upgrade-insecure-requests`. `style-src-attr 'unsafe-inline'` remains a documented compatibility exception.
- `/api/status` reports monitor-backed public website, application, and API state. Sitemap dates are deterministic.
- Accessibility and customer-facing editorial copy were updated; twelve topic pages received distinct source-aware operational content.

## Validation

- `npm audit --omit=dev --audit-level=high` — pass, 0 vulnerabilities.
- `npm audit --audit-level=high` — pass, 0 vulnerabilities.
- `npm run typecheck` — pass.
- `npm run build:static` — pass, 102 generated pages.
- `npm run qa` — pass: 12 contact tests, 101 source files, 96 routes, 7,182 internal hrefs, and 11/11 founder checks.
- Worker dry run — pass; bindings include KV `e00eb9f15d7c4da497ccb1dfcb42b912`, source rate limit 5/60 seconds, global rate limit 100/60 seconds, and `ASSETS`.
- Production `/api/status` — 200 with all three components derived from live probes.
- Production controlled contact probe — 503 with request ID `4de9dbd7-36ce-4bdf-95c7-f6100c50d1d0`; no success was shown.

## Blockers and release limitation

No approved CertaMaris contact forwarder, provider credential, CRM intake, or Cloudflare Email Sending capability could be verified. Email Routing is disabled and the active IONOS MX records must not be changed. Therefore valid production submissions fail honestly with 503 and the direct-email fallback; destination receipt for all intents is not proven.

Public controller/operator facts and legal approval are also unavailable in the authoritative owner register. Corporate identity, registration, jurisdiction, address, controller details, and governing-law language were not invented or partially published.

The next release must configure and prove the approved delivery destination, complete approved legal copy, run the full 97-route/open-state accessibility and three-run Lighthouse suite, and record destination receipt plus legal approval.
