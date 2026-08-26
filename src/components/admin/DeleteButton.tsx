"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteButton({
  id,
  action,
  label = "Delete this item?",
}: {
  id: string;
  action: (formData: FormData) => Promise<void>;
  label?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        aria-label="Delete"
        className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-void/50 px-3 py-1.5 text-xs text-ink-mute transition-colors hover:border-red-400/40 hover:text-red-300"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-red-400/35 bg-red-400/8 px-3 py-1.5 text-xs text-red-300">
      {label}
      <button
        onClick={() => {
          const fd = new FormData();
          fd.set("id", id);
          startTransition(() => {
            void action(fd);
          });
        }}
        disabled={pending}
        className="font-semibold underline underline-offset-2 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Yes"}
      </button>
      <button
        onClick={() => setConfirming(false)}
        className="text-ink-mute underline underline-offset-2"
      >
        No
      </button>
    </span>
  );
}
