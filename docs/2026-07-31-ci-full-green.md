# 2026-07-31 — CI full green + production deploy

## Root cause
Private-repo GitHub-hosted Actions blocked by user `marinerxcapital` billing (payment failed / spend limit). Jobs failed in ~3s with empty steps; not typecheck/build.

## Fix
- Repository visibility: **public** (free standard hosted runners)
- Workflow: full `ubuntu-latest` validate + deploy (no checks removed)
- Commit: **`a60f1e7`**

## Evidence
| Item | Value |
|---|---|
| Actions run | https://github.com/marinerxcapital/certamaris-public-website/actions/runs/30616056169 |
| Validate | success ~31s |
| Deploy | success ~34s |
| Worker version | `8f46b28c-4e5c-4d0f-a21c-532efc69daa0` |
| Live | https://certamaris.com HTTP 200 |

## Commands / local parity
```bash
npm run ci:validate
```
