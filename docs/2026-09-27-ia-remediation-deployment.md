# CertaMaris Public Site IA Remediation Deployment — 2026-09-27

## Source

- Repository: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
- Branch: `codex/assurance-helix-hero-20260926`
- Final local commits in this pass:
  - `dd10b0d` Reduce homepage hero actions
  - `d3303b7` Consolidate assurance stepper
  - `0d2459e` Rebuild footer IA
  - `6cb4ec4` Add pricing matrix mobile fallback
  - `b4cc896` Restyle homepage capability grid
  - `4878307` Remove duplicate homepage nav row
  - `97d4b6c` Consolidate homepage trust links
  - `4d1e76e` Reuse pricing package cards on home
  - `d556a83` Collapse detailed pricing comparison
  - `b53411a` Standardize product exhibits
  - `90151fa` Move founder section earlier
  - `0ee533e` Standardize compliance disclaimer
  - `d0e997b` Align public site QA with IA remediation
  - `da9856c` Update UX audit for IA stepper

## Deployment

- Command: `npx wrangler deploy --config wrangler.jsonc --keep-vars`
- Worker: `certamaris-site`
- Current Version ID: `7a735921-c1e0-4245-8ad4-217c34704933`
- Wrangler account: `MarinerX Capital`
- Live domain verified: `https://certamaris.com`

## Local Validation

- `npm run build:static`: passed
- `npm run typecheck`: passed after static build regenerated `.next/types`
- `CHROMIUM_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe" npm run qa`: passed, 0 failed steps
- `CHROMIUM_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe" npm run qa:ux-audit`: passed, 21 routes, 5 feature captures, 0 failures

## Live Validation

Direct live probes returned 200 for:

- `https://certamaris.com/`
- `https://certamaris.com/sitemap`
- `https://certamaris.com/pricing`
- `https://certamaris.com/platform`

Content markers verified live:

- Homepage: abbreviated record stepper and `Forwardable review route`
- `/sitemap`: grouped sitemap heading
- `/pricing`: `Compare packages in detail`
- `/platform`: full assurance stepper

Remote browser UX audit:

- Command: `CHROMIUM_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe" npm run qa:ux-audit -- --base=https://certamaris.com`
- Result: passed, 21 routes, 5 feature captures, 0 failures

## Residual Notes

- Static export still emits the known Next.js warning that `headers` are not applied by `output: export`; the Cloudflare Worker remains responsible for runtime headers.
- `npm run qa` emits Node module-type warnings from Node's TypeScript stripping path; tests pass.
- SEO QA retains expected duplicate-H1 warnings for legacy aliases such as `/privacy`, `/terms`, and trust/legal subprocessor aliases; duplicate-title failure was resolved by making `/privacy` title distinct.
