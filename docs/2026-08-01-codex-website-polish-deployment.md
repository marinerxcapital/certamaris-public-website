# CertaMaris website polish — 2026-08-01

Codex completed the four requested website remediation batches in the canonical
`certamaris-public-website` repository and deployed the Worker serving
`https://certamaris.com`.

## Batch commits

- `6eb502f` — global accessibility, contrast, CSP enforcement, contact CTA, and removal of the unused Aidesigner runtime.
- `a7848a7` — valid list semantics, heading hierarchy, and labeled pricing controls.
- `0334dd8`, `63c7582`, `e603be4` — canonical `/industries` handling, NIST URL correction, metadata/title cleanup, and final description-length corrections.
- `c369219` — edge-cacheable HTML (`s-maxage=300`, stale-while-revalidate) for warm-cache performance.

## Validation

- `npm run build:static` — passed (99 static routes generated).
- `npm run qa` — passed with 0 failures: content, route, SEO, internal-link, and founder checks.
- Generated HTML metadata audit — 0 title/description length violations.
- Built header — decorative mark has empty alt; wordmark has the sole `alt="CertaMaris"` accessible name.
- Built pages — no Aidesigner runtime references.
- Production — enforcing `Content-Security-Policy` header present; report-only header absent on fresh requests.
- Production — warm requests to `/solutions`, `/solutions/vessel-cyber-risk-management`, and `/contact` return `CF-Cache-Status: HIT`.
- Production — `/industries` redirects 301 to `/who-we-serve` on a fresh cache key; the prior bare URL cache object expires under the five-minute edge TTL.

## Deployment

- Worker: `certamaris-site`
- Wrangler version: `4.114.0`
- Version ID: `34839bd7-3179-4f07-94e6-45e0b9a23002`
- Repository branch: `main`
