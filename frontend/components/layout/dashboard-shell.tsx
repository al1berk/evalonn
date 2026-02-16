'use client';

import { ReactNode } from 'react';
import { TickerTape } from '@/features/dashboard/ticker-tape';
import { Sidebar } from '@/src/components/layout/Sidebar';

interface DashboardShellProps {
    children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex h-screen bg-background overflow-hidden font-sans">
            {/* Main Content Area (Left) */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Ticker Tape - Top full width */}
                <div className="w-full z-10 border-b border-border">
                    <TickerTape />
                </div>

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto p-0 scrollbar-hide bg-background">
                    {children}
                </main>
            </div>

            {/* Right Widget Panel (Right) */}
            <Sidebar />
        </div>
    );
}
