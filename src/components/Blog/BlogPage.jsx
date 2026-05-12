import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Calendar, User, ArrowRight, ShieldCheck, BookOpen,
  AlertCircle, Check, Loader, Trash2, PlusCircle, LogOut,
} from "lucide-react";
import SEED_POSTS from "../../data/blogPosts.json";
import { upsertMeta, upsertLink } from "../SEO/shared/metaUtils.js";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const slugify = (v = "") =>
  v.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120)
    .replace(/^-|-$/g, "");

// Admin session helpers (sessionStorage only — cleared when tab closes)
const ADMIN_KEY = "pd:admin:token";
const getStoredToken = () => { try { return window.sessionStorage.getItem(ADMIN_KEY) || ""; } catch { return ""; } };
const storeToken = (t) => { try { window.sessionStorage.setItem(ADMIN_KEY, t); } catch {} };
const clearToken = () => { try { window.sessionStorage.removeItem(ADMIN_KEY); } catch {} };

const normalizePosts = (arr) =>
  arr.map((p) => ({
    ...p,
    date: p.date || p.publishedAt || "",
    id: p.id || p.slug,
    status: p.status || "published",
    tags: Array.isArray(p.tags) ? p.tags : [],
    author: p.author || "PlacementDo Team",
    category: p.category || "General",
    excerpt: p.excerpt || "",
    coverImage: p.coverImage || "",
  }));

const FALLBACK_POSTS = normalizePosts(SEED_POSTS);

const EMPTY_FORM = {
  title: "", slug: "",
  date: new Date().toISOString().slice(0, 10),
  author: "PlacementDo Team", category: "General",
  tags: "", excerpt: "", content: "", coverImage: "",
};

const STYLES = `
  .blog-page { min-height: 100vh; background: var(--slate-50); }
  .blog-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(250,250,248,.96); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border); height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 clamp(20px,5vw,60px); gap: 16px;
  }
  .blog-logo { display: inline-flex; align-items: center; gap: 10px; background: none; border: none; padding: 0; cursor: pointer; text-decoration: none; color: inherit; }
  .blog-logo-mark { height: 32px; width: 32px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); display: block; }
  .blog-logo-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .blog-main { max-width: 1100px; margin: 0 auto; padding: 104px clamp(20px,5vw,60px) 80px; }
  .blog-search-bar { margin-bottom: 28px; }
  .blog-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); }
  .blog-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 14px;
    overflow: hidden; display: flex; flex-direction: column;
    transition: box-shadow 0.18s, transform 0.18s;
  }
  .blog-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,.08); transform: translateY(-2px); }
  .blog-card-cover { width: 100%; aspect-ratio: 16/9; object-fit: cover; display: block; }
  .blog-card-body { padding: 24px 26px; display: flex; flex-direction: column; flex: 1; }
  .blog-card-meta { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; font-size: 12px; color: var(--slate-400); margin-bottom: 12px; }
  .blog-card-meta-item { display: inline-flex; align-items: center; gap: 4px; }
  .blog-card-cat { display: inline-block; background: var(--teal-light); color: var(--teal-dark); font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }
  .blog-card-h2 { font-size: clamp(18px,2.5vw,22px); letter-spacing: -0.02em; line-height: 1.3; margin: 0 0 10px; }
  .blog-card-excerpt { color: var(--slate-500); line-height: 1.75; font-size: 14.5px; flex: 1; margin: 0 0 16px; }
  .blog-card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border); }
  .blog-card-author { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: var(--slate-500); }
  .blog-empty { text-align: center; padding: 64px 24px; color: var(--slate-400); }
  .blog-section-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--teal-dark); margin-bottom: 20px;
  }
  .blog-featured {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    background: var(--white); border: 1px solid var(--border); border-radius: 16px;
    overflow: hidden; margin-bottom: 48px;
    transition: box-shadow 0.18s, transform 0.18s; cursor: pointer;
  }
  .blog-featured:hover { box-shadow: 0 8px 32px rgba(0,0,0,.09); transform: translateY(-2px); }
  .blog-featured-img-wrap {
    position: relative; overflow: hidden; min-height: 280px;
    background: linear-gradient(135deg, var(--teal-light) 0%, rgba(13,148,136,.12) 100%);
    display: flex; align-items: center; justify-content: center;
  }
  .blog-featured-img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .blog-featured-img-placeholder {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 10px; color: var(--teal-dark); opacity: 0.5; padding: 40px;
  }
  .blog-featured-body {
    padding: clamp(24px,4vw,44px); display: flex; flex-direction: column; justify-content: center;
  }
  .blog-featured-title {
    font-size: clamp(22px,3vw,32px); letter-spacing: -0.025em; line-height: 1.2;
    margin: 0 0 14px;
  }
  .blog-featured-excerpt {
    color: var(--slate-500); line-height: 1.75; font-size: 15px; margin: 0 0 20px; flex: 1;
  }
  @media (max-width: 720px) {
    .blog-featured { grid-template-columns: 1fr; }
    .blog-featured-img-wrap { min-height: 200px; }
  }
  .admin-section { margin-top: 80px; padding-top: 56px; border-top: 2px solid var(--border); }
  .admin-panel { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 28px 32px; }
  .admin-field { display: grid; gap: 6px; }
  .admin-field label { font-size: 13px; font-weight: 600; color: var(--slate-700); }
  .admin-field input, .admin-field textarea, .admin-field select {
    width: 100%; box-sizing: border-box;
    padding: 9px 12px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--white);
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    color: var(--slate-800); outline: none; transition: border-color 0.18s;
  }
  .admin-field input:focus, .admin-field textarea:focus, .admin-field select:focus { border-color: var(--teal-dark); }
  .admin-field textarea { resize: vertical; }
  .admin-hint { font-size: 12px; color: var(--slate-400); margin-top: 3px; }
  .admin-row { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
  .admin-msg {
    padding: 10px 14px; border-radius: 10px; font-size: 13px;
    display: flex; gap: 7px; align-items: flex-start; margin-bottom: 16px;
  }
  .admin-msg.success { background: var(--green-light); border: 1px solid rgba(22,163,74,.25); color: var(--green); }
  .admin-msg.error { background: var(--red-light); border: 1px solid rgba(220,38,38,.25); color: var(--red); }
  .post-mgmt-row {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 14px 0; border-bottom: 1px solid var(--border);
  }
  .post-mgmt-row:last-child { border-bottom: none; }
  .status-badge {
    display: inline-flex; align-items: center;
    font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px;
    letter-spacing: 0.04em; text-transform: uppercase; flex-shrink: 0;
  }
  .status-published { background: var(--green-light); color: var(--green); }
  .status-draft { background: var(--slate-100); color: var(--slate-600); }
  @media (max-width: 640px) {
    .blog-grid { grid-template-columns: 1fr; }
    .admin-row { grid-template-columns: 1fr; }
    .admin-panel { padding: 20px 16px; }
  }
`;

