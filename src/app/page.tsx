"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { SplashScreen } from "@/components/handcrafted/SplashScreen";
import { Navbar } from "@/components/handcrafted/Navbar";
import { Hero } from "@/components/handcrafted/Hero";
import { Marquee } from "@/components/handcrafted/Marquee";
import { Services } from "@/components/handcrafted/Services";
import { CaseStudies } from "@/components/handcrafted/CaseStudies";
import { Manifesto } from "@/components/handcrafted/Manifesto";
import { Testimonials } from "@/components/handcrafted/Testimonials";
import { VerticalShowcase } from "@/components/handcrafted/VerticalShowcase";
import { Contact } from "@/components/handcrafted/Contact";
import { Footer } from "@/components/handcrafted/Footer";

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    (window as unknown as { __lenis: Lenis }).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Global Smooth Scroll Interceptor for All #anchor buttons & links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetElement =
          href === "#top"
            ? document.body
            : document.querySelector<HTMLElement>(href);

        if (targetElement) {
          lenis.scrollTo(targetElement, {
            offset: -40,
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-ivory text-charcoal paper-grain">
      <SplashScreen />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <CaseStudies />
      <Manifesto />
      <Testimonials />
      <VerticalShowcase />
      <Contact />
      <Footer />
    </main>
  );
}
