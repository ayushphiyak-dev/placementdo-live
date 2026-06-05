import { useEffect, useState } from 'react';
import {
  isValidLocalAuthEmail,
  setLocalAuthUser,
  supabase,
} from '../../lib/supabaseClient';

const getAuthErrorFromQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const authError = params.get('auth_error');
  return authError ? decodeURIComponent(authError) : '';
};

export default function SignInPage({ onNav }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState(() => getAuthErrorFromQueryParams());
  const visibleError = error || '';

  useEffect(() => {
    if (!error) return;
    const params = new URLSearchParams(window.location.search);
    params.delete('auth_error');
    const cleaned = params.toString();
    window.history.replaceState({}, '', `${window.location.pathname}${cleaned ? `?${cleaned}` : ''}${window.location.hash}`);
  }, [error]);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!supabase) {
      if (!isValidLocalAuthEmail(email)) {
        setError('Enter a valid email address to continue.');
        return;
      }
      setError('');
      const saved = setLocalAuthUser({ email });
      if (!saved) {
        setError('Unable to start local demo session. Please try again.');
        return;
      }
      onNav('/dashboard');
      return;
    }
    setError('');
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
    } else {
      onNav('/dashboard');
    }
  };

  const handleContinueDemo = () => {
    setError('');
    setDemoLoading(true);
    const saved = setLocalAuthUser({
      isDemo: true,
    });
    setDemoLoading(false);
    if (!saved) {
      setError('Unable to start demo session. Please try again.');
      return;
    }
    onNav('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--ivory)', padding: '24px' }}>
      <div className="card fade-in-up" style={{ width: '100%', maxWidth: 400, padding: '40px 36px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'var(--slate-50)', border: '1px solid var(--border)', borderRadius: 12, padding: 4 }}>
          <button type="button" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: 13 }}>
            Sign in
          </button>
          <button type="button" className="btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: 13 }} onClick={() => onNav('/signup')}>
            Sign up
          </button>
        </div>

        {/* Logo / wordmark */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span className="brig" style={{ fontSize: 22, fontWeight: 700, color: 'var(--teal)' }}>PlacementDo</span>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--slate)', marginTop: 8 }}>Sign in to your account</h1>
          <p style={{ fontSize: 13, color: 'var(--slate-500)', marginTop: 4 }}>Welcome back! Continue your placement prep.</p>
        </div>

        {/* Email / Password form */}
        <form onSubmit={handleEmailSignIn} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label htmlFor="signin-email">Email</label>
            <input
              id="signin-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="signin-password">Password {!supabase ? '(optional in demo mode)' : ''}</label>
            <input
              id="signin-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={Boolean(supabase)}
              {...(supabase ? { autoComplete: 'current-password' } : {})}
              disabled={loading}
            />
          </div>

          {visibleError && (
            <div role="alert" style={{ background: 'var(--red-light)', color: 'var(--red)', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontWeight: 500 }}>
              {visibleError}
            </div>
          )}

          {!supabase && (
            <>
              <div role="status" style={{ background: 'var(--amber-light)', color: 'var(--amber)', borderRadius: 10, padding: '10px 14px', fontSize: 12.5, fontWeight: 700, lineHeight: 1.5, border: '1px solid rgba(217,119,6,.25)' }}>
                Demo mode is active. Supabase is not configured, so this session is local-only and not secure for production.
              </div>
              <button
                type="button"
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleContinueDemo}
                disabled={loading || demoLoading}
              >
                {demoLoading ? <><span className="spin">◌</span> Starting demo…</> : 'Continue in Demo (no email)'}
              </button>
            </>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} disabled={loading || demoLoading}>
            {loading ? <><span className="spin">◌</span> Signing in…</> : 'Sign in'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--slate-500)' }}>
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '0 2px', fontSize: 13, fontWeight: 600, color: 'var(--teal)', display: 'inline' }}
            onClick={() => onNav('/signup')}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
