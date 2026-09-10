import { useCallback, useEffect, useState } from "react";

const CONSENT_KEY = "placementdo:cookie-consent";
const CONSENT_EVENT = "placementdo:cookie-consent-change";
const EMPTY_CONSENT = { analytics: false, advertising: false };

const readConsent = () => {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (!value) return null;
    if (value === "accepted") return { analytics: true, advertising: true };
    if (value === "essential") return EMPTY_CONSENT;
    const parsed = JSON.parse(value);
    return {
      analytics: parsed?.analytics === true,
      advertising: parsed?.advertising === true,
    };
  } catch {
    return null;
  }
};

const loadScript = (src, attributes = {}) => {
  if (document.querySelector(`script[data-consent-script="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.dataset.consentScript = src;
  Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
  document.head.appendChild(script);
};

const enableAnalyticsServices = () => {
  if (window.__placementDoAnalyticsLoaded) return;
  window.__placementDoAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", "G-MHPLFG59KQ", { anonymize_ip: true });
  loadScript("https://www.googletagmanager.com/gtag/js?id=G-MHPLFG59KQ");
  loadScript("https://analytics.ahrefs.com/analytics.js", { "data-key": "acXe3Re/PjZfoS+krqUgEg" });
};

const enableAdvertisingServices = () => {
  if (window.__placementDoAdvertisingLoaded) return;
  window.__placementDoAdvertisingLoaded = true;
  loadScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3817850058008403", { crossorigin: "anonymous" });
};

const saveConsent = (value) => {
  const next = { analytics: value.analytics === true, advertising: value.advertising === true };
  try { window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next)); } catch { /* private browsing can block storage */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: next }));
  if (next.analytics) enableAnalyticsServices();
  if (next.advertising) enableAdvertisingServices();
};

export default function CookieConsent({ onPrivacy }) {
  const [consent, setConsent] = useState(() => readConsent());
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({ analytics: false, advertising: false });

  useEffect(() => {
    if (consent?.analytics) enableAnalyticsServices();
    if (consent?.advertising) enableAdvertisingServices();
  }, [consent]);

  const choose = useCallback((value) => {
    const next = { analytics: value.analytics === true, advertising: value.advertising === true };
    setConsent(next);
    setShowSettings(false);
    saveConsent(next);
  }, []);

  if (consent) return null;

  return (
    <aside
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-description"
      style={{
        position: "fixed", left: 20, right: 20, bottom: 20, zIndex: 1000,
        maxWidth: 760, margin: "0 auto", padding: "18px 20px",
        background: "#fff", color: "var(--slate)", border: "1px solid var(--border)",
        borderRadius: 16, boxShadow: "0 16px 48px rgba(15,23,42,.2)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 360px" }}>
          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Your privacy matters</p>
          <p id="cookie-consent-description" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--slate-600)", margin: 0 }}>
            We use essential cookies to keep PlacementDo secure. With your permission, we also use analytics and advertising cookies to improve the service and support free access. Read our {" "}
            <a href="/privacy-policy" onClick={(event) => { if (onPrivacy) { event.preventDefault(); onPrivacy(); } }} style={{ color: "var(--teal-dark)", fontWeight: 600 }}>Privacy Policy</a>.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, flexShrink: 0 }}>
          <button type="button" className="btn-ghost" onClick={() => setShowSettings((value) => !value)}>Manage</button>
          <button type="button" className="btn-secondary" onClick={() => choose(EMPTY_CONSENT)}>Essential only</button>
          <button type="button" className="btn-primary" onClick={() => choose({ analytics: true, advertising: true })}>Accept all</button>
        </div>
      </div>
      {showSettings && (
        <div style={{ fontSize: 12, color: "var(--slate-500)", lineHeight: 1.6, margin: "14px 0 0", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          <p style={{ margin: "0 0 10px" }}>Essential cookies are always enabled for authentication, security, and remembering your consent choice. Choose which optional services may load:</p>
          <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 7 }}>
            <input type="checkbox" style={{ width: "auto" }} checked={preferences.analytics} onChange={(event) => setPreferences((current) => ({ ...current, analytics: event.target.checked }))} />
            Analytics (Google Analytics and Ahrefs)
          </label>
          <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <input type="checkbox" style={{ width: "auto" }} checked={preferences.advertising} onChange={(event) => setPreferences((current) => ({ ...current, advertising: event.target.checked }))} />
            Advertising (Google AdSense, when enabled)
          </label>
          <button type="button" className="btn-secondary" onClick={() => choose(preferences)}>Save preferences</button>
        </div>
      )}
    </aside>
  );
}


