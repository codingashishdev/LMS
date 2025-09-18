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
      const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
      const meta = isMac ? e.metaKey : e.ctrlKey
      if ((meta && e.key.toLowerCase() === "k") || e.key === "/") {
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
    <CommandDialog open={open} onOpenChange={setOpenBoth} label="Global Command Palette">
      <DialogTitle className="sr-only">Global Command Palette</DialogTitle>
      <CommandInput placeholder="Search pages, courses, actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={navigate("/")}> <Home className="mr-2 h-4 w-4" /> Home</CommandItem>
          <CommandItem onSelect={navigate("/browse")}> <Search className="mr-2 h-4 w-4" /> Browse</CommandItem>
          <CommandItem onSelect={navigate("/dashboard")}> <GraduationCap className="mr-2 h-4 w-4" /> Dashboard</CommandItem>
          <CommandItem onSelect={navigate("/progress")}> <BarChart3 className="mr-2 h-4 w-4" /> Progress</CommandItem>
          <CommandItem onSelect={navigate("/instructor")}> <User className="mr-2 h-4 w-4" /> Instructor</CommandItem>
          <CommandItem onSelect={navigate("/settings")}> <Settings className="mr-2 h-4 w-4" /> Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={navigate("/register")}>
            <Sparkles className="mr-2 h-4 w-4" /> Get Started
          </CommandItem>
          <CommandItem onSelect={navigate("/browse")}>
            <BookOpen className="mr-2 h-4 w-4" /> Explore Courses
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}


