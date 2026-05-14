const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_EMAIL_LENGTH = 254;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const REQUEST_TIMEOUT_MS = 8000;
const DEFAULT_SCRIPT_URL = "https://script.google.com/a/macros/nsec.ac.in/s/AKfycbygJi9HO-X3Bd5YbtEdRGBLfSYXBicC49Fe2ORLOWfYFmphvBZ-xw6krhBPOn6qqCgX/exec";
const RATE_LIMIT_STORE = globalThis.__placementdoWaitlistRateLimit || new Map();

if (!globalThis.__placementdoWaitlistRateLimit) {
  globalThis.__placementdoWaitlistRateLimit = RATE_LIMIT_STORE;
}

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

const isValidEmail = (value) => (
  value.length > 0 &&
  value.length <= MAX_EMAIL_LENGTH &&
  EMAIL_REGEX.test(value)
);

const getClientKey = (req) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const firstForwarded = Array.isArray(forwardedFor) ? forwardedFor[0] : String(forwardedFor || "").split(",")[0];
  const ip = (firstForwarded || req.headers["x-real-ip"] || req.socket?.remoteAddress || "").trim();
  return ip || "unknown";
};

const isRateLimited = (clientKey, now) => {
  const attempts = RATE_LIMIT_STORE.get(clientKey) || [];
  const freshAttempts = attempts.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  freshAttempts.push(now);
  RATE_LIMIT_STORE.set(clientKey, freshAttempts);
  return freshAttempts.length > RATE_LIMIT_MAX_REQUESTS;
};

const isScriptUrlAllowed = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && parsed.hostname === "script.google.com";
  } catch {
    return false;
  }
};

const parseBody = (body) => {
  if (!body) return {};
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  return body;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }

  const now = Date.now();
  const clientKey = getClientKey(req);
  if (isRateLimited(clientKey, now)) {
    res.status(429).json({ error: "Too many requests. Please try again later." });
    return;
  }

  const body = parseBody(req.body);
  const email = normalizeEmail(body?.email);
  if (!isValidEmail(email)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  const configuredUrl = globalThis?.process?.env?.GOOGLE_APPS_SCRIPT_URL || DEFAULT_SCRIPT_URL;
  const scriptUrl = isScriptUrlAllowed(configuredUrl) ? configuredUrl : DEFAULT_SCRIPT_URL;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const r = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email }).toString(),
      signal: controller.signal,
    });
    if (!r.ok) {
      res.status(502).json({ error: "Waitlist service is unavailable. Please retry." });
      return;
    }
    res.status(200).json({ success: true });
  } catch {
    res.status(502).json({ error: "Waitlist service is unavailable. Please retry." });
  } finally {
    clearTimeout(timeoutId);
  }
}
