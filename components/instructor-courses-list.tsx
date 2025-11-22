"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Edit, MoreHorizontal, Trash2, CheckCircle, XCircle, Archive } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  getInstructorCourses,
  publishCourse,
  unpublishCourse,
  archiveCourse,
  deleteCourse,
  type Course,
} from "@/lib/services/courses"

export function InstructorCoursesList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const data = await getInstructorCourses()
      setCourses(data)
    } catch (error: any) {
      console.error("Error fetching courses:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to load courses",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handlePublish = async (courseId: string) => {
    try {
      await publishCourse(courseId)
      toast({
        title: "Course published",
        description: "Your course is now visible to students",
      })
      fetchCourses()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to publish course",
        variant: "destructive",
      })
    }
  }

  const handleUnpublish = async (courseId: string) => {
    try {
      await unpublishCourse(courseId)
      toast({
        title: "Course unpublished",
        description: "Your course is now a draft",
      })
      fetchCourses()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to unpublish course",
        variant: "destructive",
      })
    }
  }

  const handleArchive = async (courseId: string) => {
    try {
      await archiveCourse(courseId)
      toast({
        title: "Course archived",
        description: "Your course has been archived",
      })
      fetchCourses()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to archive course",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return
    }

    try {
      await deleteCourse(courseId)
      toast({
        title: "Course deleted",
        description: "Your course has been permanently deleted",
      })
      fetchCourses()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete course",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-32 bg-muted" />
          </Card>
        ))}
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">You haven't created any courses yet</p>
          <p className="text-sm text-muted-foreground">
            Click the "Create New Course" button to get started
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <Card key={course.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4">
              {/* Course Image */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={course.image_url || "/placeholder-course.png"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg truncate">{course.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {course.description}
                    </p>
                  </div>
                  
                  {/* Status Badge */}
                  <Badge
                    variant={
                      course.status === "Published"
                        ? "default"
                        : course.status === "Draft"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {course.status}
                  </Badge>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                  <span>{course.students} students</span>
                  <span>⭐ {course.rating.toFixed(1)}</span>
                  <span>{course.lessons} lessons</span>
                  <span>${course.price}</span>
                  <span className="capitalize">{course.level}</span>
                </div>

                {/* Tags */}
                {course.tags && course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {course.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Course
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Course
                  </DropdownMenuItem>
                  
                  {course.status === "Draft" && (
                    <DropdownMenuItem onClick={() => handlePublish(course.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Publish
                    </DropdownMenuItem>
                  )}
                  
                  {course.status === "Published" && (
                    <DropdownMenuItem onClick={() => handleUnpublish(course.id)}>
                      <XCircle className="h-4 w-4 mr-2" />
                      Unpublish
                    </DropdownMenuItem>
                  )}
                  
                  {course.status !== "Archived" && (
                    <DropdownMenuItem onClick={() => handleArchive(course.id)}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem
                    onClick={() => handleDelete(course.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
