import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[0.65rem] font-medium uppercase tracking-[0.28em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
