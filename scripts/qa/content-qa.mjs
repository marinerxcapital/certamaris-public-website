#!/usr/bin/env node
/**
 * content-qa.mjs
 *
 * Fail on placeholder / unfinished copy patterns in source and built HTML.
 * Patterns include: TODO, TBD, lorem, drafting note, provider-enabled-later hedges, etc.
 *
 * Usage:
 *   node scripts/qa/content-qa.mjs
 *   node scripts/qa/content-qa.mjs --out
 *   node scripts/qa/content-qa.mjs --source-only
 */

import path from "node:path";
import {
  REPO_ROOT,
  OUT_DIR,
  APP_DIR,
  COMPONENTS_DIR,
  LIB_DIR,
  parseArgs,
  pathExists,
  readText,
  walkFiles,
  printReport,
  exitCode,
} from "./lib.mjs";

const args = parseArgs();
const scanOut = Boolean(args.out) || args["include-out"] === true;
const sourceOnly = Boolean(args["source-only"]) || !scanOut;

/**
 * Each rule: { id, re, message }
 * Applied case-insensitively where noted.
 */
const RULES = [
  { id: "todo", re: /\bTODO\b/, message: "TODO marker" },
  { id: "fixme", re: /\bFIXME\b/, message: "FIXME marker" },
  { id: "tbd", re: /\bTBD\b/, message: "TBD placeholder" },
  { id: "lorem", re: /\blorem\s+ipsum\b/i, message: "lorem ipsum" },
  { id: "lorem-word", re: /\blorem\b/i, message: "lorem placeholder" },
  { id: "drafting-note", re: /drafting\s+note/i, message: "drafting note" },
  {
    id: "provider-later",
    re: /if a (?:specific |named (?:analytics )?)?provider is enabled later/i,
    message: 'placeholder phrasing about analytics provider enabled later',
  },
  {
    id: "provider-enabled-later",
    re: /provider is enabled later/i,
    message: "hedge about analytics provider not yet named",
  },
  { id: "coming-soon", re: /\bcoming soon\b/i, message: "coming soon" },
  // Content stubs only — not form placeholder= attrs, and not "we omit placeholders" legal copy
  {
    id: "placeholder-stub",
    re: /\b(placeholder text|placeholder content|placeholder copy|\[placeholder\])\b/i,
    message: "placeholder content stub",
  },
  { id: "under-construction", re: /under construction/i, message: "under construction" },
  { id: "xxx", re: /\bXXX\b/, message: "XXX marker" },
  { id: "replace-me", re: /\[replace[^\]]*\]/i, message: "[replace…] bracket stub" },
  { id: "insert-here", re: /\[insert[^\]]*\]/i, message: "[insert…] bracket stub" },
  { id: "your-company", re: /\byour company here\b/i, message: "your company here" },
  { id: "sample-text", re: /\bsample text\b/i, message: "sample text" },
  { id: "tk-token", re: /\bTKTK\b/, message: "TKTK editorial stub" },
  { id: "not-yet-written", re: /not yet written/i, message: "not yet written" },
  { id: "content-pending", re: /content pending/i, message: "content pending" },
  { id: "wireframe", re: /\bwireframe\b/i, message: "wireframe" },
  { id: "dummy-data", re: /dummy data/i, message: "dummy data" },
];

/** Paths (relative to repo) or substrings to skip (tests, docs, QA scripts themselves). */
const SKIP_PATH_PARTS = [
  `${path.sep}scripts${path.sep}qa${path.sep}`,
  `${path.sep}docs${path.sep}`,
  `${path.sep}node_modules${path.sep}`,
  `${path.sep}.next${path.sep}`,
  `${path.sep}qa-screenshots${path.sep}`,
  `${path.sep}artifacts${path.sep}`,
  `${path.sep}test-results${path.sep}`,
  "package-lock.json",
  "pnpm-lock.yaml",
  "tsconfig.tsbuildinfo",
];

const SOURCE_EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".mjs", ".mdx", ".css", ".json"]);

function shouldSkip(filePath) {
  const norm = filePath;
  return SKIP_PATH_PARTS.some((p) => norm.includes(p));
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

/** Lines that discuss avoiding placeholders (legal honesty) are allowed. */
function isAllowedPlaceholderContext(line) {
  return (
    /\b(not as|without|omit|omitted|no)\b.*\bplaceholders?\b/i.test(line) ||
    /\bplaceholders?\b.*\b(omitted|not invented|not invented or)/i.test(line) ||
    /\breject placeholders that assert\b/i.test(line) ||
    /\bis a placeholder that is hard to defend\b/i.test(line) ||
    /\bplaceholder\s*=/.test(line) || // JSX/HTML form attribute
    /\bplaceholder\?:/.test(line) || // TS prop type
    /\bplaceholder\s*\?/.test(line) ||
    /\bplaceholder\s*=\s*["']Select/.test(line)
  );
}

async function scanFile(filePath) {
  const text = await readText(filePath);
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (const rule of RULES) {
    let m;
    const re = new RegExp(rule.re.source, rule.re.flags.includes("g") ? rule.re.flags : `${rule.re.flags}g`);
    while ((m = re.exec(text))) {
      const line = lineNumberAt(text, m.index);
      const lineText = lines[line - 1] ?? "";
      // Skip form placeholder= and honest legal "we don't put placeholders" sentences
      if (
        (rule.id === "placeholder-stub" || rule.id.includes("placeholder")) &&
        isAllowedPlaceholderContext(lineText)
      ) {
        continue;
      }
      hits.push({
        rule: rule.id,
        message: rule.message,
        line,
        snippet: text.slice(Math.max(0, m.index - 20), m.index + m[0].length + 40).replace(/\s+/g, " ").trim(),
      });
    }
  }
  return hits;
}

async function main() {
  const files = [];

  for (const dir of [APP_DIR, COMPONENTS_DIR, LIB_DIR]) {
    if (!(await pathExists(dir))) continue;
    const found = await walkFiles(dir, {
      match: (full, name) => {
        if (shouldSkip(full)) return false;
        const ext = path.extname(name);
        return SOURCE_EXTS.has(ext);
      },
    });
    files.push(...found);
  }

  // Public copy-ish markdown at root if any
  // (docs intentionally skipped — measurement/QA docs mention banned phrases)

  if (scanOut && !sourceOnly && (await pathExists(OUT_DIR))) {
    const html = await walkFiles(OUT_DIR, {
      match: (full, name) => name.endsWith(".html") && !shouldSkip(full),
    });
    files.push(...html);
  }

  const fail = [];
  const ok = [];

  for (const file of files) {
    const hits = await scanFile(file);
    const rel = path.relative(REPO_ROOT, file).replace(/\\/g, "/");
    if (hits.length === 0) {
      ok.push(rel);
    } else {
      for (const h of hits) {
        fail.push(`${rel}:${h.line} [${h.rule}] ${h.message} — …${h.snippet}…`);
      }
    }
  }

  printReport("Content QA", {
    ok: [`${ok.length} files clean`],
    fail,
    warn: [],
  });
  console.log(`Scanned ${files.length} files under app/, components/, lib/${scanOut ? " + out/" : ""}`);
  process.exit(exitCode(fail.length));
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
