#!/usr/bin/env node
/**
 * Vision-oriented SEO screenshot crawl.
 *
 * Default local run:
 *   node scripts/qa/seo-visual-qa.mjs --label before
 *
 * Production verification:
 *   node scripts/qa/seo-visual-qa.mjs --label live-after --verify --base https://certamaris.com
 */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const OUT = "out";
const PORT = Number(process.env.SEO_VISUAL_QA_PORT || 4541);
const args = parseArgs(process.argv.slice(2));
const label = String(args.label || "current");
const base = args.base ? String(args.base).replace(/\/+$/, "") : `http://127.0.0.1:${PORT}`;
const remote = Boolean(args.base);
const verify = Boolean(args.verify);
const root = path.join("qa-artifacts", "seo-opt-2026-10-22", label);
const screenshotDir = path.join(root, "screenshots");

const ALL_ROUTE_VIEWPORTS = [
  { name: "390x844-mobile", width: 390, height: 844 },
  { name: "1440x900-desktop", width: 1440, height: 900 },
];

const FAMILY_VIEWPORTS = [
  { name: "360x800", width: 360, height: 800 },
  { name: "800x360-landscape", width: 800, height: 360 },
  { name: "390x844", width: 390, height: 844 },
  { name: "844x390-landscape", width: 844, height: 390 },
  { name: "430x932", width: 430, height: 932 },
  { name: "932x430-landscape", width: 932, height: 430 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1280x800", width: 1280, height: 800 },
  { name: "1440x900", width: 1440, height: 900 },
];

const FAMILY_ROUTES = [
  "/",
  "/platform",
  "/platform/evidence",
  "/solutions/imo-msc-428-98",
  "/who-we-serve/ship-owners",
  "/compliance/imo",
  "/resources",
  "/topics/imo-msc-428-98-compliance",
  "/about",
  "/security",
  "/trust",
  "/pricing",
  "/faq",
  "/demo",
  "/contact",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
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

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) parsed[key] = true;
    else {
      parsed[key] = value;
      index += 1;
    }
  }
  return parsed;
}

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

function server() {
  return http.createServer((request, response) => {
    const file = resolveFile(request.url || "/");
    if (!file) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("not found");
      return;
    }
    response.writeHead(200, {
      "content-type": MIME[path.extname(file)] || "application/octet-stream",
    });
    response.end(fs.readFileSync(file));
  });
}

function sitemapRoutes() {
  const xml = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)]
    .map((match) => {
      const url = new URL(match[1]);
      return url.pathname.replace(/\/+$/, "") || "/";
    })
    .filter((route, index, routes) => routes.indexOf(route) === index);
}

