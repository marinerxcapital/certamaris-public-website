# Design System Notes

This sprint intentionally avoided a broad redesign. Changes were limited to clear drift or first-impression defects.

## Preserved

- CertaMaris brand logo and wordmark.
- Navy/ocean palette.
- Light enterprise theme.
- Pixel Grid background.
- Liquid Glass surfaces.
- Dashboard V2 proof exhibit style.
- Existing `shell`, `Section`, `LiquidGlass`, `Button`, and `ProductScreenFrame` primitives.

## Refined

### Button Primitive

The shared `Button` now has:

- `min-height: 44px` via `min-h-11`.
- No flex shrink, avoiding clipped labels in CTA rows.
- Clearer focus-visible ring.
- Subtle primary shadow for stronger hierarchy.

### Product Exhibit Primitive

Product proof frames now read more like controlled evidence exhibits:

- Slightly larger radius.
- Taller label bar.
- More deliberate full-resolution affordance.
- Roomier annotation captions.

### Hero Proof Strip

The homepage proof strip is a compact `dl` with mono labels and controlled body text. It reinforces the enterprise/maritime proof model without inventing metrics, customers, certifications, or guarantees.

### Footer Inverse System

Footer contrast and focus states were improved without changing layout or hierarchy.

## Deferred

No broad typography scale refactor was performed in this sprint. Existing typography remains serviceable and validated, but a future token-level normalization may still be useful if the site undergoes a larger design-system pass.

