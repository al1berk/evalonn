'use client'

import { ProtectedRoute } from '@/components/auth/protected-route'
import { useAuthStore } from '@/store'

export default function Home() {
  const { user } = useAuthStore()

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#131722] p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to EVALON Dashboard
          </h1>
          <p className="mt-4 text-xl text-slate-400">
            Hello, {user?.name || 'User'}! 👋
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Dashboard coming soon...
          </p>
        </div>
      </div>
    </ProtectedRoute>
  )
}
