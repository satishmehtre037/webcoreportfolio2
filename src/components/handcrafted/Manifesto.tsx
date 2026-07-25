import React from "react";
import { Overline, Reveal } from "./Primitives";

const CHAPTERS = [
  {
    n: "01",
    title: "Craft over templates",
    body: "Every pixel and endpoint is intentional. We reject the AI-slop aesthetic — no purple gradients, no borrowed layouts. Software should feel authored.",
  },
  {
    n: "02",
    title: "Ship small, ship sharp",
    body: "We prize momentum. Tight loops, honest demos and working software beat perfect decks. Weeks, not quarters.",
  },
  {
    n: "03",
    title: "AI with a conscience",
    body: "Models are tools, not magic. We build systems with evals, guardrails and taste — intelligence you can actually trust in production.",
  },
  {
    n: "04",
    title: "One team, no fog",
    body: "Strategy, design and engineering sit together. No hand-offs, no telephone game — just senior people who own the outcome.",
  },
];

export const Manifesto: React.FC = () => {
  return (
    <section
      id="manifesto"
      className="relative overflow-hidden border-y-[3px] border-ink bg-forest py-24 text-ivory sm:py-32"
      data-testid="manifesto"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Overline className="text-sage">Our manifesto</Overline>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl text-ivory">
          Four beliefs we{" "}
          <span className="font-hand text-5xl text-sage sm:text-7xl">won&apos;t</span>{" "}
          compromise.
        </h2>

        <div className="mt-16 space-y-4">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.05}>
              <div className="group relative grid grid-cols-1 items-center gap-4 border-t-[3px] border-ivory/40 py-8 md:grid-cols-12">
                <span
                  className="pointer-events-none select-none font-display text-[5rem] font-extrabold leading-none text-transparent md:col-span-3 md:text-[7rem]"
                  style={{ WebkitTextStroke: "2px #A5C3A5" }}
                >
                  {c.n}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight md:col-span-4 sm:text-3xl text-ivory">
                  {c.title}
                </h3>
                <p className="text-ivory/75 md:col-span-5 font-body">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
