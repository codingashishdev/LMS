"use client"

import { useEffect, useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useNotificationsCenter } from "@/contexts/notifications-context"
import { useRouter } from "next/navigation"
import { formatDistanceToNowStrict } from "date-fns"
import { cn } from "@/lib/utils"
import { Bell, Calendar, BookOpen, Award, X, ArrowUpRight, CheckCircle2 } from "lucide-react"

type FilterValue = "all" | "unread"

const typeIconMap = {
  course: { icon: BookOpen, accent: "text-primary", badge: "bg-primary/10 text-primary" },
  reminder: { icon: Calendar, accent: "text-blue-500", badge: "bg-blue-500/10 text-blue-600" },
  achievement: { icon: Award, accent: "text-amber-500", badge: "bg-amber-500/10 text-amber-600" },
  system: { icon: Bell, accent: "text-muted-foreground", badge: "bg-muted text-foreground" },
} as const

export function NotificationsDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter()
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification } = useNotificationsCenter()
  const [filter, setFilter] = useState<FilterValue>("all")

  useEffect(() => {
    if (!open) {
      setFilter("all")
    }
  }, [open])

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((notification) => !notification.read)
    }
    return notifications
  }, [notifications, filter])

  const handleView = (notificationId: string, href?: string) => {
    if (!href) return
    markAsRead(notificationId)
    onOpenChange(false)
    router.push(href)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} aria-hidden="true" />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l bg-background shadow-xl animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between gap-4 border-b px-4 py-4">
          <div>
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Bell className="h-5 w-5" /> Notifications
            </div>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : "You're all caught up"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!unreadCount} onClick={markAllAsRead}>
              Mark all read
            </Button>
            <Button variant="ghost" size="icon" aria-label="Close notifications" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b px-4 py-3 text-sm">
          <FilterButton label="All" active={filter === "all"} onClick={() => setFilter("all")} />
          <FilterButton label="Unread" active={filter === "unread"} onClick={() => setFilter("unread")} badgeCount={unreadCount} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/70 p-8 text-center text-sm text-muted-foreground">
              <Bell className="h-8 w-8 text-muted-foreground" />
              <p>{filter === "unread" ? "No unread notifications." : "No notifications yet."}</p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const iconConfig = typeIconMap[notification.type] || typeIconMap.system
              const Icon = iconConfig.icon

              return (
                <div
                  key={notification.id}
                  className={cn(
                    "relative flex gap-3 rounded-xl border border-border/70 bg-card/60 p-3",
                    !notification.read && "border-primary/50 bg-primary/5"
                  )}
                >
                  <div className={cn("mt-1 rounded-full p-2", iconConfig.badge)}>
                    <Icon className={cn("h-4 w-4", iconConfig.accent)} aria-hidden="true" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm text-foreground">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                      </div>
                      <button
                        type="button"
                        aria-label="Dismiss notification"
                        className="text-muted-foreground transition hover:text-foreground"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      {notification.tag && (
                        <Badge variant="secondary" className="px-2 py-0 text-[10px] uppercase tracking-wide">
                          {notification.tag}
                        </Badge>
                      )}
                      {!notification.read && <Badge variant="outline">New</Badge>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" className="h-8 px-3" onClick={() => markAsRead(notification.id)}>
                          <CheckCircle2 className="mr-2 h-3.5 w-3.5" />
                          Mark read
                        </Button>
                      )}
                      {notification.action && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 px-3"
                          onClick={() => handleView(notification.id, notification.action?.href)}
                        >
                          {notification.action.label}
                          <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

function FilterButton({ label, active, onClick, badgeCount }: { label: string; active: boolean; onClick: () => void; badgeCount?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
        active ? "border-primary bg-primary/10 text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      {badgeCount ? (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">{badgeCount}</span>
      ) : null}
    </button>
  )
}

function formatTimestamp(timestamp: string) {
  try {
    return formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true })
  } catch {
    return "Just now"
  }
}


