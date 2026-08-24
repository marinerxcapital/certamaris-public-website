#!/usr/bin/env node
/**
 * Generated-HTML guard for client-facing product boundaries.
 *
 * The public website must not market CertaMaris internal employee tooling as a
 * buyer feature. Historical docs may mention it, but generated production HTML
 * must stay focused on client company, fleet, vessel, evidence, findings,
 * plans, reports, trust, procurement, and contact paths.
 */

import path from "node:path";

import {
  OUT_DIR,
  exitCode,
  pathExists,
  printReport,
  readText,
  walkFiles,
} from "./lib.mjs";

const FORBIDDEN_PUBLIC_PHRASES = [
  "Internal Admin",
  "Admin Dashboard",
  "CertaMaris Admin",
  "internal dashboard",
  "internal admin",
  "Corporate Control Plane",
  "employee-only",
  "operator console",
  "admin console",
  "dashboard v2",
];

const FORBIDDEN_PUBLIC_PATHS = [
  "/platform/corporate-control-plane",
  "/product/dashboard-v2/corporate-control-plane.png",
  "/product/dashboard-v2/optimized/corporate-control-plane-1440.webp",
  "/product/dashboard-v2/optimized/corporate-control-plane-960.webp",
  "/product/dashboard-v2/optimized/corporate-control-plane-640.webp",
  "/product/dashboard-v2/optimized/corporate-control-plane-384.webp",
];

const REQUIRED_CLIENT_FACING_SNIPPETS = [
  "Client Company Portal",
  "/platform/evidence",
  "/platform/findings-corrective-actions",
  "Cybersecurity Plans",
  "/platform/reports-readiness",
  "/platform/vessel-portal",
  "/pricing",
  "/trust/procurement",
  "/contact?intent=procurement",
];

const EXPECTED_OG_PATH = "/og/certamaris-link-preview-2026-08-v2.png";

const REQUIRED_PAGES = [
  { route: "/", candidates: ["index.html"] },
  { route: "/platform", candidates: [path.join("platform", "index.html"), "platform.html"] },
  { route: "/demo", candidates: [path.join("demo", "index.html"), "demo.html"] },
  { route: "/pricing", candidates: [path.join("pricing", "index.html"), "pricing.html"] },
  { route: "/trust", candidates: [path.join("trust", "index.html"), "trust.html"] },
  {
    route: "/trust/procurement",
    candidates: [path.join("trust", "procurement", "index.html"), path.join("trust", "procurement.html")],
  },
  { route: "/contact", candidates: [path.join("contact", "index.html"), "contact.html"] },
];

function normalizeHtml(html) {
  return html.replace(/\s+/g, " ");
}

function countMeta(html, attrName, attrValue) {
  const re = new RegExp(`<meta\\b(?=[^>]*\\b${attrName}=["']${attrValue}["'])[^>]*>`, "gi");
  return [...html.matchAll(re)].length;
}

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
    printReport("public product boundary QA", { ok, fail, warn });
    process.exit(exitCode(fail.length));
  }

  const htmlFiles = await walkFiles(OUT_DIR, {
    match: (_full, name) => name.endsWith(".html") || name === "sitemap.xml",
  });
  let combinedHtml = "";

  if (htmlFiles.length) ok.push(`inspected ${htmlFiles.length} generated HTML/XML files`);
  else fail.push("no generated HTML/XML files found in out/");

  for (const filePath of htmlFiles) {
    const rel = path.relative(OUT_DIR, filePath);
    const html = await readText(filePath);
    const compact = normalizeHtml(html);
    combinedHtml += `\n${compact}`;

    for (const phrase of FORBIDDEN_PUBLIC_PHRASES) {
      if (compact.toLowerCase().includes(phrase.toLowerCase())) {
        fail.push(`${rel}: contains forbidden public phrase "${phrase}"`);
      }
    }

    for (const forbiddenPath of FORBIDDEN_PUBLIC_PATHS) {
      if (compact.includes(forbiddenPath)) {
        fail.push(`${rel}: contains forbidden internal-admin path ${forbiddenPath}`);
      }
    }
  }

  const removedRouteCandidates = [
    path.join(OUT_DIR, "platform", "corporate-control-plane", "index.html"),
    path.join(OUT_DIR, "platform", "corporate-control-plane.html"),
  ];
  const removedRouteExists = [];
  for (const candidate of removedRouteCandidates) {
    if (await pathExists(candidate)) removedRouteExists.push(path.relative(OUT_DIR, candidate));
  }
  if (removedRouteExists.length) fail.push(`removed module route is still generated: ${removedRouteExists.join(", ")}`);
  else ok.push("removed internal-admin module route is not generated");

  for (const page of REQUIRED_PAGES) {
    const { filePath, html } = await readRouteHtml(page);
    if (!html) {
      fail.push(`${page.route}: generated HTML missing`);
      continue;
    }
    ok.push(`${page.route}: inspected ${path.relative(OUT_DIR, filePath)}`);
  }

  const root = await readRouteHtml(REQUIRED_PAGES[0]);
  if (root.html) {
    const ogCount = countMeta(root.html, "property", "og:image");
    const twitterCount = countMeta(root.html, "name", "twitter:image");
    if (ogCount === 1) ok.push("root has exactly one og:image");
    else fail.push(`root expected one og:image, found ${ogCount}`);
    if (twitterCount === 1) ok.push("root has exactly one twitter:image");
    else fail.push(`root expected one twitter:image, found ${twitterCount}`);
    if (root.html.includes(EXPECTED_OG_PATH)) ok.push(`root preserves ${EXPECTED_OG_PATH}`);
    else fail.push(`root is missing ${EXPECTED_OG_PATH}`);
  }

  if (combinedHtml) {
    for (const snippet of REQUIRED_CLIENT_FACING_SNIPPETS) {
      if (combinedHtml.includes(snippet)) ok.push(`generated public HTML contains ${snippet}`);
      else fail.push(`generated public HTML missing client-facing snippet ${snippet}`);
    }
  }

  printReport("public product boundary QA", { ok, fail, warn });
  process.exit(exitCode(fail.length));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
