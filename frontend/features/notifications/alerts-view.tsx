'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Plus, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface AlertsViewProps {
    isWidget?: boolean;
}

const mockAlerts = [
    { id: 1, ticker: 'AAPL', condition: 'Price > $190.00', status: 'Active', created: '2d ago' },
    { id: 2, ticker: 'BTC-USD', condition: 'Price < $60,000', status: 'Active', created: '1w ago' },
    { id: 3, ticker: 'TSLA', condition: 'Vol > 5M', status: 'Triggered', created: '3d ago' },
];

export function AlertsView({ isWidget = false }: AlertsViewProps) {
    return (
        <div className={cn("flex flex-col h-full bg-background", isWidget ? "p-0" : "p-6")}>
            {isWidget && (
                <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border sticky top-0 bg-background z-10">
                    <span className="font-semibold text-sm flex items-center gap-2">
                        <Bell size={16} /> Price Alerts
                    </span>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><Plus size={14} /></Button>
                </div>
            )}

            <div className={cn("flex-1 overflow-auto", isWidget ? "p-0" : "")}>
                <div className="flex flex-col divide-y divide-border">
                    {mockAlerts.map(alert => (
                        <div key={alert.id} className={cn("flex items-center justify-between hover:bg-accent/50 transition-colors group", isWidget ? "p-3" : "p-4")}>
                            <div className="flex flex-col gap-0.5">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm">{alert.ticker}</span>
                                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full border",
                                        alert.status === 'Active' ? "border-primary/30 text-primary bg-primary/5" : "border-muted text-muted-foreground"
                                    )}>{alert.status}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">{alert.condition}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={14} />
                            </Button>
                        </div>
                    ))}
                    {mockAlerts.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground text-xs">
                            No alerts active.
                        </div>
                    )}
                </div>
            </div>
            {isWidget && (
                <div className="p-3 border-t border-border">
                    <Button size="sm" variant="outline" className="w-full h-8 text-xs border-dashed text-muted-foreground hover:text-primary">
                        <Plus size={12} className="mr-1.5" /> Create Alert API
                    </Button>
                </div>
            )}
        </div>
    );
}
