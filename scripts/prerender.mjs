import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { render } from "../dist-ssr/entry-server.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const publicDir = path.join(root, "public");
const template = await fs.readFile(path.join(distDir, "index.html"), "utf8");
const today = new Date().toISOString().slice(0, 10);

const staticPaths = [
  "/", "/he", "/privacy", "/terms", "/cookies", "/referral", "/blog",
  "/resources", "/he/resources", "/get-resources", "/he/get-resources",
  "/saas-metric-auditor", "/he/saas-metric-auditor",
  "/deck-architect", "/he/deck-architect",
  "/financial-model", "/he/financial-model",
  "/investor-ready", "/he/investor-ready",
  "/paid-consultation", "/he/paid-consultation",
  "/market-size", "/he/market-size",
  "/pitch-review", "/he/pitch-review",
  "/startup-deals", "/he/startup-deals",
];

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

const postSlugs = JSON.parse(await fs.readFile(path.join(publicDir, "posts", "index.json"), "utf8"));
const publishedPosts = [];
for (const slug of postSlugs) {
  const markdown = await fs.readFile(path.join(publicDir, "posts", `${slug}.md`), "utf8");
  const date = markdown.match(/^date:\s*["']?([^"'\r\n]+)/m)?.[1]?.trim();
  if (!date || date <= today) publishedPosts.push(slug);
}

const paths = [
  ...staticPaths,
  ...resourceSlugs.flatMap((slug) => [`/resources/${slug}`, `/he/resources/${slug}`]),
  ...publishedPosts.map((slug) => `/blog/${slug}`),
];

function stripTemplateSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta name="description"[^>]*>/gi, "")
    .replace(/<link rel="canonical"[^>]*>/gi, "")
    .replace(/<meta property="og:[^>]*>/gi, "")
    .replace(/<meta name="twitter:[^>]*>/gi, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
}

const baseTemplate = stripTemplateSeo(template);
for (const routePath of paths) {
  const { appHtml, headHtml, htmlAttributes } = await render(routePath);
  if (!appHtml || appHtml.length < 100) {
    throw new Error(`Prerendered HTML is empty for ${routePath}`);
  }

  const html = baseTemplate
    .replace(/<html[^>]*>/i, `<html ${htmlAttributes}>`)
    .replace(/\s*<div id="seo-fallback"[\s\S]*?<\/div>\s*<div id="root">/i, '<div id="root">')
    .replace("</head>", `${headHtml}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  const outputPath = routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath.slice(1), "index.html");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html);

  // Emit a flat HTML counterpart for clean-URL hosts and local production
  // previews. This guarantees that `/he/...` resolves to prerendered Hebrew
  // HTML instead of falling back to the English SPA shell.
  if (routePath !== "/") {
    const cleanUrlPath = path.join(distDir, `${routePath.slice(1)}.html`);
    await fs.mkdir(path.dirname(cleanUrlPath), { recursive: true });
    await fs.writeFile(cleanUrlPath, html);
  }
}

const notFound = await render("/404-test");
const notFoundHtml = baseTemplate
  .replace(/<html[^>]*>/i, '<html lang="en" dir="ltr">')
  .replace(/\s*<div id="seo-fallback"[\s\S]*?<\/div>\s*<div id="root">/i, '<div id="root">')
  .replace("</head>", '<title>Page Not Found | Foundterra</title><meta name="robots" content="noindex, nofollow">\n</head>')
  .replace('<div id="root"></div>', `<div id="root">${notFound.appHtml}</div>`);
await fs.writeFile(path.join(distDir, "404.html"), notFoundHtml);

console.log(`[prerender] Generated ${paths.length} routes and 404.html`);
