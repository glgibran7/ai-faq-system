import { cn } from "@/lib/utils";

export default function Badge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-secondary text-foreground",

    success: "bg-green-500/10 text-green-500",

    warning: "bg-yellow-500/10 text-yellow-500",

    destructive: "bg-red-500/10 text-red-500",

    info: "bg-blue-500/10 text-blue-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
