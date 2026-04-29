/**
 * PageLayout — shared layout wrapper for SEO content pages.
 * Provides a fixed header with PlacementDo branding and a dark footer.
 */
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { upsertMeta, upsertLink } from "./metaUtils.js";

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

const STYLES = `
  .seo-layout { min-height: 100vh; background: var(--ivory); }
  .seo-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(250,250,248,.96); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border); height: 64px;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 clamp(20px,5vw,60px); gap: 16px;
  }
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
  @media (max-width: 900px) {
    .seo-header-nav { display: none; }
    .seo-ham { display: flex; }
    .seo-footer-inner { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 580px) {
    .seo-footer-inner { grid-template-columns: 1fr; gap: 28px; padding: 48px 20px 32px; }
  }
`;

export default function PageLayout({ title, metaDescription, children, onNav }) {
  const [mob, setMob] = useState(false);
  // Capture the pathname once at mount; each SPA route mounts a fresh PageLayout instance.
  const [canonicalPath] = useState(() => window.location.pathname);

  useEffect(() => {
    if (title) document.title = title;
    if (metaDescription) {
      upsertMeta('meta[name="description"]', { name: "description", content: metaDescription });
    }
    upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: `${window.location.origin}${canonicalPath}` });
  }, [title, metaDescription, canonicalPath]);

  const navigate = (href) => {
    onNav(href);
    setMob(false);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="seo-layout">
        <header>
          <nav className="seo-header">
            <a href="/" className="seo-header-logo" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              <div className="seo-header-logo-mark"><Zap size={18} color="#fff" strokeWidth={2.5} /></div>
              <span className="brig" style={{ fontSize: 19, fontWeight: 700, color: "var(--slate)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                Placement<span style={{ color: "var(--teal)" }}>Do</span>
              </span>
            </a>
            <div className="seo-header-nav">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={href} href={href} className="nav-link" onClick={(e) => { e.preventDefault(); navigate(href); }}>{label}</a>
              ))}
            </div>
            <a href="/" className="seo-header-cta" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Get started →</a>
            <button className="seo-ham" onClick={() => setMob(o => !o)} aria-label="Menu">☰</button>
          </nav>
          {mob && (
            <div className="seo-mob-menu">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={href} href={href} className="seo-mob-link" onClick={(e) => { e.preventDefault(); navigate(href); }}>{label}</a>
              ))}
              <a href="/" className="seo-header-cta" style={{ marginTop: 8, textAlign: "center" }} onClick={(e) => { e.preventDefault(); navigate("/"); }}>Get started →</a>
            </div>
          )}
        </header>

        <main style={{ paddingTop: 64 }}>
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
