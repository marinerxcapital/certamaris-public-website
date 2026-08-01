# DEPLOYMENT RECORD (FINAL)

| Field | Value |
|---|---|
| Commit | `06e3a1f` |
| Worker version | `2148b66e-4cb3-4a9f-81cb-d9b2256df8c4` |
| Deployed | 2026-07-31 via wrangler deploy --keep-vars |
| Smoke | /about · /about/leadership · image 200 |

---
# CertaMaris.com — Founder Headshot Deployment Runbook

**Date:** 2026-07-31  
**Program:** Public founder headshot on About / Leadership  
**Status:** PREP ONLY — **production deploy is orchestrator / owner GO**  
**Signed:** SuperGrok SUBAGENT 7 (Docs · Deployment Prep) · 2026-07-31

> This document is a **runbook + smoke checklist**. It does **not** authorize deploy by itself.  
> Do **not** push to `main` or run `wrangler deploy` until the orchestrator has integrated content changes and the owner has approved production.

---

## 0. Deployment record (orchestrator fills after ship)

| Field | Value |
|---|---|
| **Deploy datetime (UTC)** | `TBD` |
| **Git commit SHA** | `TBD` |
| **Branch deployed** | `TBD` (prefer `main` after merge) |
| **Cloudflare Worker name** | `certamaris-site` |
| **Worker version ID (post)** | `TBD` |
| **Worker version ID (pre / rollback pin)** | `281dd8e0-31ad-4562-9922-cc91d1150e90` (full remediation live pin as of 2026-07-31 — re-pin immediately before this deploy) |
| **Pre-headshot git tip on `main`** | `439e86a` content · docs stamp `cdac827` (re-verify with `git log -1` before ship) |
| **Deploy path used** | Local Wrangler / CI (circle one) |
| **Smoke result** | `TBD` |
| **Deployer** | `TBD` |

---

## 1. Source of truth (SoT)

| Item | Value |
|---|---|
| **Live marketing SoT (local)** | `C:\certamaris-startup-site-pnpm\certamaris-startup-site` |
| **GitHub remote** | `https://github.com/marinerxcapital/certamaris-public-website.git` |
| **Remote short name** | `marinerxcapital/certamaris-public-website` |
| **Default branch** | `main` |
| **Stack** | Next.js App Router · static export (`STATIC_EXPORT=true`) · Cloudflare Worker |
| **Worker** | `certamaris-site` (`wrangler.jsonc`) · assets `./out` · `run_worker_first: true` |
| **Live marketing** | https://certamaris.com |
| **Authenticated app (separate)** | https://app.certamaris.com — **do not** bind or redeploy via this Worker |
| **Hub marketing tree** | `01_product/marketing` — **STALE / DO NOT USE** |
| **Monorepo `apps/marketing`** | Import copy only — **not** live deploy SoT |

**Never commit secrets.** Never print `CONTACT_FORWARD_ENDPOINT` values.

---

## 2. Asset provenance

| Item | Detail |
|---|---|
| **Desktop source filename** | `IMG_6212.jpeg` |
| **UUID / random camera name** | **Absent** — source was the plain Desktop JPEG name above, not a UUID-named export |
| **Repo asset directory** | `public/images/leadership/` |
| **Canonical public stem** | `skyler-brown-founder-certamaris` |
| **Derivatives present (local)** | `400` / `640` / `800` / `1200` / `1600` · `.jpg` / `.webp` / `.avif` variants + `*-source.jpg` + bare `.jpg` |
| **Example live image URL (primary)** | `https://certamaris.com/images/leadership/skyler-brown-founder-certamaris-1200.webp` |
| **JPG fallback URL** | `https://certamaris.com/images/leadership/skyler-brown-founder-certamaris-1200.jpg` |
| **Source archive (repo)** | `https://certamaris.com/images/leadership/skyler-brown-founder-certamaris-source.jpg` |

Confirm the page markup (`app/about/**`, `app/about/leadership/**`, and any content lib) references the **repo stem**, not `IMG_6212.jpeg`.

---

## 3. Scope (what this deploy ships)

Expected write surfaces for the founder-headshot change (verify before ship — content agents own code):

| Surface | Expect |
|---|---|
| `public/images/leadership/*` | Optimized founder portrait set committed |
| `app/about/page.tsx` and/or `app/about/leadership/page.tsx` | Portrait + verified public bio card (honest titles only) |
| `lib/trust-corporate.ts` (or related content lib) | Leadership content updated without inventing credentials/certs |
| `scripts/qa/*` + `package.json` | Optional `qa:founder` script for asset/route assertions |
| Docs | This runbook |

