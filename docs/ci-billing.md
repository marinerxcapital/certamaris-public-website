# CI failure diagnosis — GitHub Actions billing (not app code)

## Symptom

`CI and Production Deploy` → **Validate marketing site** fails in **~3–12 seconds** with **zero steps executed**.  
**Deploy production Worker** is then **skipped** (`needs: validate`).

## Root cause (verified 2026-07-31)

GitHub annotation on failed runs (e.g. `30608555786`, `30608252428`, `30601744427`, `30601691550`):

> The job was not started because recent account payments have failed or your spending limit needs to be increased. Please check the 'Billing & plans' section in your settings

Evidence:

| Signal | Observation |
|---|---|
| Job duration | 3–12s |
| Steps array | empty (`[]`) |
| Runner | not assigned (`runner_id: 0` / null) |
| Last green validate | ~1m30–1m40s with real npm/typecheck/build steps |
| Repo | **private** under org `marinerxcapital` |

This is **not** caused by typecheck, `npm audit`, Next build, or Wrangler. Hosted runners never start.

## Permanent fix (owner / org admin — required)

1. Open **GitHub org billing**: https://github.com/organizations/marinerxcapital/settings/billing  
2. Fix **failed payment method** and/or raise **Actions spending limit**.  
3. Confirm Actions is enabled for private repos.  
4. Re-run a failed workflow:  
   `gh run rerun 30608555786 --failed`  
   or push a docs-only commit / `workflow_dispatch`.

Until billing is restored, GitHub-hosted CI **cannot** deploy. Use local production path:

```bash
npm ci
npm run typecheck
npm audit --omit=dev --audit-level=high
npm run build:static
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

## Not a permanent code workaround

- Editing `ci-deploy.yml` steps cannot start runners when billing blocks the job.  
- Making the repo public would use free public minutes (product decision; not done without owner).  
- Self-hosted runners are an alternative if org policy forbids paid hosted minutes.

## Local parity

```bash
npm run ci:validate
```

Mirrors the validate job steps.
