# Founder headshot QA — Accessibility, Responsive, Performance, Automation

**Repo:** `certamaris-public-website` / local `C:\certamaris-startup-site-pnpm\certamaris-startup-site`  
**Branch:** `supergrok/founder-about-headshot`  
**Date:** 2026-07-31  
**Lane:** SUBAGENT 6 (Tester) — accessibility · responsive · performance · automated testing  

**Write roots (this agent only):**

| Path | Role |
|---|---|
| `scripts/qa/expected-routes.mjs` | `/about` + `/about/leadership` required |
| `scripts/qa/content-qa.mjs` | Does **not** ban `Founder` / `Skyler`; still fails TODO/TBD |
| `scripts/qa/check-founder.mjs` | Positive presence checks for founder bio + headshot |
| `package.json` | `qa:founder` script |
| `docs/2026-07-31-founder-headshot-qa.md` | This document |

**Do not** rewrite About/Leadership page content here (agents 2/4 own copy + markup).

Related:

- Sitewide remediation QA: [`docs/2026-07-31-website-remediation-qa.md`](./2026-07-31-website-remediation-qa.md)
- Route inventory: [`scripts/qa/expected-routes.mjs`](../scripts/qa/expected-routes.mjs)
- Content ban list: [`scripts/qa/content-qa.mjs`](../scripts/qa/content-qa.mjs)
- Founder checker: [`scripts/qa/check-founder.mjs`](../scripts/qa/check-founder.mjs)

---

## 1. Automated checks

### 1.1 Commands

```bash
# Full suite (includes check-founder after content/routes/seo/links)
npm run qa

# Founder-only (built HTML under out/ when present; else source fallback)
npm run qa:founder

# Force source-only scan (no out/ required for phrase checks)
node scripts/qa/check-founder.mjs --source-only

# After static export
npm run build:static
npm run qa:founder
```

### 1.2 What `check-founder` requires

| Check | Where | Fail if missing |
|---|---|---|
| Phrase `Skyler Brown` | `/about/leadership` HTML (or source) | Yes |
| Phrase `Founder` | leadership | Yes |
| Phrase `Marine Transportation` | leadership | Yes |
| Phrase `Third Mate` | leadership | Yes |
| Phrase `Unlimited Tonnage` | leadership | Yes |
| Image path `/images/leadership/skyler-brown` | markup `src` / `srcset` | Yes |
| Non-empty `alt` on founder `<img>` | leadership | Yes (empty alt fails — portrait is not decorative) |
| Public assets under `public/images/leadership/*skyler-brown*` | filesystem | Yes |
| `/about` teaser of name | about page | Warn only |
| Routes `/about`, `/about/leadership` | `expected-routes.mjs` CURRENT list | Covered by `qa:routes` |

### 1.3 Content QA interaction

`content-qa.mjs` **must not** treat the following as failures:

- `Founder`
- `Skyler` / `Skyler Brown`
- Credential phrases used on the leadership profile

It **must** continue to fail on unfinished copy markers:

- `TODO`, `FIXME`, `TBD`, `lorem`, drafting notes, `coming soon`, placeholder stubs, etc.

Positive presence of founder identity is **only** enforced by `qa:founder`, not by the ban list.

### 1.4 Routes

`CURRENT_STATIC_ROUTES` in `expected-routes.mjs` includes:

- `/about`
- `/about/leadership`

Both are required after `npm run build:static` (`qa:routes` / `check-routes --out`).

---

## 2. Accessibility checklist (founder portrait on light About/Leadership)

Portrait assets are dark formal headshots on a light marketing page. Verify the following after agents 2/4 land markup.

### 2.1 Alt text

| Item | Pass criteria |
|---|---|
| `alt` present | Attribute exists on the founder `<img>` (or Next/Image equivalent in HTML) |
| `alt` non-empty | Not `alt=""` — this is an informative portrait, not a decorative texture |
| `alt` meaningful | Includes name and/or role, e.g. `Skyler Brown, Founder of CertaMaris` |
| No keyword stuffing | Alt is human-readable; not a dump of every credential |
| Adjacent text | Visible name/title nearby so SR users and sighted users get the same identity |

### 2.2 Heading order

