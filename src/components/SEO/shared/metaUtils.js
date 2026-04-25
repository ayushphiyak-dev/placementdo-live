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
 * Upsert a JSON-LD <script> block in <head>.
 * @param {string} id — unique identifier for this JSON-LD block (used as data-ld-id)
 * @param {object} data — the JSON-LD object to inject
 */
export const upsertJsonLd = (id, data) => {
  let el = document.head.querySelector(`script[data-ld-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-ld-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};
