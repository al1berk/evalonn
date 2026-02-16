'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Globe, TrendingUp, TrendingDown, Bitcoin, DollarSign, Activity, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data Enriched
const marketData = {
    bist: [
        { ticker: 'THYAO', name: 'Turk Hava Yollari', price: 285.50, changePct: 1.5, changeVal: 4.20, high: 288.00, low: 282.50, vol: '1.2B', rating: 'Strong Buy' },
        { ticker: 'ASELS', name: 'Aselsan', price: 55.20, changePct: -0.8, changeVal: -0.44, high: 56.10, low: 54.80, vol: '800M', rating: 'Buy' },
        { ticker: 'KCHOL', name: 'Koc Holding', price: 180.10, changePct: 0.5, changeVal: 0.90, high: 181.50, low: 179.00, vol: '500M', rating: 'Neutral' },
        { ticker: 'AKBNK', name: 'Akbank', price: 42.30, changePct: 2.1, changeVal: 0.88, high: 42.50, low: 41.20, vol: '950M', rating: 'Strong Buy' },
        { ticker: 'GARAN', name: 'Garanti BBVA', price: 68.90, changePct: 1.8, changeVal: 1.22, high: 69.10, low: 67.50, vol: '1.1B', rating: 'Buy' },
        { ticker: 'EREGL', name: 'Eregli Demir Celik', price: 45.60, changePct: -1.2, changeVal: -0.55, high: 46.20, low: 45.10, vol: '600M', rating: 'Sell' },
        { ticker: 'TUPRS', name: 'Tupras', price: 165.40, changePct: 0.3, changeVal: 0.50, high: 166.00, low: 164.50, vol: '450M', rating: 'Neutral' },
        { ticker: 'SAHOL', name: 'Sabanci Holding', price: 82.10, changePct: 1.1, changeVal: 0.90, high: 82.50, low: 81.00, vol: '300M', rating: 'Buy' },
    ],
    nasdaq: [
        { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 850.12, changePct: 2.5, changeVal: 20.50, high: 855.00, low: 835.00, vol: '45M', rating: 'Strong Buy' },
        { ticker: 'AAPL', name: 'Apple Inc.', price: 175.50, changePct: -0.5, changeVal: -0.88, high: 176.80, low: 174.90, vol: '55M', rating: 'Neutral' },
        { ticker: 'MSFT', name: 'Microsoft Corp.', price: 405.20, changePct: 0.8, changeVal: 3.20, high: 407.00, low: 403.50, vol: '25M', rating: 'Buy' },
        { ticker: 'TSLA', name: 'Tesla Inc.', price: 180.40, changePct: -1.2, changeVal: -2.15, high: 183.00, low: 178.50, vol: '80M', rating: 'Sell' },
        { ticker: 'AMD', name: 'AMD', price: 178.45, changePct: 1.5, changeVal: 2.65, high: 180.00, low: 176.20, vol: '30M', rating: 'Buy' },
        { ticker: 'AMZN', name: 'Amazon.com', price: 174.30, changePct: 0.9, changeVal: 1.55, high: 175.00, low: 173.10, vol: '35M', rating: 'Buy' },
        { ticker: 'GOOGL', name: 'Alphabet Inc.', price: 140.50, changePct: -0.2, changeVal: -0.28, high: 141.20, low: 139.80, vol: '22M', rating: 'Neutral' },
        { ticker: 'META', name: 'Meta Platforms', price: 495.60, changePct: 1.8, changeVal: 8.75, high: 498.00, low: 490.50, vol: '18M', rating: 'Strong Buy' },
    ],
    crypto: [
        { ticker: 'BTC/USD', name: 'Bitcoin', price: 65200.00, changePct: 2.1, changeVal: 1350.00, high: 65800.00, low: 63500.00, vol: '45B', rating: 'Strong Buy' },
        { ticker: 'ETH/USD', name: 'Ethereum', price: 3450.00, changePct: 1.8, changeVal: 62.00, high: 3500.00, low: 3380.00, vol: '20B', rating: 'Buy' },
        { ticker: 'SOL/USD', name: 'Solana', price: 145.20, changePct: 5.4, changeVal: 7.80, high: 148.00, low: 138.50, vol: '5B', rating: 'Strong Buy' },
        { ticker: 'BNB/USD', name: 'Binance Coin', price: 580.10, changePct: 0.5, changeVal: 2.90, high: 585.00, low: 575.00, vol: '2B', rating: 'Neutral' },
        { ticker: 'XRP/USD', name: 'Ripple', price: 0.62, changePct: -1.2, changeVal: -0.007, high: 0.63, low: 0.61, vol: '1.5B', rating: 'Sell' },
        { ticker: 'ADA/USD', name: 'Cardano', price: 0.58, changePct: -0.5, changeVal: -0.003, high: 0.59, low: 0.57, vol: '800M', rating: 'Neutral' },
        { ticker: 'DOGE/USD', name: 'Dogecoin', price: 0.14, changePct: 8.5, changeVal: 0.012, high: 0.15, low: 0.13, vol: '3B', rating: 'Strong Buy' },
        { ticker: 'DOT/USD', name: 'Polkadot', price: 8.50, changePct: 0.2, changeVal: 0.02, high: 8.60, low: 8.40, vol: '400M', rating: 'Neutral' },
    ],
    forex: [
        { ticker: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0850, changePct: 0.1, changeVal: 0.0011, high: 1.0870, low: 1.0830, vol: '-', rating: 'Neutral' },
        { ticker: 'USD/JPY', name: 'US Dollar / Yen', price: 151.20, changePct: 0.2, changeVal: 0.30, high: 151.50, low: 150.80, vol: '-', rating: 'Buy' },
        { ticker: 'GBP/USD', name: 'Pound / US Dollar', price: 1.2650, changePct: -0.1, changeVal: -0.0012, high: 1.2680, low: 1.2630, vol: '-', rating: 'Sell' },
        { ticker: 'USD/TRY', name: 'US Dollar / Lira', price: 32.10, changePct: 0.05, changeVal: 0.016, high: 32.15, low: 32.05, vol: '-', rating: 'Strong Buy' },
        { ticker: 'XAU/USD', name: 'Gold Spot', price: 2150.00, changePct: 0.8, changeVal: 17.00, high: 2160.00, low: 2140.00, vol: '-', rating: 'Buy' },
        { ticker: 'XAG/USD', name: 'Silver Spot', price: 24.50, changePct: 1.2, changeVal: 0.29, high: 24.80, low: 24.20, vol: '-', rating: 'Buy' },
        { ticker: 'USD/CHF', name: 'US Dollar / Swiss Franc', price: 0.8850, changePct: -0.3, changeVal: -0.0026, high: 0.8880, low: 0.8830, vol: '-', rating: 'Sell' },
    ]
};

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

