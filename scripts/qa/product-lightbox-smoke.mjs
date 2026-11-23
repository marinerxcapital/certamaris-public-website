#!/usr/bin/env node
// Focused contract test for the shared product exhibit viewer.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const OUT = path.resolve("out");
const PORT = Number(process.env.LIGHTBOX_QA_PORT || 4637);
const configuredBase = process.env.LIGHTBOX_BASE?.replace(/\/+$/, "");
const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function resolveFile(urlPath) {
  const pathname =
    decodeURIComponent(new URL(urlPath, "http://127.0.0.1").pathname).replace(
      /\/+$/,
      "",
    ) || "/";
  const candidates =
    pathname === "/"
      ? [path.join(OUT, "index.html")]
      : [
          path.join(OUT, pathname),
          path.join(OUT, `${pathname}.html`),
          path.join(OUT, pathname, "index.html"),
        ];
  return candidates.find(
    (candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile(),
  );
}

// ---------------------------------------------------------------------------
// Extended viewer contracts (Orion, 2026-11-22). Every check records pass/fail
// plus the observed detail so the output is auditable. Read-only: no forms, no
// POSTs; the only interception is aborting full-resolution PNG requests to
// provoke the image error state.
// ---------------------------------------------------------------------------
const TRIGGER = 'main button[data-testid="product-screen-trigger"]';
const DIALOG = '[data-testid="product-lightbox"]';

async function openFirst(page, base, { viewport, tap = false, route = "/platform" } = {}) {
  if (viewport) await page.setViewportSize(viewport);
  await page.goto(`${base}${route}`, { waitUntil: "load" });
  const trigger = page.locator(TRIGGER).first();
  await trigger.waitFor({ state: "visible", timeout: 15000 });
  await trigger.scrollIntoViewIfNeeded();
  if (tap) await trigger.tap();
  else await trigger.click();
  await page.locator(DIALOG).waitFor({ state: "visible" });
  return trigger;
}


// Wait out the 220ms scale(0.985) entry animation (and any other finite
// animation). A mid-animation box read reports ~43.34px for a 44px control.
// Infinite animations (if any) are ignored so this cannot hang.
async function waitForFiniteAnimations(page) {
  await page.waitForFunction(
    () =>
      document
        .getAnimations()
        .filter((animation) => animation.effect?.getComputedTiming().iterations !== Infinity)
        .every((animation) => animation.playState !== "running"),
    undefined,
    { timeout: 5000 },
  );
}

function measure390Controls(page) {
  return page.evaluate(() => {
    const measure = (el) => {
      if (!el) return { present: false };
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return {
        present: true,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        layoutBox: { w: el.offsetWidth, h: el.offsetHeight },
        inViewport:
          r.left >= 0 && r.top >= 0 && r.right <= innerWidth && r.bottom <= innerHeight,
        visible: cs.visibility !== "hidden" && cs.display !== "none" && Number(cs.opacity) > 0,
        hitIsSelf: Boolean(hit && (el === hit || el.contains(hit))),
        disabled: Boolean(el.disabled),
      };
    };
    return {
      close: measure(document.querySelector('[data-testid="product-lightbox-close"]')),
      previous: measure(document.querySelector('[data-testid="product-lightbox-previous"]')),
      next: measure(document.querySelector('[data-testid="product-lightbox-next"]')),
      overflowX: document.documentElement.scrollWidth > innerWidth,
      bodyOverflow: document.body.style.overflow,
    };
  });
}

function assertMin44(label, control, { required = true } = {}) {
  if (!control?.present) {
    if (required) throw new Error(`${label} missing at 390px`);
    return;
  }
  if (!control.visible || !control.inViewport || !control.hitIsSelf) {
    throw new Error(`${label} not visible/reachable: ${JSON.stringify(control)}`);
  }
  if (control.rect.w < 44 || control.rect.h < 44) {
    throw new Error(`${label} rendered box under 44px: ${JSON.stringify(control.rect)}`);
  }
  if (control.layoutBox.w < 44 || control.layoutBox.h < 44) {
    throw new Error(`${label} layout box under 44px: ${JSON.stringify(control.layoutBox)}`);
  }
}

const dialogTitle = (page) => page.locator(`${DIALOG} h2`).textContent();
const insideDialog = (page) =>
  page.evaluate(() => {
    const d = document.querySelector('[data-testid="product-lightbox"]');
    return Boolean(d && document.activeElement && d.contains(document.activeElement));
  });
const triggerFocused = (page) =>
  page.evaluate(() => ({
    restored:
      document.activeElement?.matches('button[data-testid="product-screen-trigger"]') ?? false,
    label: document.activeElement?.getAttribute("aria-label") ?? null,
  }));

async function extendedChecks(browser, base) {
  const out = {};
  const record = async (name, fn) => {
    try {
      const detail = await fn();
      out[name] = { pass: true, ...(detail && typeof detail === "object" ? detail : {}) };
    } catch (error) {
      out[name] = { pass: false, error: String(error?.message || error) };
    }
  };
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  await record("scrollPositionRestoredAfterClose", async () => {
    await page.goto(`${base}/platform`, { waitUntil: "load" });
    await page.locator(TRIGGER).first().waitFor({ state: "visible", timeout: 15000 });
    // Use the last exhibit trigger, scrolled into view the way a user would reach it.
    const scrollTrigger = page.locator(TRIGGER).last();
    await scrollTrigger.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const before = await page.evaluate(() => ({
      y: window.scrollY,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    }));
    if (before.y < 100) throw new Error(`page not scrollable for the test (scrollY=${before.y})`);
    await scrollTrigger.click();
    await page.locator(DIALOG).waitFor({ state: "visible" });
    const during = await page.evaluate(() => ({
      y: window.scrollY,
      overflow: document.body.style.overflow,
    }));
    if (during.overflow !== "hidden") throw new Error("scroll not locked while open");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => ({
      y: window.scrollY,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    }));
    if (Math.abs(after.y - before.y) > 2) throw new Error(`scrollY ${before.y} -> ${after.y}`);
    if (after.overflow !== before.overflow || after.paddingRight !== before.paddingRight)
      throw new Error(`body styles not restored: ${JSON.stringify({ before, after })}`);
    return { before, during, after };
  });

  await record("arrowKeyNavigation", async () => {
    await openFirst(page, base);
    const first = await dialogTitle(page);
    const counter0 = await page.locator(`${DIALOG} .product-gallery-counter`).textContent();
    await page.keyboard.press("ArrowRight");
    const second = await dialogTitle(page);
    const counter1 = await page.locator(`${DIALOG} .product-gallery-counter`).textContent();
    await page.keyboard.press("ArrowLeft");
    const back = await dialogTitle(page);
    if (first === second) throw new Error("ArrowRight did not change the exhibit");
    if (back !== first) throw new Error("ArrowLeft did not return to the first exhibit");
    await page.keyboard.press("ArrowLeft");
    const wrapped = await dialogTitle(page);
    if (wrapped === first) throw new Error("ArrowLeft from first did not wrap");
    await page.keyboard.press("Escape");
    return { first, second, back, wrapped, counter0: counter0?.trim(), counter1: counter1?.trim() };
  });

  await record("tabAndShiftTabTrap", async () => {
    await openFirst(page, base);
    await page.waitForFunction(
      () => document.querySelector('[data-testid="product-lightbox"]')?.contains(document.activeElement),
    );
    const focusableCount = await page.evaluate(
      () =>
        document
          .querySelector('[data-testid="product-lightbox"]')
          .querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])').length,
    );
    for (let i = 0; i < focusableCount + 2; i++) {
      await page.keyboard.press("Tab");
      if (!(await insideDialog(page))) throw new Error(`Tab ${i + 1} left the dialog`);
    }
    for (let i = 0; i < focusableCount + 2; i++) {
      await page.keyboard.press("Shift+Tab");
      if (!(await insideDialog(page))) throw new Error(`Shift+Tab ${i + 1} left the dialog`);
    }
    // Focus parked on the (tabindex=-1) dialog container itself must not escape either.
    await page.locator(`${DIALOG} .product-gallery-description`).click();
    await page.keyboard.press("Shift+Tab");
    if (!(await insideDialog(page))) throw new Error("Shift+Tab after clicking dialog content escaped");
    await page.keyboard.press("Tab");
    if (!(await insideDialog(page))) throw new Error("Tab after clicking dialog content escaped");
    await page.keyboard.press("Escape");
    return { focusableCount };
  });

  await record("backdropClickCloses", async () => {
    await openFirst(page, base);
    // A click inside the dialog must NOT close it.
    await page.locator(`${DIALOG} .product-gallery-title`).click();
    if ((await page.locator(DIALOG).count()) !== 1) throw new Error("dialog closed on inner click");
    const box = await page.locator('[data-testid="product-lightbox-overlay"]').boundingBox();
    await page.mouse.click(box.x + 4, box.y + 4);
    await page.locator(DIALOG).waitFor({ state: "detached", timeout: 3000 });
    await page.waitForTimeout(200); // focus is restored on the next animation frame
    const focus = await triggerFocused(page);
    if (!focus.restored) throw new Error("focus not restored to trigger after backdrop close");
    return { focus };
  });

  await record("focusReturnAfterCloseButton", async () => {
    await page.goto(`${base}/platform`, { waitUntil: "load" });
    const trigger = page.locator(TRIGGER).first();
    await trigger.waitFor({ state: "visible", timeout: 15000 });
    await trigger.focus();
    await page.keyboard.press("Enter");
    await page.locator(DIALOG).waitFor({ state: "visible" });
    await page.locator('[data-testid="product-lightbox-close"]').click();
    await page.locator(DIALOG).waitFor({ state: "detached", timeout: 3000 });
    await page.waitForTimeout(150);
    const focus = await triggerFocused(page);
    if (!focus.restored) throw new Error("focus not restored after close button");
    return { focus };
  });

  await record("imageErrorState", async () => {
    const errCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const errPage = await errCtx.newPage();
    await errPage.goto(`${base}/platform`, { waitUntil: "load" });
    await errPage.locator(TRIGGER).first().waitFor({ state: "visible", timeout: 15000 });
    // Thumbnails are already loaded (optimized webp); abort only full-resolution PNGs requested from now on.
    let aborted = 0;
    await errCtx.route(/\.png(\?.*)?$/, (route) => {
      aborted += 1;
      return route.abort();
    });
    await errPage.locator(TRIGGER).first().click();
    await errPage.locator(DIALOG).waitFor({ state: "visible" });
    let via = "network-abort";
    try {
      await errPage.locator(`${DIALOG} [role="alert"]`).waitFor({ state: "visible", timeout: 6000 });
    } catch {
      // The PNG may already have been served from cache; fall back to the browser's own error event.
      via = "error-event";
      await errPage.evaluate(() =>
        document.querySelector('[data-testid="product-lightbox"] img')?.dispatchEvent(new Event("error")),
      );
      await errPage.locator(`${DIALOG} [role="alert"]`).waitFor({ state: "visible", timeout: 3000 });
    }
    const info = await errPage.locator(`${DIALOG} [role="alert"]`).evaluate((el) => ({
      text: el.textContent?.trim(),
      fallbackHref: el.querySelector("a")?.getAttribute("href") ?? null,
    }));
    if (!/Exhibit unavailable/.test(info.text || "")) throw new Error("error copy missing: " + info.text);
    if (!info.fallbackHref) throw new Error("no original-asset fallback link");
    if ((await errPage.locator(`${DIALOG} [data-testid="product-lightbox-close"]`).count()) !== 1)
      throw new Error("close button missing in error state");
    await errPage.keyboard.press("Escape");
    await errPage.locator(DIALOG).waitFor({ state: "detached", timeout: 3000 });
    await errPage.waitForTimeout(200); // focus is restored on the next animation frame
    const focus = await triggerFocused(errPage);
    await errCtx.close();
    if (!focus.restored) throw new Error("focus not restored after closing from the error state");
    return { via, abortedPngRequests: aborted, ...info, focus };
  });

  await ctx.close();

  const mctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  // Why the 38.39px /platform prev/next miss slipped through: this 390px check
  // only measured the close button (already 44px after the pin) and never the
  // .product-gallery-nav previous/next controls. A later CSS rule set those to
  // min-width: 2.4rem (38.39px). Measure close, previous, and next — layout box
  // and rendered box, after finite animations settle — on /platform (where nav
  // exists) and on a second multi-exhibit page so a single-exhibit route like
  // /demo cannot hide a nav-size regression.
  const routes390 = ["/platform", "/resources"];
  await record("mobile390ClosePrevNextTargets", async () => {
    const byRoute = {};
    for (const route of routes390) {
      const page = await mctx.newPage();
      try {
        await openFirst(page, base, { tap: true, route });
        await page.waitForFunction(
          () => document.querySelector('[data-testid="product-lightbox"] img')?.naturalWidth > 0,
          undefined,
          { timeout: 15000 },
        );
        await waitForFiniteAnimations(page);
        const m = await measure390Controls(page);
        assertMin44(`${route} close`, m.close);
        assertMin44(`${route} previous`, m.previous);
        assertMin44(`${route} next`, m.next);
        if (m.overflowX) throw new Error(`${route} horizontal overflow at 390px`);
        if (m.bodyOverflow !== "hidden") throw new Error(`${route} scroll not locked on mobile`);
        await page.locator('[data-testid="product-lightbox-close"]').tap();
        await page.locator(DIALOG).waitFor({ state: "detached", timeout: 3000 });
        await page.waitForTimeout(150);
        const focus = await triggerFocused(page);
        if (!focus.restored) throw new Error(`${route} focus not restored after tapping close`);
        byRoute[route] = { ...m, focus };
      } finally {
        await page.close();
      }
    }
    return { base, viewport: "390x844", routes: routes390, byRoute };
  });
  await mctx.close();
  return out;
}

