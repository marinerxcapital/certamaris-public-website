#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";

const result = spawnSync(
  process.execPath,
  ["--experimental-strip-types", "--test", path.join("lib", "pricing-calculator.test.ts")],
  {
    cwd: process.cwd(),
    stdio: "inherit",
  }
);

process.exit(result.status ?? 1);
