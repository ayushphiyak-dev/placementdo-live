/**
 * PageLayout — shared layout wrapper for SEO content pages.
 * Provides a fixed header with PlacementDo branding and a dark footer.
 */
import { useEffect, useMemo, useState } from "react";
import { Zap } from "lucide-react";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import MagneticButton from "../../motion/MagneticButton.jsx";
import { upsertMeta, upsertLink, upsertJsonLd } from "./metaUtils.js";

const NAV_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Placement Guide", href: "/placement-preparation-complete-guide" },
  { label: "Aptitude", href: "/aptitude-questions" },
  { label: "Coding", href: "/coding-interview-questions" },
  { label: "Resources", href: "/seo-resources" },
  { label: "Demo", href: "/demo" },
];

const FOOTER_LINKS = [
  { label: "Complete Placement Guide", href: "/placement-preparation-complete-guide" },
  { label: "Placement Prep Tips", href: "/placement-preparation" },
  { label: "Aptitude Q&A", href: "/aptitude-questions" },
  { label: "Coding Interview Q&A", href: "/coding-interview-questions" },
  { label: "TCS Questions", href: "/company-wise-questions/tcs" },
  { label: "Infosys Questions", href: "/company-wise-questions/infosys" },
  { label: "Wipro Questions", href: "/company-wise-questions/wipro" },
  { label: "Accenture Questions", href: "/company-wise-questions/accenture" },
  { label: "Cognizant Questions", href: "/company-wise-questions/cognizant" },
  { label: "HCL Questions", href: "/company-wise-questions/hcl" },
  { label: "Blog", href: "/blog" },
  { label: "SEO Resources", href: "/seo-resources" },
  { label: "Interactive Demo", href: "/demo" },
];
// Small offset helps the header become solid as soon as body content starts moving under it.
const HEADER_SOLID_SCROLL_THRESHOLD = 18;
const BASE_URL = "https://placementdo.app";

