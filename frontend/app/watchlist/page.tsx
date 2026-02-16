'use client';

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { WatchlistView } from '@/features/watchlist/watchlist-view';

export default function WatchlistPage() {
    return (
        <DashboardShell>
            <WatchlistView />
        </DashboardShell>
    );
}
