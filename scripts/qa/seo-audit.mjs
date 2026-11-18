#!/usr/bin/env node
/**
 * Strict SEO integrity audit over the static export.
 *
 * Produces:
 *   docs/seo/ROUTE_SEO_INVENTORY.json
 *   docs/seo/SEO_TECHNICAL_AUDIT.json
 *   docs/seo/INTERNAL_LINK_MAP.md
 */

import fs from "node:fs";
import path from "node:path";
import {
  OUT_DIR,
  extractCanonical,
  extractH1s,
  extractInternalHrefs,
  extractMetaDescription,
  extractTitle,
  pathExists,
  readText,
  stripHtmlToText,
  walkFiles,
} from "./lib.mjs";

const args = new Set(process.argv.slice(2));
const strict = args.has("--strict");

function decodeEntities(value) {
  return (value || "")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function routeFromFile(relativeFile) {
  if (relativeFile === "index.html") return "/";
  if (relativeFile.endsWith("/index.html")) {
    return `/${relativeFile.slice(0, -"/index.html".length)}`;
  }
  return `/${relativeFile.slice(0, -".html".length)}`;
}

function normalizePath(value) {
  try {
    const url = new URL(value, "https://certamaris.com");
    const clean = url.pathname.replace(/\/+$/, "");
    return clean || "/";
  } catch {
    return value;
  }
}

function pageFamily(route) {
  if (route === "/") return "home";
  if (
    route === "/contact" ||
    route.startsWith("/contact/") ||
    route === "/pricing" ||
    route === "/faq" ||
    route === "/demo"
  ) {
    return "conversion";
  }
  if (route.startsWith("/platform")) return "product";
  if (route.startsWith("/solutions")) return "solutions";
  if (route.startsWith("/who-we-serve")) return "audience";
  if (route.startsWith("/compliance")) return "compliance";
  if (route.startsWith("/resources") || route.startsWith("/topics"))
    return "resources";
  if (route.startsWith("/about")) return "company";
  if (route.startsWith("/trust") || route === "/security") return "trust";
  if (route.startsWith("/legal") || route === "/privacy" || route === "/terms")
    return "legal";
  return "utility";
}

function primaryIntent(route, family, title, h1) {
  const subject = h1 || title;
  if (route === "/")
    return "Evaluate maritime cyber compliance software for fleet-scale assurance";
  if (route === "/pricing")
    return "Compare CertaMaris annual pricing and scope optional services";
  if (route === "/contact")
    return "Request a demo, sales, procurement, security, or privacy follow-up";
  if (route === "/demo")
    return "Inspect the maritime cyber assurance workflow before requesting a demo";
  if (route === "/faq")
    return "Answer common questions about CertaMaris scope, security, pricing, and compliance";
  if (family === "product") return `Evaluate the ${subject} product capability`;
  if (family === "solutions")
    return `Solve the ${subject} operational compliance problem`;
  if (family === "audience") return `Understand how ${subject} use CertaMaris`;
  if (family === "compliance")
    return `Understand requirements and operational implications for ${subject}`;
  if (family === "resources") return `Learn about ${subject}`;
  if (family === "trust")
    return `Evaluate CertaMaris security, trust, procurement, or assurance information`;
  if (family === "company")
    return `Understand CertaMaris company, leadership, or corporate information`;
  if (family === "legal") return `Read the CertaMaris legal notice or policy`;
  return `Understand ${subject}`;
}

function primaryAudience(family) {
  if (family === "product" || family === "solutions") {
    return "Fleet compliance, cyber security, technical management, and operations leaders";
  }
  if (family === "audience") return "The named maritime operational role";
  if (family === "compliance")
    return "Compliance, DPA, HSSEQ, survey, and technical management teams";
  if (family === "resources")
    return "Maritime cyber practitioners researching a specific workflow or requirement";
  if (family === "trust" || family === "legal")
    return "Security, procurement, legal, and enterprise diligence teams";
  if (family === "company")
    return "Prospects, partners, media, and prospective employees";
  return "Prospective maritime operator and commercial buyer";
}

function primaryCta(family) {
  if (family === "trust" || family === "legal")
    return "/contact?intent=procurement";
  if (family === "company") return "/about";
  return "/contact?intent=demo";
}

function readRobots(html) {
  const match =
    html.match(
      /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    ) ||
    html.match(
      /<meta\b[^>]*content=["']([^"']+)["'][^>]*name=["']robots["'][^>]*>/i,
    );
  return match?.[1]?.toLowerCase() || "index, follow";
}

function readOgImage(html) {
  return (
    html.match(
      /<meta\b[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    )?.[1] ||
    html.match(
      /<meta\b[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i,
    )?.[1] ||
    ""
  );
}

function readJsonLd(html) {
  const blocks = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ].map((match) => match[1]);
  const types = [];
  const nodes = [];
  const errors = [];
  for (const [index, block] of blocks.entries()) {
    try {
      const parsed = JSON.parse(block);
      const visit = (node) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          node.forEach(visit);
          return;
        }
        if (typeof node["@type"] === "string") {
          types.push(node["@type"]);
          nodes.push(node);
        }
        if (Array.isArray(node["@graph"])) {
          node["@graph"].forEach(visit);
        }
      };
      visit(parsed);
    } catch (error) {
      errors.push(`JSON-LD block ${index + 1}: ${error.message}`);
    }
  }
  return { count: blocks.length, types: [...new Set(types)], nodes, errors };
}

function sitemapPaths(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) =>
    normalizePath(match[1]),
  );
}

