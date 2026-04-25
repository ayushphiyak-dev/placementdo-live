/**
 * PlacementCompleteGuidePage — /placement-preparation-complete-guide
 * 3000+ word pillar page targeting the keyword "placement".
 * Title: "Placement Preparation Guide 2026 – Complete Roadmap to Crack Interviews"
 */
import PageLayout from "./shared/PageLayout.jsx";
import PageHero from "./shared/PageHero.jsx";
import SectionHeading from "./shared/SectionHeading.jsx";
import CTABlock from "./shared/CTABlock.jsx";
import { useEffect } from "react";
import { upsertJsonLd } from "./shared/metaUtils.js";

const STYLES = `
  .pcg-page { max-width: 900px; margin: 0 auto; padding: 0 clamp(20px,5vw,60px) 80px; }
  .pcg-section { padding: 56px 0; border-bottom: 1px solid var(--border); }
  .pcg-section:last-child { border-bottom: none; }
  .pcg-prose h2 { font-size: clamp(22px,3.5vw,32px); font-weight: 800; color: var(--slate); margin: 40px 0 16px; letter-spacing: -0.025em; line-height: 1.2; }
  .pcg-prose h3 { font-size: clamp(17px,2.5vw,22px); font-weight: 700; color: var(--slate-800); margin: 32px 0 12px; }
  .pcg-prose h4 { font-size: 16px; font-weight: 700; color: var(--slate-700); margin: 20px 0 8px; }
  .pcg-prose p { font-size: 16px; color: var(--slate-600); line-height: 1.85; margin: 0 0 18px; }
  .pcg-prose ul, .pcg-prose ol { padding-left: 22px; margin: 0 0 18px; }
  .pcg-prose li { font-size: 15.5px; color: var(--slate-600); line-height: 1.8; margin-bottom: 8px; }
  .pcg-prose strong { color: var(--slate-800); font-weight: 700; }
  .pcg-toc { background: var(--teal-light); border: 1px solid rgba(13,148,136,.2); border-radius: 16px; padding: 28px 32px; margin: 32px 0; }
  .pcg-toc-title { font-size: 13px; font-weight: 700; letter-spacing: .08em; color: var(--teal-dark); text-transform: uppercase; margin-bottom: 16px; }
  .pcg-toc-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
  .pcg-toc-item { font-size: 15px; color: var(--teal-dark); font-weight: 500; padding-left: 16px; border-left: 2px solid rgba(13,148,136,.3); }
  .pcg-stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin: 28px 0; }
  .pcg-stat-card { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 22px; text-align: center; }
  .pcg-stat-num { font-size: 32px; font-weight: 800; color: var(--teal-dark); letter-spacing: -0.03em; font-family: 'Bricolage Grotesque', sans-serif; }
  .pcg-stat-label { font-size: 13px; color: var(--slate-500); margin-top: 4px; line-height: 1.5; }
  .pcg-stage-grid { display: flex; flex-direction: column; gap: 16px; margin: 20px 0; }
  .pcg-stage { display: grid; grid-template-columns: 56px 1fr; gap: 20px; align-items: start; }
  .pcg-stage-num { width: 48px; height: 48px; border-radius: 50%; background: var(--teal); color: #fff; font-weight: 800; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: 'Bricolage Grotesque', sans-serif; }
  .pcg-stage-content h4 { margin: 4px 0 6px; }
  .pcg-timeline { display: flex; flex-direction: column; gap: 0; }
  .pcg-tl-item { display: grid; grid-template-columns: 100px 1fr; gap: 20px; padding: 20px 0; border-bottom: 1px solid var(--border); align-items: start; }
  .pcg-tl-item:last-child { border-bottom: none; }
  .pcg-tl-month { background: var(--teal-light); color: var(--teal-dark); font-size: 12px; font-weight: 700; padding: 6px 10px; border-radius: 8px; text-align: center; }
  .pcg-nav-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .pcg-nav-btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border: 1px solid var(--border); border-radius: 999px; font-size: 13px; font-weight: 600; color: var(--teal-dark); background: var(--teal-light); cursor: pointer; transition: all .18s; font-family: 'DM Sans', sans-serif; }
  .pcg-nav-btn:hover { background: var(--teal); color: #fff; border-color: var(--teal); }
  .pcg-faq { display: flex; flex-direction: column; gap: 20px; margin-top: 24px; }
  .pcg-faq-item { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 22px 26px; }
  .pcg-faq-q { font-size: 16px; font-weight: 700; color: var(--slate); margin: 0 0 10px; }
  .pcg-faq-a { font-size: 15px; color: var(--slate-600); line-height: 1.75; margin: 0; }
  .pcg-company-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; margin: 20px 0; }
  .pcg-company-card { background: var(--white); border: 1px solid var(--border); border-radius: 14px; padding: 20px 22px; cursor: pointer; transition: box-shadow .18s, transform .18s; }
  .pcg-company-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,.07); transform: translateY(-2px); }
  .pcg-company-name { font-size: 17px; font-weight: 700; color: var(--slate); margin: 0 0 6px; }
  .pcg-company-desc { font-size: 13.5px; color: var(--slate-500); line-height: 1.65; margin: 0; }
  @media (max-width: 640px) {
    .pcg-tl-item { grid-template-columns: 1fr; gap: 8px; }
    .pcg-stage { grid-template-columns: 44px 1fr; gap: 14px; }
    .pcg-toc { padding: 20px; }
    .pcg-stat-grid { grid-template-columns: 1fr 1fr; }
  }
`;

