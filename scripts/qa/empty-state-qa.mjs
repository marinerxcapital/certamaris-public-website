#!/usr/bin/env node
/**
 * Empty-state visual and interaction QA.
 *
 * Usage:
 *   node scripts/qa/empty-state-qa.mjs --label before
 *   node scripts/qa/empty-state-qa.mjs --label after --verify
 *   node scripts/qa/empty-state-qa.mjs --label live-after --verify --base https://certamaris.com
 */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const OUT = "out";
const PORT = Number(process.env.EMPTY_STATE_QA_PORT || 4537);
const args = parseArgs(process.argv.slice(2));
const label = String(args.label || "current");
const base = args.base ? String(args.base).replace(/\/+$/, "") : `http://127.0.0.1:${PORT}`;
const remote = Boolean(args.base);
const verify = Boolean(args.verify);
const artifactRoot = path.join("qa-artifacts", "empty-state-revamp-2026-10-22", label);
const screenshotDir = path.join(artifactRoot, "screenshots");

const ROUTES = [
  { route: "/about/partners", variant: "partnership" },
  { route: "/about/careers", variant: "careers" },
  { route: "/about/press", variant: "press" },
];

const VIEWPORTS = [
  { name: "360x800-portrait", width: 360, height: 800 },
  { name: "800x360-landscape", width: 800, height: 360 },
  { name: "390x844-portrait", width: 390, height: 844 },
  { name: "844x390-landscape", width: 844, height: 390 },
  { name: "430x932-portrait", width: 430, height: 932 },
  { name: "932x430-landscape", width: 932, height: 430 },
  { name: "768x1024-portrait", width: 768, height: 1024 },
  { name: "1024x768-landscape", width: 1024, height: 768 },
  { name: "1280x800-desktop", width: 1280, height: 800 },
  { name: "800x1280-narrow-tall", width: 800, height: 1280 },
  { name: "1440x900-wide", width: 1440, height: 900 },
  { name: "900x1440-tall-wide", width: 900, height: 1440 },
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

function localServer() {
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

function routeUrl(route) {
  const url = new URL(route, `${base}/`);
  if (remote) url.searchParams.set("__empty_state_qa", `${label}-${Date.now()}`);
  return url.toString();
}

function fileSafe(value) {
  return value.replace(/[^a-z0-9-]+/gi, "-").replace(/^-+|-+$/g, "");
}

async function pageSnapshot(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };

    const targets = [...document.querySelectorAll(".empty-state a, .empty-state button")]
      .filter(visible)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          text: (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 100),
          width: Math.round(rect.width * 10) / 10,
          height: Math.round(rect.height * 10) / 10,
        };
      })
      .filter((target) => target.width < 44 || target.height < 44);

    return {
      h1Count: document.querySelectorAll("main h1").length,
      h1Text: document.querySelector("main h1")?.textContent?.replace(/\s+/g, " ").trim() || "",
      emptyStateCount: document.querySelectorAll('[data-qa="empty-state"]').length,
      emptyVariant: document.querySelector('[data-qa="empty-state"]')?.getAttribute("data-empty-variant") || "",
      primaryActionCount: document.querySelectorAll("[data-empty-primary]").length,
      relatedLinkCount: document.querySelectorAll("[data-empty-related] a").length,
      processStepCount: document.querySelectorAll("[data-empty-process] li").length,
      targetFailures: targets,
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      brokenImages: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src),
    };
  });
}

