"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const myCourses = [
  { id: "react-101", title: "React 101", progress: 62, nextLesson: "Components & Props" },
  { id: "ts-fundamentals", title: "TypeScript Fundamentals", progress: 28, nextLesson: "Generics" },
  { id: "sql-basics", title: "SQL Basics", progress: 90, nextLesson: "Joins" },
]

export function MyCoursesSection() {
  return (
    <section aria-labelledby="my-courses" className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 id="my-courses" className="text-lg font-semibold text-foreground text-balance">
          My Courses
        </h2>
        <Link href="/dashboard" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {myCourses.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="text-sm text-muted-foreground">Next up: {c.nextLesson}</div>
              <Progress value={c.progress} />
              <div className="flex items-center justify-between">
                <div className="text-sm">{c.progress}% complete</div>
                <Link href={`/course/${c.id}`}>
                  <Button size="sm">Continue</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
