/**
 * CompanyWisePage — handles /company-wise-questions/tcs and /company-wise-questions/wipro
 * DRY implementation: same template, different data passed via `company` prop.
 */
import PageLayout from "./shared/PageLayout.jsx";
import PageHero from "./shared/PageHero.jsx";
import SectionHeading from "./shared/SectionHeading.jsx";
import ContentCard from "./shared/ContentCard.jsx";
import CTABlock from "./shared/CTABlock.jsx";

const STYLES = `
  .cw-page { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px,5vw,60px); }
  .cw-section { padding: 64px 0; border-bottom: 1px solid var(--border); }
  .cw-section:last-child { border-bottom: none; }
  .cw-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
  .cw-syllabus-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
  .cw-syllabus-card {
    background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 20px 22px;
  }
  .cw-syllabus-card h3 { font-size: 15px; font-weight: 700; color: var(--slate); margin: 0 0 8px; }
  .cw-syllabus-card ul { padding-left: 18px; margin: 0; }
  .cw-syllabus-card li { font-size: 13.5px; color: var(--slate-600); line-height: 1.65; margin-bottom: 4px; }
  .cw-pattern-table {
    width: 100%; border-collapse: collapse;
    background: var(--white); border: 1px solid var(--border); border-radius: 12px;
    overflow: hidden; font-size: 14px;
  }
  .cw-pattern-table th {
    background: var(--slate-50); padding: 12px 16px; text-align: left;
    font-size: 12px; font-weight: 700; color: var(--slate-500);
    letter-spacing: 0.06em; text-transform: uppercase;
    border-bottom: 1px solid var(--border);
  }
  .cw-pattern-table td {
    padding: 12px 16px; border-bottom: 1px solid var(--border);
    color: var(--slate-700); line-height: 1.5;
  }
  .cw-pattern-table tr:last-child td { border-bottom: none; }
  .cw-pattern-table tr:hover td { background: var(--slate-50); }
  .cw-links-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .cw-link-btn {
    display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px;
    border: 1px solid var(--border); border-radius: 999px; font-size: 13px;
    font-weight: 600; color: var(--teal-dark); background: var(--teal-light);
    cursor: pointer; transition: all 0.18s; font-family: 'DM Sans', sans-serif;
  }
  .cw-link-btn:hover { background: var(--teal); color: #fff; border-color: var(--teal); }
  .cw-prose h2 { font-size: clamp(20px,3vw,28px); font-weight: 700; color: var(--slate); margin: 40px 0 14px; letter-spacing: -0.02em; }
  .cw-prose h3 { font-size: 17px; font-weight: 700; color: var(--slate-800); margin: 28px 0 10px; }
  .cw-prose p { font-size: 15px; color: var(--slate-600); line-height: 1.78; margin: 0 0 16px; }
  .cw-prose ul { padding-left: 20px; margin: 0 0 16px; }
  .cw-prose li { font-size: 15px; color: var(--slate-600); line-height: 1.7; margin-bottom: 6px; }
  @media (max-width: 680px) { .cw-pattern-table { font-size: 12px; } .cw-pattern-table th, .cw-pattern-table td { padding: 10px 12px; } }
`;

