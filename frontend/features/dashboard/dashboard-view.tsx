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

    const [selectedTicker, setSelectedTicker] = useState('XU100')
    const [selectedName, setSelectedName] = useState('BIST 100')

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

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary border border-border text-muted-foreground text-xs hover:border-accent transition-colors">
                        <Search className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Search</span>
                        <kbd className="hidden lg:inline ml-2 px-1.5 py-0.5 rounded bg-border text-[9px] text-muted-foreground">⌘K</kbd>
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-accent transition-colors">
                        <Bell className="h-4 w-4" />
                        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
                    </button>

                    {/* Profile */}
                    <button className="flex items-center gap-2 p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:border-accent transition-colors">
                        <div className="h-5 w-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <UserIcon className="h-3 w-3 text-primary" />
                        </div>
                        <span className="hidden sm:inline text-xs text-foreground font-medium">{displayName}</span>
                    </button>
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
