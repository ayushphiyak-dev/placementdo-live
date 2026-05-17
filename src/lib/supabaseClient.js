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

export const getAuthRedirectTo = () => {
  const configuredRedirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL;
  if (configuredRedirectUrl) return configuredRedirectUrl;
  return `${window.location.origin}${authRedirectPath}`;
};
