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
const qaRunId = new Date().toISOString().replace(/[:.]/g, "-");
const artifactRoot = path.join("qa-artifacts", `ux-audit-${mode}-${new Date().toISOString().replace(/[:.]/g, "-")}`);
const screenshotDir = path.join(artifactRoot, "screenshots");
fs.mkdirSync(screenshotDir, { recursive: true });
let qaNavigationIndex = 0;

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
    route: "/?lifecycle=PKG",
    selector: '[data-qa="assurance-lifecycle-teaser"]',
    before: async (page) => {
      const teaser = page.locator('[data-qa="assurance-lifecycle-teaser"]');
      await teaser.waitFor({ state: "visible", timeout: 15000 });
      await teaser.scrollIntoViewIfNeeded();
      await page.waitForTimeout(750);
      await waitForLifecyclePanel(page, "10 PKG", "Release package");
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

const LIFECYCLE_LABELS = {
  REQ: "Requirement",
  APP: "Applicability",
  CTL: "Control",
  ASM: "Assessment",
  EVD: "Evidence",
  FND: "Finding",
  RSK: "Risk",
  CAP: "Corrective action",
  QA: "QA review",
  PKG: "Release package",
};

async function waitForLifecyclePanel(page, code, label) {
  await page.waitForFunction(
    ({ code, label }) => {
      const panel = document.querySelector('[data-qa="assurance-lifecycle-teaser"] article');
      const text = panel?.textContent?.replace(/\s+/g, " ") ?? "";
      return text.includes(code) && text.includes(label);
    },
    { code, label },
    { timeout: 15000 }
  );
}

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

function routeUrl(route) {
  const url = new URL(route, `${base}/`);
  if (mode === "remote") url.searchParams.set("__qa", `${qaRunId}-${++qaNavigationIndex}`);
  return url.toString();
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
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1,
    extraHTTPHeaders: mode === "remote" ? { "Cache-Control": "no-cache", Pragma: "no-cache" } : undefined,
  });
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

  async function captureConsoleFor(route, action, targetPage = page) {
    const messages = [];
    const pageErrors = [];
    const onConsole = (msg) => messages.push({ type: msg.type(), text: msg.text() });
    const onPageError = (err) => pageErrors.push(err.message);
    targetPage.on("console", onConsole);
    targetPage.on("pageerror", onPageError);
    try {
      const result = await action();
      return { result, messages, pageErrors };
    } finally {
      targetPage.off("console", onConsole);
      targetPage.off("pageerror", onPageError);
    }
  }

  for (const route of FULL_ROUTES) {
      const url = routeUrl(route);
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
    const featurePage = await context.newPage();
    const url = routeUrl(feature.route);
    const { messages, pageErrors } = await captureConsoleFor(feature.route, async () => {
      await featurePage.goto(url, { waitUntil: "load", timeout: 45000 });
      if (feature.before) await feature.before(featurePage);
      await featurePage.locator(feature.selector).waitFor({ state: "visible", timeout: 15000 });
    }, featurePage);
    const locator = featurePage.locator(feature.selector);
    const screenshot = path.join(screenshotDir, `feature-${feature.name}.png`);
    await locator.screenshot({ path: screenshot });
    const overflowX = await featurePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    const cspMessages = messages.filter((msg) => /content security policy|style-src/i.test(msg.text));
    report.features.push({ ...feature, overflowX, consoleErrors: messages.filter((msg) => msg.type === "error").length + pageErrors.length, cspMessages, pageErrors, screenshot });
    if (overflowX || cspMessages.length || pageErrors.length) {
      report.failures.push(`feature ${feature.name}: overflowX=${overflowX} csp=${cspMessages.length} pageErrors=${pageErrors.length}`);
    }
    await featurePage.close();
  }

  for (const route of ["/platform", "/security", "/resources"]) {
    await page.goto(routeUrl(route), { waitUntil: "load", timeout: 45000 });
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
    await page.goto(routeUrl(check.route), { waitUntil: "load", timeout: 45000 });
    const result = await noHeaderOverlap(page, check.selector);
    report.anchorChecks.push({ ...check, ...result });
    if (!result.ok) report.failures.push(`header overlap ${check.route} ${check.selector}: targetTop=${result.targetTop} headerBottom=${result.headerBottom}`);
  }

  await page.goto(routeUrl("/"), { waitUntil: "load" });
  const teaser = page.locator('[data-qa="assurance-lifecycle-teaser"]');
  await teaser.waitFor({ state: "visible", timeout: 15000 });
  await teaser.scrollIntoViewIfNeeded();
  await page.waitForTimeout(750);
  for (const code of ["REQ", "APP", "CTL", "ASM", "EVD", "FND", "RSK", "CAP", "QA", "PKG"]) {
    const button = teaser.getByRole("button", { name: new RegExp(`\\b${code}\\b`) });
    await button.click();
    await page.waitForTimeout(180);
    const panelText = await teaser.locator("article").innerText();
    if (!panelText.includes(code) || !panelText.includes(LIFECYCLE_LABELS[code])) {
      report.failures.push(`homepage lifecycle ${code} did not update panel; panel=${panelText.replace(/\s+/g, " ").slice(0, 120)}`);
    }
  }

  await page.goto(routeUrl("/platform"), { waitUntil: "load" });
  const platformModuleRows = await page.locator("#modules .platform-module-row").evaluateAll((rows) =>
    rows.map((row) => row.textContent?.replace(/\s+/g, " ").trim() ?? "")
  );
  const statusRows = platformModuleRows.filter((row) =>
    ["Current + configurable", "Current + preview", "Current + planned", "Current"].some((label) =>
      row.includes(label)
    )
  );
  const mixedRows = platformModuleRows.filter((row) =>
    ["Current + configurable", "Current + preview", "Current + planned"].some((label) => row.includes(label))
  );
  if (platformModuleRows.length !== 11 || statusRows.length !== 11 || mixedRows.length === 0) {
    report.failures.push(
      `/platform module list status labels incomplete: rows=${platformModuleRows.length} statusRows=${statusRows.length} mixedRows=${mixedRows.length}`
    );
  }

  await page.goto(routeUrl("/demo"), { waitUntil: "load" });
  const demoText = await page.locator("main").innerText();
  if (/\bFLT\b|\bVSL\b/.test(demoText)) report.failures.push("/demo still contains undocumented FLT/VSL codes");

  await page.goto(routeUrl("/demo?stage=CAP#chain-inspector"), { waitUntil: "load" });
  await page.getByRole("button", { name: /CAP-0455/ }).click();
  const inspectorText = await page.locator('[data-qa="chain-custody-inspector"]').innerText();
  if (/2026-08-15|2026-07-20/.test(inspectorText) || !/Demo day \+21/.test(inspectorText)) {
    report.failures.push("chain inspector sample dates are not rolling demo-day labels");
  }

  for (const route of ["/", "/pricing", "/platform", "/security"]) {
    await page.goto(routeUrl(route), { waitUntil: "load", timeout: 45000 });
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
