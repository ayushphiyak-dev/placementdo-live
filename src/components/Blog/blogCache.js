/**
 * Shared cache helpers for the public blog pages.
 *
 * The blog LIST cache uses localStorage and is read on every cold load so the
 * grid renders immediately without a loading spinner.  A stale-while-revalidate
 * strategy is used: cached data is always returned as the initial state (even
 * if it is older than BLOG_LIST_TTL_MS), while BlogPage always fetches the
 * latest posts from the API in the background.  This prevents layout shifts on
 * reload — the grid never collapses back to the two bundled seed posts after
 * the cache warms up.
 *
 * Individual POST caches use sessionStorage, which is sufficient since users
 * typically visit a post within the same browser session.
 */

export const BLOG_LIST_CACHE_KEY = "pd:blog:list";
export const blogPostCacheKey = (slug) => `pd:blog:post:${slug}`;

// BlogPage always performs a background revalidation on mount regardless of
// cache age, so stale data is safe to display as the initial state.

export const readListCache = () => {
  try {
    const raw = window.localStorage.getItem(BLOG_LIST_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.posts)) return null;
    // Always return cached posts even when stale — background fetch in
    // BlogPage.useEffect will update the state with fresh data.
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
