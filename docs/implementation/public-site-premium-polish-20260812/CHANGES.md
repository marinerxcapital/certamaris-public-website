# Changes

## Homepage

- Replaced the long homepage H1 with:
  `Maritime cyber assurance from requirement to readiness package.`
- Shortened the eyebrow to:
  `Maritime cyber assurance`
- Rewrote the opening paragraph to connect requirements, controls, evidence, findings, corrective actions, and review packages across company/fleet/vessel work.
- Renamed the secondary hero CTA from `View platform` to `Inspect the platform`.
- Added a desktop/tablet proof strip with three truthful signals:
  - Operating model.
  - Maritime scope.
  - Boundary discipline.
- Kept the proof strip hidden on narrow mobile to avoid excessive first-viewport density.
- Ensured homepage hero grid children use `min-w-0 w-full` so the hero card cannot expand beyond mobile viewport width.

## Components

- `Button`
  - Added `min-h-11` touch target.
  - Added `shrink-0` and `whitespace-nowrap`.
  - Improved focus-visible ring.
  - Added a subtle primary-button shadow.
  - Made ghost buttons underline on hover for clearer affordance.

- `ProductScreens`
  - Moved screenshot exhibit frame from `rounded-md` to `rounded-lg`.
  - Increased exhibit header from fixed `h-9` to `min-h-10`.
  - Gave full-resolution links a clearer hit area and hover state.
  - Added slightly roomier annotation caption rows.

- `Footer`
  - Improved footer CTA touch target and focus states.
  - Increased inverse text contrast for headings, footer legal standing line, copyright, and links.
  - Added focus-visible rings to footer links.

## CSS / Tokens

- Added `--focus-ring` token for future consistent focus treatment.
- Added `.hero-proof-strip` and `.hero-proof-item` styles.
- Preserved existing Liquid Glass and Pixel Grid systems.

## Route Defect

- Replaced undefined `border-line` on `/industries` role cards with `border-navy/15`, matching the existing hairline border family.

