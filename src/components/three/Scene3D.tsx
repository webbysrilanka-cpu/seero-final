"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Loads the WebGL scene only when it scrolls into view, and only on devices
 * that can handle it. Everything degrades to a CSS glow otherwise.
 */
export default function Scene3D({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower =
      typeof navigator !== "undefined" &&
      // deviceMemory is Chromium-only; undefined elsewhere, which we treat as fine
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) < 3;

    let supported = true;
    try {
      const canvas = document.createElement("canvas");
      supported = !!(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      supported = false;
    }

    if (reduced || lowPower || !supported) return;

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "180px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("h-full w-full max-w-full", className)}>
      {show ? (
        <HeroScene />
      ) : (
        <div className="h-full w-full">
          <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/25 blur-[80px] animate-pulse-glow" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-glow/30 animate-spin-slow" />
        </div>
      )}
    </div>
  );
}
