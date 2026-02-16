// Global TypeScript types

export interface Market {
    id: string
    symbol: string
    name: string
    price: number
    change: number
    changePercent: number
    volume: number
    marketCap?: number
    category: 'BIST' | 'NASDAQ' | 'FOREX' | 'CRYPTO'
}

export interface Asset extends Market {
    open: number
    high: number
    low: number
    prevClose: number
    logo?: string
}

export interface User {
    id: string
    email: string
    name?: string
    photoURL?: string
    createdAt: string
}

export interface PriceHistory {
    timestamp: number
    open: number
    high: number
    low: number
    close: number
    volume: number
}

// Evalon API Types
export interface PriceBar {
    t: string   // timestamp (ISO format)
    o: number   // open
    h: number   // high
    l: number   // low
    c: number   // close
    v: number   // volume
}

export interface PriceResponse {
    ticker: string
    timeframe: string
    rows: number
    data: PriceBar[]
}

// Watchlist item for dashboard
export interface WatchlistItem {
    ticker: string
    name: string
    price: number
    change: number
    changePercent: number
    priceHistory: PriceBar[]
}
