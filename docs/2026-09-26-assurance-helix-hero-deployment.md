# 2026-09-26 — Assurance Helix hero deployment

## CURRENT ADDENDUM — Mockup-match corrective pass

| Item | Value |
|---|---|
| Domain | https://certamaris.com |
| Worker | `certamaris-site` |
| Deployed version | `547c484b-45ab-4191-b118-ccfdf7914711` |
| Code commit | `7c5a641` (`feat(marketing): match landing hero mockup`) |
| Deploy method | `npm run build:static` (explicit `next build --webpack` static export) + `npx wrangler deploy --config wrangler.jsonc --keep-vars` |
| Visual target | Owner-supplied landing-page mockup attached in the 2026-09-26 correction request |
| Completion | 2026-09-26 06:18 local, America/Los_Angeles |

### What changed in the current pass

- Tightened the first viewport to the mockup: compact centered nav, left copy at the target x-position, exact three-line headline, CTA rhythm, right product-proof exhibit high in the fold, and the `SAMPLE RECORD · DEMO DATA` section visible at the bottom of the first desktop viewport.
- Reworked the Assurance Helix geometry from 760×540 to 760×455 so the trace fills the mockup-shaped exhibit instead of sitting small in a tall canvas.
- Updated the visible demo ids to the mockup-aligned sequence while preserving the contractual object order: `REQ → APP → CTL → ASM → EVD → FND → RSK → CAP → QA → PKG`.
- Strengthened the animated SVG system: denser aura paths, more signal points, wider translucent ribbons, 42 rungs, trace sweep, path draw, ordered node reveal, ambient drift, pointer response, and reduced-motion static mode.
- Fixed the static export build path by making `build:static` use `next build --webpack`; the previous default Turbopack build failed before application code in the generated `next/font/google` resolver.

### Current files changed

| File | Change |
|---|---|
| `lib/assurance-helix.ts` | Mockup-shaped deterministic geometry, target demo ids, denser aura/signal field, wider trace, 42 depth rungs, 760×455 viewBox. |
| `components/AssuranceHelix.tsx` | Product-proof exhibit wording, adjusted scaffold height, wash/vessel transform for the new viewport. |
| `components/HomeHero.tsx` | Exact default three-line mockup headline while preserving persona fallback copy. |
| `app/globals.css` | Compact nav, target hero grid/fold, headline scale, exhibit scale, ribbon/line weights, responsive/mobile behavior. |
| `package.json` | `build:static` now runs `next build --webpack` for a stable static export. |

### Current validation and live verification

| Gate | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run build:static` | PASS, 110 static pages |
| `npm run test:pricing` | PASS, 12/12 |
| `npm run qa:product-proof` | PASS |
| Chrome static-export harness | PASS at 1440, 1280, tablet, mobile, and reduced-motion contexts: zero horizontal overflow, zero helix label overlaps, correct order, animation active, reduced motion static |
| Live production harness | PASS at desktop/mobile/reduced motion: no console errors, no 4xx/5xx responses, correct title, correct node order, target ids, zero label overlap, zero overflow, animation active, reduced motion static |
| `npm run qa:responsive-a11y` | Existing local Playwright bundled Chromium ICU failure; compensated with system Chrome harness |
| `npm run qa:seo` | Existing duplicate title failure for `/privacy` and `/legal/privacy`; unrelated to this hero pass |

Live checks confirmed:

- `https://certamaris.com` loads the new hero.
- Current logo and nav render correctly.
- Desktop first viewport matches the target composition closely.
- Mobile no longer shows the broken detached label grid or nav/copy collision.
- Helix animation initializes in normal motion: `helixDraw`, `helixTraceSweep`, `helixDrift`.
- Reduced motion stays static: no trace/plane animation.
- Node order is `REQ>APP>CTL>ASM>EVD>FND>RSK>CAP>QA>PKG`.
- Demo ids are `REQ-026|APP-014|CTL-041|ASM-023|EVD-238|FND-031|RSK-009|CAP-017|QA-066|PKG-004`.
- CTAs, sample-record anchor, next section, and full-resolution link render.

COMPLETED BY: DEEPSEEK-V4 VISION  
DATE: 2026-09-26  
TIME: 06:18 LOCAL (America/Los_Angeles)  
STATUS: PRODUCTION DEPLOYED AND VERIFIED

---

## Previous corrective deployment record

