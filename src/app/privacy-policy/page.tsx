import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | WebCore Studio",
  description: "Privacy Policy for WebCore Studio - Learn how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ivory text-charcoal px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono-plex text-xs uppercase tracking-widest text-wine hover:underline mb-8"
        >
          <ArrowLeft size={16} /> Back to WebCore Home
        </Link>

        <header className="border-b-[3px] border-ink pb-8">
          <span className="font-mono-plex text-xs uppercase tracking-[0.25em] text-wine">Legal & Privacy</span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 font-mono-plex text-xs text-charcoal/60">
            Last Updated: July 2026
          </p>
        </header>

        <div className="mt-10 space-y-8 font-body leading-relaxed text-charcoal/85">
          <section className="rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal sm:p-8">
            <h2 className="font-display text-2xl font-bold text-wine">1. Information We Collect</h2>
            <p className="mt-3">
              WebCore Studio (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) collects information that you voluntarily provide to us when submitting project briefs, contact forms, or communicating with us via email or WhatsApp. This includes your name, email address, phone number, company name, and project requirements.
            </p>
          </section>

          <section className="rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal sm:p-8">
            <h2 className="font-display text-2xl font-bold text-wine">2. How We Use Your Information</h2>
            <p className="mt-3">
              We use the collected information exclusively for:
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1 pl-2">
              <li>Evaluating and responding to your web development or AI software project briefs.</li>
              <li>Communicating project updates, scope estimates, and timeline proposals.</li>
              <li>Delivering bespoke digital products and ongoing technical support.</li>
            </ul>
          </section>

          <section className="rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal sm:p-8">
            <h2 className="font-display text-2xl font-bold text-wine">3. Data Protection & Confidentiality</h2>
            <p className="mt-3">
              We treat all client code, brand assets, and project brief details with strict confidentiality. We do not sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section className="rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal sm:p-8">
            <h2 className="font-display text-2xl font-bold text-wine">4. Contact Us</h2>
            <p className="mt-3">
              If you have any questions regarding this Privacy Policy, please reach out to us at:
            </p>
            <p className="mt-2 font-mono-plex text-sm font-bold text-wine">
              hello@webcorestudio.dev
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
