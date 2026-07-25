"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, PenTool, Boxes, Rocket, ChartLine, Sparkles } from "lucide-react";
import { Overline, Reveal } from "./Primitives";
import { Asterisk } from "./Doodles";

const SERVICES = [
  {
    icon: Brain,
    title: "AI Engineering",
    desc: "Production LLM systems, RAG pipelines, agents and evals that actually ship.",
    tone: "bg-white text-charcoal",
    offset: "lg:mt-0",
  },
  {
    icon: PenTool,
    title: "Product Design",
    desc: "Editorial interfaces and design systems with a distinct, human signature.",
    tone: "bg-sage text-charcoal",
    offset: "lg:mt-12",
  },
  {
    icon: Boxes,
    title: "Platform Builds",
    desc: "Full-stack web apps, dashboards and APIs engineered to scale calmly.",
    tone: "bg-white text-charcoal",
    offset: "lg:mt-4",
  },
  {
    icon: Rocket,
    title: "MVP Sprints",
    desc: "Zero-to-one launches in weeks, not quarters — opinionated and fast.",
    tone: "bg-forest text-ivory",
    offset: "lg:mt-16",
  },
  {
    icon: ChartLine,
    title: "Growth & Data",
    desc: "Analytics, experimentation and instrumentation baked into the product.",
    tone: "bg-white text-charcoal",
    offset: "lg:mt-2",
  },
  {
    icon: Sparkles,
    title: "Brand Systems",
    desc: "Naming, identity and motion languages that feel crafted, not generated.",
    tone: "bg-sage text-charcoal",
    offset: "lg:mt-10",
  },
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-24 sm:py-32" data-testid="services">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Overline>What we do</Overline>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl text-charcoal">
              Capabilities, <span className="text-wine">stacked</span> not siloed.
            </h2>
          </div>
          <p className="max-w-xs text-charcoal/70 sm:text-right font-body">
            One senior team across strategy, design and engineering — no hand-offs, no fog.
          </p>
        </div>

        <Asterisk className="mx-auto my-10 h-8 w-8 sm:hidden" />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className={s.offset}>
              <motion.article
                whileHover={{
                  y: -10,
                  x: -3,
                  boxShadow: "10px 10px 0px #111111",
                }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`group h-full rounded-2xl border-[3px] border-ink ${s.tone} p-7 shadow-brutal-lg cursor-pointer`}
                data-testid={`service-card-${i}`}
              >
                <div className="flex items-center justify-between">
                  <motion.span
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="grid h-12 w-12 place-items-center rounded-xl border-[3px] border-ink bg-ivory text-charcoal shadow-brutal"
                  >
                    <s.icon size={22} />
                  </motion.span>
                  <span className="font-mono-plex text-xs opacity-60">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-80 font-body">
                  {s.desc}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
