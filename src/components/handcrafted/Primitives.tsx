"use client";

import React from "react";
import { motion } from "framer-motion";

interface BrutalButtonProps {
  variant?: "primary" | "wine" | "ivory" | "forest";
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  id?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  as = "button",
  href,
  target,
  rel,
  onClick,
  id,
  title,
  type = "button",
  disabled,
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 border-[3px] border-ink rounded-full px-7 py-3.5 font-display font-bold uppercase tracking-widest text-sm shadow-brutal transition-colors duration-200 cursor-pointer select-none";

  const variants = {
    primary: "bg-sage text-charcoal hover:bg-ivory",
    wine: "bg-wine text-ivory hover:bg-charcoal",
    ivory: "bg-ivory text-charcoal hover:bg-wine hover:text-ivory",
    forest: "bg-forest text-ivory hover:bg-wine",
  };

  if (as === "a" || href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        id={id}
        title={title}
        whileHover={{ y: -4, x: -2, boxShadow: "8px 8px 0px #111111" }}
        whileTap={{ y: 0, x: 0, boxShadow: "4px 4px 0px #111111" }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      id={id}
      title={title}
      type={type}
      disabled={disabled}
      whileHover={{ y: -4, x: -2, boxShadow: "8px 8px 0px #111111" }}
      whileTap={{ y: 0, x: 0, boxShadow: "4px 4px 0px #111111" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 40,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

interface OverlineProps {
  children: React.ReactNode;
  className?: string;
}

export const Overline: React.FC<OverlineProps> = ({
  children,
  className = "",
}) => (
  <span
    className={`inline-flex items-center font-mono-plex text-xs uppercase tracking-[0.25em] text-wine ${className}`}
  >
    {children}
  </span>
);
