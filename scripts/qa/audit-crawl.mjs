// Crawl every sitemap URL against the static export in ./out:
// full-page screenshots (desktop 1440x900, mobile 390x844), axe-core scan,
// and console-error capture. Results land in audit/<label>/.
// Usage: node scripts/qa/audit-crawl.mjs before|after [--no-shots]
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright-core";

const label = process.argv[2] || "before";
const noShots = process.argv.includes("--no-shots");
const OUT = "out";
const AUDIT_DIR = path.join("audit", label);
const PORT = 4517;

// --- static server over ./out with Next-style .html resolution ---
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".json": "application/json",
  ".xml": "application/xml", ".txt": "text/plain", ".avif": "image/avif",
};
function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "") || "/";
  const candidates =
    clean === "/"
      ? [path.join(OUT, "index.html")]
      : [
          path.join(OUT, clean),
          path.join(OUT, `${clean}.html`),
          path.join(OUT, clean, "index.html"),
        ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}
const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) {
    const nf = path.join(OUT, "404.html");
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end(fs.existsSync(nf) ? fs.readFileSync(nf) : "not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
  res.end(fs.readFileSync(file));
});

function sitemapRoutes() {
  const xml = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    new URL(m[1]).pathname.replace(/\/+$/, "") || "/"
  );
}

const axeSource = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const slug = (r) => (r === "/" ? "home" : r.slice(1).replace(/\//g, "--"));

async function main() {
  await new Promise((ok) => server.listen(PORT, ok));
  fs.mkdirSync(AUDIT_DIR, { recursive: true });
  const routes = sitemapRoutes();
  console.log(`${routes.length} routes · label=${label} · shots=${!noShots}`);

  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const results = [];
  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "mobile", width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.name === "mobile",
      deviceScaleFactor: 1,
    });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push({ route: page.url(), text: msg.text() });
    });
    page.on("pageerror", (err) => consoleErrors.push({ route: page.url(), text: String(err) }));

    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route === "/" ? "/" : route}`;
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout
: 30000 });
      } catch {
        await page.goto(url, { waitUntil: "load", timeout: 30000 }).catch(() => {});
      }
      await page.waitForTimeout(350);
      // horizontal overflow check
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      let axe = null;
      if (vp.name === "desktop") {
        await page.evaluate(axeSource);
        axe = await page.evaluate(async () => {
          const r = await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
          });
          return r.violations.map((v) => ({
            id: v.id, impact: v.impact, help: v.help,
            nodes: v.nodes.slice(0, 5).map((n) => n.target.join(" ")),
            count: v.nodes.length,
          }));
        });
      }
      if (!noShots) {
        await page.screenshot({
          path: path.join(AUDIT_DIR, `${vp.name}--${slug(route)}.png`),
          fullPage: true,
        });
      }
      results.push({ route, viewport: vp.name, overflow, axe });
      const viol = axe ? axe.reduce((s, v) => s + v.count, 0) : "-";
      if ((axe && axe.length) || overflow > 0)
        console.log(`! ${vp.name} ${route} overflow=${overflow} violations=${viol}`);
    }
    fs.writeFileSync(
      path.join(AUDIT_DIR, `console-errors-${vp.name}.json`),
      JSON.stringify(consoleErrors, null, 2)
    );
    console.log(`${vp.name}: done, console errors: ${consoleErrors.length}`);
    await ctx.close();
  }

  await browser.close();
  server.close();
  fs.writeFileSync(path.join(AUDIT_DIR, "results.json"), JSON.stringify(results, null, 2));

  const withViolations = results.filter((r) => r.axe && r.axe.length);
  const withOverflow = results.filter((r) => r.overflow > 0);
  console.log(`\n=== ${label} summary ===`);
  console.log(`routes: ${routes.length}`);
  console.log(`pages with axe violations: ${withViolations.length}`);
  for (const r of withViolations)
    for (const v of r.axe) console.log(`  ${r.route} · ${v.id} (${v.impact}) ×${v.count}`);
  console.log(`pages with horizontal overflow: ${withOverflow.length}`);
  for (const r of withOverflow) console.log(`  ${r.viewport} ${r.route} +${r.overflow}px`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
