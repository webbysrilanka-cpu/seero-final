import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/site";

/* Bundled with the app, so there is no third-party font request on any page
   load and nothing external to fail at build time. */
const display = localFont({
  src: "../fonts/space-grotesk-var.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-display",
  display: "swap",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

const body = localFont({
  src: "../fonts/inter-var.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-body",
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Web Design & Development in Sri Lanka`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web design Sri Lanka",
    "website development Colombo",
    "web designer Sri Lanka",
    "small business website Sri Lanka",
    "website company Colombo",
    "Seero",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Websites that win local customers`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Web Design & Development in Sri Lanka`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04060d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
