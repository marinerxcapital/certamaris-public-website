# Production Verification

Production verification is pending until this branch is merged to `main` and the canonical GitHub Actions Cloudflare Worker deployment completes.

Canonical deployment workflow:

- `.github/workflows/ci-deploy.yml`
- `push` to `main` validates, builds static export, then runs `npx wrangler deploy --config wrangler.jsonc --keep-vars`.

Required post-deploy checks:

1. Verify `https://certamaris.com/` renders the polished H1:
   `Maritime cyber assurance from requirement to readiness package.`
2. Verify the homepage mobile hero does not clip CTA buttons.
3. Verify `/platform`, `/demo`, and `/solutions/audit-survey-readiness` still render Dashboard V2 product proof.
4. Verify production HTML contains no active stale product paths:
   - `/product/clean/`
   - `/product/updated/`
   - `/product/optimized/`
5. Verify production returns no visible application error page.

Status at commit time: `PENDING MERGE / DEPLOY`.

