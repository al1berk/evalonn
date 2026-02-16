'use client';

import { mockStocks } from '@/data/mocks';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, MoreHorizontal, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface WatchlistViewProps {
    isWidget?: boolean;
}

export function WatchlistView({ isWidget = false }: WatchlistViewProps) {
    return (
        <div className={cn("flex flex-col h-full", isWidget ? "bg-background" : "h-[calc(100vh-64px)]")}>
            {!isWidget && (
                <div className="border-b border-border p-4 flex items-center justify-between bg-card">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">My Watchlist</h1>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Add symbol..." className="pl-8 bg-background border-border" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm"><Plus size={16} className="mr-2" /> New List</Button>
                    </div>
                </div>
            )}

            {isWidget && (
                <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border sticky top-0 bg-background z-10 transition-colors">
                    <span className="font-semibold text-sm flex items-center gap-2">My Watchlist</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6"><Plus size={14} /></Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6"><MoreHorizontal size={14} /></Button>
                    </div>
                </div>
            )}

            <div className={cn("flex-1 overflow-auto bg-background", isWidget ? "px-0" : "")}>
                <table className="w-full text-sm text-left">
                    {!isWidget && (
                        <thead className="bg-muted/50 sticky top-0 z-10 backdrop-blur-sm">
                            <tr>
                                <th className="p-4 font-medium text-muted-foreground">Symbol</th>
                                <th className="p-4 font-medium text-muted-foreground text-right">Last</th>
                                <th className="p-4 font-medium text-muted-foreground text-right">Chg</th>
                                <th className="p-4 font-medium text-muted-foreground text-right">Chg%</th>
                                <th className="p-4 font-medium text-muted-foreground text-right">High</th>
                                <th className="p-4 font-medium text-muted-foreground text-right">Low</th>
                                <th className="p-4 font-medium text-muted-foreground text-right">Vol</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                    )}
                    <tbody>
                        {mockStocks.map((stock) => (
                            <tr key={stock.ticker} className="border-b border-border hover:bg-accent/5 group cursor-pointer transition-colors">
                                <td className={cn("p-4", isWidget && "py-2 px-3")}>
                                    <Link href={`/stock/${stock.ticker}`} className="flex flex-col">
                                        <span className="font-bold text-foreground group-hover:text-primary transition-colors">{stock.ticker}</span>
                                        {!isWidget && <span className="text-xs text-muted-foreground">{stock.name}</span>}
                                    </Link>
                                </td>
                                <td className={cn("p-4 text-right font-mono text-base", isWidget && "py-2 px-3 text-sm")}>{stock.price.toFixed(2)}</td>

                                {!isWidget && (
                                    <>
                                        <td className={`p-4 text-right font-medium ${stock.change >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                                            {stock.change > 0 ? '+' : ''}{stock.change}
                                        </td>
                                        <td className="p-4 text-right">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${stock.change >= 0 ? 'bg-chart-2/10 text-chart-2' : 'bg-destructive/10 text-destructive'
                                                }`}>
                                                {stock.changePercent}%
                                            </span>
                                        </td>
                                    </>
                                )}

                                {isWidget && (
                                    <td className="p-2 text-right px-3">
                                        <span className={cn("text-xs font-medium block", stock.change >= 0 ? 'text-chart-2' : 'text-destructive')}>
                                            {stock.changePercent}%
                                        </span>
                                    </td>
                                )}

                                {!isWidget && (
                                    <>
                                        <td className="p-4 text-right text-muted-foreground">{(stock.price * 1.02).toFixed(2)}</td>
                                        <td className="p-4 text-right text-muted-foreground">{(stock.price * 0.98).toFixed(2)}</td>
                                        <td className="p-4 text-right text-muted-foreground">1.2M</td>
                                        <td className="p-4 text-center">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                                <MoreHorizontal size={16} />
                                            </Button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
