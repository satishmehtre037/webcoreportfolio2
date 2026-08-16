"use client";

import React from "react";
import Link from "next/link";
import { AnimatedWLogo } from "./Navbar";
import { Squiggle } from "./Doodles";
import { Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative border-t-[3px] border-ink bg-charcoal text-ivory overflow-hidden"
      data-testid="footer"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <a href="#top" className="flex items-center gap-3 w-fit" data-testid="footer-logo">
              <AnimatedWLogo borderColor="border-ivory" />
              <span className="font-display text-2xl sm:text-[1.65rem] font-extrabold tracking-tight text-ivory select-none">
                WebCore
              </span>
            </a>
            <p className="mt-5 max-w-sm text-ivory/60 font-body text-sm leading-relaxed">
              A design-led AI & software studio building high-performance web platforms with precision craft.
            </p>
            <Squiggle className="mt-6 h-8 w-36" color="#A5C3A5" />
          </div>

          {/* Quick Navigation Column */}
          <div className="md:col-span-3">
            <h4 className="font-mono-plex text-xs uppercase tracking-widest text-sage">
              Navigation &amp; Legal
            </h4>
            <ul className="mt-4 space-y-2 font-body text-sm">
              <li>
                <a href="#work" className="text-ivory/70 hover:text-ivory transition-colors">
                  Work &amp; Case Studies
                </a>
              </li>
              <li>
                <a href="#services" className="text-ivory/70 hover:text-ivory transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-ivory/70 hover:text-ivory transition-colors">
                  Contact &amp; Briefs
                </a>
              </li>
              <li className="pt-2">
                <Link href="/privacy-policy" className="text-ivory/70 hover:text-ivory transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-ivory/70 hover:text-ivory transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Connect Column */}
          <div className="md:col-span-4">
            <h4 className="font-mono-plex text-xs uppercase tracking-widest text-sage">
              Connect With Us
            </h4>
            <ul className="mt-4 space-y-3 font-body text-sm">
              <li>
                <a
                  href="mailto:hello@webcorestudio.dev"
                  className="inline-flex items-center gap-2 text-ivory/80 hover:text-ivory transition-colors font-mono-plex text-xs"
                >
                  <Mail size={15} className="text-sage" /> hello@webcorestudio.dev
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/webcore-undefined-834157425/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ivory/80 hover:text-ivory transition-colors"
                >
                  <svg className="h-4 w-4 fill-current text-sage" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/webcorestudioss?igsh=MW95ZWE5b2lmOHR6Ng=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ivory/80 hover:text-ivory transition-colors"
                >
                  <svg className="h-4 w-4 fill-current text-sage" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram (@webcorestudioss)
                </a>
              </li>
            </ul>
          </div>
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
          <span>© {new Date().getFullYear()} WebCore Studio. All rights reserved.</span>
          <span className="font-hand text-lg normal-case tracking-normal text-sage">
            crafted, not generated ✦
          </span>
        </div>
      </div>
    </footer>
  );
};
