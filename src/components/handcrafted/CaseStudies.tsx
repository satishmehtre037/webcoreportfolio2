"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Overline, Reveal, BrutalButton } from "./Primitives";
import { Circle } from "./Doodles";

interface CaseStudy {
  tag: string;
  title: string;
  body: string;
  metric: string;
  img?: string;
  video?: string;
  bg: string;
  link?: string;
  ctaText?: string;
}

const CASES: CaseStudy[] = [
  {
    tag: "Fullstack Web Application",
    title: "Class Management Platform — Education Ops",
    body: "A comprehensive fullstack class management web application engineered for modern educational institutions, streamlining student rosters, course scheduling, attendance tracking, and automated administrative workflows.",
    metric: "100% Automated Ops",
    video: "/videos/work_case_1.mp4",
    bg: "bg-sage",
    link: "https://rkdeamy.vercel.app",
    ctaText: "View Live Project",
  },
  {
    tag: "Boutique E-Commerce & Brand",
    title: "Caffè Florian — Luxury Coffee Roastery",
    body: "A high-end web experience and interactive platform engineered for Caffè Florian, featuring bespoke animations, fluid showcase layouts, seamless ordering, and luxury brand storytelling.",
    metric: "Sub-Second UX & Speed",
    video: "/videos/work_case_2.mp4",
    bg: "bg-wine text-ivory",
    link: "https://caffe-florian.vercel.app",
    ctaText: "View Live Project",
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
            const isExternalLink = c.link?.startsWith("http");

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
                      {c.video ? (
                        <video
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          src={c.video}
                          className="h-72 w-full object-cover sm:h-[26rem]"
                          ref={(el) => {
                            if (el) {
                              el.defaultMuted = true;
                              el.muted = true;
                              el.play().catch(() => {});
                            }
                          }}
                        />
                      ) : (
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
                      )}
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
                    <p className="mt-4 text-charcoal/75 font-body leading-relaxed">{c.body}</p>
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
                        href={c.link || "#contact"}
                        target={isExternalLink ? "_blank" : undefined}
                        rel={isExternalLink ? "noopener noreferrer" : undefined}
                        variant="wine"
                        data-testid={`case-cta-${i}`}
                      >
                        {c.ctaText || (isExternalLink ? "View Live Project" : "Read the story")} <ArrowUpRight size={16} />
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
