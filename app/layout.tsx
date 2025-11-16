import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { HeaderRouter } from "@/components/header-router"
import { AuthProvider } from "@/contexts/auth-context"
import { Suspense } from "react"
import { CommandPalette } from "@/components/command-palette"
import { Toaster } from "@/components/ui/toaster"
import { CommandPaletteProvider } from "@/contexts/command-palette-context"
import { NotificationsProvider } from "@/contexts/notifications-context"

const siteUrl = "https://v0-learning-management-system.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LearnHub | Modern Learning Management System",
    template: "%s | LearnHub",
  },
  description: "Enroll in expert-led technology courses, track your progress, and ship projects faster with LearnHub's modern learning management platform.",
  applicationName: "LearnHub LMS",
  generator: "v0.app",
  keywords: [
    "learning management system",
    "online courses",
    "tech education",
    "react",
    "next.js",
    "programming bootcamp",
  ],
  category: "education",
  authors: [{ name: "LearnHub Team" }],
  creator: "LearnHub",
  publisher: "LearnHub",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "LearnHub | Modern Learning Management System",
    description: "Discover curated learning paths, track progress, and collaborate with mentors across the globe.",
    siteName: "LearnHub",
    images: [
      {
        url: `${siteUrl}/placeholder-logo.png`,
        width: 1200,
        height: 630,
        alt: "LearnHub preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LearnHub | Modern Learning Management System",
    description: "Join thousands of learners leveling up their careers on LearnHub.",
    creator: "@learnhub",
    images: [`${siteUrl}/placeholder-logo.png`],
  },
  icons: {
    icon: "/placeholder-logo.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NotificationsProvider>
              <CommandPaletteProvider>
                <Suspense fallback={<div>Loading...</div>}>
                  {/* Mount the command palette before page content to prevent scroll jumps */}
                  <CommandPalette />
                  <HeaderRouter />
                  {children}
                </Suspense>
              </CommandPaletteProvider>
            </NotificationsProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
