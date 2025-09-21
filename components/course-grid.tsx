import React from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Clock, 
  Star, 
  Users, 
  BookOpen, 
  ChevronRight,
  Award,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Heart } from "lucide-react"

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
    rating: 4.8,
    students: 1250,
    lessons: 24,
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
    rating: 4.9,
    students: 980,
    lessons: 36,
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
    rating: 4.7,
    students: 2100,
    lessons: 18,
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
    rating: 4.6,
    students: 750,
    lessons: 30,
  },
]

export const CourseGrid = React.memo(function CourseGrid() {
  const [wishlist, setWishlist] = useLocalStorage<number[]>("wishlist", [])
  const toggleWish = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground">My Courses</h2>
          <p className="text-muted-foreground mt-1">Continue your learning journey</p>
        </div>
        <Link href="/browse">
          <Button variant="outline" className="hover:bg-primary/10 hover:border-primary/20">
            Browse All Courses
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course, index) => (
          <Card 
            key={course.id} 
            className="group overflow-hidden hover-lift animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-video relative overflow-hidden">
              <Image 
                src={course.image || "/placeholder.svg"} 
                alt={course.title} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-white/90 text-foreground font-medium">
                  {course.level}
                </Badge>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30" onClick={() => toggleWish(course.id)} aria-label="Toggle wishlist">
                  <Heart className={"h-4 w-4 " + (wishlist.includes(course.id) ? "fill-red-500 text-red-500" : "text-white")} />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button className="w-full bg-white/90 text-foreground hover:bg-white">
                  <Play className="h-4 w-4 mr-2" />
                  {course.progress === 0 ? "Start Course" : course.progress === 100 ? "Review" : "Continue"}
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
              <CardDescription className="line-clamp-2">{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </div>
                
                {course.progress > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="font-medium">Progress</span>
                      <span className="text-primary font-semibold">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-muted-foreground">
                    by <span className="font-medium text-foreground">{course.instructor}</span>
                  </div>
                  <Link href={`/course/${course.id}`}>
                    <Button 
                      size="sm" 
                      className="bg-gradient-primary hover:opacity-90"
                    >
                      {course.progress === 0 ? "Start" : course.progress === 100 ? "Review" : "Continue"}
                      <ChevronRight className="ml-1 h-3 w-3" />
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
})
