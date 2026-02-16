'use client';

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { SettingsView } from '@/features/settings/settings-view';

export default function SettingsPage() {
    return (
        <DashboardShell>
            <SettingsView />
        </DashboardShell>
    );
}
