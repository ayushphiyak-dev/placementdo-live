// Public documents have one owner. The legacy app must not render a second blog.
const documents = {
  blog: "/blog", faq: "/faq", about: "/about", contact: "/contact",
  "privacy-policy": "/privacy-policy", "terms-of-service": "/terms-of-service",
  disclaimer: "/disclaimer",
};
export function publicDocumentFor(view) {
  return documents[view] || null;
}
