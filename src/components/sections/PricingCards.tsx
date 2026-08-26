import Link from "next/link";
import { Check, X, ArrowRight, Clock, FileText } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { packages } from "@/lib/content";
import { formatLKR } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function PricingCards({
  showAll = true,
}: {
  showAll?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {packages.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.1}>
          <div
            className={cn(
              "relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300",
              p.featured
                ? "border-cyan-glow/45 bg-gradient-to-b from-cyan-glow/8 to-surface/50 shadow-[0_0_60px_-24px_rgba(34,224,255,0.8)] lg:-mt-4 lg:mb-[-1rem]"
                : "border-line bg-surface/40 hover:border-cyan-glow/25"
            )}
          >
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-core to-blue-deep px-3.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white shadow-[0_0_20px_-4px_rgba(34,224,255,0.9)]">
                Most popular
              </span>
            )}

            <h3 className="font-display text-xl font-bold text-ink">{p.name}</h3>
            <p className="mt-1 text-sm text-cyan-glow">{p.tagline}</p>

            <div className="mt-5 flex items-end gap-1">
              <span className="font-display text-4xl font-bold tracking-tight text-ink">
                {formatLKR(p.price)}
              </span>
            </div>
            <p className="mt-1 text-xs text-ink-mute">
              One-time. No monthly fee, no surprises.
            </p>

            <div className="mt-5 flex flex-wrap gap-2 border-y border-line py-3.5 text-xs text-ink-mute">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-cyan-glow" />
                {p.timeline}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-cyan-glow" />
                {p.pages}
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              <span className="text-ink-mute">Best for: </span>
              {p.bestFor}
            </p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {(showAll ? p.features : p.features.slice(0, 6)).map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" />
                  <span>{f}</span>
                </li>
              ))}
              {showAll &&
                p.notIncluded?.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-ink-mute/70">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-ink-mute/50" />
                    <span className="line-through decoration-ink-mute/40">
                      {f}
                    </span>
                  </li>
                ))}
            </ul>

            <div className="mt-7">
              <Button
                href={`/contact?package=${p.slug}`}
                variant={p.featured ? "primary" : "ghost"}
                className="w-full"
              >
                Choose {p.name}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Reveal>
      ))}

      {!showAll && (
        <div className="lg:col-span-3">
          <Reveal delay={0.3}>
            <div className="mt-4 text-center">
              <Link
                href="/pricing"
                className="text-sm font-medium text-cyan-glow underline-offset-4 hover:underline"
              >
                See everything included in each package →
              </Link>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
