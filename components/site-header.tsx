"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandPalette } from "@/components/command-palette"
import { NotificationsDrawer } from "@/components/notifications-drawer"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Bell, 
  User, 
  BookOpen, 
  BarChart3, 
  GraduationCap, 
  Settings,
  Menu,
  X,
  LogOut,
  UserCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

const links = [
  { href: "/", label: "Home", icon: BookOpen },
  { href: "/browse", label: "Browse", icon: Search },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/dashboard", label: "Dashboard", icon: GraduationCap },
  { href: "/instructor", label: "Instructor", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-soft">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            LearnHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-1 lg:flex rounded-xl p-1 bg-muted/50">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={cn(
                "flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                pathname === href &&
                  "text-primary bg-primary/10 shadow-soft font-medium",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button */}
          <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2" onClick={() => (window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })), undefined)}>
            <Search className="h-4 w-4" />
            <span className="text-sm text-muted-foreground">Search courses...</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative" onClick={() => setIsNotificationsOpen(true)}>
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu or Auth Buttons */}
          {mounted && (user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.user_metadata?.name || user.email}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onSelect={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          ))}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background/95 backdrop-blur">
          <div className="px-4 py-4 space-y-2">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                  "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                  pathname === href &&
                    "text-primary bg-primary/10 font-medium",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            ))}
            
            {/* Mobile Search */}
            <div className="pt-2 border-t">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Search className="h-4 w-4" />
                Search courses...
              </Button>
            </div>
          </div>
        </div>
      )}
      <CommandPalette />
      <NotificationsDrawer open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen} />
    </header>
  )
}
