'use client'

import { useState } from 'react'
import { watchlistData } from '@/data/dashboard.mock'
import { TrendingUp, TrendingDown, Minus, Star, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

type CategoryFilter = 'ALL' | 'BIST' | 'NASDAQ' | 'CRYPTO' | 'FOREX'

const signalConfig: Record<string, { bg: string; text: string; label: string }> = {
  Buy: { bg: 'bg-[#089981]/15', text: 'text-[#089981]', label: 'BUY' },
  Sell: { bg: 'bg-[#f23645]/15', text: 'text-[#f23645]', label: 'SELL' },
  Neutral: { bg: 'bg-[#787b86]/15', text: 'text-[#787b86]', label: 'HOLD' },
}

interface LiveWatchlistProps {
  onSelectTicker?: (ticker: string, name: string) => void
  activeTicker?: string
}

export function LiveWatchlist({ onSelectTicker, activeTicker }: LiveWatchlistProps) {
  const [filter, setFilter] = useState<CategoryFilter>('ALL')

  const filtered = filter === 'ALL'
    ? watchlistData
    : watchlistData.filter((item) => item.category === filter)

  const categories: CategoryFilter[] = ['ALL', 'BIST', 'CRYPTO', 'NASDAQ', 'FOREX']

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-[#ff9800]/10 flex items-center justify-center">
            <Star className="h-4 w-4 text-[#ff9800]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Live Watchlist</h3>
            <p className="text-[10px] text-muted-foreground">{filtered.length} assets</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-2 py-1 text-[10px] font-medium rounded transition-all duration-200",
                filter === cat
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-5 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30">
        <div className="col-span-4">Asset</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">24h Change</div>
        <div className="col-span-2 text-right hidden sm:block">Volume</div>
        <div className="col-span-2 text-center">AI Signal</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((item) => {
          const isPositive = item.changePercent >= 0
          const signal = signalConfig[item.aiSignal] || signalConfig['Neutral']
          const isActive = item.ticker === activeTicker

          return (
            <div
              key={item.ticker}
              onClick={() => onSelectTicker?.(item.ticker, item.name)}
              className={cn(
                "grid grid-cols-12 gap-2 items-center px-5 py-2.5 text-sm border-b border-border/20 cursor-pointer transition-all duration-150",
                isActive
                  ? "bg-primary/10 border-l-2 border-l-primary"
                  : "hover:bg-muted/50"
              )}
            >
              {/* Asset */}
              <div className="col-span-4 flex items-center gap-2.5">
                <div className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0",
                  isPositive ? "bg-[#089981]/10" : "bg-[#f23645]/10"
                )}>
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 text-[#089981]" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-[#f23645]" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">{item.ticker}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{item.name}</div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-right">
                <span className="text-xs font-medium text-foreground">
                  {item.price < 10
                    ? item.price.toFixed(4)
                    : item.price < 1000
                      ? item.price.toFixed(2)
                      : item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* 24h Change */}
              <div className="col-span-2 text-right">
                <span className={cn("text-xs font-semibold", isPositive ? "text-[#089981]" : "text-[#f23645]")}>
                  {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
              </div>

              {/* Volume */}
              <div className="col-span-2 text-right hidden sm:block">
                <span className="text-xs text-muted-foreground">{item.volume}</span>
              </div>

              {/* AI Signal */}
              <div className="col-span-2 flex justify-center">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${signal.bg} ${signal.text}`}>
                  {signal.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
