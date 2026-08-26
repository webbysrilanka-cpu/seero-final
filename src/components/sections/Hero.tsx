"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";
import Scene3D from "@/components/three/Scene3D";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

const words = ["local customers", "more enquiries", "trust", "bookings"];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-[76px]">
      {/* backdrop */}
      <div className="grid-bg absolute inset-0 opacity-45 mask-fade-b" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-blue-deep/20 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-glow/10 blur-[140px]"
      />

      {/* 3D scene */}
      <Scene3D className="absolute inset-0 z-0 opacity-90 lg:left-auto lg:w-[58%]" />

      <div className="container-x relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/25 bg-cyan-glow/8 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-glow" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cyan-glow">
              Web design studio · Sri Lanka
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1 }}
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-[4.1rem]"
          >
            Websites that win
            <br />
            <span className="relative inline-block">
              <RotatingWord />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft"
          >
            Seero designs and builds fast, modern websites for Sri Lankan
            businesses — the kind that load in under two seconds on mobile data,
            show up when people search nearby, and turn visitors into customers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="/contact" size="lg">
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href={whatsappLink} external variant="ghost" size="lg">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-line pt-6"
          >
            {[
              { k: "Fixed", v: "pricing, agreed upfront" },
              { k: "7 days", v: "to a live starter site" },
              { k: "100%", v: "ownership handed to you" },
            ].map((item) => (
              <div key={item.k}>
                <dt className="font-display text-xl font-bold text-cyan-glow">
                  {item.k}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-ink-mute">
                  {item.v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="hidden lg:block" aria-hidden />
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-ink-mute/40 p-1">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-cyan-glow"
          />
        </div>
      </motion.div>
    </section>
  );
}

function RotatingWord() {
  const cycle = 3.2;
  return (
    <span className="relative inline-block align-top">
      {/* reserves the line box for the longest word */}
      <span className="invisible" aria-hidden>
        local customers.
      </span>
      {words.map((w, i) => (
        <motion.span
          key={w}
          className="absolute inset-0 whitespace-nowrap text-gradient-cyan"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: [0, 1, 1, 0], y: [16, 0, 0, -16] }}
          transition={{
            duration: cycle,
            times: [0, 0.16, 0.84, 1],
            repeat: Infinity,
            repeatDelay: cycle * (words.length - 1),
            delay: i * cycle,
            ease: "easeInOut",
          }}
        >
          {w}
          <span className="text-ink">.</span>
        </motion.span>
      ))}
    </span>
  );
}
