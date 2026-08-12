# Production Verification

Status: complete.

Production URL: `https://certamaris.com`

Deployment mechanism: GitHub Actions deploys pushes to `main` to Cloudflare Worker `certamaris-site` with `wrangler deploy --config wrangler.jsonc --keep-vars`.

Merged commit: `31f8ed26cdb11f47d2a6f93d3dd91e0d2f2e7601`

GitHub Actions deployment run: `31566517500`

Deployment result: PASS

## Live Verification

Command: Playwright production crawl against `https://certamaris.com`.

Result: PASS

Routes verified: 30 proof-bearing public routes.

Assertions:

- Each route returned HTTP 200.
- Each route contained `/product/dashboard-v2/` product proof.
- No route HTML contained `/product/clean/`, `/product/updated/`, or `/product/optimized/`.
- Dashboard V2 images loaded after scrolling lazy-loaded content.
- Horizontal overflow was 0px on every inspected route at 1440px.
- Sample PNG assets returned HTTP 200 with `image/png`.
- Sample optimized WebP assets returned HTTP 200 with `image/webp`.

Verified routes:

- `/`
- `/platform`
- `/demo`
- `/platform/corporate-control-plane`
- `/platform/client-company-portal`
- `/platform/fleet-management`
- `/platform/vessel-portal`
- `/platform/assessments`
- `/platform/evidence`
- `/platform/findings-corrective-actions`
- `/platform/cybersecurity-plans`
- `/platform/regulatory-intelligence`
- `/platform/continuous-assurance`
- `/platform/reports-readiness`
- `/platform/integrations`
- `/solutions/fleet-cyber-compliance`
- `/solutions/audit-survey-readiness`
- `/solutions/imo-msc-428-98`
- `/solutions/iacs-ur-e26`
- `/solutions/iacs-ur-e27`
- `/solutions/vessel-cyber-risk-management`
- `/solutions/evidence-findings-management`
- `/solutions/corrective-action-verification`
- `/solutions/cybersecurity-plan-management`
- `/solutions/sbom-vulnerability-assurance`
- `/solutions/executive-board-reporting`
- `/solutions/regulatory-change-management`
- `/compliance`
- `/security`
- `/resources`

Sample assets:

- `/product/dashboard-v2/requirement-mapping.png`
- `/product/dashboard-v2/executive-readiness.png`
- `/product/dashboard-v2/optimized/requirement-mapping-640.webp`
- `/product/dashboard-v2/optimized/sbom-vulnerability-assurance-1440.webp`