| Item | Value |
|---|---|
| Domain | https://certamaris.com (and https://www.certamaris.com → 200) |
| Worker | `certamaris-site` |
| Deployed version | `6b4c2250-45e2-441f-842a-ec04bc9b792c` |
| Previous live version | `96ca441b-e8ef-4b53-bf4a-e81b8c1134a6` @100% (2026-09-21) |
| Code commit | `4be9ffb` corrective pass on top of `46675ea731fd2eb076794dcadd061da4bdf9f7d2` (helix) and `d49fba1` (live 2026-09-21 drift) |
| Deploy method | `npm run build:static` + `npx wrangler deploy --config wrangler.jsonc --keep-vars` |
| Visual target | Owner-supplied landing-page mockup (Assurance Helix) |

## 1. What changed

The first viewport was rebuilt around the supplied target: copy on the left, and
the **Assurance Helix** rendered as a live product-surface exhibit on the right.
The corrective `4be9ffb` pass replaced the weak mobile treatment with the same
advanced composition family: product-surface header, vessel tag, dimensional
helix, embedded labels, vessel line art, record tag, and legend.

| File | Change |
|---|---|
| `lib/assurance-helix.ts` | Deterministic geometry: five-turn double strand, ten object nodes, label offsets, depth rungs, container-vessel line drawing, construction rows, aura traces, and signal points. |
| `components/AssuranceHelix.tsx` | Client component: SVG canvas + node label layer + two micro information tags + legend + motion controller + animated trace-sweep layer. |
| `components/HomeHero.tsx` | Right column is now `<AssuranceHelix />`. Removed the boxed `hero-product-panel` wrapper and the `ProductScreenFrame` exhibit. Removed the duplicated hero wordmark (the nav logo carries it). Headline measure widened to `max-w-[26ch]`, hero vertical padding 16→12. |
| `app/globals.css` | `.hero-helix*` / `.helix-*` layer plus keyframes; product-surface exhibit styling; path-draw and trace-sweep motion; embedded mobile labels; removed the mobile detached chip-list and sticky CTA panel. |

Committed alongside (not part of this design change, but uncommitted production
drift that was already live): `d49fba1` carries the 2026-09-21 `security.txt`,
`_redirects`, and legacy legal-route title fixes plus their two notes.

## 2. Assurance Helix architecture

The helix represents one controlled assurance record, not a decorative helix.
The object order is fixed by the product's own object model
(`lib/sample-record.ts`) and is used verbatim, including the sample record ids:

```
REQ-0104 Requirement → APP-0231 Applicability → CTL-0389 Control →
ASM-0512 Assessment → EVD-0847 Evidence → FND-0130 Finding →
RSK-0072 Risk → CAP-0455 Corrective action → QA-0290 QA review →
PKG-0067 Released package
```

Geometry is pure math on a 760×540 viewBox, identical on the server and in the
browser — no randomness, no runtime measurement, no 3D engine:

1. A shallow rising axis (`AXIS_START`→`AXIS_END` with a small bow).
2. A perpendicular weave `A·envelope·sin(2π·5t)`, amplitude 48 units, envelope
   tapering toward both ends. The weave is deliberately **shallow against its
   own wavelength**, so the ribbons read as an engineered trace rather than a
   coiled spring.
3. Two strands: `axis ± normal·weave`. The rear strand is painted first, rungs
   next, the front strand last, so the front ribbon reads as nearer.
4. Rungs at 34 samples with opacity following projected depth, so they fade
   where the strands cross.
5. Nodes at `t = (i + 0.5)/10`. At those parameters the weave is at its
   standing waves, so **consecutive objects alternate front/back** and their
   labels are always a full lens apart — label collision is impossible by
   construction, not by tuning.

Non-helix elements, all aria-hidden and decorative: a faint three-row
construction scaffold with ticks, a right-hand column line, two low-opacity
ledger watermarks (CONTROLLED RECORD / READINESS), a pale-blue radial wash, and
a container-vessel line drawing in the lower band (hull, deck line, stern
superstructure, funnel, mast, five deck cargo bays, bow sheer, draft marks,
dashed waterline).

## 3. Animation approach

No new dependency. CSS transforms/opacity driven by a small React controller;
`framer-motion` was not needed and is not used by this component.

1. **Reveal (activation).** Ribbon depth fades in (1100 ms), rungs and vessel
   settle, node dots and labels enter in REQ → PKG order with a 76 ms stagger.
   The thin strand cores are never animated, so the trace is readable at first
   paint and hydration can never flash.
2. **Ambient (idle).** One 52 s near-invisible structural drift on the whole
   composition: 4 px translate and 0.35° rotation. It starts after the reveal
   and is paused by an IntersectionObserver whenever the hero is off-screen.
