"use client";

import { Check } from "lucide-react";
import { Container } from "@/components/atoms/container";
import { NeoButton } from "@/components/atoms/neo-button";
import { Reveal } from "@/components/atoms/reveal";
import { SectionHeading } from "@/components/molecules/section-heading";
import { pricingTiers } from "@/lib/data/pricing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Engagements sized to your stage."
            description="Transparent starting points — final scope follows discovery, never surprise change orders."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.id} delay={index * 0.06}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-[1.5rem] border-2 border-ink p-6 shadow-[0_6px_0_0_var(--ink)]",
                  tier.highlighted ? "bg-accent text-accent-foreground" : "bg-canvas text-ink",
                )}
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] opacity-80">
                  {tier.name}
                </p>
                <p className="mt-3 font-display text-3xl font-extrabold">{tier.price}</p>
                <p className="mt-3 text-sm leading-relaxed opacity-90">{tier.description}</p>
                <ul className="my-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <NeoButton
                  href="#contact"
                  variant={tier.highlighted ? "secondary" : "primary"}
                  className="w-full"
                >
                  {tier.cta}
                </NeoButton>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
