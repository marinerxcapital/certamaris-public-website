#!/usr/bin/env node
// UX-audit browser QA and screenshot capture.
// Local mode serves out/ with the same CSP shape as the Worker; --base tests a live/staging URL.

import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const OUT = "out";
const PORT = Number(process.env.UX_QA_PORT || 4531);
const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.split("=");
  return [key.replace(/^--/, ""), rest.join("=") || "true"];
}));

const userBase = args.get("base");
const mode = userBase ? "remote" : "local";
const base = userBase ? String(userBase).replace(/\/+$/, "") : `http://127.0.0.1:${PORT}`;
const artifactRoot = path.join("qa-artifacts", `ux-audit-${mode}-${new Date().toISOString().replace(/[:.]/g, "-")}`);
const screenshotDir = path.join(artifactRoot, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });

const FULL_ROUTES = [
  "/",
  "/demo",
  "/pricing",
  "/platform",
  "/platform/evidence",
  "/resources",
  "/security",
  "/trust",
  "/trust/procurement",
  "/trust/assurance-model",
  "/contact",
  "/why-certamaris",
  "/who-we-serve",
  "/who-we-serve/ship-owners",
  "/who-we-serve/operators",
  "/who-we-serve/technical-managers-dpas",
  "/who-we-serve/maritime-it-ot",
  "/who-we-serve/vessel-masters-officers",
  "/who-we-serve/classification-survey",
  "/who-we-serve/insurers-pi",
  "/who-we-serve/maritime-service-providers",
];

const FEATURE_CAPTURES = [
  { name: "home-fleet-assurance-workbench", route: "/", selector: '[data-qa="fleet-assurance-workbench"]' },
  {
    name: "home-lifecycle-pkg-state",
    route: "/",
    selector: '[data-qa="assurance-lifecycle-teaser"]',
    before: async (page) => {
      const teaser = page.locator('[data-qa="assurance-lifecycle-teaser"]');
      for (const code of ["REQ", "APP", "CTL", "ASM", "EVD", "FND", "RSK", "CAP", "QA", "PKG"]) {
        await teaser.getByRole("button", { name: new RegExp(`\\b${code}\\b`) }).click();
      }
      await page.getByRole("heading", { name: "Release package" }).waitFor();
    },
  },
  {
    name: "demo-chain-custody-inspector",
    route: "/demo?stage=CAP#chain-inspector",
    selector: '[data-qa="chain-custody-inspector"]',
  },
  { name: "pricing-calculator-v2", route: "/pricing", selector: '[data-qa="pricing-calculator-v2"]' },
  { name: "evidence-simulator-v2", route: "/platform/evidence", selector: '[data-qa="evidence-simulator-v2"]' },
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
};

function routeName(route) {
  return (route === "/" ? "home" : route.replace(/^\//, "").replace(/[/?#=&]+/g, "-")).replace(/-+$/g, "");
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

function sha256Base64(value) {
  return crypto.createHash("sha256").update(value).digest("base64");
}

function cspForHtml(html) {
  const scriptHashes = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => `'sha256-${sha256Base64(match[1])}'`);
  const styleHashes = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => `'sha256-${sha256Base64(match[1])}'`);
  return [
    "default-src 'self'",
    `script-src 'self' https://static.cloudflareinsights.com ${[...new Set(scriptHashes)].join(" ")}`.trim(),
    `style-src 'self' ${[...new Set(styleHashes)].join(" ")}`.trim(),
    "style-src-attr 'unsafe-inline'",
    "img-src 'self' data:",
    "media-src 'self'",
    "font-src 'self' data:",
    "connect-src 'self' https://app.certamaris.com",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ") + ";";
}

function localServer() {
  return http.createServer((req, res) => {
    const file = resolveFile(req.url);
    if (!file) {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("not found");
      return;
    }
    const body = fs.readFileSync(file);
    const headers = { "content-type": MIME[path.extname(file)] || "application/octet-stream" };
    if (headers["content-type"].includes("text/html")) headers["content-security-policy"] = cspForHtml(String(body));
    res.writeHead(200, headers);
    res.end(body);
  });
}

async function noHeaderOverlap(page, selector) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  return page.evaluate((sel) => {
    const target = document.querySelector(sel);
    const header = document.querySelector("header");
    if (!target || !header) return { ok: false, targetTop: null, headerBottom: null };
    const targetTop = target.getBoundingClientRect().top;
    const headerBottom = header.getBoundingClientRect().bottom;
    return { ok: targetTop >= headerBottom, targetTop, headerBottom };
  }, selector);
}

async function settleProductExhibits(page) {
  const figures = page.locator("figure.product-exhibit");
  const count = await figures.count();
  for (let index = 0; index < count; index += 1) {
    await figures.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
  }
}

async function visibleProductExhibits(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll("figure.product-exhibit")].map((figure, index) => {
      const img = figure.querySelector("img");
      const rect = img?.getBoundingClientRect();
      const styles = img ? getComputedStyle(img) : null;
      return {
        index,
        src: img?.currentSrc || img?.src || "",
        complete: Boolean(img?.complete),
        naturalWidth: img?.naturalWidth || 0,
        naturalHeight: img?.naturalHeight || 0,
        width: rect?.width || 0,
        height: rect?.height || 0,
        opacity: styles?.opacity || "",
        visibility: styles?.visibility || "",
        display: styles?.display || "",
      };
    })
  );
}

