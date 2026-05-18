import { createClient } from '@supabase/supabase-js';

const normalizeEnvValue = (value) => {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/^['"]|['"]$/g, '');
};

const hasJwtStructure = (value) => /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(value);

const validateSupabaseConfig = ({ url, key }) => {
  const issues = [];

  if (!url) issues.push('missing VITE_SUPABASE_URL');
  if (!key) issues.push('missing Supabase key (set VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY)');

  if (url) {
    try {
      const parsed = new URL(url);
      if (!/^https?:$/.test(parsed.protocol)) {
        issues.push('VITE_SUPABASE_URL must start with http:// or https://');
      }
    } catch {
      issues.push('VITE_SUPABASE_URL is not a valid URL');
    }
  }

  if (key) {
    const isPublishableKey = key.startsWith('sb_publishable_');
    const isSecretKey = key.startsWith('sb_secret_');
    if (isSecretKey) {
      issues.push('do not use sb_secret_* in frontend; use VITE_SUPABASE_ANON_KEY or sb_publishable_*');
    } else if (!isPublishableKey && !hasJwtStructure(key)) {
      issues.push('Supabase key format appears invalid (expected JWT format or sb_publishable_<token>)');
    }
  }

  if (!issues.length) return '';
  return `Authentication is not configured correctly: ${issues.join('; ')}.`;
};

const supabaseUrl = normalizeEnvValue(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = normalizeEnvValue(import.meta.env.VITE_SUPABASE_ANON_KEY);
const supabasePublishableKey = normalizeEnvValue(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);
const supabaseKey = supabaseAnonKey || supabasePublishableKey;
const authRedirectPath = '/auth/callback';
const localAuthStorageKey = 'pd_local_auth_user';
const localDemoDomain = 'demo.local';
const localDemoEmailSuffix = `@${localDemoDomain}`;
const localDemoIdSanitizer = /[^a-z0-9-]/g;
const localDemoAliasLength = 4;
const defaultLocalDemoAlias = 'USER';

export const authConfigError = validateSupabaseConfig({ url: supabaseUrl, key: supabaseKey });

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

const generateLocalGuestId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `guest-${crypto.randomUUID().slice(0, 8)}`;
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    const token = Array.from(bytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');
    return `guest-${token}`;
  }
  const timestampHex = Date.now().toString(16).slice(-8).padStart(8, '0');
  return `guest-${timestampHex}`;
};

const createLocalDemoEmail = (guestId) => {
  const safeId = typeof guestId === 'string'
    ? guestId.toLowerCase().replace(localDemoIdSanitizer, '').slice(0, 32)
    : '';
  const suffix = safeId || generateLocalGuestId().replace(localDemoIdSanitizer, '').slice(0, 32);
  return `${suffix}${localDemoEmailSuffix}`;
};

export const isLocalDemoUser = (user) => {
  const metadataDemoFlag = user?.user_metadata?.is_demo === true;
  const email = typeof user?.email === 'string' ? user.email.trim().toLowerCase() : '';
  return metadataDemoFlag || email.endsWith(localDemoEmailSuffix);
};

const resolveLocalDisplayName = ({ fullName, shouldCreateDemoIdentity, guestAlias }) => {
  if (!shouldCreateDemoIdentity) return typeof fullName === 'string' ? fullName.trim() : '';
  if (typeof fullName === 'string' && fullName.trim()) return fullName.trim();
  return `Guest ${guestAlias || defaultLocalDemoAlias}`;
};

export const getLocalAuthUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(localAuthStorageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    if (!isValidLocalAuthEmail(parsed.email)) return null;
    const fullName = typeof parsed.full_name === 'string' ? parsed.full_name.trim() : '';
    const avatarUrl = typeof parsed.avatar_url === 'string' ? parsed.avatar_url.trim() : '';
    const guestId = typeof parsed.guest_id === 'string' ? parsed.guest_id.trim() : '';
    const isDemo = parsed.is_demo === true || parsed.email.trim().toLowerCase().endsWith(localDemoEmailSuffix);
    return {
      email: parsed.email.trim(),
      user_metadata: {
        full_name: fullName,
        avatar_url: avatarUrl,
        guest_id: guestId,
        is_demo: isDemo,
      },
    };
  } catch {
    return null;
  }
};

export const setLocalAuthUser = ({
  email,
  fullName = '',
  avatarUrl = '',
  guestId = '',
  isDemo = false,
}) => {
  if (typeof window === 'undefined') return false;
  const providedEmail = typeof email === 'string' ? email.trim() : '';
  const shouldCreateDemoIdentity = !providedEmail || isDemo;
  const normalizedGuestId = typeof guestId === 'string' ? guestId.trim() : '';
  const resolvedGuestId = shouldCreateDemoIdentity ? (normalizedGuestId || generateLocalGuestId()) : '';
  const normalizedEmail = shouldCreateDemoIdentity
    ? createLocalDemoEmail(resolvedGuestId)
    : providedEmail;
  if (!isValidLocalAuthEmail(normalizedEmail)) return false;
  const guestAlias = shouldCreateDemoIdentity
    ? resolvedGuestId.replace(/^guest-/, '').slice(-localDemoAliasLength).toUpperCase()
    : '';
  const normalizedFullName = resolveLocalDisplayName({ fullName, shouldCreateDemoIdentity, guestAlias });
  const normalizedAvatarUrl = typeof avatarUrl === 'string' ? avatarUrl.trim() : '';
  const payload = {
    email: normalizedEmail,
    full_name: normalizedFullName,
    avatar_url: normalizedAvatarUrl,
    guest_id: resolvedGuestId,
    is_demo: shouldCreateDemoIdentity,
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
