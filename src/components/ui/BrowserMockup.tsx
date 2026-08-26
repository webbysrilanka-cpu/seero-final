import { cn } from "@/lib/utils";

const accentMap: Record<string, { from: string; to: string; ring: string }> = {
  cyan: { from: "#22e0ff", to: "#2563eb", ring: "rgba(34,224,255,0.35)" },
  blue: { from: "#4f8bff", to: "#1e3a8a", ring: "rgba(79,139,255,0.35)" },
  violet: { from: "#a78bfa", to: "#4c1d95", ring: "rgba(167,139,250,0.35)" },
};

/**
 * A generated, abstract site preview. We deliberately do not fake client
 * screenshots — this is a stylised wireframe of the layout described.
 */
export default function BrowserMockup({
  title,
  category,
  accent = "cyan",
  className,
  variant = 0,
}: {
  title: string;
  category: string;
  accent?: string;
  className?: string;
  variant?: number;
}) {
  const a = accentMap[accent] ?? accentMap.cyan;
  const v = variant % 3;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-line bg-abyss",
        className
      )}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-surface/70 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-md bg-void/70 px-2.5 py-1 font-mono text-[9px] text-ink-mute">
          {title.toLowerCase().replace(/[^a-z0-9]+/g, "")}.lk
        </span>
      </div>

      {/* abstract page */}
      <div
        className="relative aspect-[16/10] w-full p-4"
        style={{
          background: `radial-gradient(120% 80% at 50% 0%, ${a.ring} 0%, transparent 60%), #070b16`,
        }}
      >
        {/* nav row */}
        <div className="flex items-center justify-between">
          <div
            className="h-2.5 w-14 rounded-full"
            style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})` }}
          />
          <div className="flex gap-1.5">
            {[10, 12, 9, 11].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-white/15"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>

        {v === 0 && (
          <>
            <div className="mt-5 h-3 w-3/5 rounded-full bg-white/70" />
            <div className="mt-2 h-3 w-2/5 rounded-full bg-white/35" />
            <div className="mt-3 h-1.5 w-4/5 rounded-full bg-white/12" />
            <div className="mt-1.5 h-1.5 w-3/5 rounded-full bg-white/12" />
            <div
              className="mt-4 h-5 w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, ${a.from}, ${a.to})` }}
            />
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-10 rounded-md border border-white/10 bg-white/5"
                />
              ))}
            </div>
          </>
        )}

        {v === 1 && (
          <>
            <div className="mt-4 grid grid-cols-5 gap-2">
              <div className="col-span-3 space-y-2">
                <div className="h-3 w-full rounded-full bg-white/70" />
                <div className="h-3 w-2/3 rounded-full bg-white/35" />
                <div className="h-1.5 w-full rounded-full bg-white/12" />
                <div className="h-1.5 w-4/5 rounded-full bg-white/12" />
                <div
                  className="mt-2 h-5 w-16 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${a.from}, ${a.to})`,
                  }}
                />
              </div>
              <div
                className="col-span-2 rounded-lg border border-white/10"
                style={{
                  background: `linear-gradient(160deg, ${a.from}33, ${a.to}55)`,
                }}
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-9 rounded-md border border-white/10 bg-white/5"
                />
              ))}
            </div>
          </>
        )}

        {v === 2 && (
          <>
            <div
              className="mt-4 h-16 rounded-lg border border-white/10"
              style={{
                background: `linear-gradient(120deg, ${a.from}30, ${a.to}55)`,
              }}
            />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="space-y-1.5 rounded-md border border-white/10 bg-white/5 p-2"
                >
                  <div className="h-1.5 w-2/3 rounded-full bg-white/40" />
                  <div className="h-1.5 w-full rounded-full bg-white/12" />
                </div>
              ))}
            </div>
          </>
        )}

        <span className="absolute bottom-2 right-3 font-mono text-[8px] uppercase tracking-widest text-ink-mute">
          {category}
        </span>
      </div>
    </div>
  );
}
