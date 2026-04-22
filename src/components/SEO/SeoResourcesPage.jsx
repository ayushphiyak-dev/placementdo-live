/**
 * SeoResourcesPage — /seo-resources
 * Help PlacementDo grow — shareable content and community resources.
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
    padding: 32px 36px; margin-bottom: 20px;
  }
  .sr-card-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
  .sr-card-icon { font-size: 32px; line-height: 1; }
  .sr-card-title { font-size: 20px; font-weight: 700; color: var(--slate); letter-spacing: -0.02em; margin: 0; }
  .sr-card-subtitle { font-size: 13px; color: var(--slate-400); margin: 2px 0 0; }
  .sr-card p { font-size: 14.5px; color: var(--slate-600); line-height: 1.75; margin: 0 0 16px; }
  .sr-code-block {
    background: var(--slate-50); border: 1px solid var(--border); border-radius: 10px;
    padding: 16px 18px; font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 13px; color: var(--slate-700); line-height: 1.65;
    white-space: pre-wrap; word-break: break-all; position: relative; margin: 12px 0;
  }
  .sr-copy-btn {
    position: absolute; top: 10px; right: 12px; padding: 4px 12px;
    background: var(--teal-light); color: var(--teal-dark); border: 1px solid rgba(13,148,136,.2);
    border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.18s;
  }
  .sr-copy-btn:hover { background: var(--teal); color: #fff; }
  .sr-subreddit-list { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
  .sr-subreddit {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: 600;
    background: #FF4500; color: #fff; border: none; cursor: default;
    font-family: 'DM Sans', sans-serif;
  }
  .sr-directory-list { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); margin-top: 16px; }
  .sr-directory-item {
    background: var(--slate-50); border: 1px solid var(--border); border-radius: 10px;
    padding: 14px 16px;
  }
  .sr-directory-item h4 { font-size: 14px; font-weight: 700; color: var(--slate); margin: 0 0 4px; }
  .sr-directory-item p { font-size: 12.5px; color: var(--slate-500); margin: 0; line-height: 1.5; }
  .sr-tip {
    display: flex; gap: 10px; align-items: flex-start; padding: 14px 18px;
    background: var(--teal-light); border: 1px solid rgba(13,148,136,.2); border-radius: 10px;
    font-size: 13.5px; color: var(--teal-dark); line-height: 1.65; margin-top: 12px;
  }
  .sr-tip-icon { font-size: 18px; flex-shrink: 0; }
`;

function CopyButton({ text }) {
  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };
  return (
    <button className="sr-copy-btn" onClick={copy}>Copy</button>
  );
}

const LINKEDIN_POST = `🚀 If you're preparing for campus placements in 2026, check out PlacementDo.

It's an AI-powered mock interview tool that:
✅ Knows your CV and the company you're targeting
✅ Gives ruthlessly honest feedback on your answers
✅ Supports 28+ languages
✅ Free to try — launching 2026

Whether it's TCS, Wipro, Amazon, or Google — this is hands down the best way to practice.

👉 https://placementdo.app

#PlacementPrep #CampusPlacement #InterviewPrep #Placement2026`;

const REDDIT_POST = `**[Tool] PlacementDo — AI mock interview tool for placement prep**

I've been using PlacementDo while preparing for my placements and found it genuinely useful.

It simulates full interview conversations with an AI interviewer that:
- Adapts to your uploaded CV
- Asks company-specific questions (TCS, Wipro, Amazon, etc.)
- Gives detailed feedback on your answers and communication

It's currently in waitlist phase and free to try.

Website: https://placementdo.app

Anyone else using AI tools for placement prep? Would love to hear what's working.`;

const README_BADGE = `[![PlacementDo](https://img.shields.io/badge/Practice_Interviews-PlacementDo-0D9488?style=flat-square)](https://placementdo.app)`;

const README_SECTION = `## 🎯 Interview Preparation

I use [PlacementDo](https://placementdo.app) to practice AI-powered mock interviews.
It simulates real interviews, gives detailed feedback, and supports 28+ languages.`;

export default function SeoResourcesPage({ onNav }) {
  return (
    <PageLayout
      title="Grow PlacementDo | Share & Support | PlacementDo"
      metaDescription="Help spread the word about PlacementDo — share on LinkedIn, Reddit, GitHub, and directories. Grow the community."
      onNav={onNav}
    >
      <style>{STYLES}</style>

      <PageHero
        tag="🌱 Community Growth"
        heading="Help Us Grow"
        subheading="PlacementDo is built for students, by people who remember what placement prep felt like. If you find it useful, sharing takes 2 minutes and helps thousands of students discover it."
      />

      <div className="sr-page">

        {/* LinkedIn */}
        <section className="sr-section">
          <SectionHeading
            label="Social Media"
            heading="Share on LinkedIn"
            description="A ready-to-use post template for LinkedIn. Personalise it with your own experience before sharing."
          />
          <div className="sr-card">
            <div className="sr-card-header">
              <div className="sr-card-icon">💼</div>
              <div>
                <h3 className="brig sr-card-title">LinkedIn Post Template</h3>
                <p className="sr-card-subtitle">~30 seconds to post · Reaches 100–500+ connections</p>
              </div>
            </div>
            <p>
              LinkedIn posts about placement tools get high engagement from fellow students and recruiters.
              Feel free to modify this template — add your personal experience for maximum authenticity.
            </p>
            <div className="sr-code-block">
              <CopyButton text={LINKEDIN_POST} />
              {LINKEDIN_POST}
            </div>
            <div className="sr-tip">
              <span className="sr-tip-icon">💡</span>
              <span>Adding a personal story ("I practiced 3 TCS mock interviews and felt much more confident") gets 3–5× more engagement than generic posts.</span>
            </div>
          </div>
        </section>

        {/* Reddit */}
        <section className="sr-section">
          <SectionHeading
            label="Community Forums"
            heading="Post on Reddit"
            description="Reddit's placement and career communities are active and appreciate genuine tool recommendations."
          />
          <div className="sr-card">
            <div className="sr-card-header">
              <div className="sr-card-icon">🤖</div>
              <div>
                <h3 className="brig sr-card-title">Suggested Subreddits</h3>
                <p className="sr-card-subtitle">High-traffic communities for placement prep</p>
              </div>
            </div>
            <div className="sr-subreddit-list">
              {["r/cscareerquestions", "r/india", "r/placementseason", "r/EngineeringStudents", "r/developersIndia"].map((sub) => (
                <div key={sub} className="sr-subreddit">{sub}</div>
              ))}
            </div>
            <p style={{ marginTop: 16 }}>
              Reddit communities value authenticity. Share genuinely, mention you're a student using the tool,
              and avoid anything that reads like marketing copy.
            </p>
            <div className="sr-code-block">
              <CopyButton text={REDDIT_POST} />
              {REDDIT_POST}
            </div>
            <div className="sr-tip">
              <span className="sr-tip-icon">💡</span>
              <span>Post during active hours (weekdays 8–10 AM IST or 8–11 PM IST) for maximum visibility. Reply to comments to boost engagement.</span>
            </div>
          </div>
        </section>

        {/* GitHub */}
        <section className="sr-section">
          <SectionHeading
            label="GitHub"
            heading="Add to your GitHub README"
            description="If you have a placement preparation repository or a profile README, add a PlacementDo badge or mention."
          />
          <div className="sr-card">
            <div className="sr-card-header">
              <div className="sr-card-icon">🐙</div>
              <div>
                <h3 className="brig sr-card-title">Markdown Badge</h3>
                <p className="sr-card-subtitle">One-line addition to any README</p>
              </div>
            </div>
            <p>Add this badge to your placement preparation repository or GitHub profile README:</p>
            <div className="sr-code-block">
              <CopyButton text={README_BADGE} />
              {README_BADGE}
            </div>
            <p style={{ marginTop: 16 }}>Or add a full section to your README:</p>
            <div className="sr-code-block">
              <CopyButton text={README_SECTION} />
              {README_SECTION}
            </div>
          </div>
        </section>

        {/* Directories */}
        <section className="sr-section">
          <SectionHeading
            label="Directories & Listings"
            heading="List PlacementDo in directories"
            description="Product discovery directories drive high-intent traffic. Here are the best places to list PlacementDo."
          />
          <div className="sr-card">
            <div className="sr-card-header">
              <div className="sr-card-icon">📂</div>
              <div>
                <h3 className="brig sr-card-title">Where to List</h3>
                <p className="sr-card-subtitle">Free & paid discovery platforms</p>
              </div>
            </div>
            <p>
              If you're an early supporter, you can help by upvoting PlacementDo on launch platforms or
              suggesting it in relevant communities and directories.
            </p>
            <div className="sr-directory-list">
              {[
                { name: "Product Hunt", desc: "Upvote on launch day for maximum impact" },
                { name: "Hacker News", desc: "Show HN post — technical audience" },
                { name: "BetaList", desc: "Early-stage product discovery" },
                { name: "AlternativeTo", desc: "Add as alternative to interview prep tools" },
                { name: "LinkedIn Groups", desc: "Share in placement prep groups" },
                { name: "WhatsApp Groups", desc: "College placement prep groups" },
              ].map(({ name, desc }) => (
                <div key={name} className="sr-directory-item">
                  <h4>{name}</h4>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why it matters */}
        <section className="sr-section">
          <SectionHeading
            label="Our Mission"
            heading="Why your support matters"
          />
          <div className="sr-card">
            <p>
              PlacementDo is built for students who want to practice smarter — not just consume content passively.
              Most placement prep tools are expensive, generic, or both. We're building something different:
              personalized, honest, AI-powered interview practice that knows your CV and your target company.
            </p>
            <p>
              We're a small team. Word of mouth from students who genuinely find the tool useful is how we grow.
              Every share helps more students discover a better way to prepare — and that's the entire mission.
            </p>
            <p>
              If you've found PlacementDo useful, we'd be incredibly grateful for a share. And if you have
              feedback — what's working, what's missing — reach out. Every message is read.
            </p>
          </div>
        </section>

        <CTABlock
          heading="Ready to practice your interviews?"
          subtext="Join 2,400+ students on the PlacementDo waitlist. Free early access for waitlist members."
          buttonLabel="Join the waitlist"
          onNav={onNav}
          buttonHref="/"
        />
      </div>
    </PageLayout>
  );
}
