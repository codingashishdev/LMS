"use client"

import { InstructorDashboard } from "@/components/instructor-dashboard"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"
// import { DashboardHeader } from "@/components/dashboard-header"

export default function InstructorPage() {
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
      {/* <DashboardHeader /> */}
      <main className="container mx-auto px-4 py-8">
        <InstructorDashboard />
      </main>
    </div>
  )
}
