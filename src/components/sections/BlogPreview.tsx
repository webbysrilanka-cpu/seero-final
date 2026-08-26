import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate, readingTime } from "@/lib/utils";
import type { Post } from "@/lib/types";

export default function BlogPreview({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;

  return (
    <section className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Insights"
          title="Straight answers about"
          highlight="websites in Sri Lanka"
          description="Practical, no-sales-pitch writing for business owners trying to work out what they actually need — and what it should cost."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/30 hover:bg-surface/70"
              >
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                  <span>{post.published_at ? formatDate(post.published_at) : ""}</span>
                  <span className="text-cyan-glow/60">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {readingTime(post.content)} min
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-cyan-glow">
                  {post.title}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-glow">
                  Read
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
