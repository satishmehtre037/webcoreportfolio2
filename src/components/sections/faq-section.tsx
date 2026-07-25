"use client";

import { Container } from "@/components/atoms/container";
import { Reveal } from "@/components/atoms/reveal";
import { SectionHeading } from "@/components/molecules/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-28 py-20 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions founders ask before we kick off."
            align="center"
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </section>
  );
}
