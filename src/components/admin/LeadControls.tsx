"use client";

import { useState, useTransition } from "react";
import { Check, Loader2, StickyNote } from "lucide-react";
import { updateLead } from "@/app/admin/actions";
import type { LeadStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const statuses: { key: LeadStatus; label: string }[] = [
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "in_discussion", label: "In discussion" },
  { key: "closed", label: "Closed" },
];

export default function LeadControls({
  id,
  status,
  notes,
  preferredContact,
}: {
  id: string;
  status: LeadStatus;
  notes: string;
  preferredContact: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const [current, setCurrent] = useState<LeadStatus>(status);
  const [noteText, setNoteText] = useState(notes);
  const [savedNote, setSavedNote] = useState(false);
  const [showNotes, setShowNotes] = useState(Boolean(notes));

  const setStatus = (next: LeadStatus) => {
    setCurrent(next);
    const fd = new FormData();
    fd.set("id", id);
    fd.set("status", next);
    startTransition(() => {
      void updateLead(fd);
    });
  };

  const saveNote = () => {
    const fd = new FormData();
    fd.set("id", id);
    fd.set("admin_notes", noteText);
    startTransition(async () => {
      await updateLead(fd);
      setSavedNote(true);
      setTimeout(() => setSavedNote(false), 2200);
    });
  };

  return (
    <div className="mt-5 border-t border-line pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs uppercase tracking-widest text-ink-mute">
          Status
        </span>
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => setStatus(s.key)}
            disabled={pending}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-60",
              current === s.key
                ? "border-cyan-glow/45 bg-cyan-glow/12 text-cyan-glow"
                : "border-line bg-void/50 text-ink-soft hover:text-ink"
            )}
          >
            {s.label}
          </button>
        ))}
        {pending && <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-glow" />}

        {preferredContact && (
          <span className="ml-auto text-xs text-ink-mute">
            Prefers: <span className="text-ink-soft">{preferredContact}</span>
          </span>
        )}
      </div>

      <div className="mt-3">
        {!showNotes ? (
          <button
            onClick={() => setShowNotes(true)}
            className="inline-flex items-center gap-1.5 text-xs text-ink-mute transition-colors hover:text-cyan-glow"
          >
            <StickyNote className="h-3.5 w-3.5" />
            Add a private note
          </button>
        ) : (
          <div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              rows={2}
              placeholder="Private notes — only you can see these."
              className="w-full rounded-xl border border-line bg-void/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-mute/60 outline-none transition-colors focus:border-cyan-glow/50"
            />
            <div className="mt-2 flex items-center gap-3">
              <button
                onClick={saveNote}
                disabled={pending}
                className="rounded-lg border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1.5 text-xs text-cyan-glow transition-colors hover:bg-cyan-glow/20 disabled:opacity-60"
              >
                Save note
              </button>
              {savedNote && (
                <span className="inline-flex items-center gap-1 text-xs text-cyan-glow">
                  <Check className="h-3.5 w-3.5" />
                  Saved
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
