import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React development",
    image: "/react-course-thumbnail.png",
    progress: 75,
    instructor: "Sarah Johnson",
    duration: "8 hours",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts and patterns",
    image: "/javascript-course-thumbnail.png",
    progress: 30,
    instructor: "Mike Chen",
    duration: "12 hours",
    level: "Advanced",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Create beautiful and functional user interfaces",
    image: "/design-course-thumbnail.png",
    progress: 100,
    instructor: "Emily Davis",
    duration: "6 hours",
    level: "Intermediate",
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    description: "Build scalable server-side applications",
    image: "/nodejs-course-thumbnail.png",
    progress: 0,
    instructor: "Alex Rodriguez",
    duration: "10 hours",
    level: "Intermediate",
  },
]

export function CourseGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">My Courses</h2>
        <Link href="/browse">
          <Button variant="outline">Browse All Courses</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{course.level}</Badge>
                <span className="text-sm text-muted-foreground">{course.duration}</span>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">by {course.instructor}</span>
                  <Link href={`/course/${course.id}`}>
                    <Button size="sm">
                      {course.progress === 0 ? "Start" : course.progress === 100 ? "Review" : "Continue"}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
