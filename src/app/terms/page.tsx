import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | WebCore Studio",
  description: "Terms & Conditions for WebCore Studio - Learn about our service agreements, intellectual property, and project terms.",
};

export default function TermsPage() {
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
          <span className="font-mono-plex text-xs uppercase tracking-[0.25em] text-wine">Legal Agreement</span>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 font-mono-plex text-xs text-charcoal/60">
            Last Updated: July 2026
          </p>
        </header>

        <div className="mt-10 space-y-8 font-body leading-relaxed text-charcoal/85">
          <section className="rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal sm:p-8">
            <h2 className="font-display text-2xl font-bold text-wine">1. Overview &amp; Engagement</h2>
            <p className="mt-3">
              By engaging WebCore Studio (&quot;WebCore&quot;, &quot;we&quot;, &quot;our&quot;) for custom web development, AI software engineering, e-commerce builds, or UI/UX design services, you agree to comply with and be bound by these Terms &amp; Conditions.
            </p>
          </section>

          <section className="rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal sm:p-8">
            <h2 className="font-display text-2xl font-bold text-wine">2. Intellectual Property &amp; Code Ownership</h2>
            <p className="mt-3">
              Upon final payment for agreed milestone deliverables, full ownership rights to final custom source code, design files, and digital deliverables created specifically for your project transfer to you. WebCore retains rights to pre-existing open-source libraries and general software abstractions.
            </p>
          </section>

          <section className="rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal sm:p-8">
            <h2 className="font-display text-2xl font-bold text-wine">3. Payment Terms &amp; Milestones</h2>
            <p className="mt-3">
              Project scope, milestones, timeline estimates, and payment schedules are defined prior to project commencement. Deposits and milestone payments are non-refundable once work on the designated phase has commenced.
            </p>
          </section>

          <section className="rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal sm:p-8">
            <h2 className="font-display text-2xl font-bold text-wine">4. Governing Law &amp; Contact</h2>
            <p className="mt-3">
              These terms are governed by the laws of India. For any inquiries regarding service contracts or project terms, contact us at:
            </p>
            <p className="mt-2 font-mono-plex text-sm font-bold text-wine">
              webcore.studios.2025@gmail.com
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
