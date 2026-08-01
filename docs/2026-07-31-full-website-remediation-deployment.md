# CertaMaris.com — Full Website Remediation Deployment Runbook

**Date:** 2026-07-31  
**Program:** Full website remediation (8-agent SuperGrok fan-out)  
**Status:** IN PROGRESS — docs ready; **production deploy is orchestrator-owned**  
**Signed:** SuperGrok SUBAGENT 8 (Docs) · 2026-07-31

---

## 1. Source of truth (SoT)

| Item | Value |
|---|---|
| **Live marketing SoT (local)** | `C:\certamaris-startup-site-pnpm\certamaris-startup-site` |
| **GitHub remote** | `https://github.com/marinerxcapital/certamaris-public-website.git` |
| **Default branch** | `main` |
| **Remediation work branch** | `supergrok/website-full-remediation` |
| **Pre-work tip on `main`** | `636dbf7` (record before remediation commits) |
| **Stack** | Next.js 16 App Router · static export (`STATIC_EXPORT=true`) · Cloudflare Worker |
| **Worker name** | `certamaris-site` (`wrangler.jsonc`) |
| **Assets directory** | `./out` |
| **Worker entry** | `worker/index.ts` (run_worker_first) |
| **Live marketing URL** | https://certamaris.com |
| **Authenticated app (separate)** | https://app.certamaris.com — **do not merge** into this Worker |
| **Hub marketing tree** | `01_product/marketing` — **STALE / DO NOT USE** for live deploy |
| **Monorepo `apps/marketing`** | Import copy only — **not** live deploy SoT until owner cutover |

**Never commit secrets.** Never print `CONTACT_FORWARD_ENDPOINT` values in docs, logs, or handoffs.

---

## 2. Branch strategy

```text
main @ 636dbf7          ← pre-remediation production tip (rollback baseline)
  └── supergrok/website-full-remediation   ← parallel agent work
         │
         ├── integrate (orchestrator)
         ├── validate (typecheck + build:static + QA)
         ├── merge → main  (orchestrator / owner)
         └── deploy production Worker
```

| Rule | Detail |
|---|---|
| Agents commit? | Prefer writing files; orchestrator integrates and commits |
| Force-push | **Forbidden** |
| Deploy from feature branch | Prefer merge-to-`main` first so CI deploy path matches; local wrangler may deploy any clean tree if owner GO |
| Rollback tip | `main` @ `636dbf7` (or last known-good Worker version — fill after deploy) |

---

## 3. Pre-deploy checklist (orchestrator)

- [ ] All subagent write roots integrated; no unresolved merge conflicts
- [ ] No secrets, `.env*`, or `CONTACT_FORWARD_ENDPOINT` values in git
- [ ] No fabricated customers, certs (SOC 2 / ISO), pricing figures, or legal entity inventions
- [ ] `OWNER_VERIFY` legal items still honest (entity/address/jurisdiction only where owner-supplied)
- [ ] Sign In still points at `https://app.certamaris.com/auth/login` (or env override)
- [ ] Primary CTA remains readiness/demo contact — not fake self-serve booking
- [ ] Static export still works (`output: export` under `STATIC_EXPORT=true`)
- [ ] Sitemap / robots cover all public routes
- [ ] Contact Worker path still handles `POST /api/contact`
- [ ] `www` → apex 301 still present in `worker/index.ts`

---

## 4. Local validation (required before deploy)

From the marketing SoT directory:

```powershell
cd "C:\certamaris-startup-site-pnpm\certamaris-startup-site"

npm.cmd ci
npm.cmd audit --omit=dev --audit-level=high
npm.cmd run typecheck
npm.cmd run build:static
```

**Single-command CI parity:**

```powershell
npm.cmd run ci:validate
```

Expected outcomes:

| Step | Expect |
|---|---|
| `npm ci` | Clean install (Node 22+) |
| audit | 0 high+ prod vulns (or documented waiver) |
| typecheck | exit 0 |
| `build:static` | `./out` populated; HTML for all public routes; `/api/contact` **excluded** from static export (served by Worker) |

Optional local Worker preview (does **not** replace production deploy):

```powershell
npx wrangler dev --config wrangler.jsonc
```

---

## 5. Deploy paths

### Path A — Local Wrangler (owner / orchestrator GO)

Use when CI secrets are missing, billing is blocked, or emergency hotfix is required.

```powershell
cd "C:\certamaris-startup-site-pnpm\certamaris-startup-site"

npm.cmd ci
npm.cmd run typecheck
npm.cmd run build:static
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

| Flag / config | Meaning |
|---|---|
| `--config wrangler.jsonc` | Worker `certamaris-site`, assets `./out`, `run_worker_first: true` |
| `--keep-vars` | Preserve Worker secrets/vars (including contact forward endpoint if set) — **do not** re-print values |

**Auth for Wrangler:** local OAuth or scoped API token. Do **not** commit tokens. Do **not** paste local OAuth credentials into GitHub secrets.

Record after deploy:

| Field | Value (orchestrator fills) |
|---|---|
| Deploy datetime (UTC) | `TBD` |
| Git commit SHA | `TBD` |
| Branch | `TBD` |
| Cloudflare Worker version ID | `TBD` |
| Deploy path used | Local Wrangler / CI |

### Path B — GitHub Actions CI deploy

Workflow: `.github/workflows/ci-deploy.yml`

| Trigger | Behavior |
|---|---|
| `pull_request` | **Validate only** (audit → typecheck → `build:static`) |
| `push` to `main` | Validate → **Deploy production Worker** |
| `workflow_dispatch` on `main` | Validate → Deploy |

Required repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN` (scoped Cloudflare API token — **not** local Wrangler OAuth)

