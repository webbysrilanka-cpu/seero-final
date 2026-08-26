import Link from "next/link";
import { Inbox, Mail, Phone, Building2, Wallet, Tag } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { Inquiry, LeadStatus } from "@/lib/types";
import StatusBadge from "@/components/admin/StatusBadge";
import LeadControls from "@/components/admin/LeadControls";

export const dynamic = "force-dynamic";

const filters: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "in_discussion", label: "In discussion" },
  { key: "closed", label: "Closed" },
];

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = status && status !== "all" ? status : "all";

  const supabase = await createClient();
  let query = supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (active !== "all") query = query.eq("status", active);

  const { data } = await query;
  const leads = (data ?? []) as Inquiry[];

  return (
    <div className="mx-auto max-w-5xl">
      <header>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Enquiries
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Every message sent through your website. Update the status as you work
          through them.
        </p>
      </header>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/admin/leads" : `/admin/leads?status=${f.key}`}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              active === f.key
                ? "border-cyan-glow/40 bg-cyan-glow/12 text-cyan-glow"
                : "border-line bg-surface/40 text-ink-soft hover:text-ink"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface/20 p-14 text-center">
          <Inbox className="mx-auto h-8 w-8 text-ink-mute" />
          <p className="mt-4 text-sm text-ink-soft">
            {active === "all"
              ? "No enquiries yet."
              : "Nothing in this status right now."}
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {leads.map((lead) => (
            <li
              key={lead.id}
              className="rounded-2xl border border-line bg-surface/40 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-lg font-semibold text-ink">
                      {lead.name}
                    </h2>
                    <StatusBadge status={lead.status as LeadStatus} />
                  </div>
                  <p className="mt-1 text-xs text-ink-mute">
                    {formatDate(lead.created_at)} ·{" "}
                    {new Date(lead.created_at).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${lead.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-void/50 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </a>
                  {lead.phone && (
                    <>
                      <a
                        href={`tel:${lead.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-void/50 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#25D366]/35 bg-[#25D366]/10 px-3 py-1.5 text-xs text-[#25D366] transition-colors hover:bg-[#25D366]/20"
                      >
                        WhatsApp
                      </a>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-xs text-ink-mute sm:grid-cols-2 lg:grid-cols-4">
                <span className="inline-flex items-center gap-1.5 truncate">
                  <Mail className="h-3 w-3 shrink-0" />
                  {lead.email}
                </span>
                {lead.phone && (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-3 w-3 shrink-0" />
                    {lead.phone}
                  </span>
                )}
                {lead.company && (
                  <span className="inline-flex items-center gap-1.5 truncate">
                    <Building2 className="h-3 w-3 shrink-0" />
                    {lead.company}
                  </span>
                )}
                {lead.budget_range && (
                  <span className="inline-flex items-center gap-1.5">
                    <Wallet className="h-3 w-3 shrink-0" />
                    {lead.budget_range}
                  </span>
                )}
                {lead.service_interest && (
                  <span className="inline-flex items-center gap-1.5 truncate">
                    <Tag className="h-3 w-3 shrink-0" />
                    {lead.service_interest}
                  </span>
                )}
              </div>

              <p className="mt-4 whitespace-pre-wrap rounded-xl border border-line bg-void/50 p-4 text-sm leading-relaxed text-ink-soft">
                {lead.project_description}
              </p>

              <LeadControls
                id={lead.id}
                status={lead.status as LeadStatus}
                notes={lead.admin_notes ?? ""}
                preferredContact={lead.preferred_contact}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
