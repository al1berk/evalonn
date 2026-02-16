'use client';

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { ProfileView } from '@/features/profile/profile-view';

export default function ProfilePage() {
    return (
        <DashboardShell>
            <ProfileView />
        </DashboardShell>
    );
}
