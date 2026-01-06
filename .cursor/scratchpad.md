# Kalshi Copy Trading Dashboard - Project Plan

## Background and Motivation

**Project Goal**: Design and implement a premium, modern copy trading dashboard for Kalshi that enables users to discover top-performing traders, analyze their performance metrics (win rates, ROI, market participation), and execute copy-trading actions.

**Key Requirements**:
- Sleek, editorial-style UI inspired by Hashnode's dashboard layout
- Dark mode first design with premium fintech aesthetic
- Data-driven interface highlighting trader performance metrics
- Responsive design (mobile → desktop)
- Modern tech stack: Next.js, Tailwind CSS, Recharts/Visx, Framer Motion

**Target Users**: Traders looking to copy successful strategies on Kalshi's prediction market platform.

---

## Key Challenges and Analysis

### Technical Challenges
1. **Data Architecture**: Need to design data models and API integration patterns for trader performance data, market data, and copy-trading actions
2. **Real-time Updates**: Performance metrics may need real-time or near-real-time updates
3. **Chart Performance**: Multiple sparklines and interactive charts need to be performant
4. **State Management**: Complex state for filters, sorting, trader selection, and copy settings
5. **Responsive Design**: Complex grid layouts need to work across all device sizes

### Design Challenges
1. **Information Density**: Balancing data richness with cognitive load
2. **Visual Hierarchy**: Ensuring important metrics stand out without overwhelming
3. **Trust Indicators**: Building user confidence through clear performance visualization
4. **Action Clarity**: Making copy-trading actions obvious and accessible

### Integration Challenges
1. **Kalshi API**: Understanding Kalshi's API structure and endpoints (may need mock data initially)
2. **Authentication**: User authentication and authorization for copy-trading actions
3. **Data Fetching**: Efficient data fetching strategies with React Query

---

## High-level Task Breakdown

### Phase 1: Project Setup & Foundation
**Goal**: Establish the project structure, dependencies, and base configuration.

#### Task 1.1: Initialize Next.js Project
- **Description**: Set up Next.js 14+ with TypeScript, Tailwind CSS, and base configuration
- **Success Criteria**:
  - Next.js project runs successfully (`npm run dev`)
  - TypeScript configured with strict mode
  - Tailwind CSS configured and working
  - ESLint/Prettier configured
- **Estimated Complexity**: Low

#### Task 1.2: Install Core Dependencies
- **Description**: Install required packages (Recharts, Framer Motion, React Query, Zustand, etc.)
- **Success Criteria**:
  - All packages installed without conflicts
  - Package versions documented
  - No security vulnerabilities (run `npm audit`)
- **Estimated Complexity**: Low

#### Task 1.3: Configure Project Structure
- **Description**: Set up folder structure (components, hooks, lib, types, etc.)
- **Success Criteria**:
  - Clear folder organization following Next.js conventions
  - Type definitions folder created
  - Component structure established
- **Estimated Complexity**: Low

---

### Phase 2: Design System & Base Components
**Goal**: Create reusable design system components and base UI elements.

#### Task 2.1: Design Token System
- **Description**: Define color palette, typography scale, spacing system, and shadows in Tailwind config
- **Success Criteria**:
  - Dark mode color tokens defined (near-black, charcoal, gradients)
  - Typography scale (Inter/Geist/SF Pro) configured
  - Spacing and border radius tokens defined
  - Design tokens documented
- **Estimated Complexity**: Low

#### Task 2.2: Base Card Component
- **Description**: Create reusable card component with glassmorphism, shadows, rounded corners
- **Success Criteria**:
  - Card component accepts children and variants
  - Supports hover states
  - Responsive padding and spacing
  - Visual design matches spec (12-16px radius, soft shadows)
- **Estimated Complexity**: Medium

#### Task 2.3: Typography Components
- **Description**: Create typography components (Headline, Meta, Data) with proper hierarchy
- **Success Criteria**:
  - Typography components render correctly
  - Clear visual hierarchy established
  - Responsive font sizes
- **Estimated Complexity**: Low

#### Task 2.4: Button Components
- **Description**: Create primary, secondary, and icon button variants
- **Success Criteria**:
  - Multiple button variants (primary, secondary, ghost)
  - Hover and active states
  - Loading states
  - Accessible (keyboard navigation, ARIA labels)
