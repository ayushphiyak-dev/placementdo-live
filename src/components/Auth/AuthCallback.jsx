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
    // The Supabase client processes the URL hash automatically on initialise.
    // We listen for the first SIGNED_IN event and navigate from there.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        onNav('/dashboard');
      }
    });

    // Fallback: if a session already exists (page reload), redirect immediately.
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) onNav('/dashboard');
    });

    return () => subscription.unsubscribe();
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
