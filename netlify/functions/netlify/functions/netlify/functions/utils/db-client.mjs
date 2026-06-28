import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.mjs';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('[db-client] Variaveis de ambiente do Supabase ausentes (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).');
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  global: {
    fetch: async (url, options) => {
      const res = await fetch(url, options);
      if (!res.ok && res.status >= 500) triggerRestore();
      return res;
    },
  },
});

export default supabase;
export { SUPABASE_URL, SERVICE_ROLE_KEY };
