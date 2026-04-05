import { NextRequest, NextResponse } from 'next/server'

const EVALON_API_URL = process.env.NEXT_PUBLIC_EVALON_API_URL || 'https://evalon-mu.vercel.app'

// Simple in-memory cache
interface CacheEntry {
    data: any
    timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_TTL = 60 * 1000 // 1 minute

function getCached(key: string): any | null {
    const entry = cache.get(key)
    if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
        return entry.data
    }
    cache.delete(key)
    return null
}

function setCache(key: string, data: any): void {
    cache.set(key, { data, timestamp: Date.now() })
}

interface PriceBar {
    t: string
    o: number
    h: number
    l: number
    c: number
    v: number
}

interface TickerResult {
    ticker: string
    current: PriceBar | null
    previous: PriceBar | null
    error?: string
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const tickersParam = searchParams.get('tickers')
    const timeframe = searchParams.get('timeframe') || '1d'
    const limit = searchParams.get('limit') || '10'

    if (!tickersParam) {
        return NextResponse.json(
            { error: 'Missing required parameter: tickers (comma-separated)' },
            { status: 400 }
        )
    }

    const tickers = tickersParam.split(',').map(t => t.trim()).filter(Boolean)
    
    if (tickers.length === 0) {
        return NextResponse.json(
            { error: 'No valid tickers provided' },
            { status: 400 }
        )
    }

    if (tickers.length > 150) {
        return NextResponse.json(
            { error: 'Too many tickers (max 150)' },
            { status: 400 }
        )
    }

    // Check cache first
    const cacheKey = `batch:${timeframe}:${tickers.sort().join(',')}`
    const cached = getCached(cacheKey)
    if (cached) {
        return NextResponse.json({ ...cached, cached: true })
    }

    // Calculate start date for recent data
    const now = new Date()
    const daysBack = timeframe === '1d' ? 10 : 3
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)
    const start = startDate.toISOString().split('T')[0]

    // Fetch all tickers in parallel
    const results = await Promise.allSettled(
        tickers.map(async (ticker): Promise<TickerResult> => {
            try {
                const url = `${EVALON_API_URL}/v1/prices?ticker=${ticker}&timeframe=${timeframe}&limit=${limit}&start=${start}`
                const response = await fetch(url)
                
                if (!response.ok) {
                    return { ticker, current: null, previous: null, error: response.statusText }
                }
                
                const data = await response.json()
                const bars: PriceBar[] = data.data || []
                
                // Sort by time ascending
                bars.sort((a, b) => new Date(a.t).getTime() - new Date(b.t).getTime())
                
                const current = bars.length > 0 ? bars[bars.length - 1] : null
                const previous = bars.length > 1 ? bars[bars.length - 2] : null
                
                return { ticker, current, previous }
            } catch (e) {
                return { ticker, current: null, previous: null, error: String(e) }
            }
        })
    )

    // Process results
    const data: TickerResult[] = results.map((result, index) => {
        if (result.status === 'fulfilled') {
            return result.value
        }
        return { ticker: tickers[index], current: null, previous: null, error: 'Failed to fetch' }
    })

    const response = {
        count: data.length,
        data: data.filter(d => d.current !== null)
    }

    // Cache the result
    setCache(cacheKey, response)

    return NextResponse.json({ ...response, cached: false })
}
