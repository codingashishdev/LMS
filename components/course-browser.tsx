"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const allCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React development and build modern web applications",
    image: "/react-course-thumbnail.png",
    instructor: "Sarah Johnson",
    duration: "8 hours",
    level: "Beginner",
    category: "Web Development",
    rating: 4.8,
    students: 1250,
    price: 49,
    enrolled: true,
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts, patterns, and modern ES6+ features",
    image: "/javascript-course-thumbnail.png",
    instructor: "Mike Chen",
    duration: "12 hours",
    level: "Advanced",
    category: "Web Development",
    rating: 4.9,
    students: 890,
    price: 79,
    enrolled: true,
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Create beautiful and functional user interfaces with modern design principles",
    image: "/design-course-thumbnail.png",
    instructor: "Emily Davis",
    duration: "6 hours",
    level: "Intermediate",
    category: "Design",
    rating: 4.7,
    students: 2100,
    price: 59,
    enrolled: true,
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    description: "Build scalable server-side applications with Node.js and Express",
    image: "/nodejs-course-thumbnail.png",
    instructor: "Alex Rodriguez",
    duration: "10 hours",
    level: "Intermediate",
    category: "Web Development",
    rating: 4.6,
    students: 750,
    price: 69,
    enrolled: false,
  },
  {
    id: 5,
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis and machine learning",
    image: "/python-data-science-thumbnail.png",
    instructor: "Dr. Lisa Wang",
    duration: "15 hours",
    level: "Beginner",
    category: "Data Science",
    rating: 4.8,
    students: 1800,
    price: 89,
    enrolled: false,
  },
  {
    id: 6,
    title: "Mobile App Development with Flutter",
    description: "Create cross-platform mobile applications using Flutter and Dart",
    image: "/flutter-course-thumbnail.png",
    instructor: "James Park",
    duration: "14 hours",
    level: "Intermediate",
    category: "Mobile Development",
    rating: 4.5,
    students: 650,
    price: 75,
    enrolled: false,
  },
  {
    id: 7,
    title: "Digital Marketing Fundamentals",
    description: "Master the basics of digital marketing, SEO, and social media strategy",
    image: "/digital-marketing-thumbnail.png",
    instructor: "Maria Garcia",
    duration: "8 hours",
    level: "Beginner",
    category: "Marketing",
    rating: 4.4,
    students: 1400,
    price: 45,
    enrolled: false,
  },
  {
    id: 8,
    title: "Machine Learning with TensorFlow",
    description: "Build and deploy machine learning models using TensorFlow",
    image: "/tensorflow-course-thumbnail.png",
    instructor: "Dr. Robert Kim",
    duration: "18 hours",
    level: "Advanced",
    category: "Data Science",
    rating: 4.9,
    students: 420,
    price: 99,
    enrolled: false,
  },
]

const categories = ["All", "Web Development", "Data Science", "Design", "Mobile Development", "Marketing"]
const levels = ["All", "Beginner", "Intermediate", "Advanced"]

export function CourseBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [sortBy, setSortBy] = useState("popular")

  const filteredCourses = allCourses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
      return matchesSearch && matchesCategory && matchesLevel
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.students - a.students
        case "rating":
          return b.rating - a.rating
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default:
          return 0
      }
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Browse Courses</h1>
        <p className="text-muted-foreground">
          Discover new skills and advance your career with our comprehensive course library
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Courses ({filteredCourses.length})</TabsTrigger>
          <TabsTrigger value="enrolled">My Courses ({filteredCourses.filter((c) => c.enrolled).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <CourseGrid courses={filteredCourses} />
        </TabsContent>

        <TabsContent value="enrolled" className="mt-6">
          <CourseGrid courses={filteredCourses.filter((c) => c.enrolled)} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CourseGrid({ courses }: { courses: typeof allCourses }) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No courses found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video relative">
            <Image 
              src={course.image || "/placeholder.svg"} 
              alt={course.title} 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
            {course.enrolled && <Badge className="absolute top-2 right-2 bg-primary">Enrolled</Badge>}
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
            <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
            <CardDescription className="line-clamp-2">{course.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">by {course.instructor}</span>
                <span className="text-muted-foreground">{course.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">${course.price}</span>
                <Button size="sm" variant={course.enrolled ? "outline" : "default"}>
                  {course.enrolled ? "Continue" : "Enroll Now"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
