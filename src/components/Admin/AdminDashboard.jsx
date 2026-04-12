import { useState, useCallback } from "react";
import {
  ShieldCheck,
  Check,
  X,
  Trash2,
  RefreshCw,
  ChevronRight,
  AlertCircle,
  User,
  Calendar,
  Tag as TagIcon,
  Loader,
  Eye,
  ArrowLeft,
  PlusCircle,
  Pencil,
  Globe,
  EyeOff,
} from "lucide-react";

const formatDate = (value) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(d);
};

const StatusBadge = ({ status }) => {
  const map = {
    pending: { bg: "var(--amber-light)", color: "var(--amber)", label: "Pending" },
    published: { bg: "var(--green-light)", color: "var(--green)", label: "Published" },
    rejected: { bg: "var(--red-light)", color: "var(--red)", label: "Rejected" },
    draft: { bg: "var(--slate-100)", color: "var(--slate-600)", label: "Draft" },
  };
  const s = map[status] || map.draft;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 700,
      padding: "3px 10px", borderRadius: 20,
      letterSpacing: "0.04em", textTransform: "uppercase",
    }}>
      {s.label}
    </span>
  );
};

const ExpandedPost = ({ post, onClose }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(15,23,42,.6)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "80px 20px 40px", overflowY: "auto",
      animation: "fade-in-up 0.2s both",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="card scale-in"
      style={{ width: "100%", maxWidth: 720, padding: 28 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 16 }}>
        <h2 className="brig" style={{ fontSize: 22, letterSpacing: "-0.02em" }}>{post.title}</h2>
        <button className="btn-ghost" onClick={onClose}><X size={18} /></button>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <StatusBadge status={post.status} />
        <span style={{ fontSize: 12, color: "var(--slate-500)", display: "inline-flex", alignItems: "center", gap: 4 }}>
          <User size={12} /> {post.author}
        </span>
        {post.author_email && (
          <span style={{ fontSize: 12, color: "var(--slate-400)" }}>{post.author_email}</span>
        )}
        <span style={{ fontSize: 12, color: "var(--slate-400)", display: "inline-flex", alignItems: "center", gap: 4 }}>
          <Calendar size={12} /> {formatDate(post.created_at)}
        </span>
        <span style={{ fontSize: 12, color: "var(--slate-400)", display: "inline-flex", alignItems: "center", gap: 4 }}>
          <TagIcon size={12} /> {post.category}
        </span>
      </div>
      {/* Content is plain text stored by the API and rendered via React text nodes,
          which auto-escape HTML — no dangerouslySetInnerHTML, no XSS risk. */}
      <div className="card" style={{ padding: 18, background: "var(--slate-50)", whiteSpace: "pre-wrap", fontFamily: "'DM Sans',sans-serif", fontSize: 14, lineHeight: 1.85, color: "var(--slate-600)", maxHeight: 420, overflowY: "auto" }}>
        {post.content || post.excerpt || "No content"}
      </div>
    </div>
  </div>
);

