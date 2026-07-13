import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import GlobalStyles from './GlobalStyles.jsx';
const InterviewAI = lazy(() => import("./InterviewAI_v5.jsx"));
const BlogPage = lazy(() => import("./components/Blog/BlogPage.jsx"));
const BlogPostPage = lazy(() => import("./components/Blog/BlogPostPage.jsx"));
const PlacementPreparationPage = lazy(() => import("./components/SEO/PlacementPreparationPage.jsx"));
const AptitudePage = lazy(() => import("./components/SEO/AptitudePage.jsx"));
const CodingInterviewPage = lazy(() => import("./components/SEO/CodingInterviewPage.jsx"));
const CompanyWisePage = lazy(() => import("./components/SEO/CompanyWisePage.jsx"));
const SeoResourcesPage = lazy(() => import("./components/SEO/SeoResourcesPage.jsx"));
const DemoPage = lazy(() => import("./components/SEO/DemoPage.jsx"));
const PlacementCompleteGuidePage = lazy(() => import("./components/SEO/PlacementCompleteGuidePage.jsx"));
const SitemapPage = lazy(() => import("./components/SEO/SitemapPage.jsx"));

const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react').then((mod) => ({ default: mod.SpeedInsights })),
);
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
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
  <div
    role="status"
    aria-live="polite"
    style={{
      minHeight: "48vh",
      display: "grid",
      placeItems: "center",
      padding: "32px 20px",
      color: "var(--slate-500)",
      fontSize: 14,
      background: "var(--ivory)",
    }}
  >
    Loading…
  </div>
);

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
    window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    setPath(nextUrl.pathname);

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
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

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

  useEffect(() => {
    const id = window.setTimeout(() => setEnableTelemetry(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppRouter />
      {enableTelemetry && (
        <Suspense fallback={<RouteLoadingFallback />}>
          <SpeedInsights />
          <Analytics />
        </Suspense>
      )}
    </>
  );
}
