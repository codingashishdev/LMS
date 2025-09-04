"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const catalog = [
  { id: "next-pro", title: "Next.js Pro", desc: "App Router, RSC, and performance.", tag: "Web Dev" },
  { id: "data-viz", title: "Data Visualization", desc: "Tell stories with charts.", tag: "Data" },
  { id: "ux-research", title: "UX Research", desc: "Understand your users.", tag: "Design" },
  { id: "ml-intro", title: "Intro to ML", desc: "Fundamentals and intuition.", tag: "AI" },
]

export function BrowseCoursesSection() {
  return (
    <section aria-labelledby="browse-courses" className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 id="browse-courses" className="text-lg font-semibold text-foreground text-balance">
          Browse Courses
        </h2>
        <Link href="/browse" className="text-sm text-primary hover:underline">
          Explore catalog
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {catalog.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{c.title}</CardTitle>
                <Badge variant="secondary">{c.tag}</Badge>
              </div>
              <CardDescription>{c.desc}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Link href={`/course/${c.id}`}>
                <Button size="sm" className="w-full">
                  View course
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
