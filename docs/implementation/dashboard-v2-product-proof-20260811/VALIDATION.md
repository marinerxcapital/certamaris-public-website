# Validation

This document records the final local validation for the Dashboard V2 public product-proof migration.

## Completed

| Command | Result | Notes |
|---|---|---|
| `npm ci` | PASS | Clean install from `package-lock.json`. Full dev audit still reports dev-only advisories; the repository production gate is clean. |
| `npm audit --omit=dev --audit-level=high` | PASS | Zero production vulnerabilities after pinning `nanoid@3.3.17` via `overrides`. |
| `npm run ci:validate` | PASS | Runs production audit, TypeScript, and `STATIC_EXPORT=true next build`; generated 106 static pages. |
| `npm run qa` | PASS | 12 contact/Worker tests, content QA, product-proof integrity, route QA, SEO QA, link QA, and founder asset QA all passed. |
| `npm run qa:product-proof` | PASS | 17 registry screens and 4 derivatives per screen validated. |
| `npm run qa:product-proof:render` | PASS | 31 proof-bearing routes checked at 390, 430, 768, 1024, 1280, 1440, and 1536 widths; zero horizontal overflow; all detected product proof used `/product/dashboard-v2/`. |
| `node scripts/qa/check-demo-images.mjs / /platform /demo ...` | PASS | 30 proof-bearing public routes loaded all product images successfully; 0 not-loaded images. |
| `node scripts/qa/audit-crawl.mjs dashboard-v2-proof-after --no-shots` | PASS | 91 sitemap routes; desktop axe violations 0; desktop/mobile console errors 0; desktop/mobile horizontal overflow 0. |
| `rg -n "/product/clean/\|/product/updated/\|/product/optimized/" -g "!node_modules" -g "!.next" -g "!out" -g "!docs" -g "!scripts/qa/check-product-proof*.mjs"` | PASS | Zero active-runtime-source stale path references. QA scripts intentionally contain banned strings as negative assertions. |
| `rg -n --fixed-strings "/product/clean/" out -g "*.html"` | PASS | Zero generated HTML references. |
| `rg -n --fixed-strings "/product/updated/" out -g "*.html"` | PASS | Zero generated HTML references. |
| `rg -n --fixed-strings "/product/optimized/" out -g "*.html"` | PASS | Zero generated HTML references. |

## Notes

- Historical docs and this evidence package intentionally mention old paths as before-state provenance.
- Production deployment and live verification remain pending until the branch is pushed, merged, and deployed by the canonical GitHub Actions / Cloudflare Worker workflow.
