# Dashboard V2 Product Proof Migration

Date: 2026-08-11

Repository: `marinerxcapital/certamaris-public-website`

Branch: `codex/dashboard-v2-marketing-product-proof-20260811`

Starting HEAD: `b97284b36d348ca69f54997176442f216ebd97e4`

Merged HEAD: `31f8ed26cdb11f47d2a6f93d3dd91e0d2f2e7601`

Dashboard V2 evidence source: `C:\Users\Skyler B. Brown\Desktop\CertaMaris-Dashboard-V2-Final-Evidence-2026-08-11\dashboard-v2-final-release-3`

## Result

The public marketing product-proof system now uses canonical Dashboard V2 captures under `public/product/dashboard-v2/`.

Legacy public product-proof paths `public/product/clean/`, `public/product/updated/`, and `public/product/optimized/` were removed from active source and replaced by one Dashboard V2 asset generation.

GitHub Actions run `31566517500` validated and deployed the merged `main` commit to Cloudflare Worker `certamaris-site`. Live `https://certamaris.com` verification passed for all proof-bearing public routes inspected in `PRODUCTION_VERIFICATION.md`.

## Evidence Documents

- [BEFORE_INVENTORY.md](./BEFORE_INVENTORY.md)
- [PROOF_MAPPING.md](./PROOF_MAPPING.md)
- [ASSET_MANIFEST.md](./ASSET_MANIFEST.md)
- [FILES_CHANGED.md](./FILES_CHANGED.md)
- [VALIDATION.md](./VALIDATION.md)
- [PRODUCTION_VERIFICATION.md](./PRODUCTION_VERIFICATION.md)
