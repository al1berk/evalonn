'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Bell, Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/use-auth-store'
import { authService } from '@/services/auth.service'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/markets', label: 'Markets' },
  { href: '/dashboard/portfolio', label: 'Portfolio' },
  { href: '/dashboard/alerts', label: 'Alerts' },
]

export function Navbar() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  const handleLogout = async () => {
    await authService.logout()
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/50 bg-[#131722]/95 backdrop-blur-xl shadow-2xl">
      <div className="w-full px-3 sm:px-6 lg:px-10 xl:px-12 flex h-16 items-center gap-4 lg:gap-8">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg sm:text-xl flex-shrink-0">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs sm:text-sm font-bold">E</span>
          </div>
          <span className="text-white">EVALON</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Section */}
        <div className="ml-auto md:ml-0 flex items-center gap-1 sm:gap-2">
          {/* Search */}
          <Button variant="ghost" size="icon" className="hidden lg:flex text-slate-400 hover:text-white hover:bg-slate-800">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-slate-800">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-400 hover:text-white hover:bg-slate-800">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 ml-1 sm:ml-2 pl-1 sm:pl-2 border-l border-slate-700">
            <div className="hidden lg:block text-right text-sm">
              <p className="font-medium text-white">{user?.name || user?.email?.split('@')[0]}</p>
              <p className="text-xs text-slate-400">Pro Trader</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
