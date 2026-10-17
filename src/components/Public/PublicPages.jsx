import { ArrowRight, Plus, Zap } from "lucide-react";
import { useEffect } from "react";
import "./public-pages.css";

function Brand() {
  return <a className="pd-brand" href="/" aria-label="PlacementDo home">
    <span className="pd-brand-icon"><Zap size={23} aria-hidden="true" /></span>
    <span>Placement<span className="pd-brand-accent">Do</span></span>
  </a>;
}

export function SiteFooter() {
  return <footer className="pd-footer">
    <div className="pd-footer-main">
      <div className="pd-footer-intro">
        <Brand />
        <p>Free preparation guides and self-review exercises for students and early-career candidates. The interactive workspace is a demo with sample data.</p>
        <a className="pd-footer-launch" href="/#waitlist-section">Get launch updates <ArrowRight size={16} aria-hidden="true" /></a>
      </div>
      <nav aria-label="Explore"><h2>Explore</h2>
        <a href="/">Home</a><a href="/blog">Blog</a><a href="/faq">FAQ</a>
        <a href="/#features-section">Start learning</a><a href="/#pricing-section">Availability</a>
      </nav>
      <nav aria-label="Company"><h2>Company</h2>
        <a href="/about">About</a><a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a>
        <a href="/disclaimer">Disclaimer</a>
      </nav>
    </div>
    <div className="pd-footer-bottom"><span>© {new Date().getFullYear()} PlacementDo.</span><span>Practice with purpose.</span></div>
  </footer>;
}

const questions = [
  ["What is PlacementDo?", "PlacementDo publishes free preparation guides and self-review exercises. The dashboard and tour are product demos with sample profiles, questions, transcripts, and scores. Live AI interviewing, personal scoring, and purchases are not connected."],
  ["Does practice guarantee a job?", "No. A practice score is not a hiring prediction, and no tool can guarantee an offer. Employers evaluate candidates using their own requirements. Check current role descriptions, practise the underlying skills, and ask people you trust to review your answers."],
  ["Can I use the guides without an account?", "Yes. The blog and public preparation guides are available without signing in. Start with a topic you need to practise, work through its examples, and use the related guides to continue."],
  ["What should I share in a practice session?", "Share only the background needed for the exercise. Remove addresses, identity numbers, confidential employer information, and other unnecessary personal details from resumes or answers. Read our Privacy Policy before submitting information."],
  ["How do I get launch updates?", "Use the early-access form on the homepage to join the waitlist. Check the latest published product information for availability and pricing. Joining the waitlist does not guarantee a launch date or a job outcome."],
];

export function FAQPage() {
  useEffect(() => {
    document.title = "Frequently Asked Questions | PlacementDo";
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = "https://placementdo.app/faq";
  }, []);
  return <div className="pd-public">
    <header className="pd-header"><div className="pd-header-inner"><Brand />
      <nav aria-label="Main navigation"><a href="/">Home</a><a href="/blog">Blog</a><a href="/faq" aria-current="page">FAQ</a><a href="/contact">Contact</a></nav>
    </div></header>
    <main className="pd-faq">
      <div className="pd-faq-intro"><h1>Good questions.<br /><span>Clear answers.</span></h1>
        <p>Understand the practice before you start.</p>
        <a href="/contact">Contact our team <ArrowRight size={21} aria-hidden="true" /></a>
      </div>
      <div className="pd-questions">
        {questions.map(([question, answer], index) => <details key={question} open={index === 0}>
          <summary><span className="pd-question-number">{String(index + 1).padStart(2, "0")}</span><h2>{question}</h2><Plus size={20} aria-hidden="true" /></summary>
          <p>{answer}{index === 3 && <> <a href="/privacy-policy">Read the Privacy Policy</a>.</>}</p>
        </details>)}
      </div>
    </main>
    <SiteFooter />
  </div>;
}

export function NotFound() {
  return <main className="pd-not-found"><h1>That page isn't here.</h1><p>Choose a guide or head back to your preparation.</p><a href="/">Return home</a><a href="/blog">Explore the blog</a></main>;
}
