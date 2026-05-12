/**
 * CodingInterviewPage — /coding-interview-questions
 * Coding interview questions and preparation guide.
 */
import PageLayout from "./shared/PageLayout.jsx";
import PageHero from "./shared/PageHero.jsx";
import SectionHeading from "./shared/SectionHeading.jsx";
import ContentCard from "./shared/ContentCard.jsx";
import CTABlock from "./shared/CTABlock.jsx";

const STYLES = `
  .ci-page { max-width: 1100px; margin: 0 auto; padding: 0 clamp(20px,5vw,60px); }
  .ci-section { padding: 64px 0; border-bottom: 1px solid var(--border); }
  .ci-section:last-child { border-bottom: none; }
  .ci-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
  .ci-diff-grid { display: grid; gap: 20px; grid-template-columns: repeat(3, 1fr); }
  .ci-diff-card {
    border-radius: 14px; padding: 28px 24px; text-align: center;
    border: 2px solid transparent;
  }
  .ci-diff-easy { background: #F0FDF4; border-color: #86EFAC; }
  .ci-diff-medium { background: #FFFBEB; border-color: #FCD34D; }
  .ci-diff-hard { background: #FFF1F2; border-color: #FDA4AF; }
  .ci-diff-label { font-size: 13px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 8px; }
  .ci-diff-easy .ci-diff-label { color: #16A34A; }
  .ci-diff-medium .ci-diff-label { color: #D97706; }
  .ci-diff-hard .ci-diff-label { color: #E11D48; }
  .ci-diff-count { font-size: 40px; font-weight: 800; color: var(--slate); letter-spacing: -0.03em; margin-bottom: 8px; }
  .ci-diff-desc { font-size: 13px; color: var(--slate-500); line-height: 1.6; }
  .ci-steps { display: flex; flex-direction: column; gap: 16px; }
  .ci-step {
    display: flex; gap: 18px; align-items: flex-start;
    padding: 20px 24px; background: var(--white); border: 1px solid var(--border);
    border-radius: 12px;
  }
  .ci-step-num {
    width: 36px; height: 36px; border-radius: 50%; background: var(--teal-light);
    color: var(--teal-dark); font-size: 15px; font-weight: 800; display: flex;
    align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ci-step-body h3 { font-size: 15.5px; font-weight: 700; color: var(--slate); margin: 0 0 6px; }
  .ci-step-body p { font-size: 14px; color: var(--slate-500); line-height: 1.65; margin: 0; }
  .ci-links-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .ci-link-btn {
    display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px;
    border: 1px solid var(--border); border-radius: 999px; font-size: 13px;
    font-weight: 600; color: var(--teal-dark); background: var(--teal-light);
    cursor: pointer; transition: all 0.18s; font-family: 'DM Sans', sans-serif;
  }
  .ci-link-btn:hover { background: var(--teal); color: #fff; border-color: var(--teal); }
  .ci-prose h2 { font-size: clamp(20px,3vw,28px); font-weight: 700; color: var(--slate); margin: 40px 0 14px; letter-spacing: -0.02em; }
  .ci-prose h3 { font-size: 17px; font-weight: 700; color: var(--slate-800); margin: 28px 0 10px; }
  .ci-prose p { font-size: 15px; color: var(--slate-600); line-height: 1.78; margin: 0 0 16px; }
  .ci-prose ul { padding-left: 20px; margin: 0 0 16px; }
  .ci-prose li { font-size: 15px; color: var(--slate-600); line-height: 1.7; margin-bottom: 6px; }
  @media (max-width: 640px) { .ci-diff-grid { grid-template-columns: 1fr; } }
`;

