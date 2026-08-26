import Hero from "@/components/sections/Hero";
import StatsBand from "@/components/sections/StatsBand";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyUs from "@/components/sections/WhyUs";
import Process from "@/components/sections/Process";
import WorkGrid from "@/components/sections/WorkGrid";
import BlogPreview from "@/components/sections/BlogPreview";
import PricingCards from "@/components/sections/PricingCards";
import CTABand from "@/components/sections/CTABand";
import SectionHeading from "@/components/ui/SectionHeading";
import { getPosts, getProjects, getServices } from "@/lib/queries";

export const revalidate = 300;

export default async function HomePage() {
  const [services, projects, posts] = await Promise.all([
    getServices(),
    getProjects(4),
    getPosts(3),
  ]);

  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesGrid services={services} compact />
      <WhyUs />
      <Process />
      <WorkGrid projects={projects} compact />

      <section className="relative border-t border-line py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="Pricing"
            title="Clear prices,"
            highlight="agreed before we start"
            description="No hourly billing, no scope creep, no invoice that arrives bigger than the quote. Pick a package, or tell us what you need and we will price it exactly."
          />
          <div className="mt-16">
            <PricingCards showAll={false} />
          </div>
        </div>
      </section>

      <BlogPreview posts={posts} />
      <CTABand />
    </>
  );
}
