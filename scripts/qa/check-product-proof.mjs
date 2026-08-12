#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const WIDTHS = [384, 640, 960, 1440];
const ALLOWED_BASE = "/product/dashboard-v2/";
const BANNED_SOURCE_PATTERNS = [
  /\/product\/clean\//,
  /\/product\/updated\//,
  /\/product\/optimized\//,
  /public[\\/]+product[\\/]+clean[\\/]/,
  /public[\\/]+product[\\/]+updated[\\/]/,
  /public[\\/]+product[\\/]+optimized[\\/]/,
];
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".md", ".json", ".jsonc"]);
const SOURCE_EXCLUDE = new Set(["node_modules", ".git", ".next", "out", "public", "docs"]);
const ACTIVE_SOURCE_ROOTS = ["app", "components", "lib", "scripts", "worker"];

function readPngDimensions(file) {
  const buffer = fs.readFileSync(file);
  if (buffer.toString("ascii", 1, 4) !== "PNG") {
    throw new Error(`${file} is not a PNG`);
  }
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function walk(dir, entries = []) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.isDirectory()) {
      if (SOURCE_EXCLUDE.has(item.name)) continue;
      walk(path.join(dir, item.name), entries);
    } else {
      entries.push(path.join(dir, item.name));
    }
  }
  return entries;
}

const registryPath = path.join(ROOT, "lib", "product-screens.ts");
const transpiler = await import(pathToFileURL(path.join(ROOT, "node_modules", "typescript", "lib", "typescript.js")));
const ts = transpiler.default ?? transpiler;
const registrySource = fs.readFileSync(registryPath, "utf8");
const compiled = ts.transpileModule(registrySource, {
  compilerOptions: { module: ts.ModuleKind.ES2020, target: ts.ScriptTarget.ES2020 },
});
const tempDir = fs.mkdtempSync(path.join(process.env.TEMP || ROOT, "certamaris-product-proof-"));
const tempFile = path.join(tempDir, "product-screens.mjs");
fs.writeFileSync(tempFile, compiled.outputText);
const { productProofScreens } = await import(pathToFileURL(tempFile));

const errors = [];
const seenSrc = new Map();

for (const [key, screen] of Object.entries(productProofScreens)) {
  if (!screen.src.startsWith(ALLOWED_BASE)) {
    errors.push(`${key}: src must use ${ALLOWED_BASE}: ${screen.src}`);
    continue;
  }
  if (screen.fullSrc !== screen.src) {
    errors.push(`${key}: fullSrc must match canonical src`);
  }
  const pngPath = path.join(ROOT, "public", screen.src.replace(/^\//, ""));
  if (!fs.existsSync(pngPath)) {
    errors.push(`${key}: missing PNG ${screen.src}`);
    continue;
  }
  const actual = readPngDimensions(pngPath);
  if (actual.width !== screen.width || actual.height !== screen.height) {
    errors.push(`${key}: metadata ${screen.width}x${screen.height} does not match PNG ${actual.width}x${actual.height}`);
  }
  const baseName = path.basename(screen.src, ".png");
  for (const width of WIDTHS) {
    const derivative = path.join(ROOT, "public", "product", "dashboard-v2", "optimized", `${baseName}-${width}.webp`);
    if (!fs.existsSync(derivative)) {
      errors.push(`${key}: missing optimized derivative ${path.relative(ROOT, derivative)}`);
    }
  }
  if (screen.annotations) {
    if (screen.annotations.length > 3) {
      errors.push(`${key}: more than three annotations`);
    }
    for (const annotation of screen.annotations) {
      if (annotation.x < 0 || annotation.x > 100 || annotation.y < 0 || annotation.y > 100) {
        errors.push(`${key}: annotation ${annotation.id} coordinates out of range`);
      }
    }
  }
  const duplicate = seenSrc.get(screen.src);
  if (duplicate) {
    errors.push(`${key}: duplicates src used by ${duplicate}`);
  }
  seenSrc.set(screen.src, key);
}

const activeFiles = ACTIVE_SOURCE_ROOTS.flatMap((dir) => {
  const absolute = path.join(ROOT, dir);
  return fs.existsSync(absolute) ? walk(absolute) : [];
});

for (const file of activeFiles) {
  if (path.basename(file) === "check-product-proof.mjs" || path.basename(file) === "check-product-proof-render.mjs") {
    continue;
  }
  if (!SOURCE_EXTENSIONS.has(path.extname(file))) continue;
  const rel = path.relative(ROOT, file);
  const text = fs.readFileSync(file, "utf8");
  for (const pattern of BANNED_SOURCE_PATTERNS) {
    if (pattern.test(text)) {
      errors.push(`${rel}: banned stale product-proof reference ${pattern}`);
    }
  }
}

fs.rmSync(tempDir, { recursive: true, force: true });

if (errors.length) {
  console.error(`Product-proof integrity failed (${errors.length} issue(s))`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Product-proof integrity passed: ${Object.keys(productProofScreens).length} registry screens, ${WIDTHS.length} derivatives each.`);
