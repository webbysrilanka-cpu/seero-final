"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send, AlertCircle, MessageCircle } from "lucide-react";
import { submitInquiry, type ContactState } from "@/app/actions/contact";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const initialState: ContactState = { ok: false, message: "" };

const serviceOptions = [
  "A brand new website",
  "Redesign of my existing website",
  "Fix / speed up my current site",
  "Google Business Profile & local SEO",
  "Not sure yet — need advice",
];

const budgetOptions = [
  "Under Rs. 35,000",
  "Rs. 35,000 – Rs. 75,000",
  "Rs. 75,000 – Rs. 150,000",
  "Above Rs. 150,000",
  "I'd like a recommendation",
];

const packageToBudget: Record<string, string> = {
  starter: "Under Rs. 35,000",
  business: "Rs. 35,000 – Rs. 75,000",
  premium: "Rs. 75,000 – Rs. 150,000",
};

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-mute"
      >
        {label}
        {required && <span className="ml-1 text-cyan-glow">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-void/70 px-4 py-3 text-sm text-ink placeholder:text-ink-mute/60 outline-none transition-all duration-200 focus:border-cyan-glow/60 focus:bg-void focus:shadow-[0_0_0_3px_rgba(34,224,255,0.12)]";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-core to-blue-deep px-8 py-4 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(34,224,255,0.8)] transition-all duration-300 hover:scale-[1.01] disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Send enquiry
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const pkg = params.get("package") ?? "";
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const [budget, setBudget] = useState(() => packageToBudget[pkg] ?? "");

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {state.ok ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-cyan-glow/30 bg-cyan-glow/5 p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-cyan-core to-blue-deep shadow-[0_0_36px_-6px_rgba(34,224,255,0.9)]"
            >
              <Check className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-bold text-ink">
              Message received.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              {state.message}
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-5 py-2.5 text-sm font-medium text-cyan-glow transition-colors hover:bg-cyan-glow/20"
            >
              <MessageCircle className="h-4 w-4" />
              Need it faster? Message us on WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={formAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-line bg-surface/40 p-6 backdrop-blur-sm sm:p-8"
          >
            {/* honeypot */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <input type="hidden" name="page_path" value="/contact" />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Your name" htmlFor="name" required error={state.errors?.name}>
                <input
                  id="name"
                  name="name"
                  required
                  maxLength={200}
                  autoComplete="name"
                  placeholder="Nimal Perera"
                  className={cn(inputClass, state.errors?.name && "border-red-400/60")}
                />
              </Field>

              <Field label="Business name" htmlFor="company">
                <input
                  id="company"
                  name="company"
                  maxLength={200}
                  autoComplete="organization"
                  placeholder="Perera Motors"
                  className={inputClass}
                />
              </Field>

              <Field label="Email" htmlFor="email" required error={state.errors?.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={320}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={cn(inputClass, state.errors?.email && "border-red-400/60")}
                />
              </Field>

              <Field label="Phone / WhatsApp" htmlFor="phone" error={state.errors?.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={40}
                  autoComplete="tel"
                  placeholder="+94 77 123 4567"
                  className={inputClass}
                />
              </Field>

              <Field label="What do you need?" htmlFor="service_interest">
                <select
                  id="service_interest"
                  name="service_interest"
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="">Choose one…</option>
                  {serviceOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Budget range" htmlFor="budget_range">
                <select
                  id="budget_range"
                  name="budget_range"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Choose one…</option>
                  {budgetOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-5">
              <Field
                label="Tell us about your project"
                htmlFor="project_description"
                required
                error={state.errors?.project_description}
              >
                <textarea
                  id="project_description"
                  name="project_description"
                  required
                  rows={5}
                  maxLength={5000}
                  placeholder="What does your business do, and what do you want the website to achieve? Anything you already have — a domain, photos, an old site — is useful to know."
                  className={cn(
                    inputClass,
                    "resize-y",
                    state.errors?.project_description && "border-red-400/60"
                  )}
                />
              </Field>
            </div>

            <div className="mt-5">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-mute">
                Best way to reach you
              </span>
              <div className="flex flex-wrap gap-2">
                {["WhatsApp", "Phone call", "Email"].map((opt, i) => (
                  <label
                    key={opt}
                    className="group cursor-pointer rounded-full border border-line bg-void/60 px-4 py-2 text-sm text-ink-soft transition-all has-[:checked]:border-cyan-glow/60 has-[:checked]:bg-cyan-glow/10 has-[:checked]:text-cyan-glow"
                  >
                    <input
                      type="radio"
                      name="preferred_contact"
                      value={opt.toLowerCase()}
                      defaultChecked={i === 0}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {!state.ok && state.message && (
              <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/8 px-4 py-3 text-sm text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {state.message}
              </p>
            )}

            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <SubmitButton />
              <p className="text-center text-xs text-ink-mute sm:text-right">
                We reply to every enquiry.
                <br className="hidden sm:block" /> No mailing list, no spam.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
