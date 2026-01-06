# Design Tokens Documentation

This document outlines all design tokens used in the Kalshi Copy Trading Dashboard.

## Color Palette

### Background Colors
- `background`: `#0a0a0a` - Near-black primary background
- `background-secondary`: `#1a1a1a` - Charcoal secondary background
- `background-tertiary`: `#252525` - Lighter charcoal for subtle elevation
- `background-elevated`: `#2a2a2a` - For elevated cards and modals

### Foreground Colors
- `foreground`: `#ededed` - Primary text color
- `foreground-secondary`: `#b3b3b3` - Secondary text
- `foreground-tertiary`: `#808080` - Tertiary text
- `foreground-muted`: `#4d4d4d` - Muted text

### Border Colors
- `border`: `#2a2a2a` - Default border
- `border-light`: `#3a3a3a` - Light border
- `border-dark`: `#1a1a1a` - Dark border

### Accent Colors
- `accent`: `#3b82f6` - Primary blue accent
- `accent-success`: `#10b981` - Success green
- `accent-warning`: `#f59e0b` - Warning amber
- `accent-error`: `#ef4444` - Error red

### Trading Colors
- `trading-profit`: `#10b981` - Green for gains/profits
- `trading-loss`: `#ef4444` - Red for losses
- `trading-neutral`: `#6b7280` - Gray for neutral

## Typography

### Font Family
- **Primary**: Inter (with fallbacks: Geist Sans, SF Pro Display, system fonts)
- **Monospace**: Geist Mono (with fallbacks: SF Mono, system monospace)

### Font Scale
- `xs`: 12px / 1rem line-height
- `sm`: 14px / 1.25rem line-height
- `base`: 16px / 1.5rem line-height
- `lg`: 18px / 1.75rem line-height
- `xl`: 20px / 1.75rem line-height
- `2xl`: 24px / 2rem line-height
- `3xl`: 30px / 2.25rem line-height
- `4xl`: 36px / 2.5rem line-height
- `5xl`: 48px / 1 line-height
- `6xl`: 60px / 1 line-height

## Spacing

### Base Scale
- Standard Tailwind spacing scale (0.25rem increments)
- Extended spacing: 18 (4.5rem), 22 (5.5rem), 26 (6.5rem), 30 (7.5rem)

## Border Radius

- `xs`: 4px
- `sm`: 6px
- `DEFAULT`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 24px
- `2xl`: 32px
- `full`: 9999px (fully rounded)

## Shadows

### Card Shadows
- `sm`: Subtle shadow for small elevations
- `DEFAULT`: Standard card shadow
- `md`: Medium elevation
- `lg`: Large elevation
- `xl`: Extra large elevation
- `2xl`: Maximum elevation
- `inner`: Inset shadow
- `glass`: Glassmorphism shadow with backdrop blur

## Animations

### Keyframes
- `fadeIn`: Fade in animation (0.3s)
- `slideUp`: Slide up with fade (0.3s)
- `slideDown`: Slide down with fade (0.3s)
- `scaleIn`: Scale in animation (0.2s)

## Utilities

### Glassmorphism
- `.glass`: Applies glassmorphism effect with backdrop blur and semi-transparent background

### Gradient Text
- `.gradient-text`: Applies gradient text effect (accent to success)

## Usage Examples

```tsx
// Background colors
<div className="bg-background">Primary background</div>
<div className="bg-background-secondary">Secondary background</div>

// Text colors
<p className="text-foreground">Primary text</p>
<p className="text-foreground-secondary">Secondary text</p>

// Trading colors
<span className="text-trading-profit">+$100</span>
<span className="text-trading-loss">-$50</span>

// Cards with glassmorphism
<div className="glass rounded-lg shadow-md p-6">Card content</div>

// Typography
<h1 className="text-4xl font-sans">Headline</h1>
<p className="text-base text-foreground-secondary">Body text</p>
```