async function main() {
  if (!configuredBase && !fs.existsSync(path.join(OUT, "index.html"))) {
    throw new Error("Missing out/index.html. Run npm run build:static first.");
  }

  const server = configuredBase
    ? null
    : http.createServer((request, response) => {
        const file = resolveFile(request.url || "/");
        if (!file) {
          response.writeHead(404);
          response.end("not found");
          return;
        }
        response.writeHead(200, {
          "content-type":
            mime[path.extname(file)] || "application/octet-stream",
        });
        fs.createReadStream(file).pipe(response);
      });
  if (server) await new Promise((resolve) => server.listen(PORT, resolve));
  const base = configuredBase || `http://127.0.0.1:${PORT}`;

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(`${base}/platform`, { waitUntil: "load" });
  const trigger = page
    .locator('main button[data-testid="product-screen-trigger"]')
    .first();
  await trigger.waitFor({ state: "visible", timeout: 15000 });
  const triggerCount = await page
    .locator('main button[data-testid="product-screen-trigger"]')
    .count();
  const triggerLabel = await trigger.getAttribute("aria-label");
  await trigger.click();
  const dialog = page.locator('[data-testid="product-lightbox"]');
  await dialog.waitFor({ state: "visible" });
  await dialog.locator("img").waitFor({ state: "visible" });
  await page.waitForFunction(
    () =>
      document.querySelector('[data-testid="product-lightbox"] img')
        ?.naturalWidth > 0,
    undefined,
    { timeout: 15000 },
  );
  const opened = await dialog.evaluate((element) => ({
    title: element.querySelector("h2")?.textContent?.trim() || "",
    imageLoaded: element.querySelector("img")?.naturalWidth > 0,
    hasClose: Boolean(
      element.querySelector('[data-testid="product-lightbox-close"]'),
    ),
    hasNavigation: Boolean(
      element.querySelector('[data-testid="product-lightbox-next"]'),
    ),
    bodyOverflow: document.body.style.overflow,
  }));
  const beforeTitle = opened.title;
  if (opened.hasNavigation)
    await page.locator('[data-testid="product-lightbox-next"]').click();
  const afterTitle = await dialog.locator("h2").textContent();
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const closed =
    (await page.locator('[data-testid="product-lightbox"]').count()) === 0;
  const focusState = await page.evaluate(() => ({
    restored:
      document.activeElement?.matches(
        'button[data-testid="product-screen-trigger"]',
      ) ?? false,
    tag: document.activeElement?.tagName ?? null,
    label: document.activeElement?.getAttribute("aria-label") ?? null,
  }));
  const focusRestored = focusState.restored;

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/platform`, { waitUntil: "load" });
  await page
    .locator('main button[data-testid="product-screen-trigger"]')
    .first()
    .click();
  await page
    .locator('[data-testid="product-lightbox"]')
    .waitFor({ state: "visible" });
  await page.waitForFunction(
    () =>
      document.querySelector('[data-testid="product-lightbox"] img')
        ?.naturalWidth > 0,
    undefined,
    { timeout: 15000 },
  );
  const mobile = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth,
    closeVisible: Boolean(
      document.querySelector('[data-testid="product-lightbox-close"]'),
    ),
  }));
  await page.keyboard.press("Escape");
  await context.close();

  const reducedContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(`${base}/platform`, {
    waitUntil: "load",
  });
  await reducedPage
    .locator('main button[data-testid="product-screen-trigger"]')
    .first()
    .click();
  await reducedPage
    .locator('[data-testid="product-lightbox"]')
    .waitFor({ state: "visible" });
  await reducedPage.waitForFunction(
    () =>
      document.querySelector('[data-testid="product-lightbox"] img')
        ?.naturalWidth > 0,
    undefined,
    { timeout: 15000 },
  );
  const reduced = await reducedPage
    .locator('[data-testid="product-lightbox"]')
    .evaluate(() => ({
      overlayAnimation: getComputedStyle(
        document.querySelector(".product-gallery-overlay"),
      ).animationName,
      dialogAnimation: getComputedStyle(
        document.querySelector(".product-gallery-dialog"),
      ).animationName,
    }));
  await reducedContext.close();
  const extended = await extendedChecks(browser, base);
  await browser.close();
  server?.close();

  const result = {
    base,
    baseSource: configuredBase ? "LIGHTBOX_BASE" : "local out/ static server",
    route: "/platform",
    triggerCount,
    triggerLabel,
    opened,
    beforeTitle,
    afterTitle,
    closed,
    focusRestored,
    focusState,
    mobile,
    reduced,
    extended,
  };
  console.log(JSON.stringify(result, null, 2));

  if (
    triggerCount < 1 ||
    !triggerLabel ||
    !opened.imageLoaded ||
    !opened.hasClose ||
    !opened.hasNavigation ||
    opened.bodyOverflow !== "hidden" ||
    beforeTitle === afterTitle ||
    !closed ||
    !focusRestored ||
    mobile.overflow ||
    !mobile.closeVisible ||
    reduced.overlayAnimation !== "none" ||
    reduced.dialogAnimation !== "none" ||
    Object.values(extended).some((entry) => !entry.pass)
  ) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