**Out of scope / non-actions:**

| Do not | Why |
|---|---|
| Deploy monorepo `apps/marketing` | Not live SoT |
| Deploy hub `01_product/marketing` | Stale |
| Bind `app.certamaris.com` to marketing Worker | App is separate CF Worker |
| Force-push `main` | Shared public history |
| Invent titles, degrees, prior employers, or certifications | Truth / OWNER_VERIFY |
| Commit raw Desktop path or secrets | Hygiene |

---

## 4. GitHub hygiene (pre-merge)

From SoT:

```powershell
cd "C:\certamaris-startup-site-pnpm\certamaris-startup-site"

git status
git remote -v
git branch -vv
git log --oneline -5
```

| Check | Expect |
|---|---|
| `origin` | `marinerxcapital/certamaris-public-website` |
| Working tree | Only founder-headshot related paths staged (or clean after integrate) |
| Secrets | No `.env*`, no Worker secret values, no contact forward URLs |
| Binary assets | Leadership images under `public/images/leadership/` — no Desktop absolute paths in code |
| History | Prefer explicit path staging; no `git add .` if unrelated dirty files exist |
| Force-push | **Forbidden** |
| Deploy from feature branch | Prefer merge → `main` first so CI deploy path matches; local Wrangler may deploy a clean tree only with owner GO |

Suggested commit message (orchestrator):

```text
feat(about): publish verified founder headshot on leadership

Source Desktop photo IMG_6212.jpeg (no UUID name); optimized derivatives
under public/images/leadership/skyler-brown-founder-certamaris-*.
```

---

## 5. Local validation (required before deploy)

From the marketing SoT directory:

```powershell
cd "C:\certamaris-startup-site-pnpm\certamaris-startup-site"

npm.cmd ci
npm.cmd run typecheck
npm.cmd run build:static
npm.cmd run qa
npm.cmd run qa:founder
```

| Command | Expect |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build:static` | `./out` populated; about + leadership HTML present; leadership images copied under `out/images/leadership/` |
| `npm run qa` | Full QA suite green (routes / SEO / links / content as configured) |
| `npm run qa:founder` | Founder-specific assertions green (image paths, leadership route, no broken portrait refs) |

**If `qa:founder` is missing from `package.json`:** do **not** invent a pass. Either (a) integrate the QA subagent script first, or (b) run the **manual founder checks** in §7 and record “`qa:founder` N/A — manual only” in the deployment record.

**Optional CI parity (full):**

```powershell
npm.cmd run ci:validate
```

**Optional local Worker preview (does not replace production deploy):**

```powershell
npx wrangler dev --config wrangler.jsonc
```

Static export note: Next `headers()` do not apply to `./out` — Worker is authoritative in production.

---

## 6. Deploy (orchestrator / owner GO only)

### Path A — Local Wrangler

```powershell
cd "C:\certamaris-startup-site-pnpm\certamaris-startup-site"

npm.cmd ci
npm.cmd run typecheck
npm.cmd run build:static
npm.cmd run qa
npm.cmd run qa:founder
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

| Flag | Meaning |
|---|---|
| `--config wrangler.jsonc` | Worker `certamaris-site`, assets `./out` |
| `--keep-vars` | Preserve Worker secrets/vars (including contact forward if set) — **do not** re-print values |

Record Worker version ID from Wrangler output into §0.

### Path B — GitHub Actions (push to `main`)

Workflow: `.github/workflows/ci-deploy.yml` (when secrets/billing healthy)

| Trigger | Behavior |
|---|---|
| `pull_request` | Validate only |
| `push` to `main` | Validate → deploy production Worker |
| `workflow_dispatch` on `main` | Validate → deploy |

