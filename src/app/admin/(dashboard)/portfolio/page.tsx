import Link from "next/link";
import { Briefcase, Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProject } from "@/app/admin/actions";
import BrowserMockup from "@/components/ui/BrowserMockup";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order");
  const projects = (data ?? []) as Project[];

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Portfolio
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Add real client work here as it comes in, and unpublish the concept
            projects when you no longer need them.
          </p>
        </div>
        <Link
          href="/admin/portfolio/new"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-core to-blue-deep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgba(34,224,255,0.8)] transition-transform hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          New project
        </Link>
      </header>

      {projects.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface/20 p-14 text-center">
          <Briefcase className="mx-auto h-8 w-8 text-ink-mute" />
          <p className="mt-4 text-sm text-ink-soft">No projects yet.</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="rounded-2xl border border-line bg-surface/40 p-5"
            >
              <BrowserMockup
                title={p.title}
                category={p.category}
                accent={p.accent}
                variant={i}
              />
              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate font-display text-base font-semibold text-ink">
                    {p.title}
                  </h2>
                  <p className="mt-1 font-mono text-[11px] text-ink-mute">
                    {p.category} · order {p.sort_order}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                        p.is_published
                          ? "border-cyan-glow/35 bg-cyan-glow/10 text-cyan-glow"
                          : "border-line bg-void/60 text-ink-mute"
                      }`}
                    >
                      {p.is_published ? "Published" : "Draft"}
                    </span>
                    {p.is_concept && (
                      <span className="rounded-full border border-line bg-void/60 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-mute">
                        Concept
                      </span>
                    )}
                    {p.featured && (
                      <span className="rounded-full border border-violet-400/35 bg-violet-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-violet-300">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 flex-col gap-2">
                  <Link
                    href={`/admin/portfolio/${p.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-void/50 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Link>
                  <DeleteButton
                    id={p.id}
                    action={deleteProject}
                    label="Delete?"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
