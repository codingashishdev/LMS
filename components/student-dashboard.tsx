import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Bell, BookOpen, Clock, Target, TrendingUp, Calendar, Award, Play } from "lucide-react"
import Link from "next/link"

const recentActivity = [
  {
    id: 1,
    type: "lesson_completed",
    title: "Completed 'Understanding JSX'",
    course: "Introduction to React",
    time: "2 hours ago",
    icon: BookOpen,
  },
  {
    id: 2,
    type: "achievement",
    title: "Earned 'Week Streak' achievement",
    course: null,
    time: "1 day ago",
    icon: Award,
  },
  {
    id: 3,
    type: "course_started",
    title: "Started 'Advanced JavaScript'",
    course: "Advanced JavaScript",
    time: "2 days ago",
    icon: Play,
  },
  {
    id: 4,
    type: "lesson_completed",
    title: "Completed 'CSS Grid Layouts'",
    course: "UI/UX Design Principles",
    time: "3 days ago",
    icon: BookOpen,
  },
]

const upcomingDeadlines = [
  {
    id: 1,
    title: "React Project Assignment",
    course: "Introduction to React",
    dueDate: "Tomorrow",
    priority: "high",
  },
  {
    id: 2,
    title: "JavaScript Quiz",
    course: "Advanced JavaScript",
    dueDate: "In 3 days",
    priority: "medium",
  },
  {
    id: 3,
    title: "Design Portfolio Review",
    course: "UI/UX Design Principles",
    dueDate: "Next week",
    priority: "low",
  },
]

const recommendations = [
  {
    id: 5,
    title: "Python for Data Science",
    description: "Based on your JavaScript progress",
    image: "/python-data-science-thumbnail.png",
    level: "Beginner",
    duration: "15 hours",
    rating: 4.8,
  },
  {
    id: 6,
    title: "Mobile App Development with Flutter",
    description: "Expand your development skills",
    image: "/flutter-course-thumbnail.png",
    level: "Intermediate",
    duration: "14 hours",
    rating: 4.5,
  },
]

const continueWatching = [
  {
    id: 1,
    title: "Introduction to React",
    lesson: "Components and Props",
    progress: 75,
    image: "/react-course-thumbnail.png",
    timeLeft: "2h 15m left",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    lesson: "Async/Await Patterns",
    progress: 30,
    image: "/javascript-course-thumbnail.png",
    timeLeft: "8h 45m left",
  },
]

export function StudentDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
          <p className="text-muted-foreground">Ready to continue your learning journey?</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>7-day streak</span>
          </Badge>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />3 notifications
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12h</div>
            <p className="text-xs text-muted-foreground">+3h from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2</div>
            <p className="text-xs text-muted-foreground">1 more this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Watching */}
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {continueWatching.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">Next: {course.lesson}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span>{course.progress}% complete</span>
                          <span className="text-muted-foreground">{course.timeLeft}</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                    <Link href={`/course/${course.id}`}>
                      <Button size="sm">Continue</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recommended for You</CardTitle>
                  <CardDescription>Based on your learning progress</CardDescription>
                </div>
                <Link href="/browse">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.map((course) => (
                  <div key={course.id} className="border border-border rounded-lg overflow-hidden">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{course.level}</Badge>
                        <div className="flex items-center space-x-1 text-sm">
                          <span>⭐</span>
                          <span>{course.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{course.duration}</span>
                        <Button size="sm" variant="outline">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Upcoming Deadlines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h5 className="text-sm font-medium">{deadline.title}</h5>
                      <p className="text-xs text-muted-foreground">{deadline.course}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          deadline.priority === "high"
                            ? "destructive"
                            : deadline.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {deadline.dueDate}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="p-1 bg-primary/10 rounded-full">
                        <Icon className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        {activity.course && <p className="text-xs text-muted-foreground">{activity.course}</p>}
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/browse">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Courses
                </Button>
              </Link>
              <Link href="/progress">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Progress
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Study Time
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
