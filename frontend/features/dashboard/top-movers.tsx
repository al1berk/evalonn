'use client'

import { useRouter } from 'next/navigation'
import { TrendingUp, TrendingDown, Flame, Snowflake, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMarketMovers, DashboardTicker } from '@/hooks/use-dashboard-data'

interface MoverCardProps {
    type: 'gainers' | 'losers'
    data: DashboardTicker[]
    isLoading: boolean
}

function MoverCard({ type, data, isLoading }: MoverCardProps) {
    const router = useRouter()
    const isGainers = type === 'gainers'

    const Icon = isGainers ? Flame : Snowflake
    const TrendIcon = isGainers ? TrendingUp : TrendingDown
    const title = isGainers ? 'Top Gainers' : 'Top Losers'
    const subtitle = isGainers ? 'Best performers today' : 'Biggest drops today'
    const accentColor = isGainers ? '#089981' : '#f23645'
    const bgColor = isGainers ? 'bg-[#089981]/10' : 'bg-[#f23645]/10'

    const handleClick = (ticker: string) => {
        router.push(`/markets/${ticker}`)
    }

    return (
        <div className="rounded-xl bg-card border border-border overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <div className="flex items-center gap-2">
                    <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center", bgColor)}>
                        <Icon className="h-3.5 w-3.5" style={{ color: accentColor }} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                        <p className="text-[10px] text-muted-foreground">{subtitle}</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-2 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                        No data available
                    </div>
                ) : (
                    <div className="space-y-1">
                        {data.map((item, index) => (
                            <div
                                key={item.ticker}
                                onClick={() => handleClick(item.ticker)}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                        {index + 1}
                                    </span>
                                    <div>
                                        <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {item.ticker}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground truncate max-w-[100px]">
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-foreground">
                                        ₺{item.price.toFixed(2)}
                                    </span>
                                    <div
                                        className={cn(
                                            "flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded",
                                            bgColor
                                        )}
                                        style={{ color: accentColor }}
                                    >
                                        <TrendIcon className="h-3 w-3" />
                                        {isGainers ? '+' : ''}{item.changePercent.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export function TopGainers() {
    const { data, isLoading } = useMarketMovers()
    return <MoverCard type="gainers" data={data?.topGainers || []} isLoading={isLoading} />
}

export function TopLosers() {
    const { data, isLoading } = useMarketMovers()
    return <MoverCard type="losers" data={data?.topLosers || []} isLoading={isLoading} />
}
