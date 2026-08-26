export type LeadStatus = "new" | "contacted" | "in_discussion" | "closed";
export type PostStatus = "draft" | "published";

export interface Service {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  client_name: string | null;
  image_url: string | null;
  url: string | null;
  technologies: string[];
  featured: boolean;
  sort_order: number;
  is_published: boolean;
  is_concept: boolean;
  year: number;
  outcome: string;
  accent: string;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  tags: string[];
  author: string;
  status: PostStatus;
  published_at: string | null;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_interest: string | null;
  budget_range: string | null;
  project_description: string;
  preferred_contact: string | null;
  status: LeadStatus;
  source: string;
  page_path: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar_url: string | null;
  is_published: boolean;
  sort_order: number;
}
