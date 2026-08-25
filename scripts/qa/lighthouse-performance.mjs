#!/usr/bin/env node
// Lighthouse performance smoke for the longest public pages.
// Requires a local/static/preview server. Default base: http://127.0.0.1:4173

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.split("=");
  return [key.replace(/^--/, ""), rest.join("=") || "true"];
}));

const base = String(args.get("base") || "http://127.0.0.1:4173").replace(/\/+$/, "");
const routes = ["/", "/security", "/pricing"];
const artifactDir = path.join("artifacts", "lighthouse");
const tempDir = path.resolve("artifacts", "lighthouse-tmp");
fs.mkdirSync(artifactDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

const failures = [];
const summary = [];

function runLighthouse(route, outputPath) {
  const argv = [
    "lighthouse",
    `${base}${route}`,
    "--quiet",
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
    "--only-categories=performance",
    "--output=json",
    `--output-path=${outputPath}`,
  ];

  if (process.platform !== "win32") {
    return spawnSync("npx", argv, {
      cwd: path.resolve("."),
      env: { ...process.env, TEMP: tempDir, TMP: tempDir, LIGHTHOUSE_CHROMIUM_PATH: process.env.LIGHTHOUSE_CHROMIUM_PATH || "" },
      encoding: "utf8",
      stdio: "pipe",
    });
  }

  const quote = (value) => `"${String(value).replace(/"/g, '\\"')}"`;
  return spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", ["npx", ...argv].map(quote).join(" ")], {
    cwd: path.resolve("."),
    env: { ...process.env, TEMP: tempDir, TMP: tempDir, LIGHTHOUSE_CHROMIUM_PATH: process.env.LIGHTHOUSE_CHROMIUM_PATH || "" },
    encoding: "utf8",
    stdio: "pipe",
  });
}

for (const route of routes) {
  const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
  const outputPath = path.join(artifactDir, `${slug}.json`);
  const result = runLighthouse(route, outputPath);

  fs.writeFileSync(
    path.join(artifactDir, `${slug}.log`),
    [result.error?.message, result.stdout, result.stderr].filter(Boolean).join("\n")
  );

  if (!fs.existsSync(outputPath)) {
    failures.push(`${route}: lighthouse exited ${result.status ?? "unknown"} without writing JSON${result.error ? ` (${result.error.message})` : ""}`);
    continue;
  }

  const json = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  const score = Math.round(json.categories.performance.score * 100);
  const lcp = Math.round(json.audits["largest-contentful-paint"].numericValue);
  const cls = Number(json.audits["cumulative-layout-shift"].numericValue.toFixed(4));
  summary.push({ route, score, lcpMs: lcp, cls, toolExitStatus: result.status });
  if (cls > 0.1) failures.push(`${route}: CLS ${cls} exceeds 0.1`);
}

const summaryPath = path.join(artifactDir, "summary.json");
fs.writeFileSync(summaryPath, JSON.stringify({ base, summary, failures }, null, 2));

for (const item of summary) {
  console.log(`LIGHTHOUSE ${item.route} score=${item.score} LCP_MS=${item.lcpMs} CLS=${item.cls}`);
}
if (failures.length) {
  for (const failure of failures) console.log(`FAIL ${failure}`);
  process.exit(1);
}