| Item | Pass criteria |
|---|---|
| Single page `<h1>` | One H1 — typically “Leadership” or page title from `PageHero` |
| Profile name level | Founder name is `h2` (or clear labeled heading under the H1), not a second H1 |
| Section order | `h1` → `h2` (profile / credentials) → `h3` only if subsections exist; no level skips |
| Breadcrumbs | Not heading-promoted; remain nav/list text |

### 2.3 Focus & keyboard navigation

| Item | Pass criteria |
|---|---|
| Tab order | Skip link → logo/nav → main → profile CTAs (contact / back) → footer |
| Focus visible | `:focus-visible` ring not removed on portrait links/buttons |
| Image not a focus trap | If portrait is wrapped in a link, one tab stop; if not linked, image is not in tab order |
| CTAs reachable | “Contact” / procurement / “Back to About” operable via keyboard only |
| No keyboard dead-ends | Escape still closes any open nav sheet from leadership page |

### 2.4 Reduced motion

| Item | Pass criteria |
|---|---|
| `prefers-reduced-motion: reduce` | Entrance `Reveal` / framer animations honor reduced motion (instant or minimal opacity) |
| No parallax on portrait | Headshot must not use motion-driven parallax that ignores reduced-motion |
| Pixel grid / ambient | Sitewide reduced-motion path still applies when visiting About/Leadership |

### 2.5 Contrast (dark portrait on light page)

| Item | Pass criteria |
|---|---|
| Text on light background | Name, title, body copy meet WCAG AA (≥ 4.5:1 normal text; ≥ 3:1 large) against page background |
| Text over image | If any caption/label overlays the photo, ensure contrast or scrim; prefer text **beside** the portrait on light surface |
| Focus ring on dark UI chrome | Nav/footer controls remain AA against their own backgrounds |
| Decorative frame | Border/shadow around portrait does not reduce text contrast of nearby copy |
| Credential chips/badges | If used, chip text vs chip fill ≥ 4.5:1 |

**Manual spot-check:** browser DevTools contrast or axe/Lighthouse a11y on `/about/leadership` at 100% zoom.

### 2.6 Responsive (portrait layout)

| Breakpoint | Pass criteria |
|---|---|
| Mobile (~360–430px) | Portrait scales within content column; no horizontal scroll; name/credentials stack under or above image |
| Tablet (~768px) | Image + bio readable; no clipped alt-equivalent text |
| Desktop (≥1024px) | Side-by-side or intentional layout; image not overflowing hero |
| Srcset / sizes | Multiple widths under `public/images/leadership/skyler-brown-*` used so mobile does not download 1600px only |
| AVIF/WebP + JPEG fallback | Modern formats preferred; JPEG remains for older clients |

### 2.7 Performance (headshot)

| Item | Pass criteria |
|---|---|
| Right-sized asset | Serve 400/640/800 for common slots; avoid only shipping 1600 on mobile |
| Format | WebP/AVIF where supported; JPEG fallback present |
| Lazy vs eager | Below-fold: `loading="lazy"` OK; if in LCP hero on leadership, eager + priority as appropriate |
| CLS | Width/height or aspect-ratio reserved so image load does not shift credentials text |
| No huge source in page | Do not embed full `*-source.jpg` in the public page `<img>` |

---

## 3. Manual smoke (post content-land)

After About/Leadership content lands:

1. `npm run build:static`
2. `npm run typecheck` (if shell available)
3. `npm run qa` — expect content + routes + seo + links + **founder** green
4. Open `out/about/leadership.html` (or local `next start` / preview) and walk §2 checklists
5. Confirm live asset path resolves: `/images/leadership/skyler-brown-founder-certamaris-*.{jpg,webp,avif}`

---

## 4. Outcomes log (this agent)

| Check | Outcome | Notes |
|---|---|---|
| `expected-routes` `/about` + `/about/leadership` | Present | Comment added that leadership is required for founder bio |
| `content-qa` bans Founder/Skyler? | **No** | Header documents intentional allow; TODO/TBD still fail |
| `check-founder.mjs` | Created | Built HTML preferred; source fallback; public asset scan |
| `package.json` `qa:founder` | Added | Does not remove existing scripts |
| `run-all.mjs` | Includes `check-founder` | Runs even without `out/` (source fallback) |
| Typecheck | See DONE report | Run when shell available after other agents land |
| Page content rewrite | **Not done** | Out of scope (agents 2/4) |

**Signed:** Tester SUBAGENT 6 · 2026-07-31  
