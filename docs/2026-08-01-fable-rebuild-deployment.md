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

## Seventh pass, same day — blue custody accents + light CTA (owner markup)

**Branch:** `claude/fable-blue-custody` → merged to `main` (`d833037`) ·
wrangler `a8ff00eb` · verified live (0 brass hexes in homepage HTML,
`section-surface--navy` gone from homepage).

Owner markup screenshots: (1) the brass/orange custody thread should be
the site's blue; (2) the grey-navy backdrop behind the final CTA doesn't
fit. Every brass accent swapped to the ocean family — ocean-deep
`#0E5A8A` for small mono text (7.4:1), ocean `#126FAA` for decorative
strokes (thread, nodes, rings, ping, flight chip, pin highlights). Final
CTA section: navy surface → paper, dark card → light glass, buttons
re-specced. Deviation recorded in `design/redesign-plan.md` §6 — brass
is retired as the custody color; don't bring it back without owner
direction.

## Eighth pass, same day — original Pixel Grid restored, sitewide

**Branch:** `claude/fable-pixel-grid-restore` → merged to `main`
(`115698e`) · wrangler `4ac30d1c` · verified live (single canvas,
`opacity:.92` in the served CSS, screenshot-confirmed).

Owner asked directly for the site's original animated Pixel Grid
background back. Root cause of its absence: the Phase 1 audit correctly
flagged `cdn.aidesigner.ai/effects/fx/blocky/v1.js` as an unreviewed
third-party script and it was removed outright — taking the visual
effect with it, since nothing first-party replaced it at the time. The
homepage-only `HeroPixelGrid`/`DepthContours` built in a later pass were
a different, smaller effect scoped to the hero band, not a restoration
of the original.

This pass rebuilds the original first-party: `PixelGridBackground.tsx`,
a plain 2D canvas (no WebGL, no external script) implementing the
canonical params — a 7-stop light-to-navy ramp, 72px blocks at 1.15
scale quantized to 8 levels, 24° drift, glint 0.14, contrast 1.45 — and
mounts it **once**, sitewide, in `app/layout.tsx`, restoring the
original architecture (one fixed grid behind everything, not a per-page
effect). The homepage hero's chart-navy/chart-light band — which had
been silently painting over the grid — reverted to the transparent
`.hero-section.landing-hero` pattern the CSS already carried unused
comments for. Grid visibility raised from the old 0.34 dimming to 0.92,
relying on the already-tuned Liquid Glass card system for text contrast
instead of dimming the whole layer.

Verified: exactly one canvas per page across 8 sampled routes, zero
hydration mismatches, reduced motion provably freezes to a static frame
(`canvas.toDataURL()` identical across a 1.2s window) while normal mode
provably animates (frames differ), zero axe/overflow regressions,
sample-record and image-load functional suites still pass, mobile nav
sheet confirmed as a clean rectangular panel (the "circular overlay"
concern in the owner's brief didn't reproduce — nothing to fix there).

## Ninth pass, same day — thicker custody chain + animated card borders

**Branch:** `claude/fable-chain-thickness` → merged to `main` (`83106cd`)
· wrangler `bfbf92fe` · verified live (byte-identical CSS confirmed
against the local build after an initial CDN-propagation false alarm —
see note below).

Owner markup on the evidence-chain screenshot: thicken the custody
thread and its node dots, and give every chain-card container a thin
blue line that animates around it continuously. Shipped: thread track
2px→3px, node 12px→16px with a 3.5px ring (release node's brass ring
scaled to match), desktop alternating-layout node offsets recalculated
(-52px→-54px) and verified by screenshot against the thicker geometry.
Each `.chain-card` gets a permanent ocean-tinted resting border plus a
masked conic-gradient comet that orbits the edge every 5s, staggered
per step so the ten cards don't pulse in lockstep; degrades to the
static border alone if `mask-composite` is unsupported; freezes via the
existing sitewide reduced-motion rule (verified: `animation-duration`
is provably `0s` under reduced motion, `5s` otherwise).

**Bug found and fixed along the way:** the full-route axe re-run
surfaced a real AA contrast failure (2.18:1) in the exhibit-pin
drop-in reveal from an earlier motion pass — its pre-reveal state sat
at 0.35 opacity on a text-bearing badge, which is only safe if the
IntersectionObserver fires before anything inspects it. A faster
synthetic scroll pattern in tonight's QA run raced that timing
differently than earlier crawls had and caught it. Fixed by raising the
pending-state floor to 0.96 (matching `Reveal.tsx`'s own precedent of
never dropping below near-opaque) and adding a bounded 1.5s fallback
timer so the reveal always resolves even if a real user scrolls past
the exhibit too fast for the observer and never scrolls back.

**Operational note:** the first live-verification fetch immediately
after this deploy returned a CSS chunk with the *same filename* as the
new build but stale byte content (50,757 vs the correct 59,616 bytes) —
a transient CDN-propagation gap, not a bad deploy. A second fetch ~30s
later returned `cf-cache-status: HIT` with content byte-identical
(md5-verified) to the local build. Lesson for future verification: one
fetch immediately post-deploy is not sufficient proof; re-fetch and
diff against the local build output before declaring a shipped visual
change confirmed live.

## Follow-ups (deliberate, not regressions)

- `wrangler deploy` printed "No targets deployed" (routes unchanged) —
  version uploaded and confirmed serving; nothing to do.
- Command palette trigger is desktop-nav only (Ctrl/⌘K works globally
  once mounted); consider a mobile entry point later.
- `find-404s.mjs` could be folded into `audit-crawl.mjs` if anyone wants
  URL-level 404 capture in the main crawl.
