# CODEX TAKEOVER — CertaMaris Marketing Website

**Prepared:** 2026-08-01 · SuperGrok  
**Audience:** Codex (or any successor agent)  
**Status:** Live production site organized; **this repo is the only deploy SoT**

---

## 0. One-page truth

| Item | Value |
|---|---|
| **Live site** | https://certamaris.com |
| **Authenticated app (separate)** | https://app.certamaris.com — do **not** merge into this repo |
| **Canonical local path** | `C:\certamaris-startup-site-pnpm\certamaris-startup-site` |
| **GitHub** | https://github.com/marinerxcapital/certamaris-public-website |
| **Branch** | **`main` only** for production |
| **Tip (this handoff)** | **`9f95313`** |
| **Worker name** | `certamaris-site` |
| **Worker config** | `wrangler.jsonc` · assets `./out` · entry `worker/index.ts` |
| **Stack** | Next.js 16 App Router · static export · Cloudflare Worker |
| **Package scripts** | npm (not pnpm) in this tree |

### Do **not** use these as live SoT

| Path | Why |
|---|---|
| Hub `01_product/marketing` | **STALE** — see its `STALE_DO_NOT_USE.md` |
| Monorepo `apps/marketing` | Import/snapshot for future cutover — **not** live deploy until owner cutover |
| Any nested hub marketing archive | Historical only |

---

## 1. Repository organization (done)

| Action | Result |
|---|---|
| All SuperGrok feature work | Already on **`main`** |
| Local branches cleaned | `supergrok/founder-about-headshot`, `supergrok/website-full-remediation` **deleted** |
| Remote branch cleaned | `origin/supergrok/website-full-remediation` **deleted** |
| Open marketing PRs | **None** (all on main) |
| Unrelated remote | `origin/claude/certamaris-three-items-huinkp` left alone (not marketing SoT) |

### Recent production commits (newest first)

```
eff8045  fix(marketing): improve sitewide text contrast over Pixel Grid
ddbfbea  fix(marketing): surface contact delivery errors with verified mailto fallbacks
dcd20f0  fix(marketing): harden Worker contact forward errors for closeout
daf016e  docs: record founder headshot Worker version 2148b66e
06e3a1f  feat(marketing): publish Skyler Brown founder profile and headshot
cdac827  docs: record production Worker version 281dd8e0…
439e86a  feat(marketing): full enterprise website remediation
```

---

## 2. Deploy (only way to update certamaris.com)

```powershell
cd "C:\certamaris-startup-site-pnpm\certamaris-startup-site"
npm install          # if needed
npm run typecheck
npm run build:static
npm run qa           # includes founder checks
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

**Always use `--keep-vars`** so Cloudflare secrets (when set) are not wiped.

CI: `.github/workflows/ci-deploy.yml` may also deploy from `main` (self-hosted path); prefer matching local tip to live Worker after deploy.

---

## 3. Product separation

| Surface | URL | Repo |
|---|---|---|
| Marketing | certamaris.com | **this** public website repo |
| SPA | app.certamaris.com | monorepo `apps/platform` / Worker `certamaris-app` |
| API | Railway dual | `plimsoll-compliance-clean` until mono cutover |

Never re-bind `app.certamaris.com` to `certamaris-site`.

---

## 4. Key code map

| Concern | Path |
|---|---|
| Nav / footer / CTAs | `components/Nav.tsx`, `Footer.tsx`, `lib/constants.ts` |
| Founder | `lib/founder.ts`, `components/FounderPortrait.tsx`, `FounderJsonLd.tsx` |
| About / Leadership | `app/about/page.tsx`, `app/about/leadership/page.tsx` |
| Product modules | `lib/product-hierarchy.ts`, `app/platform/[slug]/page.tsx` |
| Solutions / audiences | `lib/solutions-audience.ts` |
| Contact form | `components/ContactForm.tsx` |
| Worker contact + redirects | `worker/index.ts` (`POST /api/contact`, www→apex, sample-platform→demo) |
| Pixel Grid background | `components/PixelGridBackground.tsx` |
| Design tokens / contrast | `app/globals.css`, `tailwind.config.ts` |
| SEO schema | `lib/seo-schema.ts` |
| QA | `scripts/qa/*`, `npm run qa`, `npm run qa:founder` |

---

## 5. Founder (do not invent / do not “upgrade” titles)

- **Name:** Skyler Brown  
- **Title:** Founder only (not CEO unless legal docs say so)  
- **Degree:** B.S. Marine Transportation, 2025  
- **Credential:** U.S. Merchant Mariner · Third Mate, Unlimited Tonnage, Oceans  
- **Portrait:** `/images/leadership/skyler-brown-founder-certamaris.jpg` (+ webp/avif ladder)  
- **EXIF stripped; no generative AI on portrait**

---

## 6. Contact delivery status (honest)

| Check | Status |
|---|---|
| Form validation | Works (400 on invalid) |
| Valid submit without secret | **503** (fail closed; user sees mailto fallbacks) |
| `CONTACT_FORWARD_ENDPOINT` | **Not configured** on Worker secrets |
| Inbox E2E | **Blocked** until owner sets secret |

```powershell
npx wrangler secret put CONTACT_FORWARD_ENDPOINT --config wrangler.jsonc
# HTTPS endpoint accepting JSON contact payload — do not commit the value
```

Fallback addresses in error UI: `skyler@certamaris.com`, `sales@certamaris.com`.

---

## 7. Hub / multi-repo notes for Codex

| Repo | Role | Marketing work? |
|---|---|---|
| `certamaris-public-website` | **Live marketing** | **Yes — only here** |
| `certamaris-hub` | Control plane memory/handoffs | Docs only; PR #2 recon branch for marketing handoffs |
| `certamaris` monorepo | Product SPA/API | `apps/marketing` is **not** production until cutover |
| Dual `plimsoll-compliance-clean` | Prod API | Out of marketing scope |

Hub PR: https://github.com/marinerxcapital/certamaris-hub/pull/2  
(Marketing memory path-export onto hub main lineage; merge when clean.)

---

## 8. Owner / external blockers (not for Codex to invent)

1. Set `CONTACT_FORWARD_ENDPOINT`  
2. Verify published mailboxes  
3. Legal entity / counsel docs (OWNER_VERIFY)  
4. Optional: monorepo marketing cutover decision  
5. Merge hub PR #2 when GitHub allows  

Register: hub `02_HANDOFF/2026-07-31-OWNER-VERIFY-REGISTER.md`

---

## 9. First actions for Codex session

1. `cd C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
2. `git checkout main && git pull origin main`  
3. Read this file + root `README.md`  
4. `npm run typecheck && npm run qa`  
5. Confirm live https://certamaris.com still 200  
6. Only then edit — commit to feature branch or main per owner policy  
7. Deploy with `build:static` + `wrangler deploy --keep-vars`  

---

## 10. What SuperGrok finished (do not redo)

- Full enterprise marketing IA and pages  
- Founder About/Leadership + headshot  
- Trust center, pricing, multi-intent contact, demo tour  
- SEO topics, sitemap, schema  
- QA suite  
- Text contrast / Pixel Grid dim (eff8045)  
- Contact error UX for 503  
- Branch cleanup on this repo  

**Preserve valid work. Do not redesign from zero.**

**Signed:** SuperGrok · 2026-08-01


