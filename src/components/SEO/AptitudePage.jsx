/**
 * AptitudePage — /aptitude-questions
 * Aptitude questions and practice guide for placement tests.
 */
import PageLayout from "./shared/PageLayout.jsx";
import PageHero from "./shared/PageHero.jsx";
import SectionHeading from "./shared/SectionHeading.jsx";
import ContentCard from "./shared/ContentCard.jsx";
import CTABlock from "./shared/CTABlock.jsx";

const STYLES = `
  .ap-page { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px,5vw,60px); }
  .ap-section { padding: 64px 0; border-bottom: 1px solid var(--border); }
  .ap-section:last-child { border-bottom: none; }
  .ap-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); }
  .ap-list-section {
    background: var(--white); border: 1px solid var(--border); border-radius: 16px;
    padding: 32px 36px;
  }
  .ap-list-col { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; }
  .ap-list-item {
    display: flex; align-items: flex-start; gap: 10px; padding: 8px 0;
    border-bottom: 1px solid var(--border); font-size: 14.5px; color: var(--slate-700);
    line-height: 1.5;
  }
  .ap-list-item:last-child { border-bottom: none; }
  .ap-list-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--teal); flex-shrink: 0; margin-top: 7px; }
  .ap-links-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .ap-link-btn {
    display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px;
    border: 1px solid var(--border); border-radius: 999px; font-size: 13px;
    font-weight: 600; color: var(--teal-dark); background: var(--teal-light);
    cursor: pointer; transition: all 0.18s; font-family: 'DM Sans', sans-serif;
  }
  .ap-link-btn:hover { background: var(--teal); color: #fff; border-color: var(--teal); }
  .ap-prose h2 { font-size: clamp(20px,3vw,28px); font-weight: 700; color: var(--slate); margin: 40px 0 14px; letter-spacing: -0.02em; }
  .ap-prose h3 { font-size: 17px; font-weight: 700; color: var(--slate-800); margin: 28px 0 10px; }
  .ap-prose p { font-size: 15px; color: var(--slate-600); line-height: 1.78; margin: 0 0 16px; }
  .ap-prose ul { padding-left: 20px; margin: 0 0 16px; }
  .ap-prose li { font-size: 15px; color: var(--slate-600); line-height: 1.7; margin-bottom: 6px; }
  @media (max-width: 640px) { .ap-list-col { grid-template-columns: 1fr; } }
`;

const TOPICS = [
  {
    icon: "🔢",
    title: "Quantitative Aptitude",
    description: "Number system, percentages, profit & loss, time-speed-distance, time & work, simple & compound interest, mixtures, ratio & proportion.",
    tags: ["50+ question types"],
  },
  {
    icon: "🧩",
    title: "Logical Reasoning",
    description: "Series completion, blood relations, directions, coding-decoding, syllogisms, arrangements, puzzles, and input-output problems.",
    tags: ["40+ question types"],
  },
  {
    icon: "📝",
    title: "Verbal Ability",
    description: "Reading comprehension, grammar, sentence correction, vocabulary (synonyms/antonyms), para jumbles, and error spotting.",
    tags: ["Highly tested"],
  },
  {
    icon: "📊",
    title: "Data Interpretation",
    description: "Bar charts, pie charts, line graphs, tables, caselets. Focus on calculation speed — practice mental maths and approximation.",
    tags: ["Tables", "Charts", "Graphs"],
  },
  {
    icon: "🧮",
    title: "Number Systems & Algebra",
    description: "HCF/LCM, prime numbers, divisibility rules, progressions (AP/GP), quadratic equations, inequalities.",
    tags: ["Foundational"],
  },
  {
    icon: "📐",
    title: "Geometry & Mensuration",
    description: "Areas and volumes of 2D and 3D shapes, coordinate geometry basics, trigonometry — tested in TCS, Wipro, and Infosys assessments.",
    tags: ["Geometry", "Mensuration"],
  },
];

const MOST_ASKED = [
  "Time, Speed & Distance problems",
  "Pipes and Cisterns",
  "Profit and Loss with discounts",
  "Age-based word problems",
  "Number series completion",
  "Seating arrangement (circular and linear)",
  "Statement and Conclusions (syllogisms)",
  "Reading comprehension passages",
  "Sentence rearrangement (para jumbles)",
  "Bar chart / pie chart analysis",
  "Mixture and Alligation",
  "Simple and Compound Interest",
  "Permutations and Combinations",
  "Probability basics",
];

const TIPS = [
  {
    icon: "⏱️",
    title: "Practice Timed Tests",
    description: "Aptitude tests are time-constrained — typically 60–90 seconds per question. Build speed through daily practice with strict timers. Speed is a skill, not a trait.",
  },
  {
    icon: "🎯",
    title: "Focus on High-Weight Topics",
    description: "Time-speed-distance, profit/loss, and number series together account for 35–40% of most tests. Master these first before expanding to other areas.",
  },
  {
    icon: "✍️",
    title: "Learn Shortcuts & Tricks",
    description: "Vedic maths shortcuts, percentage shortcuts, and elimination strategies can cut your solving time by 40–50%. Practice these until they become second nature.",
  },
  {
    icon: "📖",
    title: "Revise Formulas Daily",
    description: "Keep a formula sheet and revise every morning. Regular spaced repetition of formulas prevents blanking out in exam pressure.",
  },
];

