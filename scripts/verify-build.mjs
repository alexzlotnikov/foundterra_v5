import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const dist = path.resolve("dist");
const rootHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const entryMatch = rootHtml.match(/<script[^>]+type="module"[^>]+src="\/assets\/([^"]+\.js)"/i)
  ?? rootHtml.match(/<script[^>]+src="\/assets\/([^"]+\.js)"[^>]+type="module"/i);
if (!entryMatch) throw new Error("Unable to find the main JavaScript entry chunk in index.html");
const entry = entryMatch[1];

const entryBytes = fs.readFileSync(path.join(dist, "assets", entry));
const gzipBytes = zlib.gzipSync(entryBytes).length;
const maxGzipBytes = 120 * 1024;
if (gzipBytes > maxGzipBytes) {
  throw new Error(`Main bundle is ${(gzipBytes / 1024).toFixed(1)} KiB gzip; budget is 120 KiB`);
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

const decodeEntities = (text) => text
  .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
  .replace(/&#(\d+);/g, (_, decimal) => String.fromCodePoint(Number.parseInt(decimal, 10)))
  .replace(/&(?:nbsp|amp|quot|apos|lt|gt);/g, " ");

const hebrewFiles = [];
const collectHebrewHtml = (directory) => {
  for (const entryName of fs.readdirSync(directory)) {
    const fullPath = path.join(directory, entryName);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) collectHebrewHtml(fullPath);
    else if (entryName === "index.html") hebrewFiles.push(fullPath);
  }
};
collectHebrewHtml(path.join(dist, "he"));

for (const fullPath of hebrewFiles) {
  const file = path.relative(dist, fullPath);
  const html = fs.readFileSync(fullPath, "utf8");
  if (!/<html[^>]+lang="he"[^>]+dir="rtl"/i.test(html)) {
    throw new Error(`${file} must render as Hebrew RTL HTML`);
  }
  if (!/<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.foundterra\.com\/he(?:\/|")/i.test(html)) {
    throw new Error(`${file} must use a Hebrew canonical URL`);
  }
  if (!/hreflang="en"/i.test(html) || !/hreflang="he"/i.test(html) || !/hreflang="x-default"/i.test(html)) {
    throw new Error(`${file} must contain English, Hebrew, and x-default alternates`);
  }

  const visibleText = decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  );
  const hebrewCharacters = (visibleText.match(/[\u0590-\u05ff]/g) ?? []).length;
  const latinCharacters = (visibleText.match(/[a-z]/gi) ?? []).length;
  if (hebrewCharacters < 120 || hebrewCharacters < latinCharacters * 0.4) {
    throw new Error(
      `${file} contains too little Hebrew indexable content (${hebrewCharacters} Hebrew vs ${latinCharacters} Latin characters)`,
    );
  }
}

for (const fullPath of hebrewFiles) {
  const routeRelative = path.relative(path.join(dist, "he"), path.dirname(fullPath));
  const flatFile = routeRelative
    ? path.join(dist, "he", `${routeRelative}.html`)
    : path.join(dist, "he.html");
  if (!fs.existsSync(flatFile)) {
    throw new Error(`Missing clean-URL Hebrew artifact: ${path.relative(dist, flatFile)}`);
  }
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

console.log(
  `[verify-build] Main bundle ${(gzipBytes / 1024).toFixed(1)} KiB gzip; ${hebrewFiles.length} Hebrew pages validated`,
);
