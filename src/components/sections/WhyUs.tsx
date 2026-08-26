import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { differentiators } from "@/lib/content";

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-25" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Why Seero"
          title="The things people wish"
          highlight="their last developer had done"
          description="Most of what follows should be standard. In practice, it is the exact list of complaints we hear from business owners about the site they already paid for."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 0.07}>
              <div className="group relative h-full bg-void p-8 transition-colors duration-300 hover:bg-surface/60">
                <span className="absolute right-6 top-6 font-mono text-xs text-ink-mute/50">
                  0{i + 1}
                </span>
                <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-lg border border-line bg-surface text-cyan-glow transition-all duration-300 group-hover:border-cyan-glow/40 group-hover:shadow-[0_0_20px_-6px_rgba(34,224,255,0.7)]">
                  <Icon name={d.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold text-ink">
                  {d.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {d.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
