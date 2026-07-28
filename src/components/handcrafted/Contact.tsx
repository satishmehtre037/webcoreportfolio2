"use client";

import React, { useState } from "react";
import { ArrowUpRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { Overline, Reveal, BrutalButton } from "./Primitives";
import { Asterisk, CurvedArrow } from "./Doodles";

const BUDGETS = ["₹5k – ₹10k", "₹10k – ₹15k", "₹15k – ₹20k", "₹20k+ / Custom"];
const SERVICES = ["Fullstack Web App", "AI & Automation", "SaaS Platform", "UI/UX & Web"];

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "₹10k – ₹15k",
    service: "Fullstack Web App",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please fill in your name, email address, and project brief.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Failed to send brief. Please try again.");
      } else {
        setDone(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          company: "",
          budget: "₹10k – ₹15k",
          service: "Fullstack Web App",
          message: "",
        });
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border-[2px] border-b-[4px] border-ink bg-ivory px-4 py-3 font-body text-charcoal placeholder:text-charcoal/40 focus:border-wine focus:bg-white focus-visible:ring-4 focus-visible:ring-wine/30 transition-colors";

  return (
    <section id="contact" className="relative py-24 sm:py-32" data-testid="contact">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column - Headline & Microcopy */}
          <div className="lg:col-span-5 lg:pr-4">
            <Overline>Start a project</Overline>
            <h2 className="mt-4 font-display font-extrabold leading-[0.94] tracking-tight text-charcoal text-[2.6rem] sm:text-5xl lg:text-[3.2rem]">
              Let&apos;s build
              <br />
              something
              <br />
              <span className="text-wine">real.</span>
            </h2>
            <p className="mt-6 max-w-sm text-charcoal/75 font-body text-base leading-relaxed">
              Tell us what you&apos;re making. We reply to every brief within 2–4 hours (IST) — a real engineering partner, not an automated bot.
            </p>

            <div className="mt-8 space-y-3 font-mono-plex text-xs text-charcoal/80">
              <p className="flex items-center gap-2 font-bold">
                <span className="h-2.5 w-2.5 rounded-full bg-sage" /> Based in Mumbai / Thane, India (IST)
              </p>
              <p className="text-charcoal/60">Serving clients across India 🇮🇳 & Globally 🌐</p>
            </div>

            <div className="relative mt-10 hidden lg:block">
              <span className="font-hand text-3xl text-wine">fill this out →</span>
              <CurvedArrow className="mt-2 h-20 w-28" color="#7A2E3A" />
            </div>
          </div>

          {/* Right Column: Contact Form Box */}
          <Reveal className="lg:col-span-7" y={30}>
            <div
              className="relative rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal-xl sm:p-9"
              data-testid="contact-card"
            >
              <Asterisk className="absolute -right-4 -top-4 h-9 w-9 z-10" />

              {done ? (
                <div
                  className="flex min-h-[24rem] flex-col items-center justify-center text-center p-4"
                  data-testid="contact-success"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink bg-sage text-charcoal">
                    <CheckCircle2 size={36} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold text-charcoal">
                    Brief Received!
                  </h3>
                  <p className="mt-3 max-w-md text-charcoal/75 font-body text-sm leading-relaxed">
                    Thank you! We&apos;ve logged your project brief and will reach out over Email / WhatsApp within 2–4 hours.
                  </p>
                  
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                    <BrutalButton
                      as="a"
                      href="https://wa.me/918779841346?text=Hi%20WebCore!%20I%20just%20submitted%20a%20project%20brief."
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="forest"
                      className="text-xs"
                    >
                      <MessageSquare size={16} /> Fast Track on WhatsApp
                    </BrutalButton>
                    <button
                      onClick={() => setDone(false)}
                      className="font-mono-plex text-xs uppercase tracking-widest underline decoration-wine underline-offset-4 text-charcoal hover:text-wine"
                      data-testid="contact-reset"
                    >
                      Send another brief →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-6" data-testid="contact-form">
                  {errorMsg && (
                    <div className="rounded-xl border-[2px] border-wine bg-wine/10 p-3.5 text-xs font-semibold text-wine">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal font-bold">
                        Your Name *
                      </label>
                      <input
                        className={inputClass}
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Enter your full name"
                        data-testid="contact-name"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className={inputClass}
                        value={form.email}
                        onChange={set("email")}
                        placeholder="Enter your email address"
                        data-testid="contact-email"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal font-bold">
                        Phone / WhatsApp (+91)
                      </label>
                      <input
                        type="tel"
                        className={inputClass}
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="Enter your phone or WhatsApp number"
                        data-testid="contact-phone"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal font-bold">
                        Company / Brand
                      </label>
                      <input
                        className={inputClass}
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Enter your company or brand name"
                        data-testid="contact-company"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal font-bold">
                      Service Interested In
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, service: s }))}
                          className={`rounded-full border-[2px] border-ink px-3.5 py-1.5 text-xs font-bold transition-all ${
                            form.service === s
                              ? "bg-wine text-ivory shadow-brutal-sm"
                              : "bg-ivory hover:bg-sage text-charcoal"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Selection (INR) */}
                  <div>
                    <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal font-bold">
                      Estimated Budget (INR)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, budget: b }))}
                          className={`rounded-full border-[2px] border-ink px-3.5 py-1.5 text-xs font-bold transition-all ${
                            form.budget === b
                              ? "bg-wine text-ivory shadow-brutal-sm"
                              : "bg-ivory hover:bg-sage text-charcoal"
                          }`}
                          data-testid={`budget-${b}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal font-bold">
                      Website Requirements / Goals *
                    </label>
                    <textarea
                      rows={4}
                      className={inputClass}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Describe your website requirements, target features, pages needed, or goals..."
                      data-testid="contact-message"
                      required
                    />
                  </div>

                  <BrutalButton
                    type="submit"
                    variant="wine"
                    disabled={loading}
                    className="w-full sm:w-auto disabled:opacity-60"
                    data-testid="contact-submit"
                  >
                    {loading ? "Sending Brief…" : "Send Brief"} <ArrowUpRight size={16} />
                  </BrutalButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
