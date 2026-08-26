/**
 * ─────────────────────────────────────────────────────────────
 *  SEERO — single source of truth for business details.
 *  Edit ONLY this file to change contact info anywhere on the site.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Seero",
  legalName: "Seero Web Studio",
  tagline: "Websites that win local customers.",
  description:
    "Seero builds fast, modern websites for Sri Lankan businesses and individuals — designed to be found on Google and to turn visitors into customers.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://seero.lk"),

  // ── CONTACT ───────────────────────────────────────────────
  phone: "+94 77 262 0308",
  phoneHref: "tel:+94772620308",
  whatsapp: "94772620308", // digits only, country code first, no + or spaces
  whatsappMessage:
    "Hi Seero! I'd like to talk about building a website for my business.",
  email: "seerosrilanka@gmail.com",
  location: "Colombo, Sri Lanka",
  serviceArea: "Serving businesses island-wide",
  hours: "Mon – Sat · 9:00 AM – 7:00 PM (IST)",

  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
  },
} as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage
)}`;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
] as const;
