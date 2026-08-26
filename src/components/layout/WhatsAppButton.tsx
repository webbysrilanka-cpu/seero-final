"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.004 3C8.83 3 3 8.83 3 16.004c0 2.293.6 4.53 1.74 6.5L3 29l6.66-1.71a12.94 12.94 0 0 0 6.344 1.63h.005C23.18 28.92 29 23.09 29 15.916 29 12.44 27.64 9.17 25.18 6.71A12.87 12.87 0 0 0 16.004 3Zm0 23.72h-.004a10.76 10.76 0 0 1-5.48-1.5l-.393-.234-4.05 1.04 1.08-3.95-.256-.405a10.72 10.72 0 0 1-1.643-5.71c0-5.94 4.83-10.77 10.78-10.77 2.88 0 5.58 1.123 7.61 3.16a10.7 10.7 0 0 1 3.15 7.62c0 5.94-4.83 10.75-10.79 10.75Zm5.91-8.06c-.324-.163-1.916-.945-2.213-1.053-.297-.108-.513-.162-.73.163-.215.324-.836 1.052-1.025 1.268-.19.216-.377.243-.7.081-.325-.163-1.37-.505-2.607-1.61-.964-.86-1.615-1.92-1.804-2.245-.19-.324-.02-.5.142-.66.146-.146.325-.38.487-.57.163-.19.216-.325.325-.541.108-.216.054-.406-.027-.568-.081-.163-.73-1.76-1-2.41-.264-.633-.531-.547-.73-.557l-.622-.011c-.216 0-.567.081-.864.406-.297.325-1.134 1.108-1.134 2.7 0 1.594 1.161 3.134 1.323 3.35.163.216 2.286 3.49 5.537 4.894.774.334 1.378.534 1.849.683.777.247 1.484.212 2.043.129.623-.093 1.916-.783 2.187-1.539.27-.756.27-1.404.19-1.539-.082-.135-.298-.216-.622-.379Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1400);
    const t2 = setTimeout(() => setTeaser(true), 5000);
    const t3 = setTimeout(() => setTeaser(false), 13000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[65] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {teaser && !dismissed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glass relative max-w-[15rem] rounded-2xl rounded-br-sm px-4 py-3 pr-8 text-sm text-ink shadow-xl"
          >
            <button
              onClick={() => {
                setTeaser(false);
                setDismissed(true);
              }}
              aria-label="Dismiss"
              className="absolute right-2 top-2 text-ink-mute transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="font-medium">Questions about your website?</p>
            <p className="mt-0.5 text-xs text-ink-soft">
              Message us on WhatsApp — we usually reply within the hour.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${site.name} on WhatsApp`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.75)]"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25 [animation-duration:2.6s]" />
            <WhatsAppIcon className="relative h-7 w-7" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
