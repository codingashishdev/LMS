"use client"

import { createContext, useCallback, useContext, useMemo } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

export type NotificationCategory = "course" | "reminder" | "achievement" | "system"
export type NotificationPriority = "low" | "medium" | "high"

export type NotificationAction = {
  label: string
  href: string
}

export type Notification = {
  id: string
  title: string
  description: string
  timestamp: string
  type: NotificationCategory
  priority: NotificationPriority
  read: boolean
  tag?: string
  action?: NotificationAction
}

interface NotificationsContextValue {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  dismissNotification: (id: string) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read"> & { id?: string; timestamp?: string; read?: boolean }) => void
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

const seedNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "New lesson unlocked: Advanced Hooks",
    description: "Module 5 is now available in Complete React Developer.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    type: "course",
    priority: "medium",
    read: false,
    tag: "Course update",
    action: { label: "View lesson", href: "/course/101" },
  },
  {
    id: "notif-2",
    title: "Schedule your weekly focus block",
    description: "Block out 90 minutes to finish the Node.js capstone this week.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    type: "reminder",
    priority: "high",
    read: false,
    tag: "Reminder",
    action: { label: "Plan session", href: "/settings" },
  },
  {
    id: "notif-3",
    title: "7-day learning streak 🔥",
    description: "Keep the momentum going to unlock the Pro Streak badge.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    type: "achievement",
    priority: "low",
    read: true,
    tag: "Milestone",
    action: { label: "View progress", href: "/progress" },
  },
  {
    id: "notif-4",
    title: "Peer review requested",
    description: "Nina left comments on your Product Management Ops assignment.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    type: "course",
    priority: "high",
    read: false,
    tag: "Collaboration",
    action: { label: "Open feedback", href: "/course/112" },
  },
]

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useLocalStorage<Notification[]>("learnhub.notifications", seedNotifications)

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort(
      (a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
    )
  }, [notifications])

  const unreadCount = useMemo(() => sortedNotifications.filter((notification) => !notification.read).length, [sortedNotifications])

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)))
  }, [setNotifications])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [setNotifications])

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [setNotifications])

  const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read"> & { id?: string; timestamp?: string; read?: boolean }) => {
    const id = notification.id ?? generateNotificationId()
    const timestamp = notification.timestamp ?? new Date().toISOString()
    setNotifications((prev) => [
      { ...notification, id, timestamp, read: notification.read ?? false },
      ...prev,
    ])
  }, [setNotifications])

  const value = useMemo(() => ({
    notifications: sortedNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    dismissNotification,
    addNotification,
  }), [sortedNotifications, unreadCount, markAsRead, markAllAsRead, dismissNotification, addNotification])

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}

const generateNotificationId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useNotificationsCenter() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) {
    throw new Error("useNotificationsCenter must be used within a NotificationsProvider")
  }
  return ctx
}
