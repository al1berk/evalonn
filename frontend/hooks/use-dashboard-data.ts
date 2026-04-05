'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { BIST_POPULAR, BIST_AVAILABLE, TICKER_NAMES } from '@/config/markets'

export interface DashboardTicker {
    ticker: string
    name: string
    price: number
    previousPrice: number
    change: number
    changePercent: number
}

interface BatchResponse {
    count: number
    cached: boolean
    data: Array<{
        ticker: string
        current: { t: string; o: number; h: number; l: number; c: number; v: number } | null
        previous: { t: string; o: number; h: number; l: number; c: number; v: number } | null
        error?: string
    }>
}

async function fetchDashboardData(tickers: string[]): Promise<DashboardTicker[]> {
    const tickersParam = tickers.join(',')
    const url = `/api/prices/batch?tickers=${tickersParam}&timeframe=1d&limit=2` // Optimized: only last 2 bars needed

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
    }

    const result: BatchResponse = await response.json()

    return result.data.map((item) => {
        const currentPrice = item.current?.c ?? 0
        const previousPrice = item.previous?.c ?? currentPrice
        const change = currentPrice - previousPrice
        const changePercent = previousPrice > 0 ? (change / previousPrice) * 100 : 0

        return {
            ticker: item.ticker,
            name: TICKER_NAMES[item.ticker] || item.ticker,
            price: currentPrice,
            previousPrice,
            change,
            changePercent,
        }
    })
}

/**
 * Hook for watchlist data (user's watched tickers)
 * Uses batch endpoint to prevent rate limiting
 */
export function useDashboardWatchlist() {
    const watchlistTickers = BIST_POPULAR.slice(0, 6) // Top 6 popular tickers

    return useQuery({
        queryKey: ['dashboard-watchlist'],
        queryFn: () => fetchDashboardData(watchlistTickers),
        staleTime: 1000 * 30, // 30 seconds
        refetchInterval: 1000 * 60, // 1 minute
    })
}

/**
 * Hook for market movers (top gainers & losers)
 * Fetches all available tickers and sorts by change
 */
export function useMarketMovers() {
    return useQuery({
        queryKey: ['market-movers'],
        queryFn: async () => {
            const data = await fetchDashboardData([...BIST_AVAILABLE])

            // Sort by changePercent
            const sorted = [...data].sort((a, b) => b.changePercent - a.changePercent)

            // Filter out tickers with no price data
            const validData = sorted.filter((item) => item.price > 0)

            return {
                topGainers: validData.slice(0, 5),
                topLosers: validData.slice(-5).reverse(),
                all: validData,
            }
        },
        staleTime: 1000 * 60, // 1 minute
        refetchInterval: 1000 * 60 * 2, // 2 minutes
    })
}

/**
 * Hook to manually refresh all dashboard data
 */
export function useDashboardRefresh() {
    const queryClient = useQueryClient()

    const refresh = async () => {
        await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['dashboard-watchlist'] }),
            queryClient.invalidateQueries({ queryKey: ['market-movers'] }),
            queryClient.invalidateQueries({ queryKey: ['prices'] }),
        ])
    }

    return { refresh }
}

/**
 * Check if BIST market is open
 * BIST hours: Monday-Friday, 10:00-18:00 (Turkey Time, UTC+3)
 */
export function useMarketStatus() {
    return useQuery({
        queryKey: ['market-status'],
        queryFn: () => {
            const now = new Date()
            const turkeyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }))

            const day = turkeyTime.getDay()
            const hours = turkeyTime.getHours()
            const minutes = turkeyTime.getMinutes()
            const currentMinutes = hours * 60 + minutes

            const marketOpen = 10 * 60 // 10:00
            const marketClose = 18 * 60 // 18:00

            const isWeekday = day >= 1 && day <= 5
            const isDuringHours = currentMinutes >= marketOpen && currentMinutes < marketClose

            const isOpen = isWeekday && isDuringHours

            // Calculate time until next state change
            let nextChangeMinutes: number
            let nextChangeLabel: string

            if (!isWeekday) {
                // Weekend - calculate until Monday 10:00
                const daysUntilMonday = day === 0 ? 1 : 8 - day
                nextChangeMinutes = daysUntilMonday * 24 * 60 - currentMinutes + marketOpen
                nextChangeLabel = 'Opens Monday'
            } else if (currentMinutes < marketOpen) {
                // Before market open
                nextChangeMinutes = marketOpen - currentMinutes
                nextChangeLabel = 'Opens in'
            } else if (currentMinutes < marketClose) {
                // Market is open
                nextChangeMinutes = marketClose - currentMinutes
                nextChangeLabel = 'Closes in'
            } else {
                // After market close
                if (day === 5) {
                    // Friday after close
                    nextChangeMinutes = (3 * 24 * 60) - currentMinutes + marketOpen
                    nextChangeLabel = 'Opens Monday'
                } else {
                    // Other weekday after close
                    nextChangeMinutes = (24 * 60) - currentMinutes + marketOpen
                    nextChangeLabel = 'Opens tomorrow'
                }
            }

            const hours_remaining = Math.floor(nextChangeMinutes / 60)
            const mins_remaining = nextChangeMinutes % 60

            return {
                isOpen,
                nextChangeLabel,
                timeRemaining: `${hours_remaining}h ${mins_remaining}m`,
                currentTime: turkeyTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            }
        },
        staleTime: 1000 * 30, // 30 seconds
        refetchInterval: 1000 * 60, // Update every minute
    })
}
