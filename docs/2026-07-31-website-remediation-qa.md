# Website Remediation QA — Accessibility, Performance, Visual, Automation

**Repo:** `certamaris-public-website` / local `C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
**Branch:** `supergrok/website-full-remediation`  
**Date:** 2026-07-31  
**Lane:** SUBAGENT 7 (Tester) — write roots: `scripts/qa/**`, `docs/**` (QA), measurement spec, optional `package.json` scripts  

Related:

- Measurement / events: [`docs/measurement-spec.md`](./measurement-spec.md)
- Route inventory: [`scripts/qa/expected-routes.mjs`](../scripts/qa/expected-routes.mjs)
- Historic screenshots: `qa-screenshots/`
- Lighthouse JSON: `artifacts/lighthouse/`

---

## 1. Automated QA tooling

| Script | Purpose | Command |
|---|---|---|
| `scripts/qa/expected-routes.mjs` | Shared CURRENT + PLANNED IA route lists | imported by others |
| `scripts/qa/check-routes.mjs` | HTTP 200 or `out/` file presence | `npm run qa:routes` |
| `scripts/qa/check-seo.mjs` | Titles, unique title, single H1, meta/canonical warns | `npm run qa:seo` |
| `scripts/qa/check-links.mjs` | Internal href scan of `out/**/*.html` | `npm run qa:links` |
| `scripts/qa/content-qa.mjs` | Ban TODO/TBD/lorem/drafting notes/placeholders | `npm run qa:content` |
| `scripts/qa/run-all.mjs` | Sequential suite | `npm run qa` |

**Design constraints**

- Node built-ins only (`fs`, `path`, `fetch`) — no Playwright/axe/jest installs under disk pressure.
- `check-routes` defaults to `out/` when present; else `http://127.0.0.1:4173`.
- Planned IA (`/who-we-serve`, `/demo`, `/trust`, …) is **warn-only** unless `--fail-planned`.

### Expected routes (summary)

**Required (CURRENT — pages under `app/` today):**  
`/`, `/platform`, `/solutions`, `/industries`, `/compliance`, `/resources`, `/about` (+ leadership, corporate-information, partners, careers, press), `/contact`, `/security`, `/trust` (+ procurement, subprocessors, responsible-disclosure, status), `/pricing`, `/faq`, `/demo`, `/sample-platform`, `/privacy`, `/terms`, `/accessibility`, six resource articles, plus `/robots.txt`, `/sitemap.xml`, OG/brand assets.

**Planned (nav-linked depth not yet as pages):**  
`/platform/*` product modules, `/solutions/*`, `/who-we-serve/*`, `/compliance/*` depth, `/product`, `/topics`, `/glossary`, `/why-certamaris`, `/implementation`.

Keep `CURRENT_RESOURCE_ROUTES` in sync with `lib/resources.ts` slugs when articles change. Keep `CURRENT_STATIC_ROUTES` in sync with `app/**/page.tsx`.

---

## 2. Accessibility (a11y)

### 2.1 Already implemented (code review)

| Pattern | Where | Expectation |
|---|---|---|
| Skip link | `Nav` → `#main-content` | First focusable control; visible on focus |
| Main landmark | `layout.tsx` `<main id="main-content" tabIndex={-1}>` | Skip target receives focus |
| Mobile nav dialog | `Nav` sheet `role="dialog"` `aria-modal` | Escape closes; focus trap on Tab; focus moves to Close on open; restore to menu button on close |
| Body scroll lock | Mobile sheet open | Scroll position restored on close |
| Company menu | Desktop dropdown | Escape closes; focus returns to Company button |
| Reduced motion | `PixelGridBackground` + `use-prefers-reduced-motion` | Aidesigner runtime **not** loaded when reduced motion preferred |
| Form errors | `ContactForm` | Focus first invalid field; labeled inputs |
| Language | `<html lang="en">` | Present |

### 2.2 Keyboard / focus checklist (manual)

Run after major Nav/form changes. Desktop + mobile widths.

1. **Tab order (desktop)**  
   - Skip link → logo → primary nav → company control → Sign in → primary CTA → main content → footer.  
   - No focus dead-ends; focus ring visible (`:focus-visible` styles not removed).

