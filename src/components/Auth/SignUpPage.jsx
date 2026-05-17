import { useState } from 'react';
import { authConfigError, supabase } from '../../lib/supabaseClient';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function SignUpPage({ onNav }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const authUnavailable = !supabase;
  const visibleError = error || authConfigError;

  const validateConfirm = (value) => {
    if (value && password && value !== password) {
      setConfirmError('Passwords do not match.');
    } else {
      setConfirmError('');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError(authConfigError);
      return;
    }
    setError('');
    setSuccess('');
    if (password !== confirm) {
      setConfirmError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
    } else {
      setSuccess('Account created! Check your email to confirm your address, then sign in.');
    }
  };

  const handleGoogleSignUp = async () => {
    if (!supabase) {
      setError(authConfigError);
      return;
    }
    setError('');
    setGoogleLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { prompt: 'select_account' },
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
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

        {/* Google OAuth */}
        <button
          type="button"
          className="btn-secondary"
          style={{ width: '100%', justifyContent: 'center', marginBottom: 20, borderRadius: 12, padding: '11px 0', fontSize: 14, fontWeight: 600 }}
          onClick={handleGoogleSignUp}
          disabled={googleLoading || loading || authUnavailable}
        >
          {googleLoading ? <><span className="spin">◌</span> Sign up with Google</> : <><GoogleIcon /> Sign up with Google</>}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--slate-400)', fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
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
                disabled={loading || googleLoading || authUnavailable}
              />
            </div>
            <div>
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                disabled={loading || googleLoading || authUnavailable}
              />
            </div>
            <div>
              <label htmlFor="signup-confirm">Confirm Password</label>
              <input
                id="signup-confirm"
                type="password"
                placeholder="Repeat your password"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); validateConfirm(e.target.value); }}
                onBlur={(e) => validateConfirm(e.target.value)}
                required
                autoComplete="new-password"
                disabled={loading || googleLoading || authUnavailable}
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

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }} disabled={loading || googleLoading || authUnavailable}>
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
