import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import {
  PenLine,
  CheckCircle2,
  AlertCircle,
  Loader,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const CATEGORIES = [
  "Interview Tips",
  "Product Updates",
  "Career Advice",
  "Technical Interview",
  "Behavioural Interview",
  "Job Search",
  "Salary Negotiation",
  "Resume & CV",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CONTENT = 50000;
const MAX_TITLE = 300;

// Encode HTML special characters in short metadata fields before submitting
// to prevent stored XSS. Content is stored as plain text and rendered
// safely by React's automatic escaping on the display side.
const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();

const validate = (fields) => {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Name is required";
  else if (fields.name.trim().length > 120) errors.name = "Name must be 120 characters or fewer";

  if (!fields.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_RE.test(fields.email.trim())) errors.email = "Must be a valid email address";

  if (!fields.title.trim()) errors.title = "Blog title is required";
  else if (fields.title.trim().length > MAX_TITLE) errors.title = `Title must be ${MAX_TITLE} characters or fewer`;

  if (!fields.content.trim()) errors.content = "Content is required";
  else if (fields.content.trim().length > MAX_CONTENT) errors.content = `Content must be ${MAX_CONTENT} characters or fewer`;

  if (!fields.category) errors.category = "Please select a category";

  if (fields.featured_image.trim()) {
    try {
      const url = new URL(fields.featured_image.trim());
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        errors.featured_image = "Must be a valid http/https URL";
      }
    } catch {
      errors.featured_image = "Must be a valid URL";
    }
  }
  return errors;
};

const EMPTY_FORM = {
  name: "",
  email: "",
  title: "",
  content: "",
  category: "",
  featured_image: "",
};

export default function GuestSubmission({ onNav }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const errors = validate(form);
  const visibleErrors = Object.fromEntries(
    Object.entries(errors).filter(([k]) => touched[k])
  );

  const set = useCallback((field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  }, []);

  const touch = useCallback((field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mark all fields as touched to show all errors
    setTouched({ name: true, email: true, title: true, content: true, category: true, featured_image: true });
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setServerError("");

    try {
      const payload = {
        name: escapeHtml(form.name.trim()),
        email: form.email.trim(),
        blog_title: escapeHtml(form.title.trim()),
        content: form.content.trim(), // plain text, safe via React auto-escaping at render time
        category: escapeHtml(form.category),
        featured_image: form.featured_image.trim(),
      };

      const r = await fetch("/api/blog/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Submission failed. Please try again.");
      setSuccess(true);
    } catch (err) {
      setServerError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setTouched({});
    setSuccess(false);
    setServerError("");
  };

  const navigate = (path) => {
    if (onNav) {
      onNav(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <>
      <style>{`
        .gs-page { min-height: 100vh; background: var(--slate-50); padding: 104px clamp(20px,5vw,60px) 72px; }
        .gs-inner { max-width: 760px; margin: 0 auto; }
        .gs-field-error { color: var(--red); font-size: 12px; margin-top: 5px; display: flex; align-items: center; gap: 4px; }
        .gs-field-success { border-color: var(--green) !important; }
        .gs-field-invalid { border-color: var(--red) !important; box-shadow: 0 0 0 3px rgba(220,38,38,.10) !important; }
        .gs-char-count { font-size: 11px; color: var(--slate-400); text-align: right; margin-top: 4px; }
        .gs-char-count.warn { color: var(--amber); }
        .gs-char-count.over { color: var(--red); font-weight: 600; }
      `}</style>

      {/* Minimal nav header */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,250,248,.96)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        height: 64, display: "flex", alignItems: "center",
        padding: "0 clamp(20px,5vw,60px)",
        gap: 16,
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

      <main className="gs-page">
        <div className="gs-inner">
          <button className="btn-ghost" style={{ paddingLeft: 0, marginBottom: 16 }} onClick={() => navigate("/blog")}>
            <ArrowLeft size={15} /> Back to blog
          </button>

          {/* Tag */}
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--teal-light)", color: "var(--teal-dark)",
            fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20,
            letterSpacing: "0.02em",
          }}>
            <PenLine size={12} /> Write For Us
          </span>

          <h1 className="brig" style={{ fontSize: "clamp(28px,5vw,44px)", letterSpacing: "-0.03em", marginTop: 10 }}>
            Share your expertise
          </h1>
          <p style={{ marginTop: 8, color: "var(--slate-500)", lineHeight: 1.8, maxWidth: 640 }}>
            Have interview tips, career advice, or a story to share? Submit your guest post — our team reviews every submission within 2–3 business days.
          </p>

          <AnimatePresence mode="wait">
            {success ? (
              <div
                key="success"
                className="card fade-in-up"
                style={{ marginTop: 28, padding: 32, textAlign: "center" }}
              >
                <CheckCircle2 size={48} style={{ color: "var(--green)", marginBottom: 16 }} />
                <h2 className="brig" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>Submission received!</h2>
                <p style={{ marginTop: 10, color: "var(--slate-500)", lineHeight: 1.8 }}>
                  Thank you for contributing to the PlacementDo blog. Our editorial team will review your post and get back to you within 2–3 business days.
                </p>
                <div style={{ marginTop: 22, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <button className="btn-primary" onClick={handleReset}>Submit another post</button>
                  <button className="btn-secondary" onClick={() => navigate("/blog")}>View the blog</button>
                </div>
              </div>
            ) : (
              <form
                key="form"
                className="card fade-in-up"
                style={{ marginTop: 28, padding: "28px 28px", display: "grid", gap: 18 }}
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Author info row */}
                <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
                  <div>
                    <label htmlFor="gs-name">Your name *</label>
                    <input
                      id="gs-name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      onBlur={() => touch("name")}
                      placeholder="Jane Smith"
                      className={touched.name ? (visibleErrors.name ? "gs-field-invalid" : "gs-field-success") : ""}
                      autoComplete="name"
                    />
                    {visibleErrors.name && (
                      <div className="gs-field-error"><AlertCircle size={11} /> {visibleErrors.name}</div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="gs-email">Email address *</label>
                    <input
                      id="gs-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      onBlur={() => touch("email")}
                      placeholder="jane@example.com"
                      className={touched.email ? (visibleErrors.email ? "gs-field-invalid" : "gs-field-success") : ""}
                      autoComplete="email"
                    />
                    {visibleErrors.email && (
                      <div className="gs-field-error"><AlertCircle size={11} /> {visibleErrors.email}</div>
                    )}
                    <div style={{ fontSize: 11, color: "var(--slate-400)", marginTop: 4 }}>
                      Not shown publicly — used only for communication.
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label htmlFor="gs-title">Blog title *</label>
                  <input
                    id="gs-title"
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    onBlur={() => touch("title")}
                    placeholder="5 Things I Wish I Knew Before My Google Interview"
                    className={touched.title ? (visibleErrors.title ? "gs-field-invalid" : "gs-field-success") : ""}
                  />
                  <div className={`gs-char-count ${form.title.length > MAX_TITLE ? "over" : form.title.length > MAX_TITLE * 0.85 ? "warn" : ""}`}>
                    {form.title.length} / {MAX_TITLE}
                  </div>
                  {visibleErrors.title && (
                    <div className="gs-field-error"><AlertCircle size={11} /> {visibleErrors.title}</div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="gs-category">Category *</label>
                  <select
                    id="gs-category"
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    onBlur={() => touch("category")}
                    className={touched.category ? (visibleErrors.category ? "gs-field-invalid" : "gs-field-success") : ""}
                  >
                    <option value="">Select a category…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {visibleErrors.category && (
                    <div className="gs-field-error"><AlertCircle size={11} /> {visibleErrors.category}</div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label htmlFor="gs-content">Content *</label>
                  <textarea
                    id="gs-content"
                    value={form.content}
                    onChange={(e) => set("content", e.target.value)}
                    onBlur={() => touch("content")}
                    rows={14}
                    placeholder={"Start writing your post…\n\nYou can use markdown-style formatting:\n# Heading 1\n## Heading 2\n- Bullet point\n```code block```"}
                    className={touched.content ? (visibleErrors.content ? "gs-field-invalid" : "gs-field-success") : ""}
                    style={{ fontFamily: "'JetBrains Mono', 'DM Sans', monospace", fontSize: 14, lineHeight: 1.7 }}
                  />
                  <div className={`gs-char-count ${form.content.length > MAX_CONTENT ? "over" : form.content.length > MAX_CONTENT * 0.9 ? "warn" : ""}`}>
                    {form.content.length.toLocaleString()} / {MAX_CONTENT.toLocaleString()} characters
                  </div>
                  {visibleErrors.content && (
                    <div className="gs-field-error"><AlertCircle size={11} /> {visibleErrors.content}</div>
                  )}
                </div>

                {/* Featured image (optional) */}
                <div>
                  <label htmlFor="gs-image">Featured image URL <span style={{ fontWeight: 400, textTransform: "none", color: "var(--slate-400)" }}>(optional)</span></label>
                  <input
                    id="gs-image"
                    type="url"
                    value={form.featured_image}
                    onChange={(e) => set("featured_image", e.target.value)}
                    onBlur={() => touch("featured_image")}
                    placeholder="https://example.com/my-cover-image.jpg"
                    className={touched.featured_image && visibleErrors.featured_image ? "gs-field-invalid" : ""}
                  />
                  {visibleErrors.featured_image && (
                    <div className="gs-field-error"><AlertCircle size={11} /> {visibleErrors.featured_image}</div>
                  )}
                </div>

                {/* Server error */}
                {serverError && (
                  <div
                    className="fade-in-up"
                    style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "12px 14px", background: "var(--red-light)", border: "1px solid rgba(220,38,38,.25)", borderRadius: 10, color: "var(--red)", fontSize: 13 }}
                  >
                    <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                    {serverError}
                  </div>
                )}

                {/* Disclaimer */}
                <p style={{ fontSize: 12, color: "var(--slate-400)", lineHeight: 1.7, margin: 0 }}>
                  By submitting, you confirm this is original content you own. Your email will not be displayed publicly and is used only for communication about your submission.
                </p>

                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                  style={{ justifyContent: "center", fontSize: 15, padding: "13px 28px" }}
                >
                  {loading ? (
                    <><Loader size={16} className="spin" /> Submitting…</>
                  ) : (
                    <>Submit post for review <ChevronRight size={15} /></>
                  )}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}
