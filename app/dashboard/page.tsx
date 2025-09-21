"use client"

import dynamic from "next/dynamic"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"

// Lazy load the heavy dashboard component
const StudentDashboard = dynamic(
  () => import("@/components/student-dashboard").then(mod => ({ default: mod.StudentDashboard })),
  {
    loading: () => (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    ),
    ssr: false
  }
)

export default function DashboardPage() {
  const { user, loading } = useAuthRedirect()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // User will be redirected by useAuthRedirect
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <StudentDashboard />
      </main>
    </div>
  )
}
