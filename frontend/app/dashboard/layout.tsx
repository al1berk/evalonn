import { ProtectedRoute } from '@/components/auth/protected-route'
import { Navbar } from '@/components/dashboard/navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0a0e1a]">
        <Navbar />
        <main className="w-full px-3 sm:px-6 lg:px-10 xl:px-12 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}
