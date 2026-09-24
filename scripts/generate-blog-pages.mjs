import fs from "node:fs/promises";
import path from "node:path";
import BLOG_POSTS from "../src/data/blogPosts.json" with { type: "json" };

const SITE_URL = "https://placementdo.app";
const posts = BLOG_POSTS.filter((post) => post.status !== "draft");

const escapeHtml = (value = "") => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

const inlineMarkdown = (value = "") => escapeHtml(value)
  .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>')
  .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
  .replace(/__([^_]+)__/g, "<strong>$1</strong>")
  .replace(/\x60([^\x60]+)\x60/g, "<code>$1</code>");

const renderMarkdown = (markdown = "") => {
  const lines = String(markdown).replace(/\r\n/g, "\n").split("\n");
  const output = [];
  let paragraph = [];
  let listType = "";
  let listItems = [];
  let quote = [];
  let code = [];
  let inCode = false;
  const fence = String.fromCharCode(96, 96, 96);

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>");
      paragraph = [];
    }
  };
  const flushList = () => {
    if (!listItems.length) return;
    output.push("<" + listType + ">" + listItems.map((item) => "<li>" + inlineMarkdown(item) + "</li>").join("") + "</" + listType + ">");
    listItems = [];
    listType = "";
  };
  const flushQuote = () => {
    if (quote.length) {
      output.push("<blockquote>" + inlineMarkdown(quote.join(" ")) + "</blockquote>");
      quote = [];
    }
  };
  const flushCode = () => {
    if (code.length) {
      output.push("<pre><code>" + escapeHtml(code.join("\n")) + "</code></pre>");
      code = [];
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
    if (!inCode) flushCode();
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(fence)) {
      flushParagraph();
      flushList();
      flushQuote();
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!trimmed) {
      flushAll();
      continue;
    }
    const heading = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (heading) {
      flushAll();
      const level = trimmed.startsWith("###") ? 3 : 2;
      output.push("<h" + level + ">" + inlineMarkdown(heading[1]) + "</h" + level + ">");
      continue;
    }
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      flushQuote();
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(bullet[1]);
      continue;
    }
    const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      flushParagraph();
      flushQuote();
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(numbered[1]);
      continue;
    }
    const quoteLine = trimmed.match(/^>\s?(.*)$/);
    if (quoteLine) {
      flushParagraph();
      flushList();
      quote.push(quoteLine[1]);
      continue;
    }
    flushList();
    flushQuote();
    paragraph.push(trimmed);
  }

  flushAll();
  return output.join("\n");
};

const formatDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const articleDate = (post) => post.publishedAt || post.date || "";
const relatedPosts = (post) => {
  const sameCategory = posts.filter((item) => item.slug !== post.slug && item.category === post.category);
  const others = posts.filter((item) => item.slug !== post.slug && item.category !== post.category);
  return [...sameCategory, ...others].slice(0, 3);
};