/* ── TCS Data ── */
const TCS_DATA = {
  title: "TCS Placement Questions 2026 | PlacementDo",
  meta: "Complete TCS placement preparation guide — TCS NQT syllabus, previous year questions, aptitude, coding, and interview rounds with AI practice.",
  tag: "TCS NQT · 2026 Edition",
  heading: "TCS Placement Preparation 2026",
  subheading: "Everything you need to crack TCS NQT — from syllabus and previous year patterns to aptitude shortcuts and coding strategies.",

  overviewCards: [
    {
      icon: "📋",
      title: "TCS NQT Overview",
      description: "TCS National Qualifier Test (NQT) is TCS's primary campus hiring assessment. It has a Foundation section (all candidates) and an Advanced section (for higher roles).",
      tags: ["Foundation", "Advanced", "Coding"],
    },
    {
      icon: "⏱️",
      title: "Test Duration",
      description: "Foundation: ~90 minutes covering Numerical, Verbal, Reasoning, and Programming Logic. Advanced: Additional 30–60 minutes with higher-order coding problems.",
      tags: ["90 min Foundation", "30-60 min Advanced"],
    },
    {
      icon: "🎯",
      title: "Passing Criteria",
      description: "No official cutoff is published, but a score above 55–60% in each section is generally safe. There is negative marking in some sections — attempt carefully.",
      tags: ["Sectional Cutoff", "Negative Marking"],
    },
    {
      icon: "💼",
      title: "After NQT",
      description: "Candidates who clear NQT are invited for a Technical Interview, Managerial Interview (optional), and HR round. The full process takes 4–8 weeks.",
      tags: ["Technical", "Managerial", "HR"],
    },
  ],

  syllabusItems: [
    {
      heading: "Numerical Ability",
      topics: ["Number System", "Percentages", "Time & Work", "Time-Speed-Distance", "Data Interpretation", "Profit & Loss", "Averages", "Permutations & Combinations"],
    },
    {
      heading: "Verbal Ability",
      topics: ["Reading Comprehension", "Sentence Completion", "Grammar", "Synonyms & Antonyms", "Para Jumbles", "Error Spotting"],
    },
    {
      heading: "Reasoning Ability",
      topics: ["Seating Arrangements", "Blood Relations", "Coding-Decoding", "Syllogisms", "Directions", "Analogy", "Series Completion"],
    },
    {
      heading: "Programming Logic",
      topics: ["C / Java / Python basics", "Loops and conditionals", "Functions and recursion", "Arrays and strings", "Output prediction", "Complexity estimation"],
    },
    {
      heading: "Coding (Advanced)",
      topics: ["1–2 problems", "Easy to medium DSA", "Arrays, strings, sorting", "Basic data structures", "Python / Java / C++ allowed"],
    },
  ],

  patternRows: [
    ["Numerical Ability", "26 questions", "40 minutes", "Calculators allowed in some years"],
    ["Verbal Ability", "24 questions", "30 minutes", "Focus on reading speed"],
    ["Reasoning Ability", "30 questions", "50 minutes", "Most time-consuming section"],
    ["Programming Logic", "10 questions", "15 minutes", "No coding — MCQ based"],
    ["Coding (Advanced)", "1–2 problems", "30 minutes", "For NQT Advanced track"],
  ],
};

