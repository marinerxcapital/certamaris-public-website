// Identify which resource URLs 404 during page loads of the static export.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright-core";

const OUT = "out";
const PORT = 4519;
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
const misses = {};
const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) {
    misses[req.url] = (misses[req.url] || 0) + 1;
    res.writeHead(404, { "content-type": "text/html" });
    res.end("nf");
    return;
  }
  res.writeHead(200, { "content-type": MIME[path.extname(file)] || "application/octet-stream" });
  res.end(fs.readFileSync(file));
});

function sitemapRoutes() {
  const xml = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname.replace(/\/+$/, "") || "/"
  );
}

async function main() {
  await new Promise((ok) => server.listen(PORT, ok));
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  for (const route of sitemapRoutes()) {
    await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: "load", timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(120);
  }
  await browser.close();
  server.close();
  const sorted = Object.entries(misses).sort((a, b) => b[1] - a[1]);
  console.log(`unique 404 paths: ${sorted.length}`);
  for (const [u, n] of sorted) console.log(`  ${n} x ${u}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