function MarketTable({ data }: { data: any[] }) {
    return (
        <Card className="bg-card border-none rounded-none shadow-none overflow-hidden">
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
                    {data.map((item, i) => (
                        <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group cursor-pointer">
                            <TableCell className="font-medium pl-4 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                        {item.ticker[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.ticker}</span>
                                        <span className="text-xs text-muted-foreground">{item.name}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">{item.price.toFixed(2)}</TableCell>
                            <TableCell className={cn("text-right font-medium text-sm", item.changePct >= 0 ? "text-chart-2" : "text-destructive")}>
                                {item.changePct > 0 ? '+' : ''}{item.changePct}%
                            </TableCell>
                            <TableCell className={cn("text-right font-medium text-sm", item.changeVal >= 0 ? "text-chart-2" : "text-destructive")}>
                                {item.changeVal > 0 ? '+' : ''}{item.changeVal.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm text-muted-foreground">{item.high.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-mono text-sm text-muted-foreground">{item.low.toFixed(2)}</TableCell>
                            <TableCell className="text-right text-sm text-muted-foreground">{item.vol}</TableCell>
                            <TableCell className="text-right pr-4">
                                <RatingBadge rating={item.rating} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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
                        <MarketTable data={marketData.bist} />
                    </TabsContent>
                    <TabsContent value="nasdaq" className="mt-0 animate-in fade-in duration-500">
                        <MarketTable data={marketData.nasdaq} />
                    </TabsContent>
                    <TabsContent value="crypto" className="mt-0 animate-in fade-in duration-500">
                        <MarketTable data={marketData.crypto} />
                    </TabsContent>
                    <TabsContent value="forex" className="mt-0 animate-in fade-in duration-500">
                        <MarketTable data={marketData.forex} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
