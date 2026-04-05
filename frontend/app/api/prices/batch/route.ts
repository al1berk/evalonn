import { NextRequest, NextResponse } from 'next/server'
import { PriceBar } from '@/types'

const EVALON_API_URL = process.env.NEXT_PUBLIC_EVALON_API_URL || 'https://evalon-mu.vercel.app'

// Enhanced cache with stale-while-revalidate
interface CacheEntry {
    data: any
    timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes - fresh data
const CACHE_STALE_TTL = 30 * 60 * 1000 // 30 minutes - serve stale if fresh fetch fails

function getCached(key: string): { data: any; isStale: boolean } | null {
    const entry = cache.get(key)
    if (!entry) return null
    
    const age = Date.now() - entry.timestamp
    if (age < CACHE_TTL) {
        return { data: entry.data, isStale: false }
    }
    if (age < CACHE_STALE_TTL) {
        return { data: entry.data, isStale: true }
    }
    cache.delete(key)
    return null
}

function setCache(key: string, data: any): void {
    cache.set(key, { data, timestamp: Date.now() })
}

// Helper to fetch with timeout
async function fetchWithTimeout(url: string, timeoutMs: number = 10000): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    try {
        const response = await fetch(url, { signal: controller.signal })
        clearTimeout(timeoutId)
        return response
    } catch (e) {
        clearTimeout(timeoutId)
        throw e
    }
}

// Helper to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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
    const limit = searchParams.get('limit') || '2' // Optimized: only fetch last 2 bars for current + previous
    const forceRefresh = searchParams.get('refresh') === 'true'

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

    // Cache is enabled
    const CACHE_ENABLED = true
    
    const cacheKey = `batch:${timeframe}:${tickers.sort().join(',')}`
    
    // Force refresh clears cache for this key
    if (forceRefresh) {
        cache.delete(cacheKey)
    }
    
    const cached = CACHE_ENABLED ? getCached(cacheKey) : null
    
    // If we have fresh cache, return immediately
    if (cached && !cached.isStale) {
        return NextResponse.json({ ...cached.data, cached: true, stale: false })
    }

    // Calculate start date and fetch limit
    // The API returns data FROM the start date up to limit
    // We need to fetch more data than requested to ensure we get the most recent bars
    const now = new Date()
    const limitNum = parseInt(limit)
    
    // For getting recent prices, always fetch at least 10 bars from 14 days ago
    // This handles weekends, holidays, and missing data
    const fetchLimit = Math.max(10, limitNum)
    const daysBack = 14 // 2 weeks ensures we cover weekends and holidays
    
    const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)
    const start = startDate.toISOString().split('T')[0]

    // Fetch a single ticker with retry
    async function fetchTicker(ticker: string, retries = 2): Promise<TickerResult> {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                // Use higher fetchLimit to ensure we get recent data, then take the last bars
                const url = `${EVALON_API_URL}/v1/prices?ticker=${ticker}&timeframe=${timeframe}&limit=${fetchLimit}&start=${start}`
                const response = await fetchWithTimeout(url, 15000) // 15 second timeout
                
                if (!response.ok) {
                    if (attempt < retries) {
                        await delay(500 * (attempt + 1)) // Backoff
                        continue
                    }
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
                if (attempt < retries) {
                    await delay(500 * (attempt + 1))
                    continue
                }
                return { ticker, current: null, previous: null, error: String(e) }
            }
        }
        return { ticker, current: null, previous: null, error: 'Max retries exceeded' }
    }

    // Fetch tickers in smaller batches to avoid overwhelming the API
    const BATCH_SIZE = 10  // Reduced from 20 to be gentler on the API
    const BATCH_DELAY = 200 // Increased delay between batches
    const allResults: TickerResult[] = []

    for (let i = 0; i < tickers.length; i += BATCH_SIZE) {
        const batch = tickers.slice(i, i + BATCH_SIZE)
        const batchResults = await Promise.allSettled(batch.map(ticker => fetchTicker(ticker)))
        
        batchResults.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                allResults.push(result.value)
            } else {
                allResults.push({ ticker: batch[index], current: null, previous: null, error: 'Failed' })
            }
        })

        // Delay between batches to be nice to the API
        if (i + BATCH_SIZE < tickers.length) {
            await delay(BATCH_DELAY)
        }
    }

    const results = allResults

    // Separate successful and failed tickers
    const successful = results.filter(d => d.current !== null)
    const failed = results.filter(d => d.current === null)

    // If we have stale cache, merge successful results with cached data for failed tickers
    let mergedData = successful
    if (cached && failed.length > 0 && cached.data.data) {
        const cachedDataMap = new Map<string, TickerResult>(
            cached.data.data.map((d: TickerResult) => [d.ticker, d])
        )
        failed.forEach(failedItem => {
            const cachedItem = cachedDataMap.get(failedItem.ticker)
            if (cachedItem && cachedItem.current) {
                mergedData.push(cachedItem)
            }
        })
    }

    const response = {
        count: results.length,
        successCount: mergedData.length,
        failedCount: tickers.length - mergedData.length,
        data: mergedData,
        failedTickers: failed.filter(f => !mergedData.find(m => m.ticker === f.ticker)).map(d => d.ticker)
    }

    // Cache if we have at least 70% success
    const successRate = mergedData.length / tickers.length
    if (CACHE_ENABLED && successRate >= 0.7) {
        setCache(cacheKey, response)
        return NextResponse.json({ ...response, cached: false, stale: false })
    } else if (CACHE_ENABLED && cached && cached.data.successCount > mergedData.length) {
        // Return better cached data if available
        console.log(`Using cached data: new ${mergedData.length}/${tickers.length}, cached ${cached.data.successCount}`)
        return NextResponse.json({ ...cached.data, cached: true, stale: true })
    } else {
        // Return without caching
        if (CACHE_ENABLED) {
            setCache(cacheKey, response)
        }
        return NextResponse.json({ ...response, cached: false, stale: false })
    }
}
