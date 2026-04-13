/**
 * BlogPage — public read-only blog listing.
 *
 * Posts are sourced from the /api/blog endpoint, which serves the in-memory
 * or KV-stored posts seeded with the content from DEFAULT_POSTS in api/blog.js.
 *
 * To add a new blog post as an admin:
 *   1. Navigate to /admin/blog/new
 *   2. Enter your BLOG_ADMIN_TOKEN and fill in the post form
 *   3. Submit — the post will be saved and appear on this page immediately
 *
 * Alternatively, to add posts via the JSON file (for static/CDN deploys):
 *   1. Open src/data/blogPosts.json
 *   2. Copy an existing post object and change its fields
 *   3. Commit and deploy
 */
import { useState, useMemo, useEffect } from "react";
import { Calendar, User, ChevronRight, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { readListCache, writeListCache } from "./blogCache.js";
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

// Normalize the bundled seed posts so they match the API shape.
// This is the fallback used on cold load (no localStorage cache) so the
// blog grid renders immediately instead of showing a loading spinner.
const FALLBACK_POSTS = SEED_POSTS.map((p) => ({
  ...p,
  date: p.date || p.publishedAt || "",
  id: p.id || p.slug,
  status: p.status || "published",
  tags: Array.isArray(p.tags) ? p.tags : [],
  author: p.author || "PlacementDo Team",
  category: p.category || "General",
  excerpt: p.excerpt || "",
  readTimeMinutes: p.readTimeMinutes || 1,
  coverImage: p.coverImage || "",
}));

const STYLES = `
  .bp-page {
    min-height: 100vh;
    background: var(--slate-50);
    padding: 104px clamp(20px,5vw,60px) 72px;
  }
  .bp-inner {
    max-width: 1100px;
    margin: 0 auto;
  }
  .bp-hero {
    padding: 48px 0 36px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 40px;
  }
  .bp-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--teal-light);
    color: var(--teal-dark);
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    border-radius: 20px;
    letter-spacing: 0.02em;
    margin-bottom: 14px;
  }
  .bp-hero-title {
    font-size: clamp(32px, 5vw, 52px);
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 0 0 14px;
  }
  .bp-hero-desc {
    color: var(--slate-500);
    line-height: 1.8;
    font-size: 16px;
    max-width: 600px;
    margin: 0;
  }
  .bp-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  }
  .bp-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;
    transition: box-shadow 0.18s, transform 0.18s;
  }
  .bp-card:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,.08);
    transform: translateY(-2px);
  }
  .bp-card-cover {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
    border-radius: 0;
  }
  .bp-card-body {
    padding: 24px 26px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .bp-card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    font-size: 12px;
    color: var(--slate-400);
    margin-bottom: 12px;
  }
  .bp-card-meta-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .bp-card-category {
    display: inline-block;
    background: var(--teal-light);
    color: var(--teal-dark);
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
    letter-spacing: 0.02em;
  }
  .bp-card-title {
    font-size: clamp(18px, 2.5vw, 22px);
    letter-spacing: -0.02em;
    line-height: 1.3;
    margin: 0 0 10px;
  }
  .bp-card-excerpt {
    color: var(--slate-500);
    line-height: 1.75;
    font-size: 14.5px;
    flex: 1;
    margin: 0 0 16px;
  }
  .bp-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--border);
  }
  .bp-card-author {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: var(--slate-500);
  }
  .bp-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 14px;
  }
  .bp-tag-pill {
    font-size: 11px;
    padding: 3px 9px;
    border-radius: 999px;
    border: 1px solid var(--border);
    color: var(--slate-500);
    background: var(--slate-50);
  }
  .bp-empty {
    text-align: center;
    padding: 64px 24px;
    color: var(--slate-400);
  }
  @media (max-width: 640px) {
    .bp-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default function BlogPage({ onNav }) {
  const navigate = (path) => {
    if (onNav) {
      onNav(path);
    } else {
      window.location.href = path;
    }
  };

  // Read cache once on mount — initializes both the post list and the loading flag.
  // Falls back to the bundled seed posts so the grid is shown immediately on any
  // cold load, with no "Loading posts…" spinner visible to the user.
  const [{ rawPosts, loadingPosts }, setPostState] = useState(() => {
    const cached = readListCache();
    return { rawPosts: cached || FALLBACK_POSTS, loadingPosts: false };
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data?.posts) ? data.posts : [];
        // Normalize: API uses publishedAt; give each post a .date alias for sorting/display
        const normalized = list.map((p) => ({
          ...p,
          date: p.date || p.publishedAt || "",
          id: p.id || p.slug,
          coverImage: p.coverImage || "",
        }));
        setPostState({ rawPosts: normalized, loadingPosts: false });
        writeListCache(normalized);
      })
      .catch(() => {
        // On fetch failure, keep any cached posts visible rather than showing an empty
        // state — stale posts are more useful than a blank page for a transient error.
        if (!cancelled) setPostState((s) => ({ ...s, loadingPosts: false }));
      });
    return () => { cancelled = true; };
  }, []);

  const sortedPosts = useMemo(
    () =>
      [...rawPosts].sort((a, b) => {
        const diff = new Date(b.date) - new Date(a.date);
        // Secondary sort by slug ensures deterministic order when dates are equal
        return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
      }),
    [rawPosts]
  );

  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sortedPosts;
    return sortedPosts.filter((p) => {
      const haystack =
        `${p.title} ${p.excerpt} ${p.author} ${(p.tags || []).join(" ")} ${p.category || ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [sortedPosts, search]);

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
          onClick={() => navigate("/write-for-us")}
        >
          Write for us <ChevronRight size={14} />
        </button>
        <button
          className="btn-ghost"
          style={{ fontSize: 13 }}
          onClick={() => navigate("/admin/blog")}
          title="Admin area"
        >
          <ShieldCheck size={14} /> Admin
        </button>
      </header>

      <main className="bp-page">
        <div className="bp-inner">
          {/* Hero */}
          <section className="bp-hero">
            <span className="bp-tag">
              <BookOpen size={12} /> Blog
            </span>
            <h1 className="brig bp-hero-title">PlacementDo Blog</h1>
            <p className="bp-hero-desc">
              Interview preparation insights, product updates, and actionable
              strategies to help you land your next role.
            </p>
            <div style={{ marginTop: 22 }}>
              <input
                type="search"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search blog posts"
                style={{ maxWidth: 360 }}
              />
            </div>
          </section>

          {/* Post grid */}
          {filteredPosts.length === 0 ? (
            <div className="bp-empty">
              <p style={{ fontSize: 16, fontWeight: 500 }}>No posts found.</p>
              {search && (
                <button
                  className="btn-ghost"
                  style={{ marginTop: 10 }}
                  onClick={() => setSearch("")}
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="bp-grid">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bp-card">
              {/* Cover image — rendered on cards that have one.
                  `display:none` on error removes the element from layout (no gap). */}
              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt=""
                  className="bp-card-cover"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              )}
                  <div className="bp-card-body">
                    <div className="bp-card-meta">
                      {post.category && (
                        <span className="bp-card-category">{post.category}</span>
                      )}
                      <span className="bp-card-meta-item">
                        <Calendar size={12} />
                        {formatDate(post.date)}
                      </span>
                    </div>

                    <h2 className="brig bp-card-title">{post.title}</h2>
                    <p className="bp-card-excerpt">{post.excerpt}</p>

                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="bp-tags">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="bp-tag-pill">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="bp-card-footer">
                      <span className="bp-card-author">
                        <User size={12} />
                        {post.author}
                      </span>
                      <button
                        className="btn-ghost"
                        style={{
                          fontSize: 13,
                          paddingRight: 0,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        Read more <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
