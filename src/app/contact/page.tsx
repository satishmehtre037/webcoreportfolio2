import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Clock, ArrowUpRight, Send } from "lucide-react";
import { SITE } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact WebCore Studio — Start Your Software or AI Project",
  description:
    "Get in touch with WebCore Studio to discuss your custom AI software, Next.js web application, or business automation project. Direct founder access and 24-hour turnaround.",
  alternates: {
    canonical: `${SITE.url}/contact`,
  },
  openGraph: {
    title: "Contact WebCore Studio — Start Your Software Project",
    description:
      "Direct communication with our lead systems architects. Prototypes in 7–14 days with 100% source code ownership.",
    url: `${SITE.url}/contact`,
  },
};

export default function ContactPage() {
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
            <Link href="/about" className="hover:text-rust transition-colors">About</Link>
            <Link href="/#services" className="hover:text-rust transition-colors">Services</Link>
            <Link href="/blog" className="hover:text-rust transition-colors">Blog</Link>
            <Link href="/contact" className="text-rust font-semibold">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-12">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-rust hover:underline"
          >
            <ArrowLeft size={16} /> Back to WebCore Home
          </Link>
          <div className="inline-block px-3.5 py-1 rounded-full border border-rust/30 bg-rust/5 text-rust text-xs font-mono font-semibold uppercase tracking-wider">
            Direct Founder Communication
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-charcoal">
            Let&apos;s Build Something <br />
            <span className="text-rust">Exceptional Together.</span>
          </h1>
          <p className="text-lg text-charcoal/70 max-w-2xl font-body">
            Whether you need a bespoke Next.js 15 web application, an autonomous WhatsApp AI agent, or a full SaaS platform, our engineering team responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="md:col-span-5 space-y-6">
            <div className="border-[3px] border-charcoal/10 rounded-3xl p-6 sm:p-8 bg-white shadow-sm space-y-6">
              <h2 className="text-2xl font-bold font-display text-charcoal">Direct Contacts</h2>

              <div className="space-y-4">
                <a
                  href="mailto:hello@webcorestudio.dev"
                  className="flex items-center space-x-3.5 p-3 rounded-2xl bg-charcoal/5 hover:bg-rust/10 hover:text-rust transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-rust/10 text-rust flex items-center justify-center flex-shrink-0 group-hover:bg-rust group-hover:text-ivory transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase text-charcoal/50">Direct Email</p>
                    <p className="text-sm font-bold text-charcoal group-hover:text-rust">hello@webcorestudio.dev</p>
                  </div>
                </a>

                <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-charcoal/5">
                  <div className="w-10 h-10 rounded-xl bg-rust/10 text-rust flex items-center justify-center flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase text-charcoal/50">Response Time SLA</p>
                    <p className="text-sm font-bold text-charcoal">Within 24 Hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5 p-3 rounded-2xl bg-charcoal/5">
                  <div className="w-10 h-10 rounded-xl bg-rust/10 text-rust flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase text-charcoal/50">Location</p>
                    <p className="text-sm font-bold text-charcoal">Maharashtra, India (Global Remote)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal/10">
                <p className="text-xs text-charcoal/60 leading-relaxed font-body">
                  All engagements include a strict non-disclosure agreement (NDA), full Git repository handover, and dedicated post-launch support.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Box */}
          <div className="md:col-span-7 border-[3px] border-charcoal/10 rounded-3xl p-6 sm:p-10 bg-white shadow-md space-y-6">
            <h2 className="text-2xl font-bold font-display text-charcoal">Send A Project Brief</h2>
            <p className="text-sm text-charcoal/70">
              Tell us about your project requirements, target timeline, and budget. You can also email us directly at <a href="mailto:hello@webcorestudio.dev" className="text-rust font-bold underline">hello@webcorestudio.dev</a>.
            </p>

            <form
              action="mailto:hello@webcorestudio.dev"
              method="GET"
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono uppercase text-charcoal/60 mb-1.5 font-semibold">
                  Your Name / Company
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Acme Corp — AI SaaS Project"
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/15 focus:border-rust focus:outline-none text-sm font-medium text-charcoal bg-ivory/50"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-charcoal/60 mb-1.5 font-semibold">
                  Project Scope &amp; Deliverables
                </label>
                <textarea
                  name="body"
                  rows={4}
                  placeholder="Describe your web application, autonomous AI bot, or payment integration requirements..."
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-charcoal/15 focus:border-rust focus:outline-none text-sm font-medium text-charcoal bg-ivory/50 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-rust text-ivory font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rust/20 active:scale-[0.99]"
              >
                <Send size={16} />
                <span>Send Discovery Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
