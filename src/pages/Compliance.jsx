import React from 'react';
import { motion } from 'framer-motion';

const COMPLIANCE_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Placement Guide', href: '/placement-preparation-complete-guide' },
  { label: 'Resources', href: '/seo-resources' },
  { label: 'Contact', href: '/contact' },
];

const ComplianceLayout = ({ title, children, onNav }) => {
  const navigate = (href) => {
    if (typeof onNav === 'function') {
      onNav(href);
      return;
    }
    window.location.href = href;
  };

  return (
    <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }} style={{ minHeight:"100vh", background:"var(--slate-50)" }}>
      <a
        href="#compliance-main-content"
        style={{
          position: 'fixed',
          top: -48,
          left: 12,
          zIndex: 170,
          padding: '10px 14px',
          borderRadius: 10,
          background: 'var(--slate)',
          color: '#fff',
          textDecoration: 'none',
          fontSize: 13,
          fontWeight: 600,
        }}
        onFocus={(event) => { event.currentTarget.style.top = '12px'; }}
        onBlur={(event) => { event.currentTarget.style.top = '-48px'; }}
      >
        Skip to main content
      </a>
      <header>
        <nav aria-label="Primary" style={{ position: 'sticky', top: 0, zIndex: 120, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '14px clamp(20px,5vw,44px)', background: 'rgba(250,250,248,.96)', borderBottom: '1px solid var(--border)', backdropFilter: 'blur(10px)' }}>
          <a href="/" style={{ textDecoration: 'none', color: 'var(--slate)', fontWeight: 700, fontSize: 18 }} onClick={(event) => { event.preventDefault(); navigate('/'); }}>
            Placement<span style={{ color: 'var(--teal)' }}>Do</span>
          </a>
          <ul style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {COMPLIANCE_NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  style={{ fontSize: 14, fontWeight: 500, color: 'var(--slate-600)', padding: '6px 10px', borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}
                  onClick={(event) => { event.preventDefault(); navigate(href); }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="compliance-main-content" style={{ paddingTop: 28, paddingBottom: 80 }}>
        <div style={{ maxWidth:800, margin:"0 auto", padding:"0 20px" }}>
          <h1 className="brig" style={{ fontSize:"clamp(28px,4vw,36px)", fontWeight:700, color:"var(--slate)", marginBottom:20 }}>{title}</h1>
          {children}
        </div>
      </main>
    </motion.div>
  );
};

export const PrivacyPolicy = ({ onNav }) => (
  <ComplianceLayout title="Privacy Policy" onNav={onNav}>
      <p style={{ fontSize:14, color:"var(--slate-500)", marginBottom:30 }}>Last Updated: August 2026</p>
      
      <div className="card" style={{ padding:32, display:"flex", flexDirection:"column", gap:20 }}>
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>1. Introduction</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>Welcome to PlacementDo ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and share information when you use our website, join our waitlist, or access our AI-powered mock interview platform.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>By using PlacementDo, you acknowledge that your information is handled as described in this policy. If you do not agree with this policy, please discontinue use of the service.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>2. Information We Collect</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We collect account details such as your name and email address when you create an account or join the waitlist. During interview sessions, we may process audio responses, text transcripts, uploaded resumes/CVs, and session preferences so we can generate personalized interview questions and feedback reports.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>We also collect technical and usage information like browser type, device characteristics, pages visited, feature interactions, approximate timestamps, and diagnostic logs. This helps us maintain service reliability, monitor performance, and improve product quality over time.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>3. How We Use Information</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We use collected information to provide and operate the PlacementDo platform, personalize interview simulations, generate AI-powered scoring and feedback, and deliver support communications. Account and billing information may be used for authentication, transaction processing, and subscription management.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>We may also use aggregated or de-identified data to analyze product trends, improve model prompting quality, optimize user experience, and protect the platform from abuse. We do not sell or rent personal data to third parties.</p>
        </div>

        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>4. Third-Party Services and Advertising</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We work with trusted third-party providers for hosting, analytics, customer support, payments, email delivery, and advertising. Free-tier experiences may display ads through advertising partners including Google AdSense. These providers may process limited data on our behalf under contractual and legal safeguards.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>Third-party providers operate under their own privacy policies. We encourage you to review those policies, particularly for ad personalization controls and cookie preferences.</p>
        </div>

        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>5. Cookies and Tracking Technologies</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We use essential cookies for session management, authentication, and security. We also use analytics cookies to understand aggregate product usage patterns.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>Additionally, third-party vendors, including Google, use cookies (such as the DART cookie) to serve ads based on a user's prior visits to PlacementDo or other websites on the internet. Users may opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" style={{ color:"var(--teal)" }}>Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener" style={{ color:"var(--teal)" }}>www.aboutads.info</a>.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>6. Data Retention</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We retain personal information only as long as necessary for the purposes described in this policy, to satisfy legal obligations, and to resolve disputes. Interview reports, transcripts, and related performance records are retained for up to 12 months unless a longer period is legally required.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>You may request deletion of your account data by contacting our support team. We process verified deletion requests within a reasonable timeline, subject to compliance, security, and recordkeeping requirements.</p>
        </div>

        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>7. Your Privacy Rights</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>Depending on your region, you may have rights to access, correct, delete, or restrict processing of your personal data. You may also have the right to object to certain uses of data, request portability, and withdraw consent where processing is consent-based.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>To exercise these rights, contact us using the details below. We may need to verify your identity before processing requests to protect your account and prevent unauthorized access.</p>
        </div>

        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>8. Data Security</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We apply industry-standard safeguards including encryption in transit, access controls, monitoring, and secure infrastructure practices to protect personal data. While no system can guarantee absolute security, we continuously review our controls to reduce risk and improve resilience.</p>
        </div>

        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>9. Children&apos;s Privacy</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>PlacementDo is intended for users aged 16 and above. We do not knowingly collect personal information from children below this age threshold. If you believe a child has provided personal data, contact us so we can review and remove the information where appropriate.</p>
        </div>

        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>10. Policy Updates and Contact</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We may update this policy periodically to reflect product changes, legal requirements, or operational updates. Any material updates will be posted on this page with a revised "Last Updated" date.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>If you have any questions about this Privacy Policy or your data, contact us at <a href="mailto:support@placementdo.com" style={{ color:"var(--teal)" }}>support@placementdo.com</a>.</p>
        </div>
      </div>
  </ComplianceLayout>
);

export const TermsOfService = ({ onNav }) => (
  <ComplianceLayout title="Terms of Service" onNav={onNav}>
      <p style={{ fontSize:14, color:"var(--slate-500)", marginBottom:30 }}>Last Updated: August 2026</p>
      
      <div className="card" style={{ padding:32, display:"flex", flexDirection:"column", gap:20 }}>
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>1. Service Usage</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>PlacementDo provides AI-driven interview simulation and coaching. Our service is designed to help you practice and improve. We do not guarantee job placement, interview opportunities, or specific career outcomes. You agree to use the service only for lawful purposes.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>2. Platform Rules</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>You are responsible for maintaining the confidentiality of your account credentials. You agree not to misuse our platform by attempting to reverse-engineer our AI personas, rapidly exhausting API rate limits, or submitting inappropriate, illegal, or malicious content during interviews.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>3. Subscriptions and Advertising</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>Free accounts are supported by advertising from networks such as Google AdSense. By using the free tier, you agree to the display of these advertisements. Premium tiers (Pro, Elite) remove third-party display ads.</p>
        </div>
      </div>
  </ComplianceLayout>
);

export const About = ({ onNav }) => (
  <ComplianceLayout title="About PlacementDo" onNav={onNav}>
      <div className="card" style={{ padding:32, display:"flex", flexDirection:"column", gap:20 }}>
        <h2 className="brig" style={{ fontSize:24, fontWeight:700, color:"var(--teal-dark)", marginBottom:10 }}>Democratizing Interview Prep</h2>
        <p style={{ fontSize:16, color:"var(--slate-600)", lineHeight:1.8 }}>
          PlacementDo was founded with a single mission: to level the playing field in technical and behavioral interviewing. For too long, candidates who couldn't afford expensive coaching or didn't have industry connections were at a severe disadvantage. We believe everyone deserves access to elite-level interview preparation.
        </p>
        <p style={{ fontSize:16, color:"var(--slate-600)", lineHeight:1.8 }}>
          By leveraging state-of-the-art Large Language Models and real-time voice synthesis, we've created a platform that simulates the exact pressure, pacing, and rigor of top-tier tech interviews (like FAANG). Our AI personas—ranging from the empathetic listener to the brutal stress-tester—ensure that you are ready for any dynamic on the big day.
        </p>
      </div>
  </ComplianceLayout>
);

export const Contact = ({ onNav }) => (
  <ComplianceLayout title="Contact Us" onNav={onNav}>
    <div style={{ maxWidth:600 }}>
      <p style={{ fontSize:15, color:"var(--slate-500)", marginBottom:30 }}>Have a question, partnership inquiry, or need support? We'd love to hear from you. Email us directly at <a href="mailto:support@placementdo.app" style={{ color:"var(--teal)", textDecoration:"underline" }}>support@placementdo.app</a>.</p>
    </div>
  </ComplianceLayout>
);
