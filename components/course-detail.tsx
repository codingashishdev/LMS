import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, PlayCircle, FileText } from "lucide-react"
import Link from "next/link"

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "exercise" | "reading"
  completed: boolean
  description: string
  content?: string
}

interface Course {
  id: number
  title: string
  description: string
  image: string
  instructor: string
  duration: string
  level: string
  rating: number
  students: number
  enrolled: boolean
  progress: number
  lessons: Lesson[]
}

export function CourseDetail({ course }: { course: Course }) {
  const completedLessons = course.lessons.filter((lesson) => lesson.completed).length
  const totalLessons = course.lessons.length

  const getIcon = (type: string, completed: boolean) => {
    if (completed) return <CheckCircle className="h-5 w-5 text-primary" />

    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5 text-muted-foreground" />
      case "exercise":
        return <FileText className="h-5 w-5 text-muted-foreground" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Course Info */}
      <div className="lg:col-span-1">
        <Card>
          <div className="aspect-video relative">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover rounded-t-lg"
              loading="lazy"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{course.level}</Badge>
              <div className="flex items-center space-x-1">
                <span className="text-sm">⭐</span>
                <span className="text-sm font-medium">{course.rating}</span>
                <span className="text-sm text-muted-foreground">({course.students})</span>
              </div>
            </div>
            <CardTitle className="text-xl">{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Course Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">by {course.instructor}</span>
                <span className="text-muted-foreground">{course.duration}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {completedLessons} of {totalLessons} lessons completed
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Content */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Course Content</CardTitle>
            <CardDescription>
              {totalLessons} lessons • {course.duration} total length
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getIcon(lesson.type, lesson.completed)}
                    <div>
                      <h4 className="font-medium">{lesson.title}</h4>
                      <p className="text-sm text-muted-foreground">{lesson.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                    <Link href={`/course/${course.id}/lesson/${lesson.id}`}>
                      <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                        {lesson.completed ? "Review" : index === completedLessons ? "Continue" : "Start"}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
