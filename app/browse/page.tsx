"use client"

import { useEffect, useState } from "react"
import { CourseGrid } from "@/components/course-grid"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  ChevronDown,
  X,
  SlidersHorizontal
} from "lucide-react"

const categories = [
  "All",
  "Web Development",
  "Mobile Development", 
  "Data Science",
  "UI/UX Design",
  "DevOps",
  "Machine Learning",
  "Cybersecurity"
]

const levels = ["All", "Beginner", "Intermediate", "Advanced"]

const sortOptions = [
  "Most Popular",
  "Highest Rated", 
  "Newest",
  "Price: Low to High",
  "Price: High to Low"
]

const featuredCourses = [
  {
    id: 1,
    title: "Complete React Developer Course",
    description: "Master React from basics to advanced concepts with hands-on projects",
    image: "/react-course-thumbnail.png",
    instructor: "Sarah Johnson",
    duration: "24 hours",
    level: "Beginner",
    rating: 4.9,
    students: 15420,
    price: 89,
    originalPrice: 149,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Advanced JavaScript Patterns",
    description: "Deep dive into advanced JavaScript concepts and modern patterns",
    image: "/javascript-course-thumbnail.png",
    instructor: "Mike Chen",
    duration: "18 hours",
    level: "Advanced",
    rating: 4.8,
    students: 8930,
    price: 79,
    originalPrice: 129,
    isFeatured: true,
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Create stunning user interfaces and exceptional user experiences",
    image: "/design-course-thumbnail.png",
    instructor: "Emily Davis",
    duration: "16 hours",
    level: "Intermediate",
    rating: 4.7,
    students: 12350,
    price: 99,
    originalPrice: 179,
    isFeatured: true,
  },
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [sortBy, setSortBy] = useState("Most Popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  // simulate loading for skeleton demo
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Discover Amazing Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore thousands of courses from expert instructors and advance your skills
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg"
            />
          </div>

          {/* Filter Toggle for Mobile */}
          <div className="flex justify-center lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className={`cursor-pointer transition-all ${
                      selectedCategory === category 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Level and Sort */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-3">Level</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedLevel === level 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => setSelectedLevel(level)}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-3">Sort by</h3>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-end gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading && (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full aspect-video" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              ))
            )}
            {featuredCourses.map((course, index) => (
              <Card 
                key={course.id} 
                className="group overflow-hidden hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white">Featured</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-white/90">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full bg-white/90 text-foreground hover:bg-white">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Course
                    </Button>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <span>by {course.instructor}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">${course.price}</span>
                        <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                      </div>
                      <Button className="bg-gradient-primary hover:opacity-90">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">All Courses</h2>
            <div className="text-sm text-muted-foreground">
              Showing 1-12 of 200+ courses
            </div>
          </div>
          <CourseGrid />
        </div>
      </main>
    </div>
  )
}
