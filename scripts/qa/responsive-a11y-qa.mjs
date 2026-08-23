// Focused responsive + accessibility QA over the static export.
// Key routes across 6 viewports: horizontal overflow, console errors, broken
// images, and (desktop) axe-core violations. Fast waitUntil:load strategy.
// Usage: node scripts/qa/responsive-a11y-qa.mjs
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright-core";

const OUT = "out";
const PORT = 4523;

const KEY_ROUTES = [
  "/",
  "/pricing",
  "/faq",
  "/compliance",
  "/security",
  "/demo",
  "/contact",
  "/about",
  "/trust",
  "/platform",
  "/platform/evidence",
  "/solutions",
  "/who-we-serve",
  "/who-we-serve/ship-owners",
  "/who-we-serve/technical-managers-dpas",
  "/who-we-serve/maritime-it-ot",
];

const VIEWPORTS = [
  { name: "320", width: 320, height: 760 },
  { name: "375", width: 375, height: 812 },
  { name: "360", width: 360, height: 800 },
  { name: "390", width: 390, height: 844 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 900 },
  { name: "1440", width: 1440, height: 900 },
];

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain", ".avif": "image/avif",
};

function resolveFile(urlPath) {
  const parsed = new URL(urlPath, "http://127.0.0.1");
  let clean = decodeURIComponent(parsed.pathname).replace(/\/+$/, "") || "/";
  const candidates =
    clean === "/"
      ? [path.join(OUT, "index.html")]
      : [path.join(OUT, clean), path.join(OUT, `${clean}.html`), path.join(OUT, clean, "index.html")];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end(fs.existsSync(path.join(OUT, "404.html")) ? fs.readFileSync(path.join(OUT, "404.html")) : "not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
  res.end(fs.readFileSync(file));
});

const axeSource = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");

async function main() {
  await new Promise((ok) => server.listen(PORT, ok));
  const browser = await chromium.launch();
  const report = { routes: KEY_ROUTES.length, viewports: VIEWPORTS.length, issues: [], consoleErrors: 0, brokenImages: [] };

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.width < 768,
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    let consoleErrors = 0;
    page.on("console", (m) => { if (m.type() === "error") consoleErrors++; });
    page.on("pageerror", () => consoleErrors++);

    for (const route of KEY_ROUTES) {
      const url = `http://127.0.0.1:${PORT}${route === "/" ? "/" : route}`;
      await page.goto(url, { waitUntil: "load", timeout: 30000 }).catch(() => {});
      await page.waitForTimeout(100);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      const broken = await page.evaluate(() =>
        [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src)
      );
      if (overflow > 0) {
        report.issues.push(`overflow ${vp.name}px ${route} +${overflow}px`);
      }
      if (broken.length) {
        report.brokenImages.push({ route, viewport: vp.name, count: broken.length, first: broken[0] });
      }
      if (overflow > 0 || broken.length) process.stdout.write(`!${vp.name} ${route} ov=${overflow} broken=${broken.length}\n`);
    }
    if (vp.width >= 1440) {
      // axe on desktop only (matches existing crawl convention)
      for (const route of KEY_ROUTES) {
        const url = `http://127.0.0.1:${PORT}${route === "/" ? "/" : route}`;
        await page.goto(url, { waitUntil: "load", timeout: 30000 }).catch(() => {});
        await page.evaluate(axeSource);
        const axe = await page.evaluate(async () => {
          const r = await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
          });
          return r.violations
            .filter((v) => ["serious", "critical"].includes(v.impact))
            .map((v) => ({ id: v.id, impact: v.impact, help: v.help, count: v.nodes.length }));
        });
        for (const v of axe) {
          report.issues.push(`axe ${route} ${v.id} (${v.impact}) x${v.count}`);
        }
      }
    }
    report.consoleErrors += consoleErrors;
    console.log(`viewport ${vp.name}: consoleErrors=${consoleErrors}`);
    await ctx.close();
  }

  await browser.close();
  server.close();

  console.log("=== Responsive / a11y QA ===");
  console.log(`routes=${report.routes} viewports=${report.viewports}`);
  console.log(`consoleErrors=${report.consoleErrors}`);
  console.log(`brokenImages=${report.brokenImages.length}`);
  for (const b of report.brokenImages) console.log(`  broken ${b.route} @${b.viewport}: ${b.count} (${b.first})`);
  console.log(`issues=${report.issues.length}`);
  for (const i of report.issues) console.log(`  ${i}`);
  process.exit(report.issues.length || report.brokenImages.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
