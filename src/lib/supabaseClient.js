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
const localAuthStorageKey = 'pd_local_auth_user';

export const authConfigError = (!supabaseUrl || !supabaseKey)
  ? 'Authentication is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable sign in.'
  : '';

export const supabase = authConfigError
  ? null
  : createClient(supabaseUrl, supabaseKey);

export const isValidLocalAuthEmail = (value) => {
  if (typeof value !== 'string') return false;
  const email = value.trim();
  if (!email || email.includes('..')) return false;

  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex !== email.lastIndexOf('@')) return false;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  if (!local || !domain) return false;

  const domainLabels = domain.split('.');
  if (domainLabels.length < 2) return false;
  if (domainLabels.some((label) => !label || label.startsWith('-') || label.endsWith('-'))) return false;

  const tld = domainLabels[domainLabels.length - 1];
  if (!/^[A-Za-z]{2,}$/.test(tld)) return false;

  return /^[A-Za-z0-9._%+-]+$/.test(local) && /^[A-Za-z0-9.-]+$/.test(domain);
};

export const getLocalAuthUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(localAuthStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!isValidLocalAuthEmail(parsed.email)) return null;
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
  if (typeof window === 'undefined') return false;
  const normalizedEmail = typeof email === 'string' ? email.trim() : '';
  if (!isValidLocalAuthEmail(normalizedEmail)) return false;
  const payload = {
    email: normalizedEmail,
    full_name: typeof fullName === 'string' ? fullName.trim() : '',
  };
  window.localStorage.setItem(localAuthStorageKey, JSON.stringify(payload));
  return true;
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
