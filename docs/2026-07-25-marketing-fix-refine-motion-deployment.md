# CertaMaris Marketing Fix, Refine, Motion Deployment Record

## Superseding addendum - 2026-07-25 17:05 PT

Status: ready, with one CI secret follow-up.

The missing `hero-flow-1920.webp`, `hero-flow-1280.webp`, and `hero-flow-800.webp` assets were supplied and the remaining Vanta FOG background task is complete. The deployed source tree is now initialized as the authoritative GitHub repository `marinerxcapital/certamaris-public-website` on branch `main`; GitHub Actions CI/deploy is wired in `.github/workflows/ci-deploy.yml`.

Current production deployment:

- Cloudflare Worker `certamaris-site`
- Final Worker version `b8ec7f7e-2013-441f-98fa-2d1ca0a4e0ac`
- Domains verified: `https://certamaris.com` and `https://www.certamaris.com`

Additional completed work:

- Added `/public/bg/hero-flow-1920.webp`, `/public/bg/hero-flow-1280.webp`, and `/public/bg/hero-flow-800.webp`.
- Added root-mounted `components/SiteBackground.tsx` with supplied image layer plus `VANTA.FOG`.
- Pinned `vanta@0.5.24`, `three@0.134.0`, and `@types/three@0.134.0`.
- Added `types/vanta.d.ts`.
- Pinned `wrangler@4.114.0` as a dev dependency so GitHub Actions uses the repository CLI instead of fetching an unpinned latest Wrangler release.
- Strengthened hero-copy scrim and darkened the hero eyebrow context to preserve contrast over the rendered composite.
- Disabled the Vanta canvas under `prefers-reduced-motion: reduce`, below 768px, and when the document is hidden.
- Added `/bg/*` to the Cloudflare Worker stable-asset cache classification.
- Patched production dependencies: `next@16.2.12`, `postcss@8.5.23`, and npm overrides for `postcss@8.5.23` and `sharp@0.35.3`.
- Kept `wrangler.jsonc` compatibility date at `2026-07-08`, which passed startup analysis with pinned `wrangler@4.114.0`.
- Added `.github/workflows/ci-deploy.yml`.
- Set GitHub repository secret `CLOUDFLARE_ACCOUNT_ID`.

Final verification:

- `npm.cmd audit --omit=dev --audit-level=high`: PASS, 0 vulnerabilities.
- `npm.cmd run typecheck`: PASS.
- `npm.cmd run build:static`: PASS.
- `npm.cmd run build`: PASS.
- `wrangler.cmd check startup --config wrangler.jsonc`: PASS.
- `wrangler.cmd deploy --config wrangler.jsonc --dry-run --keep-vars`: PASS.
- `wrangler.cmd deploy --config wrangler.jsonc --keep-vars`: PASS.
- Live 20-route crawl: PASS.
- RSC prefetch samples: PASS.
- `/bg/hero-flow-1920.webp`, `/bg/hero-flow-1280.webp`, `/bg/hero-flow-800.webp`: 200, stable cache, security headers.
- Browser Vanta check: exactly one canvas on desktop, one canvas after client-side navigation, zero canvas under reduced motion, zero canvas on mobile.
- Browser console during Vanta check: zero warnings/errors.
- Hero text-zone rendered screenshot with text hidden: darkest sampled RGB `224,228,230`; H1 contrast 11.36; body contrast 5.66; eyebrow contrast 5.17.

Final Lighthouse samples:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| `/` with Vanta | 98 | 100 | 100 | 100 |
| `/platform` with Vanta | 92 | 100 | 100 | 100 |
| `/resources/imo-msc-428-98-explained` with Vanta | 96 | 100 | 100 | 100 |

Remaining follow-up:

- Add a scoped Cloudflare API token to GitHub repository secret `CLOUDFLARE_API_TOKEN`, then run the `CI and Production Deploy` workflow from GitHub. Do not copy the local Wrangler OAuth credential into GitHub secrets.

Date: 2026-07-25
Source path: `C:\certamaris-startup-site-pnpm\certamaris-startup-site`
Production domains verified: `https://certamaris.com`, `https://www.certamaris.com`
Cloudflare Worker: `certamaris-site`
Final deployed Worker version: `cb153ca2-e5e4-49f0-9446-3be1699655fa`

