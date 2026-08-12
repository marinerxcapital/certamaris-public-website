# Accessibility QA

## Automated Axe Crawl

Command:

```powershell
$env:CHROMIUM_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'; node scripts/qa/audit-crawl.mjs premium-polish-after-last-change --no-shots
```

Result: PASS

Evidence:

- Routes crawled: `91`.
- Pages with axe violations: `0`.
- Desktop console errors: `0`.
- Mobile console errors: `0`.

## Manual / Source-Verified Improvements

- Shared buttons now meet a 44px minimum touch target.
- Footer CTAs now meet a 44px minimum touch target.
- Footer links and CTAs now have explicit focus-visible rings.
- Product full-resolution links have larger focus/hover hit areas.
- Product proof remains rendered as `figure`/`figcaption`.
- Product proof full-resolution links remain keyboard-focusable anchors.

## Known Non-Blocking Warning

Node test execution prints `MODULE_TYPELESS_PACKAGE_JSON` warnings for TypeScript test files. Tests pass; this is a packaging/performance warning, not an accessibility defect.

