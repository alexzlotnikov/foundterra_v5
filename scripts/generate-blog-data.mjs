import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const postsDir = path.join(root, "public", "posts");
const outputDir = path.join(root, "src", "generated");
const today = new Date().toISOString().slice(0, 10);
const slugs = JSON.parse(await fs.readFile(path.join(postsDir, "index.json"), "utf8"));

const readField = (frontmatter, field) => {
  const value = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "";
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
};

const posts = [];
for (const requestedSlug of slugs) {
  const markdown = await fs.readFile(path.join(postsDir, `${requestedSlug}.md`), "utf8");
  const match = markdown.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) continue;
  const [, frontmatter, content] = match;
  const date = readField(frontmatter, "date");
  if (date && date > today) continue;
  posts.push({
    title: readField(frontmatter, "title"),
    date,
    excerpt: readField(frontmatter, "excerpt"),
    slug: readField(frontmatter, "slug") || requestedSlug,
    coverImage: readField(frontmatter, "coverImage") || undefined,
    coverImageAlt: readField(frontmatter, "coverImageAlt") || undefined,
    language: readField(frontmatter, "language") === "he" ? "he" : "en",
    author: readField(frontmatter, "author") || "Foundterra",
    content: content.trim(),
  });
}

posts.sort((a, b) => b.date.localeCompare(a.date));
await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(path.join(outputDir, "blog-posts.json"), `${JSON.stringify(posts)}\n`);
console.log(`[generate-blog-data] Wrote ${posts.length} published posts`);
