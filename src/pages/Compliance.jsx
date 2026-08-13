import React from 'react';
import { motion } from 'framer-motion';

export const PrivacyPolicy = () => (
  <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }} style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--slate-50)" }}>
    <div style={{ maxWidth:800, margin:"0 auto", padding:"0 20px" }}>
      <h1 className="brig" style={{ fontSize:"clamp(28px,4vw,36px)", fontWeight:700, color:"var(--slate)", marginBottom:20 }}>Privacy Policy</h1>
      <p style={{ fontSize:14, color:"var(--slate-500)", marginBottom:30 }}>Last Updated: August 2026</p>
      
      <div className="card" style={{ padding:32, display:"flex", flexDirection:"column", gap:20 }}>
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>1. Introduction & Data Collection</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>Welcome to PlacementDo. We collect audio, text inputs, and CV documents you provide during mock interviews, as well as waitlist details when you sign up to be notified. This data is exclusively used to generate real-time AI feedback and comprehensive performance reports. We also collect basic account information (name, email) for billing and authentication purposes.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>We do not sell or rent your personal data to third parties.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>2. Third-party services & Advertising</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We use trusted third-party services to operate the platform, including cloud hosting providers, analytics tools, email delivery services, and third-party advertising partners (including Google AdSense).</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>3. Cookies and tracking</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We use essential cookies for session management, authentication, and security. We also use analytics cookies to understand aggregate product usage patterns.</p>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7, marginTop:12 }}>Additionally, third-party vendors, including Google, use cookies (such as the DART cookie) to serve ads based on a user's prior visits to PlacementDo or other websites on the internet. Users may opt out of personalized advertising at any time by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" style={{ color:"var(--teal)" }}>Google Ads Settings</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener" style={{ color:"var(--teal)" }}>www.aboutads.info</a>.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>4. Data Retention & Privacy Rights</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We implement a strict 12-month session retention policy. Interview reports, transcripts, and related performance metrics are retained for up to 12 months, after which they are automatically deleted. We comply with applicable data protection laws, including the GDPR and CCPA. Users have the right to access, rectify, or erase their personal data.</p>
        </div>

        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>5. Security & Age Limits</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We implement industry-standard encryption (AES-256 for data at rest, TLS 1.3 for data in transit). PlacementDo enforces a strict 16+ age limit for users of our platform. If you have any questions, you can reach us at <a href="mailto:support@placementdo.com" style={{ color:"var(--teal)" }}>support@placementdo.com</a>.</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export const TermsOfService = () => (
  <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }} style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--slate-50)" }}>
    <div style={{ maxWidth:800, margin:"0 auto", padding:"0 20px" }}>
      <h1 className="brig" style={{ fontSize:"clamp(28px,4vw,36px)", fontWeight:700, color:"var(--slate)", marginBottom:20 }}>Terms of Service</h1>
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
    </div>
  </motion.div>
);

export const About = () => (
  <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }} style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--slate-50)" }}>
    <div style={{ maxWidth:800, margin:"0 auto", padding:"0 20px" }}>
      <h1 className="brig" style={{ fontSize:"clamp(28px,4vw,36px)", fontWeight:700, color:"var(--slate)", marginBottom:20 }}>About PlacementDo</h1>
      
      <div className="card" style={{ padding:32, display:"flex", flexDirection:"column", gap:20 }}>
        <h2 className="brig" style={{ fontSize:24, fontWeight:700, color:"var(--teal-dark)", marginBottom:10 }}>Democratizing Interview Prep</h2>
        <p style={{ fontSize:16, color:"var(--slate-600)", lineHeight:1.8 }}>
          PlacementDo was founded with a single mission: to level the playing field in technical and behavioral interviewing. For too long, candidates who couldn't afford expensive coaching or didn't have industry connections were at a severe disadvantage. We believe everyone deserves access to elite-level interview preparation.
        </p>
        <p style={{ fontSize:16, color:"var(--slate-600)", lineHeight:1.8 }}>
          By leveraging state-of-the-art Large Language Models and real-time voice synthesis, we've created a platform that simulates the exact pressure, pacing, and rigor of top-tier tech interviews (like FAANG). Our AI personas—ranging from the empathetic listener to the brutal stress-tester—ensure that you are ready for any dynamic on the big day.
        </p>
      </div>
    </div>
  </motion.div>
);

export const Contact = () => (
  <motion.div initial={{ opacity:0,y:18 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.35 }} style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--slate-50)" }}>
    <div style={{ maxWidth:600, margin:"0 auto", padding:"0 20px" }}>
      <h1 className="brig" style={{ fontSize:"clamp(28px,4vw,36px)", fontWeight:700, color:"var(--slate)", marginBottom:20 }}>Contact Us</h1>
      <p style={{ fontSize:15, color:"var(--slate-500)", marginBottom:30 }}>Have a question, partnership inquiry, or need support? We'd love to hear from you. Email us directly at <a href="mailto:support@placementdo.app" style={{ color:"var(--teal)", textDecoration:"underline" }}>support@placementdo.app</a>.</p>
    </div>
  </motion.div>
);
