"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";

export interface ActionState {
  ok: boolean;
  message: string;
}

/* ── Auth ──────────────────────────────────────────────── */

export async function signIn(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { ok: false, message: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { ok: false, message: "Wrong email or password." };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("id", data.user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return {
      ok: false,
      message: "That account does not have admin access.",
    };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

/* ── Leads ─────────────────────────────────────────────── */

export async function updateLead(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const admin_notes = formData.get("admin_notes");

  const patch: Record<string, unknown> = {};
  if (status) patch.status = status;
  if (typeof admin_notes === "string") patch.admin_notes = admin_notes;
  if (!id || Object.keys(patch).length === 0) return;

  const supabase = await createClient();
  await supabase.from("inquiries").update(patch).eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

/* ── Blog posts ────────────────────────────────────────── */

export async function savePost(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const status = String(formData.get("status") ?? "draft");
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (title.length < 3) return { ok: false, message: "Give the post a title." };
  if (content.trim().length < 20)
    return { ok: false, message: "The post needs some content." };

  const slug = slugify(rawSlug || title);
  const supabase = await createClient();

  const payload: Record<string, unknown> = {
    title,
    slug,
    excerpt,
    content,
    status,
    tags,
  };

  if (status === "published") {
    if (id) {
      const { data: existing } = await supabase
        .from("posts")
        .select("published_at")
        .eq("id", id)
        .maybeSingle();
      if (!existing?.published_at) payload.published_at = new Date().toISOString();
    } else {
      payload.published_at = new Date().toISOString();
    }
  }

  const { error } = id
    ? await supabase.from("posts").update(payload).eq("id", id)
    : await supabase.from("posts").insert(payload);

  if (error) {
    return {
      ok: false,
      message:
        error.code === "23505"
          ? "Another post already uses that URL slug."
          : `Could not save: ${error.message}`,
    };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  redirect("/admin/blog?saved=1");
}

export async function deletePost(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

/* ── Portfolio projects ────────────────────────────────── */

export async function saveProject(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const client_name = String(formData.get("client_name") ?? "").trim();
  const outcome = String(formData.get("outcome") ?? "").trim();
  const accent = String(formData.get("accent") ?? "cyan");
  const url = String(formData.get("url") ?? "").trim();
  const year = Number(formData.get("year")) || new Date().getFullYear();
  const sort_order = Number(formData.get("sort_order")) || 0;
  const is_published = formData.get("is_published") === "on";
  const is_concept = formData.get("is_concept") === "on";
  const featured = formData.get("featured") === "on";
  const technologies = String(formData.get("technologies") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  if (title.length < 2) return { ok: false, message: "Give the project a title." };
  if (!category) return { ok: false, message: "Add a category." };

  const slug = slugify(rawSlug || title);
  const supabase = await createClient();

  const payload = {
    title,
    slug,
    summary,
    description,
    category,
    client_name: client_name || null,
    outcome,
    accent,
    url: url || null,
    year,
    sort_order,
    is_published,
    is_concept,
    featured,
    technologies,
  };

  const { error } = id
    ? await supabase.from("projects").update(payload).eq("id", id)
    : await supabase.from("projects").insert(payload);

  if (error) {
    return {
      ok: false,
      message:
        error.code === "23505"
          ? "Another project already uses that URL slug."
          : `Could not save: ${error.message}`,
    };
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
  redirect("/admin/portfolio?saved=1");
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}
