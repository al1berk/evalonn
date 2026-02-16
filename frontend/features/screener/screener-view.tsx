'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select-native'; // Using native select for simplicity in this iteration
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, RefreshCcw, Download, SlidersHorizontal, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Screener Data
const screenerData = [
    { ticker: 'THYAO', name: 'Turk Hava Yollari', price: 285.50, change: 1.5, vol: '1.2B', mcap: '390B', pe: 4.5, eps: 65.20, sector: 'Transportation', rating: 'Strong Buy' },
    { ticker: 'ASELS', name: 'Aselsan', price: 55.20, change: -0.8, vol: '800M', mcap: '250B', pe: 12.4, eps: 4.45, sector: 'Defense', rating: 'Buy' },
    { ticker: 'KCHOL', name: 'Koc Holding', price: 180.10, change: 0.5, vol: '500M', mcap: '450B', pe: 5.2, eps: 34.10, sector: 'Conglomerate', rating: 'Neutral' },
    { ticker: 'AKBNK', name: 'Akbank', price: 42.30, change: 2.1, vol: '950M', mcap: '220B', pe: 3.1, eps: 13.50, sector: 'Banking', rating: 'Strong Buy' },
    { ticker: 'GARAN', name: 'Garanti BBVA', price: 68.90, change: 1.8, vol: '1.1B', mcap: '290B', pe: 3.8, eps: 18.20, sector: 'Banking', rating: 'Buy' },
    { ticker: 'EREGL', name: 'Eregli Demir Celik', price: 45.60, change: -1.2, vol: '600M', mcap: '160B', pe: 15.6, eps: 2.90, sector: 'Materials', rating: 'Sell' },
    { ticker: 'TUPRS', name: 'Tupras', price: 165.40, change: 0.3, vol: '450M', mcap: '320B', pe: 6.7, eps: 24.50, sector: 'Energy', rating: 'Neutral' },
    { ticker: 'SAHOL', name: 'Sabanci Holding', price: 82.10, change: 1.1, vol: '300M', mcap: '170B', pe: 4.1, eps: 19.80, sector: 'Conglomerate', rating: 'Buy' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', price: 850.12, change: 2.5, vol: '45M', mcap: '2.1T', pe: 75.2, eps: 11.20, sector: 'Technology', rating: 'Strong Buy' },
    { ticker: 'AAPL', name: 'Apple Inc.', price: 175.50, change: -0.5, vol: '55M', mcap: '2.7T', pe: 28.5, eps: 6.40, sector: 'Technology', rating: 'Neutral' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: 405.20, change: 0.8, vol: '25M', mcap: '3.0T', pe: 35.1, eps: 11.50, sector: 'Technology', rating: 'Buy' },
];

function RatingBadge({ rating }: { rating: string }) {
    let colorClass = "bg-secondary text-muted-foreground";
    if (rating === 'Strong Buy') colorClass = "bg-chart-2/20 text-chart-2 border-chart-2/20";
    if (rating === 'Buy') colorClass = "bg-chart-2/10 text-chart-2";
    if (rating === 'Sell') colorClass = "bg-destructive/10 text-destructive";
    if (rating === 'Strong Sell') colorClass = "bg-destructive/20 text-destructive border-destructive/20";

    return (
        <Badge variant="outline" className={cn("border font-medium whitespace-nowrap h-5 text-[10px]", colorClass)}>
            {rating}
        </Badge>
    );
}


interface ScreenerViewProps {
    isWidget?: boolean;
}

export function ScreenerView({ isWidget = false }: ScreenerViewProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = screenerData.filter(item =>
        item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isWidget) {
        return (
            <div className="flex flex-col h-full bg-background">
                <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border sticky top-0 bg-background z-10 shrink-0">
                    <span className="font-semibold text-sm flex items-center gap-2">
                        <SlidersHorizontal size={16} /> Screener
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><Filter size={14} /></Button>
                </div>
                <div className="flex-1 overflow-auto p-0">
                    {filteredData.slice(0, 10).map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2 px-4 hover:bg-accent/50 cursor-pointer border-b border-border last:border-0">
                            <div className="flex flex-col">
                                <span className="text-sm font-bold">{item.ticker}</span>
                                <span className="text-[10px] text-muted-foreground truncate max-w-[100px]">{item.name}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm">{item.price.toFixed(2)}</div>
                                <div className={cn("text-[10px] font-medium", item.change >= 0 ? "text-chart-2" : "text-destructive")}>
                                    {item.change > 0 ? '+' : ''}{item.change}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-background">
            {/* Header / Filter Toolbar */}
            <div className="flex flex-col border-b border-border bg-background p-4 gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                        Stock Screener <Badge variant="secondary" className="text-xs">BETA</Badge>
                    </h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-2 border-border text-muted-foreground hover:text-foreground">
                            <Download size={14} /> Export
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 gap-2 border-border text-muted-foreground hover:text-foreground">
                            <RefreshCcw size={14} /> Refresh
                        </Button>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full max-w-xs">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                            placeholder="Symbol or Name..."
                            className="pl-9 h-9 bg-secondary/50 border-border"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Select className="w-[120px] h-9 bg-secondary/50 border-border text-sm">
                        <option>All Markets</option>
                        <option>BIST</option>
                        <option>NASDAQ</option>
                        <option>NYSE</option>
                    </Select>

                    <Select className="w-[140px] h-9 bg-secondary/50 border-border text-sm">
                        <option>All Sectors</option>
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                    </Select>

                    <Select className="w-[140px] h-9 bg-secondary/50 border-border text-sm">
                        <option>All Industries</option>
                        <option>Software</option>
                        <option>Banks</option>
                    </Select>

                    <Button variant="secondary" size="sm" className="h-9 gap-2 ml-auto">
                        <Filter size={14} /> Filters
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
                        <SlidersHorizontal size={16} />
                    </Button>
                </div>
            </div>

            {/* Screener Table */}
            <div className="flex-1 overflow-auto bg-background p-4">
                <Card className="bg-card border-border overflow-hidden rounded-md">
                    <Table>
                        <TableHeader className="bg-secondary/30 sticky top-0 z-10 backdrop-blur-sm">
                            <TableRow className="border-border hover:bg-transparent">
                                <TableHead className="w-[200px] text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-4">Ticker</TableHead>
                                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</TableHead>
                                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Change %</TableHead>
                                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Volume</TableHead>
                                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Market Cap</TableHead>
                                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">P/E</TableHead>
                                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">EPS (TTM)</TableHead>
                                <TableHead className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sector</TableHead>
                                <TableHead className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground pr-4">Rating</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.map((item, i) => (
                                <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group cursor-pointer h-12">
                                    <TableCell className="font-medium pl-4 py-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-7 w-7 rounded-sm bg-secondary flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                                {item.ticker[0]}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{item.ticker}</span>
                                                <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">{item.name}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-sm font-medium">{item.price.toFixed(2)}</TableCell>
                                    <TableCell className={cn("text-right font-medium text-sm", item.change >= 0 ? "text-chart-2" : "text-destructive")}>
                                        {item.change > 0 ? '+' : ''}{item.change}%
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">{item.vol}</TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">{item.mcap}</TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">{item.pe}</TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">{item.eps}</TableCell>
                                    <TableCell className="text-right text-sm text-muted-foreground">{item.sector}</TableCell>
                                    <TableCell className="text-center pr-4">
                                        <div className="flex justify-center">
                                            <RatingBadge rating={item.rating} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-secondary/10">
                        <span>Showing {filteredData.length} matches</span>
                        <div className="flex items-center gap-2">
                            <span className="cursor-pointer hover:text-foreground">1</span>
                            <span className="cursor-pointer hover:text-foreground">2</span>
                            <span className="cursor-pointer hover:text-foreground">3</span>
                            <MoreHorizontal size={14} />
                            <span className="cursor-pointer hover:text-foreground">Last</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
