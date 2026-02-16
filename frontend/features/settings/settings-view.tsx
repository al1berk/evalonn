'use client';

import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Moon, Sun, Smartphone, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsViewProps {
    isWidget?: boolean;
}

export function SettingsView({ isWidget = false }: SettingsViewProps) {
    return (
        <div className={cn("flex flex-col gap-6", isWidget ? "p-4" : "p-6 max-w-4xl mx-auto")}>
            {!isWidget && (
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Configure application preferences and notifications.</p>
                </div>
            )}

            {isWidget && (
                <div className="flex flex-col gap-2 mb-2">
                    <h1 className="text-xl font-bold tracking-tight">Settings</h1>
                </div>
            )}

            <div className={cn("grid gap-6", isWidget ? "gap-4" : "")}>
                <Card className={cn("bg-card border-border", isWidget ? "p-4" : "p-6")}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Globe size={20} /> General
                    </h3>
                    <div className="space-y-4">
                        <div className={cn("flex justify-between", isWidget ? "flex-col items-start gap-2" : "items-center")}>
                            <div className="space-y-0.5">
                                <Label>Language</Label>
                                {!isWidget && <div className="text-sm text-muted-foreground">Select your preferred language</div>}
                            </div>
                            <select className="bg-background border border-border rounded-md h-9 px-3 text-sm w-full md:w-auto">
                                <option>English</option>
                                <option>Turkish</option>
                                <option>German</option>
                            </select>
                        </div>
                        <div className={cn("flex justify-between", isWidget ? "flex-col items-start gap-2" : "items-center")}>
                            <div className="space-y-0.5">
                                <Label>Currency</Label>
                                {!isWidget && <div className="text-sm text-muted-foreground">Default currency for display</div>}
                            </div>
                            <select className="bg-background border border-border rounded-md h-9 px-3 text-sm w-full md:w-auto">
                                <option>USD ($)</option>
                                <option>TRY (₺)</option>
                                <option>EUR (€)</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className={cn("bg-card border-border", isWidget ? "p-4" : "p-6")}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Bell size={20} /> Notifications
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Price Alerts</Label>
                                {!isWidget && <div className="text-sm text-muted-foreground">Receive notifications for price targets</div>}
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>News Digest</Label>
                                {!isWidget && <div className="text-sm text-muted-foreground">Daily summary of market news</div>}
                            </div>
                            <Switch />
                        </div>
                    </div>
                </Card>

                <Card className={cn("bg-card border-border", isWidget ? "p-4" : "p-6")}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Moon size={20} /> Appearance
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Theme</Label>
                                {!isWidget && <div className="text-sm text-muted-foreground">Select application theme</div>}
                            </div>
                            <div className="flex items-center bg-secondary rounded-full p-1 border border-border">
                                <button className="p-1.5 rounded-full bg-background text-foreground shadow-sm">
                                    <Moon size={16} />
                                </button>
                                <button className="p-1.5 rounded-full text-muted-foreground hover:text-foreground">
                                    <Sun size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
