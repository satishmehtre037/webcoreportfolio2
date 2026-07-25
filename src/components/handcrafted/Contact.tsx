"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Overline, Reveal, BrutalButton } from "./Primitives";
import { Asterisk, CurvedArrow } from "./Doodles";

const BUDGETS = ["< $10k", "$10k–$25k", "$25k–$50k", "$50k+"];

export const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set =
    (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in your name, email and a message.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setDone(true);
      setLoading(false);
      setForm({ name: "", email: "", company: "", budget: "", message: "" });
    }, 600);
  };

  const inputClass =
    "w-full rounded-xl border-[2px] border-b-[4px] border-ink bg-ivory px-4 py-3 font-body text-charcoal placeholder:text-charcoal/40 focus:border-wine focus:bg-white focus-visible:ring-4 focus-visible:ring-wine/30 transition-colors";

  return (
    <section id="contact" className="relative py-24 sm:py-32" data-testid="contact">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Overline>Start a project</Overline>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl text-charcoal">
              Let&apos;s build
              <br />
              something <span className="text-wine">real.</span>
            </h2>
            <p className="mt-6 max-w-sm text-charcoal/75 font-body">
              Tell us what you&apos;re making. We reply to every serious brief within 48 hours — a real human, not a bot.
            </p>

            <div className="relative mt-10 hidden lg:block">
              <span className="font-hand text-3xl text-wine">fill this out →</span>
              <CurvedArrow className="mt-2 h-20 w-28" color="#7A2E3A" />
            </div>
          </div>

          <Reveal className="lg:col-span-7" y={30}>
            <div
              className="relative rounded-2xl border-[3px] border-ink bg-white p-6 shadow-brutal-xl sm:p-9"
              data-testid="contact-card"
            >
              <Asterisk className="absolute -right-4 -top-4 h-9 w-9" />

              {done ? (
                <div
                  className="flex min-h-[22rem] flex-col items-center justify-center text-center"
                  data-testid="contact-success"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink bg-sage font-display text-3xl text-charcoal">
                    ✓
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-extrabold text-charcoal">
                    Brief received!
                  </h3>
                  <p className="mt-2 max-w-sm text-charcoal/70 font-body">
                    We&apos;ll review it and reach out within 48 hours.
                  </p>
                  <button
                    onClick={() => setDone(false)}
                    className="mt-6 font-mono-plex text-xs uppercase tracking-widest underline decoration-wine underline-offset-4 text-charcoal hover:text-wine"
                    data-testid="contact-reset"
                  >
                    Send another →
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal">
                        Name *
                      </label>
                      <input
                        className={inputClass}
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Jane Cooper"
                        data-testid="contact-name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal">
                        Email *
                      </label>
                      <input
                        type="email"
                        className={inputClass}
                        value={form.email}
                        onChange={set("email")}
                        placeholder="jane@company.com"
                        data-testid="contact-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal">
                        Company
                      </label>
                      <input
                        className={inputClass}
                        value={form.company}
                        onChange={set("company")}
                        placeholder="Acme Inc."
                        data-testid="contact-company"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal">
                        Budget
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGETS.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, budget: b }))}
                            className={`rounded-full border-[2px] border-ink px-3 py-2 text-xs font-bold transition-colors ${
                              form.budget === b
                                ? "bg-wine text-ivory"
                                : "bg-ivory hover:bg-sage text-charcoal"
                            }`}
                            data-testid={`budget-${b}`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-mono-plex text-xs uppercase tracking-widest text-charcoal">
                      Project brief *
                    </label>
                    <textarea
                      rows={4}
                      className={inputClass}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="We're building an AI copilot for..."
                      data-testid="contact-message"
                    />
                  </div>

                  <BrutalButton
                    type="submit"
                    variant="wine"
                    disabled={loading}
                    className="w-full sm:w-auto disabled:opacity-60"
                    data-testid="contact-submit"
                  >
                    {loading ? "Sending…" : "Send brief"} <ArrowUpRight size={16} />
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
