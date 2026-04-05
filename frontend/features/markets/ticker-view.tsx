'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Loader2, Maximize2, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePrices } from '@/hooks/use-prices';
import { cn } from '@/lib/utils';
import type { Timeframe } from '@/types';

interface TickerViewProps {
    ticker: string;
}

// Timeframes with optimized limits
const TIMEFRAMES: { label: string; value: Timeframe; limit: number }[] = [
    { label: '1M', value: '1m', limit: 300 },   // ~1 trading day
    { label: '5M', value: '5m', limit: 150 },   // ~3 trading days
    { label: '1H', value: '1h', limit: 100 },   // ~12.5 trading days
    { label: '1D', value: '1d', limit: 50 },    // ~2 months of daily data
    { label: '1W', value: '1w', limit: 52 },    // 1 year of weekly data
];

const getTimeframeLimit = (tf: Timeframe): number => {
    const config = TIMEFRAMES.find(t => t.value === tf);
    return config?.limit || 100;
};

const getPeriodLabel = (tf: Timeframe): string => {
    switch (tf) {
        case '1d': case '1w': return 'Period';
        case '1h': return 'Weekly';
        case '5m': case '1m': return 'Daily';
        default: return 'Period';
    }
};

export function TickerView({ ticker }: TickerViewProps) {
    const [timeframe, setTimeframe] = useState<Timeframe>('1d');

    // Header data: always fetch daily (last 2 bars) for consistent price/change display
    const { data: dailyData } = usePrices(ticker, '1d', 2);

    // Chart data: fetch based on selected timeframe
    const { data: chartPriceData, isLoading, error, refetch } = usePrices(
        ticker,
        timeframe,
        getTimeframeLimit(timeframe)
    );

    const data = chartPriceData?.data || [];

    // Header stats: always based on daily data (independent of timeframe)
    const headerStats = useMemo(() => {
        const dailyBars = dailyData?.data || [];
        if (dailyBars.length === 0) return null;

        const currentBar = dailyBars[dailyBars.length - 1];
        const previousBar = dailyBars.length > 1 ? dailyBars[dailyBars.length - 2] : null;

        const price = currentBar.c;
        const change = previousBar ? currentBar.c - previousBar.c : 0;
        const changePct = previousBar && previousBar.c !== 0 ? (change / previousBar.c) * 100 : 0;
        const isPositive = change >= 0;

        // Check staleness
        const lastBarDate = new Date(currentBar.t);
        const daysSinceUpdate = Math.floor((Date.now() - lastBarDate.getTime()) / (1000 * 60 * 60 * 24));
        const isStale = daysSinceUpdate > 5;

        return { price, change, changePct, isPositive, lastBarDate, isStale, daysSinceUpdate };
    }, [dailyData]);

    // Chart stats: period high/low/vol from chart data
    const chartStats = useMemo(() => {
        if (!data || data.length === 0) return null;

        const periodHigh = Math.max(...data.map(d => d.h));
        const periodLow = Math.min(...data.map(d => d.l));
        const lastBar = data[data.length - 1];

        return { high: periodHigh, low: periodLow, vol: lastBar.v };
    }, [data]);

    // Dynamic Y-axis domain with 5% padding
    const yDomain = useMemo((): [number, number] | ['auto', 'auto'] => {
        if (!data || data.length === 0) return ['auto', 'auto'];
        const prices = data.flatMap(d => [d.c, d.h, d.l]);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const padding = (max - min) * 0.05;
        return [
            Math.floor((min - padding) * 100) / 100,
            Math.ceil((max + padding) * 100) / 100
        ];
    }, [data]);

    // Format X axis labels based on timeframe
    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);
        if (timeframe === '1m' || timeframe === '5m' || timeframe === '15m' || timeframe === '1h') {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        if (timeframe === '1M') {
            return date.toLocaleDateString([], { month: 'short', year: '2-digit' });
        }
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    // Format Tooltip date
    const formatTooltipDate = (label: string) => {
        const date = new Date(label);
        if (timeframe === '1m' || timeframe === '5m' || timeframe === '15m' || timeframe === '1h') {
            return date.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
        return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const periodLabel = getPeriodLabel(timeframe);

    return (
        <div className="flex flex-col w-full min-h-screen bg-background text-foreground animate-in fade-in duration-500">
            {/* Top Navigation Bar */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <Link href="/markets" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    <ArrowLeft size={20} />
                </Link>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground shadow-sm">
                        {ticker[0]}
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold tracking-tight leading-tight">{ticker}</h1>
                        <span className="text-xs text-muted-foreground">Borsa Istanbul</span>
                    </div>
                </div>

                {headerStats && (
                    <div className="ml-auto flex items-center gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold tracking-tight font-mono">{headerStats.price.toFixed(2)}</span>
                            <span className={cn("text-sm font-medium flex items-center gap-1", headerStats.isPositive ? "text-chart-2" : "text-destructive")}>
                                {headerStats.isPositive ? '+' : ''}{headerStats.change.toFixed(2)} ({headerStats.isPositive ? '+' : ''}{headerStats.changePct.toFixed(2)}%)
                            </span>
                            {headerStats.isStale && (
                                <span className="text-xs text-amber-500 mt-1">
                                    Data: {headerStats.lastBarDate.toLocaleDateString('tr-TR')} ({headerStats.daysSinceUpdate} days ago)
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1 p-6 flex flex-col gap-6 max-w-7xl mx-auto w-full">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 bg-card border-none rounded-xl shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{periodLabel} High</span>
                        <span className="text-lg font-mono">{chartStats?.high?.toFixed(2) || '-'}</span>
                    </Card>
                    <Card className="p-4 bg-card border-none rounded-xl shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{periodLabel} Low</span>
                        <span className="text-lg font-mono">{chartStats?.low?.toFixed(2) || '-'}</span>
                    </Card>
                    <Card className="p-4 bg-card border-none rounded-xl shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Volume (Last Bar)</span>
                        <span className="text-lg">{chartStats?.vol?.toLocaleString() || '-'}</span>
                    </Card>
                    <Card className="p-4 bg-card border-none rounded-xl shadow-sm flex flex-col gap-1">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timeframe</span>
                        <span className="text-lg uppercase">{timeframe}</span>
                    </Card>
                </div>

                {/* Stale Data Warning */}
                {headerStats?.isStale && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-center gap-2">
                        <span className="text-amber-500">&#9888;</span>
                        <span className="text-sm text-amber-200">
                            Bu timeframe icin guncel veri yok. Son veri tarihi: {headerStats.lastBarDate.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                    </div>
                )}

                {/* Chart Section */}
                <Card className="flex-1 p-1 bg-card border-border rounded-xl shadow-sm min-h-[500px] flex flex-col relative overflow-hidden">
                    {/* Chart Controls */}
                    <div className="flex items-center justify-between p-4 border-b border-border/50">
                        <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as Timeframe)}>
                            <TabsList className="bg-secondary/50 p-1">
                                {TIMEFRAMES.map((tf) => (
                                    <TabsTrigger
                                        key={tf.value}
                                        value={tf.value}
                                        className="text-xs px-3 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all"
                                    >
                                        {tf.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => refetch()}
                                className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors"
                                title="Refresh Data"
                            >
                                <RefreshCw size={16} className={cn(isLoading && "animate-spin")} />
                            </button>
                            <button className="p-2 rounded-md hover:bg-secondary text-muted-foreground transition-colors" title="Fullscreen">
                                <Maximize2 size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 w-full h-full relative p-4 min-h-[400px]">
                        {isLoading ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10 transition-all duration-300">
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                    <span className="text-sm font-medium text-muted-foreground">Loading chart data...</span>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm text-destructive">Failed to load chart data. Please try again.</span>
                            </div>
                        ) : data.length === 0 ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm text-muted-foreground">No data available for this timeframe</span>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={400} className="min-h-[400px]">
                                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPricePos" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPriceNeg" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" opacity={0.4} />
                                    <XAxis
                                        dataKey="t"
                                        tickFormatter={formatXAxis}
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={10}
                                        minTickGap={30}
                                    />
                                    <YAxis
                                        domain={yDomain}
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dx={-10}
                                        tickFormatter={(value) => typeof value === 'number' ? value.toFixed(2) : value}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#111111',
                                            borderColor: '#333333',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                                        }}
                                        itemStyle={{ color: '#ffffff' }}
                                        labelStyle={{ color: '#888888', marginBottom: '4px' }}
                                        labelFormatter={(label: any) => formatTooltipDate(label as string)}
                                        formatter={(value: any, name: any) => [
                                            typeof value === 'number' ? value.toFixed(2) : value,
                                            name === 'c' ? 'Price' : name
                                        ]}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="c"
                                        stroke={headerStats?.isPositive ? "#22c55e" : "#ef4444"}
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill={headerStats?.isPositive ? "url(#colorPricePos)" : "url(#colorPriceNeg)"}
                                        animationDuration={500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
