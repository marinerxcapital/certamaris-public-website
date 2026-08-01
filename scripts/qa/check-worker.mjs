#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const result = spawnSync(
  process.execPath,
  ["--experimental-strip-types", "--test", "lib/contact-request.test.ts", "worker/index.test.ts"],
  { cwd: new URL("../..", import.meta.url), stdio: "inherit" },
);

process.exit(result.status ?? 1);
