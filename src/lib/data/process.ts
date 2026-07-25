import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover with intent",
    description:
      "We map goals, constraints, and success metrics in working sessions — not slide decks that gather dust.",
  },
  {
    id: "design",
    number: "02",
    title: "Design in the open",
    description:
      "Flows, systems, and prototypes evolve in tight loops with your team so decisions stay visible and reversible.",
  },
  {
    id: "build",
    number: "03",
    title: "Build for production",
    description:
      "Engineering choices favor maintainability: typed APIs, automated tests, and deploy pipelines you can own.",
  },
  {
    id: "launch",
    number: "04",
    title: "Launch and learn",
    description:
      "We ship, measure, and iterate with you — handing off playbooks, not mysteries, when the milestone lands.",
  },
];
