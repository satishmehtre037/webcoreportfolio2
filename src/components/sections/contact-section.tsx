"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Container } from "@/components/atoms/container";
import { NeoButton } from "@/components/atoms/neo-button";
import { Reveal } from "@/components/atoms/reveal";
import { SectionHeading } from "@/components/molecules/section-heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetOptions } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  company: z.string().optional(),
  budget: z.string().min(1, "Select a budget range."),
  brief: z.string().min(20, "Tell us a bit more about the project (20+ characters)."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { budget: "" },
  });

  const selectedBudget = watch("budget");

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.info("Contact brief submitted", values);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="scroll-mt-28 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Tell us what you're building."
              description="We respond to every serious brief within two business days — from a real person on our team."
            />
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-[1.5rem] border-2 border-ink bg-canvas p-6 shadow-[0_8px_0_0_var(--ink)] sm:p-8"
              noValidate
            >
              {submitted ? (
                <div className="rounded-xl border-2 border-ink/15 bg-mint/30 p-6 text-center">
                  <p className="font-display text-xl font-bold text-ink">Brief received.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thanks — we&apos;ll be in touch shortly.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" autoComplete="name" {...register("name")} />
                      {errors.name ? (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        {...register("email")}
                      />
                      {errors.email ? (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" autoComplete="organization" {...register("company")} />
                  </div>

                  <fieldset className="space-y-3">
                    <legend className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Budget *
                    </legend>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setValue("budget", option.value, { shouldValidate: true })
                          }
                          className={cn(
                            "rounded-full border-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                            selectedBudget === option.value
                              ? "border-ink bg-ink text-canvas"
                              : "border-ink/20 bg-transparent text-ink hover:border-ink/50",
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" {...register("budget")} />
                    {errors.budget ? (
                      <p className="text-xs text-destructive">{errors.budget.message}</p>
                    ) : null}
                  </fieldset>

                  <div className="space-y-2">
                    <Label htmlFor="brief">Project brief *</Label>
                    <Textarea
                      id="brief"
                      placeholder="We're building a platform that..."
                      {...register("brief")}
                    />
                    {errors.brief ? (
                      <p className="text-xs text-destructive">{errors.brief.message}</p>
                    ) : null}
                  </div>

                  <NeoButton type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? "Sending..." : "Send brief"}
                  </NeoButton>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
