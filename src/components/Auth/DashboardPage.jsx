import { useEffect, useState } from 'react';
import {
  authConfigError,
  clearLocalAuthUser,
  getLocalAuthUser,
  isLocalDemoUser,
  supabase,
} from '../../lib/supabaseClient';

export default function DashboardPage({ onNav }) {
  const [user, setUser] = useState(() => (supabase ? null : getLocalAuthUser()));
  const [loading, setLoading] = useState(() => Boolean(supabase));
  const [upgradeMessage, setUpgradeMessage] = useState('');

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        onNav('/signin');
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        onNav('/signin');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [onNav]);

  const handleSignOut = async () => {
    if (!supabase) {
      clearLocalAuthUser();
      onNav('/signin');
      return;
    }
    await supabase.auth.signOut();
    onNav('/signin');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--ivory)' }}>
        <span className="spin" style={{ fontSize: 24, color: 'var(--teal)' }}>◌</span>
      </div>
    );
  }

  if (!supabase && !user) {
    return (
      <div className="dash-main" style={{ background: 'var(--ivory)' }}>
        <div className="card card-constrain fade-in-up" style={{ padding: '36px 32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, color: 'var(--slate)', marginBottom: 10 }}>Authentication unavailable</h1>
          <p style={{ fontSize: 14, color: 'var(--slate-500)', marginBottom: 20 }}>{authConfigError}</p>
          <button className="btn-primary" onClick={() => onNav('/signin')}>Go to sign in</button>
        </div>
      </div>
    );
  }

  const avatarUrl = user?.user_metadata?.avatar_url;
  const fullName = user?.user_metadata?.full_name || user?.user_metadata?.name;
  const displayEmail = user?.email ?? '';
  const demoUser = !supabase && isLocalDemoUser(user);
  const guestId = user?.user_metadata?.guest_id || '';
  const initials = fullName
    ? fullName.split(' ').filter((n) => n).map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : displayEmail.slice(0, 2).toUpperCase();
  const navigateToInterview = () => {
    if (demoUser) {
      setUpgradeMessage('Mock Interviews require a secure account for authentication. Configure Supabase, then sign in or sign up with a real account.');
      return;
    }
    setUpgradeMessage('');
    onNav('/interview');
  };

  return (
    <div className="dash-main" style={{ background: 'var(--ivory)' }}>
      <div className="card-constrain">
        {/* Header */}
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <button className="btn-ghost" style={{ color: 'var(--teal)', fontWeight: 700, fontSize: 18, padding: 0 }} onClick={() => onNav('/')}>
            ← PlacementDo
          </button>
          <button className="btn-danger" onClick={handleSignOut} style={{ borderRadius: 12 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign out
          </button>
        </header>

        {/* Profile card */}
        <div className="card fade-in-up" style={{ padding: '36px 32px', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0 }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt={fullName || displayEmail} width={72} height={72} style={{ borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--teal-light)' }} referrerPolicy="no-referrer" />
            ) : (
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--teal)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 700, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                {initials}
              </div>
            )}
          </div>
          <div style={{ minWidth: 0 }}>
            {fullName && <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--slate)', marginBottom: 4 }}>{fullName}</div>}
            <div style={{ fontSize: 14, color: 'var(--slate-500)' }}>{displayEmail}</div>
            <span className="badge badge-teal" style={{ marginTop: 10 }}>Active</span>
            {demoUser && (
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--amber)' }}>
                Local demo session {guestId ? `(${guestId})` : ''} (Supabase not configured)
              </div>
            )}
          </div>
        </div>

        {demoUser && (
          <div className="card fade-in-up" style={{ padding: '18px 20px', marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: 'var(--slate-500)', lineHeight: 1.5, marginBottom: 12 }}>
              You are in demo mode. Demo data is local to this browser and some features require a real account.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <button className="btn-secondary" style={{ fontSize: 12.5 }} onClick={() => onNav('/signin')}>Sign in with real account</button>
              <button className="btn-ghost" style={{ fontSize: 12.5 }} onClick={() => onNav('/signup')}>Create real account</button>
            </div>
          </div>
        )}

        {upgradeMessage && (
          <div role="alert" className="card" style={{ padding: '14px 16px', marginBottom: 20, background: 'var(--amber-light)', border: '1px solid rgba(217,119,6,.25)', color: 'var(--amber)', fontSize: 13, fontWeight: 600 }}>
            {upgradeMessage}
          </div>
        )}

        {/* Quick stats / welcome */}
        <div className="feature-grid fade-in-up-1">
          <div className="feature-card">
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎯</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--slate)', marginBottom: 4 }}>Mock Interviews</div>
            <div style={{ fontSize: 13, color: 'var(--slate-500)', lineHeight: 1.5 }}>Practice AI-powered mock interviews tailored to your target companies.</div>
            <button className="btn-primary" style={{ marginTop: 20, fontSize: 13 }} onClick={navigateToInterview}>Start Practice</button>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: 28, marginBottom: 8 }}>📚</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--slate)', marginBottom: 4 }}>Study Resources</div>
            <div style={{ fontSize: 13, color: 'var(--slate-500)', lineHeight: 1.5 }}>Explore aptitude, coding, and company-wise question banks.</div>
            <button className="btn-secondary" style={{ marginTop: 20, fontSize: 13 }} onClick={() => onNav('/placement-preparation')}>Browse Resources</button>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: 28, marginBottom: 8 }}>📝</div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--slate)', marginBottom: 4 }}>Placement Blog</div>
            <div style={{ fontSize: 13, color: 'var(--slate-500)', lineHeight: 1.5 }}>Read the latest tips, strategies, and success stories.</div>
            <button className="btn-secondary" style={{ marginTop: 20, fontSize: 13 }} onClick={() => onNav('/blog')}>Read Blog</button>
          </div>
        </div>
      </div>
    </div>
  );
}
