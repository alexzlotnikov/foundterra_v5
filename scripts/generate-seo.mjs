import fs from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve("public");
const siteUrl = "https://www.foundterra.com";
const today = new Date().toISOString().slice(0, 10);

const localizedPaths = [
  "/",
  "/resources",
  "/get-resources",
  "/saas-metric-auditor",
  "/deck-architect",
  "/financial-model",
  "/investor-ready",
  "/paid-consultation",
  "/market-size",
  "/pitch-review",
  "/startup-deals",
];

const englishOnlyPaths = ["/blog", "/privacy", "/terms", "/cookies", "/referral"];
const resourceSlugs = [
  "pre-seed-checklist",
  "vc-list",
  "how-to-cold-reach-investors",
  "viral-startup-launch-checklist",
  "early-traction-metrics",
  "customer-interview-script-framework",
  "how-to-estimate-market-size",
  "startup-competitive-analysis",
  "how-to-calculate-cash-runway",
  "feature-prioritization-framework",
  "startup-data-room",
  "investors-update-system",
];

const entries = [];
for (const routePath of localizedPaths) {
  const enPath = routePath;
  const hePath = routePath === "/" ? "/he" : `/he${routePath}`;
  entries.push({ path: enPath, lastmod: today, enPath, hePath });
  entries.push({ path: hePath, lastmod: today, enPath, hePath });
}
for (const routePath of englishOnlyPaths) entries.push({ path: routePath, lastmod: today });
for (const slug of resourceSlugs) {
  const enPath = `/resources/${slug}`;
  const hePath = `/he/resources/${slug}`;
  entries.push({ path: enPath, lastmod: today, enPath, hePath });
  entries.push({ path: hePath, lastmod: today, enPath, hePath });
}

const postSlugs = JSON.parse(await fs.readFile(path.join(publicDir, "posts", "index.json"), "utf8"));
for (const slug of postSlugs) {
  const markdown = await fs.readFile(path.join(publicDir, "posts", `${slug}.md`), "utf8");
  const date = markdown.match(/^date:\s*["']?([^"'\r\n]+)/m)?.[1]?.trim();
  if (date && date > today) continue;
  entries.push({ path: `/blog/${slug}`, lastmod: date || today });
}

const xmlEntries = entries.map(({ path: routePath, lastmod, enPath, hePath }) => {
  const alternates = enPath && hePath
    ? [
        `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${enPath}"/>`,
        `<xhtml:link rel="alternate" hreflang="he" href="${siteUrl}${hePath}"/>`,
        `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${enPath}"/>`,
      ].join("")
    : "";
  return `<url><loc>${siteUrl}${routePath}</loc><lastmod>${lastmod}</lastmod>${alternates}</url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${xmlEntries}\n</urlset>\n`;
await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemap);
console.log(`[generate-seo] Wrote ${entries.length} sitemap URLs`);