## Historical deployment record before WebP source-control follow-up

## Executive status

Historical status before the missing WebP assets were supplied: conditionally ready.

Most of the attached implementation specification was completed and deployed to production. The production site now has Worker-level cache headers, security headers, static-export RSC prefetch rewrites, optimized WebP product and brand assets, stronger reduced-motion handling, improved contrast tokens, improved article structure, FAQ and article schema, breadcrumbs, canonical metadata, and a clean future app-integration boundary.

The earlier Git/Vanta blockers were resolved by the superseding addendum above. The remaining blocker is only GitHub-origin deploy until `CLOUDFLARE_API_TOKEN` is added to repository secrets.

## Completed tasks

- Added Cloudflare Worker security headers:
  - `Strict-Transport-Security`
  - `Content-Security-Policy-Report-Only`
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `X-Frame-Options`
- Added production cache rules:
  - `/_next/static/*`: `public, max-age=31536000, immutable`
  - `/brand/*`, `/product/*`, `/video/*`, `/og/*`, favicon assets: `public, max-age=604800, stale-while-revalidate=86400`
  - HTML: `public, max-age=0, must-revalidate`
  - `/api/contact`: `no-store`
- Changed `wrangler.jsonc` to run the Worker before static assets so headers, redirects, RSC rewrites, and API handling apply consistently.
- Added canonical redirect from `www.certamaris.com` to `certamaris.com`.
- Added Worker rewrite for static-export RSC prefetch URLs such as `/platform/__next.platform.__PAGE__.txt?_rsc=...`.
- Added matching Node/Next header config for non-static-export deployments, while production remains Worker-enforced.
- Generated optimized WebP product image variants at 384, 640, and 960 widths.
- Generated optimized WebP brand logo assets for the mark and wordmark.
- Updated `ProductScreens` to use responsive `<picture>` sources and explicit image dimensions.
- Updated `BrandLogo` to use optimized brand assets while preserving the existing animated mark and reduced-motion behavior.
- Added stronger global reduced-motion behavior, including stopping animation/transition transforms and hiding the hero video for reduced-motion users.
- Improved contrast for structural text, ocean links, primary CTAs, contact submit buttons, and footer secondary text.
- Added shared `ReferenceLabel` usage for consistent section/card labels.
- Added resource article dates, H2 sections, read-time/date display, and related reading links.
- Added FAQPage JSON-LD.
- Added TechArticle and BreadcrumbList JSON-LD on resource article pages.
- Added Twitter metadata and improved OG title/image defaults.
- Added homepage canonical metadata.
- Removed contact-submission PII from fallback server logs in both the Worker and Next API route.
- Removed ignored temporary local files:
  - `server.err.log`
  - `server.out.log`
  - `tsconfig.tsbuildinfo`

## Files changed

- `worker/index.ts`
- `wrangler.jsonc`
- `next.config.ts`
- `app/layout.tsx`
- `app/faq/page.tsx`
- `app/resources/[slug]/page.tsx`
- `app/api/contact/route.ts`
- `lib/metadata.ts`
- `lib/resources.ts`
- `components/Section.tsx`
- `components/ArticleCard.tsx`
- `components/CapabilityCard.tsx`
- `components/ProductScreens.tsx`
- `components/BrandLogo.tsx`
- `components/Button.tsx`
- `components/ContactForm.tsx`
- `components/Footer.tsx`
- `app/globals.css`
- `tailwind.config.ts`

## Assets created

- `public/brand/optimized/certamaris-mark-64.webp`
- `public/brand/optimized/certamaris-wordmark-284.webp`
- `public/product/optimized/requirement-control-mapping-384.webp`
- `public/product/optimized/requirement-control-mapping-640.webp`
- `public/product/optimized/requirement-control-mapping-960.webp`
- `public/product/optimized/evidence-coverage-384.webp`
- `public/product/optimized/evidence-coverage-640.webp`
- `public/product/optimized/evidence-coverage-960.webp`
- `public/product/optimized/executive-dashboard-384.webp`
- `public/product/optimized/executive-dashboard-640.webp`
- `public/product/optimized/executive-dashboard-960.webp`
- `public/product/optimized/findings-register-384.webp`
- `public/product/optimized/findings-register-640.webp`
- `public/product/optimized/findings-register-960.webp`
- `public/product/optimized/executive-reporting-384.webp`
- `public/product/optimized/executive-reporting-640.webp`
- `public/product/optimized/executive-reporting-960.webp`
- `public/product/optimized/fleet-inventory-384.webp`
- `public/product/optimized/fleet-inventory-640.webp`
- `public/product/optimized/fleet-inventory-960.webp`
- `public/product/optimized/corrective-actions-384.webp`
- `public/product/optimized/corrective-actions-640.webp`
- `public/product/optimized/corrective-actions-960.webp`

