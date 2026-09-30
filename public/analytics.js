(() => {
  "use strict";

  const MEASUREMENT_ID = "G-MHPLFG59KQ";
  const CONSENT_KEY = "placementdo:cookie-consent";
  const CONSENT_EVENT = "placementdo:cookie-consent-change";
  let banner;

  const readConsent = () => {
    try {
      const value = window.localStorage.getItem(CONSENT_KEY);
      if (!value) return null;
      if (value === "accepted") return { analytics: true, advertising: true };
      if (value === "essential") return { analytics: false, advertising: false };
      const parsed = JSON.parse(value);
      return {
        analytics: parsed?.analytics === true,
        advertising: parsed?.advertising === true,
      };
    } catch {
      return null;
    }
  };

  const loadGoogleAnalytics = () => {
    if (window.__placementDoAnalyticsLoaded) return;
    window.__placementDoAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, { anonymize_ip: true });

    if (document.querySelector("script[data-placementdo-ga]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID;
    script.dataset.placementdoGa = "true";
    document.head.appendChild(script);
  };

  const saveConsent = (next) => {
    const value = {
      analytics: next.analytics === true,
      advertising: next.advertising === true,
    };
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    } catch {
      // Private browsing can block storage; this choice still applies for this page.
    }
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    if (value.analytics) loadGoogleAnalytics();
    if (banner) banner.remove();
    banner = null;
  };

  const showConsentBanner = () => {
    if (banner || document.querySelector("[data-placementdo-consent]")) return;
    banner = document.createElement("aside");
    banner.dataset.placementdoConsent = "true";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie consent");
    banner.innerHTML = `
      <div>
        <strong>Your privacy matters</strong>
        <p>We use essential cookies to keep PlacementDo secure. With your permission, analytics helps us improve the site. Read our <a href="/privacy-policy">Privacy Policy</a>.</p>
      </div>
      <div data-consent-actions>
        <button type="button" data-consent="essential">Essential only</button>
        <button type="button" data-consent="analytics">Accept analytics</button>
      </div>
    `;
    const style = document.createElement("style");
    style.textContent = `
      [data-placementdo-consent] {
        position: fixed; left: 20px; right: 20px; bottom: 20px; z-index: 1000;
        max-width: 760px; margin: 0 auto; padding: 18px 20px;
        display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;
        background: #fff; color: #0f172a; border: 1px solid #dbe4ed; border-radius: 16px;
        box-shadow: 0 16px 48px rgba(15,23,42,.2); font: 14px/1.6 system-ui, sans-serif;
      }
      [data-placementdo-consent] strong { display: block; margin-bottom: 6px; }
      [data-placementdo-consent] p { max-width: 520px; margin: 0; color: #475569; font-size: 13px; }
      [data-placementdo-consent] a { color: #0f766e; font-weight: 600; }
      [data-consent-actions] { display: flex; flex-wrap: wrap; gap: 8px; }
      [data-consent-actions] button { border: 0; border-radius: 999px; padding: 10px 14px; cursor: pointer; font: 600 13px system-ui, sans-serif; }
      [data-consent="essential"] { background: #f1f5f9; color: #0f172a; }
      [data-consent="analytics"] { background: #0d9488; color: #fff; }
    `;
    document.head.appendChild(style);
    document.body.appendChild(banner);
    banner.querySelector("[data-consent=essential]").addEventListener("click", () => saveConsent({ analytics: false }));
    banner.querySelector("[data-consent=analytics]").addEventListener("click", () => saveConsent({ analytics: true }));
  };

  const consent = readConsent();
  if (consent?.analytics) loadGoogleAnalytics();
  else if (!consent) showConsentBanner();

  window.addEventListener(CONSENT_EVENT, (event) => {
    if (event.detail?.analytics === true) loadGoogleAnalytics();
  });
})();