const style = [
  ":root{--ink:#0f172a;--muted:#64748b;--teal:#0d9488;--teal-dark:#0f766e;--line:#dbe4ed;--paper:#f8fafc;--navy:#0b1224;}",
  "*{box-sizing:border-box}html{scroll-behavior:smooth}",
  "body{margin:0;background:var(--paper);color:#334155;font:16px/1.75 'DM Sans',system-ui,sans-serif}",
  "a{color:inherit}.site-header{background:#fff;border-bottom:1px solid var(--line)}",
  ".nav-shell{max-width:1180px;margin:0 auto;padding:18px 28px;display:flex;align-items:center;justify-content:space-between;gap:24px}",
  ".brand{display:inline-flex;align-items:center;gap:10px;color:var(--ink);font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:21px;font-weight:800;text-decoration:none;letter-spacing:-.04em}",
  ".brand-mark{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#16b3a5;color:#fff;font-size:20px;line-height:1}.brand-mark:before{content:'↯'}",
  ".nav-links{display:flex;align-items:center;justify-content:flex-end;gap:22px;flex-wrap:wrap}.nav-links a{color:#52627a;font-size:14px;font-weight:600;text-decoration:none}.nav-links a:hover{color:var(--teal-dark)}",
  ".nav-cta{border:1px solid #b8c7d8;border-radius:10px;padding:9px 15px!important;color:var(--ink)!important}",
  ".article-shell{max-width:900px;margin:0 auto;padding:54px 28px 90px}.back{display:inline-flex;gap:8px;color:var(--teal-dark);font-weight:700;text-decoration:none;font-size:14px}",
  ".article-header{max-width:820px;margin:42px auto 0}.eyebrow{color:var(--teal-dark);font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}",
  "h1,h2,h3{font-family:'Bricolage Grotesque',system-ui,sans-serif;color:var(--ink);letter-spacing:-.045em;line-height:1.1}",
  "h1{margin:14px 0 20px;font-size:clamp(40px,6vw,70px);font-weight:800}.deck{max-width:740px;margin:0;color:#52627a;font-size:20px;line-height:1.6}",
  ".meta{display:flex;flex-wrap:wrap;gap:12px 18px;margin-top:24px;color:var(--muted);font-size:14px}.meta span+span{padding-left:18px;border-left:1px solid var(--line)}",
  ".article-body{max-width:720px;margin:56px auto 0;color:#334155;font-size:18px;line-height:1.82}.article-body h2{margin:48px 0 14px;font-size:32px}.article-body h3{margin:34px 0 10px;font-size:23px}.article-body p{margin:0 0 22px}.article-body ul,.article-body ol{margin:0 0 24px;padding-left:28px}.article-body li{padding-left:6px;margin:6px 0}.article-body blockquote{margin:34px 0;padding:4px 0 4px 22px;border-left:3px solid #43cfc2;color:var(--ink);font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:25px;line-height:1.35}.article-body pre{overflow:auto;padding:18px;background:#0b1224;color:#dbeafe;border-radius:12px;font:14px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace}.article-body code{padding:2px 5px;background:#e2e8f0;border-radius:5px;font-size:.9em}.article-body a{color:var(--teal-dark);font-weight:700}",
  ".editorial-note{max-width:720px;margin:46px auto 0;padding:20px 22px;border:1px solid var(--line);border-radius:14px;background:#fff;color:var(--muted);font-size:14px}.editorial-note strong{display:block;margin-bottom:4px;color:var(--ink);font-family:'Bricolage Grotesque',system-ui,sans-serif;font-size:16px}",
  ".related{max-width:900px;margin:74px auto 0;padding-top:34px;border-top:1px solid var(--line)}.related h2{margin:0 0 18px;font-size:30px}.related-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.related-card{display:block;padding:20px;background:#fff;border:1px solid var(--line);border-radius:14px;text-decoration:none}.related-card:hover{border-color:#7bcfc6}.related-card small{color:var(--teal-dark);font-weight:700;letter-spacing:.08em;text-transform:uppercase}.related-card h3{margin:10px 0 0;font-size:20px}.site-footer{background:#fff;border-top:1px solid var(--line);color:var(--muted)}.footer-shell{max-width:1180px;margin:0 auto;padding:30px 28px;display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;font-size:13px}.footer-shell p{margin:0}.footer-links{display:flex;gap:16px;flex-wrap:wrap}.footer-links a{color:var(--teal-dark);font-weight:600;text-decoration:none}",
  "@media (max-width:700px){.nav-shell{padding:14px 18px;align-items:flex-start}.nav-links{gap:12px}.nav-links a:nth-child(2){display:none}.article-shell{padding:36px 18px 70px}.article-header{margin-top:32px}h1{font-size:45px}.deck{font-size:18px}.article-body{margin-top:42px;font-size:17px}.related-grid{grid-template-columns:1fr}.footer-shell{padding:24px 18px}}"
].join("");

