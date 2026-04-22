/**
 * PlacementPreparationPage — /placement-preparation
 * Complete guide for campus placement preparation.
 */
import PageLayout from "./shared/PageLayout.jsx";
import PageHero from "./shared/PageHero.jsx";
import SectionHeading from "./shared/SectionHeading.jsx";
import ContentCard from "./shared/ContentCard.jsx";
import CTABlock from "./shared/CTABlock.jsx";

const STYLES = `
  .pp-page { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px,5vw,60px); }
  .pp-section { padding: 64px 0; border-bottom: 1px solid var(--border); }
  .pp-section:last-child { border-bottom: none; }
  .pp-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); }
  .pp-timeline { display: flex; flex-direction: column; gap: 0; }
  .pp-timeline-item {
    display: flex; gap: 20px; padding: 20px 0; border-bottom: 1px solid var(--border);
  }
  .pp-timeline-item:last-child { border-bottom: none; }
  .pp-timeline-month {
    flex-shrink: 0; width: 96px; padding: 8px 14px; border-radius: 10px;
    background: var(--teal-light); color: var(--teal-dark); font-size: 13px;
    font-weight: 700; text-align: center; height: fit-content; margin-top: 2px;
  }
  .pp-timeline-content h3 { font-size: 16px; font-weight: 700; color: var(--slate); margin: 0 0 6px; }
  .pp-timeline-content p { font-size: 14px; color: var(--slate-500); line-height: 1.65; margin: 0; }
  .pp-links-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .pp-link-btn {
    display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px;
    border: 1px solid var(--border); border-radius: 999px; font-size: 13px;
    font-weight: 600; color: var(--teal-dark); background: var(--teal-light);
    cursor: pointer; transition: all 0.18s; font-family: 'DM Sans', sans-serif;
  }
  .pp-link-btn:hover { background: var(--teal); color: #fff; border-color: var(--teal); }
  .pp-prose h2 { font-size: clamp(20px,3vw,28px); font-weight: 700; color: var(--slate); margin: 40px 0 14px; letter-spacing: -0.02em; }
  .pp-prose h3 { font-size: 17px; font-weight: 700; color: var(--slate-800); margin: 28px 0 10px; }
  .pp-prose p { font-size: 15px; color: var(--slate-600); line-height: 1.78; margin: 0 0 16px; }
  .pp-prose ul { padding-left: 20px; margin: 0 0 16px; }
  .pp-prose li { font-size: 15px; color: var(--slate-600); line-height: 1.7; margin-bottom: 6px; }
`;

const STEPS = [
  {
    icon: "📋",
    title: "1. Know the Process",
    description: "Understand your target company's hiring pipeline: online test, technical rounds, HR interview, and offer. Each stage demands a different preparation focus.",
    tags: ["Online Test", "Technical Round", "HR Round"],
  },
  {
    icon: "📚",
    title: "2. Build Core Fundamentals",
    description: "Strong DSA, DBMS, OS, and networking foundations are non-negotiable for most product and service companies. Start 4–6 months before placement season.",
    tags: ["DSA", "DBMS", "OS", "Networking"],
  },
  {
    icon: "💡",
    title: "3. Practice Aptitude Daily",
    description: "Quantitative aptitude, logical reasoning, and verbal ability form 40–60% of most campus placement online tests. 30 minutes daily for 2 months makes a huge difference.",
    tags: ["Quant", "Logical", "Verbal"],
  },
  {
    icon: "🎯",
    title: "4. Mock Interviews",
    description: "Technical knowledge alone won't cut it. Practice with AI-powered mock interviews to get comfortable with real-time problem solving and communication under pressure.",
    tags: ["AI Practice", "Communication", "Confidence"],
  },
];

const KEY_AREAS = [
  {
    icon: "🔢",
    title: "Aptitude & Reasoning",
    description: "Most placement tests (TCS NQT, Wipro NLTH, Cognizant, Accenture) have a significant aptitude component. Topics: percentages, time-speed-distance, number series, syllogisms, data interpretation.",
    linkText: "Aptitude practice",
  },
  {
    icon: "💻",
    title: "Coding Rounds",
    description: "Service companies need 1–2 easy problems. Product companies expect medium-to-hard DSA. Focus: arrays, strings, trees, DP. Use Python or Java for faster implementation.",
    linkText: "Coding questions",
  },
  {
    icon: "🧠",
    title: "Technical Interviews",
    description: "Deep dives into your projects, CS fundamentals (OS, DBMS, networks), and system design basics for senior roles. Prepare to explain every line of your resume.",
    tags: ["Projects", "DBMS", "OS"],
  },
  {
    icon: "🤝",
    title: "HR Interviews",
    description: "Tell me about yourself, why this company, strengths/weaknesses, situational questions. These feel soft but eliminate 20–30% of candidates. Practice out loud.",
    tags: ["Behavioral", "STAR Method"],
  },
];

const TIMELINE = [
  {
    month: "Aug–Sep",
    title: "Foundation Building",
    desc: "Complete DSA fundamentals (arrays, linked lists, trees, graphs). Start aptitude practice — 30 min/day. Revise CS core subjects.",
  },
  {
    month: "Oct",
    title: "Problem Solving Sprint",
    desc: "Solve 100+ problems on LeetCode/GeeksforGeeks. Focus on medium difficulty. Start company-specific research.",
  },
  {
    month: "Nov",
    title: "Mock Tests & Assessments",
    desc: "Take full-length mock aptitude tests. Attempt company-wise previous year papers. Time yourself strictly.",
  },
  {
    month: "Dec",
    title: "Interview Prep",
    desc: "Mock technical interviews daily. Refine your project explanations. Practice HR questions. Update resume.",
  },
  {
    month: "Jan–Feb",
    title: "Placement Season",
    desc: "Apply broadly. Every interview is practice. Debrief after each — what went well, what to improve. Stay consistent.",
  },
];

