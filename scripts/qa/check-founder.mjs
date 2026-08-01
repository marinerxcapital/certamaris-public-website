#!/usr/bin/env node
/**
 * check-founder.mjs
 *
 * Founder / About leadership headshot QA for CertaMaris marketing site.
 * Verifies built HTML (preferred) or source that the public founder profile
 * ships with required identity, credentials, and accessible headshot markup.
 *
 * Required signals (case-sensitive where noted):
 *   - "Skyler Brown"
 *   - "Founder"
 *   - "Marine Transportation"
 *   - "Third Mate"
 *   - "Unlimited Tonnage"
 *   - Image path containing /images/leadership/skyler-brown
 *   - Meaningful alt text on the founder image
 *
 * Usage:
 *   node scripts/qa/check-founder.mjs
 *   node scripts/qa/check-founder.mjs --out
 *   node scripts/qa/check-founder.mjs --source-only
 *   node scripts/qa/check-founder.mjs --out path/to/out
 *
 * Exit codes: 0 pass · 1 fail · 2 setup error (no out and no source)
 */

import path from "node:path";
import {
  REPO_ROOT,
  OUT_DIR,
  APP_DIR,
  LIB_DIR,
  COMPONENTS_DIR,
  parseArgs,
  pathExists,
  readText,
  walkFiles,
  stripHtmlToText,
  printReport,
  exitCode,
} from "./lib.mjs";
import { pathnameToOutCandidates } from "./expected-routes.mjs";

const args = parseArgs();
const sourceOnly = Boolean(args["source-only"]);
const outDir =
  typeof args.out === "string" && args.out !== true
    ? path.resolve(args.out)
    : OUT_DIR;

const LEADERSHIP_PATH = "/about/leadership";
const ABOUT_PATH = "/about";

/** Required visible / markup strings on leadership (and preferably about). */
const REQUIRED_PHRASES = [
  { id: "skyler-brown", phrase: "Skyler Brown", where: "leadership" },
  { id: "founder", phrase: "Founder", where: "leadership" },
  { id: "marine-transportation", phrase: "Marine Transportation", where: "leadership" },
  { id: "third-mate", phrase: "Third Mate", where: "leadership" },
  { id: "unlimited-tonnage", phrase: "Unlimited Tonnage", where: "leadership" },
];

/** Image path fragment that must appear in src / srcset / data attributes. */
const IMAGE_PATH_FRAGMENT = "/images/leadership/skyler-brown";

/**
 * Extract <img> tags (and Next.js optimized variants) whose src/srcset
 * reference the founder headshot path.
 */
function extractFounderImages(html) {
  const imgs = [];
  // Standard <img ...>
  const imgRe = /<img\b([^>]*)>/gi;
  let m;
  while ((m = imgRe.exec(html))) {
    const attrs = m[1];
    const blob = attrs;
    if (!blob.includes("skyler-brown") && !blob.includes("leadership/skyler")) {
      // still allow if src elsewhere uses the path via srcset only after decode
      if (!/skyler[-_]?brown/i.test(blob)) continue;
    }
    const src =
      (attrs.match(/\bsrc=["']([^"']+)["']/i) || [])[1] ||
      (attrs.match(/\bsrcSet=["']([^"']+)["']/i) || [])[1] ||
      (attrs.match(/\bsrcset=["']([^"']+)["']/i) || [])[1] ||
      "";
    const altMatch = attrs.match(/\balt=["']([^"']*)["']/i);
    const alt = altMatch ? altMatch[1] : null;
    const hasAltAttr = altMatch !== null;
    imgs.push({ tag: m[0], src, alt, hasAltAttr, attrs });
  }

  // Next.js may emit <img> inside picture; also check source srcset
  const sourceRe = /<source\b([^>]*)>/gi;
  while ((m = sourceRe.exec(html))) {
    const attrs = m[1];
    if (!/skyler[-_]?brown/i.test(attrs)) continue;
    const src =
      (attrs.match(/\bsrcSet=["']([^"']+)["']/i) || [])[1] ||
      (attrs.match(/\bsrcset=["']([^"']+)["']/i) || [])[1] ||
      (attrs.match(/\bsrc=["']([^"']+)["']/i) || [])[1] ||
      "";
    imgs.push({ tag: m[0], src, alt: null, hasAltAttr: false, attrs, isSource: true });
  }

  return imgs;
}

function htmlHasImagePath(html) {
  return html.includes(IMAGE_PATH_FRAGMENT) || /\/images\/leadership\/skyler-brown/i.test(html);
}

