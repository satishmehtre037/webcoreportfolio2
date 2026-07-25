"use client";

import React from "react";
import { AnimatedWLogo } from "./Navbar";
import { Squiggle } from "./Doodles";

const COLS = [
  {
    title: "Studio",
    links: ["Work", "Services", "Manifesto", "Studio"],
  },
  {
    title: "Connect",
    links: ["hello@webcore.studio", "LinkedIn", "X / Twitter", "Dribbble"],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative border-t-[3px] border-ink bg-charcoal text-ivory overflow-hidden"
      data-testid="footer"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <a href="#top" className="flex items-center gap-3 w-fit" data-testid="footer-logo">
              <AnimatedWLogo borderColor="border-ivory" />
              <span className="font-display text-2xl sm:text-[1.65rem] font-extrabold tracking-tight text-ivory select-none">
                WebCore
              </span>
            </a>
            <p className="mt-5 max-w-sm text-ivory/60 font-body">
              A design-led AI & software studio building intelligent products with a human signature.
            </p>
            <Squiggle className="mt-6 h-8 w-36" color="#A5C3A5" />
          </div>

          {COLS.map((c) => (
            <div key={c.title} className="md:col-span-3">
              <h4 className="font-mono-plex text-xs uppercase tracking-widest text-sage">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#top"
                      className="text-ivory/70 hover:text-ivory transition-colors text-sm font-body"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Giant Animated Marquee WEBCORE Text */}
      <div className="w-full overflow-hidden border-t-[3px] border-ivory/20 py-4 select-none">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="mx-6 flex items-center gap-8">
              <span
                className="font-display text-[15vw] font-extrabold leading-none tracking-tighter text-transparent"
                style={{ WebkitTextStroke: "2.5px #A5C3A5" }}
              >
                WEBCORE
              </span>
              <span className="text-sage text-[6vw] opacity-80">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 pb-12 pt-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between font-mono-plex text-xs uppercase tracking-widest text-ivory/50">
          <span>© {new Date().getFullYear()} WebCore Studio</span>
          <span className="font-hand text-lg normal-case tracking-normal text-sage">
            crafted, not generated ✦
          </span>
        </div>
      </div>
    </footer>
  );
};
