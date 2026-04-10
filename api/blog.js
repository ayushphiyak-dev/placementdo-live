import { createHash } from "node:crypto";

const BLOG_KEY = "placementdo:blog:posts";
const ENV = globalThis.process?.env || {};
const DEFAULT_ADMIN_MAX_ATTEMPTS = 5;
const DEFAULT_ADMIN_LOCKOUT_MINUTES = 15;
const DEFAULT_ADMIN_MAX_MUTATIONS_PER_HOUR = 30;
const TITLE_MAX = 180;
const EXCERPT_MAX = 500;
const CONTENT_MAX = 20000;
const SLUG_INPUT_MAX = 160;
const USER_AGENT_MAX_LENGTH = 200;

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

const parseIntWithBounds = (value, fallback, min, max) => {
  const parsed = Number.parseInt(`${value ?? ""}`, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
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
  const expected = ENV.BLOG_ADMIN_CODE || ENV.BLOG_ADMIN_TOKEN;
  if (!expected) return false;
  const supplied =
    req.headers["x-admin-code"] ||
    req.headers["x-admin-token"] ||
    req.headers.authorization?.replace(/^Bearer\s+/i, "");
  return typeof supplied === "string" && supplied === expected;
};

const lockoutMinutes = parseIntWithBounds(ENV.BLOG_ADMIN_LOCKOUT_MINUTES, DEFAULT_ADMIN_LOCKOUT_MINUTES, 1, 1440);
const lockoutWindowMs = lockoutMinutes * 60 * 1000;
const maxFailedAttempts = parseIntWithBounds(ENV.BLOG_ADMIN_MAX_ATTEMPTS, DEFAULT_ADMIN_MAX_ATTEMPTS, 1, 20);
const mutationWindowMs = 60 * 60 * 1000;
const maxMutationsPerHour = parseIntWithBounds(
  ENV.BLOG_ADMIN_MAX_MUTATIONS_PER_HOUR,
  DEFAULT_ADMIN_MAX_MUTATIONS_PER_HOUR,
  1,
  1000,
);

const getSecurityState = () => {
  if (!globalThis.__PLACEMENTDO_BLOG_SECURITY__) {
    globalThis.__PLACEMENTDO_BLOG_SECURITY__ = {
      failedAttemptsByClient: new Map(),
      mutationCountByClient: new Map(),
    };
  }
  return globalThis.__PLACEMENTDO_BLOG_SECURITY__;
};

const getClientId = (req) => {
  const fwd = req.headers["x-forwarded-for"];
  const ipFromHeader = Array.isArray(fwd) ? fwd[0] : `${fwd || ""}`;
  const ip = ipFromHeader.split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
  const ua = `${req.headers["user-agent"] || "unknown"}`.slice(0, USER_AGENT_MAX_LENGTH);
  return createHash("sha256").update(JSON.stringify([ip, ua])).digest("hex");
};

const isClientLockedOut = (req) => {
  const now = Date.now();
  const clientId = getClientId(req);
  const entry = getSecurityState().failedAttemptsByClient.get(clientId);
  if (!entry) return false;
  if (entry.lockedUntil > now) return true;
  if (now - entry.lastFailedAt > lockoutWindowMs) {
    getSecurityState().failedAttemptsByClient.delete(clientId);
  }
  return false;
};

const registerFailedAttempt = (req) => {
  const now = Date.now();
  const clientId = getClientId(req);
  const state = getSecurityState();
  const current = state.failedAttemptsByClient.get(clientId);
  const shouldReset = !current || now - current.lastFailedAt > lockoutWindowMs;
  const attempts = shouldReset ? 1 : current.attempts + 1;
  state.failedAttemptsByClient.set(clientId, {
    attempts,
    lastFailedAt: now,
    lockedUntil: attempts >= maxFailedAttempts ? now + lockoutWindowMs : 0,
  });
};

const clearFailedAttempts = (req) => {
  getSecurityState().failedAttemptsByClient.delete(getClientId(req));
};

const consumeMutationQuota = (req) => {
  const now = Date.now();
  const clientId = getClientId(req);
  const state = getSecurityState();
  const current = state.mutationCountByClient.get(clientId);
  if (!current || now - current.windowStartedAt >= mutationWindowMs) {
    state.mutationCountByClient.set(clientId, { count: 1, windowStartedAt: now });
    return true;
  }
  if (current.count >= maxMutationsPerHour) return false;
  state.mutationCountByClient.set(clientId, { ...current, count: current.count + 1 });
  return true;
};

const validatePostPayloadLengths = (body) =>
  !(
    (typeof body.title === "string" && body.title.length > TITLE_MAX) ||
    (typeof body.excerpt === "string" && body.excerpt.length > EXCERPT_MAX) ||
    (typeof body.content === "string" && body.content.length > CONTENT_MAX) ||
    (typeof body.slug === "string" && body.slug.length > SLUG_INPUT_MAX)
  );

const enforceMutationQuota = (req, res) => {
  if (consumeMutationQuota(req)) return true;
  send(res, 429, { error: "Rate limit exceeded. Please try again later." });
  return false;
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
  const isReadRequest = req.method === "GET";
  if (!isReadRequest && isClientLockedOut(req)) {
    return send(res, 429, { error: "Too many failed admin code attempts. Please try again later." });
  }

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
    if (!isReadRequest) registerFailedAttempt(req);
    return send(res, 401, { error: "Unauthorized" });
  }

  if (!isReadRequest) clearFailedAttempts(req);

  if (req.method === "POST") {
    if (!enforceMutationQuota(req, res)) return;

    const body = parseBody(req);
    if (!validatePostPayloadLengths(body)) {
      return send(res, 400, { error: "One or more fields exceed allowed limits." });
    }

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
    if (!enforceMutationQuota(req, res)) return;

    const body = parseBody(req);
    if (!validatePostPayloadLengths(body)) {
      return send(res, 400, { error: "One or more fields exceed allowed limits." });
    }

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
    if (!enforceMutationQuota(req, res)) return;

    const targetSlug = typeof req.query?.slug === "string" ? req.query.slug : "";
    if (!targetSlug) return send(res, 400, { error: "slug query parameter is required" });
    const next = posts.filter((post) => post.slug !== targetSlug);
    if (next.length === posts.length) return send(res, 404, { error: "Post not found" });
    await savePosts(next);
    return send(res, 200, { success: true });
  }

  return send(res, 405, { error: "Method not allowed" });
}
