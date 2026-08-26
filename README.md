# Seero — Web Design & Development Studio (Sri Lanka)

The Seero business website: Next.js 16 (App Router) + TypeScript + Tailwind v4,
with Three.js 3D, Framer Motion, and a Supabase backend + admin dashboard.

## Live pages

| Route | What it is |
|---|---|
| `/` | Home — 3D hero, services, process, work, pricing, insights |
| `/services` | Full service breakdown (from the database) |
| `/portfolio` | Concept project showcase (from the database) |
| `/pricing` | LKR packages, add-ons, FAQ |
| `/about` | Story, values, promise |
| `/contact` | Enquiry form → saves to Supabase |
| `/blog` + `/blog/[slug]` | Articles (from the database) |
| `/admin` | Private dashboard — login required |

## Admin dashboard

Sign in at `/admin/login`.

- **Enquiries** — every contact form submission, with status tracking and private notes
- **Blog posts** — write in Markdown with live preview, save as draft or publish
- **Portfolio** — add/edit/remove projects, publish or unpublish

Only accounts listed in the `admins` table can sign in. Anyone else is rejected
even with a valid Supabase account.

## Editing your business details

Everything (phone, WhatsApp, email, location, hours) lives in **one file**:

```
src/lib/site.ts
```

Change it there and it updates across the whole website.

Prices and packages live in `src/lib/content.ts`.

## Environment variables

The app ships with working defaults in `src/lib/supabase/config.ts` (the
Supabase publishable key is safe in source — every operation it allows is
locked down by Row Level Security). To override:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://your-domain.lk
```

Set `NEXT_PUBLIC_SITE_URL` once you connect a custom domain, so sitemaps and
social share previews use the right address.

## Local development

```bash
npm install
npm run dev
```

## Database

Supabase project `qejxbsdwsdgkpvnuqoym`. Tables: `inquiries`, `posts`,
`projects`, `services`, `testimonials`, `site_settings`, `admins`.
All have Row Level Security enabled — the public can only read published
content and insert an enquiry; everything else requires an admin account.
