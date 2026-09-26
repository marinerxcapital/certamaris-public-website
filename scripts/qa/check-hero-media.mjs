#!/usr/bin/env node
/**
 * check-hero-media.mjs
 *
 * Guards the landing-page hero media contract introduced 2026-09-26:
 *
 *  1. Public derivatives exist and stay inside a size budget.
 *  2. The static export is poster-first: the poster image is in the HTML, the
 *     <video> element is not (it is attached after hydration).
 *  3. Desktop attaches the 1280x720 loop; narrow viewports attach the 480p loop.
 *  4. The loop is muted, looping, inline, control-free, and decorative.
 *  5. prefers-reduced-motion mounts no video at all and keeps the poster.
 *  6. The hero never produces horizontal overflow.
 *
 * Usage:
 *   node scripts/qa/check-hero-media.mjs
 *   node scripts/qa/check-hero-media.mjs --base https://certamaris.com
 *   CHROMIUM_PATH=/path/to/chrome node scripts/qa/check-hero-media.mjs
 */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const OUT = "out";
const PORT = Number(process.env.QA_PORT || 4541);
const SHOT_DIR = path.join("qa-artifacts", "hero-media");

// --base runs the same browser contract against a live origin (production
// verification after a deploy); the local out/ checks are skipped there.
const baseArgIndex = process.argv.indexOf("--base");
const remoteBase =
  baseArgIndex > -1 && process.argv[baseArgIndex + 1]
    ? String(process.argv[baseArgIndex + 1]).replace(/\/+$/, "")
    : "";
const shotSuffix = remoteBase ? "-prod" : "";

const POSTER_WEBP = "/media/certamaris-vessel-hero-2026-09-poster.webp";
const POSTER_JPG = "/media/certamaris-vessel-hero-2026-09-poster.jpg";
const DESKTOP_MP4 = "/media/certamaris-vessel-hero-2026-09.mp4";
const MOBILE_MP4 = "/media/certamaris-vessel-hero-2026-09-mobile.mp4";

// Generous ceilings - the point is to catch an accidental re-encode of the raw
// source, not to police a few hundred kilobytes.
const MAX_BYTES = {
  [DESKTOP_MP4]: 12 * 1024 * 1024,
  [MOBILE_MP4]: 6 * 1024 * 1024,
  [POSTER_WEBP]: 160 * 1024,
  [POSTER_JPG]: 220 * 1024,
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function resolveFile(urlPath) {
  const parsed = new URL(urlPath, "http://127.0.0.1");
  const clean = decodeURIComponent(parsed.pathname).replace(/\/+$/, "") || "/";
  const candidates =
    clean === "/"
      ? [path.join(OUT, "index.html")]
      : [path.join(OUT, clean), path.join(OUT, `${clean}.html`), path.join(OUT, clean, "index.html")];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
  res.end(fs.readFileSync(file));
});

const failures = [];
const passes = [];

function check(condition, message) {
  if (condition) passes.push(message);
  else failures.push(message);
}

