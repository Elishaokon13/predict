/**
 * Kalshi Copy Trading - Mock Data Generators
 * 
 * Generates realistic mock data for development and testing
 */

import { Trader, CopiedTrader, PortfolioMetrics, PerformanceDataPoint, TopTrader } from './types'

/**
 * Generate mock trader data
 */
export function generateMockTrader(id: string, username: string, overrides?: Partial<Trader>): Trader {
  const baseWinRate = 45 + Math.random() * 30 // 45-75%
  const baseRoi7d = -5 + Math.random() * 15 // -5% to +10%
  const baseRoi30d = -10 + Math.random() * 40 // -10% to +30%
  
  return {
    id,
    username,
    winRate: Math.round(baseWinRate * 10) / 10,
    roi7d: Math.round(baseRoi7d * 10) / 10,
    roi30d: Math.round(baseRoi30d * 10) / 10,
    riskScore: Math.round(20 + Math.random() * 60), // 20-80
    marketsActive: Math.floor(3 + Math.random() * 12), // 3-15
    totalTrades: Math.floor(50 + Math.random() * 500),
    followers: Math.floor(100 + Math.random() * 5000),
    ...overrides,
  }
}

/**
 * Generate mock copied trader data
 */
export function generateMockCopiedTrader(
  trader: Trader,
  capitalAllocated: number,
  overrides?: Partial<CopiedTrader>
): CopiedTrader {
  const returnsPercent = -20 + Math.random() * 60 // -20% to +40%
  const currentValue = capitalAllocated * (1 + returnsPercent / 100)
  const returns = currentValue - capitalAllocated
  const trend = returnsPercent >= 0 ? 'up' : 'down'
  
  // Generate sparkline data
  const chartData = Array.from({ length: 11 }, () => ({
    value: 80 + Math.random() * 40, // Random values for sparkline
  }))
  
  return {
    ...trader,
    capitalAllocated,
    currentValue: Math.round(currentValue * 100) / 100,
    returns: Math.round(returns * 100) / 100,
    returnsPercent: Math.round(returnsPercent * 10) / 10,
    trend,
    chartData,
    copiedAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000), // Random date within last 90 days
    isActive: Math.random() > 0.2, // 80% active
    ...overrides,
  }
}

/**
 * Generate mock portfolio metrics
 */
export function generateMockPortfolioMetrics(copiedTraders: CopiedTrader[]): PortfolioMetrics {
  const totalCopiedCapital = copiedTraders.reduce((sum, trader) => sum + trader.capitalAllocated, 0)
  const totalPortfolioValue = copiedTraders.reduce((sum, trader) => sum + trader.currentValue, 0)
  const lifetimeCopyPnL = totalPortfolioValue - totalCopiedCapital
  const roiPercent = totalCopiedCapital > 0 
    ? (lifetimeCopyPnL / totalCopiedCapital) * 100 
    : 0
  const pnl24h = lifetimeCopyPnL * (0.01 + Math.random() * 0.05) // 1-6% of total PnL
  
  return {
    totalPortfolioValue: Math.round(totalPortfolioValue * 100) / 100,
    totalCopiedCapital: Math.round(totalCopiedCapital * 100) / 100,
    lifetimeCopyPnL: Math.round(lifetimeCopyPnL * 100) / 100,
    roiPercent: Math.round(roiPercent * 10) / 10,
    pnl24h: Math.round(pnl24h * 100) / 100,
  }
}

/**
 * Generate mock performance chart data
 */
export function generateMockPerformanceData(
  timeRange: '1D' | '1W' | '1M' | '3M' | '1Y',
  initialValue: number = 5000
): PerformanceDataPoint[] {
  const dataPoints: PerformanceDataPoint[] = []
  const now = new Date()
  
  let days: number
  let dateFormat: (date: Date) => string
  
  switch (timeRange) {
    case '1D':
      days = 1
      dateFormat = (d) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
      break
    case '1W':
      days = 7
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      break
    case '1M':
      days = 30
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      break
    case '3M':
      days = 90
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      break
    case '1Y':
      days = 365
      dateFormat = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      break
  }
  
  let currentValue = initialValue
  const pointsPerDay = timeRange === '1D' ? 24 : 1 // Hourly for 1D, daily for others
  
  for (let i = days * pointsPerDay; i >= 0; i--) {
    const date = new Date(now)
    if (timeRange === '1D') {
      date.setHours(date.getHours() - i)
    } else {
      date.setDate(date.getDate() - i)
    }
    
    // Random walk with slight upward bias
    const change = (Math.random() - 0.45) * (initialValue * 0.02) // -2% to +2% per point, slight upward bias
    currentValue = Math.max(initialValue * 0.5, currentValue + change) // Don't go below 50% of initial
    
    const pnl = i === days * pointsPerDay ? 0 : change
    
    dataPoints.push({
      date: dateFormat(date),
      value: Math.round(currentValue * 100) / 100,
      pnl: Math.round(pnl * 100) / 100,
    })
  }
  
  return dataPoints
}

/**
 * Generate mock top traders for leaderboard
 */
export function generateMockTopTraders(count: number = 20): TopTrader[] {
  const traders: TopTrader[] = []
  
  for (let i = 0; i < count; i++) {
    const trader = generateMockTrader(
      `trader-${i + 1}`,
      `Trader${i + 1}`,
      {
        // Top traders should have better stats
        winRate: 55 + Math.random() * 25, // 55-80%
        roi7d: 2 + Math.random() * 15, // 2-17%
        roi30d: 10 + Math.random() * 30, // 10-40%
        riskScore: 15 + Math.random() * 40, // 15-55 (lower is better)
      }
    )
    
    traders.push({
      ...trader,
      rank: i + 1,
      isCopied: Math.random() > 0.7, // 30% chance of being copied
    })
  }
  
  // Sort by ROI 30d descending
  return traders.sort((a, b) => b.roi30d - a.roi30d).map((t, i) => ({ ...t, rank: i + 1 }))
}

/**
 * Pre-generated mock data for quick access
 */
export const mockTraders: Trader[] = [
  generateMockTrader('trader-1', 'KalshiPro', { winRate: 68.5, roi7d: 12.3, roi30d: 35.2, riskScore: 28 }),
  generateMockTrader('trader-2', 'MarketWizard', { winRate: 72.1, roi7d: 8.7, roi30d: 28.9, riskScore: 35 }),
  generateMockTrader('trader-3', 'TradeMaster', { winRate: 65.3, roi7d: 15.2, roi30d: 42.1, riskScore: 22 }),
  generateMockTrader('trader-4', 'EliteTrader', { winRate: 70.8, roi7d: 6.4, roi30d: 31.5, riskScore: 32 }),
  generateMockTrader('trader-5', 'ProfitSeeker', { winRate: 58.2, roi7d: 9.8, roi30d: 25.7, riskScore: 45 }),
]

export const mockCopiedTraders: CopiedTrader[] = [
  generateMockCopiedTrader(mockTraders[0], 2500, { returnsPercent: 28.5, trend: 'up' }),
  generateMockCopiedTrader(mockTraders[1], 1800, { returnsPercent: -12.3, trend: 'down' }),
  generateMockCopiedTrader(mockTraders[2], 3200, { returnsPercent: 35.2, trend: 'up' }),
]

export const mockPortfolioMetrics: PortfolioMetrics = generateMockPortfolioMetrics(mockCopiedTraders)

