import type { Metadata } from "next";
import { ArrowRight, MessageCircle } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Process from "@/components/sections/Process";
import CTABand from "@/components/sections/CTABand";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getServices } from "@/lib/queries";
import { whatsappLink } from "@/lib/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Web Design & Development Services",
  description:
    "Custom website design, development, mobile-first builds, speed optimisation, SEO foundations and website rescue for Sri Lankan businesses.",
};

const included = [
  {
    title: "A site that works on the phone in your customer's hand",
    body: "Designed on a mobile screen first, tested on real devices and on mobile data — not just on a fast office connection.",
  },
  {
    title: "Every page written to be found",
    body: "Page titles, descriptions, headings and structured data set up properly, plus your sitemap submitted to Google before launch.",
  },
  {
    title: "Speed treated as a feature",
    body: "Compressed images, minimal JavaScript, and hosting on a global edge network so the site is fast in Jaffna and in Sydney.",
  },
  {
    title: "Security and SSL by default",
    body: "HTTPS, security headers and a hosting setup that does not need constant patching to stay safe.",
    },
  {
    title: "Forms that actually reach you",
    body: "Enquiries land in a dashboard you can log into and, where you want it, straight into your inbox and WhatsApp.",
  },
  {
    title: "The keys, handed over",
    body: "Domain in your name, hosting in your account, admin logins in your hands, and a walkthrough of how to use them.",
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="We design and build"
        highlight="business websites"
        description="One focus, done thoroughly. Whether you need your first website or a rescue of the one you already have, this is what the work involves."
        breadcrumb={[{ href: "/services", label: "Services" }]}
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/contact" size="lg">
            Get a free quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button href={whatsappLink} external variant="ghost" size="lg">
            <MessageCircle className="h-4 w-4" />
            Ask a question
          </Button>
        </div>
      </PageHero>

      <ServicesGrid services={services} />

      <section className="relative border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Always included"
            title="Six things in every build,"
            highlight="whatever you pay"
            description="These are not upsells. They are the minimum standard for a website we are willing to put our name on."
          />

          <div className="mx-auto mt-14 max-w-4xl divide-y divide-line border-y border-line">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="group grid gap-2 py-7 md:grid-cols-[auto_1fr_1.2fr] md:items-start md:gap-8">
                  <span className="font-mono text-xs text-cyan-glow/70">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink transition-colors group-hover:text-cyan-glow">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Process />
      <CTABand
        title="Not sure which of these you need?"
        description="Tell us what your business does and what is not working right now. We will point you at the smallest thing that would make the biggest difference — even if it is not a new website."
      />
    </>
  );
}
