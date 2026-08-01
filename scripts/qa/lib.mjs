import { readdir, readFile, access, constants } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(__dirname, "../..");
export const OUT_DIR = path.join(REPO_ROOT, "out");
export const APP_DIR = path.join(REPO_ROOT, "app");
export const COMPONENTS_DIR = path.join(REPO_ROOT, "components");
export const LIB_DIR = path.join(REPO_ROOT, "lib");

export function parseArgs(argv = process.argv.slice(2)) {
  const flags = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        flags[key] = true;
      } else {
        flags[key] = next;
        i++;
      }
    } else {
      flags._.push(a);
    }
  }
  return flags;
}

export async function pathExists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function readText(filePath) {
  return readFile(filePath, "utf8");
}

/** Recursively list files under dir matching predicate. */
export async function walkFiles(dir, { match = () => true } = {}) {
  const out = [];
  async function walk(current) {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      const full = path.join(current, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === "node_modules" || ent.name === ".git" || ent.name === ".next") continue;
        await walk(full);
      } else if (ent.isFile() && match(full, ent.name)) {
        out.push(full);
      }
    }
  }
  await walk(dir);
  return out;
}

export function stripHtmlToText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, " ").trim() : null;
}

export function extractH1s(html) {
  const matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  return matches.map((m) => stripHtmlToText(m[1]));
}

export function extractCanonical(html) {
  const m = html.match(
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i
  ) || html.match(
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i
  );
  return m ? m[1] : null;
}

export function extractMetaDescription(html) {
  const m = html.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i
  ) || html.match(
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i
  );
  return m ? m[1] : null;
}

/** Extract internal hrefs from HTML (same-origin paths and relative). */
export function extractInternalHrefs(html, { pagePath = "/" } = {}) {
  const hrefs = new Set();
  const re = /(?:href|src)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) continue;
    if (raw.startsWith("javascript:")) continue;
    if (raw.startsWith("data:")) continue;
    // External absolute
    if (/^https?:\/\//i.test(raw)) {
      try {
        const u = new URL(raw);
        if (u.hostname === "certamaris.com" || u.hostname === "www.certamaris.com") {
          hrefs.add(u.pathname || "/");
        }
      } catch {
        /* ignore */
      }
      continue;
    }
    if (raw.startsWith("//")) continue;
    // Absolute path on site
    if (raw.startsWith("/")) {
      hrefs.add(raw.split("?")[0].split("#")[0] || "/");
      continue;
    }
    // Relative — resolve against page directory
    try {
      const base = pagePath.endsWith("/") ? pagePath : path.posix.dirname(pagePath) + "/";
      const resolved = path.posix.normalize(path.posix.join(base === "//" ? "/" : base, raw));
      const clean = resolved.split("?")[0].split("#")[0];
      hrefs.add(clean.startsWith("/") ? clean : `/${clean}`);
    } catch {
      /* ignore */
    }
  }
  return [...hrefs];
}

export function printReport(title, { ok, fail, warn }) {
  console.log(`\n=== ${title} ===`);
  if (ok?.length) {
    console.log(`PASS (${ok.length})`);
    for (const line of ok) console.log(`  ✓ ${line}`);
  }
  if (warn?.length) {
    console.log(`WARN (${warn.length})`);
    for (const line of warn) console.log(`  ⚠ ${line}`);
  }
  if (fail?.length) {
    console.log(`FAIL (${fail.length})`);
    for (const line of fail) console.log(`  ✗ ${line}`);
  }
  console.log("");
}

export function exitCode(failCount) {
  return failCount > 0 ? 1 : 0;
}
