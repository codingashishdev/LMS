"use client"

import { useEffect, useMemo, useState, type ChangeEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"
import { courses, type Course } from "@/lib/data/courses"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  SlidersHorizontal,
  Grid,
  List,
  Star,
  Clock,
  Users,
  BookOpen,
  X,
  Filter,
  Tag,
  Sparkles,
  ArrowUpRight
} from "lucide-react"

const courseCategories = Array.from(new Set(courses.map((course) => course.category))).sort()
const categories = ["All", ...courseCategories]
const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const
const sortOptions = [
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
]
const featuredCourses = courses.filter((course) => course.featured).slice(0, 3)
const updatedDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})
const normalizeUpdatedAt = (value: Course["updatedAt"]) => {
  if (!value) return null
  return value.includes("T") ? value : `${value}T00:00:00Z`
}
const getUpdatedLabel = (value: Course["updatedAt"]) => {
  const normalized = normalizeUpdatedAt(value)
  if (!normalized) return ""
  const parsed = new Date(normalized)
  if (Number.isNaN(parsed.getTime())) {
    return ""
  }
  return updatedDateFormatter.format(parsed)
}
type SortValue = (typeof sortOptions)[number]["value"]

// Safe number formatting to prevent hydration mismatches
function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export default function BrowsePage() {
  const { user, loading: authLoading } = useAuthRedirect()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All")
  const [selectedLevel, setSelectedLevel] = useState<(typeof levels)[number]>("All")
  const [sortBy, setSortBy] = useState<SortValue>(sortOptions[0].value)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  const filteredCourses = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    const filtered = courses.filter((course) => {
      const matchesQuery =
        !normalizedQuery ||
        [course.title, course.description, course.instructor, course.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)

      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel
      return matchesQuery && matchesCategory && matchesLevel
    })

  const sorter = sortOptions.find((option) => option.value === sortBy)
    if (!sorter) return filtered

    const sorted = [...filtered]
    switch (sorter.value) {
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price)
      case "popular":
      default:
        return sorted.sort((a, b) => b.students - a.students)
    }
  }, [searchQuery, selectedCategory, selectedLevel, sortBy])

  const activeFilterChips = useMemo(() => {
    const chips: { label: string; onRemove: () => void }[] = []
    if (searchQuery.trim()) {
      chips.push({ label: `Query: ${searchQuery.trim()}`, onRemove: () => setSearchQuery("") })
    }
    if (selectedCategory !== "All") {
      chips.push({ label: `Category: ${selectedCategory}`, onRemove: () => setSelectedCategory("All") })
    }
    if (selectedLevel !== "All") {
      chips.push({ label: `Level: ${selectedLevel}`, onRemove: () => setSelectedLevel("All") })
    }
    return chips
  }, [searchQuery, selectedCategory, selectedLevel])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedLevel("All")
    setSortBy(sortOptions[0].value)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // User will be redirected by useAuthRedirect
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 space-y-10">
        <section className="text-center animate-fade-in space-y-4">
          <Badge className="mx-auto w-fit bg-primary/10 text-primary">
            <Sparkles className="mr-1 h-3 w-3" />
            Fresh content added weekly
          </Badge>
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-3">Discover Amazing Courses</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore curated curriculum paths, filter by goals, and enroll in minutes.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
              className="pl-12 h-14 text-lg"
              aria-label="Search courses"
            />
          </div>

          <div className="flex justify-center lg:hidden">
            <Button variant="outline" onClick={() => setShowFilters((prev: boolean) => !prev)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className={`cursor-pointer transition-all ${
                      selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-3">Level</h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <Badge
                      key={level}
                      variant={selectedLevel === level ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        selectedLevel === level ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
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
                <select
                  value={sortBy}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => setSortBy(event.target.value as SortValue)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {activeFilterChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/50 bg-muted/40 px-4 py-3 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {activeFilterChips.map((chip) => (
                <Badge key={chip.label} variant="secondary" className="flex items-center gap-1 pr-1">
                  {chip.label}
                  <button type="button" onClick={chip.onRemove} aria-label={`Remove ${chip.label}`} className="rounded-full p-0.5 hover:bg-muted">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
                Clear all filters
              </Button>
            </div>
          )}
        </section>

        {featuredCourses.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-muted-foreground">Featured</p>
                <h2 className="text-2xl font-bold text-foreground">Programs hand-picked by mentors</h2>
              </div>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/browse#all-courses">
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <FeaturedCourseCard key={index} course={undefined} index={index} loading={true} />
                  ))
                : featuredCourses.map((course, index) => (
                    <FeaturedCourseCard key={course.id} course={course} index={index} loading={false} />
                  ))}
            </div>
          </section>
        )}

        <section id="all-courses" className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Catalog</p>
              <h2 className="text-3xl font-bold text-foreground">All courses</h2>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {filteredCourses.length} curated learning paths
            </p>
          </div>

          {loading ? (
            <LoadingGrid />
          ) : filteredCourses.length === 0 ? (
            <EmptyState onReset={clearFilters} />
          ) : viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCardView key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <CourseListRow key={course.id} course={course} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

type FeaturedCourseCardProps = {
  course?: Course
  index: number
  loading: boolean
}

function FeaturedCourseCard({ course, index, loading }: FeaturedCourseCardProps) {
  if (loading || !course) {
    return (
      <div className="space-y-3">
        <Skeleton className="w-full aspect-video" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-full" />
      </div>
    )
  }

  return (
    <Card className="group overflow-hidden hover-lift animate-slide-up" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={index === 0}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-red-500 text-white">Featured</Badge>
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {course.level}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full bg-white/90 text-foreground hover:bg-white" asChild>
            <Link href={`/course/${course.id}`}>
              <BookOpen className="h-4 w-4 mr-2" />
              View syllabus
            </Link>
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
        <CardTitle className="text-lg group-hover:text-primary transition-colors">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span suppressHydrationWarning>{formatNumber(course.students)}</span>
            </div>
            <span>by {course.instructor}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">${course.price}</span>
            <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90" asChild>
            <Link href={`/course/${course.id}`}>Enroll now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CourseCardView({ course }: { course: Course }) {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge variant="secondary" className="absolute top-3 left-3 bg-white/90 text-foreground">
          {course.level}
        </Badge>
      </div>
      <CardHeader className="flex-1">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
          <span>{course.duration}</span>
        </div>
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CourseMeta course={course} />
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-primary">${course.price}</div>
            <div className="text-sm text-muted-foreground line-through">${course.originalPrice}</div>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90" asChild>
            <Link href={`/course/${course.id}`}>View course</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CourseListRow({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-4 md:p-6 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl md:w-56">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
          />
          <Badge variant="secondary" className="absolute top-3 left-3 bg-white/90 text-foreground">
            {course.level}
          </Badge>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
            <span>•</span>
            <span>{course.duration}</span>
            <span>•</span>
            <span>{course.level}</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground">{course.title}</h3>
          <p className="text-muted-foreground line-clamp-2">{course.description}</p>
          <CourseMeta course={course} />
        </div>
        <div className="flex flex-col gap-3 text-right min-w-40">
          <div>
            <div className="text-3xl font-bold text-primary">${course.price}</div>
            <div className="text-sm text-muted-foreground line-through">${course.originalPrice}</div>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90" asChild>
            <Link href={`/course/${course.id}`} className="flex items-center gap-1">
              Enroll
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function CourseMeta({ course }: { course: Course }) {
  const updatedLabel = useMemo(() => getUpdatedLabel(course.updatedAt), [course.updatedAt])

  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <Users className="h-4 w-4" />
        <span suppressHydrationWarning>{formatNumber(course.students)} learners</span>
      </div>
      <div className="flex items-center gap-1">
        <BookOpen className="h-4 w-4" />
        <span>{course.lessons} lessons</span>
      </div>
      {updatedLabel && (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>Updated {updatedLabel}</span>
        </div>
      )}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="w-full aspect-video" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-10 text-center">
      <Filter className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
      <h3 className="text-xl font-semibold text-foreground mb-2">No courses match your filters</h3>
      <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
        Try broadening your search, picking a different category, or resetting your filters to explore the full catalog.
      </p>
      <Button onClick={onReset} variant="outline">
        Reset filters
      </Button>
    </div>
  )
}
