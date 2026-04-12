/**
 * Shared sessionStorage cache helpers for the public blog pages.
 *
 * Using sessionStorage means cached data persists across page reloads within
 * the same browser tab, so the blog grid and individual post pages render
 * immediately on refresh instead of showing a loading spinner.
 */

export const BLOG_LIST_CACHE_KEY = "pd:blog:list";
export const blogPostCacheKey = (slug) => `pd:blog:post:${slug}`;

export const readListCache = () => {
  try {
    const raw = window.sessionStorage.getItem(BLOG_LIST_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const writeListCache = (posts) => {
  try {
    window.sessionStorage.setItem(BLOG_LIST_CACHE_KEY, JSON.stringify(posts));
  } catch {
    // sessionStorage may be unavailable (private browsing, storage full, etc.)
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
