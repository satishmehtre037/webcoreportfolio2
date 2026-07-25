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
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-wine pointer-events-none"
        >
          {/* Crazy High-Fashion Calligraphic W Vector Artwork */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
            exit={{ scale: 0.45, y: -160, opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-56 w-56 sm:h-80 sm:w-80 text-ivory drop-shadow-2xl"
            >
              {/* Crazy Signature W Calligraphy Stroke */}
              <motion.path
                d="M 10 24 C 18 10, 24 8, 28 10 C 22 45, 20 82, 34 82 C 48 82, 51 40, 55 24 C 59 40, 60 82, 74 82 C 88 82, 86 38, 82 14 C 88 20, 94 24, 96 24"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.35,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15,
                }}
              />

              {/* High-Tech Accent Flourish Loop */}
              <motion.path
                d="M 28 10 C 35 10, 42 16, 45 22"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  delay: 0.9,
                }}
              />

              {/* Signature Terminal Sparkle Asterisk Dot */}
              <motion.circle
                cx="94"
                cy="14"
                r="3.5"
                fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 1.2,
                  type: "spring",
                  stiffness: 400,
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
