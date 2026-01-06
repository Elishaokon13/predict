import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "glass" | "outlined";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      hover = false,
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-lg transition-all duration-200";
    
    const variantStyles = {
      default: "bg-background-secondary border border-border",
      elevated: "bg-background-elevated border border-border shadow-lg",
      glass: "glass shadow-glass",
      outlined: "bg-background-secondary border-2 border-border-light",
    };

    const paddingStyles = {
      none: "",
      sm: "p-3",
      md: "p-4 md:p-6",
      lg: "p-6 md:p-8",
    };

    const hoverStyles = hover
      ? "hover:shadow-xl hover:border-border-light hover:-translate-y-0.5 cursor-pointer"
      : "";

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