2. **Skip link**  
   - Tab once from load → “Skip to main content” visible → Enter → focus in `#main-content`.

3. **Desktop company menu**  
   - Enter/Space opens; Arrow/Tab reaches items; Escape closes and returns focus to button; click-outside closes.

4. **Mobile menu (≤ lg)**  
   - Open via menu button (`aria-expanded` true).  
   - Focus lands on Close.  
   - Tab cycles only inside sheet.  
   - Escape / backdrop / link click closes; focus returns to menu button.  
   - Background not scrollable while open.

5. **Contact form**  
   - All fields reachable; errors announced via text near fields (and `aria-invalid` if present).  
   - Submit error/success is keyboard-discoverable.  
   - Honeypot field not in tab order / visually hidden.

6. **Disclosure / accordion (FAQ)**  
   - Buttons toggle panels; Enter/Space; state reflected for AT (`aria-expanded`).

7. **Product screens / motion**  
   - With OS “reduce motion”: no parallax dependency for content; decorative canvas absent or static.

8. **Contrast**  
   - Body text on liquid-glass / navy wash meets ~4.5:1 for normal text (spot-check hero, badges, footer).

9. **Images**  
   - Product/marketing images have meaningful `alt` or empty alt if pure decoration.  
   - OG/brand not missing alt on content images.

10. **404**  
    - Reachable heading; link home; same chrome a11y as other pages.

### 2.3 axe / automated a11y

**Recommendation under disk pressure:** do **not** add `@axe-core/playwright` or full Playwright to this repo until disk/CI budget allows.

| Option | When |
|---|---|
| **Browser extension** axe DevTools / WAVE | Local PR review on changed templates |
| **Lighthouse accessibility** | Use existing `artifacts/lighthouse/*.json` pattern; re-run Chrome Lighthouse on preview |
| **Future CI** | Optional `playwright` + `@axe-core/playwright` in a separate lightweight job when `node_modules` budget allows |

**Manual axe pass targets:** `/`, `/platform`, `/contact`, `/resources/[slug]`, `/pricing`, mobile nav open state.

### 2.4 WCAG-oriented acceptance (marketing bar)

- Perceivable: text alternatives, contrast, no information by color alone on StatusBadge.  
- Operable: keyboard, no keyboard trap outside intentional dialog trap, skip link.  
- Understandable: `lang`, consistent nav, form labels.  
- Robust: valid landmark structure, button/link roles not faked without keyboard support.

---

## 3. Performance

### 3.1 Architecture (already favorable)

| Practice | Implementation |
|---|---|
| Static export | `STATIC_EXPORT=true next build` → `out/` |
| Edge delivery | Cloudflare Worker `certamaris-site` (`worker/index.ts`) |
| HTML cache | `max-age=0, must-revalidate` (fresh HTML) |
| Hashed assets | `_next/static` → long-cache immutable |
| Brand/product media | `public/brand/optimized/*.webp`, `public/product/optimized/*.webp` |
| Fonts | `next/font` (Inter, Space Grotesk, IBM Plex Mono) — self-hosted subset |
| Heavy visual script | Aidesigner only after interactive + motion OK |

### 3.2 Practices to preserve

1. Prefer **WebP** optimized product shots; avoid shipping multi‑MB PNG in critical path.  
2. Keep **above-the-fold** JS small; do not load analytics SDKs that block hydration.  
3. Lazy-load below-fold carousels/images where Next/Image or native `loading="lazy"` applies.  
4. Do not re-introduce mini-PC origins or non-edge API calls on marketing pages.  
5. Guard third-party scripts with CSP (`worker/index.ts` report-only list).  
6. Avoid layout thrash from PixelGrid — `pointer-events-none`, fixed background.

### 3.3 Measurement procedure (Lighthouse)

Existing artifacts:

```
artifacts/lighthouse/home-final.json
artifacts/lighthouse/home-vanta-final.json
artifacts/lighthouse/platform-final.json
artifacts/lighthouse/article-imo-final.json
…
```

**Re-run (local preview):**

