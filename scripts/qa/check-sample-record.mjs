// Functional check of the landing-page sample record explorer against the
// static export (or --base <url>): tab click, arrow-key navigation, and
// cross-record link jumps all update the record card.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const baseFlag = args.indexOf("--base");
const liveBase = baseFlag >= 0 ? args[baseFlag + 1] : null;

const OUT = "out";
const PORT = 4527;
const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml", ".woff2": "font/woff2",
};
function resolveFile(u) {
  const c = decodeURIComponent(u.split("?")[0]).replace(/\/+$/, "") || "/";
  const cands = c === "/" ? [path.join(OUT, "index.html")] : [path.join(OUT, c), path.join(OUT, `${c}.html`), path.join(OUT, c, "index.html")];
  for (const x of cands) if (fs.existsSync(x) && fs.statSync(x).isFile()) return x;
  return null;
}
const server = liveBase
  ? null
  : http.createServer((req, res) => {
      const f = resolveFile(req.url);
      if (!f) { res.writeHead(404); res.end("nf"); return; }
      res.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" });
      res.end(fs.readFileSync(f));
    });

async function waitText(panel, text, label) {
  try {
    await panel.getByText(text, { exact: false }).first().waitFor({ timeout: 4000 });
    console.log(`ok   ${label}`);
  } catch {
    console.log(`FAIL ${label}`);
    process.exitCode = 1;
  }
}

function assert(cond, label) {
  console.log(`${cond ? "ok " : "FAIL"} ${label}`);
  if (!cond) process.exitCode = 1;
}

async function main() {
  if (server) await new Promise((ok) => server.listen(PORT, ok));
  const base = liveBase ?? `http://127.0.0.1:${PORT}`;
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await page.goto(`${base}/?srqa=1`, { waitUntil: "networkidle", timeout: 30000 });

  const panel = page.locator(".sample-record [role=tabpanel]");
  assert((await panel.textContent()).includes("REQ-0104"), "initial panel shows REQ-0104");

  // Click the Evidence tab.
  await page.locator(".sample-record [role=tab]", { hasText: "EVD-0847" }).click();
  await waitText(panel, "Switch configuration export", "tab click opens EVD-0847");

  // Arrow key moves selection (EVD -> FND).
  await page.keyboard.press("ArrowDown");
  await waitText(panel, "Crossover firewall rule review overdue", "ArrowDown selects FND-0130");

  // Cross-record link jumps (FND card links to RSK-0072).
  await page.locator(".sample-record [role=tabpanel] button", { hasText: "RSK-0072" }).click();
  await waitText(panel, "Treatment decided", "linked-record button jumps to RSK-0072");
  const focused = await page.evaluate(() => document.activeElement?.id ?? "");
  assert(focused.includes("RSK-0072"), "focus moved to the RSK-0072 tab");

  await browser.close();
  if (server) server.close();
  console.log(process.exitCode ? "FAILURES" : "all sample-record checks passed");
}
main().catch((e) => { console.error(e); process.exit(1); });