- **Estimated Complexity**: Medium

#### Task 2.5: Badge Component
- **Description**: Create badge component for trader status (Top Gainer, Elite, Verified, etc.)
- **Success Criteria**:
  - Multiple badge variants
  - Color-coded by type
  - Responsive sizing
- **Estimated Complexity**: Low

#### Task 2.6: Avatar Component
- **Description**: Create avatar component with fallback states
- **Success Criteria**:
  - Supports image URLs
  - Fallback to initials or icon
  - Size variants
  - Verified badge overlay support
- **Estimated Complexity**: Low

#### Task 2.7: Skeleton Loader Components
- **Description**: Create skeleton loaders for async data states
- **Success Criteria**:
  - Skeleton variants for cards, lists, charts
  - Smooth animation
  - Matches actual content layout
- **Estimated Complexity**: Medium

---

### Phase 3: Navigation & Layout
**Goal**: Build the main navigation structure and page layouts.

#### Task 3.1: Top Navigation Bar
- **Description**: Create top navigation with logo, menu items, search, notifications, user menu
- **Success Criteria**:
  - Responsive navigation (mobile hamburger menu)
  - Active route highlighting
  - Search input functional (UI only initially)
  - Notification icon with badge
  - User avatar menu dropdown
  - Sticky positioning on scroll
- **Estimated Complexity**: Medium

#### Task 3.2: Main Layout Component
- **Description**: Create root layout with navigation and content area
- **Success Criteria**:
  - Layout wraps all pages
  - Proper spacing and padding
  - Responsive breakpoints working
- **Estimated Complexity**: Low

#### Task 3.3: Dashboard Page Shell
- **Description**: Create dashboard page structure with sections placeholder
- **Success Criteria**:
  - Page renders with correct layout
  - Section placeholders visible
  - Responsive grid structure
- **Estimated Complexity**: Low

---

### Phase 4: Data Models & Types
**Goal**: Define TypeScript types and data structures.

#### Task 4.1: Type Definitions
- **Description**: Create TypeScript interfaces for Trader, Market, Performance, CopySettings
- **Success Criteria**:
  - All types defined in `types/` folder
  - Types are comprehensive and extensible
  - No TypeScript errors
- **Estimated Complexity**: Low

#### Task 4.2: Mock Data Generators
- **Description**: Create mock data generators for development and testing
- **Success Criteria**:
  - Realistic mock data for traders, markets, performance
  - Data generators are reusable
  - Data structure matches type definitions
- **Estimated Complexity**: Medium

---

### Phase 5: Featured Trader Section
**Goal**: Build the hero/featured trader card.

#### Task 5.1: Featured Trader Card Component
- **Description**: Create large featured card with trader info, metrics, and CTA
- **Success Criteria**:
  - Displays avatar, username, badges, ROI, win rate, volume
  - Animated gradient background
  - "Copy Trader" CTA button
  - Responsive design
  - Visual design matches Hashnode-inspired aesthetic
- **Estimated Complexity**: Medium

#### Task 5.2: Featured Trader Data Hook
- **Description**: Create React Query hook to fetch featured trader data
- **Success Criteria**:
  - Hook returns trader data
  - Loading and error states handled
  - Skeleton loader shown during loading
- **Estimated Complexity**: Low

---

### Phase 6: Top Gainers Section
**Goal**: Build the top traders grid with sorting and filtering.

#### Task 6.1: Trader Card Component
- **Description**: Create reusable trader card with avatar, metrics, sparkline, and action button
- **Success Criteria**:
  - Displays all required metrics (ROI 24h/7d/30d, win rate, copied trades)
  - Mini sparkline chart integrated
  - Badge support (Top Gainer, Consistent, Low Risk)
  - "Copy Trader" button
  - Hover states and micro-animations
  - Responsive card sizing
- **Estimated Complexity**: High

#### Task 6.2: Sparkline Chart Component
- **Description**: Create mini sparkline chart component using Recharts
- **Success Criteria**:
  - Displays performance trend line
  - Smooth animations
  - Color-coded (green for positive, red for negative)
  - Responsive sizing
- **Estimated Complexity**: Medium

#### Task 6.3: Top Gainers Grid Layout
- **Description**: Create grid layout (3-4 columns desktop, responsive)
- **Success Criteria**:
  - Responsive grid (1 col mobile, 2 tablet, 3-4 desktop)
  - Proper spacing and alignment
  - Grid items are equal height
