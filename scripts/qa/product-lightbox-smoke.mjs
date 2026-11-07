#!/usr/bin/env node
// Focused contract test for the shared product exhibit viewer.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const OUT = path.resolve("out");
const PORT = Number(process.env.LIGHTBOX_QA_PORT || 4637);
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

async function main() {
  if (!fs.existsSync(path.join(OUT, "index.html"))) {
    throw new Error("Missing out/index.html. Run npm run build:static first.");
  }

  const server = http.createServer((request, response) => {
    const file = resolveFile(request.url || "/");
    if (!file) {
      response.writeHead(404);
      response.end("not found");
      return;
    }
    response.writeHead(200, {
      "content-type": mime[path.extname(file)] || "application/octet-stream",
    });
    fs.createReadStream(file).pipe(response);
  });
  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${PORT}/platform`, { waitUntil: "load" });
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
  await page.waitForTimeout(100);
  const closed =
    (await page.locator('[data-testid="product-lightbox"]').count()) === 0;
  const focusRestored = await page.evaluate(
    () =>
      document.activeElement?.matches(
        'button[data-testid="product-screen-trigger"]',
      ) ?? false,
  );

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:${PORT}/platform`, { waitUntil: "load" });
  await page
    .locator('main button[data-testid="product-screen-trigger"]')
    .first()
    .click();
  await page
    .locator('[data-testid="product-lightbox"]')
    .waitFor({ state: "visible" });
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
  await reducedPage.goto(`http://127.0.0.1:${PORT}/platform`, {
    waitUntil: "load",
  });
  await reducedPage
    .locator('main button[data-testid="product-screen-trigger"]')
    .first()
    .click();
  await reducedPage
    .locator('[data-testid="product-lightbox"]')
    .waitFor({ state: "visible" });
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
  await browser.close();
  server.close();

  const result = {
    route: "/platform",
    triggerCount,
    triggerLabel,
    opened,
    beforeTitle,
    afterTitle,
    closed,
    focusRestored,
    mobile,
    reduced,
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
    reduced.dialogAnimation !== "none"
  ) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
