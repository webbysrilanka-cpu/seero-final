import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/ui/Logo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-void px-5 py-16">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-glow/12 blur-[120px]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
          <h1 className="mt-7 font-display text-2xl font-bold text-ink">
            Seero admin
          </h1>
          <p className="mt-2 text-sm text-ink-mute">
            Sign in to manage enquiries, posts and your portfolio.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="h-64 animate-pulse rounded-2xl border border-line bg-surface/40" />
          }
        >
          <LoginForm />
        </Suspense>

        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-mute transition-colors hover:text-cyan-glow"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to the website
        </Link>
      </div>
    </div>
  );
}
