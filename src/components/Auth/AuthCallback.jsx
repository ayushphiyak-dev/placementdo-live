import { useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

/**
 * AuthCallback — handles the redirect from Supabase after OAuth / magic-link.
 * Supabase puts the session tokens in the URL fragment; the SDK picks them up
 * automatically via onAuthStateChange. We just wait for the session and then
 * forward the user to the dashboard.
 */
export default function AuthCallback({ onNav }) {
  useEffect(() => {
    let mounted = true;
    const searchParams = new URLSearchParams(window.location.search);
    const hasOAuthCode = searchParams.has('code');
    let oauthExchangeCompleted = !hasOAuthCode;

    const parseAuthError = () => {
      const search = new URLSearchParams(window.location.search);
      if (search.get('error_description')) return search.get('error_description');
      if (search.get('error')) return search.get('error');

      const hash = window.location.hash.startsWith('#') ? new URLSearchParams(window.location.hash.slice(1)) : null;
      if (hash?.get('error_description')) return hash.get('error_description');
      if (hash?.get('error')) return hash.get('error');

      return '';
    };

    const errorText = parseAuthError();
    if (errorText) {
      onNav(`/signin?auth_error=${encodeURIComponent(errorText)}`);
      return;
    }

    const finishOAuth = async () => {
      const code = searchParams.get('code');
      if (!code) return;

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      oauthExchangeCompleted = true;
      if (error && mounted) {
        onNav(`/signin?auth_error=${encodeURIComponent(error.message)}`);
      }
    };

    finishOAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) return;
      if (event === 'SIGNED_IN' || (event === 'INITIAL_SESSION' && oauthExchangeCompleted)) {
        onNav('/dashboard');
      }
    });

    // Fallback: if a session already exists (page reload), redirect immediately.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && oauthExchangeCompleted) onNav('/dashboard');
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [onNav]);

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--ivory)' }}>
      <div style={{ textAlign: 'center' }}>
        <span className="spin" style={{ fontSize: 28, color: 'var(--teal)', display: 'block', marginBottom: 16 }}>◌</span>
        <p style={{ fontSize: 15, color: 'var(--slate-500)' }}>Completing sign-in…</p>
      </div>
    </div>
  );
}