- **Estimated Complexity**: Low

#### Task 6.4: Sorting & Filtering UI
- **Description**: Create sorting dropdown and filter controls
- **Success Criteria**:
  - Sort options: Highest ROI, Highest win rate, Lowest drawdown, Most copied
  - Time range selector (24h, 7d, 30d, All time)
  - Filter state managed properly
  - UI is intuitive and accessible
- **Estimated Complexity**: Medium

#### Task 6.5: Top Gainers Data Hook
- **Description**: Create React Query hook with sorting/filtering logic
- **Success Criteria**:
  - Fetches trader data
  - Applies sorting and filtering
  - Loading and error states
  - Optimistic updates
- **Estimated Complexity**: Medium

---

### Phase 7: Performance Analytics Section
**Goal**: Build the analytics dashboard with charts.

#### Task 7.1: Aggregate Stats Cards
- **Description**: Create stat cards for average win rate, ROI, active traders, total volume
- **Success Criteria**:
  - Four stat cards displayed
  - Large, readable numbers
  - Trend indicators (up/down arrows)
  - Responsive layout
- **Estimated Complexity**: Low

#### Task 7.2: Performance Comparison Chart
- **Description**: Create interactive line chart comparing copied traders vs overall market
- **Success Criteria**:
  - Dual-line chart using Recharts
  - Time toggle (7d, 30d, All time)
  - Interactive tooltips
  - Smooth animations
  - Responsive sizing
- **Estimated Complexity**: High

#### Task 7.3: Analytics Data Hook
- **Description**: Create React Query hook for analytics data
- **Success Criteria**:
  - Fetches aggregate stats
  - Fetches time-series data for chart
  - Handles time range changes
  - Loading states
- **Estimated Complexity**: Medium

---

### Phase 8: Markets Overview Section
**Goal**: Build the markets display with editorial-style cards.

#### Task 8.1: Market Card Component
- **Description**: Create market card with title, category, probability, volume, top traders, status
- **Success Criteria**:
  - Displays all market information
  - Status badges (Open, Closing Soon, Resolved)
  - Category tags
  - Responsive design
  - Hover states
- **Estimated Complexity**: Medium

#### Task 8.2: Markets Grid Layout
- **Description**: Create responsive grid for market cards
- **Success Criteria**:
  - Responsive grid layout
  - Proper spacing
  - Editorial-style presentation
- **Estimated Complexity**: Low

#### Task 8.3: Markets Data Hook
- **Description**: Create React Query hook for markets data
- **Success Criteria**:
  - Fetches market data
  - Supports filtering by category/status
  - Loading states
- **Estimated Complexity**: Low

---

### Phase 9: Trader Profile View
**Goal**: Build detailed trader profile with tabs and copy settings.

#### Task 9.1: Trader Profile Header
- **Description**: Create profile header with avatar, username, lifetime metrics, copy button
- **Success Criteria**:
  - Displays all header information
  - Risk score visualization
  - Prominent copy button
  - Responsive layout
- **Estimated Complexity**: Medium

#### Task 9.2: Profile Tabs Component
- **Description**: Create tabbed interface (Performance, Trade History, Markets, Risk Analysis)
- **Success Criteria**:
  - Tab navigation working
  - Content switches on tab change
  - Active tab indicator
  - Accessible (keyboard navigation)
- **Estimated Complexity**: Medium

#### Task 9.3: Performance Tab Content
- **Description**: Create performance metrics display with charts
- **Success Criteria**:
  - ROI over time chart
  - Win rate breakdown
  - Trade statistics table
  - Responsive charts
- **Estimated Complexity**: High

#### Task 9.4: Trade History Tab
- **Description**: Create table/list of trader's historical trades
- **Success Criteria**:
  - Sortable table
  - Pagination or infinite scroll
  - Trade details visible
  - Responsive table
- **Estimated Complexity**: Medium

#### Task 9.5: Markets Tab
- **Description**: Display markets the trader is active in
- **Success Criteria**:
  - Market cards or list
  - Filtering options
  - Trader's position in each market
- **Estimated Complexity**: Medium

#### Task 9.6: Risk Analysis Tab
- **Description**: Display risk metrics and analysis
- **Success Criteria**:
  - Risk score breakdown
  - Drawdown visualization
  - Risk indicators
