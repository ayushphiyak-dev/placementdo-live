/**
 * AdminEditPost — admin-only form to edit an existing blog post.
 *
 * Access:
 *   Navigate to /admin/blog/:slug/edit. You must supply your BLOG_ADMIN_TOKEN
 *   (set as a Vercel environment variable) to load and save.
 *
 * Workflow:
 *   1. Enter your admin token and click "Load Post".
 *   2. The form is pre-filled with the existing post data.
 *   3. Edit any fields and click "Save Changes".
 *
 * Security:
 *   - The token is sent as the `x-admin-token` header and checked server-side.
 *   - Setting status to "published" requires BLOG_OWNER_TOKEN; posts saved as
 *     draft otherwise.
 */
import { useState, useCallback } from "react";
import {
  ShieldCheck,
  Save,
  Loader,
  Check,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

const today = () => new Date().toISOString().slice(0, 10);

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120)
    .replace(/^-|-$/g, "");

const STYLES = `
  .aep-page { min-height: 100vh; background: var(--slate-50); padding: 104px clamp(20px,5vw,60px) 72px; }
  .aep-inner { max-width: 780px; margin: 0 auto; }
  .aep-field { display: grid; gap: 6px; }
  .aep-field label { font-size: 13px; font-weight: 600; color: var(--slate-700); }
  .aep-field input, .aep-field textarea, .aep-field select {
    width: 100%; box-sizing: border-box;
    padding: 9px 12px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--white);
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    color: var(--slate-800); outline: none; transition: border-color 0.18s;
  }
  .aep-field input:focus, .aep-field textarea:focus, .aep-field select:focus {
    border-color: var(--teal-dark);
  }
  .aep-field input:disabled, .aep-field textarea:disabled, .aep-field select:disabled {
    background: var(--slate-50); color: var(--slate-400); cursor: not-allowed;
  }
  .aep-field textarea { resize: vertical; }
  .aep-hint { font-size: 12px; color: var(--slate-400); margin-top: 3px; }
  .aep-row { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
  @media (max-width: 600px) { .aep-row { grid-template-columns: 1fr; } }
`;

const EMPTY_FORM = {
  title: "",
  slug: "",
  date: today(),
  author: "PlacementDo Team",
  category: "General",
  tags: "",
  excerpt: "",
  content: "",
  status: "draft",
};

