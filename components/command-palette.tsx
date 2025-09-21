"use client"

import { useEffect, useState, useCallback } from "react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "cmdk"
import { Title as DialogTitle } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { BookOpen, GraduationCap, Home, Search, Settings, User, BarChart3, Sparkles } from "lucide-react"

type CommandPaletteProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandPalette(props: CommandPaletteProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof props.open === "boolean") setOpen(props.open)
  }, [props.open])

  const setOpenBoth = useCallback(
    (v: boolean) => {
      setOpen(v)
      props.onOpenChange?.(v)
    },
    [props]
  )

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Do not trigger when user is typing in an input/textarea or editable element
      const target = e.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase()
      const isEditable = (target as any)?.isContentEditable
      const isTypingContext = isEditable || tag === "input" || tag === "textarea" || tag === "select"

      const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
      const meta = isMac ? e.metaKey : e.ctrlKey
      // Open with Cmd/Ctrl+K globally, or with "/" when not typing in a field
      if ((meta && e.key.toLowerCase() === "k") || (!isTypingContext && !e.metaKey && !e.ctrlKey && !e.altKey && e.key === "/")) {
        e.preventDefault()
        setOpenBoth(true)
      }
      if (e.key === "Escape") setOpenBoth(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [setOpenBoth])

  const navigate = (href: string) => () => {
    setOpenBoth(false)
    router.push(href)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={(v) => {
        setOpenBoth(v)
        // lock body scroll while open to prevent page jumping
        if (typeof document !== "undefined") {
          if (v) {
            document.body.style.overflow = "hidden"
          } else {
            document.body.style.overflow = ""
          }
        }
      }}
      label="Global Command Palette"
    >
      <DialogTitle className="sr-only">Global Command Palette</DialogTitle>
      {/* Search header */}
      <div className="flex items-center gap-2 border-b px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <CommandInput
          placeholder="Search pages, courses, actions..."
          className="flex-1 h-10 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {(typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)) ? "⌘" : "Ctrl"}+K
        </kbd>
      </div>

      {/* Results */}
      <CommandList className="max-h-80 overflow-y-auto p-2">
        <CommandEmpty className="py-10 text-center text-sm text-muted-foreground">No results found.</CommandEmpty>
        <CommandGroup
          heading="Navigation"
          className="px-1 py-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
        >
          <CommandItem onSelect={navigate("/")} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
            <Home className="h-4 w-4" /> Home
          </CommandItem>
          <CommandItem onSelect={navigate("/browse")} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
            <Search className="h-4 w-4" /> Browse
          </CommandItem>
          <CommandItem onSelect={navigate("/dashboard")} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
            <GraduationCap className="h-4 w-4" /> Dashboard
          </CommandItem>
          <CommandItem onSelect={navigate("/progress")} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
            <BarChart3 className="h-4 w-4" /> Progress
          </CommandItem>
          <CommandItem onSelect={navigate("/instructor")} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
            <User className="h-4 w-4" /> Instructor
          </CommandItem>
          <CommandItem onSelect={navigate("/settings")} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
            <Settings className="h-4 w-4" /> Settings
          </CommandItem>
        </CommandGroup>
        <CommandSeparator className="my-1" />
        <CommandGroup
          heading="Quick Actions"
          className="px-1 py-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
        >
          <CommandItem onSelect={navigate("/register")} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
            <Sparkles className="h-4 w-4" /> Get Started
          </CommandItem>
          <CommandItem onSelect={navigate("/browse")} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm aria-selected:bg-accent aria-selected:text-accent-foreground">
            <BookOpen className="h-4 w-4" /> Explore Courses
          </CommandItem>
        </CommandGroup>
      </CommandList>

      {/* Footer hints */}
      <div className="border-t px-3 py-2 text-[11px] text-muted-foreground flex items-center gap-4">
        <span>Type to search</span>
        <span>Enter to select</span>
        <span>Esc to close</span>
      </div>
    </CommandDialog>
  )
}


