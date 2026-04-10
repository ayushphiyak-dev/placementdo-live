const BLOG_KEY = "placementdo:blog:posts";
const ENV = globalThis.process?.env || {};

const DEFAULT_POSTS = [
  {
    slug: "welcome-to-placementdo-blog",
    title: "Welcome to the PlacementDo Blog",
    excerpt:
      "Get practical interview prep strategies, product updates, and behind-the-scenes improvements from the PlacementDo team.",
    content:
      "Welcome to the official PlacementDo blog.\n\nThis space is where we share practical interview preparation strategies, feature announcements, and product updates.\n\nWe will publish actionable guidance for candidates preparing for technical and behavioral interviews across top companies.",
    publishedAt: "2026-04-10T00:00:00.000Z",
    updatedAt: "2026-04-10T00:00:00.000Z",
    status: "published",
  },
];

const send = (res, status, body) => {
  res.status(status).json(body);
};

const slugify = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120)
    .replace(/^-|-$/g, "");

const createUniqueSlug = (base, posts, skipIndex = -1) => {
  if (!base) return "";
  const taken = posts
    .filter((_, idx) => idx !== skipIndex)
    .map((post) => post.slug);
  if (!taken.includes(base)) return base;
  let counter = 2;
  while (taken.includes(`${base}-${counter}`)) counter += 1;
  return `${base}-${counter}`;
};

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (error) {
      void error;
      return {};
    }
  }
  return req.body;
};

const hasAdminAccess = (req) => {
  const expected = ENV.BLOG_ADMIN_TOKEN;
  if (!expected) return false;
  const supplied = req.headers["x-admin-token"] || req.headers.authorization?.replace(/^Bearer\s+/i, "");
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
    } catch (error) {
      void error;
    }
  }

  if (!globalThis.__PLACEMENTDO_BLOG_POSTS__) {
    globalThis.__PLACEMENTDO_BLOG_POSTS__ = [...DEFAULT_POSTS];
  }
  return globalThis.__PLACEMENTDO_BLOG_POSTS__;
};

const savePosts = async (posts) => {
  if (isKvConfigured()) {
    await kvCommand(["SET", BLOG_KEY, JSON.stringify(posts)]);
    return;
  }
  globalThis.__PLACEMENTDO_BLOG_POSTS__ = posts;
};

const summarize = (post) => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt,
  status: post.status,
});

export default async function handler(req, res) {
  const posts = await loadPosts();
  const isAdmin = hasAdminAccess(req);

  if (req.method === "GET") {
    const slug = typeof req.query?.slug === "string" ? req.query.slug : "";
    const visiblePosts = posts
      .filter((post) => isAdmin || post.status === "published")
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (slug) {
      const post = visiblePosts.find((item) => item.slug === slug);
      if (!post) return send(res, 404, { error: "Post not found" });
      return send(res, 200, { post });
    }

    return send(res, 200, { posts: isAdmin ? visiblePosts : visiblePosts.map(summarize) });
  }

  if (!isAdmin) {
    return send(res, 401, { error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const body = parseBody(req);
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
    const content = typeof body.content === "string" ? body.content.trim() : "";
    const requestedSlug = typeof body.slug === "string" ? slugify(body.slug) : "";
    const status = body.status === "draft" ? "draft" : "published";

    if (!title || !excerpt || !content) {
      return send(res, 400, { error: "title, excerpt and content are required" });
    }

    let slug = requestedSlug || slugify(title);
    if (!slug) return send(res, 400, { error: "Invalid title/slug" });
    slug = createUniqueSlug(slug, posts);

    const now = new Date().toISOString();
    const publishedAt = typeof body.publishedAt === "string" && body.publishedAt ? body.publishedAt : now;
    const next = [{ slug, title, excerpt, content, publishedAt, updatedAt: now, status }, ...posts];
    await savePosts(next);
    return send(res, 201, { post: next[0] });
  }

  if (req.method === "PUT") {
    const body = parseBody(req);
    const targetSlug = typeof req.query?.slug === "string" ? req.query.slug : "";
    if (!targetSlug) return send(res, 400, { error: "slug query parameter is required" });

    const idx = posts.findIndex((post) => post.slug === targetSlug);
    if (idx === -1) return send(res, 404, { error: "Post not found" });

    const prev = posts[idx];
    const title = typeof body.title === "string" ? body.title.trim() : prev.title;
    const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : prev.excerpt;
    const content = typeof body.content === "string" ? body.content.trim() : prev.content;
    const status = body.status === "draft" ? "draft" : body.status === "published" ? "published" : prev.status;
    const requestedSlug = typeof body.slug === "string" ? slugify(body.slug) : prev.slug;
    const nextSlug = createUniqueSlug(requestedSlug, posts, idx);

    if (!title || !excerpt || !content || !requestedSlug || !nextSlug) {
      return send(res, 400, { error: "Invalid update payload" });
    }

    const updated = {
      ...prev,
      slug: nextSlug,
      title,
      excerpt,
      content,
      status,
      publishedAt: typeof body.publishedAt === "string" && body.publishedAt ? body.publishedAt : prev.publishedAt,
      updatedAt: new Date().toISOString(),
    };

    const next = [...posts];
    next[idx] = updated;
    await savePosts(next);
    return send(res, 200, { post: updated });
  }

  if (req.method === "DELETE") {
    const targetSlug = typeof req.query?.slug === "string" ? req.query.slug : "";
    if (!targetSlug) return send(res, 400, { error: "slug query parameter is required" });
    const next = posts.filter((post) => post.slug !== targetSlug);
    if (next.length === posts.length) return send(res, 404, { error: "Post not found" });
    await savePosts(next);
    return send(res, 200, { success: true });
  }

  return send(res, 405, { error: "Method not allowed" });
}
