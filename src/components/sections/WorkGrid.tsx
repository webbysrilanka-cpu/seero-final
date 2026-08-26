import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import BrowserMockup from "@/components/ui/BrowserMockup";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

export default function WorkGrid({
  projects,
  compact = false,
}: {
  projects: Project[];
  compact?: boolean;
}) {
  if (!projects.length) return null;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected work"
          title="Concept builds for"
          highlight="real Sri Lankan business types"
          description="Seero is new, and we would rather show you honest concept work than borrow someone else's screenshots. Each of these is a real, functioning design for a business type we build for — your project would be the first with your name on it."
        />

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 flex max-w-2xl items-start gap-2.5 rounded-xl border border-line bg-surface/50 px-4 py-3 text-center text-xs leading-relaxed text-ink-mute sm:text-left">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow" />
            <span>
              Every project below is labelled as a concept. We do not present
              speculative work as client work — and we would not do it with your
              business either.
            </span>
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 0.08}>
              <TiltCard className="group h-full overflow-hidden" tilt={4}>
                <div className="p-5">
                  <BrowserMockup
                    title={p.title}
                    category={p.category}
                    accent={p.accent}
                    variant={i}
                    className="transition-transform duration-500 group-hover:scale-[1.015]"
                  />

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-semibold text-ink">
                          {p.title}
                        </h3>
                        {p.is_concept && (
                          <span className="rounded-full border border-cyan-glow/25 bg-cyan-glow/8 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-cyan-glow">
                            Concept
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-mute">
                        {p.category} · {p.year}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {p.summary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-line bg-void/60 px-2 py-1 text-[11px] text-ink-mute"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {compact && (
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/8 px-6 py-3 text-sm font-semibold text-cyan-glow transition-colors hover:bg-cyan-glow/16"
              >
                View all work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
