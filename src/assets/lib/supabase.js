import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isPublishableKey = (key) => typeof key === 'string' && key.startsWith('sb_publishable_');
const isPlaceholderKey = (key) =>
  !key ||
  /xxx|your-|placeholder|example/i.test(key) ||
  key === 'sb_publishable_xxx';

function createPublishableFetch(key) {
  return async (input, init) => {
    const headers = new Headers(init?.headers);

    if (!headers.has('apikey')) {
      headers.set('apikey', key);
    }

    const authorization = headers.get('Authorization');
    if (!authorization) {
      headers.set('Authorization', key);
    } else if (authorization.startsWith(`Bearer ${key}`)) {
      headers.set('Authorization', key);
    }

    return fetch(input, { ...init, headers });
  };
}

function createSupabaseClient() {
  const usePublishableKey = isPublishableKey(supabaseKey);

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      hasCustomAuthorizationHeader: usePublishableKey,
    },
    global: {
      headers: usePublishableKey
        ? { apikey: supabaseKey, Authorization: supabaseKey }
        : {},
      fetch: usePublishableKey ? createPublishableFetch(supabaseKey) : undefined,
    },
  });
}

function createDummySupabase() {
  const noop = async () => ({ data: null, error: { message: 'Supabase não está configurado' } });
  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signOut: async () => ({ error: null }),
      setSession: noop,
      signInWithIdToken: noop,
      signInWithPassword: async () => ({
        data: { user: null, session: null },
        error: {
          message: isPlaceholderKey(supabaseKey)
            ? 'Chave do Supabase inválida. Copie a chave anon/publishable correta do painel do Supabase para o arquivo .env (VITE_SUPABASE_ANON_KEY).'
            : 'Supabase não está configurado. Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo .env.',
        },
      }),
    },
    storage: {
      from: () => ({ upload: noop, getPublicUrl: async () => ({ data: { publicUrl: '' }, error: null }) }),
    },
    from: () => ({
      select: noop,
      insert: noop,
      update: noop,
      delete: noop,
      order: () => ({ select: noop }),
      eq: () => ({ select: noop }),
      gte: () => ({ select: noop }),
      lte: () => ({ select: noop }),
      or: () => ({ select: noop }),
      gt: () => ({ select: noop }),
    }),
  };
}

const supabase =
  supabaseUrl && supabaseKey && !isPlaceholderKey(supabaseKey)
    ? createSupabaseClient()
    : createDummySupabase();

export default supabase;
