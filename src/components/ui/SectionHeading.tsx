import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-cyan-glow/25 bg-cyan-glow/8 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-glow"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-[0_0_8px_#22e0ff]" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl md:text-[2.9rem]">
          {title}{" "}
          {highlight && <span className="text-gradient-cyan">{highlight}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed text-ink-soft sm:text-[1.05rem]",
              align === "center" && "mx-auto max-w-2xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