export default function BlogPage({ onNav }) {
  const navigate = useCallback(
    (path) => (onNav ? onNav(path) : (window.location.href = path)),
    [onNav]
  );

  // --- Posts ---
  const [posts, setPosts] = useState(FALLBACK_POSTS);

  const fetchPosts = useCallback(async (token = "") => {
    try {
      const headers = token ? { "x-admin-token": token } : {};
      const r = await fetch("/api/blog", { headers });
      const data = await r.json();
      const list = Array.isArray(data?.posts) ? normalizePosts(data.posts) : [];
      if (list.length > 0) setPosts(list);
    } catch {}
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}/blog`;
    document.title = "Blog | PlacementDo";
    upsertMeta('meta[name="description"]', { name: "description", content: "Read PlacementDo blog posts for interview preparation insights, product updates, and actionable strategies to improve your interview outcomes." });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: "placement blog, placement preparation blog, interview tips for freshers, campus placement guide, PlacementDo blog",
    });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: "Blog | PlacementDo" });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: "Read PlacementDo blog posts for interview preparation insights, product updates, and actionable strategies to improve your interview outcomes." });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: `${window.location.origin}/opengraph-image.png` });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: "Blog | PlacementDo" });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: "Read PlacementDo blog posts for interview preparation insights, product updates, and actionable strategies to improve your interview outcomes." });
    upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: canonicalUrl });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `${window.location.origin}/twitter-image.png` });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
  }, []);

  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    const publicPosts = posts.filter((p) => p.status === "published");
    const sorted = [...publicPosts].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const q = search.trim().toLowerCase();
    if (!q) {
      // Hide the featured (first/most recent) post from the grid so it isn't shown twice
      return sorted.slice(1);
    }
    return sorted.filter((p) =>
      `${p.title} ${p.excerpt} ${p.author} ${(p.tags || []).join(" ")} ${p.category || ""}`
        .toLowerCase()
        .includes(q)
    );
  }, [posts, search]);

  // --- Admin auth ---
  const [adminToken, setAdminToken] = useState(getStoredToken);
  const [authed, setAuthed] = useState(() => Boolean(getStoredToken()));
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      const t = adminToken.trim();
      if (!t) { setAuthError("Please enter your admin token."); return; }
      setAuthLoading(true);
      setAuthError("");
      try {
        const r = await fetch("/api/blog", { headers: { "x-admin-token": t } });
        if (r.ok) {
          storeToken(t);
          setAuthed(true);
          const data = await r.json();
          const list = Array.isArray(data?.posts) ? normalizePosts(data.posts) : [];
          if (list.length > 0) setPosts(list);
        } else {
          setAuthError("Invalid token. Please check and try again.");
        }
      } catch {
        setAuthError("Network error. Please try again.");
      } finally {
        setAuthLoading(false);
      }
    },
    [adminToken]
  );

  const handleLogout = useCallback(() => {
    clearToken();
    setAdminToken("");
    setAuthed(false);
    setAuthError("");
    fetchPosts();
  }, [fetchPosts]);

  // --- Create post ---
  const [form, setForm] = useState(EMPTY_FORM);
  const [autoSlug, setAutoSlug] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createMsg, setCreateMsg] = useState({ text: "", type: "" });
  const [showCreate, setShowCreate] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "title" && autoSlug) next.slug = slugify(value);
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setAutoSlug(false);
    setForm((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleCreate = useCallback(
    async (e) => {
      e.preventDefault();
      const t = adminToken.trim();
      setCreating(true);
      setCreateMsg({ text: "", type: "" });
      try {
        const payload = {
          title: form.title.trim(),
          slug: slugify(form.slug) || slugify(form.title),
          publishedAt: form.date
            ? new Date(form.date).toISOString()
            : new Date().toISOString(),
          author: form.author.trim() || "PlacementDo Team",
          category: form.category.trim() || "General",
          tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
          excerpt: form.excerpt.trim(),
          content: form.content.trim(),
          status: "published",
          coverImage: form.coverImage.trim(),
        };
        const r = await fetch("/api/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": t,
            "x-owner-token": t,
          },
          body: JSON.stringify(payload),
        });
        const data = await r.json();
        if (!r.ok) {
          setCreateMsg({ text: data?.error || "Failed to create post.", type: "error" });
          return;
        }
        const title = data?.post?.title || payload.title;
        setCreateMsg({ text: `"${title}" published successfully!`, type: "success" });
        setForm({ ...EMPTY_FORM, date: new Date().toISOString().slice(0, 10) });
        setAutoSlug(true);
        setShowCreate(false);
        await fetchPosts(t);
      } catch (err) {
        setCreateMsg({ text: err?.message || "Network error.", type: "error" });
      } finally {
        setCreating(false);
      }
    },
    [adminToken, form, fetchPosts]
  );

  // --- Delete post ---
  const [deletingSlug, setDeletingSlug] = useState(null);

  const handleDelete = useCallback(
    async (slug, title) => {
      if (!window.confirm(`Delete post "${title}"? This cannot be undone.`)) return;
      setDeletingSlug(slug);
      try {
        await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`, {
          method: "DELETE",
          headers: { "x-admin-token": adminToken.trim() },
        });
        await fetchPosts(adminToken.trim());
      } finally {
        setDeletingSlug(null);
      }
    },
    [adminToken, fetchPosts]
  );

  // Featured post = most recent published post (not shown again in grid when searching)
  const featuredPost = useMemo(() => {
    const published = posts.filter((p) => p.status === "published");
    return published.length > 0
      ? [...published].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
      : null;
  }, [posts]);

  // Posts list shown in admin panel (all statuses)
  const adminPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [posts]
  );

  return (
    <>
      <style>{STYLES}</style>

      {/* Header */}
      <header className="blog-header">
        <a href="/" className="blog-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <div className="blog-logo-mark"><img src="/apple-touch-icon.png" alt="PlacementDo logo" loading="eager" /></div>
          <span className="brig" style={{ fontSize: 19, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
            Placement<span style={{ color: "var(--teal)" }}>Do</span>
          </span>
        </a>
        <a
          href="/"
          className="btn-ghost"
          style={{ fontSize: 13 }}
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
        >
          ← Home
        </a>
      </header>

      <div className="blog-page">
        <main className="blog-main">

          {/* Page heading */}
          <div style={{ marginBottom: 36 }}>
            <h1 className="brig" style={{ fontSize: "clamp(28px,5vw,44px)", letterSpacing: "-0.03em", margin: "0 0 10px" }}>
              PlacementDo Blog
            </h1>
            <p style={{ color: "var(--slate-500)", fontSize: 15, lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
              Interview tips, career advice, and product updates — all in one place.
            </p>
          </div>

          {/* Featured post */}
          {!search && featuredPost && (
            <div style={{ marginBottom: 48 }}>
              <p className="blog-section-label">Featured Post</p>
              <div
                className="blog-featured"
                role="article"
                onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate(`/blog/${featuredPost.slug}`)}
                tabIndex={0}
                aria-label={`Featured post: ${featuredPost.title}`}
              >
                <div className="blog-featured-img-wrap">
                  {featuredPost.coverImage ? (
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="blog-featured-img"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div className="blog-featured-img-placeholder">
                      <BookOpen size={48} />
                      <span style={{ fontSize: 13, fontWeight: 600 }}>PlacementDo Blog</span>
                    </div>
                  )}
                </div>
                <div className="blog-featured-body">
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 14 }}>
                    {featuredPost.category && (
                      <span className="blog-card-cat">{featuredPost.category}</span>
                    )}
                    <span style={{ fontSize: 12, color: "var(--slate-400)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={12} /> {formatDate(featuredPost.date)}
                    </span>
                  </div>
                  <h2 className="brig blog-featured-title">{featuredPost.title}</h2>
                  <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
                  <div>
                    <a
                      href={`/blog/${featuredPost.slug}`}
                      className="btn-primary"
                      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
                      onClick={(e) => { e.preventDefault(); navigate(`/blog/${featuredPost.slug}`); }}
                    >
                      Read article <ArrowRight size={14} />
                    </a>
                  </div>
                  <div style={{ marginTop: 16, fontSize: 12, color: "var(--slate-400)", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <User size={11} /> {featuredPost.author}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All posts heading + search */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <p className="blog-section-label" style={{ margin: 0 }}>
              {search ? "Search results" : "All Posts"}
            </p>
            {/* Search bar */}
            <div className="blog-search-bar" style={{ margin: 0 }}>
              <input
                type="search"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search blog posts"
                style={{ maxWidth: 280 }}
              />
            </div>
          </div>

          {/* Blog grid */}
          {filteredPosts.length === 0 ? (
            <div className="blog-empty">
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
            <div className="blog-grid">
              {filteredPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt=""
                      className="blog-card-cover"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      {post.category && (
                        <span className="blog-card-cat">{post.category}</span>
                      )}
                      <span className="blog-card-meta-item">
                        <Calendar size={12} />
                        {formatDate(post.date)}
                      </span>
                    </div>
                    <h2 className="brig blog-card-h2">{post.title}</h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-card-author">
                        <User size={12} /> {post.author}
                      </span>
                      <a
                        href={`/blog/${post.slug}`}
                        className="btn-ghost"
                        style={{ fontSize: 13, paddingRight: 0, display: "inline-flex", alignItems: "center", gap: 4 }}
                        onClick={(e) => { e.preventDefault(); navigate(`/blog/${post.slug}`); }}
                      >
                        Read more <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Placement prep resources */}
          <section style={{ marginTop: 56, padding: '36px 32px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 16 }}>
            <p className="blog-section-label">Placement Resources</p>
            <h2 className="brig" style={{ fontSize: 'clamp(20px,3vw,26px)', letterSpacing: '-0.02em', margin: '0 0 8px', color: 'var(--slate)' }}>
              Continue Your Placement Preparation
            </h2>
            <p style={{ fontSize: 14, color: 'var(--slate-500)', lineHeight: 1.7, margin: '0 0 20px', maxWidth: 560 }}>
              Explore our in-depth guides on aptitude tests, coding rounds, HR interviews, and company-specific preparation.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: 'Complete Placement Guide', href: '/placement-preparation-complete-guide' },
                { label: 'Placement Prep Tips', href: '/placement-preparation' },
                { label: 'Aptitude Questions', href: '/aptitude-questions' },
                { label: 'Coding Interview Q&A', href: '/coding-interview-questions' },
                { label: 'TCS Placement Guide', href: '/company-wise-questions/tcs' },
                { label: 'Wipro Placement Guide', href: '/company-wise-questions/wipro' },
                { label: 'Infosys Placement Guide', href: '/company-wise-questions/infosys' },
                { label: 'Accenture Placement Guide', href: '/company-wise-questions/accenture' },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="btn-ghost"
                  style={{ fontSize: 13, fontWeight: 600, color: 'var(--teal-dark)', background: 'var(--teal-light)', borderColor: 'rgba(13,148,136,.2)', borderRadius: '999px', padding: '8px 16px' }}
                  onClick={(e) => { e.preventDefault(); navigate(href); }}
                >
                  {label}
                </a>
              ))}
            </div>
          </section>

          {/* Admin section */}
          <section className="admin-section">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <ShieldCheck size={20} style={{ color: "var(--teal-dark)" }} />
              <h2 className="brig" style={{ fontSize: 22, letterSpacing: "-0.02em", margin: 0 }}>
                Admin
              </h2>
            </div>

            {!authed ? (
              /* Login form */
              <div className="admin-panel" style={{ maxWidth: 420 }}>
                <p style={{ fontSize: 14, color: "var(--slate-500)", marginBottom: 18, lineHeight: 1.7 }}>
                  Log in with your admin token to manage and publish blog posts.
                </p>
                {authError && (
                  <div className="admin-msg error">
                    <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                    {authError}
                  </div>
                )}
                <form onSubmit={handleLogin} style={{ display: "grid", gap: 16 }}>
                  <div className="admin-field">
                    <label htmlFor="admin-token-input">Admin Token</label>
                    <input
                      id="admin-token-input"
                      type="password"
                      value={adminToken}
                      onChange={(e) => setAdminToken(e.target.value)}
                      placeholder="Paste your BLOG_ADMIN_TOKEN"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={authLoading}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center" }}
                  >
                    {authLoading ? (
                      <><Loader size={14} className="spin" /> Verifying…</>
                    ) : (
                      <><ShieldCheck size={14} /> Log In</>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated admin panel */
              <div style={{ display: "grid", gap: 24 }}>
                {/* Toolbar */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <span
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: "var(--green-light)", color: "var(--green)",
                      fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20,
                    }}
                  >
                    <Check size={12} /> Logged in
                  </span>
                  <button
                    className="btn-primary"
                    style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
                    onClick={() => { setShowCreate((v) => !v); setCreateMsg({ text: "", type: "" }); }}
                  >
                    <PlusCircle size={14} />
                    {showCreate ? "Cancel" : "New Post"}
                  </button>
                  <button
                    className="btn-ghost"
                    style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, color: "var(--slate-500)" }}
                    onClick={handleLogout}
                  >
                    <LogOut size={14} /> Log out
                  </button>
                </div>

                {/* Create post form */}
                {showCreate && (
                  <div className="admin-panel">
                    <h3 className="brig" style={{ fontSize: 18, letterSpacing: "-0.02em", marginBottom: 20, marginTop: 0 }}>
                      New Blog Post
                    </h3>

                    {createMsg.text && (
                      <div className={`admin-msg ${createMsg.type}`}>
                        {createMsg.type === "error"
                          ? <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                          : <Check size={14} style={{ flexShrink: 0, marginTop: 1 }} />}
                        {createMsg.text}
                      </div>
                    )}

                    <form onSubmit={handleCreate} style={{ display: "grid", gap: 18 }}>
                      <div className="admin-field">
                        <label htmlFor="f-title">Title <span style={{ color: "var(--red)" }}>*</span></label>
                        <input
                          id="f-title" name="title" value={form.title}
                          onChange={handleFormChange}
                          placeholder="e.g. How to Ace Your System Design Interview"
                          required
                        />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="f-slug">Slug <span style={{ color: "var(--red)" }}>*</span></label>
                        <input
                          id="f-slug" name="slug" value={form.slug}
                          onChange={handleSlugChange}
                          placeholder="e.g. how-to-ace-system-design"
                          required
                        />
                        <p className="admin-hint">
                          URL: /blog/<strong>{form.slug || "your-slug"}</strong>
                        </p>
                      </div>

                      <div className="admin-row">
                        <div className="admin-field">
                          <label htmlFor="f-date">Publish Date <span style={{ color: "var(--red)" }}>*</span></label>
                          <input id="f-date" type="date" name="date" value={form.date} onChange={handleFormChange} required />
                        </div>
                        <div className="admin-field">
                          <label htmlFor="f-author">Author <span style={{ color: "var(--red)" }}>*</span></label>
                          <input id="f-author" name="author" value={form.author} onChange={handleFormChange} required />
                        </div>
                      </div>

                      <div className="admin-row">
                        <div className="admin-field">
                          <label htmlFor="f-category">Category</label>
                          <input id="f-category" name="category" value={form.category} onChange={handleFormChange} placeholder="e.g. Interview Tips" />
                        </div>
                        <div className="admin-field">
                          <label htmlFor="f-tags">Tags</label>
                          <input id="f-tags" name="tags" value={form.tags} onChange={handleFormChange} placeholder="tag1, tag2, tag3" />
                          <p className="admin-hint">Comma-separated.</p>
                        </div>
                      </div>

                      <div className="admin-field">
                        <label htmlFor="f-cover">Cover Image URL</label>
                        <input id="f-cover" name="coverImage" type="url" value={form.coverImage} onChange={handleFormChange} placeholder="https://example.com/image.jpg" />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="f-excerpt">Excerpt <span style={{ color: "var(--red)" }}>*</span></label>
                        <textarea id="f-excerpt" name="excerpt" value={form.excerpt} onChange={handleFormChange} rows={3} placeholder="Short summary shown on the blog listing (1–2 sentences)." required />
                      </div>

                      <div className="admin-field">
                        <label htmlFor="f-content">Content <span style={{ color: "var(--red)" }}>*</span></label>
                        <textarea
                          id="f-content" name="content" value={form.content}
                          onChange={handleFormChange} rows={14}
                          placeholder={"Supports plain text and Markdown:\n# Heading\n## Subheading\n- list item\n```code block```"}
                          required
                        />
                        <p className="admin-hint">Supports # headings, - lists, ``` code blocks.</p>
                      </div>

                      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                        <button type="button" className="btn-ghost" onClick={() => setShowCreate(false)} disabled={creating}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={creating} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          {creating ? <><Loader size={14} className="spin" /> Publishing…</> : <><PlusCircle size={14} /> Publish Post</>}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Post management list */}
                <div className="admin-panel">
                  <h3 className="brig" style={{ fontSize: 18, letterSpacing: "-0.02em", marginBottom: 16, marginTop: 0 }}>
                    All Posts ({adminPosts.length})
                  </h3>
                  {adminPosts.length === 0 ? (
                    <p style={{ color: "var(--slate-400)", fontSize: 14 }}>No posts yet.</p>
                  ) : (
                    <div>
                      {adminPosts.map((post) => (
                        <div key={post.id} className="post-mgmt-row">
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                              <span className={`status-badge status-${post.status === "published" ? "published" : "draft"}`}>
                                {post.status}
                              </span>
                              {post.category && (
                                <span style={{ fontSize: 11, color: "var(--slate-400)" }}>{post.category}</span>
                              )}
                              <span style={{ fontSize: 11, color: "var(--slate-400)", display: "inline-flex", alignItems: "center", gap: 3 }}>
                                <Calendar size={10} /> {formatDate(post.date)}
                              </span>
                            </div>
                            <div
                              className="brig"
                              style={{ fontSize: 15, letterSpacing: "-0.01em", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            >
                              {post.title}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--slate-400)" }}>
                              /blog/{post.slug}
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                            {post.status === "published" && (
                              <button
                                className="btn-ghost"
                                style={{ fontSize: 12, padding: "4px 10px" }}
                                onClick={() => navigate(`/blog/${post.slug}`)}
                              >
                                View
                              </button>
                            )}
                            <button
                              className="btn-ghost"
                              style={{ fontSize: 12, padding: "4px 10px", color: "var(--red)", display: "inline-flex", alignItems: "center", gap: 5 }}
                              onClick={() => handleDelete(post.slug, post.title)}
                              disabled={deletingSlug === post.slug}
                            >
                              {deletingSlug === post.slug
                                ? <Loader size={12} className="spin" />
                                : <Trash2 size={12} />}
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

        </main>
      </div>
    </>
  );
}