Original source assets were preserved.

## Verification evidence

Commands run:

- `npm.cmd run typecheck`: PASS.
- `npm.cmd run build:static`: PASS. Expected Next static-export warnings remained because production headers are Worker-enforced.
- `npm.cmd run build`: PASS.
- `wrangler.cmd deploy --config wrangler.jsonc --keep-vars`: PASS, final version `cb153ca2-e5e4-49f0-9446-3be1699655fa`.
- `wrangler.cmd deploy --config wrangler.jsonc --dry-run --keep-vars`: PASS during predeployment verification.
- `npx.cmd lighthouse ... --output=json`: reports generated under `artifacts/lighthouse/`. Lighthouse produced JSON reports but sometimes exited non-zero on Windows temp-profile cleanup with an EPERM cleanup error after report writing.

Lighthouse evidence:

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| `/` final repeat | 96 | 100 | 100 | 100 |
| `/platform` final | 95 | 100 | 100 | 100 |
| `/resources/imo-msc-428-98-explained` final | 99 | 100 | 100 | 100 |

Production crawl:

- All 20 public routes returned HTTP 200.
- Every checked route had exactly one H1.
- Every checked route had canonical metadata.
- Every checked route had OG title/image metadata.
- Every checked route had JSON-LD.
- Article pages had four H2 sections each.
- No detected `localhost`, `127.0.0.1`, `workers.dev`, `pages.dev`, preview, or test-label references in live HTML.

Production header checks:

- `https://certamaris.com/`: 200, HTTPS, canonical host, HSTS, CSP report-only, nosniff, referrer policy, permissions policy, X-Frame-Options, HTML no-cache.
- `https://www.certamaris.com/`: 301 to `https://certamaris.com/`, HTTPS, security headers present.
- `/_next/static/chunks/1i93tu8_6hhar.css`: 200, immutable one-year cache, security headers present.
- `/video/hero-fog.webm`: 200, one-week cache with stale-while-revalidate, security headers present.
- `/product/optimized/executive-dashboard-960.webp`: 200, one-week cache with stale-while-revalidate, security headers present.

Production RSC prefetch checks:

- `/platform/__next.platform.__PAGE__.txt?_rsc=test`: 200.
- `/contact/__next.contact.__PAGE__.txt?_rsc=test`: 200.
- `/about/__next.about.__PAGE__.txt?_rsc=test`: 200.
- `/pricing/__next.pricing.__PAGE__.txt?_rsc=test`: 200.
- `/resources/__next.resources.__PAGE__.txt?_rsc=test`: 200.

Production form check:

- Invalid contact POST to `https://certamaris.com/api/contact` returned 400 with `{"error":"All fields are required."}`, `Cache-Control: no-store`, and security headers.
- Valid delivery was not tested because no live contact forwarding endpoint was verified and no test lead should be submitted as a real contact.

## Future software-platform integration readiness

- Public marketing routes remain separate from app routes.
- No conflicting `/login`, `/signup`, `/app`, or `/dashboard` routes were created.
- Public calls to action still target public pages and can later be pointed to `app.certamaris.com`, `/login`, `/signup`, onboarding, or demo flows.
- Worker CSP `connect-src` explicitly allows `https://app.certamaris.com` for future application integration.
- Contact forwarding remains modular through `CONTACT_FORWARD_ENDPOINT`.
- No unfinished authentication, session, cookie, portal, or dashboard behavior was fabricated or exposed.

Recommended future integration approach:

1. Keep `certamaris.com` as the public marketing origin and `app.certamaris.com` as the authenticated application origin.
2. Add explicit redirects only when the app onboarding/login routes are production-ready.
3. Keep auth cookies scoped to `app.certamaris.com` or deliberately selected parent-domain cookies after a security review.
4. Put portal API clients, session middleware, and tenant authorization in the app/backend project, not in the public marketing site.
5. If marketing needs app-aware CTAs, use environment-driven URLs such as `NEXT_PUBLIC_APP_URL` and keep them out of source secrets.

