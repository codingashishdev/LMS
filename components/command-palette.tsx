"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "cmdk"
import { Title as DialogTitle } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { courses, type Course } from "@/lib/data/courses"
import { useCommandPalette } from "@/contexts/command-palette-context"
import {
  BookOpen,
  GraduationCap,
  Home,
  Search,
  Settings,
  User,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"

type CommandLink = {
  label: string
  href: string
  icon: LucideIcon
}

const NAV_ITEMS: CommandLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Browse", href: "/browse", icon: Search },
  { label: "Dashboard", href: "/dashboard", icon: GraduationCap },
  { label: "Progress", href: "/progress", icon: BarChart3 },
  { label: "Instructor", href: "/instructor", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
]

const QUICK_ACTIONS: CommandLink[] = [
  { label: "Get Started", href: "/register", icon: Sparkles },
  { label: "Explore Courses", href: "/browse", icon: BookOpen },
]

export function CommandPalette() {
  const router = useRouter()
  const { open, setOpen, pendingQuery, clearPendingQuery } = useCommandPalette()
  const [search, setSearch] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const normalizedQuery = search.trim().toLowerCase()

  const courseMatches = useMemo(() => {
    if (!normalizedQuery) {
      return [...courses].sort((a, b) => b.students - a.students).slice(0, 6)
    }

    const scored = courses
      .map((course) => ({ course, score: scoreCourse(course, normalizedQuery) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || b.course.students - a.course.students)
      .slice(0, 8)

    return scored.map((entry) => entry.course)
  }, [normalizedQuery])

  const closePalette = useCallback(() => {
    setOpen(false)
    setSearch("")
    if (typeof document !== "undefined") {
      document.body.style.overflow = ""
    }
  }, [setOpen])

  const handleDialogChange = useCallback((value: boolean) => {
    setOpen(value)
    if (!value) {
      setSearch("")
    }
    if (typeof document !== "undefined") {
      document.body.style.overflow = value ? "hidden" : ""
    }
  }, [setOpen])

  useEffect(() => {
    if (pendingQuery == null) return
    setSearch(pendingQuery)
    requestAnimationFrame(() => inputRef.current?.focus())
    clearPendingQuery()
  }, [pendingQuery, clearPendingQuery])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase()
      const isEditable = (target as HTMLElement | null)?.isContentEditable
      const isTypingContext = isEditable || tag === "input" || tag === "textarea" || tag === "select"
      const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
      const meta = isMac ? event.metaKey : event.ctrlKey

      if (meta && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(true)
        return
      }

      if (!isTypingContext && !event.metaKey && !event.ctrlKey && !event.altKey && event.key === "/") {
        event.preventDefault()
        setSearch("")
        setOpen(true)
        return
      }

      if (event.key === "Escape" && open) {
        closePalette()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [closePalette, open, setOpen])

  const navigate = useCallback((href: string) => {
    closePalette()
    router.push(href)
  }, [closePalette, router])

  const handleCourseSelect = useCallback((course: Course) => {
    closePalette()
    router.push(`/course/${course.id}`)
  }, [closePalette, router])

  return (
    <CommandDialog open={open} onOpenChange={handleDialogChange} label="Global Command Palette">
      <DialogTitle className="sr-only">Global Command Palette</DialogTitle>
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <CommandInput
          ref={inputRef}
          value={search}
          onValueChange={setSearch}
          placeholder="Search courses, instructors, or actions"
          className="flex-1 h-10 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {(typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)) ? "⌘" : "Ctrl"}+K
        </kbd>
      </div>

      <CommandList className="max-h-[26rem] overflow-y-auto p-2">
        <CommandEmpty className="py-10 text-center text-sm text-muted-foreground">
          {search.trim() ? (
            <span>No matches for “{search.trim()}”. Try searching by instructor or topic.</span>
          ) : (
            <span>Type to search across navigation, actions, and courses.</span>
          )}
        </CommandEmpty>

        <CommandGroup heading="Navigation" className="px-1 py-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
            <CommandItem
              key={href}
              value={`${label} ${href}`}
              onSelect={() => navigate(href)}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-1" />

        <CommandGroup heading="Quick Actions" className="px-1 py-1">
          {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
            <CommandItem
              key={href}
              value={`${label} ${href}`}
              onSelect={() => navigate(href)}
              className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
              <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            </CommandItem>
          ))}
        </CommandGroup>

        {courseMatches.length > 0 && (
          <>
            <CommandSeparator className="my-1" />
            <CommandGroup heading={normalizedQuery ? "Courses" : "Trending courses"} className="px-1 py-1">
              {courseMatches.map((course) => (
                <CommandItem
                  key={course.id}
                  value={`${course.title} ${course.category} ${course.tags.join(" ")} ${course.instructor}`}
                  onSelect={() => handleCourseSelect(course)}
                  className="flex flex-col gap-1 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-foreground">{course.title}</p>
                    <Badge variant="outline" className="text-[11px] uppercase tracking-wide">
                      {course.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{course.category}</span>
                    <span aria-hidden="true">•</span>
                    <span>{course.duration}</span>
                    <span aria-hidden="true">•</span>
                    <span>{course.tags.slice(0, 2).join(" · ")}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>

      <div className="border-t px-3 py-2 text-[11px] text-muted-foreground flex items-center gap-4">
        <span>Type to search</span>
        <span>Enter to open</span>
        <span>Esc to close</span>
      </div>
    </CommandDialog>
  )
}

function scoreCourse(course: Course, query: string) {
  const haystack = `${course.title} ${course.description} ${course.category} ${course.instructor} ${course.tags.join(" ")}`.toLowerCase()
  if (!haystack.includes(query)) return 0

  let score = 0
  if (course.title.toLowerCase().includes(query)) score += 4
  if (course.tags.some((tag) => tag.toLowerCase().includes(query))) score += 2
  if (course.category.toLowerCase().includes(query)) score += 1
  if (course.instructor.toLowerCase().includes(query)) score += 1
  if (course.description.toLowerCase().includes(query)) score += 1

  return score
}


