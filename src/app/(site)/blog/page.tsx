import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import CTABand from "@/components/sections/CTABand";
import Reveal from "@/components/ui/Reveal";
import { getPosts } from "@/lib/queries";
import { formatDate, readingTime } from "@/lib/utils";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Plain-English guides on websites, pricing, Google and getting found online — written for Sri Lankan business owners.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Straight answers,"
        highlight="no sales pitch"
        description="What a website should cost, why yours is slow, and how local businesses actually get found on Google. Written for owners, not developers."
        breadcrumb={[{ href: "/blog", label: "Insights" }]}
      />

      <section className="relative py-20 sm:py-24">
        <div className="container-x">
          {posts.length === 0 && (
            <p className="py-20 text-center text-ink-mute">
              No articles published yet — check back soon.
            </p>
          )}

          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-line bg-surface/40 p-8 transition-all duration-300 hover:border-cyan-glow/30 sm:p-12"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-glow/10 blur-[90px] transition-opacity duration-500 group-hover:opacity-160"
                />
                <div className="relative max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-glow/25 bg-cyan-glow/8 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-glow">
                    Latest
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-cyan-glow sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                    {featured.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-mute">
                    <span>
                      {featured.published_at
                        ? formatDate(featured.published_at)
                        : ""}
                    </span>
                    <span className="text-cyan-glow/60">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {readingTime(featured.content)} min read
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-cyan-glow">
                      Read article
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/30 hover:bg-surface/70"
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line bg-void/60 px-2 py-0.5 text-[10px] text-ink-mute"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-cyan-glow">
                      {post.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink-mute">
                      <span>
                        {post.published_at ? formatDate(post.published_at) : ""}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {readingTime(post.content)} min
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand
        title="Rather just ask us directly?"
        description="Every article here started as a question a business owner asked us. If yours is not covered, send it over — we answer questions whether or not you ever become a client."
      />
    </>
  );
}
