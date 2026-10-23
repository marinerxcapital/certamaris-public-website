# CertaMaris Empty-State Design System

**Introduced:** 2026-10-22

**Component:** `components/EmptyState.tsx`

**Primary routes:** `/about/partners`, `/about/careers`, `/about/press`

## Purpose

Empty states must explain what is not published, preserve the truth boundary,
and give the reader a useful next path. They are not decorative placeholders
and must never imply unpublished partners, roles, press coverage, or customer
proof.

## Variants

| Variant | Motif | Use |
| --- | --- | --- |
| `partnership` | Connected nodes and a shared record | Partner and collaboration directory |
| `careers` | Dotted route with three stops | Hiring and unsolicited-introduction routing |
| `press` | Media card and broadcast arcs | Press, media archive, and brand-asset requests |
| `resources` | Document stack | Resource filter no-match state |
| `search` | Magnifier | Command palette no-match state |

The two compact variants reuse the same spacing, status vocabulary, focus
treatment, and icon geometry without repeating the full page-level process
and related-link bands.

## Page composition

The page variant contains:

1. A purpose-specific SVG motif with `aria-hidden="true"`.
2. A mono eyebrow and an explicit non-live status label.
3. One `h2` title and an honest explanatory body.
4. One primary action, rendered by the route or by the client interaction.
5. A three-step routing or process band.
6. Three or four related navigation paths with distinct descriptions.

`EmptyState` accepts the primary action and supporting text as React nodes so
server pages can pass the shared `Button` link while client components can
pass an interactive reset button.

## Content rules

- Keep the existing "not published" boundary in the visible copy.
- Do not invent names, logos, headcount, locations, press mentions, response
  times, acceptance rates, or customer outcomes.
- State what the reader can do now. Submission must not be framed as approval,
  partnership, employment review, or publication.
- Related links must name their destination, not repeat "Learn more".
- Status indicators always include text; color is never the only signal.

## Responsive contract

- Below 768px, the motif stacks above the copy and the page-level primary
  action spans the available width.
- Process steps stack below 768px and become three columns at 768px.
- The process band becomes a copy/steps split at 1024px.
- Related links use one column on narrow screens, two at 768px, and four at
  1280px.
- Headings use fixed responsive sizes; type does not scale with viewport width.
- The component has no fixed or sticky positioning and respects the shared
  page shell and safe-area behavior.

## Accessibility contract

- The page variant is an `article` named by its title.
- Each document page retains exactly one `main h1`.
- The state title is an `h2`; process and related sections use `h3`, and each
  process step uses `h4`.
- Page actions and related links are at least 44px high.
- Focus uses the shared 2px ocean outline with visible offset.
- The component has no motion dependency, so reduced-motion mode needs no
  separate animation branch.
- Axe checks the page variants for WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA serious
  and critical findings.

## QA

```powershell
npm run qa:empty-states
```

For a live readback:

```powershell
node scripts/qa/empty-state-qa.mjs --label live-after --verify --base https://certamaris.com
```

The harness captures full-page and above-the-fold screenshots for 12
viewport/orientation checks, verifies one H1 and one state per route, checks
target size and image loading, exercises both compact no-match states, and runs
axe at mobile and desktop widths.
