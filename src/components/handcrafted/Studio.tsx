"use client";

import React from "react";
import { motion } from "framer-motion";
import { Overline, Reveal } from "./Primitives";
import { Star } from "./Doodles";

const STATS = [
  { k: "60+", v: "Products shipped" },
  { k: "12", v: "Industries served" },
  { k: "98%", v: "Client retention" },
  { k: "6yr", v: "Avg. team seniority" },
];

export const Studio: React.FC = () => {
  return (
    <section id="studio" className="relative py-24 sm:py-32" data-testid="studio">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="overflow-hidden rounded-2xl border-[3px] border-ink shadow-brutal-lg bg-black cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1781116780189-85387493f7e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
                alt="WebCore studio team"
                className="h-[26rem] w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [6, 9, 6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -right-4 rounded-xl border-[3px] border-ink bg-sage px-4 py-2 shadow-brutal select-none"
            >
              <span className="font-hand text-2xl text-charcoal">made by humans ✦</span>
            </motion.div>
            
            <Star className="absolute -left-5 -top-5 h-10 w-10 z-10" />
          </div>

          <div className="lg:col-span-7 lg:pl-10">
            <Overline>The studio</Overline>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl text-charcoal">
              A small, senior team obsessed with the details machines skip.
            </h2>
            <p className="mt-6 max-w-lg text-charcoal/75 font-body">
              WebCore is a design-led AI studio. We pair strategists, product designers and engineers on every build — so intelligence, taste and craft never get lost in translation.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.k} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "8px 8px 0px #111111" }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className="rounded-2xl border-[3px] border-ink bg-white p-5 shadow-brutal cursor-pointer"
                  >
                    <div className="font-display text-4xl font-extrabold tracking-tight text-wine">
                      {s.k}
                    </div>
                    <div className="mt-1 font-mono-plex text-[0.65rem] uppercase tracking-widest opacity-70 font-semibold">
                      {s.v}
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
