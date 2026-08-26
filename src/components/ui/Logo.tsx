import { cn } from "@/lib/utils";

export default function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-grid h-9 w-9 place-items-center">
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
          <defs>
            <linearGradient id="seero-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22e0ff" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
          <circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke="url(#seero-mark)"
            strokeWidth="1.6"
            opacity="0.55"
          />
          <circle
            cx="20"
            cy="20"
            r="17"
            fill="none"
            stroke="url(#seero-mark)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="34 140"
            className="origin-center animate-spin-slow"
          />
          <circle cx="20" cy="20" r="6.5" fill="url(#seero-mark)" />
          <circle cx="20" cy="20" r="2.4" fill="#04060d" />
        </svg>
        <span className="absolute inset-0 -z-10 rounded-full bg-cyan-glow/25 blur-lg" />
      </span>
      {showWordmark && (
        <span className="font-display text-[1.35rem] font-bold leading-none tracking-tight text-ink">
          Seero
        </span>
      )}
    </span>
  );
}
