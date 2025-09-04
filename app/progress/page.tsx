import { ProgressDashboard } from "@/components/progress-dashboard"
// import { DashboardHeader } from "@/components/dashboard-header"

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <DashboardHeader /> */}
      <main className="container mx-auto px-4 py-8">
        <ProgressDashboard />
      </main>
    </div>
  )
}
