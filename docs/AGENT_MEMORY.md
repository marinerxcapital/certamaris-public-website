# CertaMaris public website — AGENT MEMORY INDEX

**Signed:** Cursor Cloud Agent (Composer) · **Date:** 2026-08-16  
**Run:** https://cursor.com/agents/bc-01a0088b-afcf-732b-9a58-c0e555d9e469  
**Owner:** Skyler Brown (`skyler@certamaris.com`)  
**Live SoT repo:** `marinerxcapital/certamaris-public-website` · branch **`main`** · product experience upgrade **`dfb009f`** · pricing table keyboard-access closeout **`0084f51`**; product run **`32627169675`**; final accessibility deploy run **`32628481367`**; prior UX merge **`8a633155`** / PR #14; prior conversion merge **`4f206e6`** / PR #12; link-preview code commit **`190533a`** (PR #9)
**Production:** https://certamaris.com · Worker `certamaris-site` · Cloudflare deployment readback verified on 2026-08-23

> Future agentic sessions: **read this file first**, then the latest dated deployment note under `docs/`, then `docs/CODEX_MARKETING_TAKEOVER.md`. Do not invent customers, metrics, certifications, compliance guarantees, or contact-forward secrets.

---

## 1. What shipped

### 2026-08-23 product experience upgrade (`dfb009f`, accessibility closeout `0084f51`)

| Item | Detail |
|---|---|
| Homepage lifecycle | Interactive `REQ -> APP -> CTL -> ASM -> EVD -> FND -> RSK -> CAP -> QA -> PKG` teaser with focus/touch/keyboard operability and `/demo#chain-inspector` CTA |
| Chain inspector | `/demo` mounts `ChainOfCustodyInspector` backed by `lib/sample-record.ts`; sample/demo data is explicitly labeled |
| Pricing calculator v2 | Canonical `lib/pricing-calculator.ts` supports total fleet, contracted vessels, `$6,000` remote QA reports, `$15,000` on-board assessments, travel exclusion, non-binding estimate copy, and shareable query state |
| Persona paths | `/who-we-serve/*` renders tailored "Your path through the record" modules into relevant demo stages |
| Evidence simulator v2 | `/platform/evidence` drills from evidence item to freshness, reviewer disposition, finding, corrective action, resolved/reset state |
| OG previews | Route-specific 1200x630 PNGs for `/pricing`, `/security`, `/demo`, `/platform/evidence`, `/resources` |
| Trust / claims | Implemented/planned/not-claimed discipline preserved; no invented customers, certifications, regulatory endorsement, telemetry, or integrations |
| QA | `npm run ci:validate`, `npm run qa`, `npm run qa:responsive-a11y`; live sitemap crawl 93 URLs; live changed-route image/overflow/axe checks passed |
| Production deploy | Product run `32627169675`; documentation sync run `32627693133`; final current-main deploy re-triggered by workflow dispatch after docs sync |
| Deployment note | `docs/2026-08-23-product-experience-upgrade-deployment.md` |

### 2026-08-23 pricing keyboard-access closeout (`0084f51`)

| Item | Detail |
|---|---|
| Pricing table access | `/pricing` package-comparison table wrapper is a named focusable region (`role="region"`, `aria-label="Annual pricing tiers"`, `tabIndex={0}`) so keyboard users can reach the horizontal scroll area. |
| Production deploy | GitHub Actions run `32628481367`; validate job `97167459683`; deploy job `97167550885`; Cloudflare readback verified after deploy. |
| Status | Live; no unresolved issue introduced by the closeout fix. |

### 2026-08-22 unreasonable excellence pass (merged PR #14 -> `8a633155`)

