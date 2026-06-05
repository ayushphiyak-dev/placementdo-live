import { useState } from 'react';
import {
  getAuthRedirectTo,
  isValidLocalAuthEmail,
  setLocalAuthUser,
  supabase,
} from '../../lib/supabaseClient';

export default function SignUpPage({ onNav }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const visibleError = error || '';

  const validateConfirm = (value) => {
    if (value && password && value !== password) {
      setConfirmError('Passwords do not match.');
    } else {
      setConfirmError('');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setConfirmError('Passwords do not match.');
      return;
    }
    if (!supabase) {
      if (!isValidLocalAuthEmail(email)) {
        setError('Enter a valid email address to continue.');
        return;
      }
      setError('');
      const saved = setLocalAuthUser({ email });
      if (!saved) {
        setError('Unable to create local demo session. Please try again.');
        return;
      }
      onNav('/dashboard');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: getAuthRedirectTo() },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess('Account created! Check your email to confirm your address, then sign in.');
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
      setError('Unable to create demo session. Please try again.');
      return;
    }
    onNav('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--ivory)', padding: '24px' }}>
      <div className="card fade-in-up" style={{ width: '100%', maxWidth: 400, padding: '40px 36px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, background: 'var(--slate-50)', border: '1px solid var(--border)', borderRadius: 12, padding: 4 }}>
          <button type="button" className="btn-ghost" style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: 13 }} onClick={() => onNav('/signin')}>
            Sign in
          </button>
          <button type="button" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: 13 }}>
            Sign up
          </button>
        </div>

        {/* Logo / wordmark */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span className="brig" style={{ fontSize: 22, fontWeight: 700, color: 'var(--teal)' }}>PlacementDo</span>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--slate)', marginTop: 8 }}>Create your account</h1>
          <p style={{ fontSize: 13, color: 'var(--slate-500)', marginTop: 4 }}>Start your placement prep journey today.</p>
        </div>

        {success ? (
          <div role="status" style={{ background: 'var(--green-light)', color: 'var(--green)', borderRadius: 10, padding: '14px 16px', fontSize: 13, fontWeight: 500, textAlign: 'center', lineHeight: 1.5 }}>
            {success}
            <br />
            <button type="button" className="btn-ghost" style={{ marginTop: 12, color: 'var(--teal)', fontWeight: 600, fontSize: 13 }} onClick={() => onNav('/signin')}>
              Go to Sign In →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={loading || demoLoading}
              />
            </div>
            <div>
              <label htmlFor="signup-password">Password {!supabase ? '(optional in demo mode)' : ''}</label>
              <input
                id="signup-password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={Boolean(supabase)}
                {...(supabase ? { minLength: 8 } : {})}
                autoComplete="new-password"
                disabled={loading || demoLoading}
              />
            </div>
            <div>
              <label htmlFor="signup-confirm">Confirm Password {!supabase ? '(optional in demo mode)' : ''}</label>
              <input
                id="signup-confirm"
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); validateConfirm(e.target.value); }}
                onBlur={(e) => validateConfirm(e.target.value)}
                required={Boolean(supabase)}
                autoComplete="new-password"
                disabled={loading || demoLoading}
              />
              {confirmError && (
                <span role="alert" style={{ fontSize: 12, color: 'var(--red)', marginTop: 4, display: 'block' }}>{confirmError}</span>
              )}
            </div>

            {visibleError && (
              <div role="alert" style={{ background: 'var(--red-light)', color: 'var(--red)', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontWeight: 500 }}>
                {visibleError}
              </div>
            )}

            {!supabase && (
              <>
                <div role="status" style={{ background: 'var(--amber-light)', color: 'var(--amber)', borderRadius: 10, padding: '10px 14px', fontSize: 12.5, fontWeight: 700, lineHeight: 1.5, border: '1px solid rgba(217,119,6,.25)' }}>
                  Demo mode is active. Supabase is not configured, so this local account is temporary and not secure for production.
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
              {loading ? <><span className="spin">◌</span> Creating account…</> : 'Create account'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 13, color: 'var(--slate-500)' }}>
          Already have an account?{' '}
          <button
            type="button"
            className="btn-ghost"
            style={{ padding: '0 2px', fontSize: 13, fontWeight: 600, color: 'var(--teal)', display: 'inline' }}
            onClick={() => onNav('/signin')}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
