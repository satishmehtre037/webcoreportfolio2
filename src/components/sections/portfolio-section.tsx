"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/atoms/container";
import { NeoButton } from "@/components/atoms/neo-button";
import { Reveal } from "@/components/atoms/reveal";
import { SectionHeading } from "@/components/molecules/section-heading";
import { portfolioProjects } from "@/lib/data/portfolio";

export function PortfolioSection() {
  return (
    <section id="work" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <SectionHeading
              eyebrow="Work"
              title="Outcomes you can point to."
              description="A sample of recent engagements — anonymized where needed, always focused on measurable impact."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <NeoButton href="#contact" variant="secondary">
              Discuss your project
            </NeoButton>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {portfolioProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <Link
                href="#contact"
                className="group block overflow-hidden rounded-[1.5rem] border-2 border-ink bg-card shadow-[0_6px_0_0_var(--ink)] transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="space-y-3 p-5">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {project.category}
                  </p>
                  <h3 className="font-display text-xl font-bold text-ink">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  {project.metrics ? (
                    <p className="font-accent text-base text-accent">{project.metrics}</p>
                  ) : null}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
