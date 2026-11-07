# Product exhibit viewer LIVE - 2026-11-07

**Production:** https://certamaris.com - Cloudflare Worker `certamaris-site`
version `f4047440-be48-4d22-80f1-0d1a0bc1c1b6` @100%
**Previous version:** `12c9e77f-a6aa-4cc6-adb2-b3bbaeaa6a16`
**Branch:** `codex/assurance-helix-hero-20260926`
**Code commit:** `e56dbf0` (`feat(marketing): restore premium product exhibit viewer`)
**Deployment:** direct local Wrangler redeploy; GitHub Actions was not used

The first verified release was `12c9e77f-a6aa-4cc6-adb2-b3bbaeaa6a16`.
This final redeploy used the same code and static artifact from `bfdb0f7` and
read back `f4047440-be48-4d22-80f1-0d1a0bc1c1b6` at 100%.

## Scope

The public marketing website's real product application captures now open in a
shared, route-scoped exhibit viewer. The existing inline annotated evidence
panels remain the primary page surface; interactive exhibits add a deliberate
full-resolution reading mode instead of opening an unstructured image tab.

## Shipped

- `components/ProductScreens.tsx` now registers interactive exhibits by route,
  preserves deterministic `galleryOrder`, and provides accessible exhibit
  triggers with the existing real dashboard captures.
- `components/ProductGalleryHost.tsx` provides the one shared portal viewer:
  title/body context, sanitized-capture boundary copy, annotation reading list,
  original-asset access, previous/next navigation, counter, close control,
  backdrop close, Escape, arrow-key navigation, focus trapping, focus
  restoration, scroll locking, and failed-asset recovery.
- The viewer is responsive at desktop, tablet, and narrow mobile sizes and
  disables opening transitions under `prefers-reduced-motion: reduce`.
- `app/layout.tsx` mounts the viewer host once so route pages do not create
  competing modal systems.
- `app/globals.css` adds the restrained CertaMaris viewer surface, trigger
  affordance, mobile layout, focus states, and reduced-motion contract.
- `scripts/qa/product-lightbox-smoke.mjs` and `npm run qa:lightbox` provide a
  repeatable local or live browser contract test.

No product names, screenshots, prices, compliance claims, routes, or internal
admin surfaces were invented or changed. The homepage's intentionally static
product proof remains static; the existing demo and cinematic `interactive={false}`
contracts remain intact.

## Validation

- `npm run typecheck` — PASS.
- `npm run build:static` — PASS; 111 generated routes.
- `npm run qa:content` — PASS; 157 files clean.
- `npm run qa:product-proof` — PASS; 16 registry screens and four derivatives
  per screen.
- `npm run qa:public-product-boundary` — PASS; 106 generated HTML/XML files.
- `npm run qa:responsive-a11y` — PASS; 19 routes × 9 viewports, 0 scoped
  issues, 0 broken images.
- `npm run qa:ux-audit` — PASS; 25 routes, 5 features, 0 failures.
- `npm run qa:lightbox` — PASS locally and against `https://certamaris.com`.
  The live browser contract verified 5 `/platform` triggers, full-resolution
  image loading, dialog semantics, previous/next navigation, Escape close,
  focus restoration, body scroll lock, mobile no-overflow, and reduced-motion
  animation suppression.
- `npm run test:pricing` — PASS; 12/12.
- `npm run test:contact` — PASS; 9/9.
- `npm run test:worker` — PASS; 6/6.
- `git diff --check` — PASS; only normal LF/CRLF conversion warnings were
  emitted by Git on Windows.

## Live readback

- `/`, `/platform`, `/security`, `/resources`, `/solutions`, `/compliance`, and
  `/demo` returned HTTP 200.
- Server-rendered exhibit trigger counts: `/platform` 5, `/security` 3,
  `/resources` 6, `/solutions` 4, `/compliance` 4, `/demo` 1. The homepage's
  product showcase remains intentionally noninteractive.
- `/product/dashboard-v2/executive-readiness.png` returned HTTP 200.
- Live headers retain CSP, HSTS preload, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY`, and canonical metadata.
- Wrangler version readback lists `f4047440-be48-4d22-80f1-0d1a0bc1c1b6`
  created `2026-11-07T21:41:48.978Z`.

## Rollback

```powershell
npx wrangler versions deploy 12c9e77f-a6aa-4cc6-adb2-b3bbaeaa6a16@100% --config wrangler.jsonc -y
```

## Residuals

- The existing static QA harness continues to report expected Next RSC-prefetch
  console noise; the focused live browser contract and live route/header probe
  passed.
- No dependency, analytics, billing, DNS, API, authenticated platform, or
  internal-admin behavior was changed.

**Status:** PRODUCTION DEPLOYED AND LIVE-VERIFIED

**Completed:** Codex / 2026-11-07 19:48 UTC