```bash
npm run build:static
npx --yes serve out -l 4173
# Chrome DevTools → Lighthouse → Mobile + Desktop
# Save JSON to artifacts/lighthouse/<page>-<date>.json
```

**Targets (guidance, not fabricated SLAs):**

| Metric | Guidance |
|---|---|
| LCP | Prefer &lt; 2.5s on mid mobile on production CF edge |
| CLS | &lt; 0.1 (watch fonts + hero image dimensions) |
| INP / TBT | Keep third-party (Aidesigner, CF insights) non-blocking |
| Transfer | Watch product PNG vs webp set |

Compare new JSON to `*-final.json` baselines when visual/hero changes land.

---

## 4. Visual regression

### 4.1 Existing corpus

`qa-screenshots/` already holds desktop/mobile (and scrolled) captures:

- home, platform, solutions, industries, compliance, resources, about, security, pricing, contact, faq, privacy, terms, accessibility  
- special: homepage-redesign-*, pixel-grid-*, platform product anchors, mobile contact sheet  

`crawl-results.json` / `crawl-results-scrolled.json` store status, title, H1, dimensions, console errors from prior crawls.

### 4.2 Procedure without Playwright

If Playwright is unavailable:

1. `npm run build:static` && static server on `4173`.  
2. Chrome device toolbar: **1440×1100** (desktop) and **390×844** (mobile).  
3. For each route in §4.3: full-page screenshot (or viewport + scrolled).  
4. Save as `qa-screenshots/desktop-<name>.png` / `mobile-<name>.png` (match existing naming).  
5. Diff manually or with OS image compare; flag liquid-glass, nav sheet, hero text overflow, footer collisions.  
6. Optional: append metrics to a new `qa-screenshots/crawl-results-<date>.json` using the same schema as `crawl-results.json`.

### 4.3 Minimum shot list (remediation)

| Viewport | Routes |
|---|---|
| Desktop + mobile | `/`, `/platform`, `/solutions`, `/industries` or `/who-we-serve`, `/compliance`, `/resources`, `/pricing`, `/security` or `/trust`, `/contact`, `/demo` (when live) |
| Mobile only | Nav **open** sheet on `/` |
| Desktop only | Company dropdown open (optional) |

### 4.4 Pass criteria

- No overlapping text/controls.  
- Nav readable on glass background.  
- Product screens not cropped incorrectly at breakpoints.  
- Legal pages retain readable measure width.  
- No console errors in crawl metadata.

---

## 5. Content / SEO / link gates

```bash
npm run qa:content    # source placeholders
npm run build:static  # when disk allows
npm run qa:routes     # out/ or --base
npm run qa:seo
npm run qa:links
npm run qa            # all of the above that can run
npm run typecheck
```

**Known content-qa risk:** Privacy copy historically contained “If a specific provider is enabled later…” — that string is **banned** by `content-qa.mjs`. Trust/legal agent should replace with concrete disclosure or remove the hedge before ship.

---

## 6. Typecheck & build policy

| Command | When |
|---|---|
| `npm run typecheck` | Every PR / agent batch that touches TS |
| `npm run build:static` | After IA/pages stabilize; orchestrator gate before deploy |
| `npm run ci:validate` | Full audit + typecheck + static build (CI) |

Concurrent multi-agent edits may break typecheck mid-flight — re-run at integration.

---

## 7. Orchestrator integration notes

1. Do not deploy on QA failures for **required** routes, SEO H1/title, broken internal links, or content placeholders.  
2. Planned routes may warn until Subagents 3–6 land pages.  
3. After deploy: `node scripts/qa/check-routes.mjs --base https://certamaris.com --include-planned`.  
4. Keep secrets out of repo; contact forward endpoint is env-only.

---

## 8. File index (this lane)

```
scripts/qa/expected-routes.mjs
scripts/qa/lib.mjs
scripts/qa/check-routes.mjs
scripts/qa/check-seo.mjs
scripts/qa/check-links.mjs
scripts/qa/content-qa.mjs
scripts/qa/run-all.mjs
docs/measurement-spec.md
docs/2026-07-31-website-remediation-qa.md
```

**Signed:** SUBAGENT 7 · Tester · 2026-07-31
