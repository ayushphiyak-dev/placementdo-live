import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
const InterviewAI = lazy(() => import("./InterviewAI_v5.jsx"));
const GuestSubmission = lazy(() => import("./components/Blog/GuestSubmission.jsx"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard.jsx"));

const SpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react').then((mod) => ({ default: mod.SpeedInsights })),
);
const Analytics = lazy(() =>
  import('@vercel/analytics/react').then((mod) => ({ default: mod.Analytics })),
);

// Routes handled by the new standalone pages (not by InterviewAI_v5).
const STANDALONE_ROUTES = ["/write-for-us", "/admin/blog"];

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

  if (path === "/write-for-us") {
    return (
      <Suspense fallback={null}>
        <GuestSubmission onNav={navigate} />
      </Suspense>
    );
  }

  if (path === "/admin/blog") {
    return (
      <Suspense fallback={null}>
        <AdminDashboard onNav={navigate} />
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