const toCrumbLabel = (segment) =>
  decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const STYLES = `
  .skip-link {
    position: fixed; top: 12px; left: 12px; z-index: 120;
    background: var(--slate); color: #fff; text-decoration: none;
    padding: 8px 14px; border-radius: 10px; transform: translateY(-140%);
    transition: transform .2s var(--ease-premium);
  }
  .skip-link:focus-visible { transform: translateY(0); }
  .seo-layout { min-height: 100vh; background: var(--ivory); }
  .seo-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(250,250,248,.78); backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border); height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 clamp(20px,5vw,60px); gap: 16px;
    transition: background 0.26s cubic-bezier(0.22,1,0.36,1), box-shadow 0.26s cubic-bezier(0.22,1,0.36,1), backdrop-filter 0.26s cubic-bezier(0.22,1,0.36,1);
  }
  .seo-header.is-solid { background: rgba(250,250,248,.96); backdrop-filter: blur(12px); box-shadow: var(--shadow-sm); }
  .seo-header-logo {
    display: flex; align-items: center; gap: 9px; cursor: pointer;
    text-decoration: none; color: inherit; flex-shrink: 0;
    background: none; border: none; padding: 0;
  }
  .seo-header-logo-mark {
    width: 34px; height: 34px; border-radius: 10px;
    background: var(--teal);
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s; flex-shrink: 0;
  }
  .seo-header-logo-mark:hover {
    transform: scale(1.08); box-shadow: var(--shadow-teal);
  }
  .seo-header-nav { display: flex; align-items: center; gap: 4px; }
  .seo-header-nav .nav-link[aria-current="page"] { color: var(--teal-dark); background: var(--teal-light); font-weight: 600; }
  .seo-header-cta {
    padding: 8px 16px; border-radius: 999px; font-size: 13px; font-weight: 600;
    background: var(--teal); color: #fff; border: none; cursor: pointer;
    transition: background 0.18s, transform 0.15s; flex-shrink: 0; white-space: nowrap;
  }
  .seo-header-cta:hover { background: var(--teal-dark); transform: translateY(-1px); }
  .seo-ham {
    display: none; background: none; border: 1px solid var(--border); border-radius: 8px;
    padding: 6px 10px; cursor: pointer; font-size: 18px; color: var(--slate-600);
  }
  .seo-mob-menu {
    position: fixed; top: 64px; left: 0; right: 0; z-index: 99;
    background: rgba(250,250,248,.98); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border); padding: 16px 20px 24px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .seo-mob-link {
    background: none; border: none; text-align: left; padding: 10px 12px;
    font-size: 15px; font-weight: 500; color: var(--slate-700); cursor: pointer;
    border-radius: 8px; transition: background 0.15s, color 0.15s;
    font-family: 'DM Sans', sans-serif; text-decoration: none; display: block;
  }
  .seo-mob-link:hover { background: var(--slate-100); color: var(--teal-dark); }
  .seo-mob-link[aria-current="page"] { background: var(--teal-light); color: var(--teal-dark); font-weight: 700; }
  .seo-footer { background: var(--slate); border-top: 1px solid rgba(255,255,255,.06); margin-top: 80px; }
  .seo-footer-inner {
    max-width: 1200px; margin: 0 auto;
    padding: clamp(40px,8vh,64px) clamp(20px,5vw,60px) 40px;
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: clamp(28px,4vw,48px);
  }
  .seo-footer-brand-desc { font-size: 13.5px; color: rgba(255,255,255,.4); line-height: 1.7; margin-top: 14px; max-width: 280px; }
  .seo-trust-row { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; }
  .seo-footer-col-title {
    font-size: 12px; font-weight: 700; color: rgba(255,255,255,.35);
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;
    font-family: 'Bricolage Grotesque', sans-serif;
  }
  .seo-footer-links { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
  .seo-footer-link {
    font-size: 13.5px; color: rgba(255,255,255,.72); background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.12); cursor: pointer; padding: 7px 12px;
    display: inline-flex; align-items: center; text-align: left;
    font-family: 'DM Sans', sans-serif; transition: color 0.18s, background 0.18s, border-color 0.18s, transform 0.18s;
    border-radius: 999px; width: fit-content; text-decoration: none;
  }
  .seo-footer-link:hover { color: #fff; background: rgba(13,148,136,.22); border-color: rgba(45,212,191,.56); transform: translateY(-1px); }
  .seo-footer-bottom {
    border-top: 1px solid rgba(255,255,255,.07);
    padding: 16px clamp(20px,5vw,60px);
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 10px; max-width: 1200px; margin: 0 auto;
  }
  .seo-footer-copy { font-size: 12px; color: rgba(255,255,255,.25); }
  @keyframes seo-menu-in {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 900px) {
    .seo-header-nav { display: none; }
    .seo-ham { display: flex; }
    .seo-header-cta { display: none; }
    .seo-footer-inner { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 580px) {
    .seo-footer-inner { grid-template-columns: 1fr; gap: 28px; padding: 48px 20px 32px; }
  }
`;

