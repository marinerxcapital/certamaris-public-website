# CODEX TAKEOVER — CertaMaris Marketing Website

**Prepared:** 2026-08-01 · SuperGrok  
**Updated:** 2026-08-16 · Cursor Cloud Agent (Composer)  
**Audience:** Codex / Cursor / any successor agent  
**Status:** Live production site organized; **this repo is the only deploy SoT**

> **START HERE for new sessions:** [`docs/AGENT_MEMORY.md`](./AGENT_MEMORY.md) (signed 2026-08-16), then this file, then the latest `docs/2026-08-*-deployment.md`.

---

## 0. One-page truth

| Item | Value |
|---|---|
| **Live site** | https://certamaris.com |
| **Authenticated app (separate)** | https://app.certamaris.com — do **not** merge into this repo |
| **GitHub** | https://github.com/marinerxcapital/certamaris-public-website |
| **Branch** | **`main` only** for production |
| **Tip (2026-08-16)** | **`3b30d14`** — tip finalize on top of PR #6 `df5f174` / PR #5 `660e5b4` |
| **Worker name** | `certamaris-site` |
| **Worker config** | `wrangler.jsonc` · assets `./out` · entry `worker/index.ts` |
| **Stack** | Next.js 16 App Router · static export · Cloudflare Worker |
| **Package scripts** | npm (not pnpm) in this tree |
| **Latest agent run** | https://cursor.com/agents/bc-01a0088b-afcf-732b-9a58-c0e555d9e469 |

### Do **not** use these as live SoT

| Path | Why |
|---|---|
| Hub `01_product/marketing` | **STALE** |
| Monorepo `apps/marketing` | Import/snapshot only until owner cutover |

---

## 1. What landed 2026-08-16 (agents must know)

### Merged to main — PR #5 (`660e5b4`)

1. Homepage compression + **sample-record hero** (`HomeHero`, `#sample-record`)
2. Cinematic **`/demo` scrub tour** (`DemoScrubTour`, 8 beats)
3. **Persona-gated entry** (`lib/personas.ts` — 4 roles; `?persona=` + sessionStorage; `?srqa=1` for QA)
4. **nanoid override 3.3.18** (CI audit GHSA-2v37-7h3g-55p8)

### Follow-on impressive pass (same day)

1. **`/trust/assurance-model`** printable leave-behind
2. **Authored `/platform`** (custody strip, hierarchy spine, four beats)
3. **`CustodyStripBand`** on platform / solutions / demo / why-certamaris
4. Memory package: `docs/AGENT_MEMORY.md` + `docs/2026-08-16-impressive-pass-deployment.md` + `docs/implementation/impressive-pass-20260816/`

---

## 2. Deploy (only way to update certamaris.com)

```bash
npm install
npm run typecheck
npm run build:static
npm run qa
npx wrangler deploy --config wrangler.jsonc --keep-vars
```

**Always use `--keep-vars`** so Cloudflare secrets are not wiped.

CI: `.github/workflows/ci-deploy.yml` deploys from **`main`** after validate.

---

## 3. Product separation

| Surface | URL | Repo |
|---|---|---|
| Marketing | certamaris.com | **this** public website repo |
| SPA | app.certamaris.com | monorepo / Worker `certamaris-app` |
| API | Railway dual | out of marketing scope |

Never re-bind `app.certamaris.com` to `certamaris-site`.

---

## 4. Key code map (2026-08-16)

| Concern | Path |
|---|---|
| Nav / footer / CTAs | `components/Nav.tsx`, `Footer.tsx`, `lib/constants.ts` |
| Homepage hero | `components/HomeHero.tsx`, `app/page.tsx` |
| Personas | `lib/personas.ts`, `components/PersonaEntry.tsx` |
| Sample record | `lib/sample-record.ts`, `components/SampleRecordExplorer.tsx` |
| Demo scrub | `lib/demo-scrub.ts`, `components/DemoScrubTour.tsx` |
| Custody strip band | `components/CustodyStripBand.tsx` |
| Evidence chain | `components/EvidenceChain.tsx` |
| Platform landing | `app/platform/page.tsx` |
| Assurance leave-behind | `app/trust/assurance-model/page.tsx` |
| Founder | `lib/founder.ts`, `components/FounderPortrait.tsx` |
| Contact form | `components/ContactForm.tsx` |
| Worker contact + redirects | `worker/index.ts` |
| Pixel Grid | `components/PixelGridBackground.tsx` |
| Design tokens | `app/globals.css` |
| QA routes | `scripts/qa/expected-routes.mjs` |

---

## 5. Founder (do not invent / do not “upgrade” titles)

- **Name:** Skyler Brown  
- **Title:** Founder only (not CEO unless legal docs say so)  
- **Degree:** B.S. Marine Transportation, 2025  
- **Credential:** U.S. Merchant Mariner · Third Mate, Unlimited Tonnage, Oceans  
- **Portrait:** `/images/leadership/skyler-brown-founder-certamaris.jpg` (+ webp/avif ladder)  

---

## 6. Contact delivery status (honest — 2026-08-16)

| Check | Status |
|---|---|
| Form validation | Works |
| Valid submit without secret | **503** fail closed; mailto fallbacks |
| `CONTACT_FORWARD_ENDPOINT` / `CONTACT_FORWARD_SECRET` | **Owner must set** on Worker |
| Runbook | `docs/implementation/impressive-pass-20260816/CONTACT-DELIVERY.md` |

```bash
npx wrangler secret put CONTACT_FORWARD_ENDPOINT --config wrangler.jsonc
npx wrangler secret put CONTACT_FORWARD_SECRET --config wrangler.jsonc
# Always: wrangler deploy --keep-vars
```

Fallback addresses: `skyler@certamaris.com`, `sales@certamaris.com`.

---

## 7. Owner / external blockers

1. Set contact forward secrets + E2E verify  
2. Legal entity / counsel OWNER_VERIFY (`lib/trust-corporate.ts` comments)  
3. Optional: monorepo marketing cutover decision  
4. Hub memory PR when GitHub allows  

---

## 8. First actions for any new agent session

1. `git checkout main && git pull origin main`  
2. Read **`docs/AGENT_MEMORY.md`** then this file  
3. `npm run typecheck && npm run qa` (after `build:static` if needed)  
4. Confirm https://certamaris.com 200  
5. Only then edit — feature branch `cursor/<name>-e469` unless owner says push main  
6. Deploy only via `build:static` + `wrangler deploy --keep-vars` or CI on main  

---

## 9. Design non-negotiables

- Pixel Grid sitewide — do not reintroduce opaque hero bands without owner direction (`design/redesign-plan.md`)  
- No fake logos/metrics/certifications/survey guarantees  
- Reduced motion: near-opaque floors; `usePrefersReducedMotion()` from `lib/`  

**Preserve valid work. Do not redesign from zero.**

**Signed:** SuperGrok · 2026-08-01  
**Countersigned / updated:** Cursor Cloud Agent · 2026-08-16
