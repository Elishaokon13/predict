"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { CopyTradingConfig } from '@/lib/types'

interface CopyTraderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  traderId: string
  traderUsername: string
  onConfirm: (config: CopyTradingConfig) => void
}

export function CopyTraderModal({
  open,
  onOpenChange,
  traderId,
  traderUsername,
  onConfirm,
}: CopyTraderModalProps) {
  const [allocationType, setAllocationType] = useState<'fixed' | 'percentage'>('fixed')
  const [fixedAmount, setFixedAmount] = useState<string>('')
  const [percentage, setPercentage] = useState<string>('')
  const [maxDrawdown, setMaxDrawdown] = useState<string>('')
  const [stopCopying, setStopCopying] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const config: CopyTradingConfig = {
      traderId,
      allocationType,
      amount: allocationType === 'fixed' ? parseFloat(fixedAmount) : undefined,
      percentage: allocationType === 'percentage' ? parseFloat(percentage) : undefined,
      maxDrawdown: maxDrawdown ? parseFloat(maxDrawdown) : undefined,
      stopCopying,
    }

    onConfirm(config)
    onOpenChange(false)
    
    // Reset form
    setFixedAmount('')
    setPercentage('')
    setMaxDrawdown('')
    setStopCopying(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0D0D0D] border-[#1F1F1F] text-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Copy Trader</DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure copy trading settings for <span className="text-white font-medium">{traderUsername}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Allocation Type */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-300">Allocation Type</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setAllocationType('fixed')}
                variant="outline"
                className={`flex-1 ${
                  allocationType === 'fixed'
                    ? 'bg-[#1A1A1A] border-[#86efac] text-[#86efac]'
                    : 'bg-[#1A1A1A] border-[#333] text-gray-400 hover:text-white'
                }`}
              >
                Fixed Amount
              </Button>
              <Button
                type="button"
                onClick={() => setAllocationType('percentage')}
                variant="outline"
                className={`flex-1 ${
                  allocationType === 'percentage'
                    ? 'bg-[#1A1A1A] border-[#86efac] text-[#86efac]'
                    : 'bg-[#1A1A1A] border-[#333] text-gray-400 hover:text-white'
                }`}
              >
                Percentage
              </Button>
            </div>
          </div>

          {/* Amount Input */}
          {allocationType === 'fixed' ? (
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-300">
                Amount (USD)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={fixedAmount}
                onChange={(e) => setFixedAmount(e.target.value)}
                className="bg-[#1A1A1A] border-[#333] text-white placeholder:text-gray-500"
                required
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="percentage" className="text-sm font-medium text-gray-300">
                Percentage of Portfolio (%)
              </Label>
              <Input
                id="percentage"
                type="number"
                step="0.1"
                min="0"
                max="100"
                placeholder="0.0"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="bg-[#1A1A1A] border-[#333] text-white placeholder:text-gray-500"
                required
              />
            </div>
          )}

          {/* Max Drawdown */}
          <div className="space-y-2">
            <Label htmlFor="drawdown" className="text-sm font-medium text-gray-300">
              Max Drawdown (%) <span className="text-gray-500 text-xs">(Optional)</span>
            </Label>
            <Input
              id="drawdown"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 20"
              value={maxDrawdown}
              onChange={(e) => setMaxDrawdown(e.target.value)}
              className="bg-[#1A1A1A] border-[#333] text-white placeholder:text-gray-500"
            />
            <p className="text-xs text-gray-500">
              Stop copying if drawdown exceeds this percentage
            </p>
          </div>

          {/* Stop Copying Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-lg border border-[#333]">
            <div className="space-y-0.5">
              <Label htmlFor="stop-copying" className="text-sm font-medium text-gray-300">
                Auto-Stop on Conditions
              </Label>
              <p className="text-xs text-gray-500">
                Automatically stop copying if conditions are met
              </p>
            </div>
            <Switch
              id="stop-copying"
              checked={stopCopying}
              onCheckedChange={setStopCopying}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-[#1A1A1A] border-[#333] text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#86efac] text-black hover:bg-[#4ADE80] font-medium"
            >
              Start Copying
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

