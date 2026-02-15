'use client'

import { useAuthStore } from '@/store/use-auth-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, DollarSign, Activity } from 'lucide-react'
import { PortfolioChart } from '@/components/dashboard/portfolio-chart'
import { WatchlistWidget } from '@/components/dashboard/watchlist-widget'
import { NewsCarousel } from '@/components/dashboard/news-carousel'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const displayName = user?.name || user?.email?.split('@')[0] || 'Trader'

  return (
    <div className="space-y-6 sm:space-y-8 w-full">
      {/* Welcome Section */}
      <div className="space-y-1 sm:space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
          Hoş geldin, {displayName}! 👋
        </h1>
        <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
          Bugün portföyünde neler oluyor, bir bakalım
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 sm:gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#151923] border-slate-800/50 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
              Toplam Bakiye
            </CardTitle>
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">₺124,532.00</div>
            <p className="text-xs sm:text-sm text-green-500 mt-2 flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
              +2.5% düne göre
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#151923] border-slate-800/50 hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
              24s Kâr/Zarar
            </CardTitle>
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-green-500/10 group-hover:bg-green-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-green-500 tracking-tight">+₺1,240.50</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
              son 24 saatte
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1a1f2e] to-[#151923] border-slate-800/50 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 group sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-3">
            <CardTitle className="text-xs sm:text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
              Alım Gücü
            </CardTitle>
            <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">₺45,000.00</div>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">
              İşlem için kullanılabilir
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Chart */}
      <PortfolioChart />

      {/* Watchlist & News Grid */}
      <div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">
        <WatchlistWidget />
        <NewsCarousel />
      </div>
    </div>
  )
}
