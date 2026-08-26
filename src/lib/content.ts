export interface Package {
  slug: string;
  name: string;
  price: number;
  tagline: string;
  bestFor: string;
  timeline: string;
  pages: string;
  featured?: boolean;
  features: string[];
  notIncluded?: string[];
}

export const packages: Package[] = [
  {
    slug: "starter",
    name: "Starter",
    price: 35000,
    tagline: "Get found online, properly.",
    bestFor:
      "Sole traders, freelancers and new businesses who need a credible presence fast.",
    timeline: "7 – 10 days",
    pages: "Up to 3 pages",
    features: [
      "Custom one-to-three page design",
      "Mobile-first, works on every phone",
      "Contact form that emails you directly",
      "WhatsApp click-to-chat button",
      "Google Business Profile setup & verification help",
      "Basic on-page SEO (titles, descriptions, sitemap)",
      "Free hosting setup on Vercel",
      "SSL certificate & security headers",
      "2 rounds of revisions",
      "30 days of post-launch support",
    ],
    notIncluded: ["Blog / CMS", "Admin dashboard", "Online payments"],
  },
  {
    slug: "business",
    name: "Business",
    price: 75000,
    tagline: "The one most businesses should buy.",
    bestFor:
      "Established local businesses — restaurants, clinics, salons, workshops, studios.",
    timeline: "2 – 3 weeks",
    pages: "Up to 8 pages",
    featured: true,
    features: [
      "Everything in Starter",
      "Up to 8 fully custom pages",
      "Scroll animations & interactive design touches",
      "Detailed enquiry form with lead capture to a database",
      "Admin dashboard — see and manage every enquiry",
      "Blog / news section you can update yourself",
      "Photo gallery or service catalogue",
      "Google Maps & directions embedded",
      "Speed tuned for green Core Web Vitals",
      "Google Analytics & Search Console connected",
      "3 rounds of revisions",
      "60 days of post-launch support",
    ],
    notIncluded: ["Online payments", "Multi-language"],
  },
  {
    slug: "premium",
    name: "Premium",
    price: 150000,
    tagline: "For businesses where the website is the business.",
    bestFor:
      "Multi-service companies, tour operators, agencies and anyone needing custom functionality.",
    timeline: "4 – 6 weeks",
    pages: "Up to 15 pages",
    features: [
      "Everything in Business",
      "Up to 15 pages with bespoke layouts",
      "3D and advanced motion design",
      "Full content management — edit everything yourself",
      "Booking or appointment system",
      "Sinhala / Tamil / English language support",
      "Custom database features built to your workflow",
      "Copywriting for every page",
      "Advanced SEO: schema markup, local landing pages",
      "Performance & uptime monitoring",
      "Unlimited revisions during the build",
      "90 days of post-launch support",
    ],
  },
];

export const addOns = [
  { name: "Extra page", price: "Rs. 6,000 each" },
  { name: "Logo & brand basics", price: "from Rs. 15,000" },
  { name: "Professional copywriting", price: "Rs. 4,000 per page" },
  { name: "Product photography (Colombo)", price: "from Rs. 20,000" },
  { name: "Online payments (PayHere / Stripe)", price: "from Rs. 25,000" },
  { name: "Monthly care plan", price: "Rs. 5,000 / month" },
];

export const processSteps = [
  {
    n: "01",
    title: "Talk",
    duration: "Day 1",
    body: "A free 30-minute call — WhatsApp, phone or in person in Colombo. We ask what your business actually needs, who your customers are, and what a website has to do to be worth the money. No pitch deck.",
  },
  {
    n: "02",
    title: "Plan",
    duration: "Days 2 – 3",
    body: "You get a written proposal: exact pages, exact features, exact price, exact timeline. Nothing vague, nothing to be decided later. You approve it before anything starts.",
  },
  {
    n: "03",
    title: "Design",
    duration: "Week 1",
    body: "We design your homepage first and show it to you on a real phone screen. You give feedback, we refine, and only once you are happy do we design the rest.",
  },
  {
    n: "04",
    title: "Build",
    duration: "Weeks 2 – 3",
    body: "Your design becomes a real, fast website. You get a live preview link from day one, so you can watch it come together and flag anything early.",
  },
  {
    n: "05",
    title: "Launch",
    duration: "Launch week",
    body: "We connect your domain, run the speed and mobile checks, submit you to Google, and go live. Then we walk you through how to update it yourself.",
  },
  {
    n: "06",
    title: "Support",
    duration: "Ongoing",
    body: "You keep the logins and you own everything. We stay reachable on WhatsApp for your support window, and longer if you want a care plan.",
  },
];