/* ── Infosys Data ── */
const INFOSYS_DATA = {
  title: "Infosys Placement Questions 2026 | PlacementDo",
  meta: "Complete Infosys placement preparation — InfyTQ, Hackwithinfy, aptitude test pattern, and interview rounds. Practice with AI mock interviews.",
  tag: "Infosys · 2026 Edition",
  heading: "Infosys Placement Preparation 2026",
  subheading: "Crack Infosys campus recruitment with our complete guide — InfyTQ platform, aptitude pattern, technical and HR interview tips for freshers.",
  overviewCards: [
    { icon: "📋", title: "InfyTQ Platform", description: "Infosys recruits through InfyTQ — an online learning and assessment platform. Candidates complete courses, earn certifications, and appear in Infosys placement tests.", tags: ["InfyTQ", "Certification", "Online Test"] },
    { icon: "⏱️", title: "Test Pattern", description: "Infosys placement test: Quantitative aptitude (10Q/35min), Reasoning ability (15Q/25min), Verbal ability (20Q/35min), Pseudo code (5Q/25min), and coding (2 problems/3hrs).", tags: ["3 Sections", "Coding Round"] },
    { icon: "🎯", title: "Selection Process", description: "InfyTQ test → Technical interview → HR interview. Candidates who qualify InfyTQ certification are fast-tracked via Infosys' dedicated placement process.", tags: ["InfyTQ Certified", "Tech + HR"] },
    { icon: "💼", title: "Roles Offered", description: "Systems Engineer (3.6 LPA), Technology Analyst via Power Programmer track (9 LPA+). Power Programmer requires strong coding in the assessment.", tags: ["Systems Engineer", "Power Programmer"] },
  ],
  syllabusItems: [
    { heading: "Quantitative Aptitude", topics: ["Number System", "Percentages", "Ratios & Proportion", "Time & Work", "Time-Speed-Distance", "Profit & Loss", "Averages", "Simple & Compound Interest"] },
    { heading: "Reasoning Ability", topics: ["Logical Deduction", "Blood Relations", "Seating Arrangements", "Coding-Decoding", "Cause & Effect", "Input-Output"] },
    { heading: "Verbal Ability", topics: ["Reading Comprehension", "Error Identification", "Sentence Improvement", "Vocabulary", "Para Completion"] },
    { heading: "Pseudo Code", topics: ["Algorithm reading", "Output prediction", "Complexity analysis", "No actual coding", "Logic flow"] },
    { heading: "Coding (Power Programmer)", topics: ["2–3 problems", "Medium-Hard DSA", "Arrays, DP, Graphs", "Any language allowed", "3 hour window"] },
  ],
  patternRows: [
    ["Quantitative Aptitude", "10 questions", "35 minutes", "No negative marking"],
    ["Reasoning Ability", "15 questions", "25 minutes", "Logical and analytical"],
    ["Verbal Ability", "20 questions", "35 minutes", "Reading comprehension heavy"],
    ["Pseudo Code", "5 questions", "25 minutes", "Algorithm interpretation"],
    ["Coding (Power Prog.)", "2–3 problems", "180 minutes", "For Power Programmer track"],
  ],
};

/* ── Accenture Data ── */
const ACCENTURE_DATA = {
  title: "Accenture Placement Questions 2026 | PlacementDo",
  meta: "Complete Accenture placement preparation — CTA test pattern, communication assessment, and interview tips. Practice with AI mock interviews on PlacementDo.",
  tag: "Accenture · 2026 Edition",
  heading: "Accenture Placement Preparation 2026",
  subheading: "Crack Accenture's Cognitive and Technical Assessment, Communication Test, and interview rounds with this complete preparation guide.",
  overviewCards: [
    { icon: "📋", title: "CTA Assessment", description: "Cognitive and Technical Assessment (CTA): 90 questions across cognitive ability and IT technical domain. Strong verbal reasoning and attention to detail sections.", tags: ["Cognitive", "Technical IT", "90 Questions"] },
    { icon: "⏱️", title: "Communication Test", description: "Accenture-unique round: essay writing (20 min), multitasking (listening + reading), and spoken English. Tests communication clarity critical for client-facing roles.", tags: ["Essay", "Spoken English", "Multitasking"] },
    { icon: "🎯", title: "Selection Process", description: "CTA → Communication Assessment → Technical + HR Interview. The process is more communication-focused than other IT service companies.", tags: ["3 Stages", "Communication Focus"] },
    { icon: "💼", title: "Roles Offered", description: "Application Software Engineer (ASE) at ~4.5–7 LPA. Specialist tracks (cloud, AI) available for top performers at higher packages.", tags: ["ASE Role", "Specialist Tracks"] },
  ],
  syllabusItems: [
    { heading: "Verbal Reasoning", topics: ["Reading comprehension", "Sentence completion", "Analogies", "Critical reasoning", "Para jumbles"] },
    { heading: "Attention to Detail", topics: ["Data table comparison", "Proofreading", "Sequential instructions", "Pattern spotting", "Error identification"] },
    { heading: "Abstract Reasoning", topics: ["Shape pattern recognition", "Matrix completion", "Next in series", "Visual analogies"] },
    { heading: "Technical IT", topics: ["Programming fundamentals", "Data structures basics", "DBMS and SQL", "OS and networking", "Code debugging"] },
    { heading: "Communication (Essay)", topics: ["150-250 word essays", "Technology topics", "Social topics", "Clear structure required", "Prose not bullet points"] },
  ],
  patternRows: [
    ["Cognitive Ability", "50 questions", "70 minutes", "Verbal, abstract, attention to detail"],
    ["Technical (IT)", "40 questions", "40 minutes", "CS fundamentals and programming"],
    ["Communication", "Multitask + Essay", "~40 minutes", "Unique Accenture section"],
    ["Interview", "Tech + HR combined", "30–45 minutes", "Project and communication focused"],
  ],
};

