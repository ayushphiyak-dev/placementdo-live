/**
 * BlogPostPage — public read-only individual blog post view.
 *
 * Fetches the post matching `slug` from /api/blog?slug=<slug>.
 * To add a new blog post, navigate to /admin/blog/new as an admin.
 */
import { useMemo, useReducer, useEffect } from "react";
import { Calendar, User, ArrowLeft, BookOpen, Tag as TagIcon } from "lucide-react";
import { readListCache, readPostCache, writePostCache } from "./blogCache.js";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
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
  .bpp-not-found {
    text-align: center;
    padding: 80px 24px;
    color: var(--slate-400);
  }
`;

const makeFetchInitial = (slug) => {
  const cached = readPostCache(slug);
  if (cached) {
    return { post: cached.post, allPosts: cached.allPosts, loading: false, notFound: false };
  }
  return { post: null, allPosts: [], loading: true, notFound: false };
};

function fetchReducer(state, action) {
  switch (action.type) {
    case "reset": {
      // When navigating to a new slug, show cached data if available or show loading
      const cached = readPostCache(action.slug);
      if (cached) {
        return { post: cached.post, allPosts: cached.allPosts, loading: false, notFound: false };
      }
      return { post: null, allPosts: [], loading: true, notFound: false };
    }
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
    slug,
    makeFetchInitial
  );

  useEffect(() => {
    let cancelled = false;
    dispatch({ type: "reset", slug });

    // Prefer the cached post list for related posts to avoid an extra round-trip
    const cachedList = readListCache();

    // Fetch the individual post and (if no cached list) all posts for related posts
    const promises = [
      fetch(`/api/blog?slug=${encodeURIComponent(slug)}`).then((r) => r.json()),
      cachedList
        ? Promise.resolve({ posts: cachedList })
        : fetch("/api/blog").then((r) => r.json()),
    ];

    Promise.all(promises)
      .then(([postData, listData]) => {
        if (cancelled) return;
        // Normalise list first so it can be passed into both branches of the dispatch
        const list = Array.isArray(listData?.posts)
          ? listData.posts.map((p) => ({ ...p, date: p.date || p.publishedAt || "", id: p.id || p.slug }))
          : [];
        if (postData?.post) {
          const p = postData.post;
          const normalizedPost = { ...p, date: p.date || p.publishedAt || "", id: p.id || p.slug };
          dispatch({
            type: "loaded",
            post: normalizedPost,
            allPosts: list,
          });
          // Persist to sessionStorage so refresh is instant
          writePostCache(slug, { post: normalizedPost, allPosts: list });
        } else {
          dispatch({ type: "error" });
        }
      })
      .catch(() => {
        if (!cancelled) dispatch({ type: "error" });
      });

    return () => { cancelled = true; };
  }, [slug]);

  const blocks = useMemo(() => (post ? parseContent(post.content) : []), [post]);

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
          padding: "0 clamp(20px,5vw,60px)",
          gap: 16,
        }}
      >
        <button
          className="btn-ghost"
          style={{ paddingLeft: 0 }}
          onClick={() => navigate("/")}
        >
          <span
            className="brig"
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "var(--teal-dark)",
              letterSpacing: "-0.02em",
            }}
          >
            PlacementDo
          </span>
        </button>
        <div style={{ flex: 1 }} />
        <button
          className="btn-ghost"
          style={{ fontSize: 13 }}
          onClick={() => navigate("/blog")}
        >
          ← Blog
        </button>
      </header>

      <main className="bpp-page">
        <div className="bpp-inner">
          {/* Back link */}
          <button
            className="btn-ghost"
            style={{ paddingLeft: 0, marginBottom: 24 }}
            onClick={() => navigate("/blog")}
          >
            <ArrowLeft size={15} /> Back to blog
          </button>

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
              <button
                className="btn-primary"
                style={{ marginTop: 20 }}
                onClick={() => navigate("/blog")}
              >
                Browse all posts
              </button>
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
              </div>

              {/* Title */}
              <h1 className="brig bpp-title">{post.title}</h1>

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
                      <button
                        key={item.id}
                        className="card card-lift"
                        style={{
                          padding: 16,
                          textAlign: "left",
                          display: "grid",
                          gap: 6,
                          cursor: "pointer",
                          background: "var(--white)",
                        }}
                        onClick={() => navigate(`/blog/${item.slug}`)}
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
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </article>
          )}
        </div>
      </main>
    </>
  );
}