export default function AdminDashboard({ onNav }) {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(""); // slug of post being acted on
  const [message, setMessage] = useState({ text: "", type: "success" });
  const [previewPost, setPreviewPost] = useState(null);
  // "all" | "published" | "draft" | "pending"
  const [filter, setFilter] = useState("all");

  const showMessage = useCallback((text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "success" }), 5000);
  }, []);

  // Load ALL posts (published + draft + pending) via GET /api/blog with admin token
  const load = useCallback(async (adminToken = token) => {
    if (!adminToken) return;
    setLoading(true);
    setMessage({ text: "", type: "success" });
    try {
      const r = await fetch("/api/blog", {
        headers: { "x-admin-token": adminToken },
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Failed to load posts");
      // Normalize: API uses publishedAt; add a created_at alias for display
      const list = Array.isArray(data?.posts) ? data.posts : [];
      setPosts(
        list.map((p) => ({
          ...p,
          created_at: p.created_at || p.publishedAt || p.updatedAt || "",
        }))
      );
      setLoaded(true);
    } catch (err) {
      showMessage(err?.message || "Failed to load posts.", "error");
    } finally {
      setLoading(false);
    }
  }, [token, showMessage]);

  // Publish a post via the approve endpoint (no owner token needed)
  const publish = async (slug) => {
    setActionLoading(slug);
    try {
      const r = await fetch(`/api/blog/approve?slug=${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "x-admin-token": token },
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Publish failed");
      showMessage(data?.message || "Post published.");
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, status: "published" } : p))
      );
    } catch (err) {
      showMessage(err?.message || "Publish failed.", "error");
    } finally {
      setActionLoading("");
    }
  };

  // Unpublish a post (set to draft) via PUT /api/blog
  const unpublish = async (slug) => {
    setActionLoading(slug);
    try {
      const r = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-token": token },
        body: JSON.stringify({ status: "draft" }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Unpublish failed");
      showMessage("Post unpublished (set to draft).");
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, status: "draft" } : p))
      );
    } catch (err) {
      showMessage(err?.message || "Unpublish failed.", "error");
    } finally {
      setActionLoading("");
    }
  };

  // Approve a guest submission (same as publish but shows different label)
  const approve = async (slug) => {
    setActionLoading(slug);
    try {
      const r = await fetch(`/api/blog/approve?slug=${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "x-admin-token": token },
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Approve failed");
      showMessage(data?.message || "Post approved and published.");
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, status: "published" } : p))
      );
    } catch (err) {
      showMessage(err?.message || "Approve failed.", "error");
    } finally {
      setActionLoading("");
    }
  };

  const reject = async (slug) => {
    setActionLoading(slug);
    try {
      const r = await fetch(`/api/blog/reject?slug=${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "x-admin-token": token },
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Reject failed");
      showMessage(data?.message || "Post rejected.");
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, status: "rejected" } : p))
      );
    } catch (err) {
      showMessage(err?.message || "Reject failed.", "error");
    } finally {
      setActionLoading("");
    }
  };

  const del = async (slug) => {
    if (!window.confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setActionLoading(slug);
    try {
      const r = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
        headers: { "x-admin-token": token },
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Delete failed");
      showMessage("Post deleted.");
      setPosts((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      showMessage(err?.message || "Delete failed.", "error");
    } finally {
      setActionLoading("");
    }
  };

  const navigate = useCallback((path) => {
    if (onNav) {
      onNav(path);
    } else {
      window.location.href = path;
    }
  }, [onNav]);

  // Filter tabs config
  const FILTERS = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Draft" },
    { key: "pending", label: "Pending" },
  ];

  const filteredPosts =
    filter === "all" ? posts : posts.filter((p) => p.status === filter);

  return (
    <>
      <style>{`
        .ad-page { min-height: 100vh; background: var(--slate-50); padding: 104px clamp(20px,5vw,60px) 72px; }
        .ad-inner { max-width: 1100px; margin: 0 auto; }
        .ad-post-card { transition: box-shadow 0.2s; }
        .ad-post-card:hover { box-shadow: var(--shadow-md); }
      `}</style>

      {/* Minimal nav header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,250,248,.96)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        height: 64, display: "flex", alignItems: "center",
        padding: "0 clamp(20px,5vw,60px)", gap: 16,
      }}>
        <button
          className="btn-ghost"
          style={{ paddingLeft: 0 }}
          onClick={() => navigate("/")}
        >
          <span className="brig" style={{ fontSize: 17, fontWeight: 700, color: "var(--teal-dark)", letterSpacing: "-0.02em" }}>
            PlacementDo
          </span>
        </button>
        <div style={{ flex: 1 }} />
        <button className="btn-ghost" onClick={() => navigate("/blog")}>
          Blog <ChevronRight size={14} />
        </button>
      </header>

      <main className="ad-page">
        <div className="ad-inner">
          <button className="btn-ghost" style={{ paddingLeft: 0, marginBottom: 16 }} onClick={() => navigate("/blog")}>
            <ArrowLeft size={15} /> Back to Blog
          </button>

          {/* Page header */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "var(--teal-light)", color: "var(--teal-dark)",
                fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20,
                letterSpacing: "0.02em",
              }}>
                <ShieldCheck size={12} /> Admin
              </span>
              <h1 className="brig" style={{ fontSize: "clamp(28px,5vw,40px)", letterSpacing: "-0.03em", marginTop: 10 }}>
                Blog Management
              </h1>
              <p style={{ marginTop: 6, color: "var(--slate-500)", lineHeight: 1.8 }}>
                Manage all blog posts — create, edit, publish, unpublish, or delete. Admin token required.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button
                className="btn-primary"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap" }}
                onClick={() => navigate("/admin/blog/new")}
              >
                <PlusCircle size={15} /> Create New Post
              </button>
            </div>
          </div>

          {/* Token input */}
          <div className="card" style={{ padding: 18, marginTop: 20, display: "grid", gap: 12 }}>
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr auto" }}>
              <div>
                <label htmlFor="ad-token">Admin Token</label>
                <input
                  id="ad-token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="BLOG_ADMIN_TOKEN"
                  onKeyDown={(e) => e.key === "Enter" && load(token)}
                />
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  className="btn-primary"
                  disabled={!token || loading}
                  onClick={() => load(token)}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {loading ? <><Loader size={14} className="spin" /> Loading…</> : <><RefreshCw size={14} /> Load Posts</>}
                </button>
              </div>
            </div>
          </div>

          {/* Status message */}
          {message.text && (
            <div
              className="fade-in-up"
              style={{
                marginTop: 12, padding: "10px 14px",
                background: message.type === "error" ? "var(--red-light)" : "var(--green-light)",
                border: `1px solid ${message.type === "error" ? "rgba(220,38,38,.25)" : "rgba(22,163,74,.25)"}`,
                borderRadius: 10, color: message.type === "error" ? "var(--red)" : "var(--green)",
                fontSize: 13, display: "flex", gap: 7, alignItems: "center",
              }}
            >
              {message.type === "error" ? <AlertCircle size={14} /> : <Check size={14} />}
              {message.text}
            </div>
          )}

          {/* Posts list */}
          {loaded && (
            <div style={{ marginTop: 20 }}>
              {/* Filter tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 14, borderBottom: "1px solid var(--border)", paddingBottom: 10, flexWrap: "wrap" }}>
                {FILTERS.map(({ key, label }) => {
                  const count = key === "all" ? posts.length : posts.filter((p) => p.status === key).length;
                  return (
                    <button
                      key={key}
                      onClick={() => setFilter(key)}
                      style={{
                        padding: "6px 14px", borderRadius: 8, border: "none",
                        background: filter === key ? "var(--teal-light)" : "transparent",
                        color: filter === key ? "var(--teal-dark)" : "var(--slate-500)",
                        fontWeight: filter === key ? 600 : 500,
                        fontSize: 13, cursor: "pointer",
                        fontFamily: "'DM Sans',sans-serif",
                        transition: "all 0.18s",
                      }}
                    >
                      {label}{" "}
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        background: filter === key ? "var(--teal-dark)" : "var(--slate-200)",
                        color: filter === key ? "#fff" : "var(--slate-600)",
                        padding: "1px 7px", borderRadius: 20, marginLeft: 4,
                      }}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {filteredPosts.length === 0 && (
                <div className="card" style={{ padding: 28, textAlign: "center", color: "var(--slate-500)" }}>
                  No posts found for this filter.
                </div>
              )}

              <div style={{ display: "grid", gap: 12 }}>
                {filteredPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="card ad-post-card fade-in-up"
                    style={{ padding: "16px 18px" }}
                  >
                    <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
                      {/* Left: post info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
                          <StatusBadge status={post.status} />
                          {post.is_guest_post && (
                            <span style={{ fontSize: 11, fontWeight: 700, background: "var(--amber-light)", color: "var(--amber)", padding: "2px 8px", borderRadius: 20, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                              Guest
                            </span>
                          )}
                          <span style={{ fontSize: 12, color: "var(--slate-400)", display: "inline-flex", alignItems: "center", gap: 3 }}>
                            <TagIcon size={11} /> {post.category}
                          </span>
                          <span style={{ fontSize: 12, color: "var(--slate-400)", display: "inline-flex", alignItems: "center", gap: 3 }}>
                            <Calendar size={11} /> {formatDate(post.created_at)}
                          </span>
                        </div>

                        <h3 className="brig" style={{ fontSize: 18, letterSpacing: "-0.01em", lineHeight: 1.2, marginBottom: 6 }}>
                          {post.title}
                        </h3>

                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", fontSize: 13 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--slate-600)" }}>
                            <User size={12} /> {post.author}
                          </span>
                          {post.author_email && (
                            <span style={{ color: "var(--slate-400)", fontSize: 12 }}>
                              {post.author_email}
                            </span>
                          )}
                          <span style={{ color: "var(--slate-400)", fontSize: 12 }}>
                            {post.readTimeMinutes} min read
                          </span>
                        </div>

                        {post.excerpt && (
                          <p style={{ marginTop: 8, fontSize: 13.5, color: "var(--slate-500)", lineHeight: 1.7 }}>
                            {post.excerpt.length > 140 ? post.excerpt.slice(0, 140) + "…" : post.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Right: actions */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0, justifyContent: "center" }}>
                        {/* Preview */}
                        <button
                          className="btn-ghost"
                          onClick={() => setPreviewPost(post)}
                          style={{ fontSize: 13, gap: 5 }}
                        >
                          <Eye size={13} /> Preview
                        </button>

                        {/* Edit */}
                        <button
                          className="btn-ghost"
                          onClick={() => navigate(`/admin/blog/${encodeURIComponent(post.slug)}/edit`)}
                          disabled={actionLoading === post.slug}
                          style={{ fontSize: 13, gap: 5 }}
                        >
                          <Pencil size={13} /> Edit
                        </button>

                        {/* Publish / Unpublish */}
                        {post.status !== "published" ? (
                          post.status === "pending" ? (
                            // Guest submission: show Approve/Reject pair
                            <button
                              onClick={() => approve(post.slug)}
                              disabled={actionLoading === post.slug}
                              style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "8px 16px", borderRadius: 8, border: "none",
                                background: "var(--green-light)", color: "var(--green)",
                                fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
                                cursor: actionLoading === post.slug ? "not-allowed" : "pointer",
                                opacity: actionLoading === post.slug ? 0.6 : 1,
                                transition: "all 0.18s",
                              }}
                            >
                              {actionLoading === post.slug ? <Loader size={13} className="spin" /> : <Check size={13} />}
                              Approve
                            </button>
                          ) : (
                            // Draft / rejected: show Publish button
                            <button
                              onClick={() => publish(post.slug)}
                              disabled={actionLoading === post.slug}
                              style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "8px 16px", borderRadius: 8, border: "none",
                                background: "var(--green-light)", color: "var(--green)",
                                fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
                                cursor: actionLoading === post.slug ? "not-allowed" : "pointer",
                                opacity: actionLoading === post.slug ? 0.6 : 1,
                                transition: "all 0.18s",
                              }}
                            >
                              {actionLoading === post.slug ? <Loader size={13} className="spin" /> : <Globe size={13} />}
                              Publish
                            </button>
                          )
                        ) : (
                          // Published: show Unpublish button
                          <button
                            onClick={() => unpublish(post.slug)}
                            disabled={actionLoading === post.slug}
                            style={{
                              display: "flex", alignItems: "center", gap: 6,
                              padding: "8px 16px", borderRadius: 8, border: "none",
                              background: "var(--amber-light)", color: "var(--amber)",
                              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
                              cursor: actionLoading === post.slug ? "not-allowed" : "pointer",
                              opacity: actionLoading === post.slug ? 0.6 : 1,
                              transition: "all 0.18s",
                            }}
                          >
                            {actionLoading === post.slug ? <Loader size={13} className="spin" /> : <EyeOff size={13} />}
                            Unpublish
                          </button>
                        )}

                        {/* Reject (only for pending guest submissions) */}
                        {post.status === "pending" && (
                          <button
                            onClick={() => reject(post.slug)}
                            disabled={actionLoading === post.slug}
                            style={{
                              display: "flex", alignItems: "center", gap: 6,
                              padding: "8px 16px", borderRadius: 8, border: "none",
                              background: "var(--amber-light)", color: "var(--amber)",
                              fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
                              cursor: actionLoading === post.slug ? "not-allowed" : "pointer",
                              opacity: actionLoading === post.slug ? 0.6 : 1,
                              transition: "all 0.18s",
                            }}
                          >
                            {actionLoading === post.slug ? <Loader size={13} className="spin" /> : <X size={13} />}
                            Reject
                          </button>
                        )}

                        {/* Delete */}
                        <button
                          onClick={() => del(post.slug)}
                          disabled={actionLoading === post.slug}
                          style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "8px 16px", borderRadius: 8, border: "none",
                            background: "var(--red-light)", color: "var(--red)",
                            fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 600,
                            cursor: actionLoading === post.slug ? "not-allowed" : "pointer",
                            opacity: actionLoading === post.slug ? 0.6 : 1,
                            transition: "all 0.18s",
                          }}
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Preview modal */}
      {previewPost && (
        <ExpandedPost post={previewPost} onClose={() => setPreviewPost(null)} />
      )}
    </>
  );
}
