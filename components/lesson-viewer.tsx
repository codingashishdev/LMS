"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEnhancedCodeBlocks } from "@/hooks/use-enhanced-code-blocks"

interface Lesson {
  id: number
  title: string
  duration: string
  type: "video" | "exercise" | "reading"
  videoUrl?: string
  content: string
  courseId: number
  courseTitle: string
  nextLesson: number | null
  prevLesson: number | null
  completed: boolean
}

export function LessonViewer({ lesson }: { lesson: Lesson }) {
  const [isCompleted, setIsCompleted] = useState(lesson.completed)
  const [watchProgress, setWatchProgress] = useState(lesson.completed ? 100 : 0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Enhance code blocks in lesson content
  useEnhancedCodeBlocks(contentRef)

  const handleMarkComplete = () => {
    setIsCompleted(true)
    setWatchProgress(100)
  }

  const handleVideoProgress = () => {
    // Simulate video progress
    if (watchProgress < 100) {
      setWatchProgress((prev) => Math.min(prev + 10, 100))
    }
    if (watchProgress >= 90 && !isCompleted) {
      setIsCompleted(true)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link href={`/course/${lesson.courseId}`} className="text-primary hover:underline">
          ← Back to {lesson.courseTitle}
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                {isCompleted && <CheckCircle className="h-6 w-6 text-primary" />}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{lesson.duration}</span>
                <span>•</span>
                <span className="capitalize">{lesson.type}</span>
              </div>
            </CardHeader>
            <CardContent>
              {lesson.type === "video" && (
                <div className="mb-6">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <PlayCircle className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Video Player Placeholder</p>
                      <Button onClick={handleVideoProgress} className="mt-2">
                        Simulate Progress
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Watch Progress</span>
                      <span>{watchProgress}%</span>
                    </div>
                    <Progress value={watchProgress} />
                  </div>
                </div>
              )}

              <div 
                ref={contentRef}
                className="lesson-content prose prose-sm max-w-none" 
                dangerouslySetInnerHTML={{ __html: lesson.content }} 
              />

              {!isCompleted && (
                <div className="mt-6 pt-6 border-t border-border">
                  <Button onClick={handleMarkComplete} className="w-full">
                    Mark as Complete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lesson Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lesson.prevLesson !== null && (
                <Link href={`/course/${lesson.courseId}/lesson/${lesson.prevLesson}`}>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Lesson
                  </Button>
                </Link>
              )}

              {lesson.nextLesson !== null && (
                <Link href={`/course/${lesson.courseId}/lesson/${lesson.nextLesson}`}>
                  <Button className="w-full justify-start" disabled={!isCompleted}>
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              )}

              <Link href={`/course/${lesson.courseId}`}>
                <Button variant="ghost" className="w-full">
                  Course Overview
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Course Progress */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>75%</span>
                </div>
                <Progress value={75} />
                <p className="text-xs text-muted-foreground">3 of 6 lessons completed</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function PlayCircle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="10,8 16,12 10,16 10,8"></polygon>
    </svg>
  )
}
