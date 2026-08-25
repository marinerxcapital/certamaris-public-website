# CertaMaris — Public Marketing Website

Maritime cyber compliance and assurance software for fleet-scale operators.
This repository is the complete, standalone marketing website — real,
ownable Next.js/React/TypeScript source, not a design-tool export. It is
built to stand on its own and to later link out to the authenticated
CertaMaris application (being built separately in Lovable) through four
clearly labeled integration points.

## Production source of truth (verified 2026-08-24)

| Item | Value |
|---|---|
| **This repo** | **Live SoT** for https://certamaris.com |
| **Branch** | **`main`** only for production |
| **Worker** | Cloudflare `certamaris-site` (`wrangler.jsonc`) |
| **App** | Separate: https://app.certamaris.com |
| **Agent memory (START HERE)** | [`docs/AGENT_MEMORY.md`](docs/AGENT_MEMORY.md) |
| **Codex handoff** | [`docs/CODEX_MARKETING_TAKEOVER.md`](docs/CODEX_MARKETING_TAKEOVER.md) |
| **Latest deploy note** | [`docs/2026-08-24-ux-accessibility-audit-fix-deployment.md`](docs/2026-08-24-ux-accessibility-audit-fix-deployment.md) |
| **Latest production change** | UX/accessibility audit fix `46f0370`; previous sitewide professionalism upgrade `04de3aa` (PR #18) |
| **Latest UX pass** | UX/accessibility audit fix `46f0370`; previous product experience upgrade `dfb009f` plus pricing table keyboard-access closeout `0084f51` |
| **Link-preview code commit** | `190533a` - link-preview branding fix (PR #9); prior feature content `df5f174` (PR #6) |

**Signed:** Cursor Cloud Agent · **Date:** 2026-08-16 (supersedes SuperGrok 2026-08-01 tip line)

### Not live (do not deploy marketing from these)

| Path | Status |
|---|---|
| Hub `01_product/marketing` | **STALE** |
| Monorepo `apps/marketing` | Import/snapshot only until **owner cutover** |

Canonical product monorepo (SPA/API, not live marketing): https://github.com/marinerxcapital/certamaris

---

## 1. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.12 (App Router, Turbopack) |
| UI | React 19 |
| Language | TypeScript 5.7 (strict mode) |
| Styling | Tailwind CSS 3.4, custom design tokens in `app/globals.css` |
| Foreground motion | CSP-safe CSS/React class reveals plus restrained product-adjacent microinteractions |
| Background treatment | AI Designer Pixel Grid runtime loaded once from `app/layout.tsx` |
| Fonts | Space Grotesk (display), Inter (body), IBM Plex Mono (data/labels) — via `next/font/google` |
| Hosting target | Cloudflare Workers with static assets through `wrangler.jsonc` |
| Node | 22+ |

No CMS, no headless backend, no external UI kit. Content lives in typed
files under `lib/`, making it trivial to wire up a real CMS later without
touching page layout code.

---

## 2. Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run typecheck   # tsc --noEmit
npm run build       # production build (Node/server target)
npm run build:static # static export build (writes to /out)
npm run start        # serve the production build locally
npm run qa:buyer-paths # static-export guard for the buyer diligence path
npm run qa:excellence # static-export guard for high-intent buyer readiness surfaces
npm run qa:product-experience # browser guard for lifecycle, chain, pricing, persona, and evidence journeys
npm run qa:public-product-boundary # generated-HTML guard against internal admin marketing leaks
npm run qa:ux-audit # browser guard for CSP, anchors, overflow, product exhibits, and axe
npm run qa:lighthouse # Lighthouse smoke for key marketing routes
```

---

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill in what's known:

```bash
cp .env.example .env.local
```

See `.env.example` for full documentation of each variable. In short:

- `NEXT_PUBLIC_SITE_URL` — canonical domain, used in metadata/sitemap/OG tags.
- `NEXT_PUBLIC_APP_SIGN_IN_URL`, `NEXT_PUBLIC_APP_GET_STARTED_URL` — where
  the nav's "Sign in" / "Get started" links point once the Lovable app has a
  real URL.
- `NEXT_PUBLIC_APP_SALES_EMAIL` — the mailto fallback on the Contact page.
- `CONTACT_FORWARD_ENDPOINT` (server-only) — where `/api/contact` forwards
  validated submissions, for Node/Vercel deployments.
- `NEXT_PUBLIC_CONTACT_ENDPOINT` (client-callable) — an alternative delivery
  target the browser POSTs to directly, for static-export deployments where
  `/api/contact` doesn't exist at all (see §5).

None of these need to be set for the site to build and run — every one has
a safe fallback, and the contact form is honest about not delivering
anywhere until one of the two forwarding variables is actually configured.

---

## 4. Integration points — connecting the future Lovable application

Grep the codebase for `INTEGRATION POINT` to find all four seams:

| Element | File | Behavior today | Behavior once configured |
|---|---|---|---|
| "Sign in" link | `components/Nav.tsx` | Points to `https://app.certamaris.com/auth/login`, the app's real login route | Override with `NEXT_PUBLIC_APP_SIGN_IN_URL` if the route changes |
| "Get started" button | `components/Nav.tsx` | Points to this site's own `/contact` page (no self-serve app signup route exists) | Set `NEXT_PUBLIC_APP_GET_STARTED_URL` if self-serve signup ships |
| "Book a demo" | Throughout, routes to `/contact` | Full on-page form, validated, no scheduling embed | Add a scheduling embed (Calendly-style) into the Contact page and/or set `NEXT_PUBLIC_APP_SCHEDULING_URL` |
| "Contact Sales" | `app/contact/page.tsx` | `mailto:` link using `NEXT_PUBLIC_APP_SALES_EMAIL` | Update the env var once a real sales inbox is confirmed |

None of these require a code change to reconnect — only environment
variables, except for the scheduling embed itself (a small, isolated
addition to `app/contact/page.tsx` once a provider is chosen).

---

## 5. Deployment

### Production: Cloudflare Workers

Production for `certamaris.com` is deployed from the static export through
`worker/index.ts` and `wrangler.jsonc`:

```bash
npm run build:static
wrangler deploy --config wrangler.jsonc --keep-vars
```

The GitHub Actions workflow in `.github/workflows/ci-deploy.yml` validates
pull requests and deploys pushes to `main` after the Cloudflare repository
secrets are present.

**If Validate fails in ~3–12s with empty steps**, that is org **Actions billing /
spending limit**, not site code. See `docs/ci-billing.md`. Local parity:

```bash
npm run ci:validate   # audit + typecheck + build:static
```

### Alternate static hosts

The site can also ship as a fully static export for non-production preview or
fallback hosting:

```bash
npm run build:static   # writes to /out
```

Deploy the `/out` directory to Netlify, Cloudflare Pages, GitHub Pages, S3,
or any static file host. **Important:** static export does not include the
`/api/contact` route (API routes require a Node runtime). Before building,
set `NEXT_PUBLIC_CONTACT_ENDPOINT` to a publicly callable endpoint (a hosted
form backend, webhook, or serverless function you control) that accepts a
JSON body of `{ name, email, company, fleetSize, message }` — the contact
form will POST to it directly from the browser instead of the local API
route. Without this set, the static-exported form still validates input
correctly but has nowhere to send it.

A `netlify.toml` and `vercel.json` remain in the tree only as alternate host
configuration references. Cloudflare Workers is the canonical production path.

---

## 6. Project structure

```
app/
  layout.tsx              Root layout: fonts, metadata, Nav, Footer, JSON-LD
  page.tsx                Home
  platform/               Platform overview
  solutions/              5 deep-anchor solution sections
  industries/             5 deep-anchor industry sections
  compliance/             IMO / IACS UR E26 & E27 plain-language overview
  resources/              Article index + [slug] detail pages (6 launch articles)
  about/  contact/  security/  pricing/  faq/
  legal/privacy/  legal/terms/  legal/cookies/  legal/acceptable-use/
  legal/subprocessors/  legal/dpa/  legal/library/
  privacy/  terms/  accessibility/
  not-found.tsx           Custom 404
  sitemap.ts  robots.ts
  api/contact/route.ts    Server-side form handler (Node deployments only)

components/               Nav, Footer, Button, Section, PageHero, Reveal,
                           AssuranceGraph, PixelGridBackground, CapabilityCard,
                           PersonaCard, ProcessStepList, StatusBadge, Counter,
                           FaqAccordion, ArticleCard, ContactForm, BoundaryPanel,
                           PricingCalculator, ChainOfCustodyInspector,
                           EvidenceFreshnessSimulator

lib/                      constants.ts, content.ts, solutions-industries.ts,
                           resources.ts, metadata.ts, pricing-calculator.ts,
                           sample-record.ts, use-prefers-reduced-motion.ts

public/
  brand/                  Logo mark, full lockup, favicons (derived from
                           the approved CertaMaris brand assets)
  legal/documents/        Public PDFs, execution templates, and master binder
  og/                     Versioned Open Graph social image
```

Internal CertaMaris employee/admin tooling is not a client-facing public product module. Public product IA must stay focused on client company, fleet, vessel, evidence, findings, corrective actions, cybersecurity plans, reports/readiness, trust, procurement, legal, and contact workflows. Do not restore `/platform/corporate-control-plane` as public marketing content.

The current visual baseline is a restrained professional SaaS system: lower-noise Pixel Grid, flatter Liquid Glass surfaces, 8px glass radius, tighter buttons, no negative letter spacing, unframed page-hero copy, and stronger screenshot/product-proof framing. Keep future page work aligned with the 2026-08-24 sitewide professionalism upgrade rather than restoring oversized translucent hero cards or high-opacity grid backgrounds.

The public marketing site includes complete native legal pages for Privacy,
Business Terms, Cookie Notice, Acceptable Use, Accessibility, Subprocessors,
and DPA. `/legal/library` exposes the complete PDF legal library with
execution templates clearly labeled as unsigned templates. `/privacy` and
`/terms` remain compatibility helpers for the canonical legal pages.

---

## 7. Background system and professional readability bar

The site uses a restrained first-party background treatment. Content stays
readable through translucent professional panels — not by stacking extra
background systems or loading third-party visual runtimes.

| Item | Value |
|---|---|
| Runtime | None — no third-party visual script is loaded in production |
| Layering | Content shell remains `relative z-10` |

**Readability bar (professional panels):** section shells stay transparent so
the grid shows through. Dense copy sits on translucent surfaces —
`legal-panel` / `article-panel` for long-form reading, `boundary-panel` for
regulatory standing, premium cards for indexes, sticky frosted nav, and a
solid navy footer for link contrast. FAQ, compliance-adjacent pages, and
resource articles keep an explicit regulatory boundary (`BoundaryPanel`).

See `docs/2026-07-30-pixel-grid-params-visibility-deployment.md`.

Previous decorative background systems were removed from the live source:
hero video, WebP atmospheric assets, Silk/WebGL, Three.js, and motion-field
overlays. Reduced-motion users get a stable non-animated page background
(`display: none` on the Pixel Grid host).

---

## 8. Motion system and a bug worth knowing about

Motion is intentionally restrained: scroll-triggered reveals on section
entry, a numbered process sequence, animated counters for a few
structurally-honest figures, hover microinteractions on cards/buttons, and
the animated Assurance Graph SVG motif. All of it respects
`prefers-reduced-motion` globally.

**During QA, a real bug was found and fixed:** framer-motion's own
`useReducedMotion()` hook proved unreliable in this stack — it returned
`false` in some renders even when the browser correctly reported
`prefers-reduced-motion: reduce` via `matchMedia` directly, which left
several sections (the Contact page's "What to expect" column and form, most
visibly) permanently stuck at `opacity: 0`. The fix was to stop relying on
framer-motion's hook and use a small direct `matchMedia`-based hook instead
(`lib/use-prefers-reduced-motion.ts`), which is what every `Reveal`,
`RevealGroup`, `AssuranceGraph`, and `Counter` instance uses now. Verified
via computed-style inspection (not just visual spot-checking) on every page
under both motion settings before and after the fix — see §9.

If you extend the motion system further, use
`usePrefersReducedMotion()` from `lib/use-prefers-reduced-motion.ts` rather
than reaching for framer-motion's own hook again.

**2026-08-24 CSP audit update:** production CSP blocks inline styles. The
current `Reveal` / `RevealGroup`, product exhibit annotations, and evidence
chain motion are class-driven and do not depend on Framer inline transform or
opacity styles. Preserve that pattern for public pages.

---

## 9. QA performed

Latest production UX/accessibility audit fix (`46f0370`) was validated with
`npm run typecheck`, `npm run test:pricing`, `npm run build:static`,
`npm run qa`, `npm run ci:validate`, `npm run qa:responsive-a11y`,
`npm run qa:ux-audit`, `npm run qa:lighthouse`, static route checks,
wrangler dry-run, production browser QA, production route crawl, and live
sitemap crawl. See
`docs/2026-08-24-ux-accessibility-audit-fix-deployment.md`.

- `tsc --noEmit` — clean.
- `next build` (Node target) — clean, all 15 top-level routes + 6 resource
  articles pre-rendered.
- `next build` with `STATIC_EXPORT=true` (Netlify target) — clean, 16 HTML
  pages + 6 article pages exported, `/api/contact` correctly excluded.
- Automated crawl of all 15 pages (plus one dynamic article page and one
  intentionally-missing route) at 1440px checking HTTP status, zero
  horizontal overflow, and console errors — all pass, 404 confirmed for
  unknown routes.
- Same crawl repeated at 390px (mobile) and 768px (tablet) — zero overflow
  on every page.
- Full sweep of every page under both normal and `reduced-motion: reduce`
  settings, checking for any element stuck at `opacity: 0` on load without
  scrolling — clean under reduced motion everywhere (post-fix); normal
  motion correctly shows below-the-fold content hidden until scrolled into
  view (intended behavior, verified to resolve correctly on scroll).
- Manual visual review of Home, Platform, Solutions, Security, Contact, and
  FAQ at desktop and mobile widths.
- Logo/favicon asset re-derived after an initial bounding-box crop bug
  (anti-aliasing noise was throwing off a naive alpha bbox) produced an
  oversized transparent canvas.

---

## 10. Content and copy sourcing

All persuasive and product copy was written fresh for this brief — no
fabricated customers, testimonials, certifications, user counts, or public
pricing figures anywhere on the site (`lib/content.ts`, `lib/resources.ts`,
`lib/solutions-industries.ts`). The Security & Trust page explicitly
separates current, planned, and configurable controls rather than rounding
up. The Pricing page is a qualification path, not an invented price list.

Regulatory descriptions of IMO Resolution MSC.428(98) and IACS UR E26/E27
are accurate at a plain-language overview level and are paired with an
explicit, reusable disclaimer (`components/BoundaryPanel.tsx`) on every
page that references them — this is not legal or regulatory advice, and
qualified human review is required for applicability determinations.

The August 23, 2026 `CertaMaris_All_Legal_Web_Deployment_Package_v1.0.zip`
is the controlling legal publication source for the public website. Future
legal changes must update both the native HTML route text and the matching
downloadable PDF in `public/legal/documents/` so the two surfaces do not
drift.

---

## 11. Owner decisions not invented

The following remain bounded rather than fabricated:

- Customer-specific parties, order terms, signatures, transaction-specific
  transfer particulars, and similar execution fields are completed only when
  the applicable enterprise template is executed. The public website labels
  those documents as templates and does not represent them as signed
  instruments.
- Specific leadership names/credentials on `app/about/page.tsx`.
- Formal third-party certifications (SOC 2, ISO 27001) — marked "Planned"
  on `app/security/page.tsx`, not claimed as current.
- Analytics provider (none wired up; add one deliberately, with its privacy
  disclosure updated in `app/legal/privacy/page.tsx` once approved facts exist).
- Contact form delivery target — see §3 and §5.

---

## 12. Dependencies

```
next            16.2.12
react           19.0.0
react-dom       19.0.0
framer-motion   12.42.2
tailwindcss     3.4.17  (dev)
typescript      5.7.3   (dev)
wrangler        4.114.0 (dev)
```

Minimal by design — no UI kit, no animation library beyond framer-motion,
no WebGL background package, no analytics SDK pre-installed.

---

## 13. Source control and production deployment

The authoritative public marketing repository is:

```text
https://github.com/marinerxcapital/certamaris-public-website
```

Production is deployed to Cloudflare Workers through `wrangler.jsonc`:

```powershell
npm.cmd ci
npm.cmd audit --omit=dev --audit-level=high
npm.cmd run typecheck
npm.cmd run build:static
wrangler.cmd deploy --config wrangler.jsonc --keep-vars
```

GitHub Actions workflow:

```text
.github/workflows/ci-deploy.yml
```

Local CI parity (mirrors the validate job):

```bash
npm run ci:validate
npm run qa
npm run qa:link-preview
```

If hosted jobs never start (empty steps, ~3–12s), fix org billing first:
https://github.com/organizations/marinerxcapital/settings/billing — details in
`docs/ci-billing.md`. Production can still ship with the local Wrangler path above.

Required repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

As of 2026-08-24, the GitHub Actions workflow can deploy to Cloudflare Workers from `main`. Do not print, copy, or replace repository secrets unless explicitly authorized.
