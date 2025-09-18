"use client"

import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, BookOpen, Award, X } from "lucide-react"

type Notification = {
  id: number
  title: string
  description: string
  time: string
  type: "course" | "reminder" | "achievement"
}

const mockNotifications: Notification[] = [
  { id: 1, title: "New lesson available", description: "React Hooks Deep Dive is now live", time: "2h ago", type: "course" },
  { id: 2, title: "Study reminder", description: "Schedule your weekly study session", time: "1d ago", type: "reminder" },
  { id: 3, title: "Achievement unlocked", description: "7-day learning streak!", time: "3d ago", type: "achievement" },
]

export function NotificationsDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-xl animate-slide-down lg:animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Bell className="h-5 w-5" /> Notifications
          </div>
          <button aria-label="Close" onClick={() => onOpenChange(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-57px)]">
          {mockNotifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <div className="mt-0.5">
                {n.type === "course" && <BookOpen className="h-4 w-4 text-primary" />}
                {n.type === "reminder" && <Calendar className="h-4 w-4 text-blue-500" />}
                {n.type === "achievement" && <Award className="h-4 w-4 text-yellow-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-foreground">{n.title}</div>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </div>
                <div className="text-sm text-muted-foreground">{n.description}</div>
              </div>
              <Badge variant="secondary" className="shrink-0">New</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


