import React from "react";
import { cn } from "@/lib/utils";

// Headline Component - For main headings
export interface HeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
}

export const Headline = React.forwardRef<HTMLHeadingElement, HeadlineProps>(
  (
    {
      as: Component = "h1",
      size = "lg",
      weight = "bold",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      xs: "text-xl",
      sm: "text-2xl",
      md: "text-3xl",
      lg: "text-4xl",
      xl: "text-5xl",
      "2xl": "text-6xl",
      "3xl": "text-7xl",
      "4xl": "text-8xl",
    };

    const weightStyles = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "text-foreground leading-tight tracking-tight",
          sizeStyles[size],
          weightStyles[weight],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Headline.displayName = "Headline";

// Meta Component - For metadata, labels, captions
export interface MetaProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  variant?: "default" | "muted" | "secondary";
  size?: "xs" | "sm" | "base";
}

export const Meta = React.forwardRef<HTMLParagraphElement, MetaProps>(
  (
    {
      as: Component = "p",
      variant = "default",
      size = "sm",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "text-foreground-secondary",
      muted: "text-foreground-muted",
      secondary: "text-foreground-tertiary",
    };

    const sizeStyles = {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "leading-relaxed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Meta.displayName = "Meta";

// Data Component - For numbers, statistics, metrics
export interface DataProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div" | "p";
  variant?: "default" | "profit" | "loss" | "neutral";
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
  weight?: "normal" | "medium" | "semibold" | "bold";
  showSign?: boolean;
  value?: number | string;
}

export const Data = React.forwardRef<HTMLSpanElement, DataProps>(
  (
    {
      as: Component = "span",
      variant = "default",
      size = "base",
      weight = "semibold",
      showSign = false,
      value,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "text-foreground",
      profit: "text-trading-profit",
      loss: "text-trading-loss",
      neutral: "text-trading-neutral",
    };

    const sizeStyles = {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    };

    const weightStyles = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    };

    const displayValue = value !== undefined ? value : children;
    const formattedValue =
      typeof displayValue === "number"
        ? showSign && displayValue > 0
          ? `+${displayValue.toLocaleString()}`
          : displayValue.toLocaleString()
        : displayValue;

    return (
      <Component
        ref={ref}
        className={cn(
          "tabular-nums",
          variantStyles[variant],
          sizeStyles[size],
          weightStyles[weight],
          className
        )}
        {...props}
      >
        {formattedValue}
      </Component>
    );
  }
);
Data.displayName = "Data";

// Text Component - For body text
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span" | "div";
  size?: "sm" | "base" | "lg";
  variant?: "default" | "secondary" | "muted";
  weight?: "normal" | "medium";
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      as: Component = "p",
      size = "base",
      variant = "default",
      weight = "normal",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    };

    const variantStyles = {
      default: "text-foreground",
      secondary: "text-foreground-secondary",
      muted: "text-foreground-muted",
    };

    const weightStyles = {
      normal: "font-normal",
      medium: "font-medium",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "leading-relaxed",
          sizeStyles[size],
          variantStyles[variant],
          weightStyles[weight],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Text.displayName = "Text";

