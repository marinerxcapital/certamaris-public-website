# CertaMaris marketing redesign plan — 2026-08-01 (Fable pass)

Working plan required by the Phase 2 brief: tokens first, critique, then build.
Everything built in this pass derives from this file. Deviations are logged at
the bottom.

---

## 1. Where the design stands today (extracted, not assumed)

- **Palette (globals.css / tailwind.config):** navy `#061E36`, ocean
  `#126FAA` (+ light `#4FADE0`, wash `#E7F3FB`), paper `#F5F8FA`, brass
  `#B8823A`, status greens/ambers/reds. All-light pages, liquid-glass
  translucent panels over a subtle first-party background.
- **Type:** Space Grotesk (display), Inter (body), IBM Plex Mono
  (labels/data) via `next/font/google`.
- **Signature today:** a small abstract `AssuranceGraph` SVG (8 nodes, 10
  edges) and mono eyebrow labels. Pleasant, but abstract — it doesn't *say*
  anything about the product.
- **Verdict per the brief:** competent SaaS template. The bones (three-face
  type system, honest copy, disciplined status colors) are right. The page
  doesn't yet *show* the one thing the product is: an unbroken, inspectable
  chain from requirement to released package.

## 2. Token system

### 2.1 Color — evolve the navy identity, don't discard it

