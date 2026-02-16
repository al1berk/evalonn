'use client'

import { useMemo, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { generateIntradayData, generateDailyData } from '@/data/dashboard.mock'
import { TrendingUp, TrendingDown, Maximize2, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

type Period = '1D' | '1W' | '1M' | '3M'

interface MainChartProps {
  ticker?: string
  name?: string
}

export function MainChart({ ticker = 'XU100', name = 'BIST 100' }: MainChartProps) {
  const [period, setPeriod] = useState<Period>('1D')

  const chartData = useMemo(() => {
    if (period === '1D') return generateIntradayData(78)
    if (period === '1W') return generateDailyData(7)
    if (period === '1M') return generateDailyData(30)
    return generateDailyData(90)
  }, [period])

  const firstPrice = chartData[0]?.price ?? 0
  const lastPrice = chartData[chartData.length - 1]?.price ?? 0
  const change = lastPrice - firstPrice
  const changePercent = firstPrice > 0 ? (change / firstPrice) * 100 : 0
  const isPositive = change >= 0
  const color = isPositive ? '#089981' : '#f23645'

  return (
    <div className="rounded-xl bg-card border border-border overflow-hidden h-full flex flex-col">
      {/* Chart Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-3">
          {/* Ticker info */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground">{name}</span>
              <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground font-medium">
                {ticker}
              </span>
              <div className="h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-foreground">
                {lastPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-muted-foreground">TRY</span>
              <div className={cn("flex items-center gap-0.5 text-sm font-semibold", isPositive ? "text-chart-2" : "text-destructive")}>
                {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="flex items-center bg-background rounded-lg p-0.5">
            {(['1D', '1W', '1M', '3M'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
                  period === p
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Tools */}
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            <Minus className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 min-h-[280px] px-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="50%" stopColor={color} stopOpacity={0.08} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#787b86', fontSize: 10 }}
              interval="preserveStartEnd"
              minTickGap={60}
            />
            <YAxis
              domain={['dataMin - 20', 'dataMax + 20']}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#787b86', fontSize: 10 }}
              tickFormatter={(v) => v.toLocaleString('tr-TR')}
              width={55}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))',
                fontSize: '12px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
              formatter={(value: number | undefined) => [
                (value ?? 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 }),
                'Price',
              ]}
              cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              fill="url(#chartGradient)"
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer */}
      <div className="flex items-center justify-between px-5 py-2 border-t border-border/50">
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-muted-foreground">O <span className="text-foreground">{(lastPrice - 2.1).toFixed(2)}</span></span>
          <span className="text-[10px] text-muted-foreground">H <span className="text-foreground">{(lastPrice + 3.4).toFixed(2)}</span></span>
          <span className="text-[10px] text-muted-foreground">L <span className="text-foreground">{(lastPrice - 5.2).toFixed(2)}</span></span>
          <span className="text-[10px] text-muted-foreground">C <span className="text-foreground">{lastPrice.toFixed(2)}</span></span>
        </div>
        <span className="text-[10px] text-muted-foreground">Vol <span className="text-foreground">12.5M</span></span>
      </div>
    </div>
  )
}