## Blocked and incomplete

- GitHub-origin production deploy: BLOCKED until the repository secret `CLOUDFLARE_API_TOKEN` is added with a scoped Cloudflare API token. `CLOUDFLARE_ACCOUNT_ID` is set. The site was deployed from the same local source tree with Wrangler OAuth, but CI cannot perform the deploy step without this secret.
- Rich Results Test: NOT RUN. JSON-LD was source and live-HTML verified, but Google's hosted Rich Results Test UI was not executed.
- Valid contact delivery: NOT RUN. Delivery depends on a real `CONTACT_FORWARD_ENDPOINT` and should be tested with an approved test inbox or CRM webhook.
- Full browser console sweep across all 20 pages: PARTIAL. Lighthouse console checks passed on sampled pages and live route/RSC crawl passed, but a Playwright console listener was run only on the sampled Vanta/navigation routes after final deployment.

## 2026-07-25 superseding source-control and Vanta update

The missing supplied WebP flow assets were installed at:

- `public/bg/hero-flow-1920.webp`
- `public/bg/hero-flow-1280.webp`
- `public/bg/hero-flow-800.webp`

The homepage and global marketing background now use those images as the static base layer, with a client-only Vanta FOG canvas on desktop. Reduced-motion users and mobile viewports receive the WebP image without the animated canvas. Client-side route changes preserve exactly one Vanta canvas.

The authoritative source repository is:

```text
https://github.com/marinerxcapital/certamaris-public-website
```

The local source tree was initialized on `main` with that remote. GitHub Actions was added at `.github/workflows/ci-deploy.yml` for npm audit, typecheck, static build, and Cloudflare Worker deploy on pushes to `main`.

Verification after the WebP/Vanta update:

- `npm.cmd audit --omit=dev --audit-level=high`: PASS, 0 vulnerabilities.
- `npm.cmd run typecheck`: PASS.
- `npm.cmd run build:static`: PASS.
- `wrangler.cmd deploy --config wrangler.jsonc --dry-run --keep-vars`: PASS.
- `npx.cmd wrangler check startup --config wrangler.jsonc`: PASS with pinned `wrangler@4.114.0`.
- `wrangler.cmd deploy --config wrangler.jsonc --keep-vars`: PASS. Production Worker version `b8ec7f7e-2013-441f-98fa-2d1ca0a4e0ac`.
- `https://certamaris.com/bg/hero-flow-1920.webp`, `hero-flow-1280.webp`, and `hero-flow-800.webp`: PASS, HTTP 200 with one-week cache and security headers.
- `https://certamaris.com`: PASS, HTTP 200, HTTPS, security headers.
- `https://www.certamaris.com`: PASS, HTTP 301 to `https://certamaris.com`.
- Browser Vanta smoke: PASS on desktop with one canvas; PASS on mobile and reduced-motion with no canvas.
- Lighthouse sampled pages: PASS. `/` scored 98 performance, 100 accessibility, 100 best practices, 100 SEO. `/platform` scored 92/100/100/100. `/resources/imo-msc-428-98-explained` scored 96/100/100/100.

## Recommended improvements

Priority 1:

- Put the deployed source tree under the authoritative Git repo and connect it to the main branch deployment workflow.
- Configure and verify a real contact forwarding destination, with spam/rate limiting and delivery monitoring.
- Add Playwright production smoke tests for all 20 public routes, navigation, CTAs, RSC prefetch URLs, and console errors.

Priority 2:

- Add a strict CSP rollout path after report-only telemetry is reviewed.
- Add Web Vitals monitoring and conversion events for demo/contact CTAs.
- Add structured redirect management for future `login`, `signup`, `app`, and `dashboard` access.
- Add Article, FAQ, Breadcrumb, Organization, and WebSite schema validation to CI.

Priority 3:

- Replace repeated card grids on deeper marketing pages with more product-led interactive or screenshot-backed sections.
- Add proof points, implementation timelines, and outcomes once real customer or pilot evidence is approved.
- Add a dedicated `/login` placeholder only when the app route and auth boundary are production-approved.
