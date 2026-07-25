import type { PricingTier } from "@/types";

export const pricingTiers: PricingTier[] = [
  {
    id: "sprint",
    name: "Sprint",
    price: "From $18k",
    description: "Two-week focused engagement for discovery, prototype, or critical path delivery.",
    features: [
      "Senior team embedded",
      "Weekly stakeholder reviews",
      "Figma + working code handoff",
      "Launch checklist & docs",
    ],
    cta: "Book a sprint",
  },
  {
    id: "build",
    name: "Build",
    price: "From $45k",
    description: "End-to-end product build — design, engineering, and release for one major initiative.",
    features: [
      "Everything in Sprint",
      "Full-stack implementation",
      "QA & accessibility pass",
      "30-day post-launch support",
    ],
    highlighted: true,
    cta: "Start a build",
  },
  {
    id: "partner",
    name: "Partner",
    price: "Custom",
    description: "Long-term partnership for multiple products, platform work, or dedicated squad capacity.",
    features: [
      "Dedicated senior squad",
      "Roadmap & architecture advisory",
      "SLA-backed response times",
      "Quarterly strategy reviews",
    ],
    cta: "Talk partnership",
  },
];
