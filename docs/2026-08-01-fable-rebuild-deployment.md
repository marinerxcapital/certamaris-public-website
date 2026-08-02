# 2026-08-01 — Fable rebuild pass (Phase 1 fixes + chart-navy redesign)

**Agent:** Claude Code (Fable 5) · session restarted once mid-build and resumed
**Branch:** `claude/fable-phase1-redesign` → merged `--no-ff` to `main` (`74d450e`)
**Deployed:** `wrangler deploy --config wrangler.jsonc --keep-vars` · version `aed13bc0-cdf2-4442-8cb3-1c14b2ce11ca`
**Verified live:** https://certamaris.com serving the new build (hero-chart / palette / chain markers confirmed on cache-busted fetches; edge HTML cache rolls within s-maxage=300)

## What shipped

Driven by `CERTAMARIS-FABLE-BUILD-PROMPT.md` (Skyler's desktop). Design source
of truth: **`design/redesign-plan.md`** — read it before touching the token
layer or the chain component.

### Phase 1 (audit remediation) — verified, mostly pre-resolved

Most of the 13-item audit list was already fixed on `main` by prior Codex
passes. Verified each against code rather than trusting docs. New in this
pass: wordmark `alt="CertaMaris"` restored in `BrandLogo` (mark stays
decorative), Tailwind `status.caution` synced to `#94610B` (4.72:1). Confirmed
already-resolved: enforcing CSP (worker), aidesigner script gone, NIST SP
800-82 URL current, `Reveal as="li"` list semantics, pricing quiz labels,
`/industries` 301 (worker) + out of sitemap, meta/title lengths 0 violations,
unified edge HTML caching.

### Phase 2 (redesign)

- **Chart-navy hero band** (`--surface-chart #07223D`) with static
  depth-contour SVG (`DepthContours`), AA-verified CTAs, mono
  `01 REQ → 10 PKG` pointer into the chain.
- **Signature element — `EvidenceChain`**: brass custody thread that draws
  itself on scroll through the ten real chain steps from
  `lib/product-hierarchy.ts`. `variant="spine"` (homepage
  `#evidence-chain`), `variant="strip"` (compact, on `/platform` and
  `/why-certamaris`, replacing plain-text trace lines). Reduced motion →
  fully drawn, static.
- **Command palette** (Ctrl/⌘+K), first-party, ARIA combobox over the nav
  IA constants; trigger in the desktop nav.
- **Showcase**: real ARIA tabs (roving tabindex, arrow keys) with
  directional slide+fade stage transitions + stage progress indicator.
- **Ledger route labels**: `LedgerRoute` auto-derives a mono route label
  (e.g. `PLATFORM · EVIDENCE`) in every `PageHero` from the URL.

## QA evidence

- `audit/before/` and `audit/after/` (gitignored, local): full-page
  screenshots of all 90 sitemap routes at 1440×900 + 390×844, axe-core
  results, console errors. **After: 0 axe violations, 0 horizontal
  overflow on all 90 routes.**
- Console "errors" in local crawls are static-serve artifacts (RSC `.txt`
  prefetches + `/api/status`) — identical set in the before baseline;
  see `scripts/qa/find-404s.mjs`.
- `npm run qa` (links 7226 ✓, founder ✓), typecheck ✓, `build:static` ✓,
  worker + contact tests ✓, meta lengths 0 over limit.
- Live post-deploy: `/solutions*` TTFB 110–175ms with `cf-cache-status:
  HIT` (audit had 600–1700ms), `/industries` → 301 `/who-we-serve`,
  enforcing CSP header intact.

## Deviations from the build prompt

Logged in `design/redesign-plan.md` §6 — notably: thread starts at an
anchor pointer in the hero rather than physically crossing the
navy→light boundary; ledger labels derived from URL instead of per-page
props; light/dark mode pass deferred deliberately.

## Follow-up pass, same day — hero motion restore + exhibit replacement

**Branch:** `claude/fable-hero-exhibit-fix` → merged to `main` (`8a1f7cb`) ·
deployed wrangler version `1b766504-008a-4453-ae31-edcdcc2fa01e` · verified
live (pxl-cell markers on `/`, 18 exhibit headers on `/demo`, zero
lightbox remnants).

1. **Hero motion restored, first-party** (`HeroPixelGrid`): deterministic
   pixel-cell scatter in sounding blue pulsing on 6–16s desynced periods —
   SVG + CSS keyframes, no script, no CSP change, density reduced behind
   the headline. Reduced motion freezes at base opacity. Brightest frame
   keeps white text ≥9.8:1. Frame-time probe (`scripts/qa/perf-hero.mjs`)
   showed no measurable cost vs animation-off (both pinned at the headless
   30Hz cap). This replaces the third-party aidesigner blocky effect that
   was removed in the audit cleanup.
2. **Lightbox → annotated exhibit panels** (`ProductScreens.tsx`, −172
   lines): direction chosen was the *static inline exhibit* (the brief's
   recommended direction, taken to its simplest form) — `Exhibit · <label>`
   header, aspect-correct inline image, numbered callout pins + visible
   caption list, "Full resolution" link for native zoom. No modal, no zoom
   bar, no pagination, no client state; the component is now
   server-rendered. Reasoning: expand-in-place added state and layout
   shift for little gain since tiles already render aspect-correct at cell
   width, and grid parents are wrapped in `Reveal` divs that break
   `grid-column` spans.
3. **`/demo` broken thumbnails**: could not reproduce the stall against
   live (assets all 200), but the fragile client path is gone with the
   lightbox rebuild. Verified on production post-deploy:
   `check-demo-images.mjs --base https://certamaris.com` → 49/49 images
   `naturalWidth > 0` across `/demo`, `/platform`, `/compliance`,
   `/security`, `/solutions`, `/resources`.
4. **QA:** full re-crawl (`audit/after-exhibit/`, gitignored): 0 axe
   violations, 0 horizontal overflow on all 90 routes. Crawl now scrolls
   before screenshots so lazy images appear in evidence captures (the
   "blank panels" in earlier audit screenshots were capture artifacts).
   Note the edge serves `stale-while-revalidate` copies for up to a day —
   when verifying a deploy, fetch twice or check for markers, don't trust
   the first response.

## Third pass, same day — inspectable sample record on the landing page

**Branch:** `claude/fable-sample-record` → merged to `main` (`71b6e9c`) ·
wrangler version `a513b21c-21b6-43d3-9fea-7f44495590f0` · verified live
(markers on second fetch per the SWR gotcha, plus the full functional
check run against production — all passed).

`SampleRecordExplorer` (+ `lib/sample-record.ts`): one illustrative
end-to-end chain instance for the sample vessel **MV Certa Maris**
(self-referential name chosen to avoid any real-entity collision),
REQ-0104 → PKG-0067, in a new homepage section `#sample-record` directly
after the evidence-chain visualizer. Visitors click through the ten
linked records — each with sample fields, status, owner, and cross-link
buttons that jump between records with focus handoff. ARIA tabs pattern,
reduced-motion static swaps, every value labeled illustrative (no
customer data, no invented metrics, no fabricated clause numbers —
regulatory references name the instrument only). QA:
`check-sample-record.mjs` drives it headlessly (local + live); full
crawl `audit/after-sample/` — 0 axe violations, 0 overflow, all 90
routes.

## Fourth pass, same day — signed founder note on the landing page

**Branch:** `claude/fable-founder-note` → merged to `main` (`ef034d3`) ·
wrangler version `e318282f-b21d-4e63-b52d-5e5fa5c62a28` · verified live
(note, signature line, and portrait markers on second fetch).

First-person "Why I built this" note from Skyler Brown on the homepage,
placed between the compliance/implementation content and the trust
boundary note. Every claim traces to the approved bio in
`lib/founder.ts` (do-not-invent file); reuses `FounderPortrait`; printed
signature block naming the credential (Third Mate, Unlimited Tonnage,
Oceans); links to /about/leadership. Homepage-targeted axe + overflow
check: 0/0 both viewports; `qa:founder` suite passes.

## Fifth pass, same day — motion pass ("instrumentation, not decoration")

**Branch:** `claude/fable-motion-pass` → merged to `main` (`f356918`), plus
follow-up `e51209c` directly on main · wrangler versions `8b127fdc` then
`bb81279c` · verified live (pins/segments/drift markers + production
functional check passed).

Three motion layers, all frozen to designed static frames under
`prefers-reduced-motion`, no loops except ambient texture:

1. **Functional:** exhibit pins set once on first view (staggered drop)
   and hover-link both ways with caption rows; sample-record cross-links
   fly the mono id chip from link to card header (WAAPI, 340ms);
   selections emit a single AIS-style acknowledgment ring (after first
   interaction only).
2. **Ledger stamps:** chain-step mono indices press on as steps dock;
   the Released-package node's brass ring is stamped on when reached.
3. **Ambient:** dashed safety-contours crawl at 90s/130s opposing
   periods; the hero `01 REQ → 10 PKG` pointer runs a brighten-only
   signal down its segments every 9s (contrast never below base; hover
   pauses).

Also fixed en route: the exhibit annotation system had never rendered —
the `annotations` field existed but no screen defined pins. Added three
claim-safe, position-verified callouts each to requirement-mapping and
evidence-coverage. QA: axe + overflow clean on touched routes both
viewports; sample-record and image-load functional checks pass locally
and against production.

## Sixth pass, same day — light hero + landscape proof (owner direction)

**Branch:** `claude/fable-light-hero` → merged to `main` (`91c96ab`) ·
wrangler `5a5846c6` · verified live (139 pxl-cells, executive-readiness
exhibit markers).

Owner feedback: the hero's portrait requirement-mapping capture made the
proof panel absurdly tall (full app sidebar scrolling on mobile), and
the site should read **light** with the animated pixel grid emphasized.
Changes: the chart band flipped navy→white/paper gradient with navy
type; pixel cells + contours now inherit `--hero-grid-ink` (ocean on
light, components stay theme-agnostic); cell density raised outside the
copy zone (0.16→0.24, big-cell 0.22); chain-pointer signal became
darken-only brass; hero proof swapped to the landscape 1440×1100
executive-readiness dashboard. Navy text ≥10:1 over the brightest cell
frame; axe + overflow 0/0 both viewports. **Design note for future
passes: the dark register is gone from the hero — extend the light chart
language, don't reintroduce navy bands without owner direction.**

## Follow-ups (deliberate, not regressions)

- `wrangler deploy` printed "No targets deployed" (routes unchanged) —
  version uploaded and confirmed serving; nothing to do.
- Command palette trigger is desktop-nav only (Ctrl/⌘K works globally
  once mounted); consider a mobile entry point later.
- `find-404s.mjs` could be folded into `audit-crawl.mjs` if anyone wants
  URL-level 404 capture in the main crawl.