function fileSafe(route) {
  if (route === "/") return "home";
  return route.replace(/^\//, "").replace(/[^a-z0-9-]+/gi, "-");
}

function routeUrl(route) {
  const url = new URL(route, `${base}/`);
  if (remote) url.searchParams.set("__seo_visual", `${label}-${Date.now()}`);
  return url.toString();
}

async function inspect(page) {
  return page.evaluate(() => ({
    h1Count: document.querySelectorAll("main h1").length,
    h1Text: document.querySelector("main h1")?.textContent?.replace(/\s+/g, " ").trim() || "",
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    pageHeight: document.documentElement.scrollHeight,
    brokenImages: [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
    pixelGrid: Boolean(document.querySelector(".pixel-grid-background")),
    nav: Boolean(document.querySelector('header nav[aria-label="Primary"]')),
    footer: Boolean(document.querySelector("footer.footer-premium")),
  }));
}

async function main() {
  if (!remote && !fs.existsSync(path.join(OUT, "index.html"))) {
    throw new Error("out/ is missing. Run npm run build:static first.");
  }
  fs.mkdirSync(screenshotDir, { recursive: true });

  const routes = sitemapRoutes();
  const local = remote ? null : server();
  if (local) await new Promise((resolve) => local.listen(PORT, resolve));

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const report = {
    label,
    base,
    remote,
    verify,
    generatedAt: new Date().toISOString(),
    routeCount: routes.length,
    allRouteViewports: ALL_ROUTE_VIEWPORTS.length,
    familyRoutes: FAMILY_ROUTES.length,
    familyViewports: FAMILY_VIEWPORTS.length,
    observations: [],
    failures: [],
  };

  for (const viewport of ALL_ROUTE_VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.width < 768,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    for (const route of routes) {
      let consoleErrors = 0;
      const consoleSamples = [];
      const networkErrors = [];
      const onConsole = (message) => {
        if (message.type() !== "error") return;
        consoleErrors += 1;
        if (consoleSamples.length < 4) consoleSamples.push(message.text().slice(0, 220));
      };
      const onPageError = (error) => {
        consoleErrors += 1;
        if (consoleSamples.length < 4) consoleSamples.push(String(error).slice(0, 220));
      };
      const onResponse = (response) => {
        if (response.status() >= 400) {
          networkErrors.push({ status: response.status(), url: response.url().slice(0, 500) });
        }
      };
      page.on("console", onConsole);
      page.on("pageerror", onPageError);
      page.on("response", onResponse);

      const response = await page.goto(routeUrl(route), { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(140);
      const state = await inspect(page);
      const prefix = `${fileSafe(route)}--${viewport.name}`;
      const fold = path.join(screenshotDir, `${prefix}--fold.jpg`);
      const full = path.join(screenshotDir, `${prefix}--full.jpg`);
      await page.screenshot({ path: fold, type: "jpeg", quality: 82, fullPage: false });
      await page.screenshot({ path: full, type: "jpeg", quality: 78, fullPage: true });

      const observation = {
        route,
        viewport,
        status: response?.status() ?? null,
        consoleErrors,
        consoleSamples,
        networkErrors,
        screenshots: { fold, full },
        ...state,
      };
      report.observations.push(observation);

      if (observation.status !== 200) report.failures.push(`${route} ${viewport.name}: HTTP ${observation.status}`);
      if (observation.overflowX > 0) {
        report.failures.push(`${route} ${viewport.name}: overflow ${observation.overflowX}px`);
      }
      if (observation.h1Count !== 1) {
        report.failures.push(`${route} ${viewport.name}: H1 count ${observation.h1Count}`);
      }
      if (observation.brokenImages.length) {
        report.failures.push(`${route} ${viewport.name}: ${observation.brokenImages.length} broken image(s)`);
      }

      if (verify) {
        const isKnownLocalOnly = (url) => {
          if (remote) return false;
          if (/[?&]_rsc=/.test(url)) return true;
          try {
            return new URL(url).pathname === "/api/status";
          } catch {
            return false;
          }
        };
        const knownLocalPrefetch = observation.networkErrors.filter((error) =>
          isKnownLocalOnly(error.url)
        ).length;
        const unexpectedNetwork = observation.networkErrors.filter(
          (error) => !isKnownLocalOnly(error.url)
        );
        if (unexpectedNetwork.length) {
          report.failures.push(`${route} ${viewport.name}: ${unexpectedNetwork.length} network error(s)`);
        }
        if (observation.consoleErrors > knownLocalPrefetch) {
          report.failures.push(`${route} ${viewport.name}: ${observation.consoleErrors} console error(s)`);
        }
      }

      page.off("console", onConsole);
      page.off("pageerror", onPageError);
      page.off("response", onResponse);
    }
    await context.close();
    console.log(`all-routes ${viewport.name}: complete`);
  }

  for (const viewport of FAMILY_VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.width < 768,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    for (const route of FAMILY_ROUTES) {
      const response = await page.goto(routeUrl(route), { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(140);
      const state = await inspect(page);
      const prefix = `family-${fileSafe(route)}--${viewport.name}`;
      const full = path.join(screenshotDir, `${prefix}--full.jpg`);
      await page.screenshot({ path: full, type: "jpeg", quality: 80, fullPage: true });
      const observation = {
        route,
        viewport,
        familyCapture: true,
        status: response?.status() ?? null,
        screenshots: { full },
        ...state,
      };
      report.observations.push(observation);
      if (observation.status !== 200) report.failures.push(`${route} ${viewport.name}: HTTP ${observation.status}`);
      if (observation.overflowX > 0) {
        report.failures.push(`${route} ${viewport.name}: overflow ${observation.overflowX}px`);
      }
      if (observation.h1Count !== 1) {
        report.failures.push(`${route} ${viewport.name}: H1 count ${observation.h1Count}`);
      }
      if (observation.brokenImages.length) {
        report.failures.push(`${route} ${viewport.name}: ${observation.brokenImages.length} broken image(s)`);
      }
    }
    await context.close();
    console.log(`family-matrix ${viewport.name}: complete`);
  }

  await browser.close();
  if (local) local.close();

  fs.writeFileSync(path.join(root, "report.json"), JSON.stringify(report, null, 2));
  fs.writeFileSync(
    path.join(root, "README.md"),
    [
      "# CertaMaris SEO Visual QA",
      "",
      `- Label: ${label}`,
      `- Base: ${base}`,
      `- Generated: ${report.generatedAt}`,
      `- Sitemap routes: ${report.routeCount}`,
      `- Full canonical crawl: ${report.routeCount} x ${report.allRouteViewports} widths, fold + full page`,
      `- Route-family matrix: ${report.familyRoutes} x ${report.familyViewports} viewport/orientation checks`,
      `- Failures: ${report.failures.length}`,
      "",
      "## Failures",
      ...(report.failures.length ? report.failures.map((failure) => `- ${failure}`) : ["- None"]),
      "",
    ].join("\n")
  );

  console.log(`SEO visual QA artifacts: ${root}`);
  console.log(`routes=${report.routeCount} observations=${report.observations.length} failures=${report.failures.length}`);
  for (const failure of report.failures) console.log(`FAIL ${failure}`);
  if (verify && report.failures.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
