import { createClient } from "@/lib/supabase/server";

/**
 * Server actions are their own POST endpoints — they never pass through the
 * proxy or the dashboard layout, so neither of those gates protects them.
 * Without this, Row Level Security is the only thing standing between the
 * internet and `deletePost`. Call this first in every admin action.
 */
export async function assertAdmin() {
  const supabase = await createClient();

  // getUser() re-validates with the auth server; getSession() would trust a
  // cookie the caller controls.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (!admin) throw new Error("Not an admin.");

  return supabase;
}
