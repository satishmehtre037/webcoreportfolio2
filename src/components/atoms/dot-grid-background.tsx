import { cn } from "@/lib/utils";

type DotGridBackgroundProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function DotGridBackground({
  className,
  variant = "light",
}: DotGridBackgroundProps) {
  const dotColor =
    variant === "light" ? "rgba(17,17,17,0.08)" : "rgba(255,255,255,0.12)";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}
