'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ArrowUpRight, ArrowDownRight, SlidersHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ScreenerViewProps {
    isWidget?: boolean;
}

const mockScreenerResults = [
    { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 850.12, change: 2.5, signal: 'Strong Buy' },
    { ticker: 'AMD', name: 'Advanced Micro Devices', price: 178.45, change: -1.2, signal: 'Hold' },
    { ticker: 'INTC', name: 'Intel Corp.', price: 42.15, change: -0.5, signal: 'Sell' },
    { ticker: 'TSM', name: 'TSMC', price: 135.20, change: 1.8, signal: 'Buy' },
    { ticker: 'AVGO', name: 'Broadcom Inc.', price: 1250.00, change: 3.2, signal: 'Strong Buy' },
];

export function ScreenerView({ isWidget = false }: ScreenerViewProps) {
    return (
        <div className={cn("flex flex-col h-full bg-background", isWidget ? "p-0" : "p-6 gap-6")}>
            {!isWidget && (
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Stock Screener</h1>
                    <p className="text-muted-foreground">Filter and find stocks based on technical and fundamental criteria.</p>
                </div>
            )}

            <div className={cn("flex flex-col gap-4 flex-1 overflow-hidden", isWidget ? "h-full" : "")}>
                {/* Header for Widget */}
                {isWidget && (
                    <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border sticky top-0 bg-background z-10">
                        <span className="font-semibold text-sm flex items-center gap-2">
                            <SlidersHorizontal size={16} /> Screener
                        </span>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Plus size={14} /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Filter size={14} /></Button>
                        </div>
                    </div>
                )}

                {/* Filter Bar (Widget Compact) */}
                {isWidget && (
                    <div className="px-3 pb-2">
                        <div className="relative">
                            <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                            <Input placeholder="Search criteria..." className="pl-7 h-8 text-xs bg-accent/20 border-transparent focus:bg-background focus:border-primary" />
                        </div>
                    </div>
                )}


                <div className={cn("flex-1 overflow-auto", isWidget ? "px-0" : "")}>
                    <div className="space-y-1">
                        {mockScreenerResults.map(stock => (
                            <div key={stock.ticker} className="group flex items-center justify-between py-2 px-3 hover:bg-accent/50 cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm">{stock.ticker}</span>
                                        <Badge variant="outline" className={cn("text-[10px] px-1 py-0 h-4 border-border",
                                            stock.signal === 'Strong Buy' ? 'text-primary border-primary/30 bg-primary/5' :
                                                stock.signal === 'Sell' ? 'text-destructive border-destructive/30 bg-destructive/5' : 'text-muted-foreground'
                                        )}>
                                            {stock.signal}
                                        </Badge>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">{stock.name}</span>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <span className="text-sm font-mono">{stock.price.toFixed(2)}</span>
                                    <span className={cn("text-xs font-medium flex items-center", stock.change >= 0 ? "text-chart-2" : "text-destructive")}>
                                        {stock.change >= 0 ? "+" : ""}{stock.change}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
