import { cn } from "@/lib/utils";

export default function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "flex min-h-[150px] w-full rounded-2xl border border-default bg-card px-4 py-3 text-sm text-foreground outline-none transition-all resize-none placeholder:text-muted focus:ring-4 focus:ring-primary/10 focus:border-primary",

        className
      )}
      {...props}
    />
  );
}
