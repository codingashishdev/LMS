"use client"

import { useState } from "react"
import Image from "next/image"
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
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  Globe,
  Lock,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { CreateCourseDialog } from "@/components/create-course-dialog"
import { InstructorCoursesList } from "@/components/instructor-courses-list"
import { useToast } from "@/hooks/use-toast"

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
  const { toast } = useToast()
  const [courses, setCourses] = useState(myCourses)
  
  const totalStudents = courses.reduce((acc, course) => acc + course.students, 0)
  const totalRevenue = courses.reduce((acc, course) => acc + course.revenue, 0)
  const avgRating = courses.reduce((acc, course) => acc + course.rating, 0) / courses.length
  const publishedCourses = courses.filter((course) => course.status === "Published").length

  const handlePublish = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: "Published" } : course
    ))
    toast({
      title: "Course Published",
      description: "Your course is now live and visible to students.",
    })
  }

  const handleUnpublish = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: "Draft" } : course
    ))
    toast({
      title: "Course Unpublished",
      description: "Your course is now hidden from students.",
    })
  }

  const handleArchive = (courseId: number) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: "Archived" } : course
    ))
    toast({
      title: "Course Archived",
      description: "Your course has been archived.",
    })
  }

  const handleDelete = (courseId: number) => {
    if (confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      setCourses(courses.filter(course => course.id !== courseId))
      toast({
        title: "Course Deleted",
        description: "Your course has been permanently deleted.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses and track student progress</p>
        </div>
        <CreateCourseDialog />
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
            <p className="text-xs text-muted-foreground">{courses.length - publishedCourses} in draft</p>
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
                    {courses.slice(0, 3).map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative w-12 h-12">
                            <Image
                              src={course.image || "/placeholder.svg"}
                              alt={course.title}
                              fill
                              sizes="48px"
                              className="rounded-lg object-cover"
                              loading="lazy"
                            />
                          </div>
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
                          <Badge 
                            variant={course.status === "Published" ? "default" : course.status === "Archived" ? "secondary" : "outline"}
                            className={course.status === "Published" ? "bg-green-500" : ""}
                          >
                            {course.status === "Published" && <Globe className="h-3 w-3 mr-1" />}
                            {course.status === "Draft" && <Lock className="h-3 w-3 mr-1" />}
                            {course.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {course.status === "Published" ? (
                                <DropdownMenuItem onClick={() => handleUnpublish(course.id)}>
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Unpublish
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handlePublish(course.id)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Publish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleArchive(course.id)}>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDelete(course.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
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
            <CreateCourseDialog />
          </div>

          <InstructorCoursesList />
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