function phrasePresent(text, phrase) {
  return text.includes(phrase);
}

async function loadOutHtml(pathname) {
  const candidates = pathnameToOutCandidates(pathname);
  for (const rel of candidates) {
    if (!rel.endsWith(".html") && !rel.endsWith(".txt")) continue;
    if (!rel.endsWith(".html")) continue;
    const full = path.join(outDir, rel);
    if (await pathExists(full)) {
      return { file: rel, html: await readText(full) };
    }
  }
  return null;
}

async function loadSourceBundle() {
  /** Concatenate likely source files that should hold founder content. */
  const roots = [
    path.join(APP_DIR, "about"),
    path.join(LIB_DIR),
    path.join(COMPONENTS_DIR),
  ];
  const files = [];
  for (const dir of roots) {
    if (!(await pathExists(dir))) continue;
    const found = await walkFiles(dir, {
      match: (_full, name) => {
        const ext = path.extname(name);
        return [".tsx", ".ts", ".jsx", ".js", ".mdx"].includes(ext);
      },
    });
    files.push(...found);
  }

  // Prefer files that mention leadership / skyler / founder
  const bundles = [];
  for (const file of files) {
    const text = await readText(file);
    if (
      /skyler|founder|leadership|third\s*mate|unlimited\s*tonnage|marine\s*transportation/i.test(
        text
      )
    ) {
      bundles.push({
        file: path.relative(REPO_ROOT, file).replace(/\\/g, "/"),
        text,
      });
    }
  }
  return bundles;
}

function checkPhrases(haystack, label, fail, ok) {
  for (const { id, phrase } of REQUIRED_PHRASES) {
    if (phrasePresent(haystack, phrase)) {
      ok.push(`${label}: has "${phrase}" (${id})`);
    } else {
      fail.push(`${label}: missing required phrase "${phrase}" (${id})`);
    }
  }
}

function checkImages(html, label, fail, ok, warn) {
  if (!htmlHasImagePath(html)) {
    fail.push(
      `${label}: missing image path containing "${IMAGE_PATH_FRAGMENT}"`
    );
  } else {
    ok.push(`${label}: image path "${IMAGE_PATH_FRAGMENT}" present`);
  }

  const imgs = extractFounderImages(html);
  const imgTags = imgs.filter((i) => !i.isSource);

  if (imgTags.length === 0) {
    // Path may appear in CSS/background or Next Image without matching our parser —
    // still require an <img> with alt for a11y when path is present.
    if (htmlHasImagePath(html)) {
      // Try broader: any img with skyler in nearby markup
      const loose = [...html.matchAll(/<img\b[^>]*>/gi)].filter((m) =>
        /skyler|leadership/i.test(m[0])
      );
      if (loose.length === 0) {
        fail.push(
          `${label}: no <img> for founder headshot (need accessible portrait with alt)`
        );
        return;
      }
      for (const m of loose) {
        const altMatch = m[0].match(/\balt=["']([^"']*)["']/i);
        if (!altMatch) {
          fail.push(`${label}: founder <img> missing alt attribute`);
        } else if (!altMatch[1].trim()) {
          fail.push(`${label}: founder <img> has empty alt (decorative not OK for portrait)`);
        } else if (!/skyler|brown|founder|portrait|headshot|photo/i.test(altMatch[1])) {
          warn.push(
            `${label}: founder alt="${altMatch[1]}" — prefer name/role (e.g. "Skyler Brown, Founder")`
          );
          ok.push(`${label}: founder <img> has non-empty alt`);
        } else {
          ok.push(`${label}: founder <img> alt="${altMatch[1]}"`);
        }
      }
      return;
    }
    fail.push(`${label}: no founder headshot <img> found`);
    return;
  }

  for (const img of imgTags) {
    if (!img.hasAltAttr) {
      fail.push(`${label}: founder <img> missing alt attribute — ${img.src || "(no src)"}`);
    } else if (!img.alt || !img.alt.trim()) {
      fail.push(
        `${label}: founder <img> has empty alt (portrait must not be decorative-only)`
      );
    } else if (!/skyler|brown|founder|portrait|headshot|photo/i.test(img.alt)) {
      warn.push(
        `${label}: founder alt="${img.alt}" — prefer including name/role for screen readers`
      );
      ok.push(`${label}: founder <img> has non-empty alt`);
    } else {
      ok.push(`${label}: founder <img> alt="${img.alt}"`);
    }
  }
}