- **Estimated Complexity**: Medium

#### Task 9.7: Copy Settings Modal/Form
- **Description**: Create form for copy trading configuration
- **Success Criteria**:
  - Fixed amount input
  - Percentage-based option
  - Max drawdown limit
  - Stop-copy conditions
  - Form validation
  - Submit handler (can be mock initially)
- **Estimated Complexity**: High

#### Task 9.8: Trader Profile Data Hook
- **Description**: Create React Query hook for trader profile data
- **Success Criteria**:
  - Fetches complete trader data
  - Handles all tab data
  - Loading states per tab
- **Estimated Complexity**: Medium

---

### Phase 10: Interactions & Animations
**Goal**: Add micro-animations and smooth interactions.

#### Task 10.1: Framer Motion Setup
- **Description**: Configure Framer Motion for page transitions and animations
- **Success Criteria**:
  - Page transitions smooth
  - Component animations working
  - Performance optimized
- **Estimated Complexity**: Low

#### Task 10.2: Card Hover Animations
- **Description**: Add hover animations to all card components
- **Success Criteria**:
  - Smooth lift/scale on hover
  - Shadow transitions
  - No jank or performance issues
- **Estimated Complexity**: Low

#### Task 10.3: Chart Animations
- **Description**: Add entrance and update animations to charts
- **Success Criteria**:
  - Charts animate on mount
  - Smooth updates when data changes
  - Performance remains good
- **Estimated Complexity**: Medium

#### Task 10.4: Button & CTA Animations
- **Description**: Add micro-animations to buttons and CTAs
- **Success Criteria**:
  - Hover effects
  - Click feedback
  - Loading state animations
- **Estimated Complexity**: Low

---

### Phase 11: Search & Filtering
**Goal**: Implement search functionality.

#### Task 11.1: Search Component
- **Description**: Create search input with autocomplete
- **Success Criteria**:
  - Search input in navigation
  - Autocomplete dropdown
  - Searches traders and markets
  - Keyboard navigation
  - Debounced input
- **Estimated Complexity**: Medium

#### Task 11.2: Search Results Page
- **Description**: Create search results page/component
- **Success Criteria**:
  - Displays traders and markets
  - Highlights search terms
  - Pagination or infinite scroll
  - Empty state
- **Estimated Complexity**: Medium

---

### Phase 12: Responsive Design & Polish
**Goal**: Ensure full responsiveness and polish the UI.

#### Task 12.1: Mobile Navigation
- **Description**: Implement mobile hamburger menu
- **Success Criteria**:
  - Hamburger menu works
  - Mobile menu overlay
  - Smooth animations
  - Touch-friendly
- **Estimated Complexity**: Medium

#### Task 12.2: Responsive Grid Adjustments
- **Description**: Test and adjust all grid layouts for mobile/tablet
- **Success Criteria**:
  - All grids responsive
  - No horizontal scroll
  - Proper spacing on all devices
- **Estimated Complexity**: Medium

#### Task 12.3: Touch Interactions
- **Description**: Optimize for touch devices
- **Success Criteria**:
  - Touch targets are 44x44px minimum
  - Swipe gestures where appropriate
  - No hover-only interactions
- **Estimated Complexity**: Low

#### Task 12.4: Performance Optimization
- **Description**: Optimize bundle size, lazy loading, code splitting
- **Success Criteria**:
  - Lighthouse score > 90
  - Fast initial load
  - Smooth interactions
  - Images optimized
- **Estimated Complexity**: Medium

---

### Phase 13: Testing & Quality Assurance
**Goal**: Write tests and ensure quality.

#### Task 13.1: Component Unit Tests
- **Description**: Write unit tests for key components
- **Success Criteria**:
  - Test coverage > 70%
  - All critical components tested
  - Tests pass consistently
- **Estimated Complexity**: High

#### Task 13.2: Integration Tests
- **Description**: Write tests for data fetching and state management
- **Success Criteria**:
  - Data hooks tested
  - State transitions tested
  - Mock API responses working
- **Estimated Complexity**: Medium

#### Task 13.3: E2E Tests (Optional)
- **Description**: Write end-to-end tests for critical user flows
- **Success Criteria**:
  - Key user journeys tested
  - Tests run in CI
