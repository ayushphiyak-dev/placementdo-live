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
  "/sitemap",
];

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
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <BlogPage onNav={navigate} />
      </Suspense>
    );
  }

  // Public blog post — /blog/:slug
  if (normalizedPath.startsWith("/blog/")) {
    const rawSlug = normalizedPath.slice("/blog/".length).trim();
    if (!rawSlug) {
      return (
        <Suspense fallback={<RouteLoadingFallback />}>
          <BlogPage onNav={navigate} />
        </Suspense>
      );
    }
    let slug = rawSlug;
    try {
      slug = decodeURIComponent(rawSlug);
    } catch {
      slug = rawSlug;
    }
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <BlogPostPage slug={slug} onNav={navigate} />
      </Suspense>
    );
  }

  // SEO content pages
  if (normalizedPath === "/placement-preparation") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <PlacementPreparationPage onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/aptitude-questions") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <AptitudePage onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/coding-interview-questions") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <CodingInterviewPage onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/company-wise-questions/tcs") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <CompanyWisePage company="tcs" onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/company-wise-questions/wipro") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <CompanyWisePage company="wipro" onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/placement-preparation-complete-guide") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <PlacementCompleteGuidePage onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/company-wise-questions/infosys") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <CompanyWisePage company="infosys" onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/company-wise-questions/accenture") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <CompanyWisePage company="accenture" onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/company-wise-questions/cognizant") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <CompanyWisePage company="cognizant" onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/company-wise-questions/hcl") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <CompanyWisePage company="hcl" onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/seo-resources" || normalizedPath === "/resources") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <SeoResourcesPage onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/demo") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <DemoPage onNav={navigate} />
      </Suspense>
    );
  }

  if (normalizedPath === "/sitemap") {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <SitemapPage onNav={navigate} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <InterviewAI />
    </Suspense>
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
        <Suspense fallback={<RouteLoadingFallback />}>
          <SpeedInsights />
          <Analytics />
        </Suspense>
      )}
    </>
  );
}
