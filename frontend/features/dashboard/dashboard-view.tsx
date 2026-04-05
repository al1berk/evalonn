'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/use-auth-store'
import { MainChart } from '@/features/dashboard/main-chart'
import { AIAlphaPicks } from '@/features/dashboard/ai-alpha-picks'
import { LiveWatchlist } from '@/features/dashboard/live-watchlist'
import { BehavioralCheckin } from '@/features/dashboard/behavioral-checkin'
import { TopGainers, TopLosers } from '@/features/dashboard/top-movers'
import { MarketStatus } from '@/features/dashboard/market-status'

export function DashboardView() {
    const { user } = useAuthStore()
    const displayName = user?.name || user?.email?.split('@')[0] || 'Trader'

    const [selectedTicker, setSelectedTicker] = useState('THYAO')
    const [selectedName, setSelectedName] = useState('Turkish Airlines')

    const handleSelectTicker = (ticker: string, name: string) => {
        setSelectedTicker(ticker)
        setSelectedName(name)
    }

    return (
        <div className="space-y-4 lg:space-y-5 p-4 lg:p-6">
            {/* Top bar: Welcome + Market Status + Refresh */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                        Welcome back, {displayName} 👋
                    </h1>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <MarketStatus />
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
                {/* Row 1: Main Chart + AI Alpha Picks */}
                <div className="lg:col-span-8 h-[420px] sm:h-[460px]">
                    <MainChart ticker={selectedTicker} name={selectedName} />
                </div>
                <div className="lg:col-span-4 h-[420px] sm:h-[460px]">
                    <AIAlphaPicks />
                </div>

                {/* Row 2: Top Gainers + Top Losers + Behavioral Check-in */}
                <div className="lg:col-span-4 h-[280px]">
                    <TopGainers />
                </div>
                <div className="lg:col-span-4 h-[280px]">
                    <TopLosers />
                </div>
                <div className="lg:col-span-4 h-[280px]">
                    <BehavioralCheckin />
                </div>

                {/* Row 3: Live Watchlist (full width) */}
                <div className="lg:col-span-12 h-[320px]">
                    <LiveWatchlist
                        onSelectTicker={handleSelectTicker}
                        activeTicker={selectedTicker}
                    />
                </div>
            </div>
        </div>
    )
}
