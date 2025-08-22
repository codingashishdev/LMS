"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Trophy, Clock, BookOpen, Target, Calendar, Award } from "lucide-react"

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.1 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 4.0 },
  { day: "Sun", hours: 2.8 },
]

const monthlyProgress = [
  { month: "Jan", completed: 2 },
  { month: "Feb", completed: 1 },
  { month: "Mar", completed: 3 },
  { month: "Apr", completed: 2 },
  { month: "May", completed: 4 },
  { month: "Jun", completed: 1 },
]

const skillData = [
  { name: "React", value: 85, color: "#059669" },
  { name: "JavaScript", value: 75, color: "#10b981" },
  { name: "CSS", value: 90, color: "#34d399" },
  { name: "Node.js", value: 60, color: "#6ee7b7" },
]

const achievements = [
  {
    id: 1,
    title: "First Course Completed",
    description: "Completed your first course",
    icon: Trophy,
    earned: true,
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Week Streak",
    description: "Studied for 7 consecutive days",
    icon: Calendar,
    earned: true,
    date: "2024-02-01",
  },
  {
    id: 3,
    title: "Quick Learner",
    description: "Completed a course in under 2 weeks",
    icon: Clock,
    earned: true,
    date: "2024-02-10",
  },
  {
    id: 4,
    title: "Knowledge Seeker",
    description: "Enrolled in 5 different courses",
    icon: BookOpen,
    earned: false,
    date: null,
  },
  {
    id: 5,
    title: "Master Student",
    description: "Completed 10 courses",
    icon: Award,
    earned: false,
    date: null,
  },
  {
    id: 6,
    title: "Goal Crusher",
    description: "Achieved monthly learning goal",
    icon: Target,
    earned: true,
    date: "2024-03-01",
  },
]

const courseProgress = [
  {
    id: 1,
    title: "Introduction to React",
    progress: 75,
    timeSpent: "12h 30m",
    lastAccessed: "2 hours ago",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    progress: 30,
    timeSpent: "8h 15m",
    lastAccessed: "1 day ago",
    status: "In Progress",
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    progress: 100,
    timeSpent: "6h 45m",
    lastAccessed: "3 days ago",
    status: "Completed",
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    progress: 0,
    timeSpent: "0h 0m",
    lastAccessed: "Never",
    status: "Not Started",
  },
]

export function ProgressDashboard() {
  const totalHours = courseProgress.reduce((acc, course) => {
    const [hours, minutes] = course.timeSpent.split("h ")
    return acc + Number.parseInt(hours) + (minutes ? Number.parseInt(minutes.replace("m", "")) / 60 : 0)
  }, 0)

  const completedCourses = courseProgress.filter((course) => course.progress === 100).length
  const inProgressCourses = courseProgress.filter((course) => course.progress > 0 && course.progress < 100).length
  const earnedAchievements = achievements.filter((achievement) => achievement.earned).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learning Progress</h1>
        <p className="text-muted-foreground">Track your learning journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{Math.round(totalHours)}h</div>
            <p className="text-xs text-muted-foreground">+2.5h from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{completedCourses}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{inProgressCourses}</div>
            <p className="text-xs text-muted-foreground">Currently learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{earnedAchievements}</div>
            <p className="text-xs text-muted-foreground">Out of {achievements.length} total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Weekly Study Time */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Study Time</CardTitle>
                <CardDescription>Hours spent learning this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Progress</CardTitle>
                <CardDescription>Your proficiency in different areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillData.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.value}%</span>
                      </div>
                      <Progress value={skill.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress Details</CardTitle>
              <CardDescription>Detailed progress for all your enrolled courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseProgress.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{course.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Time spent: {course.timeSpent}</span>
                        <span>•</span>
                        <span>Last accessed: {course.lastAccessed}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={
                          course.status === "Completed"
                            ? "default"
                            : course.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {course.status}
                      </Badge>
                      <div className="w-24">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your learning milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 border border-border rounded-lg ${
                        achievement.earned ? "bg-primary/5 border-primary/20" : "opacity-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-full ${
                            achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          {achievement.earned && achievement.date && (
                            <p className="text-xs text-primary mt-1">Earned on {achievement.date}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Monthly Course Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Course Completion</CardTitle>
                <CardDescription>Courses completed each month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="completed" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Learning Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Distribution</CardTitle>
                <CardDescription>Time spent by skill area</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={skillData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {skillData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
