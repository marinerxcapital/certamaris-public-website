# Responsive QA

## Browser Product-Proof QA

Command:

```powershell
$env:CHROMIUM_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; npm run qa:product-proof:render
```

Result: PASS

Coverage:

- 31 proof-bearing routes.
- Viewports: `390x844`, `430x932`, `768x1024`, `1024x768`, `1280x800`, `1440x900`, `1536x960`.
- All checked routes rendered Dashboard V2 product proof.
- Horizontal overflow: `0px` across all reported route/viewport combinations.

## All-Route Browser Crawl

Command:

```powershell
$env:CHROMIUM_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; node scripts/qa/audit-crawl.mjs premium-polish-after-last-change --no-shots
```

Result: PASS

Evidence:

- Routes crawled: `91`.
- Desktop console errors: `0`.
- Mobile console errors: `0`.
- Pages with horizontal overflow: `0`.
- Pages with axe violations: `0`.

## Targeted Visual Measurements

Homepage mobile at `390x844` after final polish:

- Hero copy card: `x=20`, `width=350`, `right=370`.
- H1: `x=49`, `width=292`, `right=341`.
- Page overflow: `0`.

Representative screenshot files:

- `screenshots/home-mobile.png`
- `screenshots/home-desktop.png`
- `screenshots/platform-desktop.png`
- `screenshots/demo-mobile.png`
- `screenshots/solution-desktop.png`

