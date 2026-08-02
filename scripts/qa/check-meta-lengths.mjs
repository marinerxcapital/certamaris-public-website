// Verify every built page's <title> ≤ 60 chars and meta description ≤ 160 chars.
import fs from "node:fs";
import path from "node:path";

const root = "out";
function walk(dir) {
  let files = [];
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (fs.statSync(p).isDirectory()) files = files.concat(walk(p));
    else if (entry.endsWith(".html")) files.push(p);
  }
  return files;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

let badDesc = 0;
let badTitle = 0;
const files = walk(root);
for (const f of files) {
  const html = fs.readFileSync(f, "utf8");
  const route = f.replace(/\\/g, "/").replace(/^out/, "").replace(/\.html$/, "") || "/";
  const dm = html.match(/<meta name="description" content="([^"]*)"/);
  const tm = html.match(/<title>([^<]*)<\/title>/);
  if (dm && decode(dm[1]).length > 160) {
    badDesc++;
    console.log(`DESC ${decode(dm[1]).length}  ${route}`);
  }
  if (tm && decode(tm[1]).length > 60) {
    badTitle++;
    console.log(`TITLE ${decode(tm[1]).length}  ${route}`);
  }
}
console.log(`\nChecked ${files.length} pages — descriptions >160: ${badDesc}, titles >60: ${badTitle}`);
process.exit(badDesc + badTitle > 0 ? 1 : 0);
