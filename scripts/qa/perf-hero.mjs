import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright-core";
const OUT = "out", PORT = 4523;
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
function resolveFile(u) {
  const c = decodeURIComponent(u.split("?")[0]).replace(/\/+$/, "") || "/";
  const cands = c === "/" ? [path.join(OUT, "index.html")] : [path.join(OUT, c), path.join(OUT, c + ".html"), path.join(OUT, c, "index.html")];
  for (const x of cands) if (fs.existsSync(x) && fs.statSync(x).isFile()) return x;
  return null;
}
const server = http.createServer((req, res) => {
  const f = resolveFile(req.url);
  if (!f) { res.writeHead(404); res.end("nf"); return; }
  res.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" });
  res.end(fs.readFileSync(f));
});
await new Promise((ok) => server.listen(PORT, ok));
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: process.env.REDUCED ? "reduce" : "no-preference" });
const page = await ctx.newPage();
const t0 = Date.now();
await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "load" });
const loadMs = Date.now() - t0;
const stats = await page.evaluate(() => new Promise((resolve) => {
  const deltas = []; let last = performance.now(); let n = 0;
  function tick(t) {
    deltas.push(t - last); last = t;
    if (++n < 240) requestAnimationFrame(tick);
    else {
      deltas.sort((a, b) => a - b);
      resolve({ median: deltas[120].toFixed(1), p95: deltas[228].toFixed(1), max: deltas[239].toFixed(1), over33ms: deltas.filter((d) => d > 33).length });
    }
  }
  requestAnimationFrame(tick);
}));
const rectCount = await page.evaluate(() => document.querySelectorAll(".pxl-cell").length);
console.log(`load=${loadMs}ms cells=${rectCount} frame median=${stats.median}ms p95=${stats.p95}ms max=${stats.max}ms frames>33ms=${stats.over33ms}/240`);
await browser.close(); server.close();