async function runEmptyStateInteractions(page) {
  const failures = [];
  const screenshots = {};

  await page.goto(routeUrl("/resources?q=no-such-certamaris-resource-query"), {
    waitUntil: "load",
    timeout: 45000,
  });
  const resourceEmpty = page.locator('[data-empty-variant="resources"]');
  await resourceEmpty.waitFor({ state: "visible", timeout: 15000 });
  screenshots.resources = path.join(screenshotDir, "resources-no-match-1280x900.png");
  await page.screenshot({ path: screenshots.resources, fullPage: true });
  if (!/No resources match/i.test(await resourceEmpty.innerText())) {
    failures.push("resources no-match state did not render expected copy");
  }
  const clearButton = resourceEmpty.locator("button");
  const clearCount = await clearButton.count();
  if (clearCount !== 1) {
    failures.push(`resources no-match state expected one clear action, found ${clearCount}`);
  } else {
    await clearButton.click();
    await page.waitForFunction(
      () => !document.querySelector('[data-empty-variant="resources"]'),
      undefined,
      { timeout: 5000 }
    );
  }

  await page.goto(routeUrl("/"), { waitUntil: "load", timeout: 45000 });
  await page.keyboard.press("Control+K");
  const search = page.getByRole("combobox", { name: "Search pages" });
  await search.waitFor({ state: "visible", timeout: 5000 });
  await search.fill("no-such-certamaris-page-query");
  const searchEmpty = page.locator('[data-empty-variant="search"]');
  await searchEmpty.waitFor({ state: "visible", timeout: 5000 });
  screenshots.search = path.join(screenshotDir, "search-no-match-1280x900.png");
  await page.screenshot({ path: screenshots.search, fullPage: false });
  if (!/No pages found/i.test(await searchEmpty.innerText())) {
    failures.push("command palette no-match state did not render expected copy");
  }
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.querySelector('[data-empty-variant="search"]'), undefined, {
    timeout: 5000,
  });

  return { failures, screenshots };
}