export default function AptitudePage({ onNav }) {
  return (
    <PageLayout
      title="Aptitude Questions for Placement 2026 | PlacementDo"
      metaDescription="Practice 500+ aptitude questions with solutions — quantitative aptitude, logical reasoning, verbal ability, and data interpretation. Boost your placement test score."
      keywords={["aptitude questions for placement", "quantitative aptitude", "logical reasoning", "placement aptitude test", "placementdo aptitude"]}
      onNav={onNav}
    >
      <style>{STYLES}</style>

      <PageHero
        tag="500+ Questions · Updated 2026"
        heading="Aptitude Questions for Placement"
        subheading="Comprehensive aptitude preparation covering quantitative, logical, and verbal sections — the three pillars of every campus placement online assessment."
        ctaButtons={[
          { label: "Start AI Mock Interview", onClick: () => onNav("/dashboard") },
          { label: "Placement Prep Guide", onClick: () => onNav("/placement-preparation") },
        ]}
      />

      <div className="ap-page">
        {/* Topics covered */}
        <section className="ap-section">
          <SectionHeading
            label="Topics Covered"
            heading="Aptitude topics for placement tests"
            description="All major aptitude topics tested in TCS, Wipro, Infosys, Cognizant, Accenture, and other campus placement drives."
          />
          <div className="ap-grid">
            {TOPICS.map((t) => <ContentCard key={t.title} {...t} />)}
          </div>
        </section>

        {/* Most asked types */}
        <section className="ap-section">
          <SectionHeading
            label="Most Frequently Asked"
            heading="Most asked aptitude question types"
            description="Based on analysis of placement papers from 50+ companies. These question types appear in almost every campus placement assessment."
          />
          <div className="ap-list-section">
            <div className="ap-list-col">
              {MOST_ASKED.map((item) => (
                <div key={item} className="ap-list-item">
                  <div className="ap-list-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="ap-section">
          <SectionHeading
            label="Strategy"
            heading="Tips to crack aptitude tests"
            description="Proven strategies to improve your aptitude score in 4–6 weeks of structured practice."
          />
          <div className="ap-grid">
            {TIPS.map((t) => <ContentCard key={t.title} {...t} />)}
          </div>
        </section>

        {/* Rich prose */}
        <section className="ap-section">
          <div className="ap-prose">
            <h2>Why Aptitude Tests Matter in Placements</h2>
            <p>
              Aptitude tests are the first filter in almost every campus placement process. Companies use them to screen hundreds
              or thousands of applicants down to a manageable interview pool. A strong aptitude score can offset weaknesses in other
              areas and gets you to the rounds that actually matter.
            </p>

            <h3>Quantitative Aptitude: What to Expect</h3>
            <p>
              Most placement aptitude tests allocate 25–35% of marks to quantitative aptitude. Topics covered include arithmetic
              (percentages, ratios, profit & loss), algebra (quadratic equations, progressions), geometry, and number theory.
              The difficulty is typically 10th–12th grade level but requires speed — you have 50–70 seconds per question.
            </p>

            <h3>Logical Reasoning: The Differentiator</h3>
            <p>
              Logical reasoning differentiates candidates who can think structurally. Common question types: blood relations,
              directional problems, coding-decoding, seating arrangements, syllogisms, and input-output problems. Practice at
              least 20 logical reasoning questions daily for 4 weeks to build pattern recognition.
            </p>

            <h3>Verbal Ability: Often Neglected, Always Tested</h3>
            <p>
              Verbal ability sections catch many engineering students off guard. Companies like Cognizant, Capgemini, and HCL
              weight verbal ability heavily. Focus areas: reading comprehension (speed reading), grammar rules (subject-verb
              agreement, tenses), vocabulary (1000 words with context), and sentence rearrangement.
            </p>

            <h3>Company-Wise Aptitude Patterns</h3>
            <ul>
              <li><strong>TCS NQT:</strong> Numerical Ability (26 questions/40 min) + Verbal (24 questions/30 min) + Reasoning (30 questions/50 min)</li>
              <li><strong>Wipro NLTH:</strong> Aptitude (18 questions/16 min) + Verbal (22 questions/18 min) + Written Comm (1 essay)</li>
              <li><strong>Infosys:</strong> Mathematical Ability + Puzzles + Verbal + Logical (total 65 questions/95 min)</li>
              <li><strong>Cognizant GenC:</strong> Aptitude (16 questions) + Verbal (25 questions) + Logical (24 questions)</li>
            </ul>
          </div>

          <div style={{ marginTop: 32 }}>
            <SectionHeading label="Related Resources" heading="Continue preparing" />
            <div className="ap-links-row">
              <button className="ap-link-btn" onClick={() => onNav("/placement-preparation")}>Full Placement Guide</button>
              <button className="ap-link-btn" onClick={() => onNav("/coding-interview-questions")}>Coding Questions</button>
              <button className="ap-link-btn" onClick={() => onNav("/company-wise-questions/tcs")}>TCS NQT Guide</button>
              <button className="ap-link-btn" onClick={() => onNav("/company-wise-questions/wipro")}>Wipro NLTH Guide</button>
            </div>
          </div>
        </section>

        <CTABlock
          heading="Practice Aptitude + Mock Interviews Together"
          subtext="PlacementDo combines aptitude prep with AI-powered mock interviews for a complete placement preparation experience."
          buttonLabel="Try PlacementDo free"
          onNav={onNav}
          buttonHref="/dashboard"
        />
      </div>
    </PageLayout>
  );
}
