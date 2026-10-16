import { Component, lazy, Suspense, useEffect, useState, useCallback } from 'react';
import GlobalStyles from './GlobalStyles.jsx';
import CookieConsent from './components/Privacy/CookieConsent.jsx';
import { FAQPage } from './components/Public/PublicPages.jsx';
const retryableLazy = (loader, chunkName) => lazy(async () => {
  try {
    return await loader();
  } catch (error) {
    // Only failed asset imports merit a cache-busting retry, not application bugs.
    if (!/Failed to fetch dynamically imported module|Loading chunk|Importing a module script failed/i.test(String(error?.message))) throw error;
    const retryUrl = new URL(window.location.href);
    let retried = retryUrl.searchParams.has("_pd_chunk_retry");
    try {
      retried = retried || window.sessionStorage.getItem(`placementdo:chunk-retry:${chunkName}`) === "1";
    } catch {
      // The retry query parameter still prevents an infinite loop when storage is unavailable.
    }
    if (!retried) {
      try {
        window.sessionStorage.setItem(`placementdo:chunk-retry:${chunkName}`, "1");
      } catch {
        // A retry is still useful even when storage is blocked.
      }
      retryUrl.searchParams.set("_pd_chunk_retry", Date.now().toString());
      window.location.replace(retryUrl.toString());
      return new Promise(() => {});
    }
    throw error;
  }
});

class RouteErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("PlacementDo route failed", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main role="alert" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "32px", background: "#FAFAF8", color: "#0F172A", fontFamily: "system-ui, sans-serif", textAlign: "center" }}>
        <section style={{ maxWidth: 520 }}>
          <p style={{ margin: "0 0 10px", color: "#0F766E", fontWeight: 700 }}>PlacementDo</p>
          <h1 style={{ margin: "0 0 14px", fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.1 }}>This page needs one more try</h1>
          <p style={{ margin: "0 0 22px", color: "#475569", lineHeight: 1.6 }}>We couldn't display this page. Try reloading, or return home to continue.</p>
          <button type="button" onClick={() => window.location.reload()} style={{ border: 0, borderRadius: 999, padding: "11px 18px", background: "#0D9488", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Reload page</button>
          <a href="/" style={{ display: "inline-block", marginLeft: 14, color: "#0F766E", fontWeight: 700 }}>Return home</a>
        </section>
      </main>
    );
  }
}

const InterviewAI = retryableLazy(() => import("./InterviewAI_v5.jsx"), "InterviewAI");
const BlogPage = retryableLazy(() => import("./components/Blog/BlogPage.jsx"), "BlogPage");
const BlogPostPage = retryableLazy(() => import("./components/Blog/BlogPostPage.jsx"), "BlogPostPage");
const PlacementPreparationPage = retryableLazy(() => import("./components/SEO/PlacementPreparationPage.jsx"), "PlacementPreparationPage");
const AptitudePage = retryableLazy(() => import("./components/SEO/AptitudePage.jsx"), "AptitudePage");
const CodingInterviewPage = retryableLazy(() => import("./components/SEO/CodingInterviewPage.jsx"), "CodingInterviewPage");
const CompanyWisePage = retryableLazy(() => import("./components/SEO/CompanyWisePage.jsx"), "CompanyWisePage");
const SeoResourcesPage = retryableLazy(() => import("./components/SEO/SeoResourcesPage.jsx"), "SeoResourcesPage");
const DemoPage = retryableLazy(() => import("./components/SEO/DemoPage.jsx"), "DemoPage");
const PlacementCompleteGuidePage = retryableLazy(() => import("./components/SEO/PlacementCompleteGuidePage.jsx"), "PlacementCompleteGuidePage");
const SitemapPage = retryableLazy(() => import("./components/SEO/SitemapPage.jsx"), "SitemapPage");
const PrivacyPolicyPage = retryableLazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.PrivacyPolicy })), "PrivacyPolicyPage");
const TermsOfServicePage = retryableLazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.TermsOfService })), "TermsOfServicePage");
const AboutPage = retryableLazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.About })), "AboutPage");
const ContactPage = retryableLazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.Contact })), "ContactPage");
const DisclaimerPage = retryableLazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.Disclaimer })), "DisclaimerPage");

class OptionalTelemetryBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

const SpeedInsights = lazy(
  () => import('@vercel/speed-insights/react').then((mod) => ({ default: mod.SpeedInsights })),
  "SpeedInsights",
);
const Analytics = lazy(
  () => import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
  "Analytics",
);

const COMPANY_ROUTE_MAP = {
  "/company-wise-questions/tcs": "tcs",
  "/company-wise-questions/wipro": "wipro",
  "/company-wise-questions/infosys": "infosys",
  "/company-wise-questions/accenture": "accenture",
  "/company-wise-questions/cognizant": "cognizant",
  "/company-wise-questions/hcl": "hcl",
};

const SEO_ROUTE_COMPONENTS = {
  "/placement-preparation": PlacementPreparationPage,
  "/aptitude-questions": AptitudePage,
  "/coding-interview-questions": CodingInterviewPage,
  "/placement-preparation-complete-guide": PlacementCompleteGuidePage,
  "/demo": DemoPage,
  "/sitemap": SitemapPage,
};

