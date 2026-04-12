/**
 * Shared cache helpers for the public blog pages.
 *
 * The blog LIST cache uses localStorage with a short TTL so it persists
 * across browser tabs and sessions, ensuring the grid is rendered immediately
 * on every cold load (new tab, first visit) without showing a loading spinner.
 *
 * Individual POST caches use sessionStorage, which is sufficient since users
 * typically visit a post within the same browser session.
 */

export const BLOG_LIST_CACHE_KEY = "pd:blog:list";
export const blogPostCacheKey = (slug) => `pd:blog:post:${slug}`;

// 5-minute TTL keeps the listing reasonably fresh while avoiding a flash on
// every page load when the user navigates back to the blog.
const BLOG_LIST_TTL_MS = 5 * 60 * 1000;

export const readListCache = () => {
  try {
    const raw = window.localStorage.getItem(BLOG_LIST_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.posts)) return null;
    // Treat entries older than the TTL as stale (refresh in background is fine)
    if (typeof parsed.ts === "number" && Date.now() - parsed.ts > BLOG_LIST_TTL_MS) return null;
    return parsed.posts;
  } catch {
    return null;
  }
};

export const writeListCache = (posts) => {
  try {
    window.localStorage.setItem(
      BLOG_LIST_CACHE_KEY,
      JSON.stringify({ posts, ts: Date.now() }),
    );
  } catch {
    // localStorage may be unavailable (private browsing, storage full, etc.)
  }
};

export const readPostCache = (slug) => {
  try {
    const raw = window.sessionStorage.getItem(blogPostCacheKey(slug));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const writePostCache = (slug, data) => {
  try {
    window.sessionStorage.setItem(blogPostCacheKey(slug), JSON.stringify(data));
  } catch {
    // sessionStorage may be unavailable
  }
};
