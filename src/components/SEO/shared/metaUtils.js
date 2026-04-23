/**
 * Shared DOM helpers for updating <meta> and <link> elements in <head>.
 * Used by SEO content pages and blog pages to keep robots and canonical tags current.
 */

export const upsertMeta = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
};

export const upsertLink = (selector, attrs) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
};

/**
 * Sets robots to "index, follow" and canonical to origin + given path.
 * Call this from a useEffect on every public page.
 */
export const setPublicPageMeta = (path) => {
  upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
  upsertLink('link[rel="canonical"]', { rel: "canonical", href: `${window.location.origin}${path}` });
};
