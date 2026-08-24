# CODEX TAKEOVER — CertaMaris Marketing Website

**Prepared:** 2026-08-01 · SuperGrok  
**Updated:** 2026-08-24 · Codex
**Audience:** Codex / Cursor / any successor agent  
**Status:** Live production site organized; **this repo is the only deploy SoT**

> **START HERE for new sessions:** [`docs/AGENT_MEMORY.md`](./AGENT_MEMORY.md), then this file, then the latest `docs/2026-08-*-deployment.md`.

---

## 0. One-page truth

| Item | Value |
|---|---|
| **Live site** | https://certamaris.com |
| **Authenticated app (separate)** | https://app.certamaris.com — do **not** merge into this repo |
| **GitHub** | https://github.com/marinerxcapital/certamaris-public-website |
| **Branch** | **`main` only** for production |
| **Latest production change (2026-08-24)** | Internal-admin marketing removal `5bc636f` / PR #16 · note `docs/2026-08-24-internal-admin-marketing-removal.md`; previous complete legal library `e62e010` |
| **Latest UX pass (2026-08-23)** | Product experience upgrade `dfb009f` · pricing table keyboard-access closeout `0084f51` · note `docs/2026-08-23-product-experience-upgrade-deployment.md` |
| **Link-preview code commit (2026-08-21)** | **`190533a`** - PR #9 link-preview branding fix; prior PR #6 `df5f174` / PR #5 `660e5b4` |
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

### Link-preview branding fix (2026-08-21)

1. Root-domain Open Graph/Twitter metadata now uses `/og/certamaris-link-preview-2026-08-v2.png`.
2. The old `/og/certamaris-og.jpg` asset is historical-only and must not be restored as active `og:image` or `twitter:image`.
3. Regression check: `npm run qa:link-preview`.
4. Deployment record: `docs/2026-08-21-link-preview-branding-deployment.md`.

### Conversion, trust, and buyer-path UX pass (2026-08-22, PR #12 -> `4f206e6`)

1. `components/BuyerDiligencePacket.tsx` packages pricing, Trust Center, assurance model, procurement, AI/data policy, legal document, and contact intent paths.
2. Homepage hero exposes proof, pricing, and diligence next actions above the fold.
3. Pricing, Trust, and Contact include the shared diligence packet; Pricing has a compact hero buyer path.
4. Mobile nav drawer opacity was increased so Pixel Grid/hero text does not bleed through the sheet.
5. Regression check: `npm run qa:buyer-paths`, also included in `npm run qa`.
6. Production deploy: GitHub Actions run `32549762207`, deploy job `96974526637`; live root ETag `"ef210f2eb759010ed7929d13e25285fd"`.

### Unreasonable excellence pass (2026-08-22, PR #14 -> `8a633155`)

1. Pricing hero exposes Core, Assurance, and Enterprise package economics above the fold from existing published data.
2. Shared `BuyerDiligencePacket` now includes a forwardable four-step review route for proof, fit, diligence, and request.
3. Procurement hero adds a direct review path for public security controls, assurance one-pager, and procurement request.
4. Contact page adds a concise "fastest useful request" checklist while preserving truthful routed follow-up and direct-email fallback behavior.
5. `app/globals.css` reduces avoidable page-hero and mobile hero height without removing Pixel Grid / Liquid Glass.
6. Regression check: `npm run qa:excellence`, also included in `npm run qa`.
7. Production deploy: GitHub Actions run `32556978238`, validate job `96992622323`, deploy job `96992697549`; live root ETag `"82a210908a5433f9fdb216a2b0f5836e"`.
8. Evidence: `docs/implementation/unreasonable-excellence-20260822/`.

### Product experience upgrade (2026-08-23, docs synchronized on `main`)

1. Homepage now includes an accessible interactive `REQ -> APP -> CTL -> ASM -> EVD -> FND -> RSK -> CAP -> QA -> PKG` lifecycle teaser.
2. `/demo` includes a chain-of-custody inspector backed by the approved `lib/sample-record.ts` fixture.
3. `/pricing` calculator v2 uses canonical `lib/pricing-calculator.ts` logic, supports total fleet versus contracted vessels, optional remote QA reports, optional on-board assessments, non-binding estimate copy, and shareable query parameters.
4. `/who-we-serve/*` pages include tailored "Your path through the record" modules.
5. `/platform/evidence` includes evidence simulator v2 with freshness, reviewer disposition, finding, corrective action, and resolved/reset state.
6. Required route-specific OG previews shipped for `/pricing`, `/security`, `/demo`, `/platform/evidence`, and `/resources`.
7. Regression checks: `npm run ci:validate`, `npm run qa`, `npm run qa:responsive-a11y`; live sitemap crawl covered 93 URLs.
8. Production deploy: product run `32627169675`; documentation sync run `32627693133`; final current-main deploy re-triggered by workflow dispatch after docs sync.

### Pricing keyboard-access closeout (2026-08-23, `0084f51`)

1. `/pricing` package-comparison table wrapper is now keyboard reachable as a named region: `role="region"`, `aria-label="Annual pricing tiers"`, `tabIndex={0}`.
2. Production deploy: GitHub Actions run `32628481367`, validate job `97167459683`, deploy job `97167550885`; Cloudflare readback verified after deploy.

### Complete legal library deployment (2026-08-24, `e62e010`)

