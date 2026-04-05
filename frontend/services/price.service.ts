import { PriceResponse, PriceBar } from '@/types'

export type Timeframe = '1m' | '5m' | '1h' | '1d' | '1w' | '1M'

interface FetchPricesParams {
    ticker: string
    timeframe: Timeframe
    limit?: number
    start?: string
}

/**
 * Calculate start date based on timeframe to get recent data
 */
function getDefaultStartDate(timeframe: Timeframe): string {
    const now = new Date()
    let daysBack: number

    switch (timeframe) {
        case '1m':
        case '5m':
            daysBack = 3 // Last 3 days for intraday
            break
        case '1h':
            daysBack = 7 // Last week for hourly
            break
        case '1d':
            daysBack = 30 // Last month for daily
            break
        case '1w':
            daysBack = 180 // Last 6 months for weekly
            break
        case '1M':
            daysBack = 365 // Last year for monthly
            break
        default:
            daysBack = 30
    }

    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)
    return startDate.toISOString().split('T')[0]
}

/**
 * Fetch price data for a single ticker
 * Uses local API proxy to avoid CORS issues
 */
export async function fetchPrices({
    ticker,
    timeframe,
    limit = 100,
    start,
}: FetchPricesParams): Promise<PriceResponse> {
    // Use start date to get recent data
    const startDate = start || getDefaultStartDate(timeframe)
    
    // Use local API proxy instead of direct external API call
    const url = `/api/prices?ticker=${ticker}&timeframe=${timeframe}&limit=${limit}&start=${startDate}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Failed to fetch prices for ${ticker}: ${response.statusText}`)
    }

    return response.json()
}

/**
 * Fetch price data for multiple tickers in parallel
 */
export async function fetchMultipleTickers(
    tickers: string[],
    timeframe: Timeframe,
    limit: number = 24
): Promise<Map<string, PriceBar[]>> {
    const results = await Promise.allSettled(
        tickers.map((ticker) => fetchPrices({ ticker, timeframe, limit }))
    )

    const priceMap = new Map<string, PriceBar[]>()

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            priceMap.set(tickers[index], result.value.data)
        } else {
            console.error(`Failed to fetch ${tickers[index]}:`, result.reason)
            priceMap.set(tickers[index], [])
        }
    })

    return priceMap
}

/**
 * Calculate price change from price history
 */
export function calculateChange(data: PriceBar[]): { change: number; changePercent: number } {
    if (data.length < 2) {
        return { change: 0, changePercent: 0 }
    }

    const firstPrice = data[0].c
    const lastPrice = data[data.length - 1].c
    const change = lastPrice - firstPrice
    const changePercent = (change / firstPrice) * 100

    return { change, changePercent }
}

/**
 * Get latest price from price history
 */
export function getLatestPrice(data: PriceBar[]): number {
    if (data.length === 0) return 0
    return data[data.length - 1].c
}

// Default watchlist tickers
export const WATCHLIST_TICKERS = ['THYAO', 'GARAN', 'ASELS', 'EREGL']

// Ticker display names
export const TICKER_NAMES: Record<string, string> = {
    THYAO: 'Türk Hava Yolları',
    GARAN: 'Garanti BBVA',
    ASELS: 'Aselsan',
    EREGL: 'Ereğli Demir Çelik',
    AKBNK: 'Akbank',
    FROTO: 'Ford Otosan',
    SAHOL: 'Sabancı Holding',
    KCHOL: 'Koç Holding',
    TUPRS: 'Tüpraş',
    SISE: 'Şişecam',
}