export default function PageLayout({ title, metaDescription, children, onNav }) {
  const [mob, setMob] = useState(false);
  const [solidHeader, setSolidHeader] = useState(false);
  const reduceMotion = useReducedMotion();
  // Capture the pathname once at mount; each SPA route mounts a fresh PageLayout instance.
  const [canonicalPath] = useState(() => window.location.pathname);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const breadcrumbItems = useMemo(() => {
    const chunks = canonicalPath.split("/").filter(Boolean);
    if (!chunks.length) return [{ name: "Home", item: BASE_URL }];
    return [
      { name: "Home", item: BASE_URL },
      ...chunks.map((segment, idx) => ({
        name: toCrumbLabel(segment),
        item: `${BASE_URL}/${chunks.slice(0, idx + 1).join("/")}`,
      })),
    ];
  }, [canonicalPath]);

  useEffect(() => {
    if (title) document.title = title;
    if (metaDescription) {
      upsertMeta('meta[name="description"]', { name: "description", content: metaDescription });
    }
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: canonicalUrl });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
    upsertJsonLd("breadcrumbs", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    });
    upsertJsonLd("webpage", {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description: metaDescription,
      url: canonicalUrl,
      isPartOf: { "@type": "WebSite", name: "PlacementDo", url: BASE_URL },
      inLanguage: "en-IN",
    });
    upsertMeta('meta[name="theme-color"]', { name: "theme-color", content: "#0D9488" });
    upsertMeta('meta[name="color-scheme"]', { name: "color-scheme", content: "light dark" });
  }, [title, metaDescription, canonicalUrl, breadcrumbItems]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setSolidHeader(window.scrollY > HEADER_SOLID_SCROLL_THRESHOLD);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (href) => {
    onNav(href);
    setMob(false);
  };

  const animateMenu = !reduceMotion;
  const headerTransition = reduceMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] };

  return (
    <>
      <style>{STYLES}</style>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="seo-layout">
        <header>
          <Motion.nav
            className={`seo-header ${solidHeader || mob ? "is-solid" : ""}`}
            initial={false}
            animate={{ y: 0 }}
            transition={headerTransition}
            aria-label="Primary navigation"
          >
            <a href="/" className="seo-header-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              <div className="seo-header-logo-mark"><Zap size={18} color="#fff" strokeWidth={2.5} /></div>
              <span className="brig" style={{ fontSize: 19, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                Placement<span style={{ color: "var(--teal)" }}>Do</span>
              </span>
            </a>
            <ul className="seo-header-nav" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="nav-link"
                    aria-current={canonicalPath === href ? "page" : undefined}
                    onClick={(e) => { e.preventDefault(); navigate(href); }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <MagneticButton as="a" href="/" className="seo-header-cta" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              Get started →
            </MagneticButton>
            <button
              className="seo-ham"
              onClick={() => setMob((o) => !o)}
              aria-label="Menu"
              aria-expanded={mob}
              aria-controls="seo-mobile-menu"
            >
              ☰
            </button>
          </Motion.nav>
          <AnimatePresence>
            {mob && (
              <Motion.div
                id="seo-mobile-menu"
                className="seo-mob-menu"
                initial={animateMenu ? { opacity: 0, y: -10 } : false}
                animate={animateMenu ? { opacity: 1, y: 0 } : false}
                exit={animateMenu ? { opacity: 0, y: -10 } : false}
                transition={headerTransition}
              >
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    className="seo-mob-link"
                    aria-current={canonicalPath === href ? "page" : undefined}
                    onClick={(e) => { e.preventDefault(); navigate(href); }}
                  >
                    {label}
                  </a>
                ))}
                <MagneticButton
                  as="a"
                  href="/"
                  className="seo-header-cta"
                  style={{ marginTop: 8, textAlign: "center", display: "inline-flex", justifyContent: "center" }}
                  onClick={(e) => { e.preventDefault(); navigate("/"); }}
                >
                  Get started →
                </MagneticButton>
              </Motion.div>
            )}
          </AnimatePresence>
        </header>

        <main id="main-content" style={{ paddingTop: 64 }}>
          {children}
        </main>

        <footer className="seo-footer">
          <div className="seo-footer-inner">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div className="seo-header-logo-mark" style={{ width: 34, height: 34, borderRadius: 10, background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Zap size={18} color="#fff" strokeWidth={2.5} />
                </div>
                <span className="brig" style={{ fontSize: 19, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Placement<span style={{ color: "var(--teal-mid)" }}>Do</span></span>
              </div>
              <p className="seo-footer-brand-desc">
                PlacementDo is India's AI-powered placement preparation platform — helping freshers crack campus placement at TCS, Infosys, Wipro, Accenture, and top tech companies. Practice smarter. Land faster.
              </p>
              <div className="seo-trust-row" aria-label="Trust signals">
                <span className="trust-chip">AI Mock Interviews</span>
                <span className="trust-chip">Company-wise Prep</span>
              </div>
            </div>
            <div>
              <div className="seo-footer-col-title">Prep Resources</div>
              <div className="seo-footer-links">
                {FOOTER_LINKS.slice(0, 4).map(({ label, href }) => (
                  <a key={href} href={href} className="seo-footer-link" onClick={(e) => { e.preventDefault(); navigate(href); }}>{label}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="seo-footer-col-title">Company Guides</div>
              <div className="seo-footer-links">
                {FOOTER_LINKS.slice(4).map(({ label, href }) => (
                  <a key={href} href={href} className="seo-footer-link" onClick={(e) => { e.preventDefault(); navigate(href); }}>{label}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="seo-footer-bottom">
            <span className="seo-footer-copy">© 2026 PlacementDo. All rights reserved.</span>
            <div style={{ display: "flex", gap: 16 }}>
              {[{ label: "Privacy", href: "/" }, { label: "Terms", href: "/" }].map(({ label, href }) => (
                <button key={label} onClick={() => navigate(href)}
                  style={{ fontSize: 12, color: "rgba(255,255,255,.25)", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.25)"}>{label}</button>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
