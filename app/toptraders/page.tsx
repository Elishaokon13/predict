"use client"

import { TopTraders } from "@/components/top-traders"
import { Sidebar, type NavigationItem } from "@/components/sidebar"
import { Header } from "@/components/header"
import { CopyTradingProvider } from "@/lib/copy-trading-context"

export default function TopTradersPage() {
  return (
    <CopyTradingProvider>
      <div className="relative h-screen w-full bg-black text-white overflow-hidden">
        <Header />

        {/* Main Scrollable Area */}
        <div className="h-full overflow-y-auto no-scrollbar">
          <main className="flex gap-6 p-6 pt-24 min-h-full">
            <Sidebar activeView="top-traders" />

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              <TopTraders />
            </div>
          </main>
        </div>
      </div>
    </CopyTradingProvider>
  )
}