| Item | Detail |
|---|---|
| Pricing first viewport | `/pricing` hero now exposes Core, Assurance, and Enterprise package economics using existing `pricingTiers` data |
| Diligence sequence | `components/BuyerDiligencePacket.tsx` adds a forwardable four-step review route: proof, fit, diligence, request |
| Procurement route | `/trust/procurement` hero now has a procurement review path linking security controls, assurance one-pager, and contact intent |
| Contact clarity | `/contact` adds a concise checklist for the fastest useful request while preserving follow-up/fallback truth |
| Responsive density | `app/globals.css` tightens page hero and mobile home hero spacing without removing Pixel Grid / Liquid Glass |
| Regression QA | `scripts/qa/check-excellence-path.mjs`; run with `npm run qa:excellence`, included in `npm run qa` |
| Evidence | `docs/implementation/unreasonable-excellence-20260822/`; baseline and after screenshots captured |
| Production deploy | GitHub Actions run `32556978238`; validate job `96992622323`; deploy job `96992697549`; live root ETag `"82a210908a5433f9fdb216a2b0f5836e"` |
| Status | RESOLVED; production verification tracked in `docs/2026-08-22-unreasonable-excellence-deployment.md` |

### 2026-08-22 conversion / trust / visual UX pass (merged PR #12 -> `4f206e6`)

| Item | Detail |
|---|---|
| Buyer diligence packet | `components/BuyerDiligencePacket.tsx` links pricing, Trust Center, assurance model, procurement, AI/data policy, legal status, and contact intents |
| Homepage routing | Above-fold quick path: inspect proof, compare packages, open diligence |
| Pricing / Trust / Contact | Shared diligence packet added; Pricing hero includes comparison/procurement/contact aside |
| Mobile nav | Drawer made more opaque over Pixel Grid hero to prevent background text bleed-through |
| Regression QA | `scripts/qa/check-buyer-paths.mjs`; run with `npm run qa:buyer-paths` and included in `npm run qa` |
| Evidence | `docs/implementation/conversion-trust-ux-20260822/`; production screenshots in `screenshots/production/` |
| Production deploy | GitHub Actions run `32549762207`; deploy job `96974526637`; live root ETag `"ef210f2eb759010ed7929d13e25285fd"` |

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
| Lifecycle teaser | `components/AssuranceLifecycleTeaser.tsx`, `lib/assurance-lifecycle.ts` |
| Chain inspector | `components/ChainOfCustodyInspector.tsx`, `lib/sample-record.ts` |
| Pricing calculator v2 | `components/PricingCalculator.tsx`, `lib/pricing-calculator.ts`, `lib/pricing-calculator.test.ts` |
| Role record paths | `components/RoleRecordPath.tsx` |
| Evidence simulator v2 | `components/EvidenceFreshnessSimulator.tsx` |
| Platform landing | `app/platform/page.tsx` |
| Assurance leave-behind | `app/trust/assurance-model/page.tsx`, `components/PrintButton.tsx` |
| Contact Worker | `worker/index.ts` (`CONTACT_FORWARD_ENDPOINT` + `CONTACT_FORWARD_SECRET`) |
| Route QA inventory | `scripts/qa/expected-routes.mjs` |
| Link-preview QA | `scripts/qa/check-link-preview.mjs` |
| Product-experience QA | `scripts/qa/check-product-experience.mjs` |
| Buyer-path QA | `scripts/qa/check-buyer-paths.mjs` |
| Excellence-path QA | `scripts/qa/check-excellence-path.mjs` |
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
| `docs/2026-08-22-conversion-trust-ux-deployment.md` | Conversion, trust packaging, buyer-path, and mobile-nav UX pass |
| `docs/2026-08-23-product-experience-upgrade-deployment.md` | Product mini-experience, pricing v2, evidence v2, OG previews, live verification |
| `docs/implementation/impressive-pass-20260816/` | Implementation folder (README, CHANGES, CONTACT) |
| `docs/implementation/link-preview-branding-20260821/` | Implementation record for OG/Twitter preview remediation |
| `docs/implementation/conversion-trust-ux-20260822/` | Screenshot-backed implementation record for the buyer-path UX pass |
| `docs/CODEX_MARKETING_TAKEOVER.md` | Codex/agent takeover (updated tip + features) |
| `docs/2026-08-12-truth-reconciliation-deployment.md` | Prior truth/polish deploy |
| `design/redesign-plan.md` | Design SoT + owner deviations (Pixel Grid) |

**Signed:** Cursor Cloud Agent · 2026-08-16 · for Skyler Brown / future agents
