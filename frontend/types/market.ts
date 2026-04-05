export interface PriceBar {
    t: string; // Time in ISO format or timestamp
    o: number; // Open
    h: number; // High
    l: number; // Low
    c: number; // Close
    v: number; // Volume
}

export type Timeframe = '1m' | '5m' | '15m' | '1h' | '1d' | '1w' | '1M';

export interface PricesResponse {
    ticker: string;
    timeframe: string;
    rows: number;
    data: PriceBar[];
}

export interface FetchPricesParams {
    ticker: string;
    timeframe: Timeframe;
    limit?: number;
    start?: string; // YYYY-MM-DDTHH:MM:SS
    end?: string;   // YYYY-MM-DDTHH:MM:SS
}

// Re-export TICKERS_RAW directly from the new central config for backward compatibility
import { MARKET_TICKERS } from '@/config/markets';
export const TICKERS_RAW = MARKET_TICKERS.BIST;