const buildPage = (post) => {
  const date = articleDate(post);
  const canonical = SITE_URL + "/blog/" + encodeURIComponent(post.slug);
  const bodySource = String(post.content || "")
    .replace(/^#\s+[^\n]+\n*/, "")
    .replace(/\n#\s+[-\w]+(?:\s+#[\w-]+)*\s*$/i, "");
  const body = renderMarkdown(bodySource);
  const related = relatedPosts(post).map((item) => [
    '<a class="related-card" href="/blog/' + encodeURIComponent(item.slug) + '">',
    "<small>" + escapeHtml(item.category || "Interview preparation") + "</small>",
    "<h3>" + escapeHtml(item.title) + "</h3>",
    "</a>",
  ].join("")).join("\n");
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: "PlacementDo" },
    publisher: { "@type": "Organization", name: "PlacementDo", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    datePublished: date,
    dateModified: post.updatedAt || date,
    articleSection: post.category || "Placement preparation",
    keywords: Array.isArray(post.tags) ? post.tags.join(", ") : "",
  }).replace(/</g, "\\u003c");
  const breadcrumbLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: SITE_URL + "/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  }).replace(/</g, "\\u003c");

  return [
    "<!doctype html>",
    '<html lang="en"><head><meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    "<title>" + escapeHtml(post.title) + " | PlacementDo</title>",
    '<meta name="description" content="' + escapeHtml(post.excerpt || "Practical interview preparation guidance from PlacementDo.") + '">',
    '<meta name="author" content="PlacementDo">',
    '<meta name="robots" content="index, follow">',
    '<link rel="canonical" href="' + canonical + '">',
    '<link rel="alternate" hreflang="en" href="' + canonical + '"><link rel="alternate" hreflang="x-default" href="' + canonical + '">',
    '<link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png">',
    '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap">',
    '<meta property="og:type" content="article"><meta property="og:site_name" content="PlacementDo">',
    '<meta property="og:title" content="' + escapeHtml(post.title) + ' | PlacementDo"><meta property="og:description" content="' + escapeHtml(post.excerpt || "") + '"><meta property="og:url" content="' + canonical + '">',
    '<script type="application/ld+json">' + jsonLd + "</script><script type=\"application/ld+json\">" + breadcrumbLd + "</script>",
    "<style>" + style + "</style></head><body>",
    '<header class="site-header"><nav class="nav-shell" aria-label="Primary navigation">',
    '<a class="brand" href="/" aria-label="PlacementDo home"><span class="brand-mark" aria-hidden="true"></span><span>Placement<span style="color:#0d9488">Do</span></span></a>',
    '<div class="nav-links"><a href="/">← Home</a><a href="/blog">Blog</a><a href="/placement-preparation-complete-guide">Placement Prep</a><a class="nav-cta" href="/about">About us</a></div>',
    "</nav></header>",
    '<main class="article-shell"><a class="back" href="/blog">← Back to all guides</a>',
    '<article><header class="article-header"><div class="eyebrow">' + escapeHtml(post.category || "Interview preparation") + "</div>",
    "<h1>" + escapeHtml(post.title) + "</h1><p class=\"deck\">" + escapeHtml(post.excerpt || "") + "</p>",
    '<div class="meta"><span>PlacementDo Editorial</span><span><time datetime="' + escapeHtml(date) + '">' + escapeHtml(formatDate(date)) + "</time></span><span>" + Math.max(1, Math.ceil(String(post.content || "").split(/\s+/).filter(Boolean).length / 220)) + " min read</span></div></header>",
    '<div class="article-body">' + body + "</div>",
    '<aside class="editorial-note"><strong>Editorial note</strong>This guide is educational and written for interview practice. Company processes change, so verify current requirements with the employer or your campus placement team before applying.</aside>',
    "</article>",
    '<section class="related" aria-labelledby="related-heading"><h2 id="related-heading">Continue preparing</h2><div class="related-grid">' + related + "</div></section>",
    "</main>",
    '<footer class="site-footer"><div class="footer-shell"><p>© 2026 PlacementDo · Educational preparation resources; no job outcome is guaranteed.</p><nav class="footer-links" aria-label="Footer navigation"><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a><a href="/disclaimer">Disclaimer</a><a href="/contact">Contact</a></nav></div></footer>',
    "</body></html>",
  ].join("\n");
};

const outputRoot = path.join(process.cwd(), "dist", "blog");
await fs.mkdir(outputRoot, { recursive: true });
for (const post of posts) {
  const folder = path.join(outputRoot, post.slug);
  await fs.mkdir(folder, { recursive: true });
  await fs.writeFile(path.join(folder, "index.html"), buildPage(post), "utf8");
}
console.log("Generated " + posts.length + " crawlable static blog article pages.");
