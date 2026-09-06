import PageLayout from "./shared/PageLayout.jsx";
import PageHero from "./shared/PageHero.jsx";
import SectionHeading from "./shared/SectionHeading.jsx";
import CTABlock from "./shared/CTABlock.jsx";
import BLOG_POSTS from "../../data/blogPosts.json";

const STYLES = `
  .sm-page { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px,5vw,60px); }
  .sm-section { padding: 56px 0; border-bottom: 1px solid var(--border); }
  .sm-section:last-child { border-bottom: none; }
  .sm-grid { display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
  .sm-card {
    display: block; text-decoration: none; color: inherit;
    background: var(--white); border: 1px solid var(--border); border-radius: 16px;
    padding: 22px 24px; transition: border-color .18s ease, transform .18s ease, box-shadow .18s ease;
  }
  .sm-card:hover { transform: translateY(-2px); border-color: rgba(13,148,136,.28); box-shadow: var(--shadow-md); }
  .sm-card h3 { margin: 0 0 8px; font-size: 16px; color: var(--slate); letter-spacing: -0.015em; }
  .sm-card p { margin: 0; font-size: 13.5px; line-height: 1.7; color: var(--slate-500); }
  .sm-post-list { display: grid; gap: 12px; }
  .sm-post-link {
    display: flex; justify-content: space-between; gap: 16px; align-items: baseline;
    text-decoration: none; color: inherit; background: var(--white); border: 1px solid var(--border);
    border-radius: 14px; padding: 16px 18px; transition: border-color .18s ease, background .18s ease, transform .18s ease;
  }
  .sm-post-link:hover { border-color: rgba(13,148,136,.28); background: #f0fdfa; transform: translateY(-1px); }
  .sm-post-link strong { color: var(--slate); font-size: 14.5px; }
  .sm-post-link span { color: var(--slate-400); font-size: 12px; white-space: nowrap; }
`;

const CORE_PAGES = [
  {
    label: "Home",
    href: "/",
    description: "Main landing page for AI mock interviews, placement preparation, and product discovery.",
  },
  {
    label: "Complete Placement Guide",
    href: "/placement-preparation-complete-guide",
    description: "Pillar page covering the full placement preparation roadmap for freshers.",
  },
  {
    label: "Placement Preparation",
    href: "/placement-preparation",
    description: "Structured placement prep strategy, timelines, and internal links to key topics.",
  },
  {
    label: "Aptitude Questions",
    href: "/aptitude-questions",
    description: "Practice-focused page for aptitude, reasoning, and test preparation.",
  },
  {
    label: "Coding Interview Questions",
    href: "/coding-interview-questions",
    description: "Technical interview and coding round preparation resources.",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "PlacementDo articles, preparation guides, and product updates.",
  },
];

const COMPANY_PAGES = [
  { label: "TCS Questions", href: "/company-wise-questions/tcs", description: "Company-specific placement prep for TCS." },
  { label: "Infosys Questions", href: "/company-wise-questions/infosys", description: "Company-specific placement prep for Infosys." },
  { label: "Wipro Questions", href: "/company-wise-questions/wipro", description: "Company-specific placement prep for Wipro." },
  { label: "Accenture Questions", href: "/company-wise-questions/accenture", description: "Company-specific placement prep for Accenture." },
  { label: "Cognizant Questions", href: "/company-wise-questions/cognizant", description: "Company-specific placement prep for Cognizant." },
  { label: "HCL Questions", href: "/company-wise-questions/hcl", description: "Company-specific placement prep for HCL." },
];

const SUPPORT_PAGES = [
  { label: "Features", href: "/features", description: "Overview of PlacementDo interview simulation and reporting capabilities." },
  { label: "Pricing", href: "/pricing", description: "Plan comparison and interview credit details." },
  { label: "Personas", href: "/personas", description: "Different interviewer styles and practice scenarios." },
  { label: "How It Works", href: "/how-it-works", description: "Step-by-step product workflow and interview setup explanation." },
  { label: "About", href: "/about", description: "Mission, company context, and why PlacementDo exists." },
  { label: "Careers", href: "/careers", description: "Open roles and team information." },
  { label: "Privacy Policy", href: "/privacy-policy", description: "Privacy, data usage, and data protection details." },
  { label: "Terms of Service", href: "/terms-of-service", description: "Legal terms for using PlacementDo." },
  { label: "Free Resources", href: "/seo-resources", description: "Student-facing checklists, templates, and structured placement prep resources." },
  { label: "Interactive Demo", href: "/demo", description: "Embedded product walkthrough and quick demo." },
];

const RECENT_POSTS = [...BLOG_POSTS]
  .sort((a, b) => new Date(b.date || b.publishedAt || 0) - new Date(a.date || a.publishedAt || 0))
  .slice(0, 12);

export default function SitemapPage({ onNav }) {
  return (
    <PageLayout
      title="HTML Sitemap | PlacementDo"
      metaDescription="Browse every important PlacementDo page from one HTML sitemap. Find guides, company pages, blog posts, product pages, and legal pages quickly."
      keywords={["html sitemap", "placementdo sitemap", "placement preparation pages", "placementdo links"]}
      onNav={onNav}
    >
      <style>{STYLES}</style>
      <PageHero
        tag="Site Navigation"
        heading="Find every important PlacementDo page"
        subheading="Use this HTML sitemap to reach our placement guides, company-specific resources, product pages, blog posts, and legal pages in one place."
      />

      <div className="sm-page">
        <section className="sm-section">
          <SectionHeading
            label="Core Pages"
            heading="Main placement preparation pages"
            description="Start here for the highest-priority resources across the site."
          />
          <div className="sm-grid">
            {CORE_PAGES.map(({ label, href, description }) => (
              <a key={href} href={href} className="sm-card" onClick={(event) => { event.preventDefault(); onNav(href); }}>
                <h3>{label}</h3>
                <p>{description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="sm-section">
          <SectionHeading
            label="Company Guides"
            heading="Company-wise interview and placement pages"
            description="Direct links to our major company preparation pages."
          />
          <div className="sm-grid">
            {COMPANY_PAGES.map(({ label, href, description }) => (
              <a key={href} href={href} className="sm-card" onClick={(event) => { event.preventDefault(); onNav(href); }}>
                <h3>{label}</h3>
                <p>{description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="sm-section">
          <SectionHeading
            label="Product & Legal"
            heading="Support, company, and legal pages"
            description="Supporting pages that help visitors understand the platform and trust the site."
          />
          <div className="sm-grid">
            {SUPPORT_PAGES.map(({ label, href, description }) => (
              <a key={href} href={href} className="sm-card" onClick={(event) => { event.preventDefault(); onNav(href); }}>
                <h3>{label}</h3>
                <p>{description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="sm-section">
          <SectionHeading
            label="Recent Blog Posts"
            heading="Latest placement and interview articles"
            description="Recent articles from the PlacementDo blog for freshers, campus placements, aptitude, HR, and coding rounds."
          />
          <div className="sm-post-list">
            {RECENT_POSTS.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="sm-post-link"
                onClick={(event) => { event.preventDefault(); onNav(`/blog/${post.slug}`); }}
              >
                <strong>{post.title}</strong>
                <span>{post.date || post.publishedAt || ""}</span>
              </a>
            ))}
          </div>
        </section>

        <CTABlock
          heading="Ready to practice instead of just browse?"
          subtext="Jump into PlacementDo and start an AI mock interview tailored to your role, company, and placement goals."
          buttonLabel="Start AI Mock Interview"
          buttonHref="/dashboard"
          onNav={onNav}
        />
      </div>
    </PageLayout>
  );
}
