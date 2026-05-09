export const DEFAULT_OG_IMAGE = "/og-image.svg";

export const normalizePath = (path = "/") => (
  path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path
);

export const getImageMimeType = (url = "") => {
  const normalizedImagePath = url.split(/[?#]/)[0].toLowerCase();
  if (normalizedImagePath.endsWith(".png")) return "image/png";
  if (normalizedImagePath.endsWith(".jpg") || normalizedImagePath.endsWith(".jpeg")) return "image/jpeg";
  if (normalizedImagePath.endsWith(".webp")) return "image/webp";
  if (normalizedImagePath.endsWith(".gif")) return "image/gif";
  if (normalizedImagePath.endsWith(".ico")) return "image/x-icon";
  if (normalizedImagePath.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
};