/* ── Cognizant Data ── */
const COGNIZANT_DATA = {
  title: "Cognizant Placement Questions 2026 | PlacementDo",
  meta: "Complete Cognizant GenC and GenC Next placement preparation — eSEAT test pattern, aptitude, coding, and interview tips for 2026 freshers.",
  tag: "Cognizant GenC · 2026 Edition",
  heading: "Cognizant Placement Preparation 2026",
  subheading: "Crack Cognizant's GenC and GenC Next recruitment with complete eSEAT test preparation, coding strategies, and interview tips.",
  overviewCards: [
    { icon: "📋", title: "GenC Overview", description: "Cognizant hires through two tracks: GenC (standard, ~4 LPA) and GenC Next (premium, ~6.5+ LPA). Both take the eSEAT test; GenC Next has an additional coding section.", tags: ["GenC", "GenC Next", "Two Tracks"] },
    { icon: "⏱️", title: "eSEAT Test", description: "Employability Skills English Aptitude Test: Aptitude (25Q, 75min), Logical Reasoning (15Q), Verbal (25Q), and Coding (2 problems, 45min) for GenC Next only.", tags: ["eSEAT", "75 min Aptitude", "Coding Optional"] },
    { icon: "🎯", title: "Selection Process", description: "eSEAT → Technical Interview (GenC Next) → HR Interview. The process is relatively fresher-friendly with clear round descriptions.", tags: ["2-3 Rounds", "Fresher Friendly"] },
    { icon: "💼", title: "Roles Offered", description: "Programmer Analyst Trainee (GenC, ~4 LPA), Programmer Analyst (GenC Next, ~6.5 LPA). Both have structured onboarding and training programmes.", tags: ["Programmer Analyst", "Training Programme"] },
  ],
  syllabusItems: [
    { heading: "Quantitative Aptitude", topics: ["Number system", "Percentages", "Time & Work", "TSD", "Averages", "Permutations", "Data Interpretation"] },
    { heading: "Logical Reasoning", topics: ["Seating arrangement", "Blood relations", "Syllogisms", "Coding-decoding", "Direction problems"] },
    { heading: "Verbal Ability", topics: ["Reading comprehension (2 passages)", "Error identification", "Synonyms/Antonyms", "Fill in the blanks", "Sentence correction"] },
    { heading: "Coding (GenC Next)", topics: ["2 DSA problems", "Easy to medium difficulty", "Arrays and strings", "DP basics", "Python, Java, C/C++ allowed"] },
  ],
  patternRows: [
    ["Quantitative Aptitude", "25 questions", "75 minutes", "Most time-critical section"],
    ["Logical Reasoning", "15 questions", "included above", "Seating arrangements common"],
    ["Verbal Ability", "25 questions", "included above", "2 RC passages"],
    ["Coding (GenC Next)", "2 problems", "45 minutes", "Not required for GenC track"],
  ],
};

