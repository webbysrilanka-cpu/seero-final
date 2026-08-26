import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import { stats, industries } from "@/lib/content";

export default function StatsBand() {
  return (
    <section className="relative border-y border-line bg-abyss/60">
      <div className="container-x py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="text-center lg:text-left">
                <p className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                  <Counter
                    to={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </p>
                <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-snug text-ink-mute lg:mx-0">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="border-t border-line py-4">
        <p className="container-x mb-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
          Built for
        </p>
        <Marquee items={industries} />
      </div>
    </section>
  );
}
