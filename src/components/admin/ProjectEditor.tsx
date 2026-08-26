"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Loader2, Save } from "lucide-react";
import { saveProject, type ActionState } from "@/app/admin/actions";
import BrowserMockup from "@/components/ui/BrowserMockup";
import type { Project } from "@/lib/types";
import { slugify, cn } from "@/lib/utils";

const initial: ActionState = { ok: false, message: "" };

const input =
  "w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-ink-mute/60 outline-none transition-colors focus:border-cyan-glow/50";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-core to-blue-deep px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgba(34,224,255,0.8)] transition-transform hover:scale-[1.02] disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving…
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save project
        </>
      )}
    </button>
  );
}

function Toggle({
  name,
  label,
  hint,
  defaultChecked,
}: {
  name: string;
  label: string;
  hint: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-void/50 p-4 transition-colors has-[:checked]:border-cyan-glow/40 has-[:checked]:bg-cyan-glow/8">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 accent-[#22e0ff]"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="mt-0.5 block text-xs text-ink-mute">{hint}</span>
      </span>
    </label>
  );
}

export default function ProjectEditor({ project }: { project?: Project }) {
  const [state, formAction] = useActionState(saveProject, initial);
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project?.slug));
  const [category, setCategory] = useState(project?.category ?? "");
  const [accent, setAccent] = useState(project?.accent ?? "cyan");

  return (
    <form action={formAction} className="mx-auto max-w-4xl">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/portfolio"
          className="inline-flex items-center gap-2 text-sm text-ink-mute transition-colors hover:text-cyan-glow"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>
        <Submit />
      </div>

      <h1 className="mt-7 font-display text-2xl font-bold text-ink">
        {project ? "Edit project" : "New project"}
      </h1>

      {state.message && !state.ok && (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/8 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {state.message}
        </p>
      )}

      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
              Project title
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              required
              className={input}
              placeholder="Ceylon Spice Kitchen"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
                URL slug
              </label>
              <input
                name="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(e.target.value);
                }}
                className={input}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
                Category
              </label>
              <input
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className={input}
                placeholder="Restaurant & Cafe"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
              Summary (shown on the cards)
            </label>
            <textarea
              name="summary"
              defaultValue={project?.summary ?? ""}
              rows={2}
              className={input}
              placeholder="One line about what this project set out to do."
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
              Full description
            </label>
            <textarea
              name="description"
              defaultValue={project?.description ?? ""}
              rows={5}
              className={input}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
              Outcome / result
            </label>
            <input
              name="outcome"
              defaultValue={project?.outcome ?? ""}
              className={input}
              placeholder="Menu-first layout with a persistent booking bar."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
                Client name
              </label>
              <input
                name="client_name"
                defaultValue={project?.client_name ?? ""}
                className={input}
                placeholder="Concept project"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
                Live URL (optional)
              </label>
              <input
                name="url"
                type="url"
                defaultValue={project?.url ?? ""}
                className={input}
                placeholder="https://"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
              Features / tech (comma separated)
            </label>
            <input
              name="technologies"
              defaultValue={project?.technologies?.join(", ") ?? ""}
              className={input}
              placeholder="Online menu, Table booking, Google Maps"
            />
          </div>
        </div>

        {/* side panel */}
        <div className="space-y-4">
          <div className="rounded-xl border border-line bg-void/40 p-4">
            <p className="mb-3 text-xs uppercase tracking-widest text-ink-mute">
              Card preview
            </p>
            <BrowserMockup
              title={title || "Project"}
              category={category || "Category"}
              accent={accent}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
              Accent colour
            </label>
            <div className="flex gap-2">
              {["cyan", "blue", "violet"].map((a) => (
                <label
                  key={a}
                  className={cn(
                    "flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center text-xs capitalize transition-colors",
                    accent === a
                      ? "border-cyan-glow/50 bg-cyan-glow/10 text-cyan-glow"
                      : "border-line bg-void/50 text-ink-soft"
                  )}
                >
                  <input
                    type="radio"
                    name="accent"
                    value={a}
                    checked={accent === a}
                    onChange={() => setAccent(a)}
                    className="sr-only"
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
                Year
              </label>
              <input
                name="year"
                type="number"
                defaultValue={project?.year ?? new Date().getFullYear()}
                className={input}
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
                Order
              </label>
              <input
                name="sort_order"
                type="number"
                defaultValue={project?.sort_order ?? 0}
                className={input}
              />
            </div>
          </div>

          <Toggle
            name="is_published"
            label="Published"
            hint="Show this project on the public portfolio page."
            defaultChecked={project?.is_published ?? false}
          />
          <Toggle
            name="is_concept"
            label="Concept project"
            hint="Adds a 'Concept' label so visitors know it is not client work."
            defaultChecked={project?.is_concept ?? true}
          />
          <Toggle
            name="featured"
            label="Featured"
            hint="Highlight this one above the others."
            defaultChecked={project?.featured ?? false}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-line pt-6">
        <Submit />
      </div>
    </form>
  );
}
