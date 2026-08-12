#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright-core";

const OUT = "out";
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
};

const routes = [
  "/",
  "/platform",
  "/demo",
  "/solutions",
  "/compliance",
  "/security",
  "/resources",
  "/platform/corporate-control-plane",
  "/platform/client-company-portal",
  "/platform/fleet-management",
  "/platform/vessel-portal",
  "/platform/assessments",
  "/platform/evidence",
  "/platform/findings-corrective-actions",
  "/platform/cybersecurity-plans",
  "/platform/regulatory-intelligence",
  "/platform/continuous-assurance",
  "/platform/reports-readiness",
  "/platform/integrations",
  "/solutions/fleet-cyber-compliance",
  "/solutions/audit-survey-readiness",
  "/solutions/imo-msc-428-98",
  "/solutions/iacs-ur-e26",
  "/solutions/iacs-ur-e27",
  "/solutions/vessel-cyber-risk-management",
  "/solutions/evidence-findings-management",
  "/solutions/corrective-action-verification",
  "/solutions/cybersecurity-plan-management",
  "/solutions/sbom-vulnerability-assurance",
  "/solutions/executive-board-reporting",
  "/solutions/regulatory-change-management",
];

const viewports = [
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 1536, height: 960 },
];

function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "") || "/";
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
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
  res.end(fs.readFileSync(file));
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });

let failures = 0;
try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    for (const route of routes) {
      await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: "load", timeout: 30000 });
      await page.evaluate(async () => {
        const step = Math.max(240, window.innerHeight * 0.8);
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(250);
      const report = await page.evaluate(() => {
        const productImages = [...document.querySelectorAll("img")]
          .filter((img) => (img.currentSrc || img.src).includes("/product/dashboard-v2/"))
          .map((img) => {
            const rect = img.getBoundingClientRect();
            return {
              src: img.currentSrc || img.src,
              complete: img.complete,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
              width: rect.width,
              height: rect.height,
              alt: img.getAttribute("alt") || "",
            };
          });
        const visibleProductImages = productImages.filter((img) => img.width > 0 && img.height > 0);
        return {
          productImages,
          visibleProductImages,
          hasOldProductPath: document.documentElement.innerHTML.includes("/product/updated/") ||
            document.documentElement.innerHTML.includes("/product/clean/") ||
            document.documentElement.innerHTML.includes("/product/optimized/"),
          overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          fullResolutionLinks: [...document.querySelectorAll('a[href^="/product/dashboard-v2/"]')].length,
        };
      });
      if (report.hasOldProductPath) {
        console.error(`${viewport.width} ${route}: stale product path rendered`);
        failures += 1;
      }
      if (report.overflowX > 1) {
        console.error(`${viewport.width} ${route}: horizontal overflow ${report.overflowX}px`);
        failures += 1;
      }
      if (report.visibleProductImages.length === 0) {
        console.error(`${viewport.width} ${route}: no Dashboard V2 product images rendered`);
        failures += 1;
      }
      if (report.fullResolutionLinks < report.visibleProductImages.length) {
        console.error(`${viewport.width} ${route}: missing full-resolution links`);
        failures += 1;
      }
      for (const image of report.visibleProductImages) {
        if (!image.complete || image.naturalWidth === 0 || !image.alt.trim()) {
          console.error(`${viewport.width} ${route}: bad image ${JSON.stringify(image)}`);
          failures += 1;
        }
      }
      console.log(
        `${viewport.width} ${route}: ${report.visibleProductImages.length}/${report.productImages.length} visible Dashboard V2 image(s), overflow ${report.overflowX}px`
      );
    }
    await context.close();
    console.log(`Viewport ${viewport.width}x${viewport.height}: checked ${routes.length} proof routes`);
  }
} finally {
  await browser.close();
  server.close();
}

if (failures) {
  console.error(`Product-proof render QA failed: ${failures} issue(s)`);
  process.exit(1);
}

console.log(`Product-proof render QA passed: ${routes.length} routes across ${viewports.length} viewports`);
