#!/usr/bin/env node
/**
 * Regression guard for the public-site buyer journey:
 * Home -> product proof -> pricing -> trust/procurement -> contact.
 */

import path from "node:path";

import { OUT_DIR, exitCode, pathExists, printReport, readText } from "./lib.mjs";

const pages = [
  {
    route: "/",
    candidates: ["index.html"],
    required: [
      "Buyer diligence",
      "#sample-record",
      "#buyer-diligence",
      "/pricing",
      "/trust/procurement",
      "/trust/assurance-model",
      "/trust/ai-policy",
      "/legal/privacy",
      "/contact?intent=procurement",
      "/contact?intent=demo",
    ],
  },
  {
    route: "/pricing",
    candidates: [path.join("pricing", "index.html"), "pricing.html"],
    required: ["Buyer path", "#package-comparison", "/trust/procurement", "/contact?intent=procurement"],
  },
  {
    route: "/trust",
    candidates: [path.join("trust", "index.html"), "trust.html"],
    required: ["Buyer diligence", "/trust/procurement", "/trust/assurance-model", "/trust/ai-policy"],
  },
  {
    route: "/contact",
    candidates: [path.join("contact", "index.html"), "contact.html"],
    required: ["Buyer diligence", "/pricing", "/trust/procurement", "/contact?intent=procurement"],
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
    printReport("buyer-path QA", { ok, fail, warn });
    process.exit(exitCode(fail.length));
  }

  for (const page of pages) {
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

  printReport("buyer-path QA", { ok, fail, warn });
  process.exit(exitCode(fail.length));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
