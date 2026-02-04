'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store'
import { authService } from '@/services/auth.service'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { isAuthenticated } = useAuthStore()

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated && typeof window !== 'undefined') {
            const hasToken = authService.isAuthenticated()
            if (!hasToken) {
                router.push('/login')
            }
        }
    }, [isAuthenticated, router])

    // Show loading or nothing while checking auth
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#131722]">
                <div className="text-slate-400">Loading...</div>
            </div>
        )
    }

    return <>{children}</>
}
