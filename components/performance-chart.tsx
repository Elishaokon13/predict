"use client"

import { useState } from 'react'
import { Calendar, Download } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { PerformanceDataPoint, TimeRange } from '@/lib/types'
import { generateMockPerformanceData } from '@/lib/mock-data'
import { useCopyTrading } from '@/lib/copy-trading-context'

export function PerformanceChart() {
  const { selectedTraderId, portfolioMetrics } = useCopyTrading()
  const [timeRange, setTimeRange] = useState<TimeRange>('3M')
  
  // Use portfolio value as initial value
  const chartInitialValue = portfolioMetrics.totalPortfolioValue
  
  // Generate performance data based on time range
  const data: PerformanceDataPoint[] = generateMockPerformanceData(timeRange, chartInitialValue)
  
  // Calculate Y-axis domain dynamically from data
  const values = data.map(d => d.value)
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const padding = (maxValue - minValue) * 0.1
  const yAxisMin = Math.max(0, minValue - padding)
  const yAxisMax = maxValue + padding
  
  // Generate Y-axis ticks
  const tickCount = 6
  const tickStep = (yAxisMax - yAxisMin) / (tickCount - 1)
  const yAxisTicks = Array.from({ length: tickCount }, (_, i) => 
    Math.round(yAxisMin + tickStep * i)
  )

  const displayLabel = selectedTraderId ? `Trader ${selectedTraderId}` : 'Portfolio'
  const displayInitial = selectedTraderId ? 'T' : 'P'

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#0D0D0D] rounded-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 md:gap-2 lg:gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-medium text-white">Performance</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] rounded-full border border-[#333]">
            <div className="w-4 h-4 rounded-full bg-[#86efac] flex items-center justify-center">
              <span className="text-[10px] font-bold text-black">{displayInitial}</span>
            </div>
            <span className="text-sm font-medium text-white">{displayLabel}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
          <div className="flex items-center bg-[#1A1A1A] rounded-lg p-1">
            {(['1D', '1W', '1M', '3M', '1Y'] as TimeRange[]).map((period) => (
              <button
                key={period}
                onClick={() => setTimeRange(period)}
                className={`px-3 md:px-2 lg:px-3 py-1 text-sm md:text-xs lg:text-sm rounded-md transition-colors ${
                  period === timeRange
                    ? 'bg-[#2A2A2A] text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-white bg-[#1A1A1A] rounded-lg transition-colors">
              <Calendar className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white bg-[#1A1A1A] rounded-lg transition-colors">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#86efac" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#86efac" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
            <XAxis 
              dataKey="date" 
              hide 
            />
            <YAxis 
              domain={[yAxisMin, yAxisMax]} 
              orientation="left" 
              tick={{ fill: '#666' }} 
              axisLine={false}
              tickLine={false}
              ticks={yAxisTicks}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const dataPoint = payload[0].payload as PerformanceDataPoint
                  return (
                    <div className="bg-[#1A1A1A] border border-[#333] p-3 rounded-lg shadow-xl">
                      <p className="text-white font-medium">
                        {formatCurrency(dataPoint.value)}
                        {dataPoint.pnl !== undefined && (
                          <span className={`text-sm ml-2 ${dataPoint.pnl >= 0 ? 'text-[#86efac]' : 'text-[#F87171]'}`}>
                            {dataPoint.pnl >= 0 ? '+' : ''}{formatCurrency(dataPoint.pnl)}
                          </span>
                        )}
                      </p>
                      <p className="text-gray-400 text-sm mt-1">{dataPoint.date}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#86efac" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorPerformance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
