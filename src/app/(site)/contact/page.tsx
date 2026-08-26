import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/sections/FAQ";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { site, whatsappLink } from "@/lib/site";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Seero",
  description:
    "Talk to Seero about your website. WhatsApp, call or send an enquiry — we reply to every message, usually within the hour.",
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phone,
    href: whatsappLink,
    note: "Fastest — usually answered within the hour",
    external: true,
  },
  {
    icon: Phone,
    label: "Call us",
    value: site.phone,
    href: site.phoneHref,
    note: site.hours,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Best for detailed briefs and documents",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what your"
        highlight="business needs"
        description="Fill in the form and we will come back with honest advice and a fixed price — or just message us on WhatsApp if that is easier."
        breadcrumb={[{ href: "/contact", label: "Contact" }]}
      />

      <section className="relative py-20 sm:py-24">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <Reveal>
              <Suspense
                fallback={
                  <div className="h-[540px] animate-pulse rounded-2xl border border-line bg-surface/30" />
                }
              >
                <ContactForm />
              </Suspense>
            </Reveal>

            <Reveal direction="left" delay={0.12}>
              <div className="space-y-4">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group flex items-start gap-4 rounded-2xl border border-line bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-glow/35 hover:bg-surface/70"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan-glow/25 bg-cyan-glow/8 text-cyan-glow transition-shadow group-hover:shadow-[0_0_20px_-6px_rgba(34,224,255,0.8)]">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                        {c.label}
                      </p>
                      <p className="mt-1 break-all font-medium text-ink transition-colors group-hover:text-cyan-glow">
                        {c.value}
                      </p>
                      <p className="mt-1 text-xs text-ink-mute">{c.note}</p>
                    </div>
                  </a>
                ))}

                <div className="rounded-2xl border border-line bg-surface/40 p-5">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-void/60 text-cyan-glow">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                        Based in
                      </p>
                      <p className="mt-1 font-medium text-ink">{site.location}</p>
                      <p className="mt-1 text-xs text-ink-mute">
                        {site.serviceArea}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex items-start gap-4 border-t border-line pt-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-void/60 text-cyan-glow">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                        Hours
                      </p>
                      <p className="mt-1 text-sm font-medium text-ink">
                        {site.hours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-glow/20 bg-gradient-to-b from-cyan-glow/8 to-transparent p-5">
                  <p className="font-display text-sm font-semibold text-ink">
                    What happens after you send this
                  </p>
                  <ol className="mt-3 space-y-2 text-xs leading-relaxed text-ink-soft">
                    <li className="flex gap-2.5">
                      <span className="font-mono text-cyan-glow">1.</span>
                      We read it properly and reply — usually within a couple of
                      hours.
                    </li>
                    <li className="flex gap-2.5">
                      <span className="font-mono text-cyan-glow">2.</span>
                      A free 30-minute call to understand your business.
                    </li>
                    <li className="flex gap-2.5">
                      <span className="font-mono text-cyan-glow">3.</span>A
                      written proposal with a fixed price and timeline. No
                      obligation.
                    </li>
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-t border-line py-24 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Before you ask"
            title="The questions"
            highlight="we get most"
          />
          <div className="mt-14">
            <FAQ items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>
    </>
  );
}
