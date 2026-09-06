/**
 * SeoResourcesPage — /seo-resources
 * Student-first free placement prep resources.
 */
import PageLayout from "./shared/PageLayout.jsx";
import PageHero from "./shared/PageHero.jsx";
import SectionHeading from "./shared/SectionHeading.jsx";
import CTABlock from "./shared/CTABlock.jsx";

const STYLES = `
  .sr-page { max-width: 1000px; margin: 0 auto; padding: 0 clamp(20px,5vw,60px); }
  .sr-section { padding: 56px 0; border-bottom: 1px solid var(--border); }
  .sr-section:last-child { border-bottom: none; }
  .sr-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 16px;
    padding: 28px 30px; margin-bottom: 16px;
  }
  .sr-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .sr-card-icon { width: 30px; height: 30px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border); flex-shrink: 0; }
  .sr-card-icon img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .sr-card-title { font-size: 19px; font-weight: 700; color: var(--slate); letter-spacing: -0.02em; margin: 0; }
  .sr-card-subtitle { font-size: 13px; color: var(--slate-500); margin: 4px 0 0; }
  .sr-card p { font-size: 14.5px; color: var(--slate-600); line-height: 1.75; margin: 0 0 14px; }
  .sr-list { margin: 0; padding-left: 18px; display: grid; gap: 8px; }
  .sr-list li { font-size: 14px; color: var(--slate-600); line-height: 1.7; }
  .sr-grid { display: grid; gap: 14px; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
  .sr-link-card {
    background: var(--slate-50); border: 1px solid var(--border); border-radius: 12px;
    padding: 14px 16px; text-decoration: none; color: inherit;
    transition: border-color .18s ease, transform .18s ease, background .18s ease;
  }
  .sr-link-card:hover { border-color: rgba(13,148,136,.35); background: #f0fdfa; transform: translateY(-1px); }
  .sr-link-card h4 { font-size: 14.5px; font-weight: 700; color: var(--slate); margin: 0 0 6px; }
  .sr-link-card p { font-size: 12.5px; color: var(--slate-500); margin: 0; line-height: 1.6; }
  .sr-code-block {
    background: var(--slate-50); border: 1px solid var(--border); border-radius: 10px;
    padding: 16px 18px; font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 12.8px; color: var(--slate-700); line-height: 1.65;
    white-space: pre-wrap; word-break: break-word; position: relative; margin: 12px 0;
  }
  .sr-copy-btn {
    position: absolute; top: 10px; right: 12px; padding: 4px 12px;
    background: var(--teal-light); color: var(--teal-dark); border: 1px solid rgba(13,148,136,.2);
    border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.18s;
  }
  .sr-copy-btn:hover { background: var(--teal); color: #fff; }
  .sr-tip {
    display: flex; gap: 10px; align-items: flex-start; padding: 13px 16px;
    background: var(--teal-light); border: 1px solid rgba(13,148,136,.2); border-radius: 10px;
    font-size: 13.5px; color: var(--teal-dark); line-height: 1.65; margin-top: 12px;
  }
  .sr-inline-link { color: var(--teal-dark); font-weight: 600; text-decoration: underline; }
`;

function CopyButton({ text }) {
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };
  return <button className="sr-copy-btn" onClick={copy}>Copy</button>;
}

const STAR_TEMPLATE = `Situation: [Set context in 1-2 lines]\nTask: [What you were responsible for]\nAction: [Specific steps you took]\nResult: [Quantified outcome + what you learned]`;

const WEEK_PLAN_TEMPLATE = `Mon: 30 aptitude questions + 1 coding problem\nTue: DSA revision (arrays/strings) + HR answer practice\nWed: 1 timed mock test + error review\nThu: Resume project deep-dive + 1 coding problem\nFri: OS/DBMS/CN fundamentals revision\nSat: Full mock interview + feedback notes\nSun: Weak-area revision + next week planning`;

const TOPIC_CHECKLIST = [
  "Aptitude: percentages, ratios, time-work, probability, data interpretation",
  "Reasoning: puzzles, seating, syllogisms, blood relations",
  "DSA: arrays, strings, hashing, recursion, trees, graphs, DP basics",
  "Core CS: OOP, DBMS, OS, computer networks",
  "HR: tell me about yourself, strengths/weaknesses, conflict, failure stories",
  "Company prep: JD mapping, previous question trends, role-specific expectations",
];

const RESOURCE_LINKS = [
  { href: "/placement-preparation-complete-guide", title: "Complete Placement Guide", desc: "End-to-end roadmap from aptitude to HR rounds." },
  { href: "/placement-preparation", title: "Placement Preparation", desc: "Structured prep strategy with phase-wise focus." },
  { href: "/aptitude-questions", title: "Aptitude Questions", desc: "Practice-heavy aptitude and reasoning resources." },
  { href: "/coding-interview-questions", title: "Coding Interview Questions", desc: "Coding round prep with core problem-solving focus." },
  { href: "/blog", title: "PlacementDo Blog", desc: "Long-form placement, resume, and HR preparation articles." },
  { href: "/sitemap", title: "HTML Sitemap", desc: "Browse all guides, company pages, legal pages, and posts." },
];

