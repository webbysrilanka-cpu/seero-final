"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a cursor-tracking spotlight and a subtle 3D tilt.
 * Tilt is skipped for coarse pointers and reduced-motion users.
 */
export default function TiltCard({
  children,
  className,
  tilt = 7,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);

    if (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const rx = ((py / rect.height) - 0.5) * -tilt;
      const ry = ((px / rect.width) - 0.5) * tilt;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "spotlight neon-border rounded-2xl border border-line bg-surface/45 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 will-change-transform hover:border-cyan-glow/30",
        className
      )}
    >
      {children}
    </div>
  );
}
