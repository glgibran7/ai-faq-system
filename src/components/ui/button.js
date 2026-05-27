import { cn } from "@/lib/utils";

export default function Button({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  const variants = {
    default: "bg-primary text-primary-foreground hover:opacity-90 shadow-sm",

    outline: "border border-default bg-card hover:bg-secondary text-foreground",

    destructive: "bg-red-500 text-white hover:opacity-90",

    secondary: "bg-secondary text-foreground hover:opacity-80",

    ghost: "hover:bg-secondary text-foreground",

    glass: "glass border border-default text-foreground hover:opacity-90",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",

    default: "h-11 px-5 text-sm",

    lg: "h-12 px-6 text-base",

    icon: "w-11 h-11",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] touch-action-manipulation",

        variants[variant],

        sizes[size],

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
