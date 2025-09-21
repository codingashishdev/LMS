"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Command } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export const DashboardHeader = React.memo(function DashboardHeader() {
  const { user, signOut, isSigningOut, loading } = useAuth()
  const [isClient, setIsClient] = useState(false)

  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSignOut = async () => {
    await signOut()
  }

  // Safe user data calculation - consistent between server and client
  const userName = (isClient && user && !loading) ? (user.user_metadata?.name || user.email?.split('@')[0] || 'User') : 'User'
  const userEmail = (isClient && user && !loading) ? (user.email || '') : ''
  const userInitials = (isClient && user && !loading) ? (userName.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U') : 'U'

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-primary">LearnHub</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-foreground">
                  My Courses
                </Button>
              </Link>
              <Link href="/browse">
                <Button variant="ghost" className="text-foreground">
                  Browse
                </Button>
              </Link>
              <Link href="/progress">
                <Button variant="ghost" className="text-foreground">
                  Progress
                </Button>
              </Link>
              <Link href="/instructor">
                <Button variant="ghost" className="text-foreground">
                  Instructor
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              className="hidden md:inline-flex items-center gap-2"
              onClick={() => {
                // Trigger the command palette using the same global shortcut handler
                const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform)
                const event = new KeyboardEvent("keydown", { key: isMac ? "k" : "k", ctrlKey: !isMac, metaKey: isMac })
                window.dispatchEvent(event)
              }}
            >
              <Command className="h-4 w-4" />
              <span>Command Palette</span>
              <kbd className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl"}+K</kbd>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {loading || !isClient ? (
                      <AvatarFallback suppressHydrationWarning>U</AvatarFallback>
                    ) : (
                      <>
                        <AvatarImage src={user?.user_metadata?.avatar_url} alt={userName} />
                        <AvatarFallback suppressHydrationWarning>{userInitials}</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
                  {isSigningOut ? "Signing out..." : "Log out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
})
