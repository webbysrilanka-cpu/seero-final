"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { signIn, type ActionState } from "../actions";

const initial: ActionState = { ok: false, message: "" };

const inputClass =
  "w-full rounded-xl border border-line bg-void/70 px-4 py-3 text-sm text-ink placeholder:text-ink-mute/60 outline-none transition-all focus:border-cyan-glow/60 focus:shadow-[0_0_0_3px_rgba(34,224,255,0.12)]";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-core to-blue-deep px-6 py-3 text-sm font-semibold text-white shadow-[0_0_26px_-8px_rgba(34,224,255,0.8)] transition-transform hover:scale-[1.01] disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Signing in…
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          Sign in
        </>
      )}
    </button>
  );
}

export default function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";
  const [state, formAction] = useActionState(signIn, initial);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-2xl border border-line bg-surface/50 p-6 backdrop-blur-sm"
    >
      <input type="hidden" name="next" value={next} />

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-mute"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="you@seero.lk"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-mute"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
          placeholder="••••••••"
        />
      </div>

      {state.message && (
        <p className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-400/8 px-3 py-2 text-xs text-red-300">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {state.message}
        </p>
      )}

      <Submit />
    </form>
  );
}
