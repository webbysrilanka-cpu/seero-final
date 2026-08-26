import { publicClient } from "@/lib/supabase/public";
import type { Post, Project, Service, Testimonial } from "@/lib/types";

export async function getServices(): Promise<Service[]> {
  const { data, error } = await publicClient
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) return [];
  return (data ?? []) as Service[];
}

export async function getProjects(limit?: number): Promise<Project[]> {
  let query = publicClient
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) return [];
  return (data ?? []) as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await publicClient
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (error) return null;
  return (data as Project) ?? null;
}

export async function getPosts(limit?: number): Promise<Post[]> {
  let query = publicClient
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) return [];
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await publicClient
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) return null;
  return (data as Post) ?? null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await publicClient
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");
  if (error) return [];
  return (data ?? []) as Testimonial[];
}
