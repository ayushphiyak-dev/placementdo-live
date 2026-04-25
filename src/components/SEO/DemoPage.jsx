import React, { useEffect } from 'react';
import PageLayout from './shared/PageLayout.jsx';

export default function DemoPage({ onNav }) {
  useEffect(() => {
    // Load the Storylane script dynamically so it executes properly in React
    const script = document.createElement('script');
    script.src = "https://js.storylane.io/js/v2/storylane.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <PageLayout
      title="PlacementDo Demo | AI Mock Interview Platform"
      metaDescription="Try PlacementDo interactive demo. Practice AI mock interviews with real-time feedback and improve your placement preparation."
      onNav={onNav}
    >
      <div style={{ background: "var(--ivory)", minHeight: "100vh", paddingBottom: "80px" }}>
        
        {/* 1. HERO SECTION */}
        <section style={{ 
          textAlign: 'center', 
          padding: 'clamp(80px, 12vh, 120px) clamp(20px, 5vw, 60px) clamp(40px, 6vh, 60px)',
          maxWidth: '800px', 
          margin: '0 auto' 
        }}>
          <h1 className="brig" style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            color: 'var(--slate)', 
            marginBottom: '20px', 
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            See PlacementDo in Action
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
            color: 'var(--slate-600)', 
            marginBottom: '36px', 
            lineHeight: 1.6 
          }}>
            Experience our AI-powered mock interview platform with real-time feedback.
          </p>
          <button 
            onClick={() => onNav('/')}
            className="btn-primary"
            style={{
              padding: '16px 32px',
              borderRadius: '999px',
              fontSize: '16px',
            }}
          >
            Start Mock Interview
          </button>
        </section>

        {/* 2. MAIN DEMO SECTION (CORE) */}
        <section style={{ 
          maxWidth: '1200px', 
          margin: '0 auto clamp(60px, 8vh, 100px)', 
          padding: '0 clamp(20px, 5vw, 40px)' 
        }}>
          <div style={{
            background: 'var(--white)',
            borderRadius: '24px',
            padding: '12px',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border)'
          }}>
            {/* Using the exact structure provided by Storylane, adapted for JSX */}
            <div>
              <div style={{ position: 'relative', width: '100%', height: '700px' }}>
                <iframe 
                  loading="lazy"
                  src="https://demo.storylane.com/demo/1j3kslnrp6q2?embed=inline"
                  allow="fullscreen"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    borderRadius: '16px',
                    backgroundColor: 'var(--slate-50)'
                  }}>
                </iframe>
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          {/* 3. SEO CONTENT BELOW DEMO */}
          <section style={{ marginBottom: 'clamp(60px, 8vh, 100px)' }}>
            <p style={{ 
              fontSize: '1.15rem', 
              color: 'var(--slate-600)', 
              lineHeight: 1.8, 
              textAlign: 'center', 
              maxWidth: '800px', 
              margin: '0 auto' 
            }}>
              Transform your <strong>placement preparation</strong> with our state-of-the-art <strong>AI mock interview</strong> platform. Get realistic <strong>interview practice</strong> tailored to your profile, complete with <strong>real-time feedback</strong> to help you land your dream job.
            </p>
          </section>

          {/* 4. FEATURE HIGHLIGHTS */}
          <section style={{ 
            marginBottom: 'clamp(60px, 8vh, 100px)', 
            background: 'var(--white)', 
            padding: 'clamp(32px, 5vw, 48px)', 
            borderRadius: '24px', 
            border: '1px solid var(--border)', 
            boxShadow: 'var(--shadow-sm)' 
          }}>
            <h2 className="brig" style={{ 
              fontSize: '2rem', 
              color: 'var(--slate)', 
              marginBottom: '32px', 
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Why Practice With Us?
            </h2>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 auto', 
              display: 'grid', 
              gap: '24px', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              maxWidth: '800px'
            }}>
              {[
                "AI-powered interview simulation",
                "Resume-based questions",
                "Instant feedback and scoring",
                "Company-specific preparation"
              ].map((feature, i) => (
                <li key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  fontSize: '1.1rem', 
                  color: 'var(--slate-700)', 
                  fontWeight: 500 
                }}>
                  <span style={{ 
                    color: 'var(--teal)', 
                    display: 'flex', 
                    background: 'var(--teal-light)', 
                    padding: '10px', 
                    borderRadius: '12px',
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* 5. FINAL CTA SECTION */}
          <section style={{ 
            textAlign: 'center', 
            background: 'var(--slate)', 
            padding: 'clamp(48px, 8vh, 80px) clamp(20px, 5vw, 40px)', 
            borderRadius: '24px', 
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle background glow */}
            <div style={{ 
              position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", 
              width:"100%", height:"100%", background:"radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)", pointerEvents:"none" 
            }}/>
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="brig" style={{ 
                fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
                color: '#fff', 
                marginBottom: '24px',
                letterSpacing: '-0.02em'
              }}>
                Ready to improve your placement performance?
              </h2>
              <button 
                onClick={() => onNav('/')}
                className="btn-primary"
                style={{
                  padding: '16px 36px',
                  borderRadius: '999px',
                  fontSize: '17px',
                  boxShadow: '0 8px 24px rgba(13, 148, 136, 0.25)'
                }}
              >
                Start Practicing Now
              </button>
            </div>
          </section>
        </div>

      </div>
    </PageLayout>
  );
}
