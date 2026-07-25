"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BrutalButton, Overline } from "./Primitives";
import { ScribbleUnderline, Star, Asterisk, CurvedArrow, Circle } from "./Doodles";

const ROLLING_WORDS = [
  "software",
  "copilots",
  "platforms",
  "agents",
  "products",
];

const lineParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
    },
  },
};

const lineChild = {
  hidden: {
    y: "110%",
  },
  show: {
    y: "0%",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const Hero: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROLLING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Force autoplay video programmatically for both video reels across all browsers
  useEffect(() => {
    [videoRef1.current, videoRef2.current].forEach((video) => {
      if (video) {
        video.defaultMuted = true;
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn("Video autoplay prevented:", error);
          });
        }
      }
    });
  }, []);

  const yImg1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yImg2 = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden bg-dotted pt-36 pb-24 sm:pt-44 sm:pb-32"
      data-testid="hero"
    >
      {/* Dynamic Animated Ambient Background Glows */}
      <motion.div
        className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-wine/10 blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-sage/30 blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <Star className="absolute left-[6%] top-[22%] h-8 w-8 sm:h-10 sm:w-10 z-10" />
      <Asterisk
        className="absolute right-[10%] top-[16%] h-10 w-10 hidden sm:block z-10"
        color="#6E8F74"
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 lg:pl-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Overline>WebCore — AI & Software Studio</Overline>
            </motion.div>

            <motion.h1
              variants={lineParent}
              initial="hidden"
              animate="show"
              className="mt-6 font-display font-extrabold leading-[0.95] tracking-tight text-charcoal text-[2.6rem] sm:text-6xl lg:text-[4.2rem]"
            >
              <span className="block overflow-hidden">
                <motion.span variants={lineChild} className="block">
                  We build
                </motion.span>
              </span>

              {/* Rolling Text Line */}
              <span className="block overflow-visible py-1">
                <motion.span variants={lineChild} className="block">
                  <span className="text-wine">AI </span>
                  <span className="relative inline-flex items-center overflow-hidden align-bottom h-[1.45em] min-w-[340px] sm:min-w-[480px] lg:min-w-[600px] px-1 pb-5">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={wordIndex}
                        initial={{ y: "100%", opacity: 0, rotateX: -60 }}
                        animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                        exit={{ y: "-100%", opacity: 0, rotateX: 60 }}
                        transition={{
                          duration: 0.48,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute left-1 top-0 inline-block text-wine whitespace-nowrap pr-8 pb-5"
                        style={{ perspective: 1000 }}
                      >
                        {ROLLING_WORDS[wordIndex]}
                        <ScribbleUnderline className="absolute bottom-0 left-0 h-4 w-full" />
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span variants={lineChild} className="block">
                  with a human
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span variants={lineChild} className="block">
                  signature.
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="mt-8 max-w-md text-lg text-charcoal/80 lg:ml-10 font-body"
            >
              A design-led studio shipping intelligent products — from LLM copilots to full platforms — crafted like objects, not templates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-4 lg:ml-10"
            >
              <BrutalButton
                as="a"
                href="#contact"
                variant="wine"
                data-testid="hero-cta-primary"
              >
                Start a project <ArrowUpRight size={16} />
              </BrutalButton>
              <BrutalButton
                as="a"
                href="#work"
                variant="ivory"
                data-testid="hero-cta-secondary"
              >
                View our work
              </BrutalButton>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative h-[380px] sm:h-[460px]">
            {/* Top Parallax Floating Cinematic Video Card 1 */}
            <motion.div
              style={{ y: yImg1, rotate }}
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.04, rotate: -2 }}
              className="absolute right-0 top-0 w-[82%] sm:w-[78%] rotate-[-4deg] rounded-2xl border-[3px] border-ink bg-black shadow-brutal-lg overflow-hidden cursor-pointer transition-all hover:shadow-brutal-xl z-10"
            >
              <div className="relative">
                <video
                  ref={videoRef1}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  src="/videos/hero_cinematic.mp4"
                  className="h-60 sm:h-64 w-full object-cover"
                />
                <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border-[2px] border-ink bg-wine/95 px-2.5 py-1 font-mono-plex text-[0.65rem] font-bold uppercase tracking-widest text-ivory backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
                  LIVE REEL 01
                </span>
              </div>
              <div className="flex items-center justify-between border-t-[3px] border-ink px-4 py-2.5 font-mono-plex text-xs uppercase bg-ivory">
                <span className="font-bold text-charcoal">Case_01: AI App Showcase</span>
                <span className="text-wine font-extrabold">LOOPING ✦</span>
              </div>
            </motion.div>

            {/* Bottom Parallax Floating Cinematic Video Card 2 */}
            <motion.div
              style={{ y: yImg2 }}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{ scale: 1.05, rotate: 3 }}
              className="absolute left-0 bottom-2 w-[64%] rotate-[5deg] rounded-2xl border-[3px] border-ink bg-black shadow-brutal overflow-hidden cursor-pointer transition-all hover:shadow-brutal-lg z-20"
            >
              <div className="relative">
                <video
                  ref={videoRef2}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  src="/videos/hero_cinematic_2.mp4"
                  className="h-44 sm:h-48 w-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full border-[2px] border-ink bg-wine/95 px-2 py-0.5 font-mono-plex text-[0.6rem] font-bold uppercase tracking-widest text-ivory backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
                  REEL 02
                </span>
              </div>
              <div className="flex items-center justify-between border-t-[3px] border-ink px-3 py-2 font-mono-plex text-[0.7rem] uppercase bg-ivory">
                <span className="font-bold text-charcoal">Case_02: Spatial Product</span>
                <span className="text-wine font-extrabold">SHIPPED ✦</span>
              </div>
            </motion.div>

            {/* Floating Handwritten Badge */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-8, -4, -8],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute -left-4 top-4 rounded-xl border-[3px] border-ink bg-ivory px-3 py-1.5 shadow-brutal z-30"
            >
              <span className="font-hand text-2xl text-wine select-none">shipped in weeks ✦</span>
            </motion.div>

            <CurvedArrow className="absolute -bottom-6 left-1/2 h-16 w-20 hidden lg:block z-30" />
          </div>
        </div>

        {/* Animated Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex flex-wrap gap-x-10 gap-y-4 border-t-[3px] border-ink pt-6 font-mono-plex text-xs uppercase tracking-widest text-charcoal"
        >
          <motion.span whileHover={{ scale: 1.05, color: "#7A2E3A" }} className="cursor-pointer transition-colors">
            ◆ 60+ products shipped
          </motion.span>
          <motion.span whileHover={{ scale: 1.05, color: "#7A2E3A" }} className="cursor-pointer transition-colors">
            ◆ 12 industries
          </motion.span>
          <motion.span whileHover={{ scale: 1.05, color: "#7A2E3A" }} className="cursor-pointer transition-colors">
            ◆ 98% client retention
          </motion.span>
          <motion.span whileHover={{ scale: 1.05 }} className="text-wine font-bold cursor-pointer">
            ◆ Est. 2019
          </motion.span>
        </motion.div>
      </div>

      <Circle className="absolute right-[14%] bottom-[8%] h-14 w-28 hidden lg:block z-10" />
    </section>
  );
};
