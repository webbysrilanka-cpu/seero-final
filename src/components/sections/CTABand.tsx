import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site, whatsappLink } from "@/lib/site";

export default function CTABand({
  title = "Let's talk about your website.",
  description = "A free 30-minute conversation, no obligation. Tell us about your business and we will tell you honestly what you need — even if that turns out to be less than you expected.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-line py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/12 blur-[130px]"
      />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="container-x relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.75rem]">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            {description}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Get a free quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href={whatsappLink} external variant="outline" size="lg">
              <MessageCircle className="h-4 w-4" />
              WhatsApp us
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <a
            href={site.phoneHref}
            className="mt-7 inline-flex items-center gap-2 text-sm text-ink-mute transition-colors hover:text-cyan-glow"
          >
            <Phone className="h-4 w-4" />
            Or call {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
