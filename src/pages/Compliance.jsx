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
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>Welcome to PlacementDo. We collect audio, text inputs, and CV documents you provide during mock interviews. This data is exclusively used to generate real-time AI feedback and comprehensive performance reports. We also collect basic account information (name, email) for billing and authentication purposes.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>2. Third-Party Vendors & Google AdSense</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We use third-party vendors, including Google, which use cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet. Users may opt out of personalized advertising by visiting Ads Settings.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>3. Use of DART Cookies</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>Google, as a third-party vendor, uses cookies to serve ads on PlacementDo. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google Ad and content network privacy policy.</p>
        </div>
        
        <div>
          <h2 className="brig" style={{ fontSize:20, fontWeight:700, color:"var(--slate)", marginBottom:10 }}>4. Security</h2>
          <p style={{ fontSize:15, color:"var(--slate-600)", lineHeight:1.7 }}>We implement industry-standard encryption (AES-256 for data at rest, TLS 1.3 for data in transit) to protect your sensitive career documents and session transcripts.</p>
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
