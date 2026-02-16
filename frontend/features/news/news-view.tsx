'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, ExternalLink, TrendingUp, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NewsViewProps {
    isWidget?: boolean;
}

const mockNews = [
    { id: 1, title: 'Fed Signals Potential Rate Cut in Q4', source: 'Bloomberg', time: '10m ago', sentiment: 'positive' },
    { id: 2, title: 'Tech Stocks Rally on AI Optimism', source: 'Reuters', time: '30m ago', sentiment: 'positive' },
    { id: 3, title: 'Oil Prices Dip Amid Supply Concerns', source: 'CNBC', time: '1h ago', sentiment: 'negative' },
    { id: 4, title: 'Crypto Market Analysis: Bitcoin at 65k', source: 'CoinDesk', time: '2h ago', sentiment: 'neutral' },
    { id: 5, title: 'Apple Announces New VR Headset Updates', source: 'The Verge', time: '3h ago', sentiment: 'positive' },
];

export function NewsView({ isWidget = false }: NewsViewProps) {
    return (
        <div className={cn("flex flex-col h-full bg-background", isWidget ? "p-0" : "p-6 gap-6")}>
            {!isWidget && (
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Market News</h1>
                    <p className="text-muted-foreground">Latest headlines moving the markets.</p>
                </div>
            )}

            {isWidget && (
                <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border sticky top-0 bg-background z-10">
                    <span className="font-semibold text-sm flex items-center gap-2">
                        <Newspaper size={16} /> Latest News
                    </span>
                </div>
            )}

            <div className={cn("flex-1 overflow-auto", isWidget ? "p-0" : "")}>
                <div className="flex flex-col divide-y divide-border">
                    {mockNews.map(news => (
                        <div key={news.id} className={cn("flex flex-col gap-1 hover:bg-accent/50 transition-colors cursor-pointer group", isWidget ? "p-3" : "p-4")}>
                            <div className="flex justify-between items-start gap-2">
                                <h4 className={cn("font-medium leading-snug group-hover:text-primary transition-colors", isWidget ? "text-sm" : "text-base")}>
                                    {news.title}
                                </h4>
                                {!isWidget && <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100" />}
                            </div>
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <span className="font-semibold text-foreground/80">{news.source}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1"><Clock size={10} /> {news.time}</span>
                                </div>
                                <div className={cn("w-1.5 h-1.5 rounded-full",
                                    news.sentiment === 'positive' ? "bg-chart-2" :
                                        news.sentiment === 'negative' ? "bg-destructive" : "bg-chart-5"
                                )} title={news.sentiment} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
