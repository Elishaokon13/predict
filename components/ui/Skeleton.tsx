import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular" | "card" | "avatar";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "rectangular",
      width,
      height,
      animation = "pulse",
      style,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      text: "h-4 rounded",
      circular: "rounded-full",
      rectangular: "rounded-md",
      card: "rounded-lg",
      avatar: "rounded-full",
    };

    const animationStyles = {
      pulse: "animate-pulse",
      wave: "animate-[shimmer_2s_infinite]",
      none: "",
    };

    const customStyle: React.CSSProperties = {
      ...style,
      ...(width && { width: typeof width === "number" ? `${width}px` : width }),
      ...(height && {
        height: typeof height === "number" ? `${height}px` : height,
      }),
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-background-tertiary",
          variantStyles[variant],
          animationStyles[animation],
          className
        )}
        style={customStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// Pre-configured skeleton components
export const SkeletonCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("space-y-4 p-6 rounded-lg bg-background-secondary border border-border", className)}
    {...props}
  >
    <Skeleton variant="text" width="60%" height={24} />
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="40%" />
  </div>
));
SkeletonCard.displayName = "SkeletonCard";

export const SkeletonAvatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: "sm" | "md" | "lg" }
>(({ className, size = "md", ...props }, ref) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  return (
    <Skeleton
      ref={ref}
      variant="avatar"
      className={cn(sizes[size], className)}
      {...props}
    />
  );
});
SkeletonAvatar.displayName = "SkeletonAvatar";

export const SkeletonText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { lines?: number }
>(({ className, lines = 3, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? "60%" : "100%"}
      />
    ))}
  </div>
));
SkeletonText.displayName = "SkeletonText";

export const SkeletonTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { rows?: number; cols?: number }
>(({ className, rows = 5, cols = 4, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-3", className)} {...props}>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex gap-4">
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton
            key={colIndex}
            variant="text"
            width="100%"
            className="flex-1"
          />
        ))}
      </div>
    ))}
  </div>
));
SkeletonTable.displayName = "SkeletonTable";

export default Skeleton;

