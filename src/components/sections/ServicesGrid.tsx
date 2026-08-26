import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/lib/types";

export default function ServicesGrid({
  services,
  compact = false,
}: {
  services: Service[];
  compact?: boolean;
}) {
  if (!services.length) return null;

  return (
    <section className="relative py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-blue-deep/10 blur-[120px]"
      />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="What we do"
          title="Everything that goes into"
          highlight="a website that works"
          description="We do one thing — design and build websites — and we do the whole of it, from the first sketch to the day Google starts sending you traffic."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.08}>
              <TiltCard className="h-full" tilt={5}>
                <div id={s.slug} className="scroll-mt-28 p-7">
                  <div className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl border border-cyan-glow/25 bg-cyan-glow/8 text-cyan-glow">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    {s.short_description}
                  </p>
                  {!compact && (
                    <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-ink-mute">
                      {s.description}
                    </p>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {compact && (
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/8 px-6 py-3 text-sm font-semibold text-cyan-glow transition-colors hover:bg-cyan-glow/16"
              >
                See what each one includes
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
