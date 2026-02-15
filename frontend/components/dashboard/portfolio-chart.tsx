'use client'

import { useState, useEffect, useRef } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'
import { usePortfolioChart } from '@/hooks/use-prices'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

type Period = '1D' | '1W' | '1M'

const periodLabels: Record<Period, string> = {
    '1D': '1 Gün',
    '1W': '1 Hafta',
    '1M': '1 Ay',
}

export function PortfolioChart() {
    const [period, setPeriod] = useState<Period>('1D')
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const containerRef = useRef<HTMLDivElement>(null)
    const { data, isLoading, error } = usePortfolioChart(period)

    // Use ResizeObserver to measure container dimensions
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect
                setDimensions({ width, height })
            }
        })

        resizeObserver.observe(container)
        return () => resizeObserver.disconnect()
    }, [])

    // Transform data for recharts
    const chartData = data?.data.map((bar) => ({
        time: new Date(bar.t).toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            ...(period !== '1D' && { day: '2-digit', month: 'short' }),
        }),
        value: bar.c,
    })) || []

    // Calculate change
    const firstValue = chartData[0]?.value || 0
    const lastValue = chartData[chartData.length - 1]?.value || 0
    const change = lastValue - firstValue
    const changePercent = firstValue > 0 ? (change / firstValue) * 100 : 0
    const isPositive = change >= 0

    return (
        <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#151923] border-slate-800/50 hover:border-blue-500/30 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                        <CardTitle className="text-base font-medium text-white">
                            Portfolio Performance
                        </CardTitle>
                        <p className="text-xs text-slate-400 mt-0.5">
                            BIST Demo Verisi
                        </p>
                    </div>
                </div>

                {/* Period Tabs */}
                <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
                    {(['1D', '1W', '1M'] as Period[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                                period === p
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </CardHeader>

            <CardContent>
                {/* Value Display */}
                <div className="mb-4">
                    <div className="text-2xl font-bold text-white">
                        ₺{lastValue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </div>
                    <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
                        <span className="text-slate-400 font-normal ml-2">{periodLabels[period]}</span>
                    </div>
                </div>

                {/* Chart */}
                <div ref={containerRef} className="h-[200px] sm:h-[250px] w-full min-w-0">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="animate-pulse text-slate-400">Yükleniyor...</div>
                        </div>
                    ) : error ? (
                        <div className="h-full flex items-center justify-center">
                            <div className="text-red-400 text-sm">Veri yüklenemedi</div>
                        </div>
                    ) : dimensions.width > 0 && dimensions.height > 0 ? (
                        <AreaChart 
                            data={chartData} 
                            width={dimensions.width} 
                            height={dimensions.height}
                        >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={isPositive ? '#26A69A' : '#EF5350'}
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={isPositive ? '#26A69A' : '#EF5350'}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="time"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 10 }}
                                interval="preserveStartEnd"
                            />
                            <YAxis
                                domain={['dataMin - 1', 'dataMax + 1']}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 10 }}
                                width={50}
                                tickFormatter={(value) => `₺${value.toFixed(0)}`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1f2e',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#fff',
                                }}
                                labelStyle={{ color: '#94a3b8' }}
                                formatter={(value: number) => [
                                    `₺${value.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`,
                                    'Fiyat',
                                ]}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={isPositive ? '#26A69A' : '#EF5350'}
                                strokeWidth={2}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <div className="animate-pulse text-slate-400">Yükleniyor...</div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
