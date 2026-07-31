# CI billing / runner notes

## Historical failure (private + hosted)

Private-repo hosted jobs failed in ~3s with empty steps when account payment failed or Actions spend limit was $0.

Annotation: "The job was not started because recent account payments have failed or your spending limit needs to be increased."

Owner account: **user** `marinerxcapital` (not an Organization).
Billing: https://github.com/settings/billing

## Permanent fix applied 2026-07-31

Repository visibility set to **public** so standard `ubuntu-latest` hosted runners are free. Workflow retains full checks: `npm ci` → audit → typecheck → `build:static` → (main) Wrangler deploy.

## Local parity

```bash
npm run ci:validate
npx wrangler deploy --config wrangler.jsonc --keep-vars
```
