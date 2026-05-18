import { createClient } from '@supabase/supabase-js';

const normalizeEnvValue = (value) => {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/^['"]|['"]$/g, '');
};
const supabaseUrl = normalizeEnvValue(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = normalizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);
const supabasePublishableKey = normalizeEnvValue(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
const supabaseKey = supabaseAnonKey || supabasePublishableKey;
const authRedirectPath = '/auth/callback';

export const authConfigError = (!supabaseUrl || !supabaseKey)
  ? 'Authentication is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable sign in.'
  : '';

export const supabase = authConfigError
  ? null
  : createClient(supabaseUrl, supabaseKey);

const localAuthStorageKey = 'pd_local_auth_user';

export const getLocalAuthUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(localAuthStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (typeof parsed.email !== 'string' || !parsed.email.trim()) return null;
    return {
      email: parsed.email.trim(),
      user_metadata: {
        full_name: typeof parsed.full_name === 'string' ? parsed.full_name.trim() : '',
      },
    };
  } catch {
    return null;
  }
};

export const setLocalAuthUser = ({ email, fullName = '' }) => {
  if (typeof window === 'undefined') return;
  const normalizedEmail = typeof email === 'string' ? email.trim() : '';
  if (!normalizedEmail) return;
  const payload = {
    email: normalizedEmail,
    full_name: typeof fullName === 'string' ? fullName.trim() : '',
  };
  window.localStorage.setItem(localAuthStorageKey, JSON.stringify(payload));
};

export const clearLocalAuthUser = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(localAuthStorageKey);
};

export const getAuthRedirectTo = () => {
  const configuredRedirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL;
  if (configuredRedirectUrl) return configuredRedirectUrl;
  return `${window.location.origin}${authRedirectPath}`;
};