const TOC = [
  { label: "What Is Placement?", anchor: "what-is-placement" },
  { label: "Types of Placement", anchor: "types" },
  { label: "The 4 Stages of the Placement Process", anchor: "stages" },
  { label: "Preparation Roadmap (6 Months)", anchor: "roadmap" },
  { label: "Company-Wise Preparation", anchor: "companies" },
  { label: "AI Mock Interviews — The Unfair Advantage", anchor: "ai-mock" },
  { label: "Tips for Freshers", anchor: "tips" },
  { label: "FAQ", anchor: "faq" },
];

const STATS = [
  { num: "3M+", label: "Engineering graduates enter the job market annually in India" },
  { num: "85%", label: "Placement rate at IITs" },
  { num: "50K+", label: "Freshers hired by top IT companies each year" },
  { num: "4–6", label: "Months of prep needed for consistent placement success" },
];

const STAGES = [
  { num: 1, title: "Online Aptitude Test", desc: "The first elimination round. Covers quantitative aptitude, logical reasoning, verbal ability, and programming MCQs. Eliminates 40–70% of applicants." },
  { num: 2, title: "Coding / Technical Written Round", desc: "For software roles: 1–3 DSA problems. Service companies set easy-medium problems; product companies expect medium-hard." },
  { num: 3, title: "Technical Interview", desc: "One or two rounds with engineers. Tests depth of CS knowledge, problem-solving, project understanding, and coding ability live." },
  { num: 4, title: "HR Interview", desc: "Assesses communication, culture fit, and attitude. Questions cover background, goals, behavioural scenarios, and salary expectations." },
];

const TIMELINE = [
  { month: "Month 1-2", title: "Foundation", desc: "DSA basics (arrays → graphs), aptitude fundamentals (30 min/day), CS core revision (DBMS, OS), first resume draft." },
  { month: "Month 3", title: "Speed Building", desc: "Timed aptitude mocks (2/week), 150+ DSA problems solved, first mock interviews, company-specific research begins." },
  { month: "Month 4", title: "Company Prep", desc: "Target 10–15 companies, study their question patterns, deep-dive your final year project, resume finalised." },
  { month: "Month 5", title: "Peak Prep", desc: "3 full mock tests/week, 5+ mock interviews/week, record and review sessions, refine weak areas." },
  { month: "Month 6", title: "Placement Season", desc: "Apply broadly, treat every interview as practice, debrief after each, stay consistent between drives." },
];

