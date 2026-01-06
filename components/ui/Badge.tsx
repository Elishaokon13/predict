import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "top-gainer"
    | "consistent"
    | "low-risk"
    | "elite"
    | "verified"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = "default", size = "md", dot = false, children, ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center rounded-full font-medium transition-colors";

    const variantStyles = {
      default: "bg-background-tertiary text-foreground-secondary border border-border",
      "top-gainer":
        "bg-accent-success/20 text-accent-success border border-accent-success/30",
      consistent:
        "bg-accent/20 text-accent border border-accent/30",
      "low-risk":
        "bg-accent-warning/20 text-accent-warning border border-accent-warning/30",
      elite:
        "bg-gradient-to-r from-accent to-accent-success text-white border-0 shadow-md",
      verified:
        "bg-accent/20 text-accent border border-accent/30",
      success:
        "bg-accent-success/20 text-accent-success border border-accent-success/30",
      warning:
        "bg-accent-warning/20 text-accent-warning border border-accent-warning/30",
      error:
        "bg-accent-error/20 text-accent-error border border-accent-error/30",
    };

    const sizeStyles = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    };

    const dotSizeStyles = {
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2",
      lg: "w-2.5 h-2.5",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "rounded-full mr-1.5",
              dotSizeStyles[size],
              variant === "top-gainer" || variant === "success"
                ? "bg-accent-success"
                : variant === "consistent" || variant === "verified"
                ? "bg-accent"
                : variant === "low-risk" || variant === "warning"
                ? "bg-accent-warning"
                : variant === "error"
                ? "bg-accent-error"
                : variant === "elite"
                ? "bg-white"
                : "bg-foreground-secondary"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

