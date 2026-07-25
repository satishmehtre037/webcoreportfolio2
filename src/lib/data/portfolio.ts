import type { PortfolioProject } from "@/types";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "atlas",
    title: "Atlas — operations copilot",
    category: "AI · Enterprise",
    description:
      "A retrieval-augmented assistant that cut support resolution time by 41% for a logistics platform.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Analytics dashboard on a laptop screen",
    metrics: "41% faster resolution",
  },
  {
    id: "lumen",
    title: "Lumen — design system",
    category: "Product · SaaS",
    description:
      "Unified tokens, components, and documentation that accelerated feature delivery across three product lines.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Design workspace with charts and wireframes",
    metrics: "3× release velocity",
  },
  {
    id: "northline",
    title: "Northline — commerce platform",
    category: "Platform · Retail",
    description:
      "Headless storefront and inventory APIs built for peak traffic, with sub-second checkout on mobile.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format&fit=crop",
    imageAlt: "Modern retail interior with products on display",
    metrics: "99.97% uptime season",
  },
];
