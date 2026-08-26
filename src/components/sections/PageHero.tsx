import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumb,
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  breadcrumb?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[76px]">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 mask-fade-b" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-glow/12 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-blue-deep/20 blur-[110px]"
      />

      <div className="container-x relative py-20 text-center sm:py-24">
        {breadcrumb && (
          <Reveal>
            <nav className="mb-6 flex items-center justify-center gap-1.5 text-xs text-ink-mute">
              <Link href="/" className="transition-colors hover:text-cyan-glow">
                Home
              </Link>
              {breadcrumb.map((b) => (
                <span key={b.href} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" />
                  <Link
                    href={b.href}
                    className="transition-colors hover:text-cyan-glow"
                  >
                    {b.label}
                  </Link>
                </span>
              ))}
            </nav>
          </Reveal>
        )}

        {eyebrow && (
          <Reveal delay={0.05}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/25 bg-cyan-glow/8 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-[0_0_8px_#22e0ff]" />
              {eyebrow}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.12}>
          <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
            {title}{" "}
            {highlight && (
              <span className="text-gradient-cyan">{highlight}</span>
            )}
          </h1>
        </Reveal>

        {description && (
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-[1.05rem]">
              {description}
            </p>
          </Reveal>
        )}

        {children && (
          <Reveal delay={0.28}>
            <div className="mt-9">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
