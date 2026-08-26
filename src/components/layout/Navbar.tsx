"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-line/70 bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="container-x flex h-[76px] items-center justify-between">
          <Link href="/" aria-label="Seero home" className="group relative">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "group relative block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink"
                  )}
                >
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full border border-cyan-glow/25 bg-cyan-glow/10"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-cyan-glow"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-core to-blue-deep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(34,224,255,0.7)] transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10">Get a quote</span>
              <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-0" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface/60 text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="grid-bg absolute inset-0 opacity-40" />
            <div className="relative flex h-full flex-col justify-center px-8">
              <ul className="space-y-1">
                {[...navLinks, { href: "/contact", label: "Contact" }].map(
                  (link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.055, duration: 0.4 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-baseline gap-4 py-3 font-display text-3xl font-semibold transition-colors",
                          isActive(link.href) ? "text-cyan-glow" : "text-ink"
                        )}
                      >
                        <span className="font-mono text-xs text-ink-mute">
                          0{i + 1}
                        </span>
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-12 space-y-3 border-t border-line pt-8"
              >
                <a
                  href={site.phoneHref}
                  className="block text-lg font-medium text-cyan-glow"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="block text-sm text-ink-soft"
                >
                  {site.email}
                </a>
                <p className="text-sm text-ink-mute">{site.location}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
