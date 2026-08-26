import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";

/**
 * Cookie-free client for public, read-only content.
 * Using this instead of the cookie-bound server client lets the public pages
 * be statically rendered and revalidated on a schedule.
 */
export const publicClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);