async function main() {
  if (!remote && !fs.existsSync(path.join(OUT, "index.html"))) {
    throw new Error("out/ is missing. Run npm run build:static first.");
  }

  fs.mkdirSync(screenshotDir, { recursive: true });
  const server = remote ? null : localServer();
  if (server) await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });
  const axeSource = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
  const report = {
    label,
    base,
    remote,
    verify,
    generatedAt: new Date().toISOString(),
    observations: [],
    interactions: [],
    axe: [],
    failures: [],
  };

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: Math.min(viewport.width, viewport.height) < 768,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    let consoleErrors = 0;
    const consoleSamples = [];
    let httpErrors = [];
    page.on("console", (message) => {
      if (message.type() !== "error") return;
      consoleErrors += 1;
      if (consoleSamples.length < 4) consoleSamples.push(message.text().slice(0, 240));
    });
    page.on("pageerror", (error) => {
      consoleErrors += 1;
      if (consoleSamples.length < 4) consoleSamples.push(String(error).slice(0, 240));
    });
    page.on("response", (response) => {
      if (response.status() < 400) return;
      httpErrors.push({ status: response.status(), url: response.url().slice(0, 500) });
    });

    for (const item of ROUTES) {
      consoleErrors = 0;
      consoleSamples.length = 0;
      httpErrors = [];
      const response = await page.goto(routeUrl(item.route), {
        waitUntil: "load",
        timeout: 45000,
      });
      await page.waitForTimeout(220);
      const snapshot = await pageSnapshot(page);
      const prefix = `${item.variant}-${fileSafe(viewport.name)}`;
      const fullPath = path.join(screenshotDir, `${prefix}-full.png`);
      const foldPath = path.join(screenshotDir, `${prefix}-fold.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      await page.screenshot({ path: foldPath, fullPage: false });

      const observation = {
        route: item.route,
        variant: item.variant,
        viewport,
        status: response?.status() ?? null,
        consoleErrors,
        consoleSamples,
        networkErrors: httpErrors,
        screenshots: { full: fullPath, fold: foldPath },
        ...snapshot,
      };
      report.observations.push(observation);

      if (observation.status !== 200) {
        report.failures.push(`${item.route} ${viewport.name}: HTTP ${observation.status}`);
      }
      if (observation.overflowX > 0) {
        report.failures.push(`${item.route} ${viewport.name}: horizontal overflow ${observation.overflowX}px`);
      }
      if (observation.brokenImages.length > 0) {
        report.failures.push(
          `${item.route} ${viewport.name}: ${observation.brokenImages.length} broken image(s)`
        );
      }
      if (verify) {
        if (observation.h1Count !== 1) {
          report.failures.push(`${item.route} ${viewport.name}: H1 count ${observation.h1Count}`);
        }
        if (observation.emptyStateCount !== 1) {
          report.failures.push(
            `${item.route} ${viewport.name}: empty-state count ${observation.emptyStateCount}`
          );
        }
        if (observation.emptyVariant !== item.variant) {
          report.failures.push(
            `${item.route} ${viewport.name}: variant ${observation.emptyVariant || "missing"}`
          );
        }
        if (observation.primaryActionCount !== 1) {
          report.failures.push(
            `${item.route} ${viewport.name}: primary actions ${observation.primaryActionCount}`
          );
        }
        if (observation.relatedLinkCount < 3 || observation.relatedLinkCount > 4) {
          report.failures.push(
            `${item.route} ${viewport.name}: related links ${observation.relatedLinkCount}`
          );
        }
        if (observation.processStepCount !== 3) {
          report.failures.push(
            `${item.route} ${viewport.name}: process steps ${observation.processStepCount}`
          );
        }
        if (observation.targetFailures.length > 0) {
          report.failures.push(
            `${item.route} ${viewport.name}: ${observation.targetFailures.length} target(s) below 44px`
          );
        }
        const knownLocalPrefetch = remote
          ? 0
          : observation.networkErrors.filter((error) => /[?&]_rsc=/.test(error.url)).length;
        const unexpectedNetwork = observation.networkErrors.filter(
          (error) => !(!remote && /[?&]_rsc=/.test(error.url))
        );
        if (unexpectedNetwork.length > 0) {
          report.failures.push(
            `${item.route} ${viewport.name}: ${unexpectedNetwork.length} unexpected network error(s)`
          );
        }
        if (observation.consoleErrors > knownLocalPrefetch) {
          report.failures.push(
            `${item.route} ${viewport.name}: ${observation.consoleErrors} console/page error(s)`
          );
        }
      }
    }

    await context.close();
  }

  if (verify) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    const interactionResult = await runEmptyStateInteractions(page);
    report.interactions = [interactionResult];
    report.failures.push(...interactionResult.failures);
    await context.close();

    for (const viewport of [
      { name: "390x844", width: 390, height: 844 },
      { name: "1440x900", width: 1440, height: 900 },
    ]) {
      const axeContext = await browser.newContext({ viewport });
      const axePage = await axeContext.newPage();
      for (const item of ROUTES) {
        await axePage.goto(routeUrl(item.route), { waitUntil: "load", timeout: 45000 });
        await axePage.evaluate(axeSource);
        const violations = await axePage.evaluate(async () => {
          const result = await window.axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
            },
          });
          return result.violations
            .filter((violation) => ["serious", "critical"].includes(violation.impact))
            .map((violation) => ({
              id: violation.id,
              impact: violation.impact,
              help: violation.help,
              count: violation.nodes.length,
              targets: violation.nodes.slice(0, 5).map((node) => node.target.join(" ")),
            }));
        });
        report.axe.push({ route: item.route, viewport: viewport.name, violations });
        for (const violation of violations) {
          report.failures.push(
            `axe ${item.route} ${viewport.name}: ${violation.id} ${violation.impact} x${violation.count}`
          );
        }
      }
      await axeContext.close();
    }
  }

  await browser.close();
  if (server) server.close();

  fs.writeFileSync(path.join(artifactRoot, "report.json"), JSON.stringify(report, null, 2));
  fs.writeFileSync(
    path.join(artifactRoot, "README.md"),
    [
      "# CertaMaris Empty-State QA",
      "",
      `- Label: ${label}`,
      `- Base: ${base}`,
      `- Generated: ${report.generatedAt}`,
      `- Routes: ${ROUTES.length}`,
      `- Viewport/orientation checks: ${VIEWPORTS.length}`,
      `- Screenshots: ${report.observations.length * 2}`,
      `- Verification mode: ${verify ? "on" : "capture only"}`,
      `- Failures: ${report.failures.length}`,
      "",
      "## Failures",
      ...(report.failures.length ? report.failures.map((failure) => `- ${failure}`) : ["- None"]),
      "",
      "## Coverage",
      ...ROUTES.map((item) => `- ${item.route} (${item.variant})`),
      "",
      "Screenshots use the `${variant}-${width}x${height}-{full,fold}.png` naming convention.",
      "",
    ].join("\n")
  );

  console.log(`Empty-state QA artifacts: ${artifactRoot}`);
  console.log(
    `routes=${ROUTES.length} viewports=${VIEWPORTS.length} screenshots=${report.observations.length * 2} failures=${report.failures.length}`
  );
  for (const failure of report.failures) console.log(`FAIL ${failure}`);
  if (verify && report.failures.length > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
