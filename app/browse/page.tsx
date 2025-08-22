import { CourseBrowser } from "@/components/course-browser"
import { DashboardHeader } from "@/components/dashboard-header"

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <CourseBrowser />
      </main>
    </div>
  )
}