const COMPANIES = [
  { name: "TCS", desc: "NQT — aptitude, reasoning, verbal, coding. Largest campus recruiter in India.", href: "/company-wise-questions/tcs" },
  { name: "Infosys", desc: "InfyTQ certification + placement test. Strong logical reasoning focus.", href: "/blog/infosys-interview-preparation" },
  { name: "Wipro", desc: "NLTH — aptitude, essay writing, coding. Elite NTHrive for top performers.", href: "/company-wise-questions/wipro" },
  { name: "Accenture", desc: "Cognitive and technical assessment + communication test. Conversational interviews.", href: "/blog/accenture-placement-preparation" },
  { name: "Cognizant", desc: "eSEAT test (aptitude + coding for GenC Next). High verbal ability weight.", href: "/blog/cognizant-placement-guide" },
  { name: "HCL", desc: "HCL TechBee and HCLAT tests. Focus on aptitude and technical fundamentals.", href: "/blog" },
];

const FAQS = [
  { q: "What does placement mean in India?", a: "Placement refers to campus recruitment where companies hire students directly from colleges before graduation. It typically involves an online test, technical interviews, and an HR round, culminating in a job offer." },
  { q: "When should I start placement preparation?", a: "Start 4–6 months before your college's placement season. Most campus placements happen between August and February, so begin preparation by May–June of your final year." },
  { q: "What is the average placement package for freshers in 2026?", a: "IT service companies (TCS, Infosys, Wipro) offer 3–6 LPA. Mid-tier product companies offer 8–15 LPA. Top product companies and FAANG-level firms offer 20–40+ LPA for exceptional candidates." },
  { q: "Is one month enough for placement preparation?", a: "One month is enough for significant improvement but not ideal. Prioritise: aptitude (biggest filter), top 75 DSA problems, resume polish, and HR question preparation." },
  { q: "How many mock interviews should I do before placement?", a: "Aim for 15–20 full mock interviews across technical and HR formats over 4–6 weeks. Use PlacementDo's AI mock interview for unlimited sessions with detailed feedback." },
  { q: "What CGPA is required for top placement companies?", a: "Most service companies require 6.0–7.0 CGPA minimum. Product companies often require 7.5+. Some companies have no CGPA cutoff but compensate with harder technical rounds." },
];

