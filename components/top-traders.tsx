"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { TopTrader, CopyTradingConfig } from '@/lib/types'
import { generateMockTopTraders } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { CopyTraderModal } from '@/components/copy-trader-modal'
import { useCopyTrading } from '@/lib/copy-trading-context'

const TRADERS_PER_PAGE = 20

export function TopTraders() {
  const { addCopiedTrader, copiedTraders } = useCopyTrading()
  const [allTraders, setAllTraders] = useState<TopTrader[]>([])
  const [displayedTraders, setDisplayedTraders] = useState<TopTrader[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTrader, setSelectedTrader] = useState<TopTrader | null>(null)
  const observerTarget = useRef<HTMLDivElement>(null)

  // Fetch top traders from Polymarket API
  useEffect(() => {
    async function fetchTopTraders() {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch 100 traders
        const response = await fetch('/api/polymarket/top-traders?limit=100')
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.message || 'Failed to fetch top traders')
        }
        
        if (data.traders && data.traders.length > 0) {
          // Sort by PnL descending (most profitable first) as fallback
          const sorted = [...data.traders].sort((a, b) => {
            // Calculate PnL from ROI or use rank
            const pnlA = a.roi30d || 0
            const pnlB = b.roi30d || 0
            return pnlB - pnlA
          })
          setAllTraders(sorted)
          // Display first 20
          setDisplayedTraders(sorted.slice(0, TRADERS_PER_PAGE))
        } else {
          // Fallback to mock data if API returns empty
          console.warn('No traders from API, using mock data')
          const mockTraders = generateMockTopTraders(100)
          setAllTraders(mockTraders)
          setDisplayedTraders(mockTraders.slice(0, TRADERS_PER_PAGE))
        }
      } catch (err) {
        console.error('Error fetching top traders:', err)
        setError(err instanceof Error ? err.message : 'Failed to load traders')
        // Fallback to mock data on error
        const mockTraders = generateMockTopTraders(100)
        setAllTraders(mockTraders)
        setDisplayedTraders(mockTraders.slice(0, TRADERS_PER_PAGE))
      } finally {
        setLoading(false)
      }
    }

    fetchTopTraders()
  }, [])

  // Load more traders on scroll
  const loadMore = useCallback(() => {
    if (loadingMore || displayedTraders.length >= allTraders.length) return
    
    setLoadingMore(true)
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      const nextBatch = allTraders.slice(
        displayedTraders.length,
        displayedTraders.length + TRADERS_PER_PAGE
      )
      setDisplayedTraders(prev => [...prev, ...nextBatch])
      setLoadingMore(false)
    }, 300)
  }, [allTraders, displayedTraders.length, loadingMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && displayedTraders.length < allTraders.length) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [loadMore, loadingMore, displayedTraders.length, allTraders.length])

  // Mark traders as copied if they're in the copiedTraders list
  const tradersWithCopyStatus = displayedTraders.length > 0 
    ? displayedTraders.map(trader => ({
        ...trader,
        isCopied: copiedTraders.some(ct => ct.id === trader.id)
      }))
    : []

  const handleCopyClick = (trader: TopTrader) => {
    setSelectedTrader(trader)
    setModalOpen(true)
  }

  const handleConfirmCopy = (config: CopyTradingConfig) => {
    if (selectedTrader) {
      addCopiedTrader(config, selectedTrader)
    }
  }

  const formatPercent = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
  }

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase()
  }

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 30) return 'text-[#86efac]' // Low risk - green
    if (riskScore <= 60) return 'text-yellow-400' // Medium risk - yellow
    return 'text-[#F87171]' // High risk - red
  }

  if (loading) {
    return (
      <div className="bg-[#0D0D0D] rounded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-white mb-2">Top Traders</h2>
          <p className="text-sm text-gray-400">Loading top traders from Polymarket...</p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#0D0D0D] rounded-2xl p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-white mb-2">Top Traders</h2>
        <p className="text-sm text-gray-400">
          Discover the best performing Polymarket traders to copy
          {error && <span className="text-yellow-500 ml-2">(Using fallback data)</span>}
        </p>
      </div>

      <div className="space-y-4">
        {tradersWithCopyStatus.map((trader) => (
          <div
            key={trader.id}
            className="flex items-center gap-6 p-4 bg-[#1A1A1A] rounded-xl hover:bg-[#252525] transition-colors"
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-8 text-center">
              <span className={`text-sm font-bold ${
                trader.rank <= 3 ? 'text-[#86efac]' : 'text-gray-400'
              }`}>
                #{trader.rank}
              </span>
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar className="h-12 w-12 border-2 border-[#333]">
                <AvatarFallback className="bg-gradient-to-br from-[#86efac] to-[#4ADE80] text-black font-bold">
                  {getInitials(trader.username)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Trader Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-white">{trader.username}</span>
                {trader.isCopied && (
                  <span className="px-2 py-0.5 text-xs bg-[#86efac]/20 text-[#86efac] rounded-full">
                    Copied
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Win Rate: <span className="text-white font-medium">{trader.winRate.toFixed(1)}%</span></span>
                <span>•</span>
                <span>Markets: <span className="text-white font-medium">{trader.marketsActive}</span></span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="text-right">
                <div className="text-gray-400 text-xs mb-1">7d ROI</div>
                <div className={`font-semibold ${trader.roi7d >= 0 ? 'text-[#86efac]' : 'text-[#F87171]'}`}>
                  {formatPercent(trader.roi7d)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs mb-1">30d ROI</div>
                <div className={`font-semibold ${trader.roi30d >= 0 ? 'text-[#86efac]' : 'text-[#F87171]'}`}>
                  {formatPercent(trader.roi30d)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs mb-1">Risk</div>
                <div className={`font-semibold ${getRiskColor(trader.riskScore)}`}>
                  {trader.riskScore}
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <div className="flex-shrink-0">
              <Button
                onClick={() => handleCopyClick(trader)}
                disabled={trader.isCopied}
                className={`${
                  trader.isCopied
                    ? 'bg-[#1A1A1A] text-gray-500 cursor-not-allowed'
                    : 'bg-[#86efac] text-black hover:bg-[#4ADE80]'
                } font-medium`}
              >
                {trader.isCopied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
        ))}
        
        {/* Infinite Scroll Trigger */}
        {displayedTraders.length < allTraders.length && (
          <div ref={observerTarget} className="flex items-center justify-center py-8">
            {loadingMore ? (
              <div className="text-gray-400 text-sm">Loading more traders...</div>
            ) : (
              <div className="text-gray-500 text-xs">Scroll for more</div>
            )}
          </div>
        )}
        
        {/* End of list indicator */}
        {displayedTraders.length >= allTraders.length && allTraders.length > 0 && (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500 text-sm">
              Showing all {allTraders.length} traders
            </div>
          </div>
        )}
      </div>

      {/* Copy Trader Modal */}
      {selectedTrader && (
        <CopyTraderModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          traderId={selectedTrader.id}
          traderUsername={selectedTrader.username}
          onConfirm={handleConfirmCopy}
        />
      )}
    </div>
  )
}

