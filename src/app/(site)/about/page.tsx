import type { Metadata } from "next";
import { ArrowRight, Quote } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import CTABand from "@/components/sections/CTABand";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Scene3D from "@/components/three/Scene3D";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Seero",
  description:
    "Seero is a Colombo-based web design studio building fast, honest, well-made websites for Sri Lankan businesses.",
};

const values = [
  {
    title: "Say the true thing",
    body: "If a new website is not what you need, we will say so. We would rather lose a project than sell someone a Rs. 150,000 site when a fixed Google listing and faster pages would have done more for them.",
  },
  {
    title: "Price it before we build it",
    body: "Vague quotes are how clients get hurt. Every Seero project starts with a written scope and a fixed number, and the number does not move unless you ask for something new.",
  },
  {
    title: "Build it to last",
    body: "No page builders stacked with plugins that break on the next update. Hand-built on a modern stack, so the site still works properly in three years without a maintenance drip-feed.",
  },
  {
    title: "Hand over the keys",
    body: "The single most common story we hear is a business locked out of its own website because the developer disappeared. Your domain, your hosting, your logins — always.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small studio with"
        highlight="one specific job"
        description="Seero designs and builds websites for Sri Lankan businesses. That is the whole offering — and doing one thing means we can do it properly."
        breadcrumb={[{ href: "/about", label: "About" }]}
      />

      {/* Story */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-glow">
                  Why Seero exists
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                  Most Sri Lankan businesses deserve better than what they were
                  sold.
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                  <p>
                    Walk through any high street in Colombo and you will find
                    excellent businesses with websites that let them down —
                    built years ago from a template, slow on a phone, invisible
                    on Google, and impossible to update because nobody knows the
                    password any more.
                  </p>
                  <p>
                    It is rarely the owner&apos;s fault. They were quoted a
                    number, handed something that looked fine on a laptop, and
                    never told what a website is actually supposed to do for
                    them.
                  </p>
                  <p>
                    Seero was started to fix that specific problem: give small
                    and medium Sri Lankan businesses the kind of website that
                    larger companies pay far more for — genuinely fast, properly
                    structured for search, and fully owned by the person who paid
                    for it.
                  </p>
                  <p className="text-ink">
                    We are a new studio, and we are direct about that. What we
                    offer instead of a long client list is a fixed price, a real
                    person on WhatsApp, and work you can judge for yourself
                    before you commit a rupee.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button href="/portfolio" variant="outline">
                    See our work
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button href="/contact">
                    Talk to us
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal direction="left" delay={0.15}>
              <div className="relative aspect-square w-full">
                <Scene3D className="absolute inset-0" />
                <div className="pointer-events-none absolute inset-0 rounded-3xl border border-line" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative border-t border-line py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we work"
            title="Four rules we do not"
            highlight="bend for a project"
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 2) * 0.08}>
                <div className="h-full bg-void p-8 transition-colors hover:bg-surface/60">
                  <span className="font-mono text-xs text-cyan-glow/70">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="relative border-t border-line py-24">
        <div className="container-x">
          <Reveal>
            <figure className="mx-auto max-w-3xl text-center">
              <Quote className="mx-auto h-8 w-8 text-cyan-glow/50" />
              <blockquote className="mt-6 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
                &ldquo;If we build you a website and it does not bring you a
                single new customer, we have failed — no matter how good it
                looks.&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm text-ink-mute">
                — The standard we hold every Seero project to
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
              {[
                { k: "Based in", v: site.location },
                { k: "Working", v: "Island-wide & remote" },
                { k: "Reply time", v: "Usually within the hour" },
              ].map((d) => (
                <div
                  key={d.k}
                  className="rounded-xl border border-line bg-surface/40 p-5 text-center"
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                    {d.k}
                  </p>
                  <p className="mt-2 text-sm font-medium text-ink">{d.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
