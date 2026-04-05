'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe, TrendingUp, TrendingDown, Bitcoin, DollarSign, Activity, MoreHorizontal, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TICKERS_RAW, PriceBar } from '@/types/market';
import { MARKET_TICKERS } from '@/config/markets';
import { pricesService } from '@/services/prices';
import { useRouter } from 'next/navigation';

// Keep mock data format but use tickers from config
const mockMarketData = {
    nasdaq: MARKET_TICKERS.NASDAQ.map(t => ({ ...t, price: 850.12, changePct: 2.5, changeVal: 20.50, high: 855.00, low: 835.00, vol: '45M', rating: 'Strong Buy' })),
    crypto: MARKET_TICKERS.CRYPTO.map(t => ({ ...t, price: 65200.00, changePct: 2.1, changeVal: 1350.00, high: 65800.00, low: 63500.00, vol: '45B', rating: 'Strong Buy' })),
    forex: MARKET_TICKERS.FOREX.map(t => ({ ...t, price: 1.0850, changePct: 0.1, changeVal: 0.0011, high: 1.0870, low: 1.0830, vol: '-', rating: 'Neutral' }))
};

function formatVolume(vol: number) {
    if (vol >= 1000000000) {
        return (vol / 1000000000).toFixed(2) + 'B';
    }
    if (vol >= 1000000) {
        return (vol / 1000000).toFixed(2) + 'M';
    }
    if (vol >= 1000) {
        return (vol / 1000).toFixed(2) + 'K';
    }
    return vol.toString();
}

function RatingBadge({ rating }: { rating: string }) {
    let colorClass = "bg-secondary text-muted-foreground";
    if (rating === 'Strong Buy') colorClass = "bg-chart-2/20 text-chart-2";
    if (rating === 'Buy') colorClass = "bg-chart-2/10 text-chart-2";
    if (rating === 'Sell') colorClass = "bg-destructive/10 text-destructive";
    if (rating === 'Strong Sell') colorClass = "bg-destructive/20 text-destructive border-destructive/20";

    return (
        <Badge variant="outline" className={cn("border-0 font-medium whitespace-nowrap", colorClass)}>
            {rating}
        </Badge>
    );
}

// Added `isInteractive` prop to optionally disable linking
function MarketTable({ data, isLoading, isInteractive = false }: { data: any[], isLoading?: boolean, isInteractive?: boolean }) {
    const router = useRouter();
    if (isLoading) {
        return (
            <Card className="bg-card border-none rounded-none shadow-none overflow-hidden flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </Card>
        );
    }

    return (
        <Card className="bg-card border-none rounded-none shadow-none overflow-hidden">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-background hover:bg-background">
                        <TableRow className="border-border hover:bg-background">
                            <TableHead className="w-[300px] text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-4">Ticker</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Change %</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Change</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">High</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Low</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Volume</TableHead>
                            <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-4">Rating</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item, i) => {
                            const RowContent = (
                                <>
                                    <TableCell className="font-medium pl-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                                {item.ticker ? item.ticker[0] : '?'}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.ticker}</span>
                                                <span className="text-xs text-muted-foreground">{item.name || 'Stock'}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-sm">{item.price?.toFixed(2) || '-'}</TableCell>
                                    <TableCell className={cn("text-right font-medium text-sm", item.changePct >= 0 ? "text-chart-2" : "text-destructive")}>
                                        {item.changePct !== undefined ? `${item.changePct > 0 ? '+' : ''}${item.changePct}%` : '-'}
                                    </TableCell>
                                    <TableCell className={cn("text-right font-medium text-sm", item.changeVal >= 0 ? "text-chart-2" : "text-destructive")}>
                                        {item.changeVal !== undefined ? `${item.changeVal > 0 ? '+' : ''}${item.changeVal.toFixed(2)}` : '-'}
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-sm text-muted-foreground">{item.high?.toFixed(2) || '-'}</TableCell>
                                    <TableCell className="text-right font-mono text-sm text-muted-foreground">{item.low?.toFixed(2) || '-'}</TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">{typeof item.vol === 'number' ? formatVolume(item.vol) : item.vol || '-'}</TableCell>
                                    <TableCell className="text-right pr-4">
                                        <RatingBadge rating={item.rating || 'Neutral'} />
                                    </TableCell>
                                </>
                            );

                            return (
                                <TableRow
                                    key={i}
                                    className={cn("border-border hover:bg-muted/50 transition-colors group relative", isInteractive && "cursor-pointer")}
                                    onClick={() => isInteractive && router.push(`/markets/${item.ticker}`)}
                                >
                                    {RowContent}
                                </TableRow>
                            );
                        })}
                        {data.length === 0 && !isLoading && (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}

function MarketSummaryCard({ title, icon, color, data }: { title: string, icon: React.ReactNode, color: string, data: any }) {
    return (
        <Card className="p-5 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105", color)}>
                    <div className="text-white">{icon}</div>
                </div>
                <div className="flex flex-col items-end">
                    <span className={cn("text-sm font-bold", data.change >= 0 ? "text-chart-2" : "text-destructive")}>
                        {data.change > 0 ? '+' : ''}{data.change}%
                    </span>
                    <span className="text-xs text-muted-foreground">24h Change</span>
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="text-base font-medium text-muted-foreground">{title}</h3>
                <p className="text-2xl font-bold tracking-tight">{data.value.toLocaleString()}</p>
            </div>
        </Card>
    )
}

