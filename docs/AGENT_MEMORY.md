# CertaMaris public website — AGENT MEMORY INDEX

**Signed:** Cursor Cloud Agent (Composer) · **Date:** 2026-08-16  
**Run:** https://cursor.com/agents/bc-01a0088b-afcf-732b-9a58-c0e555d9e469  
**Owner:** Skyler Brown (`skyler@certamaris.com`)  
**Live SoT repo:** `marinerxcapital/certamaris-public-website` · branch **`main`** · tip **`190533a`** (link-preview branding fix, PR #9; prior feature content from **`df5f174`**)
**Production:** https://certamaris.com · Worker `certamaris-site` · latest verified CI deploy run **`32539507125`** (2026-08-21)

> Future agentic sessions: **read this file first**, then the latest dated deployment note under `docs/`, then `docs/CODEX_MARKETING_TAKEOVER.md`. Do not invent customers, metrics, certifications, compliance guarantees, or contact-forward secrets.

---

## 1. What shipped 2026-08-16 (this session)

### A. Homepage + demo + persona (merged as PR #5 → `660e5b4`)

| Item | Detail |
|---|---|
| Homepage compression | Brand-first hero (`CertaMaris` mark), sample-record explorer as dominant visual; cut problem/hierarchy/outcomes/compliance/implementation stacks |
| Sample-record hero | `#sample-record` on `/`; `SampleRecordExplorer` accepts `initialId` |
| Cinematic `/demo` scrub | `DemoScrubTour` — 8 beats REQ→PKG, play/scrub rail, sanitized Dashboard V2 screens |
| Persona-gated entry | `lib/personas.ts` + `PersonaEntry` — 4 roles; `sessionStorage` + `?persona=`; `?srqa=1` keeps QA deterministic |
| CI audit fix | `overrides.nanoid` **3.3.17 → 3.3.18** (GHSA-2v37-7h3g-55p8) |

### B. Impressive follow-on pass (merged PR #6 → `df5f174` on `main`)

| Item | Detail |
|---|---|
| Procurement leave-behind | **`/trust/assurance-model`** — printable one-pager (Print / Save as PDF), chain + boundary |
| Authored `/platform` | Homepage-quality: custody strip, hierarchy spine, four operating beats, quiet module index |
| Custody-thread strips | `CustodyStripBand` on `/platform`, `/solutions`, `/demo`, `/why-certamaris` |
| Contact delivery | Code already fail-closed; **owner must set Worker secrets** (requested via environment setup actions) |
| Memory / logs | This index + deployment note + implementation folder + takeover update |

---

## 2. Non-negotiables (do not regress)

1. **Pixel Grid** is sitewide (owner asked twice) — do not hide with a bespoke hero band without explicit owner direction (`design/redesign-plan.md` deviations).
2. **Liquid Glass** + navy/ocean palette; brass only as rare terminal accent.
3. **No invented proof** — no fake logos, metrics, certifications, survey-pass guarantees.
4. **Official texts control** — IMO/IACS applicability is human; use `REGULATORY_BOUNDARY`.
5. **Founder:** Skyler Brown · Founder only · Third Mate, Unlimited Tonnage, Oceans · B.S. Marine Transportation 2025.
6. **Marketing vs app:** `certamaris.com` ≠ `app.certamaris.com` — never rebind.
7. **Deploy:** `npm run build:static` then `npx wrangler deploy --config wrangler.jsonc --keep-vars`.
8. **Reduced motion:** never animate from opacity 0; use `usePrefersReducedMotion()` from `lib/`, not framer’s hook alone.
9. **Root link preview:** active metadata must use `/og/certamaris-link-preview-2026-08-v2.png`; do not restore `/og/certamaris-og.jpg` to `og:image` or `twitter:image`.

---

## 3. Key code map (updated 2026-08-16)

| Concern | Path |
|---|---|
| Homepage | `app/page.tsx` + `components/HomeHero.tsx` |
| Personas | `lib/personas.ts`, `components/PersonaEntry.tsx` |
| Sample record | `lib/sample-record.ts`, `components/SampleRecordExplorer.tsx` |
| Demo scrub | `lib/demo-scrub.ts`, `components/DemoScrubTour.tsx`, `app/demo/page.tsx` |
| Custody strip band | `components/CustodyStripBand.tsx` |
| Evidence chain | `components/EvidenceChain.tsx` |
| Platform landing | `app/platform/page.tsx` |
| Assurance leave-behind | `app/trust/assurance-model/page.tsx`, `components/PrintButton.tsx` |
| Contact Worker | `worker/index.ts` (`CONTACT_FORWARD_ENDPOINT` + `CONTACT_FORWARD_SECRET`) |
| Route QA inventory | `scripts/qa/expected-routes.mjs` |
| Link-preview QA | `scripts/qa/check-link-preview.mjs` |
| Design tokens | `app/globals.css`, `tailwind.config.ts` |

---

## 4. Open owner blockers

| Blocker | Status | Action |
|---|---|---|
| `CONTACT_FORWARD_ENDPOINT` + `CONTACT_FORWARD_SECRET` | **Not set** (fail-closed 503) | Owner: `wrangler secret put` on `certamaris-site`, redeploy with `--keep-vars`, E2E test `/contact` |
| Legal entity / counsel OWNER_VERIFY fields | Deferred | See comments in `lib/trust-corporate.ts` |
| Hub memory export PR | Historical | Hub PR #2 when GitHub allows |
| Monorepo `apps/marketing` cutover | Not live | Do not deploy marketing from monorepo |

---

## 5. Validation commands

```bash
npm install
npm run typecheck
npm run build:static
npm run qa
npm run ci:validate
CHROMIUM_PATH=/usr/local/bin/google-chrome node scripts/qa/check-sample-record.mjs
```

---

## 6. Related dated records

| Doc | Purpose |
|---|---|
| `docs/2026-08-16-impressive-pass-deployment.md` | Full deployment / merge record for this pass |
| `docs/2026-08-21-link-preview-branding-deployment.md` | Link-preview branding fix and production verification |
| `docs/implementation/impressive-pass-20260816/` | Implementation folder (README, CHANGES, CONTACT) |
| `docs/implementation/link-preview-branding-20260821/` | Implementation record for OG/Twitter preview remediation |
| `docs/CODEX_MARKETING_TAKEOVER.md` | Codex/agent takeover (updated tip + features) |
| `docs/2026-08-12-truth-reconciliation-deployment.md` | Prior truth/polish deploy |
| `design/redesign-plan.md` | Design SoT + owner deviations (Pixel Grid) |

**Signed:** Cursor Cloud Agent · 2026-08-16 · for Skyler Brown / future agents
