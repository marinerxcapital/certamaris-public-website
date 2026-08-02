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

## Follow-ups (deliberate, not regressions)

- `wrangler deploy` printed "No targets deployed" (routes unchanged) —
  version uploaded and confirmed serving; nothing to do.
- Command palette trigger is desktop-nav only (Ctrl/⌘K works globally
  once mounted); consider a mobile entry point later.
- `find-404s.mjs` could be folded into `audit-crawl.mjs` if anyone wants
  URL-level 404 capture in the main crawl.
