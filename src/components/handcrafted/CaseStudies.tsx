"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Overline, Reveal, BrutalButton } from "./Primitives";
import { Circle } from "./Doodles";

const CASES = [
  {
    tag: "AI Retail Copilot",
    title: "Aster — a shopping assistant that sells",
    body: "We designed and built an LLM copilot that lifted conversion 34% for a DTC skincare brand, from prompt architecture to the storefront UI.",
    metric: "+34% conversion",
    img: "https://images.unsplash.com/photo-1695479044464-67299fa84782?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    bg: "bg-sage",
  },
  {
    tag: "Audio Platform",
    title: "Resonar — spatial sound, reimagined",
    body: "A ground-up web platform and design system for a next-gen audio startup, complete with a realtime dashboard and brand identity.",
    metric: "0 → 40k users",
    img: "https://images.unsplash.com/photo-1761005653783-a48d969a3043?crop=entropy&cs=srgb&fm=jpg&q=85&w=900",
    bg: "bg-wine",
  },
];

export const CaseStudies: React.FC = () => {
  return (
    <section id="work" className="relative py-24 sm:py-32" data-testid="case-studies">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <Overline>Selected work</Overline>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl text-charcoal">
              Proof, <span className="text-wine">not promises.</span>
            </h2>
          </div>
          <Circle className="hidden h-16 w-32 sm:block" color="#6E8F74" />
        </div>

        <div className="mt-16 space-y-24">
          {CASES.map((c, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={c.title}>
                <article
                  className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
                  data-testid={`case-${i}`}
                >
                  <motion.div
                    whileHover="hover"
                    initial="initial"
                    className={`relative lg:col-span-7 cursor-pointer ${flip ? "lg:order-2" : ""}`}
                  >
                    <motion.div
                      variants={{
                        initial: { x: 16, y: 16 },
                        hover: { x: 24, y: 24 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`absolute inset-0 rounded-2xl border-[3px] border-ink ${c.bg}`}
                    />
                    <motion.div
                      variants={{
                        initial: { x: 0, y: 0 },
                        hover: { x: -4, y: -4 },
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative overflow-hidden rounded-2xl border-[3px] border-ink bg-black shadow-brutal-lg"
                    >
                      <motion.img
                        variants={{
                          initial: { scale: 1 },
                          hover: { scale: 1.06 },
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                        src={c.img}
                        alt={c.title}
                        className="h-72 w-full object-cover sm:h-[26rem]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent,rgba(0,0,0,0.45))]" />
                      <span className="absolute left-4 top-4 rounded-full border-[3px] border-ink bg-ivory px-4 py-1.5 font-mono-plex text-xs uppercase tracking-widest text-charcoal shadow-brutal font-bold">
                        {c.tag}
                      </span>
                    </motion.div>
                  </motion.div>

                  <div
                    className={`lg:col-span-5 ${
                      flip ? "lg:order-1 lg:pr-6" : "lg:pl-6"
                    }`}
                  >
                    <span className="font-hand text-3xl text-wine">
                      Case 0{i + 1}
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl text-charcoal">
                      {c.title}
                    </h3>
                    <p className="mt-4 text-charcoal/75 font-body">{c.body}</p>
                    <motion.div
                      whileHover={{ scale: 1.04, rotate: 1 }}
                      className="mt-6 inline-flex items-center gap-3 rounded-xl border-[3px] border-ink bg-ivory px-5 py-3 shadow-brutal transition-shadow cursor-default"
                    >
                      <span className="font-display text-2xl font-extrabold text-wine">
                        {c.metric}
                      </span>
                    </motion.div>
                    <div className="mt-8">
                      <BrutalButton
                        as="a"
                        href="#contact"
                        variant="ivory"
                        data-testid={`case-cta-${i}`}
                      >
                        Read the story <ArrowUpRight size={16} />
                      </BrutalButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
