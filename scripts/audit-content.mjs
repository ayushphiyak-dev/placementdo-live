import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const posts = JSON.parse(read("src/data/blogPosts.json"));
const sitemap = read("public/sitemap.xml");
const blogIndex = read("public/blog/index.html");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const errors = [];
const MIN_EDITORIAL_WORDS = 600;

const wordCount = (value) => value.trim().split(/\s+/).filter(Boolean).length;
const normalizeParagraph = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9 ]/g, "")
  .replace(/\s+/g, " ")
  .trim();

if (posts.length < 1) errors.push("No editorial blog posts found.");
const slugs = new Set();
const titles = new Set();
const paragraphs = new Map();
for (const post of posts) {
  if (!post.slug || slugs.has(post.slug)) errors.push(`Duplicate or missing post slug: ${post.slug || "(empty)"}`);
  if (!post.title || titles.has(post.title)) errors.push(`Duplicate or missing post title: ${post.title || "(empty)"}`);
  slugs.add(post.slug);
  titles.add(post.title);
  const words = wordCount(post.content || "");
  if (words < MIN_EDITORIAL_WORDS) {
    errors.push(`${post.slug} has only ${words} words; every published article must contain at least ${MIN_EDITORIAL_WORDS} words of useful, original guidance.`);
  }
  for (const paragraph of (post.content || "").split(/\n\s*\n/)) {
    const normalized = normalizeParagraph(paragraph);
    if (normalized.length < 160) continue;
    if (!paragraphs.has(normalized)) paragraphs.set(normalized, []);
    paragraphs.get(normalized).push(post.slug);
  }
}
for (const [paragraph, owners] of paragraphs) {
  if (new Set(owners).size > 1) {
    errors.push(`Repeated editorial paragraph appears in ${[...new Set(owners)].join(", ")}: ${paragraph.slice(0, 90)}…`);
  }
}

const expectedRoutes = new Set([
  "/", "/placement-preparation-complete-guide", "/placement-preparation",
  "/aptitude-questions", "/coding-interview-questions", "/seo-resources",
  "/demo", "/sitemap", "/blog", "/about", "/contact", "/privacy-policy",
  "/terms-of-service", "/disclaimer",
  "/company-wise-questions/tcs", "/company-wise-questions/wipro",
  "/company-wise-questions/infosys", "/company-wise-questions/accenture",
  "/company-wise-questions/cognizant", "/company-wise-questions/hcl",
  ...posts.map((post) => `/blog/${post.slug}`),
]);
const blogIndexSlugs = [...blogIndex.matchAll(/href="\/blog\/([^"]+)"/g)].map((match) => match[1]);
for (const slug of blogIndexSlugs) {
  if (!slugs.has(slug)) errors.push(`Blog index links to missing post slug: ${slug}`);
}

const sitemapPaths = urls.map((url) => new URL(url).pathname.replace(/\/$/, "") || "/");
if (new Set(urls).size !== urls.length) errors.push("Sitemap contains duplicate URLs.");
for (const route of sitemapPaths) {
  if (!expectedRoutes.has(route)) errors.push(`Sitemap advertises a route that is not in the public editorial route map: ${route}`);
}
for (const route of expectedRoutes) {
  if (route !== "/" && !sitemapPaths.includes(route)) errors.push(`Public editorial route is missing from sitemap: ${route}`);
}

const index = read("index.html");
if ((index.match(/<h1\b/gi) || []).length !== 1) errors.push("index.html must contain exactly one crawl-visible H1.");
if (!/rel="canonical"/.test(index)) errors.push("index.html is missing its canonical link.");
if (!/href="\/privacy-policy"/.test(index)) errors.push("index.html must link to the Privacy Policy.");
const vercel = JSON.parse(read("vercel.json"));
if (!vercel.redirects?.some((rule) => rule.source === "/resources" && rule.destination === "/seo-resources")) {
  errors.push("/resources must permanently redirect to the canonical /seo-resources route.");
}
if (!vercel.headers?.some((rule) => /features\|pricing/.test(rule.source || ""))) {
  errors.push("Product-shell routes must be marked noindex until they have unique public content.");
}

console.log(`Audited ${posts.length} blog posts and ${urls.length} sitemap URLs.`);
if (errors.length) {
  console.error(`Content audit failed (${errors.length}):\n- ${errors.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log("Content audit passed: unique editorial blocks, crawlable route inventory, and trust links are present.");
}

