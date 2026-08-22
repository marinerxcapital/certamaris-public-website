#!/usr/bin/env node
/**
 * Static regression guard for the 2026-08-22 buyer-readiness improvements.
 * Checks generated HTML because buyers, crawlers, and link validators should
 * receive the core route guidance before client-side hydration.
 */

import path from "node:path";

import { OUT_DIR, exitCode, pathExists, printReport, readText } from "./lib.mjs";

const routeChecks = [
  {
    route: "/",
    candidates: ["index.html"],
    required: [
      "Forwardable review route",
      "/demo#scrub-tour",
      "/pricing",
      "/trust/procurement",
      "/contact?intent=procurement",
    ],
  },
  {
    route: "/pricing",
    candidates: [path.join("pricing", "index.html"), "pricing.html"],
    required: [
      "Package snapshot",
      "Core",
      "Assurance",
      "Enterprise",
      "$15,000 / year",
      "$24,000 / year",
      "$48,000 / year",
      "#package-comparison",
    ],
  },
  {
    route: "/trust",
    candidates: [path.join("trust", "index.html"), "trust.html"],
    required: ["Forwardable review route", "/trust/ai-policy", "/legal/privacy"],
  },
  {
    route: "/trust/procurement",
    candidates: [path.join("trust", "procurement", "index.html"), path.join("trust", "procurement.html")],
    required: [
      "Procurement review path",
      "Public security controls",
      "Assurance model one-pager",
      "/contact?intent=procurement",
    ],
  },
  {
    route: "/contact",
    candidates: [path.join("contact", "index.html"), "contact.html"],
    required: [
      "Fastest useful request",
      "Fleet size and vessel types in scope",
      "Documents needed, if this is a procurement or security request",
      "Forwardable review route",
    ],
  },
];

async function readRouteHtml(page) {
  for (const candidate of page.candidates) {
    const filePath = path.join(OUT_DIR, candidate);
    if (await pathExists(filePath)) return { filePath, html: await readText(filePath) };
  }
  return { filePath: null, html: null };
}

async function main() {
  const ok = [];
  const fail = [];
  const warn = [];

  if (!(await pathExists(OUT_DIR))) {
    fail.push("out/ does not exist; run npm run build:static first");
    printReport("excellence-path QA", { ok, fail, warn });
    process.exit(exitCode(fail.length));
  }

  for (const page of routeChecks) {
    const { filePath, html } = await readRouteHtml(page);
    if (!html) {
      fail.push(`${page.route}: static HTML not found`);
      continue;
    }

    ok.push(`${page.route}: inspected ${path.relative(OUT_DIR, filePath)}`);
    for (const snippet of page.required) {
      if (html.includes(snippet)) ok.push(`${page.route}: contains ${snippet}`);
      else fail.push(`${page.route}: missing ${snippet}`);
    }
  }

  printReport("excellence-path QA", { ok, fail, warn });
  process.exit(exitCode(fail.length));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
