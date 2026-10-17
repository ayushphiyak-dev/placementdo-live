import React from 'react';
import PageLayout from './shared/PageLayout.jsx';

export default function DemoPage({ onNav }) {

  return (
    <PageLayout
      title="PlacementDo Product Walkthrough | Demo"
      metaDescription="Explore a product walkthrough with sample data. Live interviews, personal scoring, and purchases are not connected."
      keywords={["placementdo demo", "AI mock interview demo", "placement interview simulator", "campus placement prep demo"]}
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
            This is a recorded product walkthrough with sample data, not a live interview. It does not analyse your answers or activate an account.
          </p>
          <button 
            onClick={() => onNav('/dashboard')}
            className="btn-primary"
            style={{
              padding: '16px 32px',
              borderRadius: '999px',
              fontSize: '16px',
            }}
          >
            Explore sample workspace
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
              <div style={{ position: 'relative', width: '100%', height: 'clamp(420px, 72vh, 760px)' }}>
                <iframe 
                  loading="lazy"
                  src="https://demo.storylane.com/demo/1j3kslnrp6q2?embed=inline"
                  title="PlacementDo interactive demo"
                  allow="fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
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
              <p style={{ fontSize: 12, color: 'var(--slate-500)', textAlign: 'center', marginTop: 10 }}>
                Demo not loading? <a href="https://demo.storylane.com/demo/1j3kslnrp6q2" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-dark)', fontWeight: 600 }}>Open it in a new tab</a>.
              </p>
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
              The tour illustrates a proposed workflow. For exercises you can use now, read the free guides below. Sample feedback in this tour is not a personal assessment.
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
              What the walkthrough illustrates
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
                "Sample interview screen",
                "Example configuration options",
                "Illustrative report layout — not your score",
                "Proposed role-selection interface"
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

          {/* 5. INTERNAL LINKS SECTION */}
          <section style={{ marginBottom: 'clamp(48px, 7vh, 80px)' }}>
            <h2 className="brig" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--slate)', marginBottom: '20px', letterSpacing: '-0.02em', textAlign: 'center' }}>
              Continue Your Placement Preparation
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {[
                { label: 'Complete Placement Guide', href: '/placement-preparation-complete-guide' },
                { label: 'Placement Prep Tips', href: '/placement-preparation' },
                { label: 'Aptitude Questions', href: '/aptitude-questions' },
                { label: 'Coding Interview Q&A', href: '/coding-interview-questions' },
                { label: 'TCS Placement Guide', href: '/company-wise-questions/tcs' },
                { label: 'All Blog Posts', href: '/blog' },
              ].map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => onNav(href)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '9px 18px', border: '1px solid var(--border)', borderRadius: '999px',
                    fontSize: '13px', fontWeight: 600, color: 'var(--teal-dark)', background: 'var(--teal-light)',
                    cursor: 'pointer', transition: 'all 0.18s', fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--teal)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--teal-light)'; e.currentTarget.style.color = 'var(--teal-dark)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          {/* 6. FINAL CTA SECTION */}
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
                onClick={() => onNav('/dashboard')}
                className="btn-primary"
                style={{
                  padding: '16px 36px',
                  borderRadius: '999px',
                  fontSize: '17px',
                  boxShadow: '0 8px 24px rgba(13, 148, 136, 0.25)'
                }}
              >
                Explore the demo
              </button>
            </div>
          </section>
        </div>

      </div>
    </PageLayout>
  );
}

