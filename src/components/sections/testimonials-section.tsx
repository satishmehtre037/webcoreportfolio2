"use client";

import { Container } from "@/components/atoms/container";
import { Reveal } from "@/components/atoms/reveal";
import { SectionHeading } from "@/components/molecules/section-heading";
import { testimonials } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-28 border-y-2 border-ink/10 bg-muted/40 py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Teams who needed velocity without chaos."
            align="center"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.07}>
              <figure className="flex h-full flex-col rounded-[1.25rem] border-2 border-ink/10 bg-canvas p-6 shadow-[0_4px_0_0_var(--ink)]">
                <blockquote className="flex-1 text-base leading-relaxed text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-ink/10 pt-4">
                  <p className="font-semibold text-ink">{item.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.role}, {item.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
