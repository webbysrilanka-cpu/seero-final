"use client";

import { useEffect, useRef } from "react";

/**
 * A soft cyan halo that trails the pointer.
 * Hidden by CSS on touch devices and for reduced-motion users, so no state
 * is needed and nothing renders differently between server and client.
 */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${cx - 190}px, ${cy - 190}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[380px] w-[380px] rounded-full opacity-30 mix-blend-screen [@media(pointer:fine)]:block motion-reduce:hidden"
      style={{
        background:
          "radial-gradient(circle, rgba(34,224,255,0.30) 0%, rgba(37,99,235,0.14) 35%, transparent 68%)",
        filter: "blur(24px)",
      }}
    />
  );
}
