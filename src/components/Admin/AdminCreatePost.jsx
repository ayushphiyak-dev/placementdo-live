/**
 * AdminCreatePost — admin-only form to create new blog posts.
 *
 * Access:
 *   Navigate to /admin/blog/new. You must supply your BLOG_ADMIN_TOKEN
 *   (set as a Vercel environment variable) to authenticate.
 *
 * Security:
 *   - The token is sent as the `x-admin-token` header and checked
 *     server-side in api/blog.js. Client-side checks are supplementary.
 *   - Normal visitors never see this page in the public blog listing.
 *
 * After submitting, the new post is stored in KV (if configured) or
 * in-memory and immediately appears on the /blog listing page.
 */
import { useState, useCallback } from "react";
import {
  ShieldCheck,
  PlusCircle,
  Loader,
  Check,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { getSessionToken, setSessionToken } from "./adminSession.js";

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
  .acp-page { min-height: 100vh; background: var(--slate-50); padding: 104px clamp(20px,5vw,60px) 72px; }
  .acp-inner { max-width: 780px; margin: 0 auto; }
  .acp-field { display: grid; gap: 6px; }
  .acp-field label { font-size: 13px; font-weight: 600; color: var(--slate-700); }
  .acp-field input, .acp-field textarea, .acp-field select {
    width: 100%; box-sizing: border-box;
    padding: 9px 12px; border-radius: 8px;
    border: 1px solid var(--border); background: var(--white);
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    color: var(--slate-800); outline: none; transition: border-color 0.18s;
  }
  .acp-field input:focus, .acp-field textarea:focus, .acp-field select:focus {
    border-color: var(--teal-dark);
  }
  .acp-field textarea { resize: vertical; }
  .acp-hint { font-size: 12px; color: var(--slate-400); margin-top: 3px; }
  .acp-row { display: grid; gap: 16px; grid-template-columns: 1fr 1fr; }
  @media (max-width: 600px) { .acp-row { grid-template-columns: 1fr; } }
`;

export default function AdminCreatePost({ onNav }) {
  const navigate = useCallback(
    (path) => {
      if (onNav) onNav(path);
      else window.location.href = path;
    },
    [onNav]
  );

  const [token, setToken] = useState(() => getSessionToken());
  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: today(),
    author: "PlacementDo Team",
    category: "General",
    tags: "",
    excerpt: "",
    content: "",
    status: "published",
    coverImage: "",
  });
  const [autoSlug, setAutoSlug] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "success" });

  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    if (type === "success") {
      window.setTimeout(() => setMessage({ text: "", type: "success" }), 6000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-generate slug from title when the slug field has not been manually edited
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
        coverImage: form.coverImage.trim(),
      };

      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token.trim(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data?.error || "Failed to create post.", "error");
        return;
      }

      // Persist valid token for the rest of the session
      setSessionToken(token.trim());

      const warning = data?.warning ? ` Note: ${data.warning}` : "";
      showMessage(
        `Post "${data?.post?.title || payload.title}" created successfully!${warning}`
      );

      // Reset form
      setForm({
        title: "",
        slug: "",
        date: today(),
        author: "PlacementDo Team",
        category: "General",
        tags: "",
        excerpt: "",
        content: "",
        status: "published",
        coverImage: "",
      });
      setAutoSlug(true);
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

      <main className="acp-page">
        <div className="acp-inner">
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
              Create New Blog Post
            </h1>
            <p style={{ marginTop: 6, color: "var(--slate-500)", lineHeight: 1.8 }}>
              Fill in the form below and submit with your admin token. The post will appear on
              the public blog listing immediately after creation.
            </p>
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
              {message.type === "error" ? <AlertCircle size={14} style={{ flexShrink: 0, marginTop: 1 }} /> : <Check size={14} style={{ flexShrink: 0, marginTop: 1 }} />}
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="card" style={{ padding: "24px 28px", display: "grid", gap: 20 }}>
            {/* Admin token */}
            <div className="acp-field">
              <label htmlFor="acp-token">Admin Token <span style={{ color: "var(--red)" }}>*</span></label>
              <input
                id="acp-token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Paste your BLOG_ADMIN_TOKEN here"
                autoComplete="off"
                required
              />
              <p className="acp-hint">
                Token is sent as <code>x-admin-token</code> header and verified server-side. It is never stored in the browser.
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

            {/* Title */}
            <div className="acp-field">
              <label htmlFor="acp-title">Title <span style={{ color: "var(--red)" }}>*</span></label>
              <input
                id="acp-title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. How to Ace Your System Design Interview"
                required
              />
            </div>

            {/* Slug */}
            <div className="acp-field">
              <label htmlFor="acp-slug">Slug <span style={{ color: "var(--red)" }}>*</span></label>
              <input
                id="acp-slug"
                name="slug"
                value={form.slug}
                onChange={handleSlugChange}
                placeholder="e.g. how-to-ace-system-design-interview"
                required
              />
              <p className="acp-hint">Auto-generated from the title. Edit to customise the URL: /blog/<strong>{form.slug || "your-slug"}</strong></p>
            </div>

            <div className="acp-row">
              {/* Date */}
              <div className="acp-field">
                <label htmlFor="acp-date">Publish Date <span style={{ color: "var(--red)" }}>*</span></label>
                <input
                  id="acp-date"
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Author */}
              <div className="acp-field">
                <label htmlFor="acp-author">Author <span style={{ color: "var(--red)" }}>*</span></label>
                <input
                  id="acp-author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="e.g. PlacementDo Team"
                  required
                />
              </div>
            </div>

            <div className="acp-row">
              {/* Category */}
              <div className="acp-field">
                <label htmlFor="acp-category">Category</label>
                <input
                  id="acp-category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="e.g. Interview Tips"
                />
              </div>

              {/* Tags */}
              <div className="acp-field">
                <label htmlFor="acp-tags">Tags</label>
                <input
                  id="acp-tags"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="e.g. interview-prep, system-design"
                />
                <p className="acp-hint">Comma-separated list of tags.</p>
              </div>
            </div>

            {/* Cover image */}
            <div className="acp-field">
              <label htmlFor="acp-cover">Cover Image URL</label>
              <input
                id="acp-cover"
                name="coverImage"
                type="url"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/cover.jpg"
              />
              <p className="acp-hint">Optional. Use an https:// URL. Displayed at the top of the post and in listing cards.</p>
            </div>

            {/* Status */}
            <div className="acp-field">
              <label htmlFor="acp-status">Status</label>
              <select id="acp-status" name="status" value={form.status} onChange={handleChange}>
                <option value="published">Published (visible to all)</option>
                <option value="draft">Draft (admin-only)</option>
              </select>
              <p className="acp-hint">
                Requires <code>BLOG_OWNER_TOKEN</code> to publish directly. If only <code>BLOG_ADMIN_TOKEN</code> is
                configured, posts are saved as drafts until an owner promotes them.
              </p>
            </div>

            {/* Excerpt */}
            <div className="acp-field">
              <label htmlFor="acp-excerpt">Excerpt <span style={{ color: "var(--red)" }}>*</span></label>
              <textarea
                id="acp-excerpt"
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="A short, compelling summary shown on the blog listing page (1–2 sentences)."
                required
              />
            </div>

            {/* Content */}
            <div className="acp-field">
              <label htmlFor="acp-content">Content <span style={{ color: "var(--red)" }}>*</span></label>
              <textarea
                id="acp-content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={16}
                placeholder={"Supports plain text and light Markdown:\n# Heading 1\n## Heading 2\n- list item\n```code block```"}
                required
              />
              <p className="acp-hint">
                Supports plain text. Light Markdown supported: <code># Heading</code>, <code>- list</code>,{" "}
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
                disabled={submitting}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                {submitting ? (
                  <>
                    <Loader size={15} className="spin" /> Publishing…
                  </>
                ) : (
                  <>
                    <PlusCircle size={15} /> Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
