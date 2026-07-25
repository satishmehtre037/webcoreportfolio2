"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Container } from "@/components/atoms/container";
import { Logo } from "@/components/atoms/logo";
import { NeoButton } from "@/components/atoms/neo-button";
import { NAV_LINKS } from "@/lib/constants/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isDark = mounted && (resolvedTheme ?? theme) === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4">
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-full border-2 border-ink bg-canvas/90 px-4 py-2.5 shadow-[0_4px_0_0_var(--ink)] backdrop-blur-md transition-shadow",
            scrolled && "shadow-[0_6px_0_0_var(--ink)]",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="inline-flex size-10 items-center justify-center rounded-full border-2 border-ink/15 text-ink transition-colors hover:bg-ink/5"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <NeoButton href="#contact" variant="primary" className="px-5 py-2.5">
              Start a project
            </NeoButton>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border-2 border-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[4.5rem] z-40 bg-canvas/95 backdrop-blur-md md:hidden"
        >
          <Container className="flex h-full flex-col gap-6 py-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-bold text-ink"
              >
                {link.label}
              </Link>
            ))}
            <NeoButton href="#contact" onClick={() => setOpen(false)}>
              Start a project
            </NeoButton>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
