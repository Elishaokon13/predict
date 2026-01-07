"use client"

import { useState } from 'react'
import { Blocks, BarChart3, Rabbit, Container, Banknote, SquareArrowOutUpRight, Settings2, LogOut } from 'lucide-react'

export type NavigationItem = 'dashboard' | 'analytics' | 'top-traders' | 'markets' | 'funds'

interface SidebarProps {
  activeView?: NavigationItem
  onNavigate?: (view: NavigationItem) => void
}

export function Sidebar({ activeView = 'dashboard', onNavigate }: SidebarProps) {
  const handleNavClick = (view: NavigationItem) => {
    onNavigate?.(view)
  }

  return (
    <aside className="sticky top-24 h-[calc(100vh-8rem)] md:w-48 lg:w-64 bg-[#0D0D0D] rounded-2xl hidden md:flex flex-col p-8 overflow-y-auto">
      <nav className="flex flex-col gap-8">
        <div 
          className={`flex items-center gap-4 cursor-pointer transition-colors ${
            activeView === 'dashboard' ? 'text-[#E7E7E7]' : 'text-[#919191] hover:text-[#E7E7E7]'
          }`}
          onClick={() => handleNavClick('dashboard')}
        >
          <Blocks className="h-6 w-6" />
          <span className="text-sm font-medium tracking-wide">DASHBOARD</span>
        </div>
        <div 
          className={`flex items-center gap-4 cursor-pointer transition-colors ${
            activeView === 'analytics' ? 'text-[#E7E7E7]' : 'text-[#919191] hover:text-[#E7E7E7]'
          }`}
          onClick={() => handleNavClick('analytics')}
        >
          <BarChart3 className="h-6 w-6" />
          <span className="text-sm font-medium tracking-wide">ANALYTICS</span>
        </div>
        <div 
          className={`flex items-center gap-4 cursor-pointer transition-colors ${
            activeView === 'top-traders' ? 'text-[#E7E7E7]' : 'text-[#919191] hover:text-[#E7E7E7]'
          }`}
          onClick={() => handleNavClick('top-traders')}
        >
          <Rabbit className="h-6 w-6" />
          <span className="text-sm font-medium tracking-wide">TOP TRADERS</span>
        </div>
        <div 
          className={`flex items-center gap-4 cursor-pointer transition-colors ${
            activeView === 'markets' ? 'text-[#E7E7E7]' : 'text-[#919191] hover:text-[#E7E7E7]'
          }`}
          onClick={() => handleNavClick('markets')}
        >
          <Container className="h-6 w-6" />
          <span className="text-sm font-medium tracking-wide">MARKETS</span>
        </div>
        <div 
          className={`flex items-center gap-4 cursor-pointer transition-colors ${
            activeView === 'funds' ? 'text-[#E7E7E7]' : 'text-[#919191] hover:text-[#E7E7E7]'
          }`}
          onClick={() => handleNavClick('funds')}
        >
          <Banknote className="h-6 w-6" />
          <span className="text-sm font-medium tracking-wide">FUNDS</span>
        </div>
      </nav>

      <div className="mt-auto pt-8 border-t border-[#1F1F1F] flex flex-col gap-8">
        <div className="flex items-center gap-4 text-[#919191] hover:text-[#E7E7E7] transition-colors cursor-pointer">
          <SquareArrowOutUpRight className="h-6 w-6" />
          <span className="text-sm font-medium tracking-wide">FINBRO SUPPORT</span>
        </div>
        <div className="flex items-center gap-4 text-[#919191] hover:text-[#E7E7E7] transition-colors cursor-pointer">
          <Settings2 className="h-6 w-6" />
          <span className="text-sm font-medium tracking-wide">SETTINGS</span>
        </div>
        <div className="flex items-center gap-4 text-[#919191] hover:text-[#E7E7E7] transition-colors cursor-pointer">
          <LogOut className="h-6 w-6" />
          <span className="text-sm font-medium tracking-wide">LOGOUT</span>
        </div>
      </div>
    </aside>
  )
}