async function main() {
  if (!(await pathExists(OUT_DIR))) {
    throw new Error("out/ is missing. Run npm run build:static first.");
  }

  const sitemapFile = path.join(OUT_DIR, "sitemap.xml");
  if (!(await pathExists(sitemapFile)))
    throw new Error("out/sitemap.xml is missing.");
  const sitemapUrls = sitemapPaths(await readText(sitemapFile));
  const sitemapSet = new Set(sitemapUrls);

  const htmlFiles = await walkFiles(OUT_DIR, {
    match: (_full, name) => name.endsWith(".html") && !name.startsWith("."),
  });
  const pages = [];
  for (const file of htmlFiles) {
    const relative = path.relative(OUT_DIR, file).replace(/\\/g, "/");
    if (relative.startsWith("_next/")) continue;
    const html = await readText(file);
    const route = routeFromFile(relative);
    const title = decodeEntities(extractTitle(html));
    const description = decodeEntities(extractMetaDescription(html));
    const canonical = extractCanonical(html);
    const h1s = extractH1s(html).map((item) =>
      stripHtmlToText(decodeEntities(item)),
    );
    const robots = readRobots(html);
    const schema = readJsonLd(html);
    pages.push({
      route,
      file: relative,
      family: pageFamily(route),
      title,
      titleLength: title.length,
      description,
      descriptionLength: description.length,
      h1s,
      h1Count: h1s.length,
      canonical,
      canonicalPath: canonical ? normalizePath(canonical) : "",
      robots,
      indexable: !robots.includes("noindex"),
      inSitemap: sitemapSet.has(route),
      openGraphImage: readOgImage(html),
      jsonLd: schema,
      text: stripHtmlToText(html),
      outbound: extractInternalHrefs(html, { pagePath: route }),
      html,
    });
  }

  const routeMap = new Map(pages.map((page) => [page.route, page]));
  const inbound = new Map(pages.map((page) => [page.route, new Set()]));
  for (const page of pages) {
    for (const href of page.outbound) {
      const target = normalizePath(href);
      if (target === page.route || !inbound.has(target)) continue;
      inbound.get(target).add(page.route);
    }
  }

  for (const page of pages) {
    page.inboundCount = inbound.get(page.route)?.size || 0;
    page.inboundFrom = [...(inbound.get(page.route) || [])].sort();
    page.primaryIntent = primaryIntent(
      page.route,
      page.family,
      page.title,
      page.h1s[0] || "",
    );
    page.primaryAudience = primaryAudience(page.family);
    page.primaryConversion = primaryCta(page.family);
  }

  const issues = [];
  const add = (severity, rule, route, message) =>
    issues.push({ severity, rule, route, message });
  const titleMap = new Map();
  const descMap = new Map();
  const canonicalMap = new Map();

  for (const page of pages) {
    if (!page.title) add("error", "missing-title", page.route, "Missing title");
    if (!page.description)
      add(
        "error",
        "missing-description",
        page.route,
        "Missing meta description",
      );
    if (!page.canonical)
      add("error", "missing-canonical", page.route, "Missing canonical URL");
    if (
      page.canonical &&
      page.canonical !== "https://certamaris.com" &&
      !page.canonical.startsWith("https://certamaris.com/")
    ) {
      add(
        "error",
        "canonical-host",
        page.route,
        `Canonical uses an unexpected host: ${page.canonical}`,
      );
    }
    if (page.indexable && page.canonicalPath !== page.route) {
      add(
        "error",
        "canonical-indexable-mismatch",
        page.route,
        `Indexable route canonicalizes to ${page.canonicalPath || "nothing"}`,
      );
    }
    if (page.h1Count !== 1)
      add("error", "h1-count", page.route, `Found ${page.h1Count} H1 elements`);
    if (page.titleLength > 60 && !page.robots.includes("noindex")) {
      add(
        "warning",
        "title-length",
        page.route,
        `Title is ${page.titleLength} characters`,
      );
    }
    if (page.descriptionLength > 160 && !page.robots.includes("noindex")) {
      add(
        "error",
        "description-length",
        page.route,
        `Description is ${page.descriptionLength} characters`,
      );
    }
    if (page.jsonLd.errors.length) {
      add("error", "jsonld-parse", page.route, page.jsonLd.errors.join("; "));
    }
    if (page.openGraphImage) {
      const imagePath = normalizePath(page.openGraphImage);
      if (!fs.existsSync(path.join(OUT_DIR, imagePath.replace(/^\//, "")))) {
        add(
          "error",
          "missing-og-image",
          page.route,
          `OG image does not resolve in out/: ${page.openGraphImage}`,
        );
      }
    }
    const visibleText = decodeEntities(page.text)
      .toLowerCase()
      .replace(/\s+/g, " ");
    for (const node of page.jsonLd.nodes) {
      const type = node["@type"];
      if (type === "FAQPage") {
        for (const question of Array.isArray(node.mainEntity)
          ? node.mainEntity
          : []) {
          const name = String(question.name || "")
            .toLowerCase()
            .replace(/\s+/g, " ");
          if (name && !visibleText.includes(name)) {
            add(
              "error",
              "jsonld-content-mismatch",
              page.route,
              `FAQ question not visible: ${question.name}`,
            );
          }
        }
      }
      if (type === "Article" || type === "TechArticle") {
        const headline = String(node.headline || "")
          .toLowerCase()
          .replace(/\s+/g, " ");
        if (headline && !visibleText.includes(headline)) {
          add(
            "error",
            "jsonld-content-mismatch",
            page.route,
            `Article headline not visible: ${node.headline}`,
          );
        }
      }
      if (type === "BreadcrumbList") {
        for (const item of Array.isArray(node.itemListElement)
          ? node.itemListElement
          : []) {
          const name = String(item.name || "")
            .toLowerCase()
            .replace(/\s+/g, " ");
          if (name && !visibleText.includes(name)) {
            add(
              "error",
              "jsonld-content-mismatch",
              page.route,
              `Breadcrumb label not visible: ${item.name}`,
            );
          }
        }
      }
      if (type === "Person") {
        const name = String(node.name || "")
          .toLowerCase()
          .replace(/\s+/g, " ");
        if (name && !visibleText.includes(name)) {
          add(
            "error",
            "jsonld-content-mismatch",
            page.route,
            `Person name not visible: ${node.name}`,
          );
        }
      }
    }
    if (page.indexable && !page.inSitemap) {
      add(
        "error",
        "indexable-missing-sitemap",
        page.route,
        "Indexable page is absent from sitemap.xml",
      );
    }
    if (!page.indexable && page.inSitemap) {
      add(
        "error",
        "noindex-in-sitemap",
        page.route,
        "Noindex page is present in sitemap.xml",
      );
    }
    if (page.indexable && page.inboundCount === 0 && page.route !== "/") {
      add(
        "warning",
        "orphan-route",
        page.route,
        "No inbound internal links from another exported page",
      );
    }
    for (const key of ["title", "description"]) {
      const map = key === "title" ? titleMap : descMap;
      const value = page[key];
      if (!value) continue;
      if (!map.has(value)) map.set(value, []);
      map.get(value).push(page);
    }
    if (page.canonicalPath) {
      if (!canonicalMap.has(page.canonicalPath))
        canonicalMap.set(page.canonicalPath, []);
      canonicalMap.get(page.canonicalPath).push(page);
    }
  }

  for (const [value, group] of titleMap) {
    if (group.length < 2) continue;
    const indexable = group.filter((page) => page.indexable);
    if (indexable.length > 1) {
      add(
        "error",
        "duplicate-title",
        indexable.map((p) => p.route).join(","),
        `Duplicate title: ${value}`,
      );
    }
  }
  for (const [value, group] of descMap) {
    if (group.length < 2) continue;
    const indexable = group.filter((page) => page.indexable);
    if (indexable.length > 1) {
      add(
        "error",
        "duplicate-description",
        indexable.map((p) => p.route).join(","),
        `Duplicate description: ${value}`,
      );
    }
  }
  for (const [canonical, group] of canonicalMap) {
    const indexable = group.filter((page) => page.indexable);
    if (indexable.length > 1) {
      add(
        "error",
        "canonical-collision",
        indexable.map((p) => p.route).join(","),
        `Multiple indexable pages self-canonicalize to ${canonical}`,
      );
    }
  }
  for (const route of sitemapUrls) {
    if (!routeMap.has(route))
      add(
        "error",
        "sitemap-missing-page",
        route,
        "Sitemap URL has no exported HTML page",
      );
  }
  const duplicateSitemapRoutes = sitemapUrls.filter(
    (route, index) => sitemapUrls.indexOf(route) !== index,
  );
  for (const route of new Set(duplicateSitemapRoutes)) {
    add(
      "error",
      "sitemap-duplicate",
      route,
      "Route appears more than once in sitemap.xml",
    );
  }
  const robotsFile = path.join(OUT_DIR, "robots.txt");
  const robotsText = (await pathExists(robotsFile))
    ? await readText(robotsFile)
    : "";
  if (!robotsText.includes("Sitemap: https://certamaris.com/sitemap.xml")) {
    add(
      "error",
      "robots-sitemap",
      "/robots.txt",
      "robots.txt does not declare the canonical sitemap URL",
    );
  }

  const familyCounts = Object.fromEntries(
    [...new Set(pages.map((page) => page.family))]
      .sort()
      .map((family) => [
        family,
        pages.filter((page) => page.family === family).length,
      ]),
  );
  const schemaErrors = issues.filter((issue) => issue.rule === "jsonld-parse");
  const hardErrors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const report = {
    generatedAt: new Date().toISOString(),
    source: "out/ static export",
    summary: {
      exportedHtmlPages: pages.length,
      indexableRoutes: pages.filter((page) => page.indexable).length,
      noindexRoutes: pages.filter((page) => !page.indexable).length,
      sitemapUrls: sitemapUrls.length,
      familyCounts,
      hardErrors: hardErrors.length,
      warnings: warnings.length,
      jsonLdErrors: schemaErrors.length,
      routesWithInboundLinks: pages.filter((page) => page.inboundCount > 0)
        .length,
    },
    issues,
    sitemap: {
      urls: sitemapUrls,
      indexableMissing: pages
        .filter((page) => page.indexable && !page.inSitemap)
        .map((page) => page.route),
      noindexIncluded: pages
        .filter((page) => !page.indexable && page.inSitemap)
        .map((page) => page.route),
    },
  };

  const inventory = pages
    .sort((a, b) => a.route.localeCompare(b.route))
    .map(
      ({ html: _html, text: _text, outbound: _outbound, jsonLd, ...page }) => ({
        ...page,
        structuredDataBlocks: jsonLd.count,
        structuredDataTypes: jsonLd.types,
      }),
    );

  // Isolate generated evidence when the caller must preserve existing reports.
  const docsDir = process.env.SEO_AUDIT_OUTPUT_DIR || path.join("docs", "seo");
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(
    path.join(docsDir, "ROUTE_SEO_INVENTORY.json"),
    JSON.stringify(inventory, null, 2),
  );
  fs.writeFileSync(
    path.join(docsDir, "SEO_TECHNICAL_AUDIT.json"),
    JSON.stringify(report, null, 2),
  );

  const linkLines = [
    "# CertaMaris Internal Link Map",
    "",
    `Generated from the static export at ${report.generatedAt}.`,
    "",
    "| Route | Family | Inbound | Inbound sources |",
    "| --- | --- | ---: | --- |",
    ...pages
      .sort((a, b) => a.route.localeCompare(b.route))
      .map(
        (page) =>
          `| \`${page.route}\` | ${page.family} | ${page.inboundCount} | ${
            page.inboundFrom
              .slice(0, 6)
              .map((route) => `\`${route}\``)
              .join(", ") || "None"
          }${page.inboundFrom.length > 6 ? ", ..." : ""} |`,
      ),
    "",
  ];
  fs.writeFileSync(
    path.join(docsDir, "INTERNAL_LINK_MAP.md"),
    linkLines.join("\n"),
  );

  console.log("=== Strict SEO audit ===");
  console.log(JSON.stringify(report.summary, null, 2));
  for (const issue of issues) {
    console.log(
      `${issue.severity.toUpperCase()} ${issue.rule} ${issue.route} :: ${issue.message}`,
    );
  }

  if (strict && hardErrors.length > 0) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(2);
});