3. **Object progression.** A 15 s loop walks a travelling emphasis through the
   ten objects, 1.35 s apart, as a ring on the node plus a tint on its label.
   Nothing flashes; only one object is emphasised at a time.
4. **Pointer response.** Desktop/fine pointers only: a bounded ±4–9 px depth
   offset across four layers, one rAF per frame, cleared on pointer leave.
5. **Scroll response.** A bounded rAF scroll handler moves the scaffold and
   vessel at a different rate from the strand (±16 px). Normal scrolling is
   never intercepted, pinned, or hijacked.

## 4. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| ≥1024 px | Full composition: weave, ten labels, construction scaffold, watermarks, vessel, both micro tags, legend. Hero plane is capped at 700 px wide, so at 1280 px the exhibit measures 694 × 493 — the same absolute width as the target's panel. |
| 640–1023 px | Scaffold, watermarks, and the second micro tag are dropped; the weave, all ten labels, the vessel drawing, and the vessel record tag remain. |
| ≤639 px | The product-surface composition stays intact: compact header, on-helix labels, vessel tag, record tag, vessel wireframe, and legend. The old detached two-column node chip list is removed. |

The hero was also sized so the next section ("SAMPLE RECORD · DEMO DATA")
breaks the fold on a 1440 × 900 desktop, matching the target's transition.

## 5. Reduced-motion behaviour

- The component reads `(prefers-reduced-motion: reduce)` and stays in
  `data-state="static"`. Every animation rule is additionally wrapped in
  `@media (prefers-reduced-motion: no-preference)`, so there are two
  independent gates.
- In the static state the helix renders complete: all ten labels, both micro
  tags, the legend, the vessel, and the full weave. Verified with an actual
  `reducedMotion: "reduce"` browser context: `data-state="static"`, zero
  declared animations, ten labels, dots seated on the weave, legend intact.
- Static centring deliberately uses the independent `translate` property, never
  `transform`, because the sitewide reduced-motion block sets
  `transform: none !important` on every element — using `transform` for layout
  would have shifted every node dot and label by half its own size for
  reduced-motion users.

## 6. Performance considerations

- Transform/opacity only for motion; no per-frame layout reads inside the write
  phase (pointer and scroll handlers coalesce into a single rAF).
- The plane reserves its box with `aspect-ratio: 760 / 540`, so the exhibit
  cannot cause layout shift. Measured cumulative layout shift on the live page:
  **0** at 1440 px and 390 px.
- ~90 static SVG nodes (2 strands, 34 rungs, frame, vessel) and 10 small HTML
  labels. No canvas, no particles, no filters, no blur stacks, no video.
- Ambient and progression loops pause off-screen (IntersectionObserver).
- Pointer depth only arms on `(hover: hover) and (pointer: fine)`.
- No new network requests: the helix is inline markup and gradients. The only
  asset it references is the existing Executive Readiness exhibit reached by
  the "Full resolution" link.

## 7. Accessibility considerations

- The graphic is a `<figure>` with a `sr-only` `<figcaption>` describing the
  whole trace, an `sr-only` ordered list of the ten objects, and an `sr-only`
  sentence naming the order — the visual is never the only carrier of content.
- The SVG itself is `aria-hidden`; the visible labels are `aria-hidden` and
  mirrored by real screen-reader text per object (name + record id).
- The figure is keyboard focusable (`tabIndex=0`); `:focus-visible` runs the
  object sweep once and draws a visible focus outline. Tab order verified: nav
  → hero CTAs → "Inspect a sample record" → the helix figure.
- Hover on a node emphasises its dot and label; this is decoration, not the
  only affordance.
- The three product-proof callouts from the previous exhibit are preserved as
  visible legend text: demo-data boundary visible / readiness signal with
  source context / assurance record trace.
- axe-core (wcag2a, wcag2aa, wcag21a, wcag21aa, best-practice): **no serious or
  critical violations** at 1440, 1280, 834, and 390 px, and on the live page.

## 8. Tests run and build result

| Gate | Result |
|---|---|
| `npm run typecheck` | PASS |
| `npm run build:static` | PASS (110 static pages) |
| `npm run test:pricing` | 12/12 PASS |
| `npm run test:contact` | 9/9 PASS |
| `npm run test:worker` | 5/5 PASS |
| `npm run qa` (12 steps) | 10 PASS, 2 pre-existing failures — see §10 |
| Custom browser harness (4 viewports) | 38/38 PASS — overflow, label overlap, label bounds, hero/section collision, object order, axe, reduced motion, keyboard |
| Live production harness | 34/34 PASS — see §10 |
| `npm run ci:validate` | FAILS on `npm audit` before any source check — see §10 |

