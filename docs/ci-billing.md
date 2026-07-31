# CI failure diagnosis — GitHub Actions billing (not app code)

## Symptom

`CI and Production Deploy` → **Validate marketing site** fails in **~3–12 seconds** with **zero steps executed** on **GitHub-hosted** `ubuntu-latest`.  
**Deploy production Worker** is then **skipped** (`needs: validate`).

## Root cause (verified 2026-07-31)

GitHub annotation on failed hosted runs (e.g. `30608555786`, `30611151879`):

> The job was not started because recent account payments have failed or your spending limit needs to be increased. Please check the 'Billing & plans' section in your settings

| Signal | Observation |
|---|---|
| Owner | **User** `marinerxcapital` (not an Organization) |
| Repo | **private** (hosted minutes billable) |
| Job duration (hosted) | 3–12s |
| Steps | empty; `runner_id: 0` |
| Last green hosted validate | ~1m30–1m40s |

This is **not** typecheck, audit, Next, or Wrangler. Hosted runners never start.

## Permanent paths

### A. Account billing (restores hosted `ubuntu-latest`)

1. **User billing** (correct URL): https://github.com/settings/billing  
2. Fix failed payment and/or raise **Actions spending limit / budget** above $0  
3. Budgets: https://github.com/settings/billing/budgets  

### B. Self-hosted runner (current workflow default)

Workflow jobs use labels: `self-hosted`, `Windows`, `X64`, `marketing-ci`.  
Self-hosted usage does **not** consume hosted private minutes. Full checks retained (audit, typecheck, build, deploy).

Runner machine (owner PC):

```text
C:\actions-runner-certamaris-marketing\
  config already registered as certamaris-marketing-win
  start: run.cmd   (or install as Windows service for durability)
```

Keep the runner **online** for CI to execute.

### Local parity

```bash
npm run ci:validate
npx wrangler deploy --config wrangler.jsonc --keep-vars
```
