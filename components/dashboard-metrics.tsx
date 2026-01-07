"use client"

import { Wallet } from 'lucide-react'
import { PortfolioMetrics } from '@/lib/types'
import { mockPortfolioMetrics } from '@/lib/mock-data'

interface DashboardMetricsProps {
  metrics?: PortfolioMetrics
}

export function DashboardMetrics({ metrics = mockPortfolioMetrics }: DashboardMetricsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${value.toFixed(2)}%`
  }

  const formatPnL = (value: number) => {
    const sign = value >= 0 ? '+' : ''
    return `${sign}${formatCurrency(value)}`
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8 xl:items-center justify-between p-6 bg-[#0D0D0D] rounded-2xl">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-gray-400">
          <Wallet className="h-5 w-5" />
          <span className="text-lg">Total Portfolio Value</span>
        </div>
        <div className="text-5xl md:text-4xl lg:text-5xl font-bold text-white">
          {formatCurrency(metrics.totalPortfolioValue)}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xl:gap-16">
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-sm">Total Copied Capital</span>
          <span className="text-2xl md:text-xl lg:text-2xl font-semibold text-white">
            {formatCurrency(metrics.totalCopiedCapital)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-sm">Lifetime Copy PnL</span>
          <span className={`text-2xl md:text-xl lg:text-2xl font-semibold ${
            metrics.lifetimeCopyPnL >= 0 ? 'text-[#86efac]' : 'text-[#F87171]'
          }`}>
            {formatPnL(metrics.lifetimeCopyPnL)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-sm">ROI %</span>
          <span className={`text-2xl md:text-xl lg:text-2xl font-semibold ${
            metrics.roiPercent >= 0 ? 'text-[#86efac]' : 'text-[#F87171]'
          }`}>
            {formatPercent(metrics.roiPercent)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-sm">24h PnL</span>
          <span className={`text-2xl md:text-xl lg:text-2xl font-semibold ${
            metrics.pnl24h >= 0 ? 'text-[#86efac]' : 'text-[#F87171]'
          }`}>
            {formatPnL(metrics.pnl24h)}
          </span>
        </div>
      </div>
    </div>
  )
}
