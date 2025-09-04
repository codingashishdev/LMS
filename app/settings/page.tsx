"use client"

import type React from "react"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Settings = {
  emailUpdates: boolean
  courseReminders: boolean
  publicProfile: boolean
  activitySharing: boolean
}

const defaults: Settings = {
  emailUpdates: true,
  courseReminders: true,
  publicProfile: true,
  activitySharing: false,
}

export default function SettingsPage() {
  const [settings, setSettings] = useLocalStorage<Settings>("lms:settings", defaults)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  function toggle<K extends keyof Settings>(key: K) {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 500))
    setSaving(false)
    toast({ title: "Settings saved", description: "Your preferences were updated." })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose how the interface looks to you.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 max-w-xs">
          <Label>Theme</Label>
          <Select value={theme as string} onValueChange={(v) => setTheme(v)}>
            <SelectTrigger aria-label="Theme">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <form onSubmit={onSave} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage email and reminders.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="grid">
                <Label htmlFor="emailUpdates">Email Updates</Label>
                <p className="text-sm text-muted-foreground">Announcements and featured courses.</p>
              </div>
              <Switch
                id="emailUpdates"
                checked={settings.emailUpdates}
                onCheckedChange={() => toggle("emailUpdates")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="grid">
                <Label htmlFor="courseReminders">Course Reminders</Label>
                <p className="text-sm text-muted-foreground">Study nudges and deadlines.</p>
              </div>
              <Switch
                id="courseReminders"
                checked={settings.courseReminders}
                onCheckedChange={() => toggle("courseReminders")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Control what others can see.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="grid">
                <Label htmlFor="publicProfile">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Show your profile in directories.</p>
              </div>
              <Switch
                id="publicProfile"
                checked={settings.publicProfile}
                onCheckedChange={() => toggle("publicProfile")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="grid">
                <Label htmlFor="activitySharing">Activity Sharing</Label>
                <p className="text-sm text-muted-foreground">Share completions and badges.</p>
              </div>
              <Switch
                id="activitySharing"
                checked={settings.activitySharing}
                onCheckedChange={() => toggle("activitySharing")}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save preferences"}
          </Button>
        </div>
      </form>
    </div>
  )
}
