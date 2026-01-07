/**
 * Kalshi Copy Trading - Type Definitions
 * 
 * Type definitions for traders, copied traders, portfolio metrics, and performance data
 */

/**
 * Base trader information
 */
export interface Trader {
  id: string
  username: string
  avatar?: string
  winRate: number // Percentage (0-100)
  roi7d: number // ROI percentage for last 7 days
  roi30d: number // ROI percentage for last 30 days
  riskScore: number // Risk score (0-100, lower is safer)
  marketsActive: number // Number of active markets
  totalTrades: number
  followers?: number
}

/**
 * Copied trader extends base trader with allocation information
 */
export interface CopiedTrader extends Trader {
  capitalAllocated: number // Amount of capital allocated to this trader
  currentValue: number // Current value of copied positions
  returns: number // Absolute returns (currentValue - capitalAllocated)
  returnsPercent: number // Percentage returns
  trend: 'up' | 'down' // Performance trend
  chartData: Array<{ value: number }> // Sparkline data for table
  copiedAt: Date // When this trader was copied
  isActive: boolean // Whether copying is currently active
}

/**
 * Portfolio-level metrics
 */
export interface PortfolioMetrics {
  totalPortfolioValue: number // Total current portfolio value
  totalCopiedCapital: number // Total capital allocated across all copied traders
  lifetimeCopyPnL: number // Total lifetime profit/loss from copy trading
  roiPercent: number // Overall ROI percentage
  pnl24h: number // Profit/loss in last 24 hours
}

/**
 * Performance data point for charts
 */
export interface PerformanceDataPoint {
  date: string // Date label (e.g., "Jan 1", "2024-01-01")
  value: number // Portfolio value or trader performance metric
  pnl?: number // Daily PnL (optional)
}

/**
 * Time range for performance charts
 */
export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y'

/**
 * Copy trading configuration
 */
export interface CopyTradingConfig {
  traderId: string
  allocationType: 'fixed' | 'percentage'
  amount?: number // Fixed amount in USD
  percentage?: number // Percentage of portfolio (0-100)
  maxDrawdown?: number // Maximum drawdown before stopping (percentage)
  stopCopying: boolean // Whether to stop copying if conditions are met
}

/**
 * Top trader for leaderboard display
 */
export interface TopTrader extends Trader {
  rank: number
  isCopied: boolean // Whether user is already copying this trader
}