const TOPICS = [
  {
    icon: "📦",
    title: "Arrays & Strings",
    description: "Two pointers, sliding window, prefix sums, sorting, binary search. Most commonly tested — every interview has at least one array problem.",
    tags: ["Two Pointers", "Sliding Window", "Binary Search"],
  },
  {
    icon: "🌲",
    title: "Trees & Graphs",
    description: "BST operations, tree traversals (BFS/DFS), level-order traversal, LCA, graph connectivity, shortest paths (Dijkstra, BFS), topological sort.",
    tags: ["BFS", "DFS", "Shortest Path"],
  },
  {
    icon: "🧠",
    title: "Dynamic Programming",
    description: "1D and 2D DP, memoization vs tabulation, classic problems: 0/1 knapsack, LCS, LIS, coin change, matrix chain multiplication.",
    tags: ["Memoization", "Tabulation", "Knapsack"],
  },
  {
    icon: "🔗",
    title: "Linked Lists",
    description: "Reversal, cycle detection (Floyd's), merge operations, find middle, remove nth node. Often combined with recursion problems.",
    tags: ["Floyd's", "Recursion"],
  },
  {
    icon: "🗃️",
    title: "Stacks & Queues",
    description: "Monotonic stack, next greater element, valid parentheses, implement queue using stacks, LRU cache (deque-based).",
    tags: ["Monotonic Stack", "LRU Cache"],
  },
  {
    icon: "🔤",
    title: "Hashing & Sets",
    description: "HashMap patterns, frequency counting, anagram detection, subarray sum equals k, two-sum variants, duplicate detection.",
    tags: ["HashMap", "HashSet"],
  },
  {
    icon: "🏗️",
    title: "System Design",
    description: "URL shortener, rate limiter, notification system, distributed cache. Required for mid/senior roles at product companies.",
    tags: ["Scalability", "CAP Theorem"],
  },
  {
    icon: "💾",
    title: "OS & DBMS",
    description: "Process scheduling, deadlocks, memory management, SQL joins, ACID properties, indexing, normalization. Heavy in service company interviews.",
    tags: ["SQL", "ACID", "Deadlocks"],
  },
  {
    icon: "🌐",
    title: "Networks & OS",
    description: "HTTP/HTTPS, TCP/UDP, DNS, REST vs gRPC, threading, concurrency. Common in backend and full-stack interviews.",
    tags: ["HTTP", "TCP", "Concurrency"],
  },
];

const DIFFICULTY = [
  {
    level: "Easy",
    cls: "ci-diff-easy",
    count: "~35%",
    desc: "Service company levels (TCS, Infosys). Focus: basic array manipulation, string operations, simple recursion.",
  },
  {
    level: "Medium",
    cls: "ci-diff-medium",
    count: "~50%",
    desc: "Product company on-campus (Amazon, Flipkart, Adobe). Focus: DP, trees, graphs, sliding window.",
  },
  {
    level: "Hard",
    cls: "ci-diff-hard",
    count: "~15%",
    desc: "FAANG/unicorn interviews. Focus: advanced DP, graph algorithms, segment trees, system design.",
  },
];

const APPROACH_STEPS = [
  {
    num: "1",
    title: "Clarify the problem",
    desc: "Ask about edge cases, input constraints, and expected output format before writing any code. Shows structured thinking.",
  },
  {
    num: "2",
    title: "Think aloud — brute force first",
    desc: "State a brute-force approach even if inefficient. This shows you understand the problem. Then optimize iteratively.",
  },
  {
    num: "3",
    title: "Write clean, commented code",
    desc: "Use meaningful variable names. Add comments for non-obvious logic. Interviewers read your code — make it easy.",
  },
  {
    num: "4",
    title: "Analyze time & space complexity",
    desc: "Always state Big-O. Common expected complexities: O(n log n) for sort-based, O(n) for hash-based, O(log n) for binary search.",
  },
  {
    num: "5",
    title: "Test with examples",
    desc: "Walk through your solution with the given example and one edge case (empty array, single element, duplicates) before submitting.",
  },
];

