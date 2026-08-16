import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Software Development Company India | WebCore Studio",
  description:
    "WebCore is a premier software development company in India specializing in custom Next.js web applications, AI integration, and business automation.",
  keywords: [
    "Software Development Company India",
    "Website Development India",
    "Web Development Company India",
    "AI Software Development India",
    "Custom Software Agency India",
  ],
  alternates: {
    canonical: `${SITE.url}/locations/india`,
  },
  openGraph: {
    title: "Software Development Company India | WebCore Studio",
    description:
      "Handcrafted custom software, AI agent integrations, and enterprise Next.js applications engineered in India for global ambitious brands.",
    url: `${SITE.url}/locations/india`,
    type: "website",
  },
};
export default function IndiaLocationPage() {
  const baseUrl = SITE.url || "https://webcorestudio.dev";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WebCore Studio India",
    image: `${baseUrl}/webcore-logo-full.svg`,
    "@id": `${baseUrl}/locations/india#organization`,
    url: `${baseUrl}/locations/india`,
    telephone: "+91-9000000000",
    email: "hello@webcorestudio.dev",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "Maharashtra",
      addressLocality: "India",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.0760",
      longitude: "72.8777",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
    priceRange: "$$",
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Header Bar */}
      <header className="border-b border-charcoal/10 bg-ivory/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold font-display tracking-tight flex items-center gap-2"
          >
            <span className="w-8 h-8 rounded-lg bg-rust flex items-center justify-center text-ivory text-sm">
              W
            </span>
            <span>WebCore Studio</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-rust transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-rust transition-colors">
              Blog
            </Link>
            <Link href="/#contact" className="hover:text-rust transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Hero */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rust/30 bg-rust/5 text-rust text-xs font-mono font-semibold uppercase tracking-wider">
            Local Engineering Hub &bull; India
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight text-charcoal">
            Premier Software Development Company in India
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto font-body">
            Engineering handcrafted Next.js platforms, custom AI copilots, and scalable enterprise software for ambitious startups and businesses worldwide.
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="border border-charcoal/10 rounded-2xl p-8 bg-ivory space-y-4 shadow-sm">
            <h2 className="text-xl font-bold font-display text-rust">
              Custom Web &amp; Next.js Development
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              We specialize in custom Next.js 15 App Router development, building lightning-fast SaaS platforms, admin dashboards, and brand systems that pass Google Core Web Vitals with 100/100 Lighthouse performance.
            </p>
          </div>

          <div className="border border-charcoal/10 rounded-2xl p-8 bg-ivory space-y-4 shadow-sm">
            <h2 className="text-xl font-bold font-display text-rust">
              AI Software &amp; Business Automation
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              From automated WhatsApp AI engines to custom LLM copilots, we build production AI software designed to eliminate manual data entry, optimize support workflows, and accelerate growth.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-charcoal text-ivory rounded-2xl p-10 text-center space-y-6">
          <h2 className="text-3xl font-bold font-display">
            Start Your Software Project Today
          </h2>
          <p className="text-sm text-ivory/70 max-w-md mx-auto">
            Discuss your software architecture, timeline, and goals directly with our engineering team.
          </p>
          <div className="pt-2">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-rust text-ivory font-bold hover:opacity-90 transition-opacity"
            >
              Get in Touch with WebCore India &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
