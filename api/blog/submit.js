// POST /api/blog/submit — Public guest submission (no auth required).
// Saves post as status: "pending" for admin review.

const BLOG_KEY = "placementdo:blog:posts";
const ENV = globalThis.process?.env || {};

const MAX_TAGS = 8;
const AVERAGE_WORDS_PER_MINUTE = 220;
const MAX_CONTENT_LENGTH = 50000;
const MAX_TITLE_LENGTH = 300;
const MAX_AUTHOR_LENGTH = 120;
const MAX_CATEGORY_LENGTH = 80;
const MAX_IMAGE_URL_LENGTH = 2048;

const send = (res, status, body) => res.status(status).json(body);

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120)
    .replace(/^-|-$/g, "");

const createUniqueSlug = (base, posts) => {
  if (!base) return "";
  const taken = posts.map((p) => p.slug);
  if (!taken.includes(base)) return base;
  let counter = 2;
  while (taken.includes(`${base}-${counter}`)) counter += 1;
  return `${base}-${counter}`;
};

const normalizeText = (value, fallback = "") =>
  typeof value === "string" && value.trim() ? value.trim() : fallback;

const normalizeTags = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean)
      .slice(0, MAX_TAGS);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, MAX_TAGS);
  }
  return [];
};

const estimateReadTime = (content = "") => {
  const words = normalizeText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / AVERAGE_WORDS_PER_MINUTE));
};

// Escape HTML special characters in short text fields (title, author name, category)
// to prevent stored XSS. Blog content is stored as plain text and rendered safely
// by React's automatic escaping — do NOT apply this to the content field.
const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();

const isValidEmail = (value = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const isSafeUrl = (value = "") => {
  if (!value) return true; // optional field
  try {
    const url = new URL(value);
    // Block javascript:, data:, vbscript: and any other non-http(s) schemes
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

const isKvConfigured = () =>
  Boolean(ENV.KV_REST_API_URL && ENV.KV_REST_API_TOKEN);

const kvCommand = async (command) => {
  const url = `${ENV.KV_REST_API_URL}/pipeline`;
  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ENV.KV_REST_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command]),
  });
  if (!r.ok) throw new Error("KV request failed");
  const data = await r.json();
  return data?.[0]?.result;
};

const loadPosts = async () => {
  if (isKvConfigured()) {
    try {
      const value = await kvCommand(["GET", BLOG_KEY]);
      if (typeof value === "string") {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // fall through to in-memory
    }
  }
  if (!globalThis.__PLACEMENTDO_BLOG_POSTS__) {
    globalThis.__PLACEMENTDO_BLOG_POSTS__ = [];
  }
  return [...globalThis.__PLACEMENTDO_BLOG_POSTS__];
};

const savePosts = async (posts) => {
  if (isKvConfigured()) {
    await kvCommand(["SET", BLOG_KEY, JSON.stringify(posts)]);
    return;
  }
  globalThis.__PLACEMENTDO_BLOG_POSTS__ = posts;
};

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
};

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return send(res, 405, { error: "Method not allowed" });
  }

  const body = parseBody(req);

  // Extract and sanitize fields
  // escapeHtml is applied to short metadata fields; content is stored as-is
  // (plain text) and rendered safely by React's automatic HTML escaping.
  const authorName = escapeHtml(normalizeText(body.author_name || body.name, ""));
  const authorEmail = normalizeText(body.author_email || body.email, "");
  const title = escapeHtml(normalizeText(body.title || body.blog_title, ""));
  const rawContent = normalizeText(body.content, "");
  const category = escapeHtml(normalizeText(body.category, ""));
  const featuredImage = normalizeText(body.featured_image, "");

  // Validate required fields
  const errors = [];
  if (!authorName) errors.push("name is required");
  if (authorName.length > MAX_AUTHOR_LENGTH) errors.push(`name must be ${MAX_AUTHOR_LENGTH} characters or fewer`);
  if (!authorEmail) errors.push("email is required");
  if (!isValidEmail(authorEmail)) errors.push("email must be a valid email address");
  if (!title) errors.push("blog title is required");
  if (title.length > MAX_TITLE_LENGTH) errors.push(`title must be ${MAX_TITLE_LENGTH} characters or fewer`);
  if (!rawContent) errors.push("content is required");
  if (rawContent.length > MAX_CONTENT_LENGTH) errors.push(`content must be ${MAX_CONTENT_LENGTH} characters or fewer`);
  if (!category) errors.push("category is required");
  if (category.length > MAX_CATEGORY_LENGTH) errors.push(`category must be ${MAX_CATEGORY_LENGTH} characters or fewer`);
  if (featuredImage && featuredImage.length > MAX_IMAGE_URL_LENGTH) errors.push(`featured image URL must be ${MAX_IMAGE_URL_LENGTH} characters or fewer`);
  if (featuredImage && !isSafeUrl(featuredImage)) errors.push("featured image must be a valid http/https URL");

  if (errors.length > 0) {
    return send(res, 400, { error: errors.join("; ") });
  }

  try {
    const posts = await loadPosts();

    // Generate a unique slug from title
    const baseSlug = slugify(title);
    if (!baseSlug) return send(res, 400, { error: "Invalid title — could not generate slug" });
    const slug = createUniqueSlug(baseSlug, posts);

    const now = new Date().toISOString();
    const excerpt = rawContent.replace(/#+\s+/g, "").replace(/[-*]\s+/g, "").replace(/\n+/g, " ").trim().slice(0, 160);

    const newPost = {
      slug,
      title,
      excerpt,
      content: rawContent,
      featured_image: featuredImage || "",
      author: authorName,
      author_email: authorEmail,
      category,
      tags: normalizeTags(body.tags),
      status: "pending",
      is_guest_post: true,
      created_at: now,
      // publishedAt is null until the admin approves the submission
      publishedAt: null,
      published_at: null,
      updatedAt: now,
      readTimeMinutes: estimateReadTime(rawContent),
    };

    await savePosts([...posts, newPost]);

    return send(res, 201, {
      success: true,
      message: "Your submission has been received and is pending admin review. Thank you!",
      slug,
    });
  } catch {
    return send(res, 500, { error: "Failed to save submission. Please try again." });
  }
}
