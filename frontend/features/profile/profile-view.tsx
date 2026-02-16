'use client';

import { useAuthStore } from '@/store/use-auth-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Shield, Camera } from 'lucide-react';

export function ProfileView() {
    const { user } = useAuthStore();

    return (
        <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="p-6 md:col-span-1 bg-card border-border flex flex-col items-center text-center gap-4">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground overflow-hidden">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                            ) : (
                                <User size={40} />
                            )}
                        </div>
                        <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background border-input">
                            <Camera size={14} />
                        </Button>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                    <div className="w-full pt-4 border-t border-border mt-auto">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Plan</span>
                            <span className="font-bold text-primary">Pro Trader</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Member Since</span>
                            <span className="font-medium">Feb 2024</span>
                        </div>
                    </div>
                </Card>

                {/* Edit Form */}
                <Card className="p-6 md:col-span-2 bg-card border-border">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <div className="relative">
                                    <User size={16} className="absolute left-3 top-3 text-muted-foreground" />
                                    <Input defaultValue={user?.name || ''} className="pl-9 bg-background border-border" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-3 text-muted-foreground" />
                                    <Input defaultValue={user?.email || ''} readOnly className="pl-9 bg-background border-border opacity-70" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <Label>Password</Label>
                            <Button variant="outline" className="w-full justify-start text-muted-foreground border-border">
                                <Shield size={16} className="mr-2" /> Change Password
                            </Button>
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button className="bg-primary hover:bg-primary/90 text-white">Save Changes</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
