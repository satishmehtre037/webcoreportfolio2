import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  inverted?: boolean;
};

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="WebCore home"
    >
      <span className="flex size-9 items-center justify-center rounded-full border-2 border-ink bg-accent text-sm font-bold text-accent-foreground shadow-[0_3px_0_0_var(--ink)] transition-transform group-hover:-translate-y-0.5">
        W
      </span>
      <span
        className={cn(
          "font-display text-lg font-extrabold tracking-tight",
          inverted ? "text-canvas" : "text-ink",
        )}
      >
        WebCore
      </span>
    </Link>
  );
}