export default function CodingInterviewPage({ onNav }) {
  return (
    <PageLayout
      title="Coding Interview Questions 2026 | PlacementDo"
      metaDescription="Top coding interview questions from FAANG, product companies, and service companies. Arrays, trees, DP, system design — practice with AI feedback."
      keywords={["coding interview questions", "DSA interview questions", "placement coding preparation", "technical interview questions", "placementdo coding"]}
      onNav={onNav}
    >
      <style>{STYLES}</style>

      <PageHero
        tag="DSA + System Design · 2026"
        heading="Coding Interview Questions"
        subheading="Master the topics that matter — from easy arrays for service companies to hard system design for FAANG. Practice with AI-powered mock interviews."
        ctaButtons={[
          { label: "Start AI Mock Interview", onClick: () => onNav("/dashboard") },
          { label: "Placement Prep Guide", onClick: () => onNav("/placement-preparation") },
        ]}
      />

      <div className="ci-page">
        {/* Topics */}
        <section className="ci-section">
          <SectionHeading
            label="Topics"
            heading="Coding interview topics to master"
            description="Organized by frequency of appearance in campus placements and product company interviews."
          />
          <div className="ci-grid">
            {TOPICS.map((t) => <ContentCard key={t.title} {...t} />)}
          </div>
        </section>

        {/* Difficulty breakdown */}
        <section className="ci-section">
          <SectionHeading
            label="Difficulty Breakdown"
            heading="What difficulty level should you target?"
            description="Your target difficulty depends entirely on the companies you're applying to. Here's how to calibrate."
          />
          <div className="ci-diff-grid">
            {DIFFICULTY.map(({ level, cls, count, desc }) => (
              <div key={level} className={`ci-diff-card ${cls}`}>
                <div className="ci-diff-label">{level}</div>
                <div className="brig ci-diff-count">{count}</div>
                <div className="ci-diff-desc">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How to approach */}
        <section className="ci-section">
          <SectionHeading
            label="Framework"
            heading="How to approach coding rounds"
            description="A 5-step process used by successful candidates at product and service companies."
          />
          <div className="ci-steps">
            {APPROACH_STEPS.map(({ num, title, desc }) => (
              <div key={num} className="ci-step">
                <div className="ci-step-num">{num}</div>
                <div className="ci-step-body">
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rich prose */}
        <section className="ci-section">
          <div className="ci-prose">
            <h2>Coding Rounds at Different Company Types</h2>

            <h3>Service Companies (TCS, Wipro, Infosys, Cognizant)</h3>
            <p>
              Service company coding rounds are relatively straightforward — typically 1–2 easy problems in 30–45 minutes.
              Topics: basic array operations, string manipulation, simple sorting, basic recursion. Focus on writing bug-free
              code and handling edge cases. Most accept Java, Python, or C++.
            </p>

            <h3>Mid-Product Companies (Amazon, Adobe, Flipkart, Myntra)</h3>
            <p>
              Expect 2–3 medium problems in 60–90 minutes. Heavy focus on DSA: trees, graphs, dynamic programming, and heaps.
              Amazon specifically tests leadership principles in technical rounds — be prepared to discuss your approach and trade-offs.
            </p>

            <h3>FAANG &amp; Unicorns (Google, Microsoft, Meta)</h3>
            <p>
              5–6 rounds including 3–4 technical coding rounds and a system design round. Mix of medium and hard problems.
              System design for SDE-2 and above. Expect discussions about complexity, scalability, and design decisions.
            </p>

            <h2>Most Frequent Coding Patterns</h2>
            <ul>
              <li><strong>Two Pointers:</strong> Pair sum, remove duplicates, sorted array merge, 3-sum</li>
              <li><strong>Sliding Window:</strong> Maximum subarray, longest unique substring, minimum window</li>
              <li><strong>BFS/DFS on Graphs:</strong> Islands count, word ladder, shortest path, cycles detection</li>
              <li><strong>Binary Search:</strong> Search in rotated array, first/last position, peak element</li>
              <li><strong>Dynamic Programming:</strong> Coin change, climb stairs, house robber, edit distance</li>
              <li><strong>Backtracking:</strong> Subsets, permutations, N-queens, Sudoku solver</li>
            </ul>

            <h3>Language Recommendation</h3>
            <p>
              Python is recommended for most interviews due to concise syntax — you'll write 30–40% less code than Java or C++.
              For companies with strict performance requirements (systems roles), use C++. Java is acceptable everywhere but
              verbose for competitive-style problems.
            </p>
          </div>

          <div style={{ marginTop: 32 }}>
            <SectionHeading label="Related Resources" heading="Continue preparing" />
            <div className="ci-links-row">
              <button className="ci-link-btn" onClick={() => onNav("/placement-preparation")}>Placement Guide</button>
              <button className="ci-link-btn" onClick={() => onNav("/aptitude-questions")}>Aptitude Questions</button>
              <button className="ci-link-btn" onClick={() => onNav("/company-wise-questions/tcs")}>TCS Guide</button>
              <button className="ci-link-btn" onClick={() => onNav("/company-wise-questions/wipro")}>Wipro Guide</button>
            </div>
          </div>
        </section>

        <CTABlock
          heading="Practice Coding Problems with AI Feedback"
          subtext="Get instant feedback on your solutions, explanation quality, and communication. Practice real interview scenarios with PlacementDo."
          buttonLabel="Start coding practice"
          onNav={onNav}
          buttonHref="/dashboard"
        />
      </div>
    </PageLayout>
  );
}
