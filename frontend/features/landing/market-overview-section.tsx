'use client'

import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { marketIndices, generateIntradayData } from '@/data/dashboard.mock'
import { TrendingUp, TrendingDown, ChevronRight } from 'lucide-react'

export function MarketOverviewSection() {
  const chartData = useMemo(() => generateIntradayData(), [])
  const bist100 = marketIndices[0]
  const isPositive = bist100.changePercent >= 0

  return (
    <section id="markets" className="relative py-24 sm:py-32 bg-[#0d1117]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#131722] via-[#0d1117] to-[#131722]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Market overview</h2>
          <ChevronRight className="h-5 w-5 text-[#787b86]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chart - BIST 100 */}
          <div className="lg:col-span-7 xl:col-span-8 rounded-2xl bg-[#1e222d] border border-[#2a2e39] p-5 sm:p-6">
            {/* Chart Header */}
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-500 text-white text-xs font-bold">
                100
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-white">{bist100.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#2a2e39] text-[10px] text-[#787b86] font-medium">
                    {bist100.symbol}
                  </span>
                  <div className="h-2.5 w-2.5 rounded-full bg-[#089981] animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                {bist100.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-[#787b86] font-medium">{bist100.currency}</span>
              <span className={`text-sm font-semibold ${isPositive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                {isPositive ? '+' : ''}{bist100.changePercent.toFixed(2)}%
              </span>
            </div>

            {/* Chart */}
            <div className="h-[280px] sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#089981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#089981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#787b86', fontSize: 11 }}
                    interval="preserveStartEnd"
                    minTickGap={50}
                  />
                  <YAxis
                    domain={['dataMin - 50', 'dataMax + 50']}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#787b86', fontSize: 11 }}
                    tickFormatter={(v) => v.toLocaleString('tr-TR')}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e222d',
                      border: '1px solid #2a2e39',
                      borderRadius: '8px',
                      color: '#d1d4dc',
                      fontSize: '12px',
                    }}
                    labelStyle={{ color: '#787b86' }}
                    formatter={(value: number | undefined) => [(value ?? 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 }), 'Price']}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#089981"
                    strokeWidth={2}
                    fill="url(#marketGradient)"
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Major Indices */}
          <div className="lg:col-span-5 xl:col-span-4 rounded-2xl bg-[#1e222d] border border-[#2a2e39] p-5 sm:p-6">
            <h3 className="text-base font-semibold text-white mb-5">Major indices</h3>

            <div className="space-y-1">
              {marketIndices.map((index) => {
                const positive = index.changePercent >= 0
                return (
                  <div
                    key={index.symbol}
                    className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#2a2e39]/50 transition-colors cursor-pointer group"
                  >
                    {/* Left: Badge + Name */}
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center h-9 w-9 rounded-full ${index.badgeColor} text-white text-[10px] font-bold flex-shrink-0`}>
                        {index.badge}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white group-hover:text-[#d1d4dc] transition-colors">
                            {index.name}
                          </span>
                          {positive ? (
                            <span className="text-[#089981]">
                              <TrendingUp className="h-3 w-3" />
                            </span>
                          ) : (
                            <span className="text-[#f23645]">
                              <TrendingDown className="h-3 w-3" />
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2a2e39] text-[#787b86] font-medium">
                          {index.symbol}
                        </span>
                      </div>
                    </div>

                    {/* Right: Price + Change */}
                    <div className="text-right">
                      <div className="text-sm font-medium text-white">
                        {index.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        <span className="text-[10px] text-[#787b86] ml-1">{index.currency}</span>
                      </div>
                      <div className={`text-xs font-medium ${positive ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                        {positive ? '+' : ''}{index.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Link */}
            <button className="flex items-center gap-1 mt-4 px-3 text-sm text-[#2962ff] hover:text-[#1e53e5] font-medium transition-colors">
              See all major indices
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
