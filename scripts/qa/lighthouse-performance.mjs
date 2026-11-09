#!/usr/bin/env node
// Lighthouse performance smoke for representative public pages.
// Supports a local/static/preview server or --base=https://certamaris.com.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const args = new Map(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.split("=");
    return [key.replace(/^--/, ""), rest.join("=") || "true"];
  }),
);

const base = String(args.get("base") || "http://127.0.0.1:4173").replace(
  /\/+$/,
  "",
);
const label = String(args.get("label") || "current").replace(
  /[^a-z0-9_-]+/gi,
  "-",
);
const routes = [
  "/",
  "/platform",
  "/security",
  "/pricing",
  "/resources",
  "/contact",
  "/demo",
];
const artifactDir = path.join("artifacts", "lighthouse", label);
const tempDir = path.resolve("artifacts", "lighthouse-tmp");
fs.mkdirSync(artifactDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

const failures = [];
const summary = [];

function runLighthouse(route, outputPath) {
  const argv = [
    "--yes",
    "lighthouse",
    `${base}${route}`,
    "--quiet",
    "--chrome-flags=--headless=new --no-sandbox --disable-gpu",
    "--only-categories=performance",
    "--output=json",
    `--output-path=${outputPath}`,
  ];

  if (process.platform === "win32") {
    return spawnSync(
      process.env.ComSpec || "cmd.exe",
      ["/d", "/s", "/c", "npx.cmd", ...argv],
      {
        cwd: path.resolve("."),
        env: {
          ...process.env,
          TEMP: tempDir,
          TMP: tempDir,
          LIGHTHOUSE_CHROMIUM_PATH: process.env.LIGHTHOUSE_CHROMIUM_PATH || "",
        },
        encoding: "utf8",
        stdio: "pipe",
      },
    );
  }

  return spawnSync("npx", argv, {
    cwd: path.resolve("."),
    env: {
      ...process.env,
      TEMP: tempDir,
      TMP: tempDir,
      LIGHTHOUSE_CHROMIUM_PATH: process.env.LIGHTHOUSE_CHROMIUM_PATH || "",
    },
    encoding: "utf8",
    stdio: "pipe",
  });
}

for (const route of routes) {
  const slug =
    route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
  const outputPath = path.join(artifactDir, `${slug}.json`);
  fs.rmSync(outputPath, { force: true });
  fs.rmSync(path.join(artifactDir, `${slug}.log`), { force: true });
  const result = runLighthouse(route, outputPath);

  fs.writeFileSync(
    path.join(artifactDir, `${slug}.log`),
    [result.error?.message, result.stdout, result.stderr]
      .filter(Boolean)
      .join("\n"),
  );

  if (result.error || result.status !== 0) {
    failures.push(
      `${route}: lighthouse process failed with exit ${result.status ?? "unknown"}${result.error ? ` (${result.error.message})` : ""}`,
    );
    continue;
  }

  if (!fs.existsSync(outputPath)) {
    failures.push(
      `${route}: lighthouse exited successfully without writing JSON`,
    );
    continue;
  }

  let json;
  try {
    json = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  } catch (error) {
    failures.push(
      `${route}: invalid Lighthouse JSON (${error instanceof Error ? error.message : String(error)})`,
    );
    continue;
  }

  if (!Number.isFinite(json.categories?.performance?.score)) {
    failures.push(`${route}: Lighthouse JSON is missing a performance score`);
    continue;
  }

  const score = Math.round(json.categories.performance.score * 100);
  const lcp = Math.round(json.audits["largest-contentful-paint"].numericValue);
  const cls = Number(
    json.audits["cumulative-layout-shift"].numericValue.toFixed(4),
  );
  const tbt = Math.round(json.audits["total-blocking-time"]?.numericValue ?? 0);
  summary.push({
    route,
    score,
    lcpMs: lcp,
    tbtMs: tbt,
    cls,
    toolExitStatus: result.status,
  });
  if (cls > 0.1) failures.push(`${route}: CLS ${cls} exceeds 0.1`);
}

const summaryPath = path.join(artifactDir, "summary.json");
fs.writeFileSync(
  summaryPath,
  JSON.stringify({ base, summary, failures }, null, 2),
);

for (const item of summary) {
  console.log(
    `LIGHTHOUSE ${item.route} score=${item.score} LCP_MS=${item.lcpMs} CLS=${item.cls}`,
  );
}
if (failures.length) {
  for (const failure of failures) console.log(`FAIL ${failure}`);
  process.exit(1);
}
