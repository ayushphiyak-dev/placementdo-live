// PUT /api/blog/reject?slug=xyz — Rejects a pending submission (admin token required).
// Sets status to "rejected".

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

const savePosts = async (posts) => {
  if (isKvConfigured()) {
    await kvCommand(["SET", BLOG_KEY, JSON.stringify(posts)]);
    return;
  }
  globalThis.__PLACEMENTDO_BLOG_POSTS__ = posts;
};

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return send(res, 405, { error: "Method not allowed" });
  }

  if (!hasAdminAccess(req)) {
    return send(res, 401, { error: "Unauthorized" });
  }

  const slug = typeof req.query?.slug === "string" ? req.query.slug : "";
  if (!slug) {
    return send(res, 400, { error: "slug query parameter is required" });
  }

  try {
    const posts = await loadPosts();
    const idx = posts.findIndex((p) => p.slug === slug);
    if (idx === -1) return send(res, 404, { error: "Post not found" });

    const updated = {
      ...posts[idx],
      status: "rejected",
      updatedAt: new Date().toISOString(),
    };

    const next = [...posts];
    next[idx] = updated;
    await savePosts(next);

    return send(res, 200, {
      success: true,
      message: `Post "${slug}" has been rejected.`,
      slug,
    });
  } catch {
    return send(res, 500, { error: "Failed to reject submission." });
  }
}
