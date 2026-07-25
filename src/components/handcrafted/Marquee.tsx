import React from "react";

const ITEMS = [
  "Product Design",
  "LLM Engineering",
  "Brand Systems",
  "AI Copilots",
  "Web Platforms",
  "Design Ops",
];

export const Marquee: React.FC = () => {
  const row = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <section
      className="border-y-[3px] border-ink bg-wine text-ivory overflow-hidden py-4 select-none"
      data-testid="marquee"
      aria-label="Capabilities"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-6 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl"
          >
            {item}
            <span className="text-sage">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};
