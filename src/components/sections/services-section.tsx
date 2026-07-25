"use client";

import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/atoms/container";
import { Reveal } from "@/components/atoms/reveal";
import { SectionHeading } from "@/components/molecules/section-heading";
import { services } from "@/lib/data/services";
import type { ServiceItem } from "@/types";
import { cn } from "@/lib/utils";

function ServiceRow({ item, index }: { item: ServiceItem; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="group grid gap-4 border-t-2 border-ink/10 py-8 transition-colors hover:bg-ink/[0.02] sm:grid-cols-[1fr_1.2fr_auto] sm:items-start sm:gap-8">
        <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{item.title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {item.description}
        </p>
        <div className="flex items-start justify-between gap-3 sm:flex-col sm:items-end">
          <ul className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-ink/15 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
          <ArrowUpRight
            className={cn(
              "size-5 shrink-0 text-ink/40 transition-transform duration-300",
              "group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent",
            )}
            aria-hidden
          />
        </div>
      </article>
    </Reveal>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Capabilities that compound, not compete."
            description="Strategy, design, and engineering in one senior squad — so momentum never dies in handoffs."
          />
        </Reveal>
        <div className="mt-12 border-b-2 border-ink/10">
          {services.map((item, index) => (
            <ServiceRow key={item.id} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
