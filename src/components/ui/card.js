import { cn } from "@/lib/utils";

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        `
        rounded-3xl
        border
        border-default
        bg-card
        shadow-sm
        transition-colors
        `,
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={cn("p-5 md:p-6", className)}>{children}</div>;
}
