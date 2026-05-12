/**
 * PageLayout — shared layout wrapper for SEO content pages.
 * Provides a fixed header with PlacementDo branding and a dark footer.
 */
import { useEffect, useState } from "react";
import { upsertMeta, upsertLink } from "./metaUtils.js";
import { normalizePath } from "../../../utils/seoUtils.js";

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

const STYLES = `
  .seo-layout { min-height: 100vh; background: var(--ivory); }
  .seo-skip-link {
    position: fixed; top: -48px; left: 12px; z-index: 160;
    padding: 10px 14px; border-radius: 10px; background: var(--slate); color: #fff;
    text-decoration: none; font-size: 13px; font-weight: 600; transition: top .2s ease;
    box-shadow: var(--shadow-lg);
  }
  .seo-skip-link:focus { top: 12px; }
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
    width: 34px; height: 34px; border-radius: 10px; overflow: hidden;
    border: 1px solid var(--border);
    display: block;
    transition: transform 0.2s, box-shadow 0.2s; flex-shrink: 0;
  }
  .seo-header-logo-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .seo-header-logo-mark:hover {
    transform: scale(1.08); box-shadow: var(--shadow-teal);
  }
  .seo-header-nav { display: flex; align-items: center; gap: 4px; }
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
    animation: seo-menu-in 0.24s cubic-bezier(0.22,1,0.36,1) both;
  }
  .seo-mob-link {
    background: none; border: none; text-align: left; padding: 10px 12px;
    font-size: 15px; font-weight: 500; color: var(--slate-700); cursor: pointer;
    border-radius: 8px; transition: background 0.15s, color 0.15s;
    font-family: 'DM Sans', sans-serif; text-decoration: none; display: block;
  }
  .seo-mob-link:hover { background: var(--slate-100); color: var(--teal-dark); }
  .seo-footer { background: var(--slate); border-top: 1px solid rgba(255,255,255,.06); margin-top: 80px; }
  .seo-footer-inner {
    max-width: 1200px; margin: 0 auto;
    padding: clamp(40px,8vh,64px) clamp(20px,5vw,60px) 40px;
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: clamp(28px,4vw,48px);
  }
  .seo-footer-brand-desc { font-size: 13.5px; color: rgba(255,255,255,.4); line-height: 1.7; margin-top: 14px; max-width: 280px; }
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
    .seo-footer-inner { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 580px) {
    .seo-footer-inner { grid-template-columns: 1fr; gap: 28px; padding: 48px 20px 32px; }
  }
`;

const DEFAULT_SEO_KEYWORDS = [
  "PlacementDo",
  "placement preparation",
  "campus placement",
  "AI mock interview",
  "aptitude questions",
  "coding interview questions",
  "HR interview questions",
];

export default function PageLayout({ title, metaDescription, keywords = [], children, onNav }) {
  const [mob, setMob] = useState(false);
  const [solidHeader, setSolidHeader] = useState(false);
  // Capture the pathname once at mount; each SPA route mounts a fresh PageLayout instance.
  const [canonicalPath] = useState(() => window.location.pathname);
  const keywordsKey = Array.isArray(keywords) ? keywords.join("|") : "";
  const normalizedPath = normalizePath(canonicalPath);
  const isNavLinkActive = (href) => {
    const normalizedHref = normalizePath(href);
    return normalizedPath === normalizedHref;
  };
  const activeNavStyle = {
    color: "var(--teal-dark)",
    background: "var(--teal-light)",
    border: "1px solid rgba(13,148,136,.2)",
  };

  useEffect(() => {
    if (title) document.title = title;
    if (metaDescription) {
      upsertMeta('meta[name="description"]', { name: "description", content: metaDescription });
    }
    const mergedKeywords = [...new Set([...DEFAULT_SEO_KEYWORDS, ...(Array.isArray(keywords) ? keywords : [])])].join(", ");
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: mergedKeywords });
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title || "PlacementDo" });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: metaDescription || "" });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: `${window.location.origin}${canonicalPath}` });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: `${window.location.origin}/opengraph-image.png` });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title || "PlacementDo" });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: metaDescription || "" });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: `${window.location.origin}/twitter-image.png` });
    upsertMeta('meta[name="twitter:url"]', { name: "twitter:url", content: `${window.location.origin}${canonicalPath}` });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: `${window.location.origin}${canonicalPath}` });
  }, [title, metaDescription, keywordsKey, canonicalPath]);

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

  return (
    <>
      <style>{STYLES}</style>
      <div className="seo-layout">
        <a className="seo-skip-link" href="#seo-main-content">Skip to main content</a>
        <header>
          <nav className={`seo-header ${solidHeader || mob ? "is-solid" : ""}`}>
            <a href="/" className="seo-header-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              <div className="seo-header-logo-mark"><img src="/apple-touch-icon.png" alt="PlacementDo logo" loading="eager" /></div>
              <span className="brig" style={{ fontSize: 19, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                Placement<span style={{ color: "var(--teal)" }}>Do</span>
              </span>
            </a>
            <div className="seo-header-nav">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="nav-link"
                  aria-current={isNavLinkActive(href) ? "page" : undefined}
                  style={isNavLinkActive(href) ? activeNavStyle : undefined}
                  onClick={(e) => { e.preventDefault(); navigate(href); }}
                >
                  {label}
                </a>
              ))}
            </div>
            <a href="/" className="seo-header-cta" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Get started →</a>
            <button className="seo-ham" onClick={() => setMob(o => !o)} aria-label="Menu">☰</button>
          </nav>
          {mob && (
            <div className="seo-mob-menu">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="seo-mob-link"
                  aria-current={isNavLinkActive(href) ? "page" : undefined}
                  style={isNavLinkActive(href) ? activeNavStyle : undefined}
                  onClick={(e) => { e.preventDefault(); navigate(href); }}
                >
                  {label}
                </a>
              ))}
              <a href="/" className="seo-header-cta" style={{ marginTop: 8, textAlign: "center" }} onClick={(e) => { e.preventDefault(); navigate("/"); }}>Get started →</a>
            </div>
          )}
        </header>

        <main id="seo-main-content" tabIndex={-1} style={{ paddingTop: 64 }}>
          {children}
        </main>

        <footer className="seo-footer">
          <div className="seo-footer-inner">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div className="seo-header-logo-mark" style={{ width: 34, height: 34, borderRadius: 10, background: "var(--teal)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img src="/apple-touch-icon.png" alt="PlacementDo logo" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <span className="brig" style={{ fontSize: 19, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Placement<span style={{ color: "var(--teal-mid)" }}>Do</span></span>
              </div>
              <p className="seo-footer-brand-desc">
                PlacementDo is India's AI-powered placement preparation platform — helping freshers crack campus placement at TCS, Infosys, Wipro, Accenture, and top tech companies. Practice smarter. Land faster.
              </p>
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
