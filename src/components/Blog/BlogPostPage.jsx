/**
 * BlogPostPage — public read-only individual blog post view.
 *
 * Fetches the post matching `slug` from /api/blog?slug=<slug>.
 */
import { useMemo, useReducer, useEffect } from "react";
import { Calendar, User, ArrowLeft, BookOpen, Tag as TagIcon, Linkedin, Twitter } from "lucide-react";
import { upsertMeta, upsertLink, upsertJsonLd } from "../SEO/shared/metaUtils.js";
import SEED_POSTS from "../../data/blogPosts.json";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const estimateReadingMinutes = (content = "") => {
  const words = String(content || "").trim().split(/\s+/).filter(Boolean).length;
  if (words <= 0) return "2 min read";
  return `${Math.max(1, Math.round(words / 220))} min read`;
};

/**
 * Converts plain-text / light-Markdown content into renderable blocks.
 * Supports: # headings (up to ###), ``` code blocks, - bullet lists, paragraphs.
 */
const parseContent = (content = "") => {
  const lines = String(content).replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let listItems = [];
  let codeLines = [];
  let inCode = false;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "list", items: [...listItems] });
    listItems = [];
  };
  const flushCode = () => {
    if (!codeLines.length) return;
    blocks.push({ type: "code", text: codeLines.join("\n") });
    codeLines = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      codeLines.push(rawLine);
      return;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (/^#{1,3}\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      const level = trimmed.match(/^#+/)?.[0]?.length || 1;
      blocks.push({
        type: "heading",
        level,
        text: trimmed.replace(/^#{1,3}\s+/, ""),
      });
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      listItems.push(trimmed.replace(/^[-*]\s+/, ""));
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushCode();
  return blocks;
};

const STYLES = `
  .bpp-page {
    min-height: 100vh;
    background: var(--white);
    padding: 104px clamp(20px,5vw,60px) 80px;
  }
  .blog-logo { display: inline-flex; align-items: center; gap: 10px; background: none; border: none; padding: 0; cursor: pointer; text-decoration: none; color: inherit; }
  .blog-logo-mark { height: 32px; width: 32px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); display: block; }
  .blog-logo-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .bpp-inner {
    max-width: 760px;
    margin: 0 auto;
  }
  .bpp-meta-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    align-items: center;
    font-size: 13px;
    color: var(--slate-500);
    margin-bottom: 20px;
  }
  .bpp-meta-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .bpp-category {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: var(--teal-light);
    color: var(--teal-dark);
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 0.02em;
  }
  .bpp-title {
    font-size: clamp(28px, 5vw, 44px);
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin: 0 0 20px;
  }
  .bpp-divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 28px 0;
  }
  .bpp-content {
    display: grid;
    gap: 18px;
  }
  .bpp-p {
    margin: 0;
    color: var(--slate-600);
    line-height: 1.9;
    font-size: 16px;
  }
  .bpp-h2 {
    font-size: 28px;
    letter-spacing: -0.02em;
    margin: 8px 0 0;
  }
  .bpp-h3 {
    font-size: 22px;
    letter-spacing: -0.015em;
    margin: 6px 0 0;
  }
  .bpp-h4 {
    font-size: 18px;
    letter-spacing: -0.01em;
    margin: 4px 0 0;
  }
  .bpp-pre {
    margin: 0;
    padding: 16px;
    border-radius: 12px;
    background: var(--slate);
    color: var(--slate-100);
    overflow-x: auto;
    font-size: 13.5px;
    line-height: 1.7;
  }
  .bpp-ul {
    margin: 0;
    padding-left: 22px;
    color: var(--slate-600);
    line-height: 1.85;
  }
  .bpp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 8px;
  }
  .bpp-tag-pill {
    font-size: 12px;
    padding: 4px 11px;
    border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--slate-500);
    background: var(--slate-50);
  }
  .bpp-cover {
    width: 100%;
    max-height: 420px;
    object-fit: cover;
    border-radius: 12px;
    display: block;
    margin-bottom: 28px;
  }
  .bpp-not-found {
    text-align: center;
    padding: 80px 24px;
    color: var(--slate-400);
  }
  /* Share Section */
  .bpp-share { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin: 32px 0 0; }
  .bpp-share-label { font-size: 13px; font-weight: 600; color: var(--slate-500); margin-right: 4px; }
  .bpp-share-btn {
    display: inline-flex; align-items: center; gap: 7px; padding: 8px 16px;
    border-radius: 999px; font-size: 13px; font-weight: 600; cursor: pointer;
    transition: all .18s; border: 1.5px solid; font-family: 'DM Sans', sans-serif;
  }
  .bpp-share-btn.linkedin { background: #EFF8FF; color: #0A66C2; border-color: rgba(10,102,194,.25); }
  .bpp-share-btn.linkedin:hover { background: #0A66C2; color: #fff; border-color: #0A66C2; transform: translateY(-1px); }
  .bpp-share-btn.twitter { background: #F0F9FF; color: #1D9BF0; border-color: rgba(29,155,240,.25); }
  .bpp-share-btn.twitter:hover { background: #1D9BF0; color: #fff; border-color: #1D9BF0; transform: translateY(-1px); }
  .bpp-share-btn.reddit { background: #FFF4F0; color: #FF4500; border-color: rgba(255,69,0,.25); }
  .bpp-share-btn.reddit:hover { background: #FF4500; color: #fff; border-color: #FF4500; transform: translateY(-1px); }
  /* CTA Block */
  .bpp-cta { background: linear-gradient(135deg, var(--teal) 0%, var(--teal-dark) 100%); border-radius: 20px; padding: clamp(32px,5vw,48px) clamp(24px,4vw,40px); text-align: center; margin: 48px 0 0; }
  .bpp-cta h2 { font-size: clamp(22px,4vw,32px); font-weight: 800; color: #fff; letter-spacing: -0.025em; margin: 0 0 10px; }
  .bpp-cta p { font-size: 15px; color: rgba(255,255,255,.8); line-height: 1.65; margin: 0 0 24px; }
  .bpp-cta-btn { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: var(--teal-dark); border: none; cursor: pointer; font-size: 15px; font-weight: 700; padding: 13px 28px; border-radius: 999px; transition: transform .15s, box-shadow .15s; font-family: 'DM Sans', sans-serif; }
  .bpp-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.18); }
  /* Continue Reading */
  .bpp-continue { margin: 40px 0 0; }
  .bpp-continue-title { font-size: 18px; font-weight: 700; color: var(--slate); margin: 0 0 16px; letter-spacing: -0.02em; }
  .bpp-continue-links { display: flex; flex-wrap: wrap; gap: 10px; }
  .bpp-continue-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border: 1px solid var(--border); border-radius: 999px; font-size: 13px; font-weight: 600; color: var(--teal-dark); background: var(--teal-light); cursor: pointer; transition: all .18s; font-family: 'DM Sans', sans-serif; text-decoration: none; }
  .bpp-continue-btn:hover { background: var(--teal); color: #fff; border-color: var(--teal); }
  /* Responsive */
  @media (max-width: 680px) {
    .bpp-page { padding: 88px 20px 60px; }
    .bpp-h2 { font-size: 22px; }
    .bpp-h3 { font-size: 18px; }
    .bpp-h4 { font-size: 16px; }
    .bpp-p { font-size: 15px; }
    .bpp-pre { font-size: 12.5px; padding: 12px; }
    .bpp-cta { border-radius: 16px; }
  }
`;

const getInitialState = () => ({ post: null, allPosts: [], loading: true, notFound: false });

function fetchReducer(state, action) {
  switch (action.type) {
    case "reset":
      return getInitialState();
    case "loaded":
      return { post: action.post, allPosts: action.allPosts, loading: false, notFound: false };
    case "error":
      return { ...state, loading: false, notFound: true };
    default:
      return state;
  }
}

export default function BlogPostPage({ slug, onNav }) {
  const navigate = (path) => {
    if (onNav) {
      onNav(path);
    } else {
      window.location.href = path;
    }
  };

  const [{ post, allPosts, loading, notFound }, dispatch] = useReducer(
    fetchReducer,
    undefined,
    getInitialState
  );

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: "reset", slug });

    // Local fetch fallback for static deployments
    const loadLocal = () => {
      if (cancelled) return;
      const foundPost = SEED_POSTS.find((p) => p.slug === slug);
      if (foundPost) {
        const normalizedList = SEED_POSTS.map((p) => ({ ...p, date: p.date || p.publishedAt || "", id: p.id || p.slug, coverImage: p.coverImage || "" }));
        const normalizedPost = { ...foundPost, date: foundPost.date || foundPost.publishedAt || "", id: foundPost.id || foundPost.slug, coverImage: foundPost.coverImage || "" };
        dispatch({ type: "loaded", post: normalizedPost, allPosts: normalizedList });
      } else {
        dispatch({ type: "error" });
      }
    };

    // Attempt API fetch first for dynamic deployments
    const promises = [
      fetch(`/api/blog?slug=${encodeURIComponent(slug)}`).then((r) => { if (!r.ok) throw new Error("API failed"); return r.json(); }),
      fetch("/api/blog").then((r) => { if (!r.ok) throw new Error("API failed"); return r.json(); }),
    ];

    Promise.all(promises)
      .then(([postData, listData]) => {
        if (cancelled) return;
        const list = Array.isArray(listData?.posts)
          ? listData.posts.map((p) => ({ ...p, date: p.date || p.publishedAt || "", id: p.id || p.slug, coverImage: p.coverImage || "" }))
          : [];
        if (postData?.post) {
          const p = postData.post;
          const normalizedPost = { ...p, date: p.date || p.publishedAt || "", id: p.id || p.slug, coverImage: p.coverImage || "" };
          dispatch({ type: "loaded", post: normalizedPost, allPosts: list });
        } else {
          loadLocal();
        }
      })
      .catch(() => {
        if (!cancelled) loadLocal();
      });

    return () => { cancelled = true; };
  }, [slug]);

  const blocks = useMemo(() => (post ? parseContent(post.content) : []), [post]);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}/blog/${encodeURIComponent(slug)}`;
    const fallbackCanonicalUrl = `${window.location.origin}/blog`;
    const articleImage = post?.coverImage || post?.featured_image || `${window.location.origin}/opengraph-image.png`;
    if (post) {
      upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
      upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
      const description = post.excerpt || "Read detailed interview guidance and product updates from the PlacementDo blog.";
      const keywordText = Array.isArray(post.tags) && post.tags.length
        ? `${post.tags.join(", ")}, placement preparation, interview preparation, PlacementDo`
        : "placement preparation, interview preparation, campus placements, PlacementDo blog";
      const readingTime = estimateReadingMinutes(post.content);
      document.title = `${post.title} | PlacementDo`;
      upsertMeta('meta[name="description"]', { name: "description", content: description });
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywordText });
      upsertMeta('meta[property="og:type"]', { property: "og:type", content: "article" });
      upsertMeta('meta[property="og:title"]', { property: "og:title", content: `${post.title} | PlacementDo` });
      upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
      upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
      upsertMeta('meta[property="og:image"]', { property: "og:image", content: articleImage });
      upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
      upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: `${post.title} | PlacementDo` });
      upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
      upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: canonicalUrl });
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: articleImage });
      // Article JSON-LD
      upsertJsonLd("blog-article", {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": description,
        "author": { "@type": "Organization", "name": "PlacementDo" },
        "publisher": { "@type": "Organization", "name": "PlacementDo", "url": "https://placementdo.app" },
        "url": canonicalUrl,
        "image": articleImage,
        "datePublished": post.publishedAt || post.date || "",
        "dateModified": post.updatedAt || post.publishedAt || post.date || "",
        "timeRequired": readingTime,
        "articleSection": post.category || "Placement Preparation",
        "keywords": Array.isArray(post.tags) ? post.tags.join(", ") : "",
        "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
      });
      upsertJsonLd("blog-breadcrumb", {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": window.location.origin },
          { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${window.location.origin}/blog` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": canonicalUrl },
        ],
      });
    } else if (!loading && notFound) {
      document.title = "Post not found | PlacementDo";
      upsertMeta('meta[name="description"]', { name: "description", content: "The blog post you requested could not be found. Browse all PlacementDo articles instead." });
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: "placementdo blog, placement articles, interview preparation blog" });
      upsertMeta('meta[name="robots"]', { name: "robots", content: "noindex, follow" });
      upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
      upsertMeta('meta[property="og:title"]', { property: "og:title", content: "Post not found | PlacementDo" });
      upsertMeta('meta[property="og:description"]', { property: "og:description", content: "The blog post you requested could not be found. Browse all PlacementDo articles instead." });
      upsertMeta('meta[property="og:url"]', { property: "og:url", content: fallbackCanonicalUrl });
      upsertMeta('meta[property="og:image"]', { property: "og:image", content: `${window.location.origin}/opengraph-image.png` });
      upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
      upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: "Post not found | PlacementDo" });
      upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: "The blog post you requested could not be found. Browse all PlacementDo articles instead." });
      upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: fallbackCanonicalUrl });
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `${window.location.origin}/twitter-image.png` });
      upsertLink('link[rel="canonical"]', { rel: "canonical", href: fallbackCanonicalUrl });
    }
    return () => {
      ["blog-article", "blog-breadcrumb"].forEach((id) => {
        const el = document.head.querySelector(`script[data-ld-id="${id}"]`);
        if (el) el.remove();
      });
    };
  }, [slug, post, notFound, loading]);

  useEffect(() => {
    if (!post) return undefined;
    const coverImage = post.coverImage || post.featured_image;
    if (!coverImage) return undefined;
    upsertLink('link[data-preload-id="blog-post-cover"]', {
      rel: "preload",
      as: "image",
      href: coverImage,
      fetchpriority: "high",
      "data-preload-id": "blog-post-cover",
    });
    return () => {
      const preloadEl = document.head.querySelector('link[data-preload-id="blog-post-cover"]');
      if (preloadEl) preloadEl.remove();
    };
  }, [post]);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `https://placementdo.app/blog/${slug}`;
  const shareTitle = post ? encodeURIComponent(post.title) : "";
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}&via=Placementdo`;
  const shareReddit = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${shareTitle}`;

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts
      .filter((p) => p.slug !== post.slug)
      .sort((a, b) => {
        // Prefer same category first, then sort by date
        const aScore = a.category === post.category ? 1 : 0;
        const bScore = b.category === post.category ? 1 : 0;
        if (aScore !== bScore) return bScore - aScore;
        return new Date(b.date) - new Date(a.date);
      })
      .slice(0, 3);
  }, [post, allPosts]);

  return (
    <>
      <style>{STYLES}</style>

      {/* Minimal nav header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(250,250,248,.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px,5vw,60px)",
          gap: 16,
        }}
      >
        <a href="/" className="blog-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <div className="blog-logo-mark"><img src="/apple-touch-icon.png" alt="PlacementDo logo" loading="eager" /></div>
          <span className="brig" style={{ fontSize: 19, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
            Placement<span style={{ color: "var(--teal)" }}>Do</span>
          </span>
        </a>
        <a
          href="/blog"
          className="btn-ghost"
          style={{ fontSize: 13 }}
          onClick={(e) => { e.preventDefault(); navigate("/blog"); }}
        >
          ← Blog
        </a>
      </header>

      <main className="bpp-page">
        <div className="bpp-inner">
          {/* Back link */}
          <a
            href="/blog"
            className="btn-ghost"
            style={{ paddingLeft: 0, marginBottom: 24 }}
            onClick={(e) => { e.preventDefault(); navigate("/blog"); }}
          >
            <ArrowLeft size={15} /> Back to blog
          </a>

          {loading ? (
            <div className="bpp-not-found">
              <p style={{ fontSize: 16, color: "var(--slate-400)" }}>Loading…</p>
            </div>
          ) : (notFound || !post) ? (
            <div className="bpp-not-found">
              <BookOpen
                size={48}
                style={{ color: "var(--slate-300)", marginBottom: 16 }}
              />
              <h1
                className="brig"
                style={{ fontSize: 28, letterSpacing: "-0.02em" }}
              >
                Post not found
              </h1>
              <p style={{ marginTop: 10, lineHeight: 1.7 }}>
                The post you are looking for does not exist or may have been
                moved.
              </p>
              <a
                href="/blog"
                className="btn-primary"
                style={{ marginTop: 20 }}
                onClick={(e) => { e.preventDefault(); navigate("/blog"); }}
              >
                Browse all posts
              </a>
            </div>
          ) : (
            <article>
              {/* Category + meta */}
              <div className="bpp-meta-bar">
                {post.category && (
                  <span className="bpp-category">
                    <TagIcon size={11} />
                    {post.category}
                  </span>
                )}
                <span className="bpp-meta-item">
                  <Calendar size={13} />
                  {formatDate(post.date)}
                </span>
                <span className="bpp-meta-item">
                  <User size={13} />
                  {post.author}
                </span>
                <span className="bpp-meta-item">{estimateReadingMinutes(post.content)}</span>
              </div>

              {/* Title */}
              <h1 className="brig bpp-title">{post.title}</h1>

              {/* Cover image. Admin posts use `coverImage`; guest submissions use
                  `featured_image`. Both are validated as safe URLs by the API. */}
              {(post.coverImage || post.featured_image) && (
                <img
                  src={post.coverImage || post.featured_image}
                  alt={post.title}
                  className="bpp-cover"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              )}

              {/* Excerpt summary */}
              <p
                style={{
                  color: "var(--slate-500)",
                  lineHeight: 1.8,
                  fontSize: 17,
                  borderLeft: "3px solid var(--teal-dark)",
                  paddingLeft: 16,
                  margin: "0 0 24px",
                }}
              >
                {post.excerpt}
              </p>

              <hr className="bpp-divider" />

              {/* Content blocks */}
              <div className="bpp-content">
                {blocks.map((block, idx) => {
                  if (block.type === "heading") {
                    // h1 is used for the post title above; content headings shift down by 1
                    if (block.level === 1)
                      return (
                        <h2
                          key={idx}
                          className="brig bpp-h2"
                        >
                          {block.text}
                        </h2>
                      );
                    if (block.level === 2)
                      return (
                        <h3
                          key={idx}
                          className="brig bpp-h3"
                        >
                          {block.text}
                        </h3>
                      );
                    return (
                      <h4
                        key={idx}
                        className="brig bpp-h4"
                      >
                        {block.text}
                      </h4>
                    );
                  }
                  if (block.type === "code")
                    return (
                      <pre key={idx} className="bpp-pre">
                        <code>{block.text}</code>
                      </pre>
                    );
                  if (block.type === "list")
                    return (
                      <ul key={idx} className="bpp-ul">
                        {block.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  return (
                    <p key={idx} className="bpp-p">
                      {block.text}
                    </p>
                  );
                })}
              </div>

              {/* Tags */}
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <>
                  <hr className="bpp-divider" />
                  <div className="bpp-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bpp-tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <section style={{ marginTop: 48 }}>
                  <hr className="bpp-divider" style={{ marginBottom: 28 }} />
                  <h2
                    className="brig"
                    style={{ fontSize: 24, letterSpacing: "-0.02em", marginBottom: 16 }}
                  >
                    Related posts
                  </h2>
                  <div style={{ display: "grid", gap: 12 }}>
                    {relatedPosts.map((item) => (
                      <a
                        key={item.id}
                        href={`/blog/${item.slug}`}
                        className="card card-lift"
                        style={{
                          padding: 16,
                          textAlign: "left",
                          display: "grid",
                          gap: 6,
                          cursor: "pointer",
                          background: "var(--white)",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                        onClick={(e) => { e.preventDefault(); navigate(`/blog/${item.slug}`); }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          {item.category && (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                background: "var(--teal-light)",
                                color: "var(--teal-dark)",
                                padding: "2px 8px",
                                borderRadius: 20,
                              }}
                            >
                              {item.category}
                            </span>
                          )}
                          <span
                            style={{
                              fontSize: 12,
                              color: "var(--slate-400)",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Calendar size={11} />
                            {formatDate(item.date)}
                          </span>
                        </div>
                        <div
                          className="brig"
                          style={{ fontSize: 18, letterSpacing: "-0.015em" }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            color: "var(--slate-500)",
                            lineHeight: 1.7,
                            fontSize: 14,
                          }}
                        >
                          {item.excerpt}
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </article>
          )}

          {/* Share buttons */}
          {post && (
            <div className="bpp-share">
              <span className="bpp-share-label">Share:</span>
              <a className="bpp-share-btn linkedin" href={shareLinkedIn} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a className="bpp-share-btn twitter" href={shareTwitter} target="_blank" rel="noopener noreferrer" aria-label="Share on X or Twitter">
                <Twitter size={14} /> X / Twitter
              </a>
              <a className="bpp-share-btn reddit" href={shareReddit} target="_blank" rel="noopener noreferrer" aria-label="Share on Reddit">
                Reddit
              </a>
            </div>
          )}

          {/* Continue Reading / Internal Links */}
          {post && (
            <div className="bpp-continue">
              <hr className="bpp-divider" />
              <p className="bpp-continue-title">Continue your placement preparation:</p>
              <div className="bpp-continue-links">
                <a href="/placement-preparation-complete-guide" className="bpp-continue-btn" onClick={(e) => { e.preventDefault(); navigate("/placement-preparation-complete-guide"); }}>Complete Placement Guide</a>
                <a href="/placement-preparation" className="bpp-continue-btn" onClick={(e) => { e.preventDefault(); navigate("/placement-preparation"); }}>Placement Prep Tips</a>
                <a href="/aptitude-questions" className="bpp-continue-btn" onClick={(e) => { e.preventDefault(); navigate("/aptitude-questions"); }}>Aptitude Questions</a>
                <a href="/coding-interview-questions" className="bpp-continue-btn" onClick={(e) => { e.preventDefault(); navigate("/coding-interview-questions"); }}>Coding Interview Q&A</a>
                <a href="/blog" className="bpp-continue-btn" onClick={(e) => { e.preventDefault(); navigate("/blog"); }}>All Blog Posts</a>
              </div>
            </div>
          )}

          {/* CTA Block */}
          {post && (
            <div className="bpp-cta">
              <h2 className="brig">Practice with AI Mock Interviews — Free</h2>
              <p>PlacementDo simulates real placement interviews. Get instant feedback on your answers, communication, and technical accuracy.</p>
              <button type="button" className="bpp-cta-btn" onClick={() => navigate("/")}>Start your mock interview →</button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
