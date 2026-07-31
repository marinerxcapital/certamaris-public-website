# 2026-07-31 — GitHub Actions Validate failure diagnosis

## Symptom

Workflow **CI and Production Deploy** on `marinerxcapital/certamaris-public-website`:

- Job **Validate marketing site** fails in **3–12 seconds**
- Steps array is **empty** (runner never assigned)
- Job **Deploy production Worker** is **skipped** (`needs: validate`)

## Verified root cause

GitHub check-run annotation (run `30608555786`, job `91086035169`, and prior failures):

> The job was not started because recent account payments have failed or your spending limit needs to be increased. Please check the 'Billing & plans' section in your settings

| Check | Result |
|---|---|
| Repo visibility | **private** (org minutes billable) |
| `runner_id` on failed validate | `0` (no runner) |
| Last successful validate duration | ~1m30–1m40s (real checkout/npm/build) |
| Local `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities |
| Local `npm run typecheck` | PASS |
| Local `npm run build:static` | PASS |

This is **not** a typecheck, audit, Next.js, or Wrangler code failure.

## Code / docs changes shipped with this diagnosis

1. `.github/workflows/ci-deploy.yml` — billing note, concurrency, job timeouts
2. `docs/ci-billing.md` — permanent owner runbook
3. `package.json` → `npm run ci:validate` (local parity with validate job)
4. `README.md` — pointers for agents and operators

## Permanent restore of green CI (owner)

1. https://github.com/organizations/marinerxcapital/settings/billing  
2. Fix payment method and/or raise Actions spending limit  
3. Re-run: `gh run rerun 30608555786 --failed` or push to `main` / `workflow_dispatch`

Until then, production marketing deploys remain the local path:

```bash
npm ci
npm run ci:validate
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

## Explicit non-fixes (do not waste cycles)

- Changing validate step order/content cannot start blocked runners
- Removing `needs: validate` would not help: deploy also uses `ubuntu-latest` and would fail the same way
- Making the repo public (free public minutes) is an **owner product decision**, not done here