async function main() {
  const ok = [];
  const fail = [];
  const warn = [];

  const hasOut = await pathExists(outDir);
  const useOut = hasOut && !sourceOnly;

  if (useOut) {
    const leadership = await loadOutHtml(LEADERSHIP_PATH);
    const about = await loadOutHtml(ABOUT_PATH);

    if (!leadership) {
      fail.push(
        `built HTML missing for ${LEADERSHIP_PATH} under ${path.relative(REPO_ROOT, outDir) || "out"} (run npm run build:static)`
      );
    } else {
      ok.push(`found built page ${leadership.file}`);
      const text = stripHtmlToText(leadership.html);
      const combined = leadership.html + "\n" + text;
      checkPhrases(combined, LEADERSHIP_PATH, fail, ok);
      checkImages(leadership.html, LEADERSHIP_PATH, fail, ok, warn);
    }

    // About may teaser founder; warn (not fail) if phrases missing there
    if (about) {
      const aboutText = stripHtmlToText(about.html);
      if (phrasePresent(aboutText + about.html, "Skyler Brown")) {
        ok.push(`${ABOUT_PATH}: references Skyler Brown`);
      } else {
        warn.push(
          `${ABOUT_PATH}: no "Skyler Brown" teaser (optional; leadership page is required)`
        );
      }
      if (htmlHasImagePath(about.html)) {
        ok.push(`${ABOUT_PATH}: includes founder image path`);
      }
    } else {
      warn.push(`built HTML missing for ${ABOUT_PATH} (route still required by expected-routes)`);
    }
  } else {
    // Source-mode fallback when out/ not built yet
    if (sourceOnly) {
      ok.push("mode: --source-only (scanning app/ lib/ components/)");
    } else {
      warn.push(
        `out/ not found at ${outDir} — falling back to source scan (run build:static for full HTML a11y checks)`
      );
    }

    const bundles = await loadSourceBundle();
    if (bundles.length === 0) {
      fail.push(
        "no source files mention founder/leadership identity — agents 2/4 may not have landed content yet"
      );
    } else {
      const joined = bundles.map((b) => b.text).join("\n");
      const fileList = bundles.map((b) => b.file).join(", ");
      ok.push(`source candidates: ${fileList}`);
      checkPhrases(joined, "source", fail, ok);

      if (joined.includes(IMAGE_PATH_FRAGMENT) || /images\/leadership\/skyler-brown/.test(joined)) {
        ok.push(`source: image path "${IMAGE_PATH_FRAGMENT}" referenced`);
      } else {
        fail.push(`source: missing image path "${IMAGE_PATH_FRAGMENT}"`);
      }

      // Alt in JSX: alt="..." or alt={'...'}
      const altJsx =
        joined.match(/alt\s*=\s*["']([^"']+)["']/) ||
        joined.match(/alt\s*=\s*\{["']([^"']+)["']\}/);
      const altNearSkyler = (() => {
        // Prefer alt near skyler-brown path
        const re =
          /skyler-brown[\s\S]{0,400}alt\s*=\s*["'{]([^"'}]+)["'}]|alt\s*=\s*["'{]([^"'}]+)["'}][\s\S]{0,400}skyler-brown/gi;
        const m = re.exec(joined);
        if (!m) return null;
        return (m[1] || m[2] || "").trim();
      })();

      if (altNearSkyler) {
        if (!altNearSkyler) {
          fail.push("source: founder image alt is empty");
        } else {
          ok.push(`source: founder image alt≈"${altNearSkyler}"`);
        }
      } else if (altJsx && /skyler|brown|founder|portrait|headshot/i.test(altJsx[1] || "")) {
        ok.push(`source: alt="${altJsx[1]}"`);
      } else {
        fail.push(
          "source: no non-empty alt text found near founder headshot (required for a11y)"
        );
      }
    }
  }

  // Public asset presence (static files — independent of HTML)
  const publicDir = path.join(REPO_ROOT, "public", "images", "leadership");
  if (await pathExists(publicDir)) {
    const assets = await walkFiles(publicDir, {
      match: (_f, name) => /skyler-brown/i.test(name),
    });
    if (assets.length === 0) {
      fail.push("public/images/leadership/: no skyler-brown asset files");
    } else {
      ok.push(
        `public assets: ${assets.length} skyler-brown file(s) under images/leadership/`
      );
    }
  } else {
    fail.push("public/images/leadership/ directory missing");
  }

  printReport("Founder / Leadership headshot QA", { ok, fail, warn });
  console.log(
    `Checked ${useOut ? "built HTML under out/" : "source + public assets"} · required routes: ${ABOUT_PATH}, ${LEADERSHIP_PATH}`
  );
  process.exit(exitCode(fail.length));
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
