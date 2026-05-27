import { cn } from "@/lib/utils";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-2xl border border-default bg-card px-4 py-2 text-sm text-foreground outline-none transition-all placeholder:text-muted focus:ring-4 focus:ring-primary/10 focus:border-primary",

        className
      )}
      {...props}
    />
  );
}
