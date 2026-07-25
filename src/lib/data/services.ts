import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "platform-engineering",
    title: "Platform Engineering",
    description:
      "Scalable web apps, APIs, and internal tools built on modern stacks with observability from day one.",
    tags: ["Next.js", "Cloud", "APIs"],
  },
  {
    id: "ai-products",
    title: "AI Product Development",
    description:
      "LLM features, retrieval systems, and agent workflows designed for reliability — not demo-day magic.",
    tags: ["RAG", "Agents", "Evals"],
  },
  {
    id: "product-design",
    title: "Product & Interface Design",
    description:
      "Design systems and interfaces that feel intentional — fast, accessible, and unmistakably yours.",
    tags: ["UX", "Design systems", "Prototyping"],
  },
  {
    id: "mvp-launch",
    title: "MVP Launch Sprints",
    description:
      "Focused zero-to-one builds that validate ideas in weeks with a senior team embedded in your workflow.",
    tags: ["Discovery", "Ship", "Iterate"],
  },
  {
    id: "devops-reliability",
    title: "DevOps & Reliability",
    description:
      "CI/CD, infrastructure as code, and performance tuning so releases stay calm as you grow.",
    tags: ["CI/CD", "SRE", "Monitoring"],
  },
  {
    id: "growth-analytics",
    title: "Growth & Analytics",
    description:
      "Instrumentation, experimentation, and dashboards that connect product decisions to business metrics.",
    tags: ["Analytics", "A/B tests", "Dashboards"],
  },
];
