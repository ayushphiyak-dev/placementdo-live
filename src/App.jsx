import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import GlobalStyles from './GlobalStyles.jsx';
import CookieConsent from './components/Privacy/CookieConsent.jsx';
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
const PrivacyPolicyPage = lazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.PrivacyPolicy })));
const TermsOfServicePage = lazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.TermsOfService })));
const AboutPage = lazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.About })));
const ContactPage = lazy(() => import("./pages/Compliance.jsx").then(m => ({ default: m.Contact })));

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
  <main aria-busy="true" style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 80px", color: "#334155", fontFamily: "system-ui, sans-serif", lineHeight: 1.75 }}>
    <article>
      <h1 style={{ color: "#0F172A", fontSize: "clamp(32px, 5vw, 58px)", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 20px" }}>PlacementDo — AI Mock Interview Platform for Campus Placement Preparation</h1>
      <p>PlacementDo is a focused practice platform for students and early-career professionals preparing for aptitude tests, technical interviews, behavioural rounds, and campus recruitment. The site combines practical study guides with realistic mock interview practice so you can turn knowledge into clear, confident answers.</p>
      <p>Good preparation is more than memorising a list of expected questions. A strong candidate understands the role, can explain their own work, checks assumptions aloud, and stays composed when a follow-up question changes direction. PlacementDo helps you rehearse those behaviours before the real interview, then gives you a repeatable way to review what worked and what needs attention.</p>
      <h2 style={{ color: "#0F172A", fontSize: 26, lineHeight: 1.2, margin: "42px 0 12px" }}>How to prepare for a complete placement process</h2>
      <h3 style={{ color: "#0F172A", fontSize: 19, margin: "24px 0 8px" }}>Start with the screening round</h3>
      <p>Most campus drives begin with quantitative aptitude, logical reasoning, verbal ability, or a coding assessment. Make a short diagnostic set and record the topics that cost you time. Practise with a timer, learn the common patterns, and review incorrect answers the same day. Speed improves when you understand why a method works, not when you rush through random questions.</p>
      <h3 style={{ color: "#0F172A", fontSize: 19, margin: "24px 0 8px" }}>Build technical depth with evidence</h3>
      <p>Technical interviewers usually explore the projects and skills on your resume. Choose two projects and prepare a simple story for each: the problem, your specific contribution, the design decision you made, the trade-off you accepted, and the result. Be ready to sketch the architecture, explain how you tested it, and describe what you would improve with another week. Honest limits are more credible than exaggerated claims.</p>
      <h3 style={{ color: "#0F172A", fontSize: 19, margin: "24px 0 8px" }}>Practise behavioural answers</h3>
      <p>For HR and behavioural questions, use the STAR structure—Situation, Task, Action, Result—without sounding scripted. Prepare stories about teamwork, conflict, failure, leadership, and learning quickly. Keep the context brief, spend most of the answer on your actions, and finish with a measurable outcome or lesson. Record yourself so you can hear rambling, filler words, and places where your example needs a clearer result.</p>
      <h2 style={{ color: "#0F172A", fontSize: 26, lineHeight: 1.2, margin: "42px 0 12px" }}>What makes deliberate practice useful</h2>
      <p>A mock interview is most useful when it is connected to the information you provide. Select a target role and company, add only the CV context needed for relevant questions, and practise with different interviewer styles. Follow-up questions should respond to your answer rather than simply reading the next item in a list. That gives you a safer place to experience pressure, ask clarifying questions, think aloud, and recover when you do not immediately know the answer.</p>
      <p>After a session, review the feedback as a plan rather than a verdict. Pick one improvement target for the next attempt—answer structure, technical precision, pace, or confidence—and repeat the question after you have revised it. A weekly record of scores and notes makes progress visible and helps you focus limited preparation time on the gaps that matter for your target role.</p>
      <p>PlacementDo is intended to complement fundamentals, not replace them. Use the guides and question banks to learn concepts, practise coding and aptitude separately, and research the companies you are applying to. Then use a mock interview to test whether you can explain that knowledge in a conversation. This combination develops both competence and communication, which are evaluated together in real hiring processes.</p>
      <p>A simple weekly schedule keeps this work manageable. Spend two sessions learning or revising concepts, one session solving timed aptitude or coding questions, and one session completing a full mock interview. Reserve a few minutes after each session to write what you will change next time. As interview dates approach, shift more time toward company-specific research and realistic simulations, while keeping one light revision day for rest and confidence. Consistency matters more than a perfect timetable: a routine you can repeat for several weeks will produce stronger recall and calmer delivery than last-minute cramming.</p>
      <p>When a page finishes loading, you can continue to the interactive experience or choose a written guide. Until then, this overview remains available so visitors and search engines can understand what PlacementDo offers without waiting for a client-side bundle. The full site adds navigation, account controls, consent choices, and personalised practice after the route has loaded.</p>
      <h2 style={{ color: "#0F172A", fontSize: 26, lineHeight: 1.2, margin: "42px 0 12px" }}>Continue your preparation</h2>
      <p>Use these free resources to build a structured plan, and return to the blog as your target companies and interview dates become clearer. Verify company-specific details against current employer instructions.</p>
      <nav aria-label="Helpful resources" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 30, paddingTop: 20, borderTop: "1px solid #E2E8F0" }}>
        <a href="/blog" style={{ color: "#0F766E", fontWeight: 600 }}>Interview preparation blog</a>
        <a href="/placement-preparation-complete-guide" style={{ color: "#0F766E", fontWeight: 600 }}>Placement preparation guide</a>
        <a href="/aptitude-questions" style={{ color: "#0F766E", fontWeight: 600 }}>Aptitude questions</a>
        <a href="/coding-interview-questions" style={{ color: "#0F766E", fontWeight: 600 }}>Coding interview questions</a>
        <a href="/privacy-policy" style={{ color: "#0F766E", fontWeight: 600 }}>Privacy Policy</a>
        <a href="/terms-of-service" style={{ color: "#0F766E", fontWeight: 600 }}>Terms of Service</a>
        <a href="/contact" style={{ color: "#0F766E", fontWeight: 600 }}>Contact</a>
      </nav>
    </article>
  </main>
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

  // Compliance & legal pages
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
    try { return window.localStorage.getItem('placementdo:cookie-consent') === 'accepted'; } catch { return false; }
  });

  useEffect(() => {
    const id = window.setTimeout(() => setEnableTelemetry(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const handleConsent = (event) => setOptionalConsent(event.detail === 'accepted');
    window.addEventListener('placementdo:cookie-consent-change', handleConsent);
    return () => window.removeEventListener('placementdo:cookie-consent-change', handleConsent);
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppRouter />
      <CookieConsent onPrivacy={() => {
        window.history.pushState({}, "", "/privacy-policy");
        window.dispatchEvent(new PopStateEvent("popstate"));
        window.scrollTo({ top: 0, behavior: "auto" });
      }} />
      {enableTelemetry && optionalConsent && (
        <Suspense fallback={<RouteLoadingFallback />}>
          <SpeedInsights />
          <Analytics />
        </Suspense>
      )}
    </>
  );
}

