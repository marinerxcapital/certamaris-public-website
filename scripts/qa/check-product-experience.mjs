#!/usr/bin/env node
// Focused interaction QA for the public product-experience upgrade.
// Requires a current static export in out/.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright-core";

const OUT = "out";
const PORT = Number(process.env.QA_PORT || 4525);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".avif": "image/avif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
};

function resolveFile(urlPath) {
  const parsed = new URL(urlPath, "http://127.0.0.1");
  const clean = decodeURIComponent(parsed.pathname).replace(/\/+$/, "") || "/";
  const candidates =
    clean === "/"
      ? [path.join(OUT, "index.html")]
      : [
          path.join(OUT, clean),
          path.join(OUT, `${clean}.html`),
          path.join(OUT, clean, "index.html"),
        ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile())
      return candidate;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("not found");
    return;
  }
  res.writeHead(200, {
    "content-type": MIME[path.extname(file)] || "application/octet-stream",
  });
  res.end(fs.readFileSync(file));
});

async function assertNoOverflow(page, label) {
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  if (overflow > 0)
    throw new Error(`${label} has ${overflow}px horizontal overflow`);
}

async function main() {
  if (!fs.existsSync(path.join(OUT, "index.html"))) {
    throw new Error("out/ is missing. Run npm run build:static first.");
  }

  await new Promise((resolve) => server.listen(PORT, resolve));
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  const base = `http://127.0.0.1:${PORT}`;
  const failures = [];

  async function step(name, fn) {
    try {
      await fn();
      console.log(`PASS ${name}`);
    } catch (error) {
      failures.push(`${name}: ${error.message}`);
      console.log(`FAIL ${name}: ${error.message}`);
    }
  }

  await step(
    "homepage exposes the disclosed action and public proof",
    async () => {
      await page.goto(`${base}/`, { waitUntil: "load" });
      const headings = page.locator("main h1");
      if ((await headings.count()) !== 1 ||
          (await headings.innerText()).replace(/\s+/g, " ") !==
            "See what’s ready. See what’s still open.")
        throw new Error("Homepage headline changed");

      await page.getByRole("link", { name: "Explore the sample package" }).click();
      if (new URL(page.url()).hash !== "#sample-record")
        throw new Error("Sample package anchor changed");

      const packageSection = page.getByRole("region", { name: /Sample Fleet.*Readiness Package/ });
      await packageSection.getByText("1 disclosed open action", { exact: false }).waitFor();
      await packageSection.getByText("Illustrative version").waitFor();

      const trigger = page.getByRole("button", { name: "Why is this still open?" });
      await trigger.focus();
      await page.keyboard.press("Enter");
      const panel = page.getByRole("dialog");
      await panel.getByText("EVD-0847 · Accepted for the Q2 review").waitFor();
      await panel.getByText("QA-0290 · PKG-0067").waitFor();
      if ((await panel.getByRole("link", { name: /Inspect the public demo chain/ })
        .getAttribute("href")) !== "/demo#chain-inspector")
        throw new Error("Sample record handoff changed");

      await page.keyboard.press("Escape");
      await panel.waitFor({ state: "hidden" });
      await page.waitForFunction(() =>
        document.activeElement?.getAttribute("aria-controls") === "home-action-panel",
      );

      const demoLinks = page.locator("main").getByRole("link", { name: "Request a demo" });
      if ((await demoLinks.count()) !== 2 ||
          (await demoLinks.evaluateAll((links) => links.map((link) =>
            link.getAttribute("href"),
          ))).some((href) => href !== "/contact?intent=demo"))
        throw new Error("Homepage demo handoff changed");
      await assertNoOverflow(page, "homepage sample package");
    },
  );

  await step(
    "demo inspector restores query stage and navigates lineage",
    async () => {
      await page.goto(`${base}/demo?stage=EVD#chain-inspector`, {
        waitUntil: "load",
      });
      await page.getByText("EVD-0847").first().waitFor();
      await page.getByRole("button", { name: /CAP-0455/ }).click();
      await page
        .getByRole("heading", { name: /Re-review crossover rules/ })
        .waitFor();
      await page.getByText("Demonstration fixture only").waitFor();
      await assertNoOverflow(page, "demo inspector");
    },
  );

  await step("pricing restores share URL and reproduces estimate", async () => {
    await page.goto(
      `${base}/pricing?fleet=24&contracted=12&remoteQa=1&onboard=1`,
      { waitUntil: "load" },
    );
    await page.locator('[data-qa="pricing-calculator-v2"]').waitFor();
    await page.getByText("$312,000").waitFor();
    await page.getByLabel("Total fleet vessels exact count").evaluate((el) => {
      if (el.value !== "24")
        throw new Error(`expected fleet 24, got ${el.value}`);
    });
    await page.getByLabel("Contracted vessels exact count").evaluate((el) => {
      if (el.value !== "12")
        throw new Error(`expected contracted 12, got ${el.value}`);
    });
    await page.getByRole("button", { name: "Share estimate" }).click();
    await page.waitForFunction(
      () =>
        window.location.search.includes("fleet=24") &&
        window.location.search.includes("remoteQa=1"),
    );
    await page.goto(page.url(), { waitUntil: "load" });
    await page.getByText("$312,000").waitFor();
    await assertNoOverflow(page, "pricing");
  });

  await step("persona path points to relevant demo context", async () => {
    await page.goto(`${base}/who-we-serve/maritime-it-ot`, {
      waitUntil: "load",
    });
    await page.locator('[data-qa="role-record-path"]').waitFor();
    await page.getByText("IT / OT path").waitFor();
    const href = await page
      .getByRole("link", { name: "Open this demo path" })
      .getAttribute("href");
    if (!href?.includes("stage=CTL") || !href.includes("#chain-inspector")) {
      throw new Error(`unexpected demo path href: ${href}`);
    }
    await assertNoOverflow(page, "persona path");
  });

  await step(
    "evidence simulator creates finding, corrective action, and reset state",
    async () => {
      await page.goto(`${base}/platform/evidence`, { waitUntil: "load" });
      await page.locator('[data-qa="evidence-simulator-v2"]').waitFor();
      await page.locator("#drift-time").fill("180");
      await page.getByRole("button", { name: /EVD-0994/ }).click();
      await page
        .getByRole("button", { name: "Apply reviewer decision" })
        .click();
      await page.getByText("Reviewer created finding").waitFor();
      await page.getByText("CAP-0561").waitFor();
      await page
        .getByRole("button", { name: "Submit refreshed evidence" })
        .click();
      await page.getByText("Resolved / reset state").waitFor();
      await page.getByRole("button", { name: "Reset demo" }).click();
      await page.getByText("Awaiting reviewer").waitFor();
      await assertNoOverflow(page, "evidence simulator");
    },
  );

  await step(
    "mobile gallery navigation preserves tab state and local scrolling",
    async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${base}/demo#owner-corporate`, {
        waitUntil: "networkidle",
      });
      const tabs = page.getByRole("tablist", { name: "Demo product views" });
      await tabs.scrollIntoViewIfNeeded();
      await page
        .getByRole("button", { name: "Next product view", exact: true })
        .click();
      await page
        .getByRole("tab", { name: "Client Admin", exact: true })
        .waitFor();
      if (
        (await page
          .getByRole("tab", { name: "Client Admin", exact: true })
          .getAttribute("aria-selected")) !== "true"
      )
        throw new Error("Next did not select Client Admin");
      const first = page.getByRole("tab", {
        name: "Owner / Governance",
        exact: true,
      });
      await first.focus();
      await page.keyboard.press("End");
      const last = page.getByRole("tab", {
        name: "Readiness Packages",
        exact: true,
      });
      if ((await last.getAttribute("aria-selected")) !== "true")
        throw new Error("End did not select last tab");
      await page
        .getByRole("button", { name: "Next product view", exact: true })
        .waitFor();
      if (
        !(await page
          .getByRole("button", { name: "Next product view", exact: true })
          .isDisabled())
      )
        throw new Error("Next must disable at endpoint");
      await page.keyboard.press("Home");
      await first.focus();
      await page.keyboard.press("Home");
      if ((await first.getAttribute("aria-selected")) !== "true")
        throw new Error("Home did not restore first tab");
      await assertNoOverflow(page, "mobile gallery navigation");
    },
  );

  await step("manual keyboard scrubbing pauses tour playback", async () => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${base}/demo`, { waitUntil: "load" });
    await page.getByRole("button", { name: "Play tour", exact: true }).click();
    await page.getByRole("button", { name: "Pause", exact: true }).waitFor();
    const rail = page.getByRole("slider", { name: "Scrub product tour beats" });
    await rail.focus();
    await page.keyboard.press("End");
    await page.getByRole("button", { name: "Play tour", exact: true }).waitFor();
    if ((await rail.inputValue()) !== "7") throw new Error("End did not select beat eight");
    await page.emulateMedia({ reducedMotion: "reduce" });
  });

  await step(
    "tour beat/URL: explicit ?beat= wins, replaceState only, Show default clears beat",
    async () => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      const sliderName = "Scrub product tour beats";
      const rail = () => page.getByRole("slider", { name: sliderName });
      const expectRail = async (value, label) => {
        try {
          await page.waitForFunction(
            ([name, want]) =>
              document.querySelector(`input[aria-label="${name}"]`)?.value === want,
            [sliderName, String(value)],
            { timeout: 5000 },
          );
        } catch {
          throw new Error(`${label}: rail=${await rail().inputValue()}, expected ${value}`);
        }
      };
      // Read location from the page itself: page.url() can lag history.replaceState updates.
      const params = async () => new URL(await page.evaluate(() => location.href));

      // Explicit beat beats persona; other params and hash survive the restore.
      await page.goto(`${base}/demo?persona=ship-owners&beat=control&x=1#scrub-tour`, { waitUntil: "load" });
      await expectRail(1, "beat param over persona");
      // Persona applies only when there is no beat param, and is not written back as one.
      await page.goto(`${base}/demo?persona=ship-owners`, { waitUntil: "load" });
      await expectRail(4, "persona without beat param");
      if ((await params()).searchParams.has("beat")) throw new Error("initial load wrote a beat param");
      // An invalid beat is treated as absent.
      await page.goto(`${base}/demo?persona=ship-owners&beat=bogus`, { waitUntil: "load" });
      await expectRail(4, "invalid beat falls back to persona");

      // Scrubbing writes the beat back with replaceState (history length unchanged).
      await page.goto(`${base}/demo?x=1&beat=evidence#scrub-tour`, { waitUntil: "load" });
      await expectRail(2, "beat=evidence restore");
      const historyBefore = await page.evaluate(() => history.length);
      await page.locator(".scrub-beat").nth(5).click();
      await expectRail(5, "beat click");
      let u = (await params());
      if (u.searchParams.get("beat") !== "action" || u.searchParams.get("x") !== "1" || u.hash !== "#scrub-tour")
        throw new Error(`beat click URL ${u.search}${u.hash}`);
      await rail().focus();
      await page.keyboard.press("ArrowLeft");
      await expectRail(4, "ArrowLeft");
      if ((await params()).searchParams.get("beat") !== "risk") throw new Error(`ArrowLeft URL ${(await params()).search}`);
      if ((await page.evaluate(() => history.length)) !== historyBefore)
        throw new Error("scrubbing added history entries (pushState?)");
      await page.reload({ waitUntil: "load" });
      await expectRail(4, "reload restores scrubbed beat");

      // Choosing a persona moves the beat and mirrors it; Show default clears beat and persona.
      await page.getByRole("button", { name: "Maritime IT / OT", exact: true }).click();
      await expectRail(1, "persona click");
      u = (await params());
      if (u.searchParams.get("beat") !== "control" || u.searchParams.get("persona") !== "maritime-it-ot" || u.searchParams.get("x") !== "1" || u.hash !== "#scrub-tour")
        throw new Error(`persona click URL ${u.search}${u.hash}`);
      await page.getByRole("button", { name: "Show default", exact: true }).click();
      await expectRail(0, "Show default");
      u = (await params());
      if (u.searchParams.has("beat") || u.searchParams.has("persona") || u.searchParams.get("x") !== "1" || u.hash !== "#scrub-tour")
        throw new Error(`Show default URL ${u.search}${u.hash}`);
      if ((await page.evaluate(() => history.length)) !== historyBefore)
        throw new Error("persona/default added history entries");
    },
  );

  await context.close();
  await browser.close();
  server.close();

  if (failures.length) {
    console.log("\nProduct-experience QA failures:");
    for (const failure of failures) console.log(`- ${failure}`);
    process.exit(1);
  }
}

main().catch((error) => {
  server.close();
  console.error(error);
  process.exit(1);
});
