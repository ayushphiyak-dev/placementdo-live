/**
 * adminSession — lightweight helper for persisting the admin token across
 * admin pages within the same browser session.
 *
 * The token is stored in sessionStorage so it is:
 *   - Never sent to the server except as a request header
 *   - Automatically cleared when the browser tab/window is closed
 *   - NOT accessible to other tabs or cross-origin scripts
 *
 * Server-side validation (api/blog.js `hasAdminAccess`) is the source of
 * truth — the session token is purely a UX convenience so admins do not have
 * to re-type the token on every admin page during a single session.
 */

const SESSION_KEY = "pd:admin:token";

/** Returns the stored admin token, or an empty string if none is saved. */
export const getSessionToken = () => {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) || "";
  } catch {
    return "";
  }
};

/**
 * Saves the admin token for the duration of the browser session.
 * Pass an empty string (or call clearSessionToken) to clear it.
 */
export const setSessionToken = (token) => {
  try {
    if (token) {
      window.sessionStorage.setItem(SESSION_KEY, token);
    } else {
      window.sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // sessionStorage may be unavailable (private browsing, etc.)
  }
};

/** Removes the stored admin token. */
export const clearSessionToken = () => {
  try {
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // sessionStorage may be unavailable
  }
};
