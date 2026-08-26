"use server";

import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/config";

export interface ContactState {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot — real users never fill this hidden field.
  if (str(formData, "company_website")) {
    return { ok: true, message: "Thanks — we'll be in touch shortly." };
  }

  const name = str(formData, "name");
  const email = str(formData, "email");
  const phone = str(formData, "phone");
  const company = str(formData, "company");
  const service_interest = str(formData, "service_interest");
  const budget_range = str(formData, "budget_range");
  const project_description = str(formData, "project_description");
  const preferred_contact = str(formData, "preferred_contact") || "whatsapp";
  const page_path = str(formData, "page_path") || "/contact";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name.";
  if (name.length > 200) errors.name = "That name is too long.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (email.length > 320) errors.email = "That email address is too long.";
  if (project_description.length < 10)
    errors.project_description =
      "A sentence or two about what you need would help us reply properly.";
  if (project_description.length > 5000)
    errors.project_description = "Please keep this under 5000 characters.";
  if (phone && phone.length > 40) errors.phone = "That phone number is too long.";

  if (Object.keys(errors).length) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors,
    };
  }

  const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  let source = "website";
  try {
    const h = await headers();
    const ref = h.get("referer");
    if (ref) source = new URL(ref).pathname;
  } catch {
    /* ignore */
  }

  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    phone: phone || null,
    company: company || null,
    service_interest: service_interest || null,
    budget_range: budget_range || null,
    project_description,
    preferred_contact,
    status: "new",
    source,
    page_path,
  });

  if (error) {
    return {
      ok: false,
      message:
        "Something went wrong saving your message. Please WhatsApp us instead — we'll pick it up straight away.",
    };
  }

  return {
    ok: true,
    message:
      "Got it. We usually reply within a couple of hours during working hours.",
  };
}
