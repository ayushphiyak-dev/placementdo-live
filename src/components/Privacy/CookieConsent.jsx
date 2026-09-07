import { useCallback, useEffect, useState } from "react";

const CONSENT_KEY = "placementdo:cookie-consent";
const CONSENT_EVENT = "placementdo:cookie-consent-change";

const readConsent = () => {
  try {
    return window.localStorage.getItem(CONSENT_KEY) || "";
  } catch {
    return "";
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

const enableOptionalServices = () => {
  if (window.__placementDoOptionalServicesLoaded) return;
  window.__placementDoOptionalServicesLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", "G-MHPLFG59KQ", { anonymize_ip: true });
  loadScript("https://www.googletagmanager.com/gtag/js?id=G-MHPLFG59KQ");
  loadScript("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3817850058008403", { crossorigin: "anonymous" });
  loadScript("https://analytics.ahrefs.com/analytics.js", { "data-key": "acXe3Re/PjZfoS+krqUgEg" });
};

const saveConsent = (value) => {
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* private browsing can block storage */ }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  if (value === "accepted") enableOptionalServices();
};

export default function CookieConsent({ onPrivacy }) {
  const [consent, setConsent] = useState(() => readConsent());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (consent === "accepted") enableOptionalServices();
  }, [consent]);

  const choose = useCallback((value) => {
    setConsent(value);
    setShowSettings(false);
    saveConsent(value);
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
          <button type="button" className="btn-secondary" onClick={() => choose("essential")}>Essential only</button>
          <button type="button" className="btn-primary" onClick={() => choose("accepted")}>Accept all</button>
        </div>
      </div>
      {showSettings && (
        <p style={{ fontSize: 12, color: "var(--slate-500)", lineHeight: 1.6, margin: "14px 0 0", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
          Essential cookies are always enabled for authentication, security, and remembering your consent choice. Optional analytics and Google AdSense cookies stay disabled unless you choose “Accept all”. You can change your choice by clearing this site&apos;s cookies and revisiting the page.
        </p>
      )}
    </aside>
  );
}