export default function AdminEditPost({ slug: originalSlug, onNav }) {
  const navigate = useCallback(
    (path) => {
      if (onNav) onNav(path);
      else window.location.href = path;
    },
    [onNav]
  );

  const [token, setToken] = useState("");
  const [form, setForm] = useState({ ...EMPTY_FORM, slug: originalSlug || "" });
  const [autoSlug, setAutoSlug] = useState(false); // don't auto-overwrite loaded slug
  const [loaded, setLoaded] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "success" });

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    if (type === "success") {
      window.setTimeout(() => setMessage({ text: "", type: "success" }), 6000);
    }
  };

  // Load the existing post data into the form (requires admin token)
  const loadPost = useCallback(async () => {
    if (!token.trim()) {
      showMessage("Please enter your admin token first.", "error");
      return;
    }
    if (!originalSlug) {
      showMessage("No post slug provided.", "error");
      return;
    }

    setLoadingPost(true);
    setMessage({ text: "", type: "success" });

    try {
      const res = await fetch(`/api/blog?slug=${encodeURIComponent(originalSlug)}`, {
        headers: { "x-admin-token": token.trim() },
      });
      const data = await res.json();

      if (!res.ok || !data?.post) {
        showMessage(data?.error || "Post not found or access denied.", "error");
        return;
      }

      const p = data.post;
      setForm({
        title: p.title || "",
        slug: p.slug || originalSlug,
        // Prefer the date part of publishedAt for the date input
        date: p.publishedAt ? p.publishedAt.slice(0, 10) : today(),
        author: p.author || "PlacementDo Team",
        category: p.category || "General",
        tags: Array.isArray(p.tags) ? p.tags.join(", ") : (p.tags || ""),
        excerpt: p.excerpt || "",
        content: p.content || "",
        status: p.status === "published" ? "published" : "draft",
      });
      setLoaded(true);
      showMessage("Post loaded — edit below and save.", "success");
    } catch (err) {
      showMessage(err?.message || "Network error — please try again.", "error");
    } finally {
      setLoadingPost(false);
    }
  }, [token, originalSlug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-generate slug from title only if the slug hasn't been manually edited
      if (name === "title" && autoSlug) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setAutoSlug(false);
    setForm((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token.trim()) {
      showMessage("Please enter your admin token.", "error");
      return;
    }
    if (!loaded) {
      showMessage("Please load the post first.", "error");
      return;
    }

    setSubmitting(true);
    setMessage({ text: "", type: "success" });

    try {
      const payload = {
        title: form.title.trim(),
        slug: slugify(form.slug) || slugify(form.title),
        publishedAt: form.date ? new Date(form.date).toISOString() : new Date().toISOString(),
        author: form.author.trim(),
        category: form.category.trim(),
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        status: form.status,
      };

      const res = await fetch(`/api/blog?slug=${encodeURIComponent(originalSlug)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token.trim(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data?.error || "Failed to save changes.", "error");
        return;
      }

      const warning = data?.warning ? ` Note: ${data.warning}` : "";
      showMessage(
        `Post "${data?.post?.title || payload.title}" saved successfully!${warning}`
      );

      // If the slug changed, update originalSlug in the URL and form
      if (data?.post?.slug && data.post.slug !== originalSlug) {
        navigate(`/admin/blog/${encodeURIComponent(data.post.slug)}/edit`);
      }
    } catch (err) {
      showMessage(err?.message || "Network error — please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

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
            style={{ fontSize: 17, fontWeight: 700, color: "var(--teal-dark)", letterSpacing: "-0.02em" }}
          >
            PlacementDo
          </span>
        </button>
        <div style={{ flex: 1 }} />
        <button className="btn-ghost" onClick={() => navigate("/blog")}>
          Blog <ChevronRight size={14} />
        </button>
        <button className="btn-ghost" onClick={() => navigate("/admin/blog")}>
          Admin <ChevronRight size={14} />
        </button>
      </header>

      <main className="aep-page">
        <div className="aep-inner">
          <button
            className="btn-ghost"
            style={{ paddingLeft: 0, marginBottom: 16 }}
            onClick={() => navigate("/admin/blog")}
          >
            <ArrowLeft size={15} /> Admin Dashboard
          </button>

          {/* Page header */}
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "var(--teal-light)",
                color: "var(--teal-dark)",
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 20,
                letterSpacing: "0.02em",
              }}
            >
              <ShieldCheck size={12} /> Admin Only
            </span>
            <h1
              className="brig"
              style={{ fontSize: "clamp(28px,5vw,40px)", letterSpacing: "-0.03em", marginTop: 10 }}
            >
              Edit Blog Post
            </h1>
            <p style={{ marginTop: 6, color: "var(--slate-500)", lineHeight: 1.8 }}>
              Enter your admin token and click <strong>Load Post</strong> to populate the form, then edit and save.
            </p>
            {originalSlug && (
              <p style={{ marginTop: 4, fontSize: 13, color: "var(--slate-400)" }}>
                Editing: <code style={{ background: "var(--slate-100)", padding: "2px 6px", borderRadius: 5 }}>/blog/{originalSlug}</code>
              </p>
            )}
          </div>

          {/* Status message */}
          {message.text && (
            <div
              style={{
                marginBottom: 20,
                padding: "10px 14px",
                background: message.type === "error" ? "var(--red-light)" : "var(--green-light)",
                border: `1px solid ${message.type === "error" ? "rgba(220,38,38,.25)" : "rgba(22,163,74,.25)"}`,
                borderRadius: 10,
                color: message.type === "error" ? "var(--red)" : "var(--green)",
                fontSize: 13,
                display: "flex",
                gap: 7,
                alignItems: "flex-start",
              }}
            >
              {message.type === "error"
                ? <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                : <Check size={14} style={{ flexShrink: 0, marginTop: 1 }} />}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card" style={{ padding: "24px 28px", display: "grid", gap: 20 }}>
            {/* Admin token + load */}
            <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr auto" }}>
              <div className="aep-field">
                <label htmlFor="aep-token">
                  Admin Token <span style={{ color: "var(--red)" }}>*</span>
                </label>
                <input
                  id="aep-token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Paste your BLOG_ADMIN_TOKEN here"
                  autoComplete="off"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); loadPost(); } }}
                  required
                />
                <p className="aep-hint">
                  Token is sent as <code>x-admin-token</code> header and verified server-side.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 22 }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={loadPost}
                  disabled={loadingPost || !token}
                  style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 7 }}
                >
                  {loadingPost
                    ? <><Loader size={14} className="spin" /> Loading…</>
                    : <><RefreshCw size={14} /> Load Post</>}
                </button>
              </div>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

            {/* Title */}
            <div className="aep-field">
              <label htmlFor="aep-title">Title <span style={{ color: "var(--red)" }}>*</span></label>
              <input
                id="aep-title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. How to Ace Your System Design Interview"
                disabled={!loaded}
                required
              />
            </div>

            {/* Slug */}
            <div className="aep-field">
              <label htmlFor="aep-slug">Slug <span style={{ color: "var(--red)" }}>*</span></label>
              <input
                id="aep-slug"
                name="slug"
                value={form.slug}
                onChange={handleSlugChange}
                placeholder="e.g. how-to-ace-system-design-interview"
                disabled={!loaded}
                required
              />
              <p className="aep-hint">
                URL: /blog/<strong>{form.slug || "your-slug"}</strong>
                {form.slug !== originalSlug && originalSlug && (
                  <span style={{ color: "var(--amber)", marginLeft: 6 }}>
                    (slug will change — old URL may 404)
                  </span>
                )}
              </p>
            </div>

            <div className="aep-row">
              {/* Date */}
              <div className="aep-field">
                <label htmlFor="aep-date">Publish Date <span style={{ color: "var(--red)" }}>*</span></label>
                <input
                  id="aep-date"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  disabled={!loaded}
                  required
                />
              </div>

              {/* Author */}
              <div className="aep-field">
                <label htmlFor="aep-author">Author <span style={{ color: "var(--red)" }}>*</span></label>
                <input
                  id="aep-author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="e.g. PlacementDo Team"
                  disabled={!loaded}
                  required
                />
              </div>
            </div>

            <div className="aep-row">
              {/* Category */}
              <div className="aep-field">
                <label htmlFor="aep-category">Category</label>
                <input
                  id="aep-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Interview Tips"
                  disabled={!loaded}
                />
              </div>

              {/* Tags */}
              <div className="aep-field">
                <label htmlFor="aep-tags">Tags</label>
                <input
                  id="aep-tags"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="e.g. interview-prep, system-design"
                  disabled={!loaded}
                />
                <p className="aep-hint">Comma-separated list of tags.</p>
              </div>
            </div>

            {/* Status */}
            <div className="aep-field">
              <label htmlFor="aep-status">Status</label>
              <select
                id="aep-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={!loaded}
              >
                <option value="published">Published (visible to all)</option>
                <option value="draft">Draft (admin-only)</option>
              </select>
              <p className="aep-hint">
                Requires <code>BLOG_OWNER_TOKEN</code> to publish directly. If only{" "}
                <code>BLOG_ADMIN_TOKEN</code> is configured, posts are saved as drafts.
              </p>
            </div>

            {/* Excerpt */}
            <div className="aep-field">
              <label htmlFor="aep-excerpt">Excerpt <span style={{ color: "var(--red)" }}>*</span></label>
              <textarea
                id="aep-excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="A short, compelling summary shown on the blog listing page."
                disabled={!loaded}
                required
              />
            </div>

            {/* Content */}
            <div className="aep-field">
              <label htmlFor="aep-content">Content <span style={{ color: "var(--red)" }}>*</span></label>
              <textarea
                id="aep-content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={16}
                placeholder={"Supports plain text and light Markdown:\n# Heading 1\n## Heading 2\n- list item\n```code block```"}
                disabled={!loaded}
                required
              />
              <p className="aep-hint">
                Supports plain text. Light Markdown: <code># Heading</code>, <code>- list</code>,{" "}
                <code>```code```</code>.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", paddingTop: 4 }}>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => navigate("/admin/blog")}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={submitting || !loaded}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                {submitting ? (
                  <><Loader size={15} className="spin" /> Saving…</>
                ) : (
                  <><Save size={15} /> Save Changes</>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
