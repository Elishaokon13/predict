"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/" },
    { label: "Top Traders", href: "/top-traders" },
    { label: "Markets", href: "/markets" },
    { label: "Copy Trades", href: "/copy-trades" },
    { label: "Analytics", href: "/analytics" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo and Platform Name */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                <span className="text-sm font-bold text-white">K</span>
              </div>
              <span className="text-lg font-semibold text-foreground hidden sm:inline-block">
                Kalshi Copy
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  "text-foreground-secondary hover:text-foreground hover:bg-background-secondary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Search, Notifications, User Menu, CTA */}
          <div className="flex items-center gap-2">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
              aria-label="Search"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Dark Mode Toggle (placeholder) */}
            <button
              className="p-2 rounded-md text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
              aria-label="Toggle dark mode"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>

            {/* Subscribe/CTA Button */}
            <Button variant="primary" size="sm" className="hidden sm:inline-flex">
              Copy Trader
            </Button>

            {/* User Avatar/Menu */}
            <div className="relative">
              <button
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-background-secondary transition-colors"
                aria-label="User menu"
              >
                <div className="h-8 w-8 rounded-full bg-background-tertiary border border-border flex items-center justify-center">
                  <span className="text-xs font-medium text-foreground-secondary">
                    U
                  </span>
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium rounded-md text-foreground-secondary hover:text-foreground hover:bg-background-secondary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Button variant="primary" size="sm" className="w-full">
                  Copy Trader
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar (when open) */}
        {isSearchOpen && (
          <div className="border-t border-border py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search traders, markets..."
                className="w-full px-4 py-2 pl-10 rounded-lg bg-background-secondary border border-border text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                autoFocus
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

