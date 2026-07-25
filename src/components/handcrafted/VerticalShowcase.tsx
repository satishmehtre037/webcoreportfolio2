"use client";

import React from "react";
import { motion } from "framer-motion";
import { Overline, Reveal } from "./Primitives";
import { Star, Squiggle } from "./Doodles";

const COL1 = [
  {
    title: "Aster Copilot",
    category: "AI E-Commerce",
    img: "https://images.unsplash.com/photo-1695479044464-67299fa84782?crop=entropy&cs=srgb&fm=jpg&q=85&w=700",
    color: "bg-sage",
  },
  {
    title: "Resonar Sound",
    category: "Audio Platform",
    img: "https://images.unsplash.com/photo-1761005653783-a48d969a3043?crop=entropy&cs=srgb&fm=jpg&q=85&w=700",
    color: "bg-wine text-ivory",
  },
  {
    title: "Monolith Intelligence",
    category: "LLM Systems",
    img: "https://images.unsplash.com/photo-1781116780189-85387493f7e2?crop=entropy&cs=srgb&fm=jpg&q=85&w=700",
    color: "bg-ivory",
  },
];

const COL2 = [
  {
    title: "Kairo Mobile",
    category: "Design System",
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?crop=entropy&cs=srgb&fm=jpg&q=85&w=700",
    color: "bg-forest text-ivory",
  },
  {
    title: "Aura Skincare",
    category: "Brand & Web",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=srgb&fm=jpg&q=85&w=700",
    color: "bg-sage",
  },
  {
    title: "Vortex Analytics",
    category: "Realtime Data",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=700",
    color: "bg-white",
  },
];

export const VerticalShowcase: React.FC = () => {
  return (
    <section
      id="showcase"
      className="relative overflow-hidden border-t-[3px] border-ink bg-dotted py-24 sm:py-32"
      data-testid="vertical-showcase"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Text Column */}
          <div className="lg:col-span-5">
            <Overline>Studio Showcase</Overline>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl text-charcoal">
              Crafted in detail. <span className="text-wine">Built for speed.</span>
            </h2>
            <p className="mt-6 text-charcoal/75 font-body text-lg leading-relaxed">
              Explore a living reel of our recent product launches — from custom LLM interfaces to spatial audio design systems.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-hand text-2xl text-wine">continuous motion ✦</span>
              <Squiggle className="h-6 w-28" color="#7A2E3A" />
            </div>
          </div>

          {/* Right Dual Vertical Sliding Columns */}
          <div className="lg:col-span-7 relative h-[520px] sm:h-[600px] overflow-hidden rounded-3xl border-[3px] border-ink bg-charcoal p-4 shadow-brutal-xl">
            {/* Soft Top/Bottom Gradient Overlay Masks */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-charcoal to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-20 bg-gradient-to-t from-charcoal to-transparent" />

            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Column 1: Moves UP */}
              <motion.div
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex flex-col gap-4"
              >
                {[...COL1, ...COL1].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className={`group relative overflow-hidden rounded-2xl border-[3px] border-ink ${item.color} p-3 shadow-brutal transition-shadow hover:shadow-brutal-lg cursor-pointer`}
                  >
                    <div className="overflow-hidden rounded-xl border-[2px] border-ink bg-black">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between px-1">
                      <span className="font-display font-bold text-sm">
                        {item.title}
                      </span>
                      <span className="font-mono-plex text-[0.65rem] uppercase tracking-widest opacity-80">
                        {item.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Column 2: Moves DOWN */}
              <motion.div
                animate={{ y: ["-50%", "0%"] }}
                transition={{
                  duration: 22,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex flex-col gap-4"
              >
                {[...COL2, ...COL2].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className={`group relative overflow-hidden rounded-2xl border-[3px] border-ink ${item.color} p-3 shadow-brutal transition-shadow hover:shadow-brutal-lg cursor-pointer`}
                  >
                    <div className="overflow-hidden rounded-xl border-[2px] border-ink bg-black">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between px-1">
                      <span className="font-display font-bold text-sm">
                        {item.title}
                      </span>
                      <span className="font-mono-plex text-[0.65rem] uppercase tracking-widest opacity-80">
                        {item.category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Star className="absolute right-[5%] top-[12%] h-10 w-10 z-10" color="#6E8F74" />
    </section>
  );
};