Deploy step (from workflow):

```bash
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

**If Validate fails in ~3–12s with empty steps:** org Actions billing / spending limit — see `docs/ci-billing.md` and `docs/2026-07-31-ci-billing-diagnosis.md`. Production can still ship via Path A.

Repo is **public** so standard `ubuntu-latest` hosted runners are free for this tree. Self-hosted runners are **not** required for the current workflow (hosted `ubuntu-latest` is canonical). If a self-hosted path is reintroduced later, document the runner labels here and keep Path A as emergency fallback.

---

## 6. Post-deploy smoke (minimum)

```powershell
# Apex
curl.exe -sI https://certamaris.com/
# www redirect
curl.exe -sI https://www.certamaris.com/
# App remains separate
curl.exe -sI https://app.certamaris.com/
```

| Check | Expect |
|---|---|
| `https://certamaris.com/` | **200**, HTTPS, security headers |
| `https://www.certamaris.com/` | **301** → `https://certamaris.com/` |
| Core routes (/, /platform, /solutions, /contact, /security, /privacy, /terms) | **200** |
| Resource article sample | **200** e.g. `/resources/imo-msc-428-98-explained` |
| Unknown path | **404** (Worker `not_found_handling: 404-page`) |
| `POST /api/contact` invalid body | **400**, `Cache-Control: no-store` |
| `POST /api/contact` valid (if forward configured) | **200** `{ ok: true }` — do not log endpoint URL |
| App host | Still `app.certamaris.com` — marketing Worker unchanged |

Full route inventory: `docs/2026-07-31-full-website-remediation-content-inventory.md`.

---

## 7. Rollback

### Git rollback (then redeploy)

```powershell
cd "C:\certamaris-startup-site-pnpm\certamaris-startup-site"
git fetch origin
git checkout main
git reset --hard 636dbf7   # ONLY with owner GO — do not force-push rewritten history to origin
npm.cmd ci
npm.cmd run build:static
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

Safer alternative without hard reset:

```powershell
git revert <bad-range>   # preferred on shared main
# then Path A or Path B deploy
```

### Cloudflare Worker version rollback

1. Cloudflare dashboard → Workers → `certamaris-site` → Deployments  
2. Roll back to previous known-good version ID: **`TBD` (orchestrator fills pre-deploy pin)**  
3. Re-smoke apex + www + contact

| Pin | Value |
|---|---|
| Pre-remediation Worker version | `TBD` |
| Post-remediation Worker version | `TBD` |
| Pre-remediation git tip | `636dbf7` |
| Post-remediation git tip | `TBD` |

---

## 8. Environment & secrets (reference only)

| Variable | Surface | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Build | Default `https://certamaris.com` |
| `NEXT_PUBLIC_APP_SIGN_IN_URL` | Build | Default `https://app.certamaris.com/auth/login` |
| `NEXT_PUBLIC_APP_GET_STARTED_URL` | Build | Default `/contact` |
| `NEXT_PUBLIC_APP_SALES_EMAIL` | Build | Default `sales@certamaris.com` |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Client static fallback | Browser POST target if used |
| `CONTACT_FORWARD_ENDPOINT` | **Worker secret/var** | Server-side forward from `worker/index.ts` — **never print** |

Worker applies security headers, cache policy, www redirect, RSC rewrite, and contact API. Next `headers()` in `next.config.ts` do **not** apply to static export — Worker is authoritative in production.

---

## 9. Explicit non-actions (this remediation)

| Do not | Why |
|---|---|
| Deploy monorepo `apps/marketing` as live | Not authorized cutover |
| Deploy hub `01_product/marketing` | Stale / different route tree |
| Bind `app.certamaris.com` to marketing Worker | App is separate CF Worker |
| Re-enable mini-PC origins | Product policy |
| Commit secrets or contact forward URLs | Security |
| Force-push `main` | Shared history |

---

## 10. Related docs

| Doc | Path |
|---|---|
| Content / route inventory | `docs/2026-07-31-full-website-remediation-content-inventory.md` |
| Hub master handoff | Hub `02_HANDOFF/2026-07-31-CERTAMARIS-COM-FULL-WEBSITE-REMEDIATION.md` |
| Execution ledger | Hub `02_HANDOFF/2026-07-31-WEBSITE-REMEDIATION-EXECUTION-LEDGER.md` |
| CI billing | `docs/ci-billing.md` |
| Voice / claims | `docs/content-voice-guide.md` |
| README deploy section | `README.md` §5, §13 |

---

## 11. Orchestrator fill-in block

```text
Deploy datetime (UTC):     TBD
Git branch:                TBD
Git commit:                TBD
Worker version ID:         TBD
Deploy path:               CI | Local Wrangler
ci-deploy.yml run URL:     TBD
Smoke result:              TBD
Rollback baseline git:     636dbf7
Rollback baseline Worker:  TBD
```

**Signed:** SuperGrok SUBAGENT 8 (Docs) — deploy **not** executed by this agent.
