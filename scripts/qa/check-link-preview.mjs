#!/usr/bin/env node
/**
 * Verifies root-domain link-preview metadata and the versioned social asset in out/.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { OUT_DIR, pathExists, printReport, exitCode } from "./lib.mjs";

const EXPECTED_IMAGE_PATH = "/og/certamaris-link-preview-2026-08-v2.png";
const EXPECTED_IMAGE_URL = `https://certamaris.com${EXPECTED_IMAGE_PATH}`;
const OLD_IMAGE_RE = /\/og\/certamaris-og\.(?:jpe?g|png)\b/i;
const EXPECTED_TITLE = "CertaMaris";

function getMetaValues(html, attrName, attrValue) {
  const re = new RegExp(`<meta\\b(?=[^>]*\\b${attrName}=["']${attrValue}["'])(?=[^>]*\\bcontent=["']([^"']+)["'])[^>]*>`, "gi");
  return [...html.matchAll(re)].map((match) => match[1]);
}

function getCanonical(html) {
  const match =
    html.match(/<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i) ||
    html.match(/<link\b(?=[^>]*\bhref=["']([^"']+)["'])(?=[^>]*\brel=["']canonical["'])[^>]*>/i);
  return match?.[1] ?? "";
}

function pngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) return null;
  if (buffer.subarray(12, 16).toString("ascii") !== "IHDR") return null;
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

async function main() {
  const ok = [];
  const fail = [];
  const warn = [];
  const indexPath = path.join(OUT_DIR, "index.html");
  const imagePath = path.join(OUT_DIR, EXPECTED_IMAGE_PATH.replace(/^\//, ""));

  if (!(await pathExists(indexPath))) {
    fail.push("out/index.html is missing; run npm run build:static first");
  } else {
    const html = await readFile(indexPath, "utf8");
    const canonical = getCanonical(html);
    const ogImages = getMetaValues(html, "property", "og:image");
    const twitterImages = getMetaValues(html, "name", "twitter:image");
    const ogSecureUrls = getMetaValues(html, "property", "og:image:secure_url");
    const ogTypes = getMetaValues(html, "property", "og:image:type");
    const ogWidths = getMetaValues(html, "property", "og:image:width");
    const ogHeights = getMetaValues(html, "property", "og:image:height");
    const siteNames = getMetaValues(html, "property", "og:site_name");
    const twitterCards = getMetaValues(html, "name", "twitter:card");

    if (canonical === "https://certamaris.com" || canonical === "https://certamaris.com/") {
      ok.push(`canonical points to apex root (${canonical})`);
    }
    else fail.push(`canonical mismatch: ${canonical || "missing"}`);

    if (ogImages.length === 1) ok.push("exactly one og:image tag");
    else fail.push(`expected one og:image tag, found ${ogImages.length}`);
    if (ogImages[0] === EXPECTED_IMAGE_URL) ok.push(`og:image uses ${EXPECTED_IMAGE_URL}`);
    else fail.push(`og:image mismatch: ${ogImages[0] || "missing"}`);

    if (twitterImages.length === 1) ok.push("exactly one twitter:image tag");
    else fail.push(`expected one twitter:image tag, found ${twitterImages.length}`);
    if (twitterImages[0] === EXPECTED_IMAGE_URL) ok.push(`twitter:image uses ${EXPECTED_IMAGE_URL}`);
    else fail.push(`twitter:image mismatch: ${twitterImages[0] || "missing"}`);

    if (ogSecureUrls[0] === EXPECTED_IMAGE_URL) ok.push("og:image:secure_url matches versioned PNG");
    else fail.push(`og:image:secure_url mismatch: ${ogSecureUrls[0] || "missing"}`);
    if (ogTypes[0] === "image/png") ok.push("og:image:type is image/png");
    else fail.push(`og:image:type mismatch: ${ogTypes[0] || "missing"}`);
    if (ogWidths[0] === "1200" && ogHeights[0] === "630") ok.push("og:image dimensions are 1200x630");
    else fail.push(`og:image dimensions mismatch: ${ogWidths[0] || "missing"}x${ogHeights[0] || "missing"}`);
    if (siteNames.includes(EXPECTED_TITLE)) ok.push("og:site_name is CertaMaris");
    else fail.push("og:site_name missing CertaMaris");
    if (twitterCards[0] === "summary_large_image") ok.push("twitter:card is summary_large_image");
    else fail.push(`twitter:card mismatch: ${twitterCards[0] || "missing"}`);
    if (/https:\/\/certamaris\.com\/og\/certamaris-link-preview-2026-08-v2\.png/.test(html)) {
      ok.push("root HTML contains the absolute versioned preview URL");
    } else {
      fail.push("root HTML is missing the absolute versioned preview URL");
    }
    if (OLD_IMAGE_RE.test(html)) fail.push("root HTML still references the obsolete certamaris-og image");
    else ok.push("root HTML contains no obsolete certamaris-og image reference");
  }

  if (!(await pathExists(imagePath))) {
    fail.push(`${EXPECTED_IMAGE_PATH} is missing from out/`);
  } else {
    const buffer = await readFile(imagePath);
    const dimensions = pngDimensions(buffer);
    if (dimensions?.width === 1200 && dimensions?.height === 630) {
      ok.push("versioned preview asset is a 1200x630 PNG");
    } else {
      fail.push(`versioned preview asset dimensions/type mismatch: ${dimensions ? `${dimensions.width}x${dimensions.height}` : "not png"}`);
    }
    if (buffer.length > 10_000) ok.push(`versioned preview asset has non-empty image payload (${buffer.length} bytes)`);
    else warn.push(`versioned preview asset is unusually small (${buffer.length} bytes)`);
  }

  printReport("Link preview metadata check (out/)", { ok, fail, warn });
  process.exit(exitCode(fail.length));
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
