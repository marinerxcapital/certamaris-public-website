#!/usr/bin/env node
/**
 * check-seo.mjs
 *
 * SEO heuristics on built HTML under out/:
 *  - every HTML page has a non-empty <title>
 *  - titles are unique across the export
 *  - exactly one <h1> per page (heuristic)
 *  - meta description present (warn if missing)
 *  - canonical link present (warn if missing)
 *
 * Usage:
 *   node scripts/qa/check-seo.mjs
 *   node scripts/qa/check-seo.mjs --out path/to/out
 */

import path from "node:path";
import {
  OUT_DIR,
  parseArgs,
  pathExists,
  readText,
  walkFiles,
  extractTitle,
  extractH1s,
  extractCanonical,
  extractMetaDescription,
  printReport,
  exitCode,
} from "./lib.mjs";

const args = parseArgs();
const outDir = typeof args.out === "string" ? path.resolve(args.out) : OUT_DIR;

async function main() {
  if (!(await pathExists(outDir))) {
    console.error(`out dir not found: ${outDir}. Run build:static first.`);
    process.exit(2);
  }

  const htmlFiles = await walkFiles(outDir, {
    match: (full, name) => name.endsWith(".html") && !name.startsWith("."),
  });

  // Prefer top-level route HTML; still scan all including nested if present
  const pages = [];
  for (const file of htmlFiles) {
    const rel = path.relative(outDir, file).replace(/\\/g, "/");
    // Skip Next internal fragments if any
    if (rel.startsWith("_next/")) continue;
    const html = await readText(file);
    pages.push({ file: rel, html });
  }

  const ok = [];
  const fail = [];
  const warn = [];
  const titles = new Map(); // title → [files]

  for (const { file, html } of pages) {
    const title = extractTitle(html);
    const h1s = extractH1s(html);
    const desc = extractMetaDescription(html);
    const canonical = extractCanonical(html);

    if (!title) {
      fail.push(`${file}: missing <title>`);
    } else {
      if (!titles.has(title)) titles.set(title, []);
      titles.get(title).push(file);
    }

    if (h1s.length === 0) {
      // 404 page may be special; still flag
      fail.push(`${file}: no <h1> (expected exactly one)`);
    } else if (h1s.length > 1) {
      fail.push(`${file}: ${h1s.length} <h1> elements — ${h1s.map((h) => JSON.stringify(h)).join("; ")}`);
    } else {
      ok.push(`${file}: title=${JSON.stringify(title)} h1=${JSON.stringify(h1s[0])}`);
    }

    if (!desc) warn.push(`${file}: missing meta description`);
    if (!canonical) warn.push(`${file}: missing link rel=canonical`);
  }

  const isNotFoundExport = (file) =>
    file === "404.html" || file === "_not-found.html" || file.endsWith("/404.html");

  for (const [title, files] of titles) {
    if (files.length > 1) {
      // Next static export emits both 404.html and _not-found.html with the same not-found UI.
      if (files.every(isNotFoundExport)) {
        warn.push(`not-found title shared (expected): ${files.join(", ")}`);
      } else {
        fail.push(`duplicate title ${JSON.stringify(title)} on: ${files.join(", ")}`);
      }
    }
  }

  // Soft uniqueness on H1 text across marketing pages (warn only — some legal pages may share patterns)
  const h1Map = new Map();
  for (const { file, html } of pages) {
    const h1s = extractH1s(html);
    if (h1s.length === 1) {
      const key = h1s[0].toLowerCase();
      if (!h1Map.has(key)) h1Map.set(key, []);
      h1Map.get(key).push(file);
    }
  }
  for (const [h1, files] of h1Map) {
    if (files.length > 1) {
      if (files.every(isNotFoundExport)) {
        warn.push(`not-found H1 shared (expected): ${files.join(", ")}`);
      } else {
        warn.push(`duplicate H1 ${JSON.stringify(h1)} on: ${files.join(", ")}`);
      }
    }
  }

  printReport("SEO check (out/)", { ok, fail, warn });
  console.log(`Pages scanned: ${pages.length}`);
  process.exit(exitCode(fail.length));
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