async function main() {
  if (mode === "local" && !fs.existsSync(path.join(OUT, "index.html"))) {
    throw new Error("out/ is missing. Run npm run build:static first.");
  }

  const server = mode === "local" ? localServer() : null;
  if (server) await new Promise((resolve) => server.listen(PORT, resolve));

  const axeSource = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const report = {
    mode,
    base,
    artifactRoot,
    routes: [],
    features: [],
    productExhibits: [],
    anchorChecks: [],
    axe: [],
    failures: [],
  };

  async function captureConsoleFor(route, action) {
    const messages = [];
    const pageErrors = [];
    const onConsole = (msg) => messages.push({ type: msg.type(), text: msg.text() });
    const onPageError = (err) => pageErrors.push(err.message);
    page.on("console", onConsole);
    page.on("pageerror", onPageError);
    try {
      const result = await action();
      return { result, messages, pageErrors };
    } finally {
      page.off("console", onConsole);
      page.off("pageerror", onPageError);
    }
  }

  for (const route of FULL_ROUTES) {
    const url = `${base}${route}`;
    const { messages, pageErrors } = await captureConsoleFor(route, async () => {
      const response = await page.goto(url, { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(250);
      return response;
    });
    const response = page.mainFrame().url() ? await page.request.get(url).catch(() => null) : null;
    const status = response?.status() ?? null;
    const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    const cspMessages = messages.filter((msg) => /content security policy|style-src/i.test(msg.text));
    const consoleErrors = messages.filter((msg) => msg.type === "error").length + pageErrors.length;
    const screenshot = path.join(screenshotDir, `full-${routeName(route)}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });
    report.routes.push({ route, status, overflowX, consoleErrors, cspMessages, pageErrors, screenshot });
    if (status !== 200 || overflowX || cspMessages.length || pageErrors.length) {
      report.failures.push(`route ${route}: status=${status} overflowX=${overflowX} csp=${cspMessages.length} pageErrors=${pageErrors.length}`);
    }
  }

  for (const feature of FEATURE_CAPTURES) {
    const url = `${base}${feature.route}`;
    const { messages, pageErrors } = await captureConsoleFor(feature.route, async () => {
      await page.goto(url, { waitUntil: "load", timeout: 45000 });
      if (feature.before) await feature.before(page);
      await page.locator(feature.selector).waitFor({ state: "visible", timeout: 15000 });
    });
    const locator = page.locator(feature.selector);
    const screenshot = path.join(screenshotDir, `feature-${feature.name}.png`);
    await locator.screenshot({ path: screenshot });
    const overflowX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    const cspMessages = messages.filter((msg) => /content security policy|style-src/i.test(msg.text));
    report.features.push({ ...feature, overflowX, consoleErrors: messages.filter((msg) => msg.type === "error").length + pageErrors.length, cspMessages, pageErrors, screenshot });
    if (overflowX || cspMessages.length || pageErrors.length) {
      report.failures.push(`feature ${feature.name}: overflowX=${overflowX} csp=${cspMessages.length} pageErrors=${pageErrors.length}`);
    }
  }

  for (const route of ["/platform", "/security", "/resources"]) {
    await page.goto(`${base}${route}`, { waitUntil: "load", timeout: 45000 });
    await settleProductExhibits(page);
    const exhibits = await visibleProductExhibits(page);
    report.productExhibits.push({ route, exhibits });
    for (const exhibit of exhibits) {
      const visible =
        exhibit.complete &&
        exhibit.naturalWidth > 0 &&
        exhibit.naturalHeight > 0 &&
        exhibit.width > 120 &&
        exhibit.height > 80 &&
        exhibit.opacity !== "0" &&
        exhibit.visibility !== "hidden" &&
        exhibit.display !== "none";
      if (!visible) report.failures.push(`product exhibit ${route} #${exhibit.index} not visibly loaded`);
    }
  }

  for (const check of [
    { route: "/platform/evidence", selector: '[data-qa="evidence-simulator-v2"]' },
    { route: "/demo?stage=CAP#chain-inspector", selector: '[data-qa="chain-custody-inspector"]' },
    { route: "/resources", selector: "main h1" },
    { route: "/security", selector: "main h1" },
  ]) {
    await page.goto(`${base}${check.route}`, { waitUntil: "load", timeout: 45000 });
    const result = await noHeaderOverlap(page, check.selector);
    report.anchorChecks.push({ ...check, ...result });
    if (!result.ok) report.failures.push(`header overlap ${check.route} ${check.selector}: targetTop=${result.targetTop} headerBottom=${result.headerBottom}`);
  }

  await page.goto(`${base}/`, { waitUntil: "load" });
  const teaser = page.locator('[data-qa="assurance-lifecycle-teaser"]');
  for (const code of ["REQ", "APP", "CTL", "ASM", "EVD", "FND", "RSK", "CAP", "QA", "PKG"]) {
    await teaser.getByRole("button", { name: new RegExp(`\\b${code}\\b`) }).click();
    await page.getByText(code, { exact: true }).first().waitFor();
  }
  await page.getByRole("heading", { name: "Release package" }).waitFor();

  await page.goto(`${base}/platform`, { waitUntil: "load" });
  const platformModules = await page.locator("#modules").innerText();
  if ((platformModules.match(/\bCurrent\b/g) || []).length >= 8) {
    report.failures.push("/platform module list still appears uniformly Current");
  }

  await page.goto(`${base}/demo`, { waitUntil: "load" });
  const demoText = await page.locator("main").innerText();
  if (/\bFLT\b|\bVSL\b/.test(demoText)) report.failures.push("/demo still contains undocumented FLT/VSL codes");

  await page.goto(`${base}/demo?stage=CAP#chain-inspector`, { waitUntil: "load" });
  await page.getByRole("button", { name: /CAP-0455/ }).click();
  const inspectorText = await page.locator('[data-qa="chain-custody-inspector"]').innerText();
  if (/2026-08-15|2026-07-20/.test(inspectorText) || !/Demo day \+21/.test(inspectorText)) {
    report.failures.push("chain inspector sample dates are not rolling demo-day labels");
  }

  for (const route of ["/", "/pricing", "/platform", "/security"]) {
    await page.goto(`${base}${route}`, { waitUntil: "load", timeout: 45000 });
    await page.evaluate(axeSource);
    const violations = await page.evaluate(async () => {
      const result = await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
      });
      return result.violations
        .filter((violation) => ["serious", "critical"].includes(violation.impact))
        .map((violation) => ({
          id: violation.id,
          impact: violation.impact,
          help: violation.help,
          nodes: violation.nodes.length,
        }));
    });
    report.axe.push({ route, violations });
    for (const violation of violations) {
      report.failures.push(`axe ${route}: ${violation.id} ${violation.impact} x${violation.nodes}`);
    }
  }

  await context.close();
  await browser.close();
  if (server) server.close();

  const reportPath = path.join(artifactRoot, "report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  const summaryPath = path.join(artifactRoot, "README.md");
  fs.writeFileSync(
    summaryPath,
    [
      "# CertaMaris UX Audit Browser QA",
      "",
      `Mode: ${mode}`,
      `Base: ${base}`,
      `Full-page screenshots: ${FULL_ROUTES.length}`,
      `Feature screenshots: ${FEATURE_CAPTURES.length}`,
      `Failures: ${report.failures.length}`,
      "",
      "## Failure List",
      ...(report.failures.length ? report.failures.map((failure) => `- ${failure}`) : ["- None"]),
      "",
    ].join("\n")
  );

  console.log(`UX audit artifacts: ${artifactRoot}`);
  console.log(`routes=${report.routes.length} features=${report.features.length} failures=${report.failures.length}`);
  if (report.failures.length) {
    for (const failure of report.failures) console.log(`FAIL ${failure}`);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
