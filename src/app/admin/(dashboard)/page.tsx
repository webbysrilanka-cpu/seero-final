import Link from "next/link";
import {
  Inbox,
  FileText,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { Inquiry } from "@/lib/types";
import StatusBadge from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const supabase = await createClient();

  const [leadsRes, newLeadsRes, postsRes, projectsRes, recentRes] =
    await Promise.all([
      supabase.from("inquiries").select("id", { count: "exact", head: true }),
      supabase
        .from("inquiries")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase.from("posts").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

  const recent = (recentRes.data ?? []) as Inquiry[];

  const cards = [
    {
      label: "New enquiries",
      value: newLeadsRes.count ?? 0,
      icon: TrendingUp,
      href: "/admin/leads?status=new",
      accent: true,
    },
    {
      label: "Total enquiries",
      value: leadsRes.count ?? 0,
      icon: Inbox,
      href: "/admin/leads",
    },
    {
      label: "Blog posts",
      value: postsRes.count ?? 0,
      icon: FileText,
      href: "/admin/blog",
    },
    {
      label: "Portfolio projects",
      value: projectsRes.count ?? 0,
      icon: Briefcase,
      href: "/admin/portfolio",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Overview
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Everything happening on your website, in one place.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
              c.accent
                ? "border-cyan-glow/30 bg-cyan-glow/8 hover:border-cyan-glow/50"
                : "border-line bg-surface/40 hover:border-cyan-glow/25"
            }`}
          >
            <div className="flex items-start justify-between">
              <p className="text-xs uppercase tracking-widest text-ink-mute">
                {c.label}
              </p>
              <c.icon
                className={`h-4 w-4 ${c.accent ? "text-cyan-glow" : "text-ink-mute"}`}
              />
            </div>
            <p className="mt-3 font-display text-3xl font-bold text-ink">
              {c.value}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Latest enquiries
          </h2>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-sm text-cyan-glow hover:underline"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-line bg-surface/20 p-12 text-center">
            <Inbox className="mx-auto h-8 w-8 text-ink-mute" />
            <p className="mt-4 text-sm text-ink-soft">
              No enquiries yet. They will appear here the moment someone submits
              the contact form.
            </p>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {recent.map((lead) => (
              <li
                key={lead.id}
                className="rounded-2xl border border-line bg-surface/40 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-ink">{lead.name}</p>
                      <StatusBadge status={lead.status} />
                    </div>
                    {lead.company && (
                      <p className="mt-0.5 text-xs text-ink-mute">
                        {lead.company}
                      </p>
                    )}
                    <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                      {lead.project_description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-mute">
                      <a
                        href={`mailto:${lead.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-cyan-glow"
                      >
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </a>
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1.5 hover:text-cyan-glow"
                        >
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="whitespace-nowrap text-xs text-ink-mute">
                    {formatDate(lead.created_at)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