- **Estimated Complexity**: High

---

### Phase 14: API Integration (When Available)
**Goal**: Integrate with real Kalshi API.

#### Task 14.1: API Client Setup
- **Description**: Create API client with authentication
- **Success Criteria**:
  - API client configured
  - Authentication working
  - Error handling
- **Estimated Complexity**: Medium

#### Task 14.2: Replace Mock Data
- **Description**: Replace mock data generators with real API calls
- **Success Criteria**:
  - All data hooks use real API
  - Error states handled
  - Loading states working
- **Estimated Complexity**: Medium

#### Task 14.3: Real-time Updates (If Needed)
- **Description**: Implement WebSocket or polling for real-time data
- **Success Criteria**:
  - Real-time updates working
  - Performance acceptable
  - Connection errors handled
- **Estimated Complexity**: High

---

## Project Status Board

### Phase 1: Project Setup & Foundation
- [x] Task 1.1: Initialize Next.js Project
- [x] Task 1.2: Install Core Dependencies
- [x] Task 1.3: Configure Project Structure

### Phase 2: Design System & Base Components
- [x] Task 2.1: Design Token System
- [ ] Task 2.2: Base Card Component
- [ ] Task 2.3: Typography Components
- [ ] Task 2.4: Button Components
- [ ] Task 2.5: Badge Component
- [ ] Task 2.6: Avatar Component
- [ ] Task 2.7: Skeleton Loader Components

### Phase 3: Navigation & Layout
- [ ] Task 3.1: Top Navigation Bar
- [ ] Task 3.2: Main Layout Component
- [ ] Task 3.3: Dashboard Page Shell

### Phase 4: Data Models & Types
- [ ] Task 4.1: Type Definitions
- [ ] Task 4.2: Mock Data Generators

### Phase 5: Featured Trader Section
- [ ] Task 5.1: Featured Trader Card Component
- [ ] Task 5.2: Featured Trader Data Hook

### Phase 6: Top Gainers Section
- [ ] Task 6.1: Trader Card Component
- [ ] Task 6.2: Sparkline Chart Component
- [ ] Task 6.3: Top Gainers Grid Layout
- [ ] Task 6.4: Sorting & Filtering UI
- [ ] Task 6.5: Top Gainers Data Hook

### Phase 7: Performance Analytics Section
- [ ] Task 7.1: Aggregate Stats Cards
- [ ] Task 7.2: Performance Comparison Chart
- [ ] Task 7.3: Analytics Data Hook

### Phase 8: Markets Overview Section
- [ ] Task 8.1: Market Card Component
- [ ] Task 8.2: Markets Grid Layout
- [ ] Task 8.3: Markets Data Hook

### Phase 9: Trader Profile View
- [ ] Task 9.1: Trader Profile Header
- [ ] Task 9.2: Profile Tabs Component
- [ ] Task 9.3: Performance Tab Content
- [ ] Task 9.4: Trade History Tab
- [ ] Task 9.5: Markets Tab
- [ ] Task 9.6: Risk Analysis Tab
- [ ] Task 9.7: Copy Settings Modal/Form
- [ ] Task 9.8: Trader Profile Data Hook

### Phase 10: Interactions & Animations
- [ ] Task 10.1: Framer Motion Setup
- [ ] Task 10.2: Card Hover Animations
- [ ] Task 10.3: Chart Animations
- [ ] Task 10.4: Button & CTA Animations

### Phase 11: Search & Filtering
- [ ] Task 11.1: Search Component
- [ ] Task 11.2: Search Results Page

### Phase 12: Responsive Design & Polish
- [ ] Task 12.1: Mobile Navigation
- [ ] Task 12.2: Responsive Grid Adjustments
- [ ] Task 12.3: Touch Interactions
- [ ] Task 12.4: Performance Optimization

### Phase 13: Testing & Quality Assurance
- [ ] Task 13.1: Component Unit Tests
- [ ] Task 13.2: Integration Tests
- [ ] Task 13.3: E2E Tests (Optional)

### Phase 14: API Integration (When Available)
- [ ] Task 14.1: API Client Setup
- [ ] Task 14.2: Replace Mock Data
- [ ] Task 14.3: Real-time Updates (If Needed)

---

## Current Status / Progress Tracking

