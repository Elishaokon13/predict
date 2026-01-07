"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { CopiedTrader, Trader, PortfolioMetrics, CopyTradingConfig } from './types'
import { mockCopiedTraders, generateMockCopiedTrader } from './mock-data'

interface CopyTradingContextType {
  copiedTraders: CopiedTrader[]
  selectedTraderId: string | null
  portfolioMetrics: PortfolioMetrics
  setSelectedTrader: (traderId: string | null) => void
  addCopiedTrader: (config: CopyTradingConfig, trader: Trader) => void
  removeCopiedTrader: (traderId: string) => void
  updatePortfolioMetrics: () => void
}

const CopyTradingContext = createContext<CopyTradingContextType | undefined>(undefined)

export function CopyTradingProvider({ children }: { children: ReactNode }) {
  const [copiedTraders, setCopiedTraders] = useState<CopiedTrader[]>(mockCopiedTraders)
  const [selectedTraderId, setSelectedTraderId] = useState<string | null>(null)

  // Calculate portfolio metrics from copied traders
  const calculatePortfolioMetrics = useCallback((traders: CopiedTrader[]): PortfolioMetrics => {
    const totalCopiedCapital = traders.reduce((sum, trader) => sum + trader.capitalAllocated, 0)
    const totalPortfolioValue = traders.reduce((sum, trader) => sum + trader.currentValue, 0)
    const lifetimeCopyPnL = totalPortfolioValue - totalCopiedCapital
    const roiPercent = totalCopiedCapital > 0 
      ? (lifetimeCopyPnL / totalCopiedCapital) * 100 
      : 0
    const pnl24h = lifetimeCopyPnL * (0.01 + Math.random() * 0.05) // Simulated 24h PnL
    
    return {
      totalPortfolioValue: Math.round(totalPortfolioValue * 100) / 100,
      totalCopiedCapital: Math.round(totalCopiedCapital * 100) / 100,
      lifetimeCopyPnL: Math.round(lifetimeCopyPnL * 100) / 100,
      roiPercent: Math.round(roiPercent * 10) / 10,
      pnl24h: Math.round(pnl24h * 100) / 100,
    }
  }, [])

  const [portfolioMetrics, setPortfolioMetrics] = useState<PortfolioMetrics>(
    calculatePortfolioMetrics(copiedTraders)
  )

  const updatePortfolioMetrics = useCallback(() => {
    setPortfolioMetrics(calculatePortfolioMetrics(copiedTraders))
  }, [copiedTraders, calculatePortfolioMetrics])

  const addCopiedTrader = useCallback((config: CopyTradingConfig, trader: Trader) => {
    // Check if trader is already copied
    if (copiedTraders.some(t => t.id === trader.id)) {
      return
    }

    const capitalAllocated = config.allocationType === 'fixed' 
      ? (config.amount || 0)
      : (portfolioMetrics.totalPortfolioValue * (config.percentage || 0) / 100)

    const newCopiedTrader = generateMockCopiedTrader(trader, capitalAllocated, {
      isActive: !config.stopCopying,
    })

    const updated = [...copiedTraders, newCopiedTrader]
    setCopiedTraders(updated)
    setPortfolioMetrics(calculatePortfolioMetrics(updated))
  }, [copiedTraders, portfolioMetrics, calculatePortfolioMetrics])

  const removeCopiedTrader = useCallback((traderId: string) => {
    const updated = copiedTraders.filter(t => t.id !== traderId)
    setCopiedTraders(updated)
    setPortfolioMetrics(calculatePortfolioMetrics(updated))
    if (selectedTraderId === traderId) {
      setSelectedTraderId(null)
    }
  }, [copiedTraders, selectedTraderId, calculatePortfolioMetrics])

  const setSelectedTrader = useCallback((traderId: string | null) => {
    setSelectedTraderId(traderId)
  }, [])

  return (
    <CopyTradingContext.Provider
      value={{
        copiedTraders,
        selectedTraderId,
        portfolioMetrics,
        setSelectedTrader,
        addCopiedTrader,
        removeCopiedTrader,
        updatePortfolioMetrics,
      }}
    >
      {children}
    </CopyTradingContext.Provider>
  )
}

export function useCopyTrading() {
  const context = useContext(CopyTradingContext)
  if (context === undefined) {
    throw new Error('useCopyTrading must be used within a CopyTradingProvider')
  }
  return context
}

