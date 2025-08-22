import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProgressOverview() {
  const stats = [
    { label: "Courses Enrolled", value: "5", progress: 100 },
    { label: "Courses Completed", value: "2", progress: 40 },
    { label: "Hours Learned", value: "24", progress: 60 },
    { label: "Certificates Earned", value: "2", progress: 40 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <Progress value={stat.progress} className="mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
