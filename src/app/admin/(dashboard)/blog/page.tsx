import Link from "next/link";
import { FileText, Plus, Pencil, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";
import DeleteButton from "@/components/admin/DeleteButton";
import { deletePost } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  const posts = (data ?? []) as Post[];

  return (
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Blog posts
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Write and publish articles. Published posts appear on your website
            within a few minutes.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-core to-blue-deep px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgba(34,224,255,0.8)] transition-transform hover:scale-[1.02]"
        >
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </header>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-surface/20 p-14 text-center">
          <FileText className="mx-auto h-8 w-8 text-ink-mute" />
          <p className="mt-4 text-sm text-ink-soft">
            No posts yet. Write your first one — it helps you show up on Google.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface/40 p-5"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-base font-semibold text-ink">
                    {post.title}
                  </h2>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider ${
                      post.status === "published"
                        ? "border-cyan-glow/35 bg-cyan-glow/10 text-cyan-glow"
                        : "border-line bg-void/60 text-ink-mute"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-ink-mute">
                  /blog/{post.slug} ·{" "}
                  {post.published_at
                    ? formatDate(post.published_at)
                    : `created ${formatDate(post.created_at)}`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {post.status === "published" && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-void/50 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </Link>
                )}
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-void/50 px-3 py-1.5 text-xs text-ink-soft transition-colors hover:border-cyan-glow/40 hover:text-cyan-glow"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>
                <DeleteButton
                  id={post.id}
                  action={deletePost}
                  label="Delete this post?"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
