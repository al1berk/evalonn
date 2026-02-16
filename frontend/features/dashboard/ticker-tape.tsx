'use client'

import { tickerTapeData } from '@/data/dashboard.mock'
import { cn } from '@/lib/utils'

export function TickerTape() {
  const items = tickerTapeData

  return (
    <div className="w-full h-[38px] bg-background border-b border-border overflow-hidden flex-shrink-0">
      <div className="relative h-full overflow-hidden">
        <div className="flex h-full animate-ticker-scroll">
          {/* Render items twice for seamless loop */}
          {[...items, ...items].map((item, i) => {
            const isPositive = item.changePercent >= 0
            return (
              <div
                key={`${item.symbol}-${i}`}
                className="flex items-center gap-2 px-4 h-full border-r border-border/50 cursor-pointer hover:bg-muted/50 transition-colors flex-shrink-0"
              >
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">
                  {item.symbol}
                </span>
                <span className="text-xs text-foreground font-medium whitespace-nowrap">
                  {item.price.toLocaleString('en-US', {
                    minimumFractionDigits: item.price < 10 ? 4 : 2,
                    maximumFractionDigits: item.price < 10 ? 4 : 2,
                  })}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium whitespace-nowrap",
                    isPositive ? "text-chart-2" : "text-destructive"
                  )}
                >
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
