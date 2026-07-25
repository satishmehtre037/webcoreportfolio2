"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SplashScreen: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ivory bg-dotted paper-grain pointer-events-none"
        >
          {/* Centered Large W Logo Badge */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-3xl border-[4px] border-ink bg-wine text-ivory shadow-brutal-xl"
          >
            <svg
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-ivory"
            >
              <motion.path
                d="M 4 7 L 9 21 L 14 10 L 19 21 L 24 7"
                stroke="currentColor"
                strokeWidth="3.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2,
                }}
              />
            </svg>
          </motion.div>

          {/* WebCore Brand Title & Studio Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-charcoal">
              WebCore
            </h1>
            <p className="mt-2 font-mono-plex text-xs uppercase tracking-[0.25em] text-wine font-bold">
              AI & Software Studio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