## 9. Deployment

1. `npm run build:static` with `STATIC_EXPORT=true`.
2. `npx wrangler deploy --config wrangler.jsonc --keep-vars` in the production
   checkout. Wrangler reported `Current Version ID:
   6b4c2250-45e2-441f-842a-ec04bc9b792c`. Live-domain checks confirmed the
   new assets and markup on `https://certamaris.com`.

### Live URLs verified

| URL | Result |
|---|---|
| `https://certamaris.com` | 200; `hero-helix` ×11, `helix-node__tag` ×10, `Assurance helix` ×2, `MV Certa Maris` ×3, `REQ-0104` ×6, `PKG-0067` ×4, `Demo-data boundary visible` ×3, `hero-product-panel` **×0** |
| `https://www.certamaris.com` | 200, resolves to `https://certamaris.com/` |

Live browser checks (Chrome, 1440×900 and 390×844): no console errors, no page
or hydration errors, no 4xx/5xx responses; helix present; ten labels
in REQ → PKG order; upgraded product-surface exhibit present; logo
loads; headline is the target copy on three lines; both CTAs wired to
`/contact?intent=demo` and `/demo#scrub-tour`; the `#sample-record` link
resolves; the following product-proof section renders; zero horizontal
overflow; zero node-label collisions; reduced-motion static mode; motion armed.

## 10. Issues found and how they were handled

**Found by this pass and fixed**

1. *Node placement collapsed to one side of the axis.* The first implementation
   derived a node's strand from the sign of the weave and then multiplied by it
   again, so every node landed on the same side and consecutive labels were only
   9–37 units apart, overlapping at desktop widths. Fixed by riding the traced
   strand directly (`strandPoint(t, 1)`) so nodes alternate front/back; a
   geometry probe and a browser overlap test now assert it.
2. *Weave read as a coiled spring.* Five turns at a large amplitude produced
   closed petals. Fixed by making the weave shallow against its wavelength and
   widening the ribbons so the turns blend into translucent bands.
3. *Hero pushed the next section off the first screen.* The exhibit plane was
   capped at 700 px and hero padding reduced, so the "SAMPLE RECORD · DEMO DATA"
   heading breaks the fold as the target shows.
4. *Reduced-motion layout risk.* Centring via `transform` would have been
   neutralised by the sitewide `transform: none !important` rule; switched to
   the independent `translate` property and verified in a reduced-motion
   browser context.

**Pre-existing, NOT caused by this pass, left in place**

