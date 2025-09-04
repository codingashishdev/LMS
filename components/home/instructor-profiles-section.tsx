"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const instructors = [
  { id: "a-lovelace", name: "Ada Lovelace", title: "Programming Pioneer", avatar: "/ada-lovelace-avatar.jpg" },
  { id: "a-turing", name: "Alan Turing", title: "Computer Scientist", avatar: "/alan-turing-avatar.jpg" },
  { id: "g-hopper", name: "Grace Hopper", title: "Rear Admiral, USN", avatar: "/grace-hopper-avatar.jpg" },
]

export function InstructorProfilesSection() {
  return (
    <section aria-labelledby="instructor-profiles" className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 id="instructor-profiles" className="text-lg font-semibold text-foreground text-balance">
          Instructor Profiles
        </h2>
        <Link href="/instructor" className="text-sm text-primary hover:underline">
          Meet all instructors
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {instructors.map((i) => (
          <Card key={i.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={i.avatar || "/placeholder.svg"} alt={`${i.name} avatar`} />
                  <AvatarFallback>
                    {i.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{i.name}</CardTitle>
                  <CardDescription>{i.title}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-end">
              <Link href={`/instructor/${i.id}`}>
                <Button size="sm" variant="secondary">
                  View profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