const RouteLoadingFallback = () => (
  <main aria-busy="true" style={{ minHeight:"100vh", background:"#FAFAF8", color:"#0F172A", fontFamily:"system-ui, sans-serif", display:"grid", placeItems:"center", padding:24 }}>
    <div role="status" style={{ textAlign:"center" }}>
      <img src="/apple-touch-icon.png" alt="" width="48" height="48" style={{ borderRadius:12, marginBottom:16 }} />
      <p style={{ fontWeight:700, fontSize:20 }}>Placement<span style={{ color:"#0D9488" }}>Do</span></p>
      <p style={{ marginTop:12, color:"#475569" }}>Loading your page…</p>
    </div>
  </main>
);

const trackPageView = (path) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: document.title,
    page_location: window.location.origin + path,
  });
};

const normalizeRoutePath = (value) => {
  if (!value) return "/";
  const singleSlashPath = value.replace(/\/{2,}/g, "/");
  if (singleSlashPath !== "/") return singleSlashPath.replace(/\/+$/, "");
  return singleSlashPath;
};

const renderWithFallback = (content) => (
  <Suspense fallback={<RouteLoadingFallback />}>{content}</Suspense>
);

function AppRouter() {
  const [path, setPath] = useState(() => window.location.pathname);
  const normalizedPath = normalizeRoutePath(path);

  const navigate = useCallback((url) => {
    const nextUrl = new URL(url, window.location.origin);
    // Blog pages are served as crawlable static documents. Use a full navigation
    // so internal clicks cannot switch to the separate lazy React blog renderer.
    if (nextUrl.pathname === "/blog" || nextUrl.pathname.startsWith("/blog/")) {
      window.location.assign(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
      return;
    }
    window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    setPath(nextUrl.pathname);
    trackPageView(`${nextUrl.pathname}${nextUrl.search}`);

    if (nextUrl.hash) {
      const targetId = decodeURIComponent(nextUrl.hash.slice(1));
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    const handlePop = () => {
      setPath(window.location.pathname);
      trackPageView(window.location.pathname + window.location.search);
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  // Compliance & legal pages
  if (normalizedPath === "/faq") return <FAQPage />;
  if (normalizedPath === "/privacy-policy") {
    return renderWithFallback(<PrivacyPolicyPage onNav={navigate} />);
  }
  if (normalizedPath === "/terms-of-service") {
    return renderWithFallback(<TermsOfServicePage onNav={navigate} />);
  }
  if (normalizedPath === "/about") {
    return renderWithFallback(<AboutPage onNav={navigate} />);
  }
  if (normalizedPath === "/contact") {
    return renderWithFallback(<ContactPage onNav={navigate} />);
  }
  if (normalizedPath === "/disclaimer") {
    return renderWithFallback(<DisclaimerPage onNav={navigate} />);
  }

  // Public blog listing — /blog and /blog/
  if (normalizedPath === "/blog") {
    return renderWithFallback(<BlogPage onNav={navigate} />);
  }

  // Public blog post — /blog/:slug
  if (normalizedPath.startsWith("/blog/")) {
    const rawSlug = normalizedPath.slice("/blog/".length).trim();
    if (!rawSlug) {
      return renderWithFallback(<BlogPage onNav={navigate} />);
    }
    let slug = rawSlug;
    try {
      slug = decodeURIComponent(rawSlug);
    } catch {
      slug = rawSlug;
    }
    return renderWithFallback(<BlogPostPage slug={slug} onNav={navigate} />);
  }

  const company = COMPANY_ROUTE_MAP[normalizedPath];
  if (company) {
    return renderWithFallback(<CompanyWisePage company={company} onNav={navigate} />);
  }

  if (normalizedPath === "/seo-resources" || normalizedPath === "/resources") {
    return renderWithFallback(<SeoResourcesPage onNav={navigate} />);
  }

  const SeoRouteComponent = SEO_ROUTE_COMPONENTS[normalizedPath];
  if (SeoRouteComponent) {
    return renderWithFallback(<SeoRouteComponent onNav={navigate} />);
  }

  return renderWithFallback(<InterviewAI />);
}

export default function App() {
  const [enableTelemetry, setEnableTelemetry] = useState(false);
  const [optionalConsent, setOptionalConsent] = useState(() => {
    try {
      const value = window.localStorage.getItem('placementdo:cookie-consent');
      if (value === 'accepted') return true;
      return Boolean(JSON.parse(value || '{}')?.analytics);
    } catch { return false; }
  });

  // Retain the retry marker for this document: mount is not proof that a lazy route loaded.

  useEffect(() => {
    const id = window.setTimeout(() => setEnableTelemetry(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const handleConsent = (event) => setOptionalConsent(event.detail?.analytics === true);
    window.addEventListener('placementdo:cookie-consent-change', handleConsent);
    return () => window.removeEventListener('placementdo:cookie-consent-change', handleConsent);
  }, []);

  return (
    <>
      <GlobalStyles />
      <RouteErrorBoundary>
        <AppRouter />
        <CookieConsent onPrivacy={() => {
        window.history.pushState({}, "", "/privacy-policy");
        window.dispatchEvent(new PopStateEvent("popstate"));
        window.scrollTo({ top: 0, behavior: "auto" });
      }} />
      </RouteErrorBoundary>
      {enableTelemetry && optionalConsent && (
        <OptionalTelemetryBoundary><Suspense fallback={null}>
          <SpeedInsights />
          <Analytics />
        </Suspense></OptionalTelemetryBoundary>
      )}
    </>
  );
}


