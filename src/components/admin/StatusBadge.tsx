import type { LeadStatus } from "@/lib/types";

const styles: Record<LeadStatus, string> = {
  new: "border-cyan-glow/35 bg-cyan-glow/12 text-cyan-glow",
  contacted: "border-amber-400/35 bg-amber-400/10 text-amber-300",
  in_discussion: "border-violet-400/35 bg-violet-400/10 text-violet-300",
  closed: "border-line bg-surface text-ink-mute",
};

const labels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  in_discussion: "In discussion",
  closed: "Closed",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  const key = (styles[status] ? status : "new") as LeadStatus;
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${styles[key]}`}
    >
      {labels[key]}
    </span>
  );
}
