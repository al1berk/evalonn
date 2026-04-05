'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/use-auth-store'
import { MainChart } from '@/features/dashboard/main-chart'
import { AIAlphaPicks } from '@/features/dashboard/ai-alpha-picks'
import { LiveWatchlist } from '@/features/dashboard/live-watchlist'
import { BehavioralCheckin } from '@/features/dashboard/behavioral-checkin'
import { Search, Bell, User as UserIcon } from 'lucide-react'

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
            {/* Top bar: Welcome + Actions */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                        Welcome back, {displayName} 👋
                    </h1>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
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

                {/* Row 2: Live Watchlist + Behavioral Check-in */}
                <div className="lg:col-span-8 h-[380px] sm:h-[420px]">
                    <LiveWatchlist
                        onSelectTicker={handleSelectTicker}
                        activeTicker={selectedTicker}
                    />
                </div>
                <div className="lg:col-span-4 h-[380px] sm:h-[420px]">
                    <BehavioralCheckin />
                </div>
            </div>
        </div>
    )
}
