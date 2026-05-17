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
    let navigated = false;

    const navigateToDashboard = () => {
      if (navigated) return;
      navigated = true;
      onNav('/dashboard');
    };

    const parseAuthError = () => {
      const search = new URLSearchParams(window.location.search);
      if (search.get('error_description')) return search.get('error_description');
      if (search.get('error')) return search.get('error');

      const hash = window.location.hash.startsWith('#') ? new URLSearchParams(window.location.hash.slice(1)) : null;
      if (hash?.get('error_description')) return hash.get('error_description');
      if (hash?.get('error')) return hash.get('error');

      return '';
    };

    const finishOAuth = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
      if (!code) return;

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error && mounted) {
        onNav(`/signin?auth_error=${encodeURIComponent(error.message)}`);
      }
    };

    const listener = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) return;
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        navigateToDashboard();
      }
    });
    const subscription = listener.data.subscription;

    const initialize = async () => {
      const errorText = parseAuthError();
      if (errorText) {
        onNav(`/signin?auth_error=${encodeURIComponent(errorText)}`);
        return;
      }

      await finishOAuth();
      if (!mounted) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (mounted && session) {
        navigateToDashboard();
      }
    };

    initialize();

    return () => {
      mounted = false;
      subscription?.unsubscribe();
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
