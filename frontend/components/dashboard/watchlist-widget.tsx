'use client'

import { useWatchlist } from '@/hooks/use-prices'
import { MiniChart } from './mini-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, TrendingUp, TrendingDown } from 'lucide-react'

export function WatchlistWidget() {
    const { data: watchlist, isLoading, error } = useWatchlist()

    return (
        <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#151923] border-slate-800/50 hover:border-purple-500/30 transition-all duration-300">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                            <Star className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <CardTitle className="text-base font-medium text-white">
                                Watchlist
                            </CardTitle>
                            <p className="text-xs text-slate-400 mt-0.5">
                                Takip ettiğin hisseler
                            </p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-2">
                {isLoading ? (
                    // Loading skeleton
                    [...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 animate-pulse"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-slate-700/50" />
                                <div>
                                    <div className="w-16 h-4 bg-slate-700/50 rounded" />
                                    <div className="w-24 h-3 bg-slate-700/30 rounded mt-1" />
                                </div>
                            </div>
                            <div className="w-20 h-8 bg-slate-700/30 rounded" />
                        </div>
                    ))
                ) : error ? (
                    <div className="text-center py-8 text-red-400 text-sm">
                        Veri yüklenemedi
                    </div>
                ) : (
                    watchlist?.map((item) => {
                        const isPositive = item.changePercent >= 0

                        return (
                            <div
                                key={item.ticker}
                                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-all duration-200 cursor-pointer group"
                            >
                                {/* Left: Ticker info */}
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                                        isPositive 
                                            ? 'bg-green-500/10 text-green-500' 
                                            : 'bg-red-500/10 text-red-500'
                                    }`}>
                                        {isPositive ? (
                                            <TrendingUp className="h-4 w-4" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4" />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">
                                            {item.ticker}
                                        </div>
                                        <div className="text-xs text-slate-400 truncate max-w-[100px]">
                                            {item.name}
                                        </div>
                                    </div>
                                </div>

                                {/* Center: Mini chart */}
                                <div className="hidden sm:block">
                                    <MiniChart
                                        data={item.priceHistory}
                                        isPositive={isPositive}
                                        width={60}
                                        height={28}
                                    />
                                </div>

                                {/* Right: Price info */}
                                <div className="text-right">
                                    <div className="font-semibold text-white text-sm">
                                        ₺{item.price.toLocaleString('tr-TR', { 
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2 
                                        })}
                                    </div>
                                    <div className={`text-xs font-medium ${
                                        isPositive ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                        {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </CardContent>
        </Card>
    )
}
