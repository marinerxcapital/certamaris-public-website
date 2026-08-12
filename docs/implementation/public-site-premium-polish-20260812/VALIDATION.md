# Validation

## Commands

| Command | Result | Notes |
|---|---:|---|
| `npm audit --omit=dev --audit-level=high` | PASS | `found 0 vulnerabilities` |
| `npm run typecheck` | PASS | Final standalone run passed. One earlier parallel run raced `.next/types` during build and was discarded. |
| `npm run build:static` | PASS | Static generation completed `106/106` pages. |
| `npm run qa` | PASS | 0 failed steps. |
| `npm run qa:product-proof` | PASS | 17 registry screens, 4 derivatives each. |
| `$env:CHROMIUM_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; npm run qa:product-proof:render` | PASS | 31 proof routes across 7 viewports. |
| `$env:CHROMIUM_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; node scripts/qa/audit-crawl.mjs premium-polish-after-last-change --no-shots` | PASS | 91 routes; 0 axe violations; 0 horizontal overflow; 0 console errors. |
| `npm run qa:seo` | PASS | 100 pages scanned. Expected duplicate alias warnings only. |
| `npm run qa:links` | PASS | 7,727 internal hrefs resolved. |
| `$env:CHROMIUM_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; node scripts/qa/perf-hero.mjs` | PASS | Performance smoke completed; no Lighthouse values claimed. |

## Stale Product-Proof Search

Command:

```powershell
rg -n "/product/(clean|updated|optimized)|border-line|Dashboard V1|pre-Dashboard|updated/optimized|product/clean" app components lib public scripts docs -g "*.tsx" -g "*.ts" -g "*.css" -g "*.md" -g "*.html"
```

Result:

- Active runtime source: no stale product-proof references.
- Historical docs intentionally contain prior migration references.
- `border-line`: no active source references after `/industries` fix.

## Build Warnings

`npm run build:static` reports existing Next.js warnings that `headers` are not applied by `output: export`. This warning predates the polish work and is related to static export architecture, not these visual changes.

