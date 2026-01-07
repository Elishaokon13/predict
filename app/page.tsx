"use client"

import { useState } from "react"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { PerformanceChart } from "@/components/performance-chart"
import { CopiedTradersTable } from "@/components/ticker-list"
import { TopTraders } from "@/components/top-traders"
import { Sidebar, type NavigationItem } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CopyTradingProvider } from "@/lib/copy-trading-context"

export default function Dashboard() {
  const [activeView, setActiveView] = useState<NavigationItem>('dashboard')

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <DashboardMetrics />
            <PerformanceChart />
            <CopiedTradersTable />
            
            {/* Status Indicator */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <div className="w-[13px] h-[13px] rounded-full bg-[#86efac]" />
              <span className="text-sm text-[#919191]">Status</span>
            </div>
          </>
        )
      case 'top-traders':
        return <TopTraders />
      case 'analytics':
        return (
          <div className="bg-[#0D0D0D] rounded-2xl p-6">
            <h2 className="text-xl font-medium text-white mb-4">Analytics</h2>
            <p className="text-gray-400">Trader performance analytics coming soon...</p>
          </div>
        )
      case 'markets':
        return (
          <div className="bg-[#0D0D0D] rounded-2xl p-6">
            <h2 className="text-xl font-medium text-white mb-4">Markets</h2>
            <p className="text-gray-400">Kalshi markets overview coming soon...</p>
          </div>
        )
      case 'funds':
        return (
          <div className="bg-[#0D0D0D] rounded-2xl p-6">
            <h2 className="text-xl font-medium text-white mb-4">Funds</h2>
            <p className="text-gray-400">Capital allocation & copy limits coming soon...</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <CopyTradingProvider>
      <div className="relative h-screen w-full bg-black text-white overflow-hidden">
        <Header />

        {/* Main Scrollable Area */}
        <div className="h-full overflow-y-auto no-scrollbar">
          <main className="flex gap-6 p-6 pt-24 min-h-full">
            <Sidebar activeView={activeView} onNavigate={setActiveView} />

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </CopyTradingProvider>
  )
}
