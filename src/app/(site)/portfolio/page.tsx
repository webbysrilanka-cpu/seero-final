import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import WorkGrid from "@/components/sections/WorkGrid";
import CTABand from "@/components/sections/CTABand";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/queries";
import { industries } from "@/lib/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Concept website builds for Sri Lankan restaurants, clinics, tour operators, workshops and studios — the business types Seero designs for.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Concept builds, shown"
        highlight="honestly"
        description="Seero is a young studio. Rather than pad a portfolio with other people's screenshots, we designed complete concepts for the business types we build for — so you can judge the work, not the logos."
        breadcrumb={[{ href: "/portfolio", label: "Work" }]}
      >
        <Button href="/contact" size="lg">
          Be our next real project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </PageHero>

      <WorkGrid projects={projects} />

      <section className="relative border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Who we build for"
            title="Business types we are"
            highlight="set up to serve"
            description="If your business is not on this list, it does not mean we cannot help — it usually just means we have not written the page for it yet."
          />

          <div className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {industries.map((ind, i) => (
              <Reveal key={ind} delay={(i % 6) * 0.04}>
                <span className="inline-block rounded-full border border-line bg-surface/50 px-4 py-2 text-sm text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-glow/40 hover:text-cyan-glow">
                  {ind}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Your business, built properly."
        description="Every concept above started with a conversation about what that business needed to sell. Yours would start the same way."
      />
    </>
  );
}
