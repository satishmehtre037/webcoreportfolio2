import Link from "next/link";
import { cn } from "@/lib/utils";

type NeoButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function NeoButton({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
}: NeoButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-full border-2 border-ink px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-transform duration-200",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:-translate-y-0.5 active:translate-y-0",
    variant === "primary" &&
      "bg-accent text-accent-foreground shadow-[0_4px_0_0_var(--ink)] hover:shadow-[0_6px_0_0_var(--ink)]",
    variant === "secondary" &&
      "bg-canvas text-ink shadow-[0_4px_0_0_var(--ink)] hover:shadow-[0_6px_0_0_var(--ink)]",
    variant === "ghost" && "border-transparent bg-transparent shadow-none hover:bg-ink/5",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
