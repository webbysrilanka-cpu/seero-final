import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void px-6 text-center">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/12 blur-[120px]"
      />

      <div className="relative">
        <Link href="/" className="inline-block">
          <Logo />
        </Link>

        <p className="mt-12 font-display text-[6rem] font-bold leading-none text-gradient sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
          This page has moved on.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
          The link you followed does not lead anywhere any more. Let&apos;s get
          you back to something useful.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-core to-blue-deep px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(34,224,255,0.8)] transition-transform hover:scale-[1.03]"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
          >
            <ArrowLeft className="h-4 w-4" />
            Talk to us instead
          </Link>
        </div>
      </div>
    </div>
  );
}
