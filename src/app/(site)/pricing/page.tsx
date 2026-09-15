import type { Metadata } from "next";
import { ArrowRight, ShieldCheck, Wallet, RefreshCw } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import PricingCards from "@/components/sections/PricingCards";
import FAQ from "@/components/sections/FAQ";
import CTABand from "@/components/sections/CTABand";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { addOns, faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Transparent website pricing in Sri Lankan rupees. Starter from Rs. 35,000, Business Rs. 75,000, Premium Rs. 150,000 — fixed price, agreed before we start.",
};

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Fixed price, in writing",
    body: "The number you approve is the number you pay. If the scope changes, we quote the change before doing it.",
  },
  {
    icon: Wallet,
    title: "50% to start, 50% at launch",
    body: "You never pay the balance until the site is live and you are happy with it. Premium can be split across three payments.",
  },
  {
    icon: RefreshCw,
    title: "Revisions built in",
    body: "Two to three rounds of changes are included in every package — not billed as extras the moment you ask for something.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c").replace(/>/g, "\u003e").replace(/&/g, "\u0026") }}
      />

      <PageHero
        eyebrow="Pricing"
        title="Real prices, in rupees,"
        highlight="before you call"
        description="We publish our prices because being asked to 'enquire for a quote' wastes everyone's time. Here is what a website from Seero costs."
        breadcrumb={[{ href: "/pricing", label: "Pricing" }]}
      />

      <section className="relative py-20 sm:py-24">
        <div className="container-x">
          <PricingCards />

          <Reveal delay={0.2}>
            <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-ink-mute">
              Prices exclude your domain name (roughly Rs. 5,000–12,000 a year
              for a .lk address, registered in your name). Most Seero sites run
              on a free hosting tier — if your traffic ever outgrows it, we will
              tell you before it becomes a bill.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-line py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we bill"
            title="No surprises,"
            highlight="by design"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {guarantees.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-line bg-surface/40 p-7">
                  <div className="mb-5 inline-grid h-11 w-11 place-items-center rounded-xl border border-cyan-glow/25 bg-cyan-glow/8 text-cyan-glow">
                    <g.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {g.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    {g.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-t border-line py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Add-ons"
            title="Extras, priced"
            highlight="the same way"
            description="Add any of these to any package. Each one is quoted before it is built."
          />

          <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
            {addOns.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.04}>
                <div className="flex items-center justify-between gap-6 py-4">
                  <span className="text-sm text-ink">{a.name}</span>
                  <span className="whitespace-nowrap font-mono text-sm text-cyan-glow">
                    {a.price}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-12 text-center">
              <Button href="/contact" size="lg">
                Get an exact quote for your project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-line py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Questions"
            title="Answers to what"
            highlight="people ask first"
          />
          <div className="mt-14">
            <FAQ />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
