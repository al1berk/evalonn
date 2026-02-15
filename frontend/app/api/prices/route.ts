import { NextRequest, NextResponse } from 'next/server'

const EVALON_API_URL = process.env.NEXT_PUBLIC_EVALON_API_URL || 'https://evalon-mu.vercel.app'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const ticker = searchParams.get('ticker')
    const timeframe = searchParams.get('timeframe')
    const limit = searchParams.get('limit')

    if (!ticker || !timeframe) {
        return NextResponse.json(
            { error: 'Missing required parameters: ticker, timeframe' },
            { status: 400 }
        )
    }

    const url = `${EVALON_API_URL}/v1/prices?ticker=${ticker}&timeframe=${timeframe}&limit=${limit || 100}`

    try {
        const response = await fetch(url)

        if (!response.ok) {
            return NextResponse.json(
                { error: `API error: ${response.statusText}` },
                { status: response.status }
            )
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Proxy error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch from external API' },
            { status: 500 }
        )
    }
}
