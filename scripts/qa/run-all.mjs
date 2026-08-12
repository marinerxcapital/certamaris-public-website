#!/usr/bin/env node
/**
 * run-all.mjs — sequential QA suite (no extra deps).
 *
 *   node scripts/qa/run-all.mjs
 *   node scripts/qa/run-all.mjs --skip-http
 *   node scripts/qa/run-all.mjs --base http://127.0.0.1:4173
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathExists, OUT_DIR, parseArgs } from "./lib.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = parseArgs();

const steps = [
  { name: "contact and Worker tests", file: "check-worker.mjs", argv: [] },
  { name: "content-qa", file: "content-qa.mjs", argv: [] },
  { name: "product-proof integrity", file: "check-product-proof.mjs", argv: [] },
  {
    name: "check-routes (out)",
    file: "check-routes.mjs",
    argv: ["--out", "--include-planned"],
    needsOut: true,
  },
  { name: "check-seo", file: "check-seo.mjs", argv: [], needsOut: true },
  { name: "check-links", file: "check-links.mjs", argv: [], needsOut: true },
  // Founder headshot / leadership bio — prefers out/; falls back to source
  { name: "check-founder", file: "check-founder.mjs", argv: [] },
];

if (args.base && typeof args.base === "string") {
  steps.push({
    name: "check-routes (http)",
    file: "check-routes.mjs",
    argv: ["--base", args.base, "--include-planned"],
  });
}

async function main() {
  const hasOut = await pathExists(OUT_DIR);
  let failures = 0;

  for (const step of steps) {
    if (step.needsOut && !hasOut) {
      console.log(`\n⏭  skip ${step.name} (no out/ — run npm run build:static)`);
      continue;
    }
    console.log(`\n▶  ${step.name}`);
    const r = spawnSync(process.execPath, [path.join(__dirname, step.file), ...step.argv], {
      stdio: "inherit",
      cwd: path.resolve(__dirname, "../.."),
    });
    if (r.status !== 0) {
      failures += 1;
      console.log(`✗ ${step.name} exited ${r.status}`);
    } else {
      console.log(`✓ ${step.name}`);
    }
  }

  console.log(`\nQA suite complete — ${failures} step(s) failed`);
  process.exit(failures > 0 ? 1 : 0);
}

main();
