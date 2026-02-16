'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell, Menu, ChevronDown, Monitor, BarChart2, GitBranch, Cpu, Globe, List, Activity, Users, FileText, Newspaper } from 'lucide-react'
import { useAuthStore } from '@/store/use-auth-store'
import { authService } from '@/services/auth.service'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Menu Structure
const menuItems = [
  {
    label: 'Products',
    items: [
      { href: '/', label: 'Dashboard', icon: Monitor },
      { href: '/analysis', label: 'Analysis', icon: BarChart2 },
      { href: '/backtest', label: 'Backtest', icon: Activity },
      { href: '/strategy', label: 'Strategy', icon: GitBranch },
      { href: '/llm', label: 'AI Terminal', icon: Cpu },
    ]
  },
  {
    label: 'Markets',
    items: [
      { href: '/markets', label: 'Overview', icon: Globe },
      { href: '/watchlist', label: 'Watchlist', icon: List },
      { href: '/correlation', label: 'Correlation', icon: Activity },
      { href: '/screener', label: 'Screeners', icon: Search },
    ]
  },
  {
    label: 'Community',
    href: '/community',
  },
  {
    label: 'More',
    items: [
      { href: '/brokers', label: 'Brokers', icon: Users },
      { href: '/news', label: 'News', icon: Newspaper },
    ]
  }
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuthStore()
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleLogout = async () => {
    await authService.logout()
    router.push('/login')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background shadow-sm h-16" onMouseLeave={() => setActiveDropdown(null)}>
      <div className="w-full px-4 h-full flex items-center justify-between gap-4">

        {/* Left Section: Logo + Search + Nav */}
        <div className="flex items-center gap-6 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                E
              </div>
              <span className="hidden xl:inline-block">EVALON</span>
            </Link>
          </div>

          {/* Search Bar - Moved to Left */}
          <div className="relative w-[240px] hidden md:flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <div className="w-full h-9 rounded-full bg-secondary hover:bg-secondary/80 transition-colors flex items-center px-3 pl-10 text-sm text-muted-foreground cursor-text">
              <span className="truncate">Search (⌘K)</span>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {menuItems.map((item) => {
              const isActive = item.items
                ? item.items.some(sub => pathname === sub.href)
                : pathname === item.href;

              return (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.items && setActiveDropdown(item.label)}
                  onClick={() => {
                    if (!item.items && item.href) router.push(item.href);
                  }}
                >
                  <button
                    className={cn(
                      "px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary/50 flex items-center gap-1 h-10",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {item.items && <ChevronDown size={14} className="mt-0.5 opacity-50" />}
                  </button>

                  {/* Dropdown */}
                  {item.items && activeDropdown === item.label && (
                    <div className="absolute top-[calc(100%-10px)] left-0 w-64 bg-card border border-border shadow-2xl rounded-xl p-2 animate-in fade-in slide-in-from-top-2 z-50">
                      <div className="grid gap-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-secondary group",
                              pathname === subItem.href ? "bg-secondary/50 text-foreground" : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className={cn(
                              "h-8 w-8 rounded-md flex items-center justify-center bg-secondary/30 group-hover:bg-primary/10 group-hover:text-primary transition-colors",
                              pathname === subItem.href ? "bg-primary/10 text-primary" : ""
                            )}>
                              {subItem.icon && <subItem.icon size={16} />}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium">{subItem.label}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Section: Upgrade + Actions + Profile */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 ml-auto">

          {/* Upgrade Button (CTA) */}
          <Button className="hidden sm:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 h-9 rounded-full px-6 font-semibold shadow-lg hover:shadow-xl transition-all">
            Upgrade Plan
          </Button>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-border hidden sm:block"></div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
          </Button>


          {/* User Profile Dropdown */}
          <div className="relative ml-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-secondary/50 hover:bg-secondary text-foreground h-9 w-9"
              onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')}
            >
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="h-full w-full rounded-full object-cover" />
              ) : (
                <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center text-xs font-bold text-white">
                  {user?.name?.[0] || 'U'}
                </div>
              )}
            </Button>

            {/* Profile Dropdown Menu */}
            {activeDropdown === 'profile' && (
              <div className="absolute top-[calc(100%+10px)] right-0 w-72 bg-card border border-border shadow-2xl rounded-xl p-2 animate-in fade-in slide-in-from-top-2 z-50">

                {/* User Info Header */}
                <div className="px-3 py-3 border-b border-border/50 mb-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-chart-5 flex items-center justify-center text-sm font-bold text-white">
                      {user?.name?.[0] || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{user?.name || 'User'}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-1 py-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors">
                    Settings and billing
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors flex justify-between items-center">
                    <span>Refer a friend</span>
                    <span className="text-muted-foreground text-xs">$0</span>
                  </button>
                </div>

                <div className="my-1 border-t border-border/50" />

                <div className="grid gap-1 py-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors">
                    Support Center
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors flex justify-between items-center">
                    <span>What's new?</span>
                    <span className="bg-destructive text-white text-[10px] px-1.5 py-0.5 rounded-full">11</span>
                  </button>
                </div>

                <div className="my-1 border-t border-border/50" />

                <div className="grid gap-1 py-1">
                  <div className="w-full px-3 py-2 text-sm text-foreground flex justify-between items-center group hover:bg-secondary rounded-lg cursor-pointer transition-colors">
                    <span>Dark theme</span>
                    {/* Just a visual toggle for now since we are forced dark */}
                    <div className="w-9 h-5 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <button className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors flex justify-between items-center">
                    <span>Language</span>
                    <span className="text-muted-foreground flex items-center gap-1 text-xs">English <ChevronDown size={12} /></span>
                  </button>
                </div>

                <div className="my-1 border-t border-border/50" />

                <div className="grid gap-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive font-medium rounded-lg transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
