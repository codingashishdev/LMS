"use client"

import dynamic from "next/dynamic"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"
import { useEffect, useState } from "react"

// Lazy load the heavy dashboard component
const StudentDashboard = dynamic(
  () => import("@/components/student-dashboard").then(mod => ({ default: mod.StudentDashboard })),
  {
    loading: () => (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              <p className="mt-4 text-lg text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    ),
    ssr: false
  }
)

export default function DashboardPage() {
  const { user, loading } = useAuthRedirect()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by ensuring client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the same structure to avoid hydration mismatch
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {!mounted || loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
              <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : !user ? (
          null // User will be redirected by useAuthRedirect
        ) : (
          <StudentDashboard />
        )}
      </main>
    </div>
  )
}
