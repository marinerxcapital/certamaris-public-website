#!/usr/bin/env node
// Focused interaction QA for the public product-experience upgrade.
// Requires a current static export in out/.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const OUT = "out";
const PORT = Number(process.env.QA_PORT || 4525);

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

async function assertNoOverflow(page, label) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 0) throw new Error(`${label} has ${overflow}px horizontal overflow`);
}

async function main() {
  if (!fs.existsSync(path.join(OUT, "index.html"))) {
    throw new Error("out/ is missing. Run npm run build:static first.");
  }

  await new Promise((resolve) => server.listen(PORT, resolve));
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  const base = `http://127.0.0.1:${PORT}`;
  const failures = [];

  async function step(name, fn) {
    try {
      await fn();
      console.log(`PASS ${name}`);
    } catch (error) {
      failures.push(`${name}: ${error.message}`);
      console.log(`FAIL ${name}: ${error.message}`);
    }
  }

  await step("homepage lifecycle selects PKG and links to inspector", async () => {
    await page.goto(`${base}/`, { waitUntil: "load" });
    await page.getByRole("button", { name: /PKG/ }).click();
    await page.getByRole("heading", { name: "Release package" }).waitFor();
    await page.getByRole("link", { name: "Inspect the full chain" }).click();
    await page.waitForURL(/\/demo#chain-inspector$/);
    await page.locator('[data-qa="chain-custody-inspector"]').waitFor();
    await assertNoOverflow(page, "homepage/demo chain");
  });

  await step("demo inspector restores query stage and navigates lineage", async () => {
    await page.goto(`${base}/demo?stage=EVD#chain-inspector`, { waitUntil: "load" });
    await page.getByText("EVD-0847").first().waitFor();
    await page.getByRole("button", { name: /CAP-0455/ }).click();
    await page.getByRole("heading", { name: /Re-review crossover rules/ }).waitFor();
    await page.getByText("Demonstration fixture only").waitFor();
    await assertNoOverflow(page, "demo inspector");
  });

  await step("pricing restores share URL and reproduces estimate", async () => {
    await page.goto(`${base}/pricing?fleet=24&contracted=12&remoteQa=1&onboard=1`, { waitUntil: "load" });
    await page.locator('[data-qa="pricing-calculator-v2"]').waitFor();
    await page.getByText("$312,000").waitFor();
    await page.getByLabel("Total fleet vessels exact count").evaluate((el) => {
      if (el.value !== "24") throw new Error(`expected fleet 24, got ${el.value}`);
    });
    await page.getByLabel("Contracted vessels exact count").evaluate((el) => {
      if (el.value !== "12") throw new Error(`expected contracted 12, got ${el.value}`);
    });
    await page.getByRole("button", { name: "Share estimate" }).click();
    await page.waitForFunction(() => window.location.search.includes("fleet=24") && window.location.search.includes("remoteQa=1"));
    await page.goto(page.url(), { waitUntil: "load" });
    await page.getByText("$312,000").waitFor();
    await assertNoOverflow(page, "pricing");
  });

  await step("persona path points to relevant demo context", async () => {
    await page.goto(`${base}/who-we-serve/maritime-it-ot`, { waitUntil: "load" });
    await page.locator('[data-qa="role-record-path"]').waitFor();
    await page.getByText("IT / OT path").waitFor();
    const href = await page.getByRole("link", { name: "Open this demo path" }).getAttribute("href");
    if (!href?.includes("stage=CTL") || !href.includes("#chain-inspector")) {
      throw new Error(`unexpected demo path href: ${href}`);
    }
    await assertNoOverflow(page, "persona path");
  });

  await step("evidence simulator creates finding, corrective action, and reset state", async () => {
    await page.goto(`${base}/platform/evidence`, { waitUntil: "load" });
    await page.locator('[data-qa="evidence-simulator-v2"]').waitFor();
    await page.locator("#drift-time").fill("180");
    await page.getByRole("button", { name: /EVD-0994/ }).click();
    await page.getByRole("button", { name: "Apply reviewer decision" }).click();
    await page.getByText("Reviewer created finding").waitFor();
    await page.getByText("CAP-0561").waitFor();
    await page.getByRole("button", { name: "Submit refreshed evidence" }).click();
    await page.getByText("Resolved / reset state").waitFor();
    await page.getByRole("button", { name: "Reset demo" }).click();
    await page.getByText("Awaiting reviewer").waitFor();
    await assertNoOverflow(page, "evidence simulator");
  });

  await context.close();
  await browser.close();
  server.close();

  if (failures.length) {
    console.log("\nProduct-experience QA failures:");
    for (const failure of failures) console.log(`- ${failure}`);
    process.exit(1);
  }
}

main().catch((error) => {
  server.close();
  console.error(error);
  process.exit(1);
});
