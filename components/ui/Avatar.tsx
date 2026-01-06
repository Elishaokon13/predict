import React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  verified?: boolean;
  status?: "online" | "offline" | "away";
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = "md",
      verified = false,
      status,
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      xs: "h-6 w-6 text-xs",
      sm: "h-8 w-8 text-sm",
      md: "h-10 w-10 text-base",
      lg: "h-12 w-12 text-lg",
      xl: "h-16 w-16 text-xl",
      "2xl": "h-24 w-24 text-2xl",
    };

    const verifiedBadgeSizes = {
      xs: "h-2.5 w-2.5",
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4",
      xl: "h-5 w-5",
      "2xl": "h-6 w-6",
    };

    const statusSizes = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
      "2xl": "h-4 w-4",
    };

    // Get initials from name
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const statusColors = {
      online: "bg-accent-success",
      offline: "bg-foreground-muted",
      away: "bg-accent-warning",
    };

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        {...props}
      >
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full bg-background-tertiary border border-border overflow-hidden",
            sizeStyles[size]
          )}
        >
          {src ? (
            <img
              src={src}
              alt={alt || name || "Avatar"}
              className="h-full w-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent && name) {
                  parent.innerHTML = `<span class="text-foreground-secondary">${getInitials(name)}</span>`;
                }
              }}
            />
          ) : name ? (
            <span className="text-foreground-secondary font-medium">
              {getInitials(name)}
            </span>
          ) : (
            <svg
              className="h-1/2 w-1/2 text-foreground-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}
        </div>

        {/* Verified Badge */}
        {verified && (
          <div
            className={cn(
              "absolute -bottom-0.5 -right-0.5 rounded-full bg-accent border-2 border-background flex items-center justify-center",
              verifiedBadgeSizes[size]
            )}
          >
            <svg
              className="h-2/3 w-2/3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}

        {/* Status Indicator */}
        {status && (
          <div
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-background",
              statusColors[status],
              statusSizes[size]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;

