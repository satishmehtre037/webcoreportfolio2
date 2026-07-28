export const SITE = {
  name: "WebCore",
  tagline: "Software engineering studio",
  description:
    "WebCore designs and ships production-grade software — from AI platforms to polished SaaS — with clarity, craft, and measurable outcomes.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://webcorestudio.vercel.app",
  email: "hello@webcore.dev",
  social: {
    linkedin: "https://linkedin.com/company/webcore",
    github: "https://github.com/webcore",
    x: "https://x.com/webcore",
  },
} as const;

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;