export default function PlacementPreparationPage({ onNav }) {
  return (
    <PageLayout
      title="Placement Preparation Guide 2026 | PlacementDo"
      metaDescription="Master placement preparation with our complete guide — aptitude tests, coding rounds, HR interviews, and company-specific tips. Practice with AI-powered mock interviews."
      onNav={onNav}
    >
      <style>{STYLES}</style>

      <PageHero
        tag="📘 Complete Guide · 2026"
        heading="Your Complete Placement Preparation Guide"
        subheading="From aptitude tests to final HR rounds — a structured roadmap to help you crack campus placements at top companies in 2026."
        ctaButtons={[
          { label: "Start AI Mock Interview", onClick: () => onNav("/") },
          { label: "Aptitude Practice", onClick: () => onNav("/aptitude-questions") },
        ]}
      />

      <div className="pp-page">
        {/* How to prepare */}
        <section className="pp-section">
          <SectionHeading
            label="Getting Started"
            heading="How to prepare for campus placements"
            description="A clear 4-step framework to approach placement preparation systematically, regardless of your branch or background."
          />
          <div className="pp-grid">
            {STEPS.map((s) => (
              <ContentCard key={s.title} {...s} />
            ))}
          </div>
        </section>

        {/* Key areas */}
        <section className="pp-section">
          <SectionHeading
            label="Focus Areas"
            heading="Key areas to master for placements"
            description="The four pillars that determine your placement outcome. Each requires a different preparation strategy."
          />
          <div className="pp-grid">
            {KEY_AREAS.map((area) => (
              <ContentCard
                key={area.title}
                {...area}
                onClick={area.linkText === "Aptitude practice" ? () => onNav("/aptitude-questions") : () => onNav("/coding-interview-questions")}
              />
            ))}
          </div>
        </section>

        {/* Placement timeline */}
        <section className="pp-section">
          <SectionHeading
            label="Month-by-Month"
            heading="Placement preparation timeline"
            description="A realistic month-by-month guide for final-year students with placements in January–March."
          />
          <div className="pp-timeline">
            {TIMELINE.map(({ month, title, desc }) => (
              <div key={month} className="pp-timeline-item">
                <div className="pp-timeline-month">{month}</div>
                <div className="pp-timeline-content">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rich prose content for SEO */}
        <section className="pp-section">
          <div className="pp-prose">
            <h2>Understanding the Campus Placement Process</h2>
            <p>
              Campus placements in India typically follow a structured multi-round format. Most companies begin with an online assessment
              test that evaluates your aptitude, coding ability, and sometimes English communication skills. Clearing this is the
              first gate — often 40–70% of candidates are eliminated here.
            </p>
            <h3>Online Assessment Round</h3>
            <p>
              The online test usually includes quantitative aptitude (20–30 questions), logical reasoning (15–25 questions),
              verbal ability (15–20 questions), and a coding section (1–3 problems). Time management is critical — practice with
              timed mock tests to build speed.
            </p>
            <h3>Technical Interview Round(s)</h3>
            <p>
              Technical rounds assess your problem-solving ability and CS fundamentals. Interviewers expect you to code in real-time,
              explain your logic, and discuss time/space complexity. Common topics include arrays, linked lists, trees, graphs,
              dynamic programming, databases, and operating systems.
            </p>
            <h3>HR Interview Round</h3>
            <p>
              The HR round tests your communication, cultural fit, and motivation. Prepare structured answers using the STAR method
              (Situation, Task, Action, Result) for behavioral questions. Know your resume inside out — every line is a potential
              discussion point.
            </p>

            <h2>Company-Specific Preparation</h2>
            <p>
              Different companies have very different hiring bars. Service companies like TCS, Wipro, Infosys, and Cognizant focus
              heavily on aptitude and basic coding. Product companies like Amazon, Microsoft, and Google expect strong DSA and
              system design skills. Tailor your preparation accordingly.
            </p>
            <ul>
              <li><strong>TCS NQT:</strong> Foundation test with aptitude, reasoning, coding, and English. Focus on numerical reasoning and basic programming.</li>
              <li><strong>Wipro NLTH:</strong> NLTH platform test + aptitude + coding. Medium difficulty coding problems.</li>
              <li><strong>Infosys InfyTQ:</strong> InfyTQ certification + placement test. Prepare well for the logical reasoning section.</li>
              <li><strong>Cognizant (GenC):</strong> Aptitude + communication + coding. Verbal ability is heavily weighted.</li>
            </ul>
          </div>

          <div style={{ marginTop: 32 }}>
            <SectionHeading label="Explore More" heading="Continue your preparation" />
            <div className="pp-links-row">
              <button className="pp-link-btn" onClick={() => onNav("/aptitude-questions")}>📊 Aptitude Questions</button>
              <button className="pp-link-btn" onClick={() => onNav("/coding-interview-questions")}>💻 Coding Questions</button>
              <button className="pp-link-btn" onClick={() => onNav("/company-wise-questions/tcs")}>🏢 TCS Placement Guide</button>
              <button className="pp-link-btn" onClick={() => onNav("/company-wise-questions/wipro")}>🏢 Wipro Placement Guide</button>
            </div>
          </div>
        </section>

        <CTABlock
          heading="Practice with AI-Powered Mock Interviews"
          subtext="Get real-time feedback on your answers, communication, and problem-solving approach. Used by 2,400+ students preparing for campus placements."
          buttonLabel="Start practicing free"
          onNav={onNav}
          buttonHref="/"
        />
      </div>
    </PageLayout>
  );
}