1. `CertaMaris_All_Legal_Web_Deployment_Package_v1.0.zip` is the controlling public legal source for the marketing site.
2. The site deploys 39 unique PDFs: 7 public legal PDFs, 31 enterprise execution-template PDFs, and the complete populated master binder.
3. Seven public legal routes render complete native HTML legal text with PDF downloads: `/legal/privacy`, `/legal/terms`, `/legal/cookies`, `/legal/acceptable-use`, `/accessibility`, `/legal/subprocessors`, and `/legal/dpa`.
4. `/legal/library` exposes the complete PDF library, labels enterprise documents as execution templates, and is `noindex, nofollow`.
5. Enterprise-template PDFs and the master binder are directly accessible but served by the Worker with `X-Robots-Tag: noindex`.
6. Future legal changes must update both the native HTML source and the matching downloadable PDF in the same change.
7. Production deploy: GitHub Actions run `32681492599`, validate job `97298846724`, deploy job `97298956661`; Cloudflare Worker version `3ae144d2-8bdc-4018-b93e-c4b297b1195c`.

### Internal-admin marketing removal (2026-08-24, PR #16 -> `5bc636f`)

1. The Internal CertaMaris Admin Dashboard / Corporate Control Plane is employee-only and is not a customer module.
2. Public product IA must not market employee-only admin, internal operations, internal support access, or internal dashboard screenshots as buyer value.
3. `/platform/corporate-control-plane` is removed from generated static routes and redirected by the Worker to `/platform/client-company-portal`.
4. Active public `corporate-control-plane` product proof screenshots were deleted.
5. Public product proof now stays on client company/fleet/vessel, evidence, findings/CAPA, cybersecurity plans, reports/readiness, trust/procurement, and contact workflows.
6. Regression check: `npm run qa:public-product-boundary`, also included in `npm run qa`.
7. Preserve root OG/social path `/og/certamaris-link-preview-2026-08-v2.png`.
8. Production deploy: GitHub Actions run `32689192150`, validate job `97319662825`, deploy job `97319790456`; Cloudflare Worker version `cebd0500-53d5-4ee3-9e75-5c13b8479950`.
9. Live verification: apex 200, www 301 to apex, retired route 301 to `/platform/client-company-portal`, forbidden live-source scan clean, root OG image path unchanged and image returned `200 image/png` at `1200x630`.

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

## 4. Key code map (2026-08-23)

| Concern | Path |
|---|---|
| Nav / footer / CTAs | `components/Nav.tsx`, `Footer.tsx`, `lib/constants.ts` |
| Homepage hero | `components/HomeHero.tsx`, `app/page.tsx` |
| Lifecycle teaser | `components/AssuranceLifecycleTeaser.tsx`, `lib/assurance-lifecycle.ts` |
| Personas | `lib/personas.ts`, `components/PersonaEntry.tsx` |
| Sample record | `lib/sample-record.ts`, `components/SampleRecordExplorer.tsx` |
| Chain inspector | `components/ChainOfCustodyInspector.tsx`, `lib/sample-record.ts` |
| Demo scrub | `lib/demo-scrub.ts`, `components/DemoScrubTour.tsx` |
| Pricing calculator v2 | `components/PricingCalculator.tsx`, `lib/pricing-calculator.ts` |
| Role record paths | `components/RoleRecordPath.tsx` |
| Evidence simulator v2 | `components/EvidenceFreshnessSimulator.tsx` |
| Custody strip band | `components/CustodyStripBand.tsx` |
| Evidence chain | `components/EvidenceChain.tsx` |
| Platform landing | `app/platform/page.tsx` |
| Assurance leave-behind | `app/trust/assurance-model/page.tsx` |
| Founder | `lib/founder.ts`, `components/FounderPortrait.tsx` |
| Contact form | `components/ContactForm.tsx` |
| Buyer diligence packet | `components/BuyerDiligencePacket.tsx` |
| Legal documents | `lib/legal-documents.ts`, `components/LegalDocumentPage.tsx`, `components/LegalMarkdown.tsx`, `app/legal/*`, `app/accessibility/page.tsx`, `public/legal/documents/` |
| Worker contact + redirects | `worker/index.ts` |
| Pixel Grid | `components/PixelGridBackground.tsx` |
| Design tokens | `app/globals.css` |
| QA routes | `scripts/qa/expected-routes.mjs`, `scripts/qa/check-product-experience.mjs` |
| Public product boundary | `scripts/qa/check-public-product-boundary.mjs` |

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
2. Optional: monorepo marketing cutover decision
3. Hub memory PR when GitHub allows

---

## 8. First actions for any new agent session

1. `git checkout main && git pull origin main`  
2. Read **`docs/AGENT_MEMORY.md`** then this file  
3. `npm run ci:validate && npm run qa` (after `build:static` if needed; includes product-experience and buyer-path QA)
4. Confirm https://certamaris.com 200  
5. Only then edit — feature branch `cursor/<name>-e469` unless owner says push main  
6. Deploy only via `build:static` + `wrangler deploy --keep-vars` or CI on main  

---

## 9. Design non-negotiables

- Pixel Grid sitewide — do not reintroduce opaque hero bands without owner direction (`design/redesign-plan.md`)  
- No fake logos/metrics/certifications/survey guarantees  
- No internal admin / Corporate Control Plane as public product marketing  
- Reduced motion: near-opaque floors; `usePrefersReducedMotion()` from `lib/`  

**Preserve valid work. Do not redesign from zero.**

**Signed:** SuperGrok · 2026-08-01  
**Countersigned / updated:** Codex · 2026-08-23
