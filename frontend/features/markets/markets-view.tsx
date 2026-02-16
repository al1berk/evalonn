'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Globe, TrendingUp, TrendingDown } from 'lucide-react';

const mockMarkets = [
    { id: 'bist', name: 'BIST 100', value: 9250.45, change: 1.25, region: 'TR' },
    { id: 'nasdaq', name: 'NASDAQ', value: 16200.80, change: 0.85, region: 'US' },
    { id: 'sp500', name: 'S&P 500', value: 5100.20, change: 0.45, region: 'US' },
    { id: 'crypto', name: 'Crypto Total', value: 2450000000000, change: 2.50, region: 'Global' },
];

export function MarketsView() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Global Markets</h1>
                <p className="text-muted-foreground">Overview of major indices and asset classes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockMarkets.map(market => (
                    <Card key={market.id} className="p-6 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Globe size={20} />
                            </div>
                            <Badge variant="secondary" className="bg-secondary">{market.region}</Badge>
                        </div>
                        <h3 className="text-lg font-bold mb-1">{market.name}</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{market.value.toLocaleString()}</span>
                            <span className={`text-sm font-medium flex items-center ${market.change >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                                {market.change >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                                {market.change}%
                            </span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Market Details Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="col-span-2 p-6 h-[400px] border-border bg-card flex items-center justify-center text-muted-foreground border-dashed">
                    Market Heatmap Visualization
                </Card>
                <Card className="p-6 h-[400px] border-border bg-card flex items-center justify-center text-muted-foreground border-dashed">
                    Top Gainers / Losers List
                </Card>
            </div>

        </div>
    );
}