/* ── HCL Data ── */
const HCL_DATA = {
  title: "HCL Placement Questions 2026 | PlacementDo",
  meta: "Complete HCL placement preparation — HCLAT test, TechBee programme, aptitude, and interview rounds. AI mock interview practice on PlacementDo.",
  tag: "HCL TechBee · 2026 Edition",
  heading: "HCL Placement Preparation 2026",
  subheading: "Crack HCL's campus recruitment process — HCLAT test, technical interview, and HR round with this comprehensive preparation guide.",
  overviewCards: [
    { icon: "📋", title: "HCLAT Overview", description: "HCL Aptitude Test (HCLAT) is the primary screening tool. It covers quantitative aptitude, logical reasoning, verbal ability, and basic programming knowledge.", tags: ["HCLAT", "4 Sections", "Online Test"] },
    { icon: "⏱️", title: "Test Duration", description: "HCLAT: approximately 60 minutes for aptitude + 30 minutes for technical / programming section. Total: ~90 minutes. No official negative marking confirmed.", tags: ["90 Minutes", "Aptitude + Technical"] },
    { icon: "🎯", title: "Selection Process", description: "Written test (HCLAT) → Technical Interview → HR Interview. HCL is known for straightforward, friendly interview rounds compared to other large IT companies.", tags: ["3-Stage Process", "Fresher Friendly"] },
    { icon: "💼", title: "Roles Offered", description: "HCL TechBee (after class 12, ~3.5 LPA), Graduate Engineer Trainee (after B.Tech, ~3.75–6 LPA). HCL Unica track for exceptional performers.", tags: ["TechBee", "GET Role", "Unica Track"] },
  ],
  syllabusItems: [
    { heading: "Quantitative Aptitude", topics: ["Number system", "Ratios & Percentages", "Time-Speed-Distance", "Time & Work", "Profit & Loss", "Simple & Compound Interest"] },
    { heading: "Logical Reasoning", topics: ["Series completion", "Analogies", "Blood relations", "Direction problems", "Data sufficiency", "Coding-decoding"] },
    { heading: "Verbal Ability", topics: ["Reading comprehension", "Grammar and error spotting", "Vocabulary", "Sentence correction", "Para jumbles"] },
    { heading: "Technical / Programming", topics: ["C/C++ basics", "OOP concepts", "Data structures: arrays, stacks", "OS fundamentals", "DBMS basics", "Output prediction MCQs"] },
  ],
  patternRows: [
    ["Quantitative Aptitude", "~20 questions", "30 minutes", "Speed important"],
    ["Logical Reasoning", "~15 questions", "20 minutes", "Series and analogy heavy"],
    ["Verbal Ability", "~20 questions", "20 minutes", "Grammar and RC"],
    ["Technical", "~15 questions", "30 minutes", "Programming MCQs"],
  ],
};