function checkStaticAssets() {
  for (const asset of Object.keys(MAX_BYTES)) {
    const file = path.join(OUT, asset.replace(/^\//, ""));
    if (!fs.existsSync(file)) {
      failures.push(`missing derivative ${asset}`);
      continue;
    }
    const size = fs.statSync(file).size;
    check(
      size > 0 && size <= MAX_BYTES[asset],
      `${asset} is ${size} bytes (budget ${MAX_BYTES[asset]})`
    );
  }
}

function checkStaticHtml() {
  const html = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
  check(html.includes(POSTER_WEBP), "static HTML references the hero poster");
  check(!/<video[\s>]/i.test(html), "static HTML ships no <video> element (poster-first)");
  check((html.match(/<h1[\s>]/gi) || []).length === 1, "static HTML has exactly one h1");
  check(html.includes("hero-cinematic"), "static HTML contains the cinematic hero section");
  check(/fetchpriority="high"/i.test(html), "hero poster is fetched with high priority");
}

async function overflow(page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
}

const heroVideo = (page) => page.locator(".hero-film video");

async function assertLoopAttributes(page, label) {
  const attrs = await heroVideo(page).evaluate((el) => ({
    muted: el.muted,
    loop: el.loop,
    playsInline: el.playsInline,
    controls: el.controls,
    autoplay: el.autoplay,
    preload: el.preload,
    ariaHidden: el.getAttribute("aria-hidden"),
    tabIndex: el.tabIndex,
    currentSrc: el.currentSrc || el.querySelector("source")?.src || "",
  }));
  check(attrs.muted === true, `${label}: loop is muted`);
  check(attrs.loop === true, `${label}: loop repeats`);
  check(attrs.playsInline === true, `${label}: loop plays inline`);
  check(attrs.controls === false, `${label}: loop exposes no native controls`);
  check(attrs.autoplay === true, `${label}: loop is marked autoplay`);
  check(attrs.preload === "metadata", `${label}: loop preloads metadata only`);
  check(attrs.ariaHidden === "true", `${label}: loop is decorative for assistive tech`);
  check(attrs.tabIndex === -1, `${label}: loop is out of the tab order`);
  return attrs.currentSrc;
}

async function main() {
  if (!remoteBase) {
    if (!fs.existsSync(path.join(OUT, "index.html"))) {
      console.error("out/ is missing. Run npm run build:static first.");
      process.exit(2);
    }
    checkStaticAssets();
    checkStaticHtml();
  }

  fs.mkdirSync(SHOT_DIR, { recursive: true });
  if (!remoteBase) {
    await new Promise((resolve) => server.listen(PORT, resolve));
  }
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const base = remoteBase || `http://127.0.0.1:${PORT}`;

  try {
    // Desktop: the 720p loop attaches and starts.
    {
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      const page = await context.newPage();
      await page.goto(`${base}/`, { waitUntil: "load" });
      check(await page.locator(".hero-film__poster").first().isVisible(), "desktop: poster paints");
      await heroVideo(page).waitFor({ state: "attached", timeout: 15000 });
      const src = await assertLoopAttributes(page, "desktop");
      check(src.endsWith(DESKTOP_MP4), `desktop: video source is the 720p derivative (${src})`);
      await page.waitForTimeout(1500);
      const live = await page.locator(".hero-film").getAttribute("data-live");
      check(live === "true", "desktop: loop reached playing state");
      check((await overflow(page)) === 0, "desktop: no horizontal overflow");
      await page.screenshot({ path: path.join(SHOT_DIR, `desktop-1280x900${shotSuffix}.png`) });
      await page.screenshot({
        path: path.join(SHOT_DIR, `desktop-1280x900-full${shotSuffix}.png`),
        fullPage: true,
      });
      await context.close();
    }

    // Narrow viewport: the 480p loop attaches.
    {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
      });
      const page = await context.newPage();
      await page.goto(`${base}/`, { waitUntil: "load" });
      await heroVideo(page).waitFor({ state: "attached", timeout: 15000 });
      const src = await assertLoopAttributes(page, "mobile");
      check(src.endsWith(MOBILE_MP4), `mobile: video source is the 480p derivative (${src})`);
      check((await overflow(page)) === 0, "mobile: no horizontal overflow");
      await page.screenshot({ path: path.join(SHOT_DIR, `mobile-390x844${shotSuffix}.png`) });
      await context.close();
    }

    // Reduced motion: poster only, no video element, no overflow.
    {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.goto(`${base}/`, { waitUntil: "load" });
      await page.waitForTimeout(800);
      check((await heroVideo(page).count()) === 0, "reduced motion: no video element is mounted");
      check(
        await page.locator(".hero-film__poster").first().isVisible(),
        "reduced motion: poster remains visible"
      );
      check(await page.locator("#hero-title").isVisible(), "reduced motion: hero headline is visible");
      check((await overflow(page)) === 0, "reduced motion: no horizontal overflow");
      await page.screenshot({ path: path.join(SHOT_DIR, `reduced-motion-1280x900${shotSuffix}.png`) });
      await context.close();
    }
  } finally {
    await browser.close();
    if (!remoteBase) server.close();
  }

  console.log(`PASS (${passes.length})`);
  for (const p of passes) console.log(`  ok ${p}`);
  if (failures.length) {
    console.log(`FAIL (${failures.length})`);
    for (const f of failures) console.log(`  x ${f}`);
  }
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
