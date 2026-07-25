"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/atoms/container";
import { Reveal } from "@/components/atoms/reveal";
import { SectionHeading } from "@/components/molecules/section-heading";
import { processSteps } from "@/lib/data/process";

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-process-row]",
        { opacity: 0.35, x: -12 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scroll-mt-28 bg-sage py-20 text-sage-foreground sm:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title="Four phases. Zero fog."
            description="A transparent rhythm from discovery through launch — designed for founders and product leaders who need signal, not noise."
            titleClassName="text-sage-foreground"
          />
        </Reveal>

        <div className="mt-14 space-y-0">
          {processSteps.map((step) => (
            <article
              key={step.id}
              data-process-row
              className="grid gap-4 border-t border-sage-foreground/25 py-10 sm:grid-cols-[120px_1fr_1.2fr] sm:items-start sm:gap-8"
            >
              <p className="font-display text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.55)] sm:text-6xl">
                {step.number}
              </p>
              <h3 className="font-display text-2xl font-bold sm:text-3xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-sage-foreground/85 sm:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
