#!/usr/bin/env node
/**
 * check-routes.mjs
 *
 * Verifies expected marketing routes return 200 (HTTP) or exist in out/ (static).
 *
 * Usage:
 *   node scripts/qa/check-routes.mjs
 *   node scripts/qa/check-routes.mjs --base http://127.0.0.1:4173
 *   node scripts/qa/check-routes.mjs --out          # file check under out/
 *   node scripts/qa/check-routes.mjs --include-planned
 *   node scripts/qa/check-routes.mjs --base https://certamaris.com
 */

import path from "node:path";
import {
  REPO_ROOT,
  OUT_DIR,
  parseArgs,
  pathExists,
  printReport,
  exitCode,
} from "./lib.mjs";
import {
  getRequiredRoutes,
  PLANNED_ROUTES,
  CURRENT_ASSET_ROUTES,
  pathnameToOutCandidates,
  PREVIEW_ORIGIN_DEFAULT,
} from "./expected-routes.mjs";

const args = parseArgs();
const useOut = Boolean(args.out) || (!args.base && (await pathExists(OUT_DIR)));
const base = typeof args.base === "string" ? args.base.replace(/\/$/, "") : PREVIEW_ORIGIN_DEFAULT;
const includePlanned = Boolean(args["include-planned"]);
const includeAssets = args.assets !== false && args["no-assets"] !== true;
const failPlanned = Boolean(args["fail-planned"]);

const required = [
  ...getRequiredRoutes(),
  ...(includeAssets ? CURRENT_ASSET_ROUTES : []),
];
const planned = includePlanned || failPlanned ? PLANNED_ROUTES : [];

async function checkOut(pathname) {
  const candidates = pathnameToOutCandidates(pathname).map((c) => path.join(OUT_DIR, c));
  for (const c of candidates) {
    if (await pathExists(c)) {
      return { ok: true, detail: path.relative(REPO_ROOT, c) };
    }
  }
  return { ok: false, detail: `missing under out/ (${pathnameToOutCandidates(pathname).join(" | ")})` };
}

async function checkHttp(pathname) {
  const url = `${base}${pathname === "/" ? "/" : pathname}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { Accept: "text/html,application/xhtml+xml,*/*" },
    });
    return {
      ok: res.status >= 200 && res.status < 400,
      detail: `${res.status} ${url}`,
      status: res.status,
    };
  } catch (err) {
    return { ok: false, detail: `fetch error ${url}: ${err.message}` };
  }
}

async function main() {
  console.log(`check-routes mode=${useOut ? "out/" : "http"} ${useOut ? OUT_DIR : base}`);
  if (useOut && !(await pathExists(OUT_DIR))) {
    console.error("out/ not found. Run `npm run build:static` first, or pass --base <url>.");
    process.exit(2);
  }

  const checker = useOut ? checkOut : checkHttp;
  const ok = [];
  const fail = [];
  const warn = [];

  for (const route of required) {
    const result = await checker(route);
    if (result.ok) ok.push(`${route} → ${result.detail}`);
    else fail.push(`${route} → ${result.detail}`);
  }

  for (const route of planned) {
    const result = await checker(route);
    if (result.ok) ok.push(`[planned] ${route} → ${result.detail}`);
    else if (failPlanned) fail.push(`[planned] ${route} → ${result.detail}`);
    else warn.push(`[planned] ${route} → ${result.detail}`);
  }

  printReport("Route check", { ok, fail, warn });
  console.log(
    `Summary: ${ok.length} pass, ${warn.length} warn (planned IA), ${fail.length} fail (required)`
  );
  process.exit(exitCode(fail.length));
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
