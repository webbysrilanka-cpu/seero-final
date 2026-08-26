"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 55%"],
  });
  const height = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 90,
    damping: 26,
  });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="How it works"
          title="Six steps, and you know"
          highlight="where you stand at each one"
          description="No mystery, no radio silence for three weeks. Here is exactly what happens from the first message to the day your site goes live."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* rail */}
          <div className="absolute left-[19px] top-2 h-full w-px bg-line md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height }}
            className="absolute left-[19px] top-2 w-px bg-gradient-to-b from-cyan-glow to-blue-deep shadow-[0_0_12px_rgba(34,224,255,0.7)] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-10">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 md:grid md:grid-cols-2 md:gap-10 md:pl-0"
              >
                <span
                  className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border border-cyan-glow/40 bg-void font-mono text-xs font-semibold text-cyan-glow shadow-[0_0_18px_-4px_rgba(34,224,255,0.8)] md:left-1/2 md:-translate-x-1/2`}
                >
                  {step.n}
                </span>

                <div
                  className={
                    i % 2 === 0
                      ? "md:col-start-1 md:pr-12 md:text-right"
                      : "md:col-start-2 md:pl-12"
                  }
                >
                  <div
                    className={`flex items-baseline gap-3 ${
                      i % 2 === 0 ? "md:flex-row-reverse md:justify-end" : ""
                    }`}
                  >
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {step.title}
                    </h3>
                    <span className="rounded-full border border-line bg-surface/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