/* ── Wipro Data ── */
const WIPRO_DATA = {
  title: "Wipro Placement Questions 2026 | PlacementDo",
  meta: "Complete Wipro placement preparation — NLTH test pattern, aptitude, coding, and interview rounds. Practice with AI-powered mock interviews.",
  tag: "Wipro NLTH · 2026 Edition",
  heading: "Wipro Placement Preparation 2026",
  subheading: "Crack Wipro's NLTH assessment with our comprehensive guide — test pattern, syllabus, previous year questions, and interview tips.",

  overviewCards: [
    {
      icon: "📋",
      title: "Wipro NLTH Overview",
      description: "Wipro's National Level Talent Hunt (NLTH) is the primary campus hiring platform. The online test is conducted on Mettl platform and tests aptitude, verbal, and coding ability.",
      tags: ["Mettl Platform", "Online Test"],
    },
    {
      icon: "⏱️",
      title: "Test Duration",
      description: "Total ~55 minutes: Online test with Aptitude (16 questions/16 min), Verbal English (22 questions/18 min), Written Communication (1 essay/20 min), and a coding section.",
      tags: ["55 min", "3 Sections + Essay"],
    },
    {
      icon: "🎯",
      title: "Selection Process",
      description: "Online Test → Technical Interview → HR Interview. Some profiles include a Managerial round. The entire process typically spans 3–5 weeks post-application.",
      tags: ["3-Stage Process", "Technical + HR"],
    },
    {
      icon: "💼",
      title: "Roles Offered",
      description: "Project Engineer (PE) and Wipro Elite NTH are the two main campus tracks. Elite NTH has higher package (6 LPA) and a tougher selection bar.",
      tags: ["Project Engineer", "Elite NTH"],
    },
  ],

  syllabusItems: [
    {
      heading: "Aptitude",
      topics: ["Number Systems", "Percentages", "Time & Work", "Profit & Loss", "Ratios", "Averages", "Probability basics", "Clock & Calendar"],
    },
    {
      heading: "Verbal English",
      topics: ["Reading Comprehension", "Sentence Correction", "Fill in the blanks", "Error Identification", "Vocabulary", "Paragraph Completion"],
    },
    {
      heading: "Written Communication",
      topics: ["Essay writing (1 topic)", "Clarity of expression", "Grammar accuracy", "Coherence and structure", "Word limit: 200–400 words"],
    },
    {
      heading: "Coding Section",
      topics: ["1–2 coding problems", "Easy to medium difficulty", "Arrays, strings, patterns", "Python / Java / C allowed", "30–40 minutes for coding"],
    },
  ],

  patternRows: [
    ["Aptitude", "16 questions", "16 minutes", "Calculator not provided"],
    ["Verbal English", "22 questions", "18 minutes", "Grammar heavily tested"],
    ["Written Communication", "1 essay", "20 minutes", "Scored for clarity & grammar"],
    ["Coding", "1–2 problems", "30–40 minutes", "Any common language"],
  ],
};

/* ── Shared tips (same for both companies) ── */
const PREP_TIPS = [
  {
    icon: "📝",
    title: "Previous Year Papers",
    description: "Practice at least 5–8 full previous year papers under timed conditions. Pattern recognition is key — many question types repeat with minor variations.",
  },
  {
    icon: "⚡",
    title: "Speed > Perfection",
    description: "Aim to attempt all questions rather than spending too long on any one. Skip and return — unattempted questions definitely score 0.",
  },
  {
    icon: "🗣️",
    title: "Technical Interview Prep",
    description: "Know your resume cold. Prepare answers for: Tell me about yourself, your best project, a technical challenge you overcame, and basic DSA questions.",
  },
  {
    icon: "✍️",
    title: "Essay / Written Round",
    description: "For Wipro's Written Communication round — practice writing 250-word essays on tech, career, and social topics. Structure: intro → 2-3 body points → conclusion.",
  },
];

