import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2, Sparkles, Zap, Shield, HeartHandshake, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "About WebCore Studio — Software Engineering & AI Craft",
  description:
    "Learn about WebCore Studio, our craft-over-templates philosophy, lead architect Satish Mehtre, and how we engineer high-performance AI platforms and Next.js applications.",
  alternates: {
    canonical: `${SITE.url}/about`,
  },
  openGraph: {
    title: "About WebCore Studio — Software Engineering & AI Craft",
    description:
      "Handcrafted software engineering studio building custom AI copilots, high-performance Next.js web applications, and autonomous business workflows.",
    url: `${SITE.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      {/* Top Header */}
      <header className="border-b border-charcoal/10 bg-ivory/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold font-display tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="w-8 h-8 rounded-lg bg-rust flex items-center justify-center text-ivory text-sm font-black">
              W
            </span>
            <span>WebCore Studio</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-rust transition-colors">Home</Link>
            <Link href="/about" className="text-rust font-semibold">About</Link>
            <Link href="/#services" className="hover:text-rust transition-colors">Services</Link>
            <Link href="/blog" className="hover:text-rust transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-rust transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-16">
        {/* Hero Section */}
        <div className="space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-rust hover:underline"
          >
            <ArrowLeft size={16} /> Back to WebCore Home
          </Link>
          <div className="inline-block px-3.5 py-1 rounded-full border border-rust/30 bg-rust/5 text-rust text-xs font-mono font-semibold uppercase tracking-wider">
            Our Mission &amp; Philosophy
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-charcoal leading-[1.05]">
            Craft Over Templates. <br />
            <span className="text-rust">Software Built To Last.</span>
          </h1>
          <p className="text-lg sm:text-xl text-charcoal/80 max-w-3xl font-body leading-relaxed">
            WebCore Studio is an independent software engineering studio founded by Satish Mehtre. We specialize in architecting bespoke Next.js 15 web applications, autonomous multi-agent AI systems, and frictionless conversion engines for forward-thinking enterprises.
          </p>
        </div>

        {/* Core Principles Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-[3px] border-charcoal/10 rounded-2xl p-6 bg-white shadow-sm hover:border-rust/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rust/10 text-rust flex items-center justify-center font-bold">
              <Zap size={20} />
            </div>
            <h2 className="text-xl font-bold font-display">Sub-Second Performance</h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              We never use bloated WordPress themes or sluggish page builders. Every line of code is written in TypeScript and optimized for 100/100 Core Web Vitals and instant edge rendering.
            </p>
          </div>

          <div className="border-[3px] border-charcoal/10 rounded-2xl p-6 bg-white shadow-sm hover:border-rust/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rust/10 text-rust flex items-center justify-center font-bold">
              <Sparkles size={20} />
            </div>
            <h2 className="text-xl font-bold font-display">Autonomous AI Systems</h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              From WhatsApp AI sales staff that process orders in 0.2 seconds to private RAG search engines over company documents, we build AI that generates real business revenue.
            </p>
          </div>

          <div className="border-[3px] border-charcoal/10 rounded-2xl p-6 bg-white shadow-sm hover:border-rust/40 transition-all space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rust/10 text-rust flex items-center justify-center font-bold">
              <Shield size={20} />
            </div>
            <h2 className="text-xl font-bold font-display">100% Code Ownership</h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              You own every repository, database schema, and design token. No vendor lock-in, no hidden recurring platform royalties. Your software belongs entirely to you.
            </p>
          </div>
        </section>

        {/* Founder Bio & Leadership */}
        <section className="border-[3px] border-charcoal/10 rounded-3xl p-8 sm:p-12 bg-white shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal/10 pb-6">
            <div>
              <span className="text-xs font-mono text-rust uppercase tracking-wider font-semibold">Leadership</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-charcoal">Satish Mehtre</h2>
              <p className="text-sm text-charcoal/60 font-mono">Lead Systems Architect &amp; Founder</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-rust/10 text-rust text-xs font-mono font-bold">
              India • Operating Globally
            </div>
          </div>

          <p className="text-base text-charcoal/80 leading-relaxed">
            With years of experience engineering high-scale web platforms and autonomous AI workflows, Satish founded WebCore Studio to bring institutional-grade software engineering to ambitious startups and established companies worldwide. We treat every client engagement as a long-term technical partnership.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-charcoal/5 text-xs font-mono font-medium">Next.js 15 App Router</span>
            <span className="px-3 py-1 rounded-lg bg-charcoal/5 text-xs font-mono font-medium">TypeScript</span>
            <span className="px-3 py-1 rounded-lg bg-charcoal/5 text-xs font-mono font-medium">Supabase &amp; PostgreSQL</span>
            <span className="px-3 py-1 rounded-lg bg-charcoal/5 text-xs font-mono font-medium">Meta WhatsApp API</span>
            <span className="px-3 py-1 rounded-lg bg-charcoal/5 text-xs font-mono font-medium">Razorpay &amp; Stripe</span>
            <span className="px-3 py-1 rounded-lg bg-charcoal/5 text-xs font-mono font-medium">Capacitor Native</span>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center rounded-3xl border-[3px] border-rust/40 bg-rust/5 p-8 sm:p-12 space-y-4">
          <h2 className="text-3xl font-extrabold font-display text-charcoal">
            Ready to Build Your Next Digital Product?
          </h2>
          <p className="text-base text-charcoal/70 max-w-xl mx-auto">
            Let&apos;s turn your vision into an automated, high-converting software system. Prototypes delivered in 7 to 14 days.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-rust text-ivory font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-rust/20"
            >
              <span>Start A Project Discovery</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
