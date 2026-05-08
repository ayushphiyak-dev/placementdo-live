import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import GlobalStyles from './GlobalStyles.jsx';
import PageTransition from './components/motion/PageTransition.jsx';
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

const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react').then((mod) => ({ default: mod.SpeedInsights })),
);
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
);

// Routes handled by the new standalone pages (not by InterviewAI_v5).
const STANDALONE_ROUTES = [
  "/blog",
  "/placement-preparation",
  "/placement-preparation-complete-guide",
  "/aptitude-questions",
  "/coding-interview-questions",
  "/company-wise-questions/tcs",
  "/company-wise-questions/wipro",
  "/company-wise-questions/infosys",
  "/company-wise-questions/accenture",
  "/company-wise-questions/cognizant",
  "/company-wise-questions/hcl",
  "/seo-resources",
  "/demo",
];
const NAVIGATION_LOADING_DURATION_MS = 220;

function AppRouter() {
  const [path, setPath] = useState(() => window.location.pathname);
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = useCallback((url) => {
    if (url === path) return;
    setIsNavigating(true);
    window.history.pushState({}, "", url);
    setPath(url);
    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      window.setTimeout(() => setIsNavigating(false), NAVIGATION_LOADING_DURATION_MS);
    });
  }, [path]);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const fallback = <RouteLoadingFallback isNavigating={isNavigating} />;
  const withTransition = (key, content) => (
    <PageTransition routeKey={key}>
      {content}
    </PageTransition>
  );

  // Public blog listing — /blog and /blog/
  if (path === "/blog" || path === "/blog/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <BlogPage onNav={navigate} />
      </Suspense>
    ));
  }

  // Public blog post — /blog/:slug
  if (path.startsWith("/blog/")) {
    const slug = decodeURIComponent(path.replace("/blog/", "")).trim();
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <BlogPostPage slug={slug} onNav={navigate} />
      </Suspense>
    ));
  }

  // SEO content pages
  if (path === "/placement-preparation" || path === "/placement-preparation/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <PlacementPreparationPage onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/aptitude-questions" || path === "/aptitude-questions/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <AptitudePage onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/coding-interview-questions" || path === "/coding-interview-questions/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <CodingInterviewPage onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/company-wise-questions/tcs" || path === "/company-wise-questions/tcs/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <CompanyWisePage company="tcs" onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/company-wise-questions/wipro" || path === "/company-wise-questions/wipro/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <CompanyWisePage company="wipro" onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/placement-preparation-complete-guide" || path === "/placement-preparation-complete-guide/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <PlacementCompleteGuidePage onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/company-wise-questions/infosys" || path === "/company-wise-questions/infosys/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <CompanyWisePage company="infosys" onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/company-wise-questions/accenture" || path === "/company-wise-questions/accenture/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <CompanyWisePage company="accenture" onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/company-wise-questions/cognizant" || path === "/company-wise-questions/cognizant/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <CompanyWisePage company="cognizant" onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/company-wise-questions/hcl" || path === "/company-wise-questions/hcl/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <CompanyWisePage company="hcl" onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/seo-resources" || path === "/seo-resources/" || path === "/resources" || path === "/resources/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <SeoResourcesPage onNav={navigate} />
      </Suspense>
    ));
  }

  if (path === "/demo" || path === "/demo/") {
    return withTransition(path, (
      <Suspense fallback={fallback}>
        <DemoPage onNav={navigate} />
      </Suspense>
    ));
  }

  return withTransition(path, (
    <Suspense fallback={fallback}>
      <InterviewAI />
    </Suspense>
  ));
}

function RouteLoadingFallback({ isNavigating }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{
        minHeight: "32vh",
        display: "grid",
        placeItems: "center",
        padding: "clamp(32px, 8vh, 80px) 16px",
      }}
    >
      <div
        style={{
          width: "min(620px, 100%)",
          borderRadius: 22,
          border: "1px solid var(--border)",
          background: "linear-gradient(180deg, rgba(255,255,255,.9), rgba(248,250,252,.8))",
          boxShadow: "var(--shadow-sm)",
          padding: "20px clamp(18px, 3vw, 28px)",
          display: "grid",
          gap: 12,
          transform: isNavigating ? "translateY(-2px)" : "translateY(0)",
          transition: "transform 220ms var(--ease-premium)",
        }}
      >
        <div className="skeleton-line" style={{ width: "38%" }} />
        <div className="skeleton-line" style={{ width: "92%" }} />
        <div className="skeleton-line" style={{ width: "84%" }} />
      </div>
      <span className="sr-only">Loading page</span>
    </div>
  );
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
        <Suspense fallback={null}>
          <SpeedInsights />
          <Analytics />
        </Suspense>
      )}
    </>
  );
}
