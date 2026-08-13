import React from 'react';
import { motion } from 'framer-motion';

const Tag = ({ children, color="slate", size="md" }) => {
  const p = size==="xs" ? "2px 8px" : size==="sm" ? "4px 10px" : "6px 14px";
  const f = size==="xs" ? 11 : size==="sm" ? 12 : 13;
  return (
    <span style={{ display:"inline-flex", padding:p, fontSize:f, fontWeight:700, borderRadius:20, letterSpacing:"0.04em", textTransform:"uppercase",
      background:`var(--${color}-light)`, color:`var(--${color}-dark)`, border:`1px solid rgba(13,148,136,0.15)` }}>
      {children}
    </span>
  );
};

const BlogShell = ({ children, onNav }) => (
  <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }} style={{ minHeight:"100vh", paddingTop:88, paddingBottom:80, background:"var(--slate-50)" }}>
    <div style={{ maxWidth:800, margin:"0 auto", padding:"0 20px" }}>
      <button onClick={()=>onNav("blog")} style={{ display:"inline-flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer", fontSize:13, color:"var(--slate-500)", fontFamily:"'DM Sans',sans-serif", marginBottom:24, padding:0 }}>
        Back to Blog
      </button>
      {children}
    </div>
  </motion.div>
);

export const BlogSystemDesign = ({ onNav }) => (
  <BlogShell onNav={onNav}>
    <Tag color="teal">System Design</Tag>
    <h1 className="brig" style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, color:"var(--slate)", letterSpacing:"-0.03em", lineHeight:1.15, marginTop:16, marginBottom:8 }}>How to Ace System Design Interviews in 2026</h1>
    <p style={{ fontSize:14, color:"var(--slate-400)", marginBottom:32 }}>August 2026 ┬╖ 12 min read</p>
    <div style={{ display:"flex", flexDirection:"column", gap:24, fontSize:15.5, color:"var(--slate-700)", lineHeight:1.8 }}>
      <p>System design interviews are the most feared round at FAANG and top-tier tech companies. Unlike algorithm questions, there is no single correct answer. The interviewer is evaluating how you think, how you communicate, and whether you can reason about trade-offs under ambiguity. This guide gives you a repeatable, proven framework to perform confidently in any system design interview in 2026 and beyond. A system design interview is fundamentally about managing complexity and scale. We will break down exactly how you should structure your 45-minute session to maximize your signal-to-noise ratio and demonstrate senior-level engineering maturity.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Step 1: Clarify Requirements Before You Draw Anything</h2>
      <p>The most common mistake candidates make is jumping straight into the design. Spend the first 5 minutes asking clarifying questions. Establish functional requirements (what must the system do?), non-functional requirements (scale, latency, reliability), and constraints (read-heavy vs. write-heavy? Global vs. regional?). A system designed for 10,000 daily active users is architecturally different from one serving 100 million. Always establish scale before designing solutions. Ask the interviewer specific questions: "Are we designing this for North America or a global audience?" or "What is our expected read-to-write ratio?" These questions prove you think before you build.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Step 2: Back-of-the-Envelope Scale Estimation</h2>
      <p>Reason about scale numerically. If you have 100 million users and 10% are daily active, each uploading 2 photos per day, that is 20 million uploads per day or roughly 230 uploads per second. At 500KB per photo, you need approximately 10TB of new storage daily. These calculations drive technology choices and reveal bottlenecks before you draw a single box. Interviewers specifically look for structured quantitative reasoning here. Do not skip this step, and do not get bogged down in extreme precision. Use round numbers. 1 day is approximately 100,000 seconds. Keep your math simple, verbalize it, and write it on the whiteboard.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Step 3: High-Level Architecture First, Then Scale It</h2>
      <p>Start with the simplest architecture that satisfies core requirements: Client to Load Balancer to Application Servers to Database. Explain each component's role clearly. Then identify where this architecture breaks at your target scale and systematically layer in solutions: caching with Redis or Memcached for hot reads, a CDN for static assets, message queues like Kafka or SQS for async processing, and read replicas or database sharding for write throughput. This progressive enhancement shows that you understand you don't build a distributed system from day one unless the scale demands it. Start simple, identify the bottleneck, and resolve it.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Step 4: Choose and Justify Your Database</h2>
      <p>Use a relational database such as PostgreSQL or MySQL for structured data, complex queries, and ACID compliance. Choose NoSQL databases like DynamoDB, Cassandra, or MongoDB for horizontal scalability, schema flexibility, or high write throughput. Use Cassandra specifically for time-series or event-log workloads like activity feeds or IoT telemetry. Never just name a technology without explaining the trade-offs you evaluated and why it fits your specific requirements better than the alternatives. Data modeling is critical; draw out your tables, partitions, and sort keys. The database choice is often the single most important decision in the entire interview.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Step 5: Apply the CAP Theorem Fluently</h2>
      <p>Distributed systems can guarantee at most two of three properties: Consistency (all nodes see the same data simultaneously), Availability (every request receives a response), and Partition Tolerance (the system continues despite network partitions). Since partitions are inevitable in distributed systems, you are effectively choosing between CP systems for banking and payments, and AP systems for social feeds and analytics. Being able to articulate this trade-off fluently is a strong signal of senior-level thinking. Talk about eventual consistency models versus strong consistency requirements.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Step 6: Robust Caching Strategy</h2>
      <p>Introduce a Redis or Memcached layer in front of your database for hot-path reads. Discuss cache-aside, write-through, or write-behind patterns, LRU eviction policies, TTL-based expiration, and event-driven invalidation. Show you have considered cache stampede, which is the scenario where simultaneous cache expiry causes a thundering herd on your database. Demonstrating awareness of failure modes strongly differentiates your performance from average candidates. Always discuss caching on multiple levels: client-side, CDN, API gateway, and database layers.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Step 7: Deep Dive and Failure Modes</h2>
      <p>Reserve the final 10 to 15 minutes for a deep dive on the highest-risk component of your design. Walk through concrete failure scenarios: what happens when the cache layer is unavailable? When the primary database goes down? How does the system degrade gracefully when downstream services fail? Discussing circuit breakers, retries with exponential backoff, and graceful degradation distinguishes senior-level candidates from those who can only design the happy path. In the real world, servers burn down, networks partition, and disks fail. Your design must account for chaos.</p>
    </div>
  </BlogShell>
);