| Token | Hex | Rationale |
|---|---|---|
| `--ink-primary` (navy ink) | `#061E36` | Kept. Existing brand ink; body copy on light passes AA everywhere it's used today. |
| `--surface-chart` (chart navy) | `#07223D` | NEW deep band surface — night-chart navy for the hero and the chain section, so the site is no longer all-white. Near-white text on it: 15.6:1. |
| `--accent-ocean` | `#126FAA` | Kept for links/CTAs on light surfaces (4.6:1 on white). |
| `--accent-sounding` | `#7FB4D6` | NEW — "depth sounding" blue for linework, contour strokes, and mono labels on the chart-navy surface (7.0:1 on `#07223D`, passes AA for the small mono labels it's used for). Decorative strokes may use it at lower opacity. |
| `--accent-brass` | `#B8823A` | Kept, promoted: brass is the *chain-of-custody* color — the thread, verified-step markers, ledger stamps. Instrument brass on a navy bridge. Decorative/large-text use on chart navy (4.9:1 as text if ever needed at ≥18px). |
| `--status-caution` | `#94610B` | Kept (already remediated to 4.72:1 on its bg). Status colors stay untouched — they're semantic, not decorative. |

Deliberately **not** added: terracotta/clay anything, neon accents, purple
gradients. The palette stays cold-water maritime; brass is the only warm
note and it's earned (chronometers, sextants, engine-order telegraphs).

### 2.2 Type — keep the faces, sharpen the discipline

Faces stay (Space Grotesk / Inter / IBM Plex Mono — already loaded, already
the brand). What changes is usage:

- **Mono gets a real job description:** evidence IDs, chain-step indices
  (`REQ-01 → PKG-10`), timestamps, and ledger labels — always uppercase,
  tracked `0.12–0.16em`, `font-variant-numeric: tabular-nums`. The existing
  mono-eyebrow instinct is right; it becomes systematic instead of
  decorative.
- **Display face used with restraint:** Space Grotesk only for `h1`/`h2` and
  the chain-step titles. No display face in cards/labels.
- No new font downloads → no CLS/weight regressions, no CSP changes.

### 2.3 Layout

**Homepage** — one continuous "chain of custody" spine:

```
┌──────────────────────────────────────────────────────┐
│ NAV (frosted, unchanged behavior)          [⌘K]      │
├──────────────────────────────────────────────────────┤
│ HERO — chart-navy band, depth-contour linework       │
│  h1 + subcopy (near-white, AA)                       │
│  [Request a demo] [View platform]                    │
│  ● —— the brass thread starts here                   │
├───────────┼──────────────────────────────────────────┤
│ PROBLEM   │ 3 items docked to the thread             │
├───────────┼──────────────────────────────────────────┤
│ EVIDENCE CHAIN — scroll-driven visualizer            │
│  thread draws downward; 10 steps dock alternately    │
│  left/right; each step = mono index + title + detail │
├───────────┼──────────────────────────────────────────┤
│ PRODUCT SHOWCASE (tabs, now with real transitions)   │
├───────────┼──────────────────────────────────────────┤
│ OUTCOMES / AUDIENCES / TRUST (light, quiet)          │
│  ● —— thread terminates at "Released package" CTA    │
├──────────────────────────────────────────────────────┤
│ FOOTER (solid navy, unchanged)                       │
└──────────────────────────────────────────────────────┘
```

**Interior template** (`/platform/*`, `/who-we-serve/*`): unchanged
structure; gains (a) the ledger-style mono route label in the PageHero
(e.g. `PLATFORM · EVIDENCE`), (b) the shared `EvidenceChain` component
available as a compact horizontal strip where pages already print the
chain as plain text (`hero-trace-line`).

### 2.4 Signature element (the one thing people remember)

**The brass custody thread + scroll-built evidence chain.** A single
continuous SVG thread, brass on chart-navy / navy-on-paper, that starts at
the hero, runs down the homepage spine, and *draws itself as the reader
scrolls* through the ten real chain steps (Requirement → Applicability →
Control → Assessment → Evidence → Finding → Risk → Corrective action → QA
→ Released readiness package — real product IA from
`lib/product-hierarchy.ts`, not invented). Each step docks onto the thread
with a mono index (`01 REQ` … `10 PKG`) and one sentence. Steps are
genuinely sequential, so the numbered treatment is legitimate here.
Reduced motion: the thread and all steps render fully drawn, static.

This is chain-of-custody made literal, drawn in the language of a ship's
ledger. One motif, carried once, everywhere else stays quiet.

## 3. Features to ship (real, not re-skins)

1. **`EvidenceChain` component** — scroll-driven visualizer above,
   reusable (`variant="spine"` homepage, `variant="strip"` compact). Data
   from `TRACEABILITY_CHAIN`. IntersectionObserver + scroll progress;
   framer-motion already in the stack; `usePrefersReducedMotion()` from
   `lib/` (per README §8, never framer's own hook).
2. **Command palette (Ctrl+K / ⌘K)** — first-party, no new deps. ARIA
   combobox pattern, route manifest built from the same nav/content
   constants the site already exports. Fuzzy-ish substring match over
   title/keywords, grouped results (Platform, Solutions, Compliance,
   Trust, …), full keyboard support, focus trap, `Esc` restore. Inline
   scripts stay CSP-hashed automatically by the worker.
3. **Showcase transitions** — `HomepageProductShowcase` stage changes get
   directional slide+fade (respecting reduced motion), animated stage
   progress, and `role="tablist"` semantics on desktop too (currently
   `aria-pressed` buttons).
4. **Hero rebuild** — chart-navy band with static depth-contour SVG
   texture (sounding lines at low opacity, no animation loop), near-white
   type. CTAs: solid ocean primary (white on `#126FAA` fails AA → use
   white on `#0E5A8A` 6.3:1), secondary = white text + brass border on
   navy (15.6:1).

## 4. Self-critique against the brief (done before building)

- *"Would this plan fit any B2B SaaS with the words swapped?"* First draft
  had "dark hero + animated graph" — that's generic. Revised: the thread
  is **continuous across the whole page** and terminates in the released-
  package CTA, the step indices are the product's real object model, and
  the contour texture is drawn from nautical-chart soundings, not gradient
  blobs. The visualizer content cannot be word-swapped — it *is* the IA.
- *Anti-slop checklist sweep:* no cream+terracotta (staying navy/brass);
  no neon-on-black; no gradient text; no blob backgrounds; display face
  present and restrained; numbered steps only where genuinely sequential
  (the chain is; kept — outcome cards stay unnumbered); zero invented
  metrics (chain uses real IA text; product screens already labeled
  illustrative); no stock photography anywhere.
- *Considered and rejected:* full AIS fleet-map hero (gorgeous but implies
  live tracking the product doesn't sell — dishonest); compass-rose motifs
  in every section header (theme-park); replacing the typefaces (churn
  without distinctiveness gain — discipline beats novelty here).
- Light/dark mode pass: **deferred.** The chart-navy band gives the site
  its dark register without forking every token; a full dark theme risks
  the primary direction on this timeline.

## 5. Non-negotiables carried from Phase 1

Every new pairing AA-checked before commit (chart-navy surfaces listed in
§2.1 with ratios); semantics preserved (labels, lists, heading order,
focus-visible); zero horizontal overflow down to 375px verified in the
Phase 3 crawl; no fabricated numbers; `lang="en"`, viewport meta, and the
enforcing CSP untouched — new inline scripts ride the worker's existing
hash pipeline.

## 6. Deviations from this plan (logged during build)

- (2026-08-01) `EvidenceChain` spine variant: step cards dock in a single
  column with the thread on the left (not alternating left/right) below
  `lg` — alternating layout collapsed poorly at 375px in testing.
- (2026-08-01) The brass thread does not literally start inside the hero;
  the hero carries a mono `01 REQ → 10 PKG` pointer link that jumps to the
  `#evidence-chain` section where the thread draws. A thread crossing the
  chart-navy → light boundary read as a rendering artifact, not a motif.
- (2026-08-01) Ledger route label is derived automatically from the URL in
  a client component (`LedgerRoute`) instead of a per-page prop — zero
  per-page churn, identical output.
- (2026-08-01) `hero-trace-line` plain-text chains on `/platform` and
  `/why-certamaris` replaced with the `EvidenceChain` strip variant, per
  plan §2.3 interior-template note.
- (2026-08-01, owner direction) §2.1 superseded in two ways: the site is
  **light-first** — the chart-navy hero band became a white→paper band
  with the animated pixel grid emphasized — and **brass is no longer the
  custody color**: all chain/custody accents now use the ocean family
  (`#126FAA` strokes, `#0E5A8A` small mono text), except the terminal
  released-package node, which keeps brass as the site's one deliberate
  warm accent (owner-approved). `--accent-brass` is otherwise unused.
- (2026-08-01, owner direction — supersedes the point above) The hero's
  bespoke chart band is retired entirely. The owner asked for the site's
  **original full-page Pixel Grid back** — the animation the security
  cleanup incidentally removed along with the third-party script it rode
  on. Rebuilt first-party in `components/PixelGridBackground.tsx`, one
  fixed instance mounted in `app/layout.tsx` (z-0, behind the existing
  `relative z-10` content shell), visible from nav through footer on
  every page, not homepage-only. The homepage hero reverted to
  `.hero-section.landing-hero` (transparent — the pattern the CSS was
  already built and commented for) with LiquidGlass panels. Grid opacity
  raised from 0.34 to 0.92 sitewide; legibility comes entirely from the
  Liquid Glass translucent-card system now, not from dimming the grid.
  **Do not reintroduce a bespoke hero background (chart-navy, chart-light,
  or otherwise) without explicit owner direction — it hides the layer the
  owner has now asked for twice.**
