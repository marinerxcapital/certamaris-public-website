# Product dashboard gallery deployment

Date: 2026-08-01

## Release

- Repository: `marinerxcapital/certamaris-public-website`
- Commit: `25e99d2` (`feat(marketing): update product dashboard gallery`)
- Branch: `main`
- Worker: `certamaris-site`
- Cloudflare version: `09e02e9d-8aba-4ad6-95ef-c77e6f6b1b97`
- Domain: `https://certamaris.com`

## Asset source

The user-approved July 24 export at `00_CONTROL/reports/certamaris-ui-screenshots-2026-07-24_23-23-58/screenshots` was visually reviewed and mapped in [the asset manifest](./2026-08-01-product-gallery-manifest.md). Eight public-facing dashboard screens now live under `public/product/updated/` with 384/640/960/1440 WebP derivatives. Legacy files remain only as unreferenced archive assets.

## Gallery behavior

All `ProductScreenFrame` and `ProductScreenTile` placements now use the shared accessible gallery. Triggers are real buttons with an Expand affordance. The dialog loads the original-resolution image on demand and provides title/description metadata, thumbnails, previous/next controls, counters, Escape and arrow-key controls, backdrop close, focus trapping/restoration, scroll locking, and responsive mobile layout.

## Validation evidence

- `npm run typecheck` — pass
- `npm run build:static` — pass (99 routes)
- `npm run qa` — pass (0 failed steps)
- `git diff --check` — pass
- Source stale-reference scan — no legacy references outside archived asset folders
- Browser smoke test on `/demo` at 1280px — updated assets present, no horizontal overflow, dialog and full-resolution source verified, next/Escape/focus restoration verified, zero console errors
- Production `/`, `/platform`, and `/demo` — HTTP 200 with updated asset references and no stale references after edge revalidation
- Production replacement PNGs — all eight return HTTP 200
- Production HTML probe — `CF-Cache-Status: HIT`; enforcing `Content-Security-Policy` remains present
