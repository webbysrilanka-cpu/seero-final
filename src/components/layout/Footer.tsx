import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight, Clock } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks, site } from "@/lib/site";

const serviceLinks = [
  { href: "/services#custom-website-design", label: "Custom Website Design" },
  { href: "/services#website-development", label: "Website Development" },
  { href: "/services#mobile-first", label: "Mobile-First Builds" },
  { href: "/services#speed-performance", label: "Speed & Performance" },
  { href: "/services#seo-foundations", label: "SEO Foundations" },
  { href: "/services#redesign-rescue", label: "Redesign & Rescue" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-abyss">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[110px]"
      />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30 mask-fade-b" />

      <div className="container-x relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              We build fast, modern websites for Sri Lankan businesses — made to
              be found on Google and to turn visitors into customers.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Colombo", "Island-wide", "Remote"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-ink-mute"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-mute">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[...navLinks, { href: "/contact", label: "Contact" }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-soft transition-colors hover:text-cyan-glow"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-mute">
              What we do
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-ink-soft transition-colors hover:text-cyan-glow"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-mute">
              Talk to us
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-3 text-ink transition-colors hover:text-cyan-glow"
                >
                  <Phone className="h-4 w-4 shrink-0 text-cyan-glow" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 break-all text-ink transition-colors hover:text-cyan-glow"
                >
                  <Mail className="h-4 w-4 shrink-0 text-cyan-glow" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink-soft">
                <MapPin className="h-4 w-4 shrink-0 text-cyan-glow" />
                {site.location}
              </li>
              <li className="flex items-center gap-3 text-ink-soft">
                <Clock className="h-4 w-4 shrink-0 text-cyan-glow" />
                {site.hours}
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-4 py-2 text-sm font-medium text-cyan-glow transition-colors hover:bg-cyan-glow/20"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="text-xs text-ink-mute">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-ink-mute">
            Designed &amp; built in Sri Lanka.
          </p>
        </div>
      </div>
    </footer>
  );
}
