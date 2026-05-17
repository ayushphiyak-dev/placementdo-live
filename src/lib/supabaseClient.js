import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const authConfigError = (!supabaseUrl || !supabaseKey)
  ? 'Authentication is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable sign in.'
  : '';

export const supabase = authConfigError
  ? null
  : createClient(supabaseUrl, supabaseKey);
