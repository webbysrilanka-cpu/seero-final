import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import CTABand from "@/components/sections/CTABand";
import Reveal from "@/components/ui/Reveal";
import { getPostBySlug, getPosts } from "@/lib/queries";
import { formatDate, readingTime } from "@/lib/utils";
import { site } from "@/lib/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at ?? undefined,
      url: `${site.url}/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c").replace(/>/g, "\u003e").replace(/&/g, "\u0026") }}
      />

      <article className="relative pt-[76px]">
        {/* header */}
        <header className="relative overflow-hidden border-b border-line">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-35 mask-fade-b" />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-cyan-glow/10 blur-[120px]"
          />
          <div className="container-x relative py-16 sm:py-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-ink-mute transition-colors hover:text-cyan-glow"
            >
              <ArrowLeft className="h-4 w-4" />
              All insights
            </Link>

            <div className="mt-8 max-w-3xl">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-cyan-glow/20 bg-cyan-glow/8 px-2.5 py-1 text-[11px] text-cyan-glow"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <h1 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-[2.9rem]">
                {post.title}
              </h1>

              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-wider text-ink-mute">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-cyan-glow" />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-cyan-glow" />
                  {post.published_at ? formatDate(post.published_at) : "—"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-cyan-glow" />
                  {readingTime(post.content)} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* body */}
        <div className="container-x py-16">
          <div className="prose prose-invert prose-seero mx-auto max-w-3xl prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          {related.length > 0 && (
            <div className="mx-auto mt-20 max-w-3xl border-t border-line pt-10">
              <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-mute">
                Keep reading
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {related.map((p, i) => (
                  <Reveal key={p.id} delay={i * 0.08}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group block h-full rounded-2xl border border-line bg-surface/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-glow/30"
                    >
                      <h3 className="font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-cyan-glow">
                        {p.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                        {p.excerpt}
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTABand
        title="Want this applied to your own website?"
        description="We build every Seero site the way these articles describe. Tell us about your business and we will show you exactly what that would look like."
      />
    </>
  );
}
