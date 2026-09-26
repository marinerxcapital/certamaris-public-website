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

## 2026-09-26 — recurrence: account locked, jobs never start

Push of `f1f56af` to `main` produced run
[`36232400278`](https://github.com/marinerxcapital/certamaris-public-website/actions/runs/36232400278),
which finished in **4 s** with the annotation:

> The job was not started because your account is locked due to a billing issue.

The `Validate marketing site` job reported **zero steps** and the
`Deploy production Worker` job was **skipped**. This confirms the first gate is
the **account-level lock**, not the repository visibility fix applied on
2026-07-31: a locked account blocks even the free public-repo `ubuntu-latest`
runner. Owner action: `https://github.com/settings/billing`.

**Second gate, verified locally the same day.** `npm run ci:validate` fails on
its own first step:

```
npm audit --omit=dev --audit-level=high
3 vulnerabilities (1 moderate, 1 high, 1 critical)
  next  16.2.12  -> fix available in next@16.3.6 (outside the pinned range)
  sharp 0.35.3   -> fixed in sharp@0.35.4
```

So even after the account is unlocked, the `validate` job will fail and
`deploy` (which has `needs: validate`) will not run. Clearing it needs a
deliberate `next` / `sharp` bump plus a full re-validation. Practical exposure
is low for this particular site: it is a static export with no Next server and
`images.unoptimized`, so neither the server RCE nor the image-optimisation
advisory is reachable.

Until both gates are cleared, deploy from the production checkout with the
local parity commands above.
