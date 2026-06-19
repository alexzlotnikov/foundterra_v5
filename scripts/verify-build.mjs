import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const dist = path.resolve("dist");
const assets = fs.readdirSync(path.join(dist, "assets"));
const entry = assets.find((name) => /^index-[\w-]+\.js$/.test(name));
if (!entry) throw new Error("Unable to find the main JavaScript entry chunk");

const entryBytes = fs.readFileSync(path.join(dist, "assets", entry));
const gzipBytes = zlib.gzipSync(entryBytes).length;
const maxGzipBytes = 180 * 1024;
if (gzipBytes > maxGzipBytes) {
  throw new Error(`Main bundle is ${(gzipBytes / 1024).toFixed(1)} KiB gzip; budget is 180 KiB`);
}

const required = [
  "index.html",
  "404.html",
  path.join("he", "index.html"),
  path.join("blog", "index.html"),
  path.join("resources", "index.html"),
  "sitemap.xml",
  "robots.txt",
  "llms.txt",
];
for (const file of required) {
  if (!fs.existsSync(path.join(dist, file))) throw new Error(`Missing build artifact: ${file}`);
}

const htmlChecks = [
  "index.html",
  path.join("he", "index.html"),
  path.join("blog", "index.html"),
  path.join("resources", "index.html"),
];
for (const file of htmlChecks) {
  const html = fs.readFileSync(path.join(dist, file), "utf8");
  const count = (pattern) => (html.match(pattern) ?? []).length;
  if (count(/<title(?:\s|>)/gi) !== 1) throw new Error(`${file} must contain exactly one title`);
  if (count(/<meta[^>]+name="description"/gi) !== 1) throw new Error(`${file} must contain exactly one description`);
  if (count(/<link[^>]+rel="canonical"/gi) !== 1) throw new Error(`${file} must contain exactly one canonical`);
  if (count(/<h1(?:\s|>)/gi) !== 1) throw new Error(`${file} must contain exactly one H1`);
}

const russianMatches = [];
const scan = (directory) => {
  for (const entryName of fs.readdirSync(directory)) {
    const fullPath = path.join(directory, entryName);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) scan(fullPath);
    else if (/\.(html|js|json|xml|txt)$/.test(entryName)) {
      const text = fs.readFileSync(fullPath, "utf8");
      if (/russian|Русский|\/ru(?:\/|["'<])/i.test(text)) russianMatches.push(fullPath);
    }
  }
};
scan(dist);
if (russianMatches.length) throw new Error(`Russian output remains in: ${russianMatches.join(", ")}`);

console.log(`[verify-build] Main bundle ${(gzipBytes / 1024).toFixed(1)} KiB gzip; required artifacts present`);