export default function SeoResourcesPage({ onNav }) {
  return (
    <PageLayout
      title="Free Placement Preparation Resources | PlacementDo"
      metaDescription="Actionable placement preparation resources for students: weekly prep plan, HR STAR template, resume checklist, technical prep checklist, and curated PlacementDo guides."
      keywords={[
        "placement preparation resources",
        "campus placement checklist",
        "hr interview STAR template",
        "fresher resume checklist",
        "technical interview preparation",
      ]}
      onNav={onNav}
    >
      <style>{STYLES}</style>

      <PageHero
        tag="Free Student Resources"
        heading="Practical Placement Prep Toolkit"
        subheading="Use these structured checklists, templates, and study systems to prepare for aptitude, technical interviews, and HR rounds without guesswork."
      />

      <div className="sr-page">
        <section className="sr-section">
          <SectionHeading
            label="Start Here"
            heading="What to prepare for campus placements"
            description="Most placement processes follow a fixed pattern. Prepare for each stage with focused repetition instead of random practice."
          />
          <div className="sr-card">
            <div className="sr-card-header">
              <div className="sr-card-icon"><img src="/apple-touch-icon.png" alt="PlacementDo icon" loading="lazy" /></div>
              <div>
                <h3 className="brig sr-card-title">High-impact preparation checklist</h3>
                <p className="sr-card-subtitle">Use this as your base coverage checklist before interviews begin.</p>
              </div>
            </div>
            <ul className="sr-list">
              {TOPIC_CHECKLIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="sr-tip">
              Cover every item once, then spend 70% of your time on weak areas from mocks and tests.
            </div>
          </div>
        </section>

        <section className="sr-section">
          <SectionHeading
            label="Study System"
            heading="7-day repeatable study plan"
            description="If you are short on time, follow this weekly loop for 3-6 weeks before placement season."
          />
          <div className="sr-card">
            <p>Copy this weekly template and adapt the hours based on your college schedule.</p>
            <div className="sr-code-block">
              <CopyButton text={WEEK_PLAN_TEMPLATE} />
              {WEEK_PLAN_TEMPLATE}
            </div>
            <p>
              Pair this with two targeted revisions: one for aptitude mistakes and one for technical interview gaps.
            </p>
          </div>
        </section>

        <section className="sr-section">
          <SectionHeading
            label="HR Interview"
            heading="STAR answer template for behavioural rounds"
            description="Use STAR to keep answers clear, concise, and evidence-based in HR and behavioural interviews."
          />
          <div className="sr-card">
            <p>
              Practice 8-10 common HR questions and write STAR bullets before speaking them aloud.
            </p>
            <div className="sr-code-block">
              <CopyButton text={STAR_TEMPLATE} />
              {STAR_TEMPLATE}
            </div>
            <p>
              Focus on measurable outcomes in the Result section (time saved, score improved, bug reduced, team impact).
            </p>
          </div>
        </section>

        <section className="sr-section">
          <SectionHeading
            label="Resume + Technical"
            heading="Final-week review points"
            description="Before shortlisting and interview calls, run this quick quality pass."
          />
          <div className="sr-card">
            <ul className="sr-list">
              <li>Resume: one page, role-relevant keywords, quantified project outcomes, zero grammar mistakes.</li>
              <li>Projects: be ready to explain architecture, trade-offs, and one production challenge per project.</li>
              <li>Coding: solve at least one timed problem daily and review failed attempts, not only solved ones.</li>
              <li>Core CS: revise quick notes for DBMS normalization, OS process/thread basics, and HTTP/networking.</li>
              <li>Mocks: run at least 3 full simulations (technical + HR) and document repeated feedback themes.</li>
            </ul>
          </div>
        </section>

        <section className="sr-section">
          <SectionHeading
            label="Internal Resources"
            heading="Read next from PlacementDo"
            description="Use these deeper guides and articles to expand each part of your preparation plan."
          />
          <div className="sr-grid">
            {RESOURCE_LINKS.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                className="sr-link-card"
                onClick={(event) => {
                  event.preventDefault();
                  onNav(resource.href);
                }}
              >
                <h4>{resource.title}</h4>
                <p>{resource.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="sr-section">
          <SectionHeading
            label="Editorial Trust"
            heading="How this page is maintained"
            description="We keep this page practical, concise, and updated for current placement cycles."
          />
          <div className="sr-card">
            <p>
              This resource page is reviewed periodically and updated based on repeated student interview patterns, common rejection reasons, and feedback from mock interview sessions.
            </p>
            <p>
              If you find outdated guidance or want a specific topic added, contact us at <a className="sr-inline-link" href="mailto:support@placementdo.app">support@placementdo.app</a>.
            </p>
          </div>
        </section>

        <CTABlock
          heading="Want to practice these frameworks in live mocks?"
          subtext="Use PlacementDo to simulate realistic interviews and get structured feedback on clarity, depth, and confidence."
          buttonLabel="Start AI Mock Interview"
          onNav={onNav}
          buttonHref="/"
        />
      </div>
    </PageLayout>
  );
}
