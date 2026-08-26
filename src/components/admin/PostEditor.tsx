"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Eye, Loader2, Save } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { savePost, type ActionState } from "@/app/admin/actions";
import type { Post } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { cn } from "@/lib/utils";

const initial: ActionState = { ok: false, message: "" };

const input =
  "w-full rounded-xl border border-line bg-void/60 px-4 py-3 text-sm text-ink placeholder:text-ink-mute/60 outline-none transition-colors focus:border-cyan-glow/50";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-core to-blue-deep px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-8px_rgba(34,224,255,0.8)] transition-transform hover:scale-[1.02] disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving…
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save post
        </>
      )}
    </button>
  );
}

export default function PostEditor({ post }: { post?: Post }) {
  const [state, formAction] = useActionState(savePost, initial);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [content, setContent] = useState(post?.content ?? "");
  const [preview, setPreview] = useState(false);

  return (
    <form action={formAction} className="mx-auto max-w-4xl">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm text-ink-mute transition-colors hover:text-cyan-glow"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>
        <div className="flex items-center gap-3">
          <select
            name="status"
            defaultValue={post?.status ?? "draft"}
            className="rounded-xl border border-line bg-void/60 px-3.5 py-2.5 text-sm text-ink outline-none focus:border-cyan-glow/50"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Submit />
        </div>
      </div>

      <h1 className="mt-7 font-display text-2xl font-bold text-ink">
        {post ? "Edit post" : "New post"}
      </h1>

      {state.message && !state.ok && (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/8 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {state.message}
        </p>
      )}

      <div className="mt-7 space-y-5">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
            Title
          </label>
          <input
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            required
            className={input}
            placeholder="What a website actually costs in Sri Lanka"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
            URL slug
          </label>
          <div className="flex items-center gap-2">
            <span className="shrink-0 font-mono text-xs text-ink-mute">
              /blog/
            </span>
            <input
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value);
              }}
              className={input}
              placeholder="what-a-website-costs"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            defaultValue={post?.excerpt ?? ""}
            rows={2}
            className={input}
            placeholder="One or two sentences shown on the blog listing and in Google results."
          />
        </div>

        <div>
          <label className="mb-2 block text-xs uppercase tracking-widest text-ink-mute">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            defaultValue={post?.tags?.join(", ") ?? ""}
            className={input}
            placeholder="Pricing, Small Business, SEO"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs uppercase tracking-widest text-ink-mute">
              Content (Markdown)
            </label>
            <button
              type="button"
              onClick={() => setPreview((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors",
                preview
                  ? "border-cyan-glow/40 bg-cyan-glow/10 text-cyan-glow"
                  : "border-line bg-void/50 text-ink-soft hover:text-ink"
              )}
            >
              <Eye className="h-3.5 w-3.5" />
              {preview ? "Edit" : "Preview"}
            </button>
          </div>

          {preview ? (
            <div className="prose prose-invert prose-seero max-w-none rounded-xl border border-line bg-void/60 p-6">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "_Nothing to preview yet._"}
              </ReactMarkdown>
            </div>
          ) : (
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={22}
              required
              className={cn(input, "font-mono text-[13px] leading-relaxed")}
              placeholder={"## A heading\n\nWrite your article here. Markdown works: **bold**, _italic_, lists, and [links](https://example.com)."}
            />
          )}
          {preview && <input type="hidden" name="content" value={content} />}
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-line pt-6">
        <Submit />
      </div>
    </form>
  );
}