Required secrets: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN` (scoped API token — not local Wrangler OAuth).

If Actions billing blocks CI: use Path A. See `docs/ci-billing.md`.

---

## 7. Post-deploy smoke checklist

Run after deploy. Mark each row.

### 7.1 HTTP / route smoke

```powershell
curl.exe -sI "https://certamaris.com/about"
curl.exe -sI "https://certamaris.com/about/leadership"
curl.exe -sI "https://certamaris.com/images/leadership/skyler-brown-founder-certamaris-1200.webp"
curl.exe -sI "https://certamaris.com/images/leadership/skyler-brown-founder-certamaris-1200.jpg"
curl.exe -sI "https://certamaris.com/contact?intent=demo"
curl.exe -sI "https://app.certamaris.com/auth/login"
curl.exe -sI "https://www.certamaris.com/"
```

| # | URL / check | Expect | Pass? |
|---|---|---|---|
| 1 | `https://certamaris.com/about` | **200**, HTTPS | ☐ |
| 2 | `https://certamaris.com/about/leadership` | **200**, HTTPS | ☐ |
| 3 | Image `…/skyler-brown-founder-certamaris-1200.webp` | **200**, `Content-Type` image/* | ☐ |
| 4 | Image JPG fallback `…-1200.jpg` | **200**, image/* | ☐ |
| 5 | `https://certamaris.com/contact?intent=demo` | **200** (query may normalize; page loads demo intent) | ☐ |
| 6 | **Sign-in** `https://app.certamaris.com/auth/login` | **200** (or app auth shell) — marketing Worker **unchanged** for app host | ☐ |
| 7 | Nav/footer **Sign in** on marketing | Still points at `APP_SIGN_IN_URL` → `https://app.certamaris.com/auth/login` | ☐ |
| 8 | `https://www.certamaris.com/` | **301** → `https://certamaris.com/` | ☐ |
| 9 | Unknown marketing path | **404** | ☐ |

### 7.2 Visual / content smoke (browser)

| # | Check | Expect | Pass? |
|---|---|---|---|
| 10 | Leadership portrait visible | Founder headshot renders (not broken icon / empty alt trap) | ☐ |
| 11 | Responsive | Portrait acceptable at ~1440 / 768 / 390 widths | ☐ |
| 12 | `alt` text | Honest, non-promotional description (name + role as published) | ☐ |
| 13 | No Desktop filename leak | Page source must **not** reference `IMG_6212.jpeg` | ☐ |
| 14 | Bio honesty | No invented certifications, customers, or legal entity claims | ☐ |
| 15 | CTA | Primary path still demo/readiness (`/contact?intent=demo`) | ☐ |

### 7.3 Regression spot-check

| # | Check | Expect | Pass? |
|---|---|---|---|
| 16 | Homepage | **200**, Pixel Grid / liquid-glass intact | ☐ |
| 17 | `POST /api/contact` invalid body | **400**, `Cache-Control: no-store` | ☐ |
| 18 | Security headers on HTML | Present via Worker (CSP/HSTS as previously configured) | ☐ |

---

## 8. Rollback

### 8.1 Cloudflare Worker version rollback (fastest)

1. Cloudflare dashboard → Workers & Pages → **`certamaris-site`** → Deployments  
2. Roll back to previous known-good **Worker version ID** (pin in §0 — pre-deploy pin; fallback pin `281dd8e0-31ad-4562-9922-cc91d1150e90` if still current before this ship)  
3. Re-smoke §7.1 rows 1–6

### 8.2 Git revert + redeploy

```powershell
cd "C:\certamaris-startup-site-pnpm\certamaris-startup-site"
git fetch origin
git checkout main
git pull origin main

# Preferred on shared main:
git revert <bad-commit-sha>   # or range — no force-push

npm.cmd ci
npm.cmd run typecheck
npm.cmd run build:static
npm.cmd run qa
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

Hard reset to a prior tip is **owner-only** and must not force-push rewritten history to `origin`.

### 8.3 Content-only rollback note

If only the portrait is wrong but the rest of remediation is good: revert the headshot commit (or remove portrait markup + assets) and redeploy — do **not** roll the entire Worker back to pre-remediation unless necessary.

---

## 9. Explicit non-actions (this agent / this prep)

| Actor | Must not |
|---|---|
| Docs SUBAGENT 7 | Deploy production, push `main`, change DNS, print secrets |
| Any agent without owner GO | `wrangler deploy` to production |
| Anyone | Force-push, rewrite published history, re-bind app hostname |

---

## 10. Related docs

| Doc | Role |
|---|---|
| `docs/2026-07-31-full-website-remediation-deployment.md` | Full site remediation deploy SoT |
| `docs/2026-07-31-website-remediation-qa.md` | QA inventory |
| `docs/ci-billing.md` | Actions billing fallback → local Wrangler |
| Hub `MEMORY.md` | Program memory index |
| Hub `DONE/SUBAGENT-7-DEPLOYMENT-PREP-FOUNDER.md` | This prep completion report |

---

**End of runbook.** Orchestrator: fill §0 after ship; tick §7 smoke rows; release any deploy locks.