export const BlogSTAR = ({ onNav }) => (
  <BlogShell onNav={onNav}>
    <Tag color="teal">Behavioral</Tag>
    <h1 className="brig" style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, color:"var(--slate)", letterSpacing:"-0.03em", lineHeight:1.15, marginTop:16, marginBottom:8 }}>Mastering the STAR Method for Behavioral Interviews</h1>
    <p style={{ fontSize:14, color:"var(--slate-400)", marginBottom:32 }}>August 2026 ┬╖ 10 min read</p>
    <div style={{ display:"flex", flexDirection:"column", gap:24, fontSize:15.5, color:"var(--slate-700)", lineHeight:1.8 }}>
      <p>Behavioral interviews account for at least 50% of your total interview score at most top tech companies, yet most candidates massively underprepare for them. The STAR method, standing for Situation, Task, Action, Result, is the proven framework for structuring compelling behavioral answers that stick. This guide teaches you exactly how to use it, how to avoid the most common pitfalls, and how to adapt it for different question types.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>The Four Components of STAR</h2>
      <p>Situation: Set the scene in 2 to 3 sentences maximum, covering who was involved, what project, and what was at stake. Candidates consistently spend too long here. Task: Describe your specific responsibility and the problem that fell to you personally. Action: The most critical component. Describe specifically what you did, not what your team did. Use I, not we. Detail the steps, decisions, and your explicit reasoning. Result: Quantify the impact. Saying we shipped faster is weak. Saying we reduced deployment time by 40%, enabling 3 additional feature releases per quarter, is strong.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Worked Example: Leadership Under Pressure</h2>
      <p>Question: Tell me about a time you led a project under significant time pressure.</p>
      <p>Situation: A critical payment integration was 6 weeks from its regulatory compliance deadline and our senior engineer had just left the company unexpectedly.</p>
      <p>Task: I was asked to step up as technical lead to deliver the project on time with a team of two junior engineers who were unfamiliar with the codebase.</p>
      <p>Action: I audited the existing codebase and created a realistic project plan. I identified that 3 of the 5 planned features could be deprioritized to meet the regulatory minimum. I ran daily 15-minute standups, paired with junior engineers on the most complex components, built an automated test suite to catch regressions early, and established a direct channel with the compliance team to surface blockers immediately.</p>
      <p>Result: We delivered the compliance features one week ahead of deadline. The project received zero violations in the regulatory audit. The automated test suite reduced QA time by 60% for all subsequent payment features. One of the junior engineers I mentored was promoted 6 months later.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>The 5 Most Common STAR Mistakes</h2>
      <p>First, using we instead of I. Interviewers are evaluating your personal contribution specifically. Second, spending too long on Situation. Keep Situation and Task combined under 20% of your total answer time. Third, omitting the Result entirely. Always end with a specific, measurable outcome because this is the most commonly skipped component. Fourth, fabricating stories. Experienced interviewers probe deeply with follow-up questions and vague details under pressure instantly destroy credibility. Fifth, using the same story for every question. Prepare 8 to 10 distinct stories spanning leadership, conflict, failure, ambiguity, collaboration, innovation, and time pressure scenarios.</p>
    </div>
  </BlogShell>
);

