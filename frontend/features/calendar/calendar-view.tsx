'use client';

import { mockCalendarEvents } from '@/data/mocks';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
    isWidget?: boolean;
}

export function CalendarView({ isWidget = false }: CalendarViewProps) {
    const [selectedDate, setSelectedDate] = useState('2024-02-16');

    // Group events by date if not widget, otherwise just show list
    const filteredEvents = mockCalendarEvents.filter(e => isWidget ? true : true);

    return (
        <div className={cn("flex flex-col bg-background h-full", isWidget ? "p-0" : "p-6 gap-6")}>
            {!isWidget && (
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Economic Calendar</h1>
                    <p className="text-muted-foreground">Key global economic events and indicators.</p>
                </div>
            )}

            <div className={cn("flex flex-col gap-4", isWidget ? "h-full" : "")}>
                {/* Toolbar */}
                <div className={cn("flex items-center justify-between border-b border-border pb-2 sticky top-0 bg-background z-10", isWidget ? "px-4 pt-4" : "")}>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft size={16} /></Button>
                        <span className="font-semibold text-sm">Today</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight size={16} /></Button>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Filter size={16} /></Button>
                        {!isWidget && <Button variant="ghost" size="icon" className="h-8 w-8"><CalendarIcon size={16} /></Button>}
                        {isWidget && (
                            <Link href="/calendar">
                                <Button variant="ghost" size="icon" className="h-8 w-8" title="Open Full Page">
                                    <ExternalLink size={16} />
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Event List */}
                <div className={cn("flex-1 overflow-auto", isWidget ? "px-4 pb-4" : "")}>
                    <div className="space-y-4">
                        {/* Day Header */}
                        <div>
                            <div className="text-xs font-bold text-muted-foreground mb-3 sticky top-0 bg-background py-1">
                                Friday, 16 Feb
                            </div>
                            <div className="space-y-1">
                                {mockCalendarEvents.map(event => (
                                    <div key={event.id} className="group flex items-center gap-3 py-2 px-2 hover:bg-accent/50 rounded-md cursor-pointer transition-colors border-l-2 border-transparent hover:border-primary">
                                        <div className="flex flex-col w-12 flex-shrink-0 text-right">
                                            <span className="text-xs font-medium">{event.time}</span>
                                            <span className="text-[10px] text-muted-foreground">{event.country}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-1.5 w-1.5 rounded-full ${event.importance === 'High' ? 'bg-destructive' :
                                                        event.importance === 'Medium' ? 'bg-chart-4' : 'bg-chart-2'
                                                    }`} />
                                                <span className="text-sm font-medium truncate">{event.title}</span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-1 text-xs">
                                                <div className="flex gap-1">
                                                    <span className="text-muted-foreground">Act:</span>
                                                    <span className="font-semibold">{event.actual || '-'}</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <span className="text-muted-foreground">Fcst:</span>
                                                    <span>{event.forecast}</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <span className="text-muted-foreground">Prev:</span>
                                                    <span>{event.previous}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