5. **GitHub Actions is blocked, in two layers — both owner-side.**
   a. *Account billing lock (the first gate, observed live).* Pushing this work
      to `main` triggered run [`36232400278`](https://github.com/marinerxcapital/certamaris-public-website/actions/runs/36232400278),
      which failed in 4 s with the annotation **"The job was not started because
      your account is locked due to a billing issue"** and **zero executed
      steps**; the `deploy` job was skipped. This is the pattern already
      documented in `docs/ci-billing.md` from 2026-07-31. No runner, hosted or
      self-hosted, will start until the account is unlocked.
   b. *Dependency advisories (the next gate).* Independently verified by running
      `npm run ci:validate` locally: it fails at its **first** step,
      `npm audit --omit=dev --audit-level=high`, on advisories published after
      the 2026-08-25 deploy — `next@16.2.12` (fix available in `next@16.3.6`,
      outside the pinned range) and `sharp@0.35.3` via the `overrides` block.
      Once billing is restored this step will fail the `validate` job, and the
      `deploy` job has `needs: validate`, so no push will deploy.

   **Consequence:** this pass deployed through the project's documented local
   path (`docs/ci-billing.md` local parity) rather than Actions. Practical
   exposure from the advisories is low — this site is a static export with no
   Next server and `images.unoptimized`, so neither the server RCE nor the
   image-optimisation advisory is reachable — but both the account unlock and
   the dependency bump are owner decisions and were deliberately **not** taken
   here. Recommended follow-up, in order: (1) clear the GitHub billing lock;
   (2) a dedicated dependency-bump pass that re-runs `build:static`, the QA
   suite, and the live harness.
6. `npm run qa` step `check-seo` fails on one duplicate title: `Privacy Policy —
   CertaMaris` on both `out/privacy.html` and `out/legal/privacy.html`. The
   cause is the pre-existing, already-live 2026-09-21 title edit (committed here
   as `d49fba1`), which removed the `- legacy route` suffix; `check-seo` has no
   `noIndex` exemption, and `/privacy` is `noIndex`. Not touched, because the
   wording of a legal page title is an owner content decision.
7. `npm run qa` step `product-experience journeys` cannot launch its browser in
   this environment (Chromium ICU error — only `chromium_headless_shell` is in
   the Playwright cache). Compensated by the Chrome-based harness in §8, which
   covers the same ground (overflow, responsive layout, interaction).

## 11. New components, utilities, and tokens

| Kind | Name | Notes |
|---|---|---|
| Module | `lib/assurance-helix.ts` | `HELIX_VIEW`, `HELIX_TRACE`, `HELIX_NODES`, `HELIX_STRAND_FRONT/REAR`, `HELIX_RUNGS`, `VESSEL_SHAPES`, `HELIX_FRAME`, `HELIX_AURA_PATHS`, `HELIX_SIGNAL_POINTS` |
| Component | `components/AssuranceHelix.tsx` | Client component; the only new component |
| CSS | `.hero-helix`, `.hero-helix__head/__eyebrow/__exhibit/__resolution/__plane/__svg/__legend*`, `.helix-trace`, `.helix-node*`, `.helix-chip*`, `.helix-strand*`, `.helix-ribbon`, `.helix-core`, `.helix-current`, `.helix-aura`, `.helix-signal-points`, `.helix-rungs`, `.helix-vessel`, `.helix-frame__*`, `.helix-telemetry`, `.helix-wash` | No new design tokens; existing `--accent-ocean*`, `--ink-*`, `--hairline`, `--radius-card`, `--duration-fast`, `--ease-standard`, `--focus-outline`, `--status-ok` are reused |
| Keyframes | `helixStep`, `helixStepOnce`, `helixDrift`, `helixDraw`, `helixTraceSweep`, `helixSignalIn`, `helixNodeIn`, `helixFade`, `helixBreathe`, `helixSettle` | |
| Removed | Mobile detached two-column node chip list and mobile sticky CTA panel | Replaced by embedded labels and normal CTA flow |

**Dependencies added or removed: none.** `package.json` is unchanged. No new
network requests, images, fonts, or third-party runtime.

## 12. Product-surface confirmation

The latest owner-supplied target is a live product-surface exhibit. The current
hero therefore intentionally uses a restrained 8 px bordered surface around the
right-side exhibit, matching the mockup. The weak earlier mobile fallback
(bare artwork plus a detached node chip list) is removed. Live checks verified
the product-surface exhibit, `helix-current`, `helix-aura`,
`helix-signal-points`, ten object labels, and the fixed REQ → PKG order on
desktop and mobile.

## 13. Maintenance notes

- The object order REQ → APP → CTL → ASM → EVD → FND → RSK → CAP → QA → PKG is
  contractual. Change `HELIX_TRACE` only with the object model, and keep the ids
  in sync with `lib/sample-record.ts`.
- Node labels are legible because nodes sit on the standing waves and therefore
  alternate front/back. If the weave amplitude, the turn count, or the node
  parameterisation changes, re-check the label separation at 1280 px and
  1440 px — the plane scales, but the HTML labels do not.
- Motion arms only after mount; `data-state="static"` is the complete, legible
  exhibit. Never move an animation onto the strand cores: they are the
  flash-free first paint.
- `data-live="false"` (set by IntersectionObserver) pauses only the ambient
  loops, not the one-shot reveal.
- The exhibit plane is capped at 700 px so the hero keeps the target's
  first-viewport geometry. Increasing it pushes the sample-record section below
  the fold.

## 14. Final production state

`https://certamaris.com` serves Worker `certamaris-site` version
`6b4c2250-45e2-441f-842a-ec04bc9b792c`, built from `4be9ffb` plus the earlier
helix/drift commits. The hero renders the Assurance Helix as an advanced
animated product-surface exhibit; mobile uses embedded labels rather than a
detached chip list.

### Rollback

```powershell
cd C:\certamaris-startup-site-pnpm\certamaris-startup-site
npx wrangler versions deploy 96ca441b-e8ef-4b53-bf4a-e81b8c1134a6@100% --config wrangler.jsonc -y
```

---

COMPLETED BY: CODEX
DATE: 2026-09-26
TIME: 02:49 LOCAL (America/Los_Angeles)
STATUS: PRODUCTION DEPLOYED AND VERIFIED
