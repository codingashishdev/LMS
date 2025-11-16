"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Bell, 
  BookOpen, 
  Clock, 
  Target, 
  TrendingUp, 
  Calendar, 
  Award, 
  Play,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Users,
  Zap,
  ChevronRight,
  Flame,
  CheckCircle2,
  Timer,
  BarChart3
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { NotificationsDrawer } from "@/components/notifications-drawer"
import { useNotificationsCenter } from "@/contexts/notifications-context"
import { useCommandPalette } from "@/contexts/command-palette-context"

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
    image: "/python-data-science-course-thumbnail.png",
    level: "Beginner",
    duration: "15 hours",
    rating: 4.8,
  },
  {
    id: 6,
    title: "Node.js Fundamentals",
    description: "Expand your development skills",
    image: "/nodejs-course-thumbnail.png",
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

export const StudentDashboard = React.memo(function StudentDashboard() {
  const { user, loading } = useAuth()
  const [isClient, setIsClient] = useState(false)
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false)
  const { unreadCount } = useNotificationsCenter()
  const { openPalette } = useCommandPalette()
  
  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // In a real app, these would be fetched. Keeping simple synchronous data here.
  const isLoading = false
  const hasCourses = continueWatching.length > 0
  const userName = (isClient && user && !loading) ? (user.user_metadata?.name || user.email?.split('@')[0] || 'Student') : 'Student'
  const notificationLabel = unreadCount === 0 ? "Notifications" : `${unreadCount} notification${unreadCount === 1 ? "" : "s"}`
  
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {userName}!</h1>
            <Badge variant="secondary" className="flex items-center gap-1 bg-gradient-primary text-primary-foreground">
              <Flame className="h-3 w-3" />
              <span>7-day streak</span>
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">Ready to continue your learning journey?</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="relative"
            onClick={() => setIsNotificationsDrawerOpen(true)}
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4 mr-2" />
            {notificationLabel}
            {unreadCount > 0 && <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive" aria-hidden="true" />}
          </Button>
          <Button variant="outline" size="sm" onClick={() => openPalette("")}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-lift animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">3</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              2 due this week
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-500">7 days</div>
            <p className="text-sm text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">12h</div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              +3h from last week
            </p>
          </CardContent>
        </Card>

        <Card className="hover-lift animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <Award className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-500">2</div>
            <p className="text-sm text-muted-foreground">1 more this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Continue Watching */}
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Continue Learning
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading && (
                  <div className="grid gap-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-20 w-20 rounded-xl bg-muted animate-pulse" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
                          <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
                          <div className="h-2 w-full rounded bg-muted animate-pulse" />
                        </div>
                        <div className="h-9 w-24 rounded bg-muted animate-pulse" />
                      </div>
                    ))}
                  </div>
                )}
                {!isLoading && !hasCourses && (
                  <div className="text-center py-6 text-muted-foreground">No courses in progress. Explore courses to get started!</div>
                )}
                {!isLoading && hasCourses && continueWatching.map((course, index) => (
                  <div 
                    key={course.id} 
                    className="group flex items-center space-x-4 p-4 border border-border rounded-xl hover:bg-accent/50 transition-all duration-200 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <Image
                        src={course.image || "/placeholder.jpg"}
                        alt={course.title}
                        width={80}
                        height={80}
                        sizes="80px"
                        className="w-20 h-20 rounded-xl object-cover shadow-medium"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">Next: {course.lesson}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{course.progress}% complete</span>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Timer className="h-3 w-3" />
                            <span>{course.timeLeft}</span>
                          </div>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                    <Link href={`/course/${course.id}`}>
                      <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                        Continue
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <Card className="hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Recommended for You
                  </CardTitle>
                  <CardDescription>Based on your learning progress</CardDescription>
                </div>
                <Link href="/browse">
                  <Button variant="outline" size="sm">
                    View All
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                {isLoading && (
                  <>
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="border border-border rounded-xl overflow-hidden">
                        <div className="h-40 w-full bg-muted animate-pulse" />
                        <div className="p-5 space-y-3">
                          <div className="h-4 w-1/4 bg-muted rounded animate-pulse" />
                          <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                          <div className="h-9 w-24 bg-muted rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {!isLoading && recommendations.map((course, index) => (
                  <div 
                    key={course.id} 
                    className="group border border-border rounded-xl overflow-hidden hover:shadow-strong transition-all duration-200 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <Image
                        src={course.image || "/placeholder.jpg"}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="bg-white/90 text-foreground">
                          {course.level}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>1.2k students</span>
                        </div>
                        <Button size="sm" className="bg-gradient-primary hover:opacity-90">
                          Enroll Now
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
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Upcoming Deadlines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div
                    key={deadline.id}
                    className="group flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/50 transition-all duration-200 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <h5 className="text-sm font-semibold group-hover:text-primary transition-colors">
                        {deadline.title}
                      </h5>
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
                        className="text-xs font-medium"
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
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div 
                      key={activity.id} 
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-200 animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                        {activity.course && <p className="text-xs text-muted-foreground">{activity.course}</p>}
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/browse">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/20 transition-all duration-200">
                  <BookOpen className="h-4 w-4 mr-3" />
                  Browse Courses
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
              <Link href="/progress">
                <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/20 transition-all duration-200">
                  <TrendingUp className="h-4 w-4 mr-3" />
                  View Progress
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/20 transition-all duration-200">
                <Calendar className="h-4 w-4 mr-3" />
                Schedule Study Time
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <NotificationsDrawer open={isNotificationsDrawerOpen} onOpenChange={setIsNotificationsDrawerOpen} />
    </div>
  )
})