export default function CompanyWisePage({ company, onNav }) {
  const DATA_MAP = { tcs: TCS_DATA, wipro: WIPRO_DATA, infosys: INFOSYS_DATA, accenture: ACCENTURE_DATA, cognizant: COGNIZANT_DATA, hcl: HCL_DATA };
  const data = DATA_MAP[company] || TCS_DATA;
  const otherLinks = Object.entries(DATA_MAP)
    .filter(([k]) => k !== company)
    .map(([k, d]) => ({ key: k, label: d.heading.replace(" Placement Preparation 2026", "") }));

  return (
    <PageLayout
      title={data.title}
      metaDescription={data.meta}
      onNav={onNav}
    >
      <style>{STYLES}</style>

      <PageHero
        tag={data.tag}
        heading={data.heading}
        subheading={data.subheading}
        ctaButtons={[
          { label: "Start AI Mock Interview", onClick: () => onNav("/dashboard") },
          { label: "Full Placement Guide", onClick: () => onNav("/placement-preparation") },
        ]}
      />

      <div className="cw-page">
        {/* Overview */}
        <section className="cw-section">
          <SectionHeading
            label="Overview"
            heading={`${company.toUpperCase()} hiring process explained`}
            description="Understand every stage of the selection process before you start preparing."
          />
          <div className="cw-grid">
            {data.overviewCards.map((c) => <ContentCard key={c.title} {...c} />)}
          </div>
        </section>

        {/* Syllabus */}
        <section className="cw-section">
          <SectionHeading
            label="Syllabus"
            heading={`${company.toUpperCase()} assessment syllabus`}
            description="Complete topic-wise syllabus for all sections of the online assessment."
          />
          <div className="cw-syllabus-grid">
            {data.syllabusItems.map(({ heading, topics }) => (
              <div key={heading} className="cw-syllabus-card">
                <h3>{heading}</h3>
                <ul>
                  {topics.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Previous year pattern */}
        <section className="cw-section">
          <SectionHeading
            label="Test Pattern"
            heading="Previous year test pattern"
            description="Section-wise breakdown based on previous year placement drives."
          />
          <div style={{ overflowX: "auto" }}>
            <table className="cw-pattern-table">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>Questions</th>
                  <th>Time</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {data.patternRows.map(([section, questions, time, notes]) => (
                  <tr key={section}>
                    <td><strong>{section}</strong></td>
                    <td>{questions}</td>
                    <td>{time}</td>
                    <td style={{ color: "var(--slate-500)" }}>{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <section className="cw-section">
          <SectionHeading
            label="Strategy"
            heading="Tips to clear the assessment"
            description="Actionable strategies from candidates who've successfully cleared the process."
          />
          <div className="cw-grid">
            {PREP_TIPS.map((t) => <ContentCard key={t.title} {...t} />)}
          </div>
        </section>

        {/* Prose + links */}
        <section className="cw-section">
          <div className="cw-prose">
            <h2>Interview Round Preparation</h2>
            <h3>Technical Interview</h3>
            <p>
              The technical round typically lasts 30–45 minutes. Interviewers focus on your academic projects, basic DSA questions,
              CS fundamentals (DBMS, OS), and programming knowledge. Have 2–3 projects ready to discuss in detail — explaining
              your role, the tech stack, and key challenges you solved.
            </p>
            <h3>HR Interview</h3>
            <p>
              HR rounds for service companies like {company.toUpperCase()} are more about attitude, communication, and cultural fit
              than technical depth. Prepare clear answers for: "Tell me about yourself", "Why {company.toUpperCase()}?",
              "Where do you see yourself in 5 years?", and "What are your strengths and weaknesses?"
            </p>
            <h3>Common Mistakes to Avoid</h3>
            <ul>
              <li>Spending too long on any single question in the online test</li>
              <li>Not practicing time-bound mock tests before the actual exam</li>
              <li>Underestimating the verbal/written communication sections</li>
              <li>Not researching the company before the HR round</li>
              <li>Neglecting soft skills — communication matters as much as technical knowledge</li>
            </ul>
          </div>

          <div style={{ marginTop: 32 }}>
            <SectionHeading label="Related Resources" heading="Explore more guides" />
            <div className="cw-links-row">
              <button className="cw-link-btn" onClick={() => onNav("/placement-preparation-complete-guide")}>Complete Placement Guide</button>
              <button className="cw-link-btn" onClick={() => onNav("/placement-preparation")}>Placement Prep Tips</button>
              <button className="cw-link-btn" onClick={() => onNav("/aptitude-questions")}>Aptitude Questions</button>
              <button className="cw-link-btn" onClick={() => onNav("/coding-interview-questions")}>Coding Questions</button>
              {otherLinks.map(({ key, label }) => (
                <button key={key} className="cw-link-btn" onClick={() => onNav(`/company-wise-questions/${key}`)}>{label}</button>
              ))}
            </div>
          </div>
        </section>


        <CTABlock
          heading={`Practice ${company.toUpperCase()} Interview with AI`}
          subtext={`Simulate real ${company.toUpperCase()} technical and HR interviews. Get instant feedback on your answers and communication skills.`}
          buttonLabel="Start mock interview"
          onNav={onNav}
          buttonHref="/dashboard"
        />
      </div>
    </PageLayout>
  );
}
