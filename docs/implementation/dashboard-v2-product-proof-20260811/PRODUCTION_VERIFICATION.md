# Production Verification

Status: pending merge and deployment.

Production URL: `https://certamaris.com`

Deployment mechanism: GitHub Actions deploys pushes to `main` to Cloudflare Worker `certamaris-site` with `wrangler deploy --config wrangler.jsonc --keep-vars`.

Local production-equivalent static export verification passed on the implementation branch.

This branch has not been merged or deployed yet. Live `https://certamaris.com` verification must be performed after the branch is merged to `main` and the canonical deployment completes.

Expected live verification after deployment:

- Homepage, platform overview, demo, proof-bearing platform modules, proof-bearing solution pages, compliance, security, and resources reference `/product/dashboard-v2/`.
- Full-resolution image links under `/product/dashboard-v2/` return HTTP 200.
- Generated/live HTML contains zero `/product/clean/`, `/product/updated/`, or `/product/optimized/` references.
- No stale pre-Dashboard-V2 product proof remains visible.
