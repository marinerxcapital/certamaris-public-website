#!/usr/bin/env node
/**
 * check-links.mjs
 *
 * Internal link scan of built HTML under out/.
 * Resolves each internal href to an out/ file or known asset; reports broken links.
 *
 * Usage:
 *   node scripts/qa/check-links.mjs
 *   node scripts/qa/check-links.mjs --out path/to/out
 */

import path from "node:path";
import {
  OUT_DIR,
  parseArgs,
  pathExists,
  readText,
  walkFiles,
  extractInternalHrefs,
  printReport,
  exitCode,
} from "./lib.mjs";
import { pathnameToOutCandidates } from "./expected-routes.mjs";

const args = parseArgs();
const outDir = typeof args.out === "string" ? path.resolve(args.out) : OUT_DIR;

/** Paths that are intentional external product surfaces (not in marketing export). */
const ALLOWED_EXTERNAL_PREFIXES = [
  "https://app.certamaris.com",
];

async function resolveInOut(pathname) {
  const clean = (pathname.split("?")[0].split("#")[0] || "/").replace(/\/$/, "") || "/";
  // Directory-style: allow trailing slash equivalent
  const candidates = pathnameToOutCandidates(clean === "" ? "/" : clean);
  for (const c of candidates) {
    if (await pathExists(path.join(outDir, c))) return true;
  }
  // Also try raw path for assets already absolute under out
  const raw = clean.replace(/^\//, "");
  if (raw && (await pathExists(path.join(outDir, raw)))) return true;
  return false;
}

function pagePathFromFile(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`;
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}`;
  return `/${rel}`;
}

async function main() {
  if (!(await pathExists(outDir))) {
    console.error(`out dir not found: ${outDir}. Run build:static first.`);
    process.exit(2);
  }

  const htmlFiles = await walkFiles(outDir, {
    match: (_full, name) => name.endsWith(".html"),
  });

  const ok = [];
  const fail = [];
  const warn = [];
  const seenBroken = new Set();
  let linkCount = 0;

  for (const file of htmlFiles) {
    const rel = path.relative(outDir, file).replace(/\\/g, "/");
    if (rel.startsWith("_next/")) continue;
    const html = await readText(file);
    const pagePath = pagePathFromFile(rel);
    const hrefs = extractInternalHrefs(html, { pagePath });

    for (const href of hrefs) {
      linkCount++;
      // Skip API routes (POST-only) — not static assets
      if (href.startsWith("/api/")) {
        warn.push(`${rel}: link to ${href} (API — not in static export; Worker handles at runtime)`);
        continue;
      }

      const exists = await resolveInOut(href);
      if (exists) {
        ok.push(`${rel} → ${href}`);
      } else {
        const key = `${href}`;
        if (!seenBroken.has(key)) {
          seenBroken.add(key);
          fail.push(`${rel} → broken internal link ${href}`);
        } else {
          fail.push(`${rel} → broken internal link ${href}`);
        }
      }
    }
  }

  // Collapse ok list for readability (only show count)
  const okCount = ok.length;
  printReport("Internal link check", {
    ok: [`${okCount} internal hrefs resolved`],
    fail: [...new Set(fail)],
    warn: [...new Set(warn)],
  });
  console.log(`HTML pages: ${htmlFiles.length}, href checks: ${linkCount}`);
  console.log(`Note: external app links (${ALLOWED_EXTERNAL_PREFIXES.join(", ")}) are not scanned as site paths.`);
  process.exit(exitCode(new Set(fail).size > 0 ? fail.length : 0));
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
