'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TrendingUp, TrendingDown, Star, Filter, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWatchlist } from '@/hooks/use-prices'
import { TICKER_NAMES } from '@/services/price.service'

type CategoryFilter = 'ALL' | 'BIST'

interface DisplayWatchlistItem {
  ticker: string
  name: string
  price: number
  change: number
  changePercent: number
  aiSignal: 'Buy' | 'Sell' | 'Neutral'
  category: 'BIST'
}

const signalConfig: Record<string, { bg: string; text: string; label: string }> = {
  Buy: { bg: 'bg-[#089981]/15', text: 'text-[#089981]', label: 'BUY' },
  Sell: { bg: 'bg-[#f23645]/15', text: 'text-[#f23645]', label: 'SELL' },
  Neutral: { bg: 'bg-[#787b86]/15', text: 'text-[#787b86]', label: 'HOLD' },
}

function determineSignal(changePercent: number): 'Buy' | 'Sell' | 'Neutral' {
  if (changePercent > 1) return 'Buy'
  if (changePercent < -1) return 'Sell'
  return 'Neutral'
}

interface LiveWatchlistProps {
  onSelectTicker?: (ticker: string, name: string) => void
  activeTicker?: string
}

export function LiveWatchlist({ onSelectTicker, activeTicker }: LiveWatchlistProps) {
  const router = useRouter()
  const [filter, setFilter] = useState<CategoryFilter>('ALL')
  
  const { data: rawWatchlistData, isLoading } = useWatchlist()
  
  const watchlistData: DisplayWatchlistItem[] = (rawWatchlistData || []).map((item) => ({
    ticker: item.ticker,
    name: item.name || TICKER_NAMES[item.ticker] || item.ticker,
    price: item.price,
    change: item.change,
    changePercent: item.changePercent,
    aiSignal: determineSignal(item.changePercent),
    category: 'BIST' as const,
  }))

  const filtered = filter === 'ALL'
    ? watchlistData
    : watchlistData.filter((item) => item.category === filter)

  const categories: CategoryFilter[] = ['ALL', 'BIST']

  const handleItemClick = (item: DisplayWatchlistItem) => {
    onSelectTicker?.(item.ticker, item.name)
    router.push(`/markets/${item.ticker}`)
  }

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
            <p className="text-[10px] text-muted-foreground">{isLoading ? 'Loading...' : `${filtered.length} assets`}</p>
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
      <div className="grid grid-cols-10 gap-2 px-5 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider border-b border-border/30">
        <div className="col-span-4">Asset</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">Change</div>
        <div className="col-span-2 text-center">AI Signal</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
            No data available
          </div>
        ) : filtered.map((item) => {
          const isPositive = item.changePercent >= 0
          const signal = signalConfig[item.aiSignal] || signalConfig['Neutral']
          const isActive = item.ticker === activeTicker

          return (
            <div
              key={item.ticker}
              onClick={() => handleItemClick(item)}
              className={cn(
                "grid grid-cols-10 gap-2 items-center px-5 py-2.5 text-sm border-b border-border/20 cursor-pointer transition-all duration-150",
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

              {/* Change */}
              <div className="col-span-2 text-right">
                <span className={cn("text-xs font-semibold", isPositive ? "text-[#089981]" : "text-[#f23645]")}>
                  {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
                </span>
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
