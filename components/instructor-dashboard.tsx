"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import {
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  Star,
  MessageSquare,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const enrollmentData = [
  { month: "Jan", students: 45 },
  { month: "Feb", students: 52 },
  { month: "Mar", students: 78 },
  { month: "Apr", students: 65 },
  { month: "May", students: 89 },
  { month: "Jun", students: 94 },
]

const revenueData = [
  { month: "Jan", revenue: 2250 },
  { month: "Feb", revenue: 2600 },
  { month: "Mar", revenue: 3900 },
  { month: "Apr", revenue: 3250 },
  { month: "May", revenue: 4450 },
  { month: "Jun", revenue: 4700 },
]

const myCourses = [
  {
    id: 1,
    title: "Introduction to React",
    students: 1250,
    rating: 4.8,
    revenue: 62500,
    completion: 78,
    status: "Published",
    lastUpdated: "2 days ago",
    image: "/react-course-thumbnail.png",
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    students: 890,
    rating: 4.9,
    revenue: 70310,
    completion: 85,
    status: "Published",
    lastUpdated: "1 week ago",
    image: "/javascript-course-thumbnail.png",
  },
  {
    id: 3,
    title: "Modern CSS Techniques",
    students: 654,
    rating: 4.6,
    revenue: 32700,
    completion: 72,
    status: "Draft",
    lastUpdated: "3 days ago",
    image: "/design-course-thumbnail.png",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "enrollment",
    message: "25 new students enrolled in 'Introduction to React'",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "review",
    message: "New 5-star review on 'Advanced JavaScript Patterns'",
    time: "4 hours ago",
  },
  {
    id: 3,
    type: "completion",
    message: "15 students completed 'Introduction to React'",
    time: "6 hours ago",
  },
  {
    id: 4,
    type: "question",
    message: "3 new questions in course discussions",
    time: "1 day ago",
  },
]

const topStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    progress: 95,
    course: "Introduction to React",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    progress: 88,
    course: "Advanced JavaScript Patterns",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    progress: 92,
    course: "Introduction to React",
    lastActive: "3 hours ago",
  },
]

export function InstructorDashboard() {
  const totalStudents = myCourses.reduce((acc, course) => acc + course.students, 0)
  const totalRevenue = myCourses.reduce((acc, course) => acc + course.revenue, 0)
  const avgRating = myCourses.reduce((acc, course) => acc + course.rating, 0) / myCourses.length
  const publishedCourses = myCourses.filter((course) => course.status === "Published").length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses and track student progress</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{publishedCourses}</div>
            <p className="text-xs text-muted-foreground">{myCourses.length - publishedCourses} in draft</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Overview of your top performing courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myCourses.slice(0, 3).map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{course.students} students</span>
                              <span>⭐ {course.rating}</span>
                              <span>{course.completion}% completion</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Course
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Course
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <TrendingUp className="h-4 w-4 mr-2" />
                                View Analytics
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Student Enrollment Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Student Enrollment Trend</CardTitle>
                  <CardDescription>Monthly enrollment across all courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="p-1 bg-primary/10 rounded-full">
                          <div className="h-2 w-2 bg-primary rounded-full" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Students */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topStudents.map((student) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.course}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm font-medium">{student.progress}%</p>
                          <p className="text-xs text-muted-foreground">{student.lastActive}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className="absolute top-2 right-2"
                    variant={course.status === "Published" ? "default" : "secondary"}
                  >
                    {course.status}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{course.students} students</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">${course.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Completion</p>
                        <p className="font-medium">{course.completion}%</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Overview of all students across your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.course}</p>
                        <p className="text-sm text-muted-foreground">{student.progress}% complete</p>
                      </div>
                      <Progress value={student.progress} className="w-20" />
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue across all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Completion Rates</CardTitle>
                <CardDescription>Average completion rates by course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCourses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{course.title}</span>
                        <span className="text-sm text-muted-foreground">{course.completion}%</span>
                      </div>
                      <Progress value={course.completion} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
