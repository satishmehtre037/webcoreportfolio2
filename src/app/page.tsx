"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { Navbar } from "@/components/handcrafted/Navbar";
import { Hero } from "@/components/handcrafted/Hero";
import { Marquee } from "@/components/handcrafted/Marquee";
import { Services } from "@/components/handcrafted/Services";
import { CaseStudies } from "@/components/handcrafted/CaseStudies";
import { Studio } from "@/components/handcrafted/Studio";
import { Manifesto } from "@/components/handcrafted/Manifesto";
import { Testimonials } from "@/components/handcrafted/Testimonials";
import { VerticalShowcase } from "@/components/handcrafted/VerticalShowcase";
import { Contact } from "@/components/handcrafted/Contact";
import { Footer } from "@/components/handcrafted/Footer";

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="min-h-screen bg-ivory text-charcoal paper-grain">
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <CaseStudies />
      <Studio />
      <Manifesto />
      <Testimonials />
      <VerticalShowcase />
      <Contact />
      <Footer />
    </main>
  );
}
