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
  "/aptitude-questions",
  "/coding-interview-questions",
  "/company-wise-questions/tcs",
  "/company-wise-questions/wipro",
  "/seo-resources",
];

function AppRouter() {
  const [path, setPath] = useState(() => window.location.pathname);

  const navigate = useCallback((url) => {
    window.history.pushState({}, "", url);
    setPath(url);
  }, []);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  // Public blog listing — /blog and /blog/
  if (path === "/blog" || path === "/blog/") {
    return (
      <Suspense fallback={null}>
        <BlogPage onNav={navigate} />
      </Suspense>
    );
  }

  // Public blog post — /blog/:slug
  if (path.startsWith("/blog/")) {
    const slug = decodeURIComponent(path.replace("/blog/", "")).trim();
    return (
      <Suspense fallback={null}>
        <BlogPostPage slug={slug} onNav={navigate} />
      </Suspense>
    );
  }

  // SEO content pages
  if (path === "/placement-preparation" || path === "/placement-preparation/") {
    return (
      <Suspense fallback={null}>
        <PlacementPreparationPage onNav={navigate} />
      </Suspense>
    );
  }

  if (path === "/aptitude-questions" || path === "/aptitude-questions/") {
    return (
      <Suspense fallback={null}>
        <AptitudePage onNav={navigate} />
      </Suspense>
    );
  }

  if (path === "/coding-interview-questions" || path === "/coding-interview-questions/") {
    return (
      <Suspense fallback={null}>
        <CodingInterviewPage onNav={navigate} />
      </Suspense>
    );
  }

  if (path === "/company-wise-questions/tcs" || path === "/company-wise-questions/tcs/") {
    return (
      <Suspense fallback={null}>
        <CompanyWisePage company="tcs" onNav={navigate} />
      </Suspense>
    );
  }

  if (path === "/company-wise-questions/wipro" || path === "/company-wise-questions/wipro/") {
    return (
      <Suspense fallback={null}>
        <CompanyWisePage company="wipro" onNav={navigate} />
      </Suspense>
    );
  }

  if (path === "/seo-resources" || path === "/seo-resources/" || path === "/resources" || path === "/resources/") {
    return (
      <Suspense fallback={null}>
        <SeoResourcesPage onNav={navigate} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
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
        <Suspense fallback={null}>
          <SpeedInsights />
          <Analytics />
        </Suspense>
      )}
    </>
  );
}

export { STANDALONE_ROUTES };