export const faqs = [
  {
    q: "How long does a website take?",
    a: "A Starter site is typically live in 7–10 days. A Business site takes 2–3 weeks and Premium 4–6 weeks. The single biggest cause of delay is waiting on photos and text from the client, so we tell you exactly what we need on day one.",
  },
  {
    q: "Do I need to pay everything upfront?",
    a: "No. We take 50% to start and 50% on launch. For Premium projects we can split it into three payments across the build.",
  },
  {
    q: "Do I own the website?",
    a: "Completely. The domain is registered in your name, the hosting account is yours, and you get every login. If you ever want to move to another developer, nothing stops you — we will even help hand it over.",
  },
  {
    q: "Can I update the website myself?",
    a: "Yes, on Business and Premium. You get an admin dashboard where you can add blog posts, update your portfolio and read every enquiry that comes in. We show you how it works before launch.",
  },
  {
    q: "What about hosting costs?",
    a: "Most of the sites we build run comfortably on a free hosting tier, so many clients pay nothing beyond their domain — roughly Rs. 5,000–12,000 a year for a .lk address. If your traffic grows past the free tier, we will tell you honestly before it becomes a bill.",
  },
  {
    q: "Do you work with businesses outside Colombo?",
    a: "Yes — most of our work happens over WhatsApp and video calls, so location is not a barrier. We work with businesses island-wide and with Sri Lankan owners living abroad.",
  },
  {
    q: "What if I already have a website?",
    a: "We will audit it for free and tell you honestly whether it is worth rebuilding or just repairing. Sometimes the right answer is fixing your speed and Google listing, not spending on a new site.",
  },
  {
    q: "Do you build online stores?",
    a: "Our focus is business websites rather than full e-commerce platforms. We can add payments and a small product catalogue as an add-on — but if you need a large store with inventory management, we will tell you upfront and point you somewhere better suited.",
  },
];

export const differentiators = [
  {
    title: "You own everything",
    body: "Domain in your name, hosting in your account, every login handed over. No hostage situations — the most common complaint we hear about previous developers.",
    icon: "key",
  },
  {
    title: "Built, not assembled",
    body: "No page builders, no forty plugins waiting to break. Hand-coded on the same modern stack used by companies far larger than yours.",
    icon: "code",
  },
  {
    title: "Priced before we start",
    body: "You get a fixed number in writing before any work begins. The price you approve is the price you pay.",
    icon: "receipt",
  },
  {
    title: "Fast where it counts",
    body: "Built to load in under two seconds on Sri Lankan mobile data — because that is how your customers will actually see it.",
    icon: "zap",
  },
  {
    title: "Found on Google",
    body: "Every build ships with proper SEO structure and your Google Business Profile connected, so people searching nearby actually find you.",
    icon: "search",
  },
  {
    title: "Reachable afterwards",
    body: "A real WhatsApp number that a real person answers. Support does not stop the moment the invoice is paid.",
    icon: "message",
  },
];

export const stats = [
  { value: 2, suffix: "s", label: "Target load time on mobile data", decimals: 0 },
  { value: 80, suffix: "%", label: "Of Sri Lankan visitors are on a phone" },
  { value: 7, suffix: " days", label: "From brief to a live Starter site" },
  { value: 100, suffix: "%", label: "Ownership handed to you at launch" },
];

export const industries = [
  "Restaurants & Cafés",
  "Clinics & Dental",
  "Salons & Spas",
  "Hotels & Villas",
  "Tour Operators",
  "Auto Services",
  "Construction",
  "Retail Shops",
  "Law & Accounting",
  "Gyms & Studios",
  "Schools & Tuition",
  "Event Services",
];
