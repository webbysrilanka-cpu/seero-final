import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-glow focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-core to-blue-deep text-white shadow-[0_0_30px_-8px_rgba(34,224,255,0.8)] hover:shadow-[0_0_44px_-6px_rgba(34,224,255,0.95)] hover:scale-[1.03]",
  outline:
    "border border-cyan-glow/35 bg-cyan-glow/5 text-cyan-glow hover:bg-cyan-glow/15 hover:border-cyan-glow/60",
  ghost:
    "border border-line bg-surface/50 text-ink hover:border-cyan-glow/40 hover:text-cyan-glow",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

interface Props {
  children: ReactNode;
  href?: string;
  external?: boolean;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full rounded-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
