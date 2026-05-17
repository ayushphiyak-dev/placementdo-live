import { createClient } from '@supabase/supabase-js';

const fallbackSupabaseUrl = 'https://lwgdtulhoixkjlzmkfur.supabase.co';
const fallbackSupabaseKey = 'sb_publishable_Wy5UIRXSHpeIrE3Wq_hcmg_LOGUeWDW';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseKey;
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
