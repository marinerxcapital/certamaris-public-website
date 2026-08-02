// Verify every <img> on given routes actually loads (naturalWidth > 0)
// after a full-page scroll, against the static export or a live base URL.
// Usage: node scripts/qa/check-demo-images.mjs [--base https://certamaris.com] [routes...]
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const baseFlag = args.indexOf("--base");
const liveBase = baseFlag >= 0 ? args[baseFlag + 1] : null;
const routes = args.filter((a, i) => !a.startsWith("--") && (baseFlag < 0 || i !== baseFlag + 1));
if (routes.length === 0) routes.push("/demo", "/platform", "/compliance", "/security", "/solutions", "/resources");

const OUT = "out";
const PORT = 4521;
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
      : [path.join(OUT, clean), path.join(OUT, `${clean}.html`), path.join(OUT, clean, "index.html")];
  for (const c of candidates) if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  return null;
}
const server = liveBase
  ? null
  : http.createServer((req, res) => {
      const file = resolveFile(req.url);
      if (!file) {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("nf");
        return;
      }
      res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
      res.end(fs.readFileSync(file));
    });

async function main() {
  if (server) await new Promise((ok) => server.listen(PORT, ok));
  const base = liveBase ?? `http://127.0.0.1:${PORT}`;
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

  let failures = 0;
  for (const route of routes) {
    await page.goto(`${base}${route}`, { waitUntil: "load", timeout: 30000 });
    // Scroll the full page so every lazy image intersects the viewport.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1200);
    const report = await page.evaluate(() =>
      [...document.querySelectorAll("img")].map((img) => ({
        src: img.currentSrc || img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        lazy: img.loading,
      }))
    );
    const bad = report.filter((r) => !r.complete || r.naturalWidth === 0);
    console.log(`${route}: ${report.length} images, ${bad.length} not loaded`);
    for (const b of bad) {
      console.log(`  BAD complete=${b.complete} nw=${b.naturalWidth} lazy=${b.lazy} ${b.src}`);
      failures++;
    }
  }
  await browser.close();
  if (server) server.close();
  process.exit(failures ? 1 : 0);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
