"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrutalButton } from "./Primitives";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Studio", href: "#studio" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4"
      data-testid="navbar"
    >
      <nav
        className={`mx-auto max-w-6xl flex items-center justify-between rounded-full border-[3px] border-ink px-5 sm:px-6 py-3 transition-all duration-300 ${
          scrolled ? "bg-ivory shadow-brutal" : "bg-ivory/80 backdrop-blur-sm"
        }`}
      >
        <a href="#top" className="flex items-center gap-2" data-testid="logo">
          <span className="grid h-8 w-8 place-items-center rounded-lg border-[3px] border-ink bg-wine text-ivory font-display font-extrabold text-lg">
            W
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-charcoal">
            WebCore
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono-plex text-xs uppercase tracking-widest text-charcoal hover:text-wine transition-colors"
                data-testid={`nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <BrutalButton
            as="a"
            href="#contact"
            variant="wine"
            className="px-5 py-2.5 text-xs"
            data-testid="nav-cta"
          >
            Start a project
          </BrutalButton>
        </div>

        <button
          className="md:hidden grid h-10 w-10 place-items-center rounded-lg border-[3px] border-ink bg-sage text-charcoal cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-auto mt-3 max-w-6xl rounded-2xl border-[3px] border-ink bg-ivory p-5 shadow-brutal"
            data-testid="mobile-menu"
          >
            <ul className="flex flex-col gap-4">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl font-bold text-charcoal hover:text-wine transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <BrutalButton
              as="a"
              href="#contact"
              variant="wine"
              className="mt-5 w-full"
              onClick={() => setOpen(false)}
            >
              Start a project
            </BrutalButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
