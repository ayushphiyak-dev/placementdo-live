// GET /api/blog/pending — Returns all pending submissions (admin token required).

const BLOG_KEY = "placementdo:blog:posts";
const ENV = globalThis.process?.env || {};

const send = (res, status, body) => res.status(status).json(body);

const hasAdminAccess = (req) => {
  const expected = ENV.BLOG_ADMIN_TOKEN;
  if (!expected) return false;
  const supplied =
    req.headers["x-admin-token"] ||
    req.headers.authorization?.replace(/^Bearer\s+/i, "");
  return typeof supplied === "string" && supplied === expected;
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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return send(res, 405, { error: "Method not allowed" });
  }

  if (!hasAdminAccess(req)) {
    return send(res, 401, { error: "Unauthorized" });
  }

  try {
    const posts = await loadPosts();
    const pending = posts
      .filter((p) => p.status === "pending")
      .sort((a, b) => new Date(b.created_at || b.publishedAt).getTime() - new Date(a.created_at || a.publishedAt).getTime())
      .map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        author: p.author,
        author_email: p.author_email,
        category: p.category,
        tags: p.tags,
        status: p.status,
        is_guest_post: p.is_guest_post,
        created_at: p.created_at || p.publishedAt,
        readTimeMinutes: p.readTimeMinutes,
        featured_image: p.featured_image,
      }));

    return send(res, 200, { posts: pending, total: pending.length });
  } catch {
    return send(res, 500, { error: "Failed to load pending submissions." });
  }
}
