"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/atoms/container";
import { DotGridBackground } from "@/components/atoms/dot-grid-background";
import { NeoButton } from "@/components/atoms/neo-button";
import { Reveal } from "@/components/atoms/reveal";
import { SectionLabel } from "@/components/atoms/section-label";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&auto=format&fit=crop",
    alt: "Abstract gradient artwork representing product design",
    label: "Case 01",
    tag: "SaaS platform",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80&auto=format&fit=crop",
    alt: "Developer workspace with code on screen",
    label: "Case 02",
    tag: "AI tooling",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-36">
      <DotGridBackground />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div>
            <Reveal>
              <SectionLabel className="mb-6 flex items-center gap-2 text-ink/70">
                <Sparkles className="size-3.5 text-accent" aria-hidden />
                WebCore — software studio
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-tight text-ink">
                We engineer{" "}
                <span className="text-accent underline decoration-ink/30 decoration-2 underline-offset-[0.2em]">
                  digital products
                </span>{" "}
                with lasting clarity.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A senior team shipping full-stack software — from intelligent features to
                refined interfaces — built for real users and long-term ownership.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-4">
              <NeoButton href="#contact">Start a project</NeoButton>
              <NeoButton href="#work" variant="secondary">
                View selected work
              </NeoButton>
            </Reveal>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {heroImages.map((item, index) => (
              <Reveal
                key={item.label}
                delay={0.1 + index * 0.08}
                className={index === 0 ? "relative z-10" : "relative -mt-16 ml-12 sm:ml-20"}
              >
                <figure className="overflow-hidden rounded-[1.75rem] border-2 border-ink bg-canvas shadow-[0_8px_0_0_var(--ink)]">
                  <div className="relative aspect-[4/5] w-full sm:w-[min(100%,320px)]">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 320px"
                      priority={index === 0}
                    />
                  </div>
                  <figcaption className="flex items-center justify-between border-t-2 border-ink px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em]">
                    <span>{item.label}</span>
                    <span className="text-muted-foreground">{item.tag}</span>
                  </figcaption>
                </figure>
                {index === 0 ? (
                  <span className="absolute -right-2 top-8 rotate-6 rounded-full border-2 border-ink bg-canvas px-3 py-1 font-accent text-sm shadow-[0_3px_0_0_var(--ink)]">
                    shipped in weeks ✦
                  </span>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
