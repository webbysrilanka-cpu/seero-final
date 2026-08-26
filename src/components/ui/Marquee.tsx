import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("mask-fade-x relative overflow-hidden py-3", className)}>
      <div className="flex w-max animate-marquee items-center gap-10 will-change-transform">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-10 font-display text-sm uppercase tracking-[0.22em] text-ink-mute"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
