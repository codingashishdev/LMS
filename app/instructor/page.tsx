import { InstructorDashboard } from "@/components/instructor-dashboard"
// import { DashboardHeader } from "@/components/dashboard-header"

export default function InstructorPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <DashboardHeader /> */}
      <main className="container mx-auto px-4 py-8">
        <InstructorDashboard />
      </main>
    </div>
  )
}