export const BlogBehavioral = ({ onNav }) => (
  <BlogShell onNav={onNav}>
    <Tag color="teal">FAANG Prep</Tag>
    <h1 className="brig" style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, color:"var(--slate)", letterSpacing:"-0.03em", lineHeight:1.15, marginTop:16, marginBottom:8 }}>The Complete Guide to Behavioral Interviews at Top Tech Companies</h1>
    <p style={{ fontSize:14, color:"var(--slate-400)", marginBottom:32 }}>August 2026 ┬╖ 14 min read</p>
    <div style={{ display:"flex", flexDirection:"column", gap:24, fontSize:15.5, color:"var(--slate-700)", lineHeight:1.8 }}>
      <p>Every major tech company including Google, Amazon, Meta, Microsoft, and Apple uses behavioral interviews to assess whether candidates embody their core cultural values and leadership principles. The specific questions vary by company, but the underlying competencies being evaluated are remarkably consistent. Understanding what interviewers are actually measuring, and why, is the fastest way to improve your performance significantly.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Amazon: Leadership Principles</h2>
      <p>Amazon is the most rigorous behavioral interviewer in the industry. Every question maps explicitly to one of Amazon's 16 Leadership Principles including Customer Obsession, Ownership, Invent and Simplify, Earn Trust, and Deliver Results. Your interviewer will probe each answer deeply with follow-up questions such as what would you have done differently and how did your team react. You should prepare at least 2 distinct stories per Leadership Principle, meaning 32 or more prepared stories minimum. Amazon specifically penalizes reusing the same story across different Leadership Principles.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Google: Googleyness and Intellectual Humility</h2>
      <p>Google evaluates behavioral fit through Googleyness, which encompasses intellectual humility, genuine collaboration, ambiguity tolerance, and comfort with uncertainty. Google interviewers are less rigid about specific frameworks than Amazon but probe deeply for evidence of initiative, cross-functional influence, and the ability to disagree and commit. Strong Google behavioral answers demonstrate that you changed your mind based on data, unified stakeholders with conflicting interests, and delivered results despite unclear or shifting requirements.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>Meta: Move Fast, Be Bold, Focus on Impact</h2>
      <p>Meta's behavioral interviews center on Move Fast, Be Bold, and Focus on Impact. They want to hear about launching quickly despite incomplete information, taking calculated risks that paid off, and driving measurable business impact at scale. Meta interviewers specifically penalize over-engineering and excessive caution when shipping. Stories demonstrating speed, comfort with ambiguity, and rapid iteration are crucial.</p>
    </div>
  </BlogShell>
);

export const BlogResume = ({ onNav }) => (
  <BlogShell onNav={onNav}>
    <Tag color="teal">Resume</Tag>
    <h1 className="brig" style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:800, color:"var(--slate)", letterSpacing:"-0.03em", lineHeight:1.15, marginTop:16, marginBottom:8 }}>Resume Tips for Software Engineers: How to Get Past the ATS</h1>
    <p style={{ fontSize:14, color:"var(--slate-400)", marginBottom:32 }}>August 2026 ┬╖ 9 min read</p>
    <div style={{ display:"flex", flexDirection:"column", gap:24, fontSize:15.5, color:"var(--slate-700)", lineHeight:1.8 }}>
      <p>Your software engineering resume has exactly one job: getting you the interview. It is not an autobiography, nor is it a comprehensive list of every technology you have ever touched. Recruiters and engineering managers spend an average of 6 seconds scanning a resume before making a decision. To survive the Applicant Tracking System (ATS) and impress a human reader, your resume must be impeccably formatted, highly scannable, and relentlessly focused on quantifiable impact.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>1. Standardize Your Formatting</h2>
      <p>The biggest mistake engineers make is using overly designed, multi-column resume templates with progress bars for skills. These completely break most ATS parsers. Use a clean, single-column layout with standard fonts like Arial, Helvetica, or Garamond. Use standard headings: Education, Experience, Projects, and Skills. Submit your resume strictly as a PDF unless explicitly requested otherwise. An ATS must be able to cleanly highlight text from your document.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>2. The XYZ Formula for Bullet Points</h2>
      <p>Google's recruiters popularized the XYZ formula, and it remains the gold standard for engineering resumes: Accomplished [X] as measured by [Y], by doing [Z]. Stop writing "Worked on backend APIs." Instead, write: "Reduced API response latency by 40% (X) resulting in a 15% increase in user retention (Y) by implementing Redis caching and optimizing PostgreSQL queries (Z)." Every bullet point under your experience should start with a strong action verb and end with a quantifiable metric.</p>
      <h2 className="brig" style={{ fontSize:22, fontWeight:700, color:"var(--slate)" }}>3. Keyword Optimization and Tailoring</h2>
      <p>An ATS parses your resume for specific keywords matching the job description. If a job requires "React, Node.js, and AWS," ensure those exact terms appear prominently in your Skills section and are contextualized in your Experience bullet points. Do not keyword stuff (e.g., listing 50 programming languages in a block), but do tailor your core skills to match the job description closely. If you have a matching skill, feature it prominently.</p>
    </div>
  </BlogShell>
);
