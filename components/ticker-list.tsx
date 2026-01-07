"use client"

import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { CopiedTrader } from '@/lib/types'
import { mockCopiedTraders } from '@/lib/mock-data'

interface CopiedTradersTableProps {
  traders?: CopiedTrader[]
  onTraderSelect?: (traderId: string) => void
  selectedTraderId?: string | null
}

export function CopiedTradersTable({ 
  traders = mockCopiedTraders, 
  onTraderSelect,
  selectedTraderId 
}: CopiedTradersTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  return (
    <div className="bg-[#0D0D0D] rounded-2xl p-6">
      <table className="w-full">
        <thead>
          <tr className="text-[#919191] text-sm border-b border-transparent">
            <th className="pb-4 text-left font-medium pl-2">
              <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                Trader
                <ChevronsUpDown className="h-4 w-4" />
              </div>
            </th>
            <th className="pb-4 text-left font-medium w-[120px]"></th>
            <th className="pb-4 text-right font-medium">Markets Active</th>
            <th className="pb-4 text-right font-medium">Win Rate</th>
            <th className="pb-4 text-right font-medium">Capital Allocated</th>
            <th className="pb-4 text-right font-medium">Current Value</th>
            <th className="pb-4 text-right font-medium pr-2">Returns</th>
          </tr>
        </thead>
        <tbody>
          {traders.map((trader) => (
            <tr 
              key={trader.id} 
              className={`group transition-colors border-b border-transparent last:border-0 cursor-pointer ${
                selectedTraderId === trader.id ? 'bg-[#1A1A1A]' : 'hover:bg-[#1A1A1A]'
              }`}
              onClick={() => onTraderSelect?.(trader.id)}
            >
              <td className="py-4 pl-2 rounded-l-xl">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white">{trader.username}</span>
                </div>
              </td>
              <td className="py-4">
                <div className="h-10 w-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trader.chartData}>
                      <defs>
                        <linearGradient id={`gradient-${trader.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={trader.trend === 'up' ? '#22c55e' : '#ef4444'} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={trader.trend === 'up' ? '#22c55e' : '#ef4444'} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={trader.trend === 'up' ? '#22c55e' : '#ef4444'}
                        strokeWidth={2}
                        fill={`url(#gradient-${trader.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </td>
              <td className="py-4 text-right text-white font-medium">{trader.marketsActive}</td>
              <td className="py-4 text-right text-white font-medium">{trader.winRate.toFixed(1)}%</td>
              <td className="py-4 text-right text-white font-medium">{formatCurrency(trader.capitalAllocated)}</td>
              <td className={`py-4 text-right font-medium ${trader.trend === 'up' ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}>
                {formatCurrency(trader.currentValue)}
              </td>
              <td className={`py-4 text-right font-medium pr-2 rounded-r-xl ${trader.trend === 'up' ? 'text-[#4ADE80]' : 'text-[#F87171]'}`}>
                <div className="flex items-center justify-end gap-1">
                  {trader.trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  {formatPercent(trader.returnsPercent)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
