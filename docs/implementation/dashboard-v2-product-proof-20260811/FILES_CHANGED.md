# Files Changed

## Source

- `lib/product-screens.ts` rebuilt around Dashboard V2 asset metadata.
- `components/ProductScreens.tsx` updated so optimized WebP generation resolves only from `/product/dashboard-v2/`.
- `components/HomepageProductShowcase.tsx` now forwards `fullSrc`, `width`, and `height` for active screens.
- `components/PageHero.tsx` now allows product-proof asides to render on mobile and tablet instead of hiding them below `lg`.
- `lib/product-hierarchy.ts` uses route-specific Dashboard V2 proof keys for modules that previously reused unrelated legacy screenshots.
- `lib/solutions-audience.ts` uses route-specific Dashboard V2 proof keys for solution pages where Dashboard V2 has a better canonical surface.
- `app/compliance/page.tsx`, `app/security/page.tsx`, and `app/resources/page.tsx` now pass complete registry objects into `ProductScreenFrame`.
- `package.json` and `package-lock.json` include a narrow `nanoid@3.3.17` override so the existing production audit gate remains passable.

## QA

- `scripts/qa/check-product-proof.mjs` added.
- `scripts/qa/check-product-proof-render.mjs` added.
- `package.json` adds `qa:product-proof` and `qa:product-proof:render`.
- `scripts/qa/run-all.mjs` includes the product-proof integrity gate.

## Docs

- `docs/product-screenshot-governance.md` updated to the Dashboard V2 asset system.
- `docs/implementation/dashboard-v2-product-proof-20260811/*` added.

## Assets

- Added 17 Dashboard V2 PNG captures under `public/product/dashboard-v2/`.
- Added 68 Dashboard V2 WebP derivatives under `public/product/dashboard-v2/optimized/`.
- Removed 81 tracked legacy pre-Dashboard-V2 product-proof assets from old product directories.
