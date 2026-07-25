"use client";

import React from "react";
import { motion } from "framer-motion";

interface DoodleProps {
  className?: string;
  color?: string;
}

export const ScribbleUnderline: React.FC<DoodleProps> = ({
  className = "",
  color = "#7A2E3A",
}) => (
  <svg
    className={className}
    viewBox="0 0 300 24"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <motion.path
      d="M4 15C60 6 120 20 160 12C200 4 250 18 296 9"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
    />
  </svg>
);

export const Star: React.FC<DoodleProps> = ({
  className = "",
  color = "#7A2E3A",
}) => (
  <motion.svg
    className={className}
    viewBox="0 0 60 60"
    fill="none"
    aria-hidden="true"
    animate={{
      y: [0, -10, 0],
      rotate: [0, 12, -8, 0],
      scale: [1, 1.08, 1],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
  >
    <path
      d="M30 2C31 20 40 29 58 30C40 31 31 40 30 58C29 40 20 31 2 30C20 29 29 20 30 2Z"
      fill={color}
    />
  </motion.svg>
);

export const CurvedArrow: React.FC<DoodleProps> = ({
  className = "",
  color = "#111111",
}) => (
  <motion.svg
    className={className}
    viewBox="0 0 120 90"
    fill="none"
    aria-hidden="true"
    animate={{
      y: [0, -6, 0],
      x: [0, 4, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
  >
    <motion.path
      d="M8 8C40 10 92 22 96 66"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
    />
    <motion.path
      d="M78 58L96 70L106 50"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.6 }}
    />
  </motion.svg>
);

export const Squiggle: React.FC<DoodleProps> = ({
  className = "",
  color = "#6E8F74",
}) => (
  <svg className={className} viewBox="0 0 140 40" fill="none" aria-hidden="true">
    <motion.path
      d="M4 20C14 6 24 34 34 20C44 6 54 34 64 20C74 6 84 34 94 20C104 6 114 34 124 20C130 12 134 16 136 20"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
  </svg>
);

export const Asterisk: React.FC<DoodleProps> = ({
  className = "",
  color = "#7A2E3A",
}) => (
  <motion.svg
    className={className}
    viewBox="0 0 50 50"
    fill="none"
    aria-hidden="true"
    animate={{
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    }}
    transition={{
      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
      scale: { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
    }}
  >
    <g stroke={color} strokeWidth="5" strokeLinecap="round">
      <path d="M25 6V44" />
      <path d="M6 25H44" />
      <path d="M11 11L39 39" />
      <path d="M39 11L11 39" />
    </g>
  </motion.svg>
);

export const Circle: React.FC<DoodleProps> = ({
  className = "",
  color = "#7A2E3A",
}) => (
  <motion.svg
    className={className}
    viewBox="0 0 200 90"
    fill="none"
    aria-hidden="true"
    animate={{
      scale: [1, 1.04, 1],
      rotate: [0, 3, -3, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }}
  >
    <motion.path
      d="M100 8C40 8 8 25 8 45C8 68 55 82 108 82C160 82 192 64 192 44C192 26 160 12 120 10"
      stroke={color}
      strokeWidth="4"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </motion.svg>
);
