import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border-2 border-ink/15 bg-canvas px-4 text-sm text-ink shadow-none transition-colors",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
