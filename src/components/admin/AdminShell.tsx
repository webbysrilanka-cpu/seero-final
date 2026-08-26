"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Briefcase,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { signOut } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Enquiries", icon: Inbox },
  { href: "/admin/blog", label: "Blog posts", icon: FileText },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
];

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const nav = (
    <nav className="space-y-1">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
            isActive(l.href, l.exact)
              ? "border border-cyan-glow/25 bg-cyan-glow/10 text-cyan-glow"
              : "border border-transparent text-ink-soft hover:bg-surface hover:text-ink"
          )}
        >
          <l.icon className="h-4 w-4" />
          {l.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-void">
      {/* mobile bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-void/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/admin">
          <Logo />
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-line bg-abyss p-5 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="hidden lg:block">
            <Link href="/admin">
              <Logo />
            </Link>
          </div>

          <div className="mt-0 lg:mt-9">{nav}</div>

          <div className="mt-8 space-y-1 border-t border-line pt-5">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              <ExternalLink className="h-4 w-4" />
              View website
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-ink-soft transition-colors hover:bg-surface hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>

          <div className="absolute bottom-5 left-5 right-5 truncate rounded-xl border border-line bg-surface/50 px-3.5 py-2.5">
            <p className="text-[10px] uppercase tracking-widest text-ink-mute">
              Signed in
            </p>
            <p className="truncate text-xs text-ink">{email}</p>
          </div>
        </aside>

        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-30 bg-void/70 backdrop-blur-sm lg:hidden"
          />
        )}

        <main className="min-w-0 flex-1 px-5 py-8 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