export default function PlacementCompleteGuidePage({ onNav }) {

  useEffect(() => {
    upsertJsonLd("pillar-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(({ q, a }) => ({
        "@type": "Question",
        "name": q,
        "acceptedAnswer": { "@type": "Answer", "text": a },
      })),
    });
    upsertJsonLd("pillar-article", {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Placement Preparation Guide 2026 – Complete Roadmap to Crack Interviews",
      "description": "The most comprehensive guide to campus placement preparation in India — covering the placement process, 6-month roadmap, company-specific tips, and AI mock interview strategies for freshers.",
      "author": { "@type": "Organization", "name": "PlacementDo" },
      "publisher": { "@type": "Organization", "name": "PlacementDo", "url": "https://placementdo.app" },
      "url": "https://placementdo.app/placement-preparation-complete-guide",
      "datePublished": "2026-04-25",
      "dateModified": "2026-04-25",
    });
    return () => {
      // Cleanup JSON-LD on unmount
      ["pillar-faq", "pillar-article"].forEach((id) => {
        const el = document.head.querySelector(`script[data-ld-id="${id}"]`);
        if (el) el.remove();
      });
    };
  }, []);

  return (
    <PageLayout
      title="Placement Preparation Guide 2026 – Complete Roadmap to Crack Interviews | PlacementDo"
      metaDescription="The most complete placement preparation guide for freshers in 2026. Covers placement process, 6-month roadmap, company-wise tips, AI mock interviews, and FAQs."
      onNav={onNav}
    >
      <style>{STYLES}</style>

      <PageHero
        tag="🎯 The Definitive Guide · Placement 2026"
        heading="Placement Preparation: Complete Roadmap to Crack Any Interview"
        subheading="Everything you need to go from zero to placed — the placement process, preparation roadmap, company-specific strategies, and the AI tools that give you an unfair advantage."
        ctaButtons={[
          { label: "Start AI Mock Interview", onClick: () => onNav("/") },
          { label: "Placement Prep Tips", onClick: () => onNav("/placement-preparation") },
        ]}
      />

      <div className="pcg-page">

        {/* Table of Contents */}
        <div className="pcg-toc">
          <div className="pcg-toc-title">In this guide</div>
          <ul className="pcg-toc-list">
            {TOC.map((item) => (
              <li key={item.anchor} className="pcg-toc-item">{item.label}</li>
            ))}
          </ul>
        </div>

        {/* What Is Placement */}
        <section className="pcg-section" id="what-is-placement">
          <div className="pcg-prose">
            <h2>What Is Placement?</h2>
            <p>
              <strong>Placement</strong> — in the context of Indian higher education — refers to the process where companies recruit students directly from college campuses before or immediately after graduation. When a student "gets placed," they receive a formal job offer letter, typically before their final exams.
            </p>
            <p>
              Placement is not just a hiring process. For millions of Indian students, it represents the first significant career milestone — a transition from academic life to professional life, often with immediate financial independence. Every year, over 3 million engineering graduates compete for placement, and the difference between those who succeed and those who do not comes down almost entirely to preparation quality.
            </p>
            <p>
              Understanding placement deeply — how it works, what companies look for, and how to systematically prepare — is the first step toward landing your offer letter.
            </p>
          </div>

          <div className="pcg-stat-grid">
            {STATS.map((s) => (
              <div key={s.num} className="pcg-stat-card">
                <div className="brig pcg-stat-num">{s.num}</div>
                <div className="pcg-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Types */}
        <section className="pcg-section" id="types">
          <div className="pcg-prose">
            <h2>Types of Placement in India</h2>

            <h3>On-Campus Placement</h3>
            <p>
              The most common route. Companies visit your college, and the Training and Placement (T&P) Cell manages the entire process — from registrations to offer letters. You compete against your batch mates for the seats on offer.
            </p>

            <h3>Off-Campus Placement</h3>
            <p>
              You apply directly to companies through job portals (LinkedIn, Naukri, Internshala), company careers pages, or referrals. No T&P Cell involvement. Requires proactive outreach and is increasingly common for freshers from tier-2 and tier-3 colleges.
            </p>

            <h3>Pool Campus / Mega Drive Placement</h3>
            <p>
              Multiple colleges pool together for a single company drive at one location. Common for large-scale IT recruiters like TCS, Wipro, and Accenture who want to hire hundreds of freshers efficiently.
            </p>

            <h3>Lateral Placement / Day Zero Placement</h3>
            <p>
              "Day Zero" refers to elite companies (Google, Microsoft, Amazon) who conduct their placement process before other companies are allowed to enter the campus. Highly competitive — reserved for the top performers of each batch.
            </p>
          </div>
        </section>

        {/* 4 Stages */}
        <section className="pcg-section" id="stages">
          <SectionHeading
            label="The Process"
            heading="The 4 Stages of Campus Placement"
            description="Most placement drives follow this 4-stage funnel. Each stage eliminates a portion of candidates — preparation for each is different."
          />
          <div className="pcg-stage-grid">
            {STAGES.map((s) => (
              <div key={s.num} className="pcg-stage">
                <div className="pcg-stage-num">{s.num}</div>
                <div className="pcg-stage-content">
                  <h4 className="brig">{s.title}</h4>
                  <p style={{ margin: 0, fontSize: 15, color: "var(--slate-600)", lineHeight: 1.75 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="pcg-section" id="roadmap">
          <SectionHeading
            label="6-Month Plan"
            heading="Placement Preparation Roadmap"
            description="The 6-month structured plan followed by students who consistently land placed at top companies."
          />
          <div className="pcg-timeline">
            {TIMELINE.map((item) => (
              <div key={item.month} className="pcg-tl-item">
                <div className="pcg-tl-month">{item.month}</div>
                <div>
                  <h4 className="brig" style={{ margin: "0 0 6px", fontSize: 16 }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: 14.5, color: "var(--slate-500)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pcg-prose" style={{ marginTop: 32 }}>
            <h3>What to Focus on Each Stage</h3>
            <h4>Aptitude Preparation (Critical — Do Not Skip)</h4>
            <p>
              The online aptitude test is the first and biggest filter in campus placement. 40–70% of candidates are eliminated here. Topics to master: percentages, ratios, time-speed-distance, time and work, data interpretation, logical reasoning (puzzles, arrangements, syllogisms), and verbal ability (reading comprehension, grammar).
            </p>
            <p>
              Practice 30–40 timed questions daily. Take at least 6–8 full mock tests before the actual placement season begins. For shortcuts and tricks that save time in aptitude tests, read our guide on aptitude shortcuts for placement.
            </p>

            <h4>DSA and Coding Preparation</h4>
            <p>
              For software engineering roles, you need proficiency in data structures and algorithms. Start with arrays, strings, and hashmaps — they appear in 60% of coding questions. Progress to linked lists, trees, graphs, and then dynamic programming.
            </p>
            <p>
              Service companies (TCS, Wipro, Infosys) require easy-to-medium problems. Product companies (Amazon, Microsoft, Flipkart) expect medium-to-hard problems solved efficiently with optimal complexity.
            </p>

            <h4>HR Interview Preparation</h4>
            <p>
              Practice out loud — not in your head. Run at least 15–20 HR mock interview sessions. Prepare STAR-structured answers for all behavioural questions. Research each company specifically before their interview day.
            </p>
          </div>
        </section>

        {/* Companies */}
        <section className="pcg-section" id="companies">
          <SectionHeading
            label="Company-Specific Guides"
            heading="Placement Preparation by Company"
            description="Each major recruiter has a unique process. Tailor your preparation to the specific companies visiting your campus."
          />
          <div className="pcg-company-grid">
            {COMPANIES.map((c) => (
              <div key={c.name} className="pcg-company-card" onClick={() => onNav(c.href)} role="button" tabIndex={0} onKeyDown={(e) => (e.key === "Enter") && onNav(c.href)}>
                <div className="brig pcg-company-name">{c.name}</div>
                <p className="pcg-company-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Mock */}
        <section className="pcg-section" id="ai-mock">
          <div className="pcg-prose">
            <h2>AI Mock Interviews: The Unfair Advantage in Placement Preparation</h2>
            <p>
              The single most impactful change you can make to your placement preparation is switching from passive reading to active spoken practice. Most freshers study placement topics mentally but never practise speaking answers out loud. The placement interview is a live, spoken performance — entirely different from silent studying.
            </p>
            <p>
              AI mock interview platforms like PlacementDo simulate real placement interviews on-demand. You can practise a TCS-style HR round at midnight before a morning drive, or run 5 technical sessions in a single day without needing a human interviewer. The AI gives you structured feedback on response clarity, STAR usage, technical accuracy, and filler words — specific, actionable data you cannot get from a friend doing a casual mock.
            </p>

            <h3>How to Use AI Mock Interviews for Placement</h3>
            <ul>
              <li><strong>Start 6 weeks before placement season</strong> — give yourself time to act on feedback</li>
              <li><strong>Run 3–4 sessions per week</strong> in the first two weeks to identify your weak areas</li>
              <li><strong>Rotate interview types</strong> — one technical, one HR, one mixed per week</li>
              <li><strong>Increase to 5–7 sessions/week</strong> in the final two weeks before placement drives</li>
              <li><strong>Record and review one session per week</strong> — watching yourself is uncomfortable but transformative</li>
            </ul>
          </div>

          <div className="pcg-nav-links">
            <button className="pcg-nav-btn" onClick={() => onNav("/")}>🤖 Start AI Mock Interview</button>
            <button className="pcg-nav-btn" onClick={() => onNav("/blog/mock-interview-preparation-tips")}>📖 Mock Interview Tips Guide</button>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="pcg-section" id="tips">
          <div className="pcg-prose">
            <h2>Top Tips for Freshers Getting Placed in 2026</h2>

            <h3>1. Start Earlier Than You Think You Need To</h3>
            <p>The students who get placed first in any season started preparing when their classmates were still watching YouTube. A 4–6 month head start removes the anxiety of cramming and builds genuine confidence.</p>

            <h3>2. Apply to Every Company That Visits</h3>
            <p>Your dream company should not be your only company. Apply broadly — most freshers who end up placed at excellent companies did not get their first-choice offer. Volume of attempts matters enormously.</p>

            <h3>3. Debrief After Every Interview</h3>
            <p>Immediately after each placement interview, write down every question you were asked, how you answered, and what you would improve. This makes each interview a learning event, not just a pass/fail outcome.</p>

            <h3>4. Treat Your Resume as a Living Document</h3>
            <p>Update your resume after every project, internship, and certification. A resume that reflects current work is always more compelling than one frozen at graduation.</p>

            <h3>5. Master The Tell Me About Yourself Answer</h3>
            <p>This question appears in every single placement interview. Your answer in the first 90 seconds sets the tone for everything that follows. Practise it until it feels natural, confident, and specific — not like a recitation of your resume.</p>

            <h3>6. Build Two or Three Projects You Genuinely Care About</h3>
            <p>Interviewers can tell the difference between a project you built because you were fascinated and one you built to fill your resume. Two genuine projects that you can discuss in depth for 20 minutes are worth more than eight vague entries.</p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="pcg-section">
          <SectionHeading label="Explore More" heading="Continue your placement preparation" />
          <div className="pcg-nav-links">
            <button className="pcg-nav-btn" onClick={() => onNav("/placement-preparation")}>📘 Placement Prep Guide</button>
            <button className="pcg-nav-btn" onClick={() => onNav("/aptitude-questions")}>📊 Aptitude Questions</button>
            <button className="pcg-nav-btn" onClick={() => onNav("/coding-interview-questions")}>💻 Coding Interview Q&A</button>
            <button className="pcg-nav-btn" onClick={() => onNav("/company-wise-questions/tcs")}>🏢 TCS Placement Guide</button>
            <button className="pcg-nav-btn" onClick={() => onNav("/company-wise-questions/wipro")}>🏢 Wipro Placement Guide</button>
            <button className="pcg-nav-btn" onClick={() => onNav("/blog")}>📝 All Blog Posts</button>
            <button className="pcg-nav-btn" onClick={() => onNav("/blog/placement-preparation-for-freshers")}>🎓 Freshers Placement Guide</button>
            <button className="pcg-nav-btn" onClick={() => onNav("/blog/hr-interview-questions-for-freshers")}>🤝 HR Interview Questions</button>
          </div>
        </section>

        {/* FAQ */}
        <section className="pcg-section" id="faq">
          <SectionHeading label="FAQ" heading="Frequently Asked Questions About Placement" />
          <div className="pcg-faq">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="pcg-faq-item">
                <p className="brig pcg-faq-q">{q}</p>
                <p className="pcg-faq-a">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <CTABlock
          heading="Practice Placement Interviews with AI — Free"
          subtext="PlacementDo simulates real placement interviews with instant feedback. Used by 2,400+ students preparing for campus placements at TCS, Infosys, Wipro, and more."
          buttonLabel="Start your first mock interview"
          onNav={onNav}
          buttonHref="/"
        />
      </div>
    </PageLayout>
  );
}
