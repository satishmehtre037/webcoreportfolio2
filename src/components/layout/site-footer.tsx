"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Container } from "@/components/atoms/container";
import { Logo } from "@/components/atoms/logo";
import { NAV_LINKS, SITE } from "@/lib/constants/site";

export function SiteFooter() {
  const wordmarkRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !wordmarkRef.current) return;

    const tween = gsap.fromTo(
      wordmarkRef.current,
      { xPercent: 2 },
      {
        xPercent: -2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <footer className="relative overflow-hidden bg-ink text-canvas">
      <Container className="relative z-10 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-canvas/70">
              {SITE.description}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-canvas/60">
              Studio
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-canvas/85 transition-colors hover:text-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-canvas/60">
              Connect
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-mint">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.social.linkedin} className="hover:text-mint">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={SITE.social.x} className="hover:text-mint">
                  X / Twitter
                </a>
              </li>
              <li>
                <a href={SITE.social.github} className="hover:text-mint">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-canvas/15 pt-6 text-xs text-canvas/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WebCore. All rights reserved.</p>
          <p className="font-accent text-sm text-mint">Built with intent, not templates ✦</p>
        </div>
      </Container>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden pb-6 pt-2">
        <p
          ref={wordmarkRef}
          className="whitespace-nowrap text-center font-display text-[clamp(4rem,18vw,12rem)] font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(168,213,186,0.35)]"
        >
          WEBCORE
        </p>
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute bottom-32 left-0 hidden w-full text-mint/40 lg:block"
        viewBox="0 0 1200 80"
        fill="none"
      >
        <path
          d="M0 40 C200 10, 400 70, 600 40 S1000 10, 1200 40"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </footer>
  );
}