**Current Phase**: Phase 2 In Progress (Task 2.1 Complete)
**Last Updated**: Task 2.1 execution complete

**Phase 1 Completion Summary**:
- ✅ Next.js 16.1.1 project initialized with TypeScript (strict mode enabled)
- ✅ Tailwind CSS v4 configured with @tailwindcss/postcss plugin
- ✅ ESLint configured with Next.js config
- ✅ All core dependencies installed:
  - Recharts (charts)
  - Framer Motion (animations)
  - @tanstack/react-query (data fetching)
  - Zustand (state management)
- ✅ Project structure created:
  - `components/` (ui, layout, features)
  - `hooks/` (custom React hooks)
  - `lib/` (utilities)
  - `types/` (TypeScript definitions)
  - `app/` (Next.js app router structure)
- ✅ Development server running successfully on http://localhost:3000
- ✅ No security vulnerabilities (npm audit clean)

**Phase 2 Progress**:
- ✅ Task 2.1: Design Token System Complete
  - Dark mode color palette defined (near-black, charcoal, gradients)
  - Typography scale configured (Inter font with fallbacks)
  - Spacing and border radius tokens defined
  - Shadow system with glassmorphism support
  - Animation keyframes for micro-interactions
  - Design tokens documented in `lib/design-tokens.md`

**Notes**:
- Plan created with 14 phases and 50+ tasks
- Tasks are broken down into small, manageable pieces with clear success criteria
- Each task can be completed independently and tested before moving to the next
- Mock data will be used initially until Kalshi API is available

---

## Executor's Feedback or Assistance Requests

_This section will be populated by the Executor during implementation._

**Phase 1 Completion Report**:
- All Phase 1 tasks completed successfully
- Next.js development server is running and accessible
- All dependencies installed without conflicts
- Project structure established and ready for component development
- Ready to proceed to Phase 2: Design System & Base Components

**Current Requests**: None

---

## Lessons

_This section will be populated during implementation with reusable knowledge, fixes, and corrections._

**Key Learnings**:
- **Tailwind CSS v4**: Requires `@tailwindcss/postcss` package instead of using `tailwindcss` directly as PostCSS plugin. The PostCSS config must use `'@tailwindcss/postcss': {}` instead of `tailwindcss: {}`.
- **Next.js 16.1.1**: Latest version with App Router. TypeScript strict mode is enabled by default in tsconfig.json.
- **Package Versions Installed**:
  - next: ^16.1.1
  - react: ^19.2.3
  - react-dom: ^19.2.3
  - typescript: ^5.9.3
  - tailwindcss: ^4.1.18
  - @tailwindcss/postcss: ^4.1.18
  - recharts: latest
  - framer-motion: latest
  - @tanstack/react-query: latest
  - zustand: latest
- **Project Structure**: Following Next.js App Router conventions with organized component, hook, and utility folders.
- **Font Loading**: Next.js has built-in font optimization via `next/font/google`. No need for @next/font package - use `next/font/google` directly.
- **Design Tokens**: Comprehensive design token system created with dark mode colors, typography scale, spacing, border radius, shadows, and animations. All tokens documented in `lib/design-tokens.md`.

---

## Notes & Decisions

### Design Decisions
- **Color Palette**: Dark mode first with near-black (#0a0a0a) and charcoal (#1a1a1a) backgrounds
- **Typography**: Inter as primary font (fallback to system fonts)
- **Component Library**: Building custom components for full control over design
- **State Management**: React Query for server state, Zustand for client state (if needed)
- **Charts**: Recharts chosen for ease of use and React integration

### Technical Decisions
- **Next.js App Router**: Using latest App Router for better performance and developer experience
- **TypeScript**: Strict mode enabled for type safety
- **Mock Data First**: Building with mock data to enable parallel development of UI and API integration

### Open Questions
1. **Kalshi API Documentation**: Need to understand available endpoints and data structure
2. **Authentication Method**: OAuth, API keys, or other?
3. **Real-time Requirements**: Do metrics need real-time updates or is polling sufficient?
4. **Copy Trading Limits**: What are the constraints on copy trading amounts/percentages?

---

## Next Steps

1. **Review this plan** with stakeholders
2. **Confirm Kalshi API availability** and documentation
3. **Begin Phase 1** (Project Setup) once approved
4. **Execute tasks sequentially** with testing at each milestone

