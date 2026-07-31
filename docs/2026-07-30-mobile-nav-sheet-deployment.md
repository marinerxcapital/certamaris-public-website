# Mobile navigation production sheet

Date: 2026-07-30  
Commit: **`76428e0`**  
Worker: **`0d1222b5-c49f-4ef9-9efe-a8e25cc37d4a`**

## Problem
Nested mobile drawer inside pill/stadium Liquid Glass (`border-radius: 9999`) produced a giant oval overlay, clipped links, and broken hierarchy.

## Solution
- `createPortal` to `document.body`
- Root: `position: fixed; inset: 0; z-index: 100`
- Backdrop: dimmed + blur, click to close
- Sheet: right-aligned `width: min(92vw, 420px)`, `height: 100dvh`, safe-area padding, scrollable body
- Header: logo + visible Close control
- Full-width stacked links + CTAs
- Body scroll lock; focus trap; Escape / backdrop / route / close
- Desktop nav unchanged (lg+)

## Files
- `components/Nav.tsx`
- `app/globals.css`

## Validation
- typecheck PASS · build:static PASS · push main · wrangler deploy PASS
- Live CSS contains `nav-mobile-root`, `nav-mobile-sheet`, `100dvh`, `92vw`
