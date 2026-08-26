/**
 * Supabase connection details.
 *
 * These are the PUBLISHABLE (anon) credentials — they are designed to be
 * visible in the browser and every read/write they allow is restricted by
 * Row Level Security in the database. They are safe in source control.
 *
 * To point the site at a different Supabase project, set
 * NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel →
 * Project → Settings → Environment Variables. Those override the values here.
 */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qejxbsdwsdgkpvnuqoym.supabase.co";

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_yelh7JiqIEAs7shD2uXMLQ_dYGlcf4c";
