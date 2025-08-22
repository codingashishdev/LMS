import { DashboardHeader } from "@/components/dashboard-header"
import { StudentDashboard } from "@/components/student-dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <StudentDashboard />
      </main>
    </div>
  )
}
