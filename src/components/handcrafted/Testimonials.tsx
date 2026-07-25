import React from "react";
import { Overline, Reveal } from "./Primitives";

const QUOTES = [
  {
    q: "WebCore shipped our AI copilot in six weeks. It felt like hiring a founding team, not an agency.",
    name: "Maya Osei",
    role: "CEO, Aster",
    tone: "bg-white",
  },
  {
    q: "The most opinionated, least generic studio we've worked with. Everything they touch looks intentional.",
    name: "Daniel Reeve",
    role: "CPO, Resonar",
    tone: "bg-sage",
  },
  {
    q: "They treat evals and design with the same seriousness. Rare and exactly what we needed.",
    name: "Lena Brandt",
    role: "VP Eng, Northwind",
    tone: "bg-white",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-dotted-sage" data-testid="testimonials">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Overline>Kind words</Overline>
        <h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl text-charcoal">
          People we&apos;ve <span className="text-wine">built with.</span>
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {QUOTES.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} y={30}>
              <figure
                className={`flex h-full flex-col justify-between rounded-2xl border-[3px] border-ink ${t.tone} p-7 shadow-brutal-lg ${
                  i === 1 ? "md:mt-10" : ""
                }`}
                data-testid={`testimonial-${i}`}
              >
                <blockquote className="font-display text-xl font-bold leading-snug tracking-tight text-charcoal">
                  “{t.q}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t-[3px] border-ink pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-ink bg-wine font-display font-bold text-ivory">
                    {t.name[0]}
                  </span>
                  <span>
                    <span className="block font-bold text-charcoal">{t.name}</span>
                    <span className="block font-mono-plex text-xs uppercase tracking-widest opacity-70">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