export function MarketsView() {
    const [bistData, setBistData] = useState<any[]>([]);
    const [isLoadingBist, setIsLoadingBist] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchBistData = async () => {
            setIsLoadingBist(true);
            try {
                // Fetch all tickers in the background. Note: this will make multiple concurrent requests, but is fine for this small list.
                const tickersToDisplay = TICKERS_RAW;

                const fetchPromises = tickersToDisplay.map(async (ticker) => {
                    const res = await pricesService.getLatestPriceWithChange(ticker);
                    if (res && res.current) {
                        const currentPrice = res.current.c;
                        const previousPrice = res.previous ? res.previous.c : currentPrice;
                        const changeVal = currentPrice - previousPrice;
                        const changePct = previousPrice !== 0 ? (changeVal / previousPrice) * 100 : 0;

                        // Determine simple rating based on change for visual effect
                        let rating = 'Neutral';
                        if (changePct > 2) rating = 'Strong Buy';
                        else if (changePct > 0.5) rating = 'Buy';
                        else if (changePct < -2) rating = 'Strong Sell';
                        else if (changePct < -0.5) rating = 'Sell';

                        return {
                            ticker: ticker,
                            name: ticker, // don't have company names in TICKERS_RAW, use ticker for now
                            price: currentPrice,
                            changePct: parseFloat(changePct.toFixed(2)),
                            changeVal: parseFloat(changeVal.toFixed(2)),
                            high: res.current.h,
                            low: res.current.l,
                            vol: res.current.v,
                            rating: rating
                        };
                    }
                    return null;
                });

                const results = await Promise.allSettled(fetchPromises);
                const validData = results
                    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled' && r.value !== null)
                    .map(r => r.value);

                if (isMounted) {
                    setBistData(validData);
                }
            } catch (error) {
                console.error("Error fetching market data:", error);
            } finally {
                if (isMounted) {
                    setIsLoadingBist(false);
                }
            }
        };

        fetchBistData();
        return () => { isMounted = false; };
    }, []);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-background" />;
    }

    return (
        <div className="flex flex-col w-full h-full bg-background">
            {/* Header Section */}
            <div className="p-6 border-b border-border bg-background">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Markets Overview</h1>
                    <p className="text-muted-foreground">Global insights, stocks, crypto, and currency pairs.</p>
                </div>

                {/* Summary Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <MarketSummaryCard
                        title="BIST 100"
                        icon={<TrendingUp size={20} />}
                        color="bg-chart-5"
                        data={{ value: 9250.45, change: 1.25 }}
                    />
                    <MarketSummaryCard
                        title="NASDAQ"
                        icon={<Activity size={20} />}
                        color="bg-primary"
                        data={{ value: 16200.80, change: 0.85 }}
                    />
                    <MarketSummaryCard
                        title="Bitcoin"
                        icon={<Bitcoin size={20} />}
                        color="bg-chart-4"
                        data={{ value: 65200.00, change: 2.1 }}
                    />
                    <MarketSummaryCard
                        title="EUR/USD"
                        icon={<DollarSign size={20} />}
                        color="bg-chart-2"
                        data={{ value: 1.0850, change: 0.1 }}
                    />
                </div>
            </div>

            {/* Main Tabs and Table Section */}
            <div className="flex-1 p-6">
                <Tabs defaultValue="bist" className="w-full">
                    <div className="flex items-center justify-between mb-6">
                        <TabsList className="bg-transparent p-0 gap-6 h-auto">
                            <TabsTrigger
                                value="bist"
                                className="bg-transparent p-0 pb-2 text-base rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-all"
                            >
                                BIST
                            </TabsTrigger>
                            <TabsTrigger
                                value="nasdaq"
                                className="bg-transparent p-0 pb-2 text-base rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-all"
                            >
                                NASDAQ
                            </TabsTrigger>
                            <TabsTrigger
                                value="crypto"
                                className="bg-transparent p-0 pb-2 text-base rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-all"
                            >
                                Crypto
                            </TabsTrigger>
                            <TabsTrigger
                                value="forex"
                                className="bg-transparent p-0 pb-2 text-base rounded-none border-b-2 border-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground hover:text-foreground transition-all"
                            >
                                Forex
                            </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs px-2 py-1 gap-1 border-border text-muted-foreground hover:text-foreground cursor-pointer">
                                <MoreHorizontal size={14} /> More Filters
                            </Badge>
                        </div>
                    </div>

                    <TabsContent value="bist" className="mt-0 animate-in fade-in duration-500">
                        <MarketTable data={bistData} isLoading={isLoadingBist} isInteractive={true} />
                    </TabsContent>
                    <TabsContent value="nasdaq" className="mt-0 animate-in fade-in duration-500">
                        <MarketTable data={mockMarketData.nasdaq} isInteractive={true} />
                    </TabsContent>
                    <TabsContent value="crypto" className="mt-0 animate-in fade-in duration-500">
                        <MarketTable data={mockMarketData.crypto} isInteractive={true} />
                    </TabsContent>
                    <TabsContent value="forex" className="mt-0 animate-in fade-in duration-500">
                        <MarketTable data={mockMarketData.forex} isInteractive={true} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

