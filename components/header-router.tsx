"use client"

import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { DashboardHeader } from "@/components/dashboard-header"

export function HeaderRouter() {
  const pathname = usePathname()

  // Auth pages: no header for a focused experience
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return null
  }

  // Treat these paths as "app" sections that should use the DashboardHeader
  const isAppSection =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/browse") ||
    pathname.startsWith("/progress") ||
    pathname.startsWith("/course") ||
    pathname.startsWith("/instructor") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings")

  return isAppSection ? <DashboardHeader /> : <SiteHeader />
}
