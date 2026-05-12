import { createClient } from '@supabase/supabase-js';

function getUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
  return url;
}

// Browser / client-component client (lazy singleton)
let _client: ReturnType<typeof createClient> | null = null;
export function getSupabase() {
  if (!_client) {
    _client = createClient(getUrl(), process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  }
  return _client;
}

// Convenience re-export used in client components
export const supabase = {
  auth: {
    signInWithOtp: (opts: Parameters<ReturnType<typeof createClient>['auth']['signInWithOtp']>[0]) =>
      getSupabase().auth.signInWithOtp(opts),
    verifyOtp: (opts: Parameters<ReturnType<typeof createClient>['auth']['verifyOtp']>[0]) =>
      getSupabase().auth.verifyOtp(opts),
    setSession: (session: Parameters<ReturnType<typeof createClient>['auth']['setSession']>[0]) =>
      getSupabase().auth.setSession(session),
  },
};

// Server-only admin client (never import in client components)
export function supabaseAdmin() {
  return createClient(getUrl(), process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
