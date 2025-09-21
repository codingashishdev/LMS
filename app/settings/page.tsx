"use client"

import type React from "react"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Shield, Bell as BellIcon, Palette } from "lucide-react"

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
  const { user, loading: authLoading } = useAuthRedirect()
  const [settings, setSettings] = useLocalStorage<Settings>("lms:settings", defaults)
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // User will be redirected by useAuthRedirect
  }

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
    <div className="space-y-8">
      <div className="rounded-xl border bg-gradient-to-r from-accent/30 to-transparent p-6">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage how the application behaves for you.</p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Palette className="h-4 w-4" /> Appearance</CardTitle>
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
        </TabsContent>

        <TabsContent value="notifications">
          <form onSubmit={onSave} className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BellIcon className="h-4 w-4" /> Notifications</CardTitle>
                <CardDescription>Manage email and reminders.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="grid">
                    <Label htmlFor="emailUpdates">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">Announcements and featured courses.</p>
                  </div>
                  <Switch id="emailUpdates" checked={settings.emailUpdates} onCheckedChange={() => toggle("emailUpdates")} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="grid">
                    <Label htmlFor="courseReminders">Course Reminders</Label>
                    <p className="text-sm text-muted-foreground">Study nudges and deadlines.</p>
                  </div>
                  <Switch id="courseReminders" checked={settings.courseReminders} onCheckedChange={() => toggle("courseReminders")} />
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-end">
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save preferences"}</Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-4 w-4" /> Privacy</CardTitle>
              <CardDescription>Control what others can see.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="grid">
                  <Label htmlFor="publicProfile">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Show your profile in directories.</p>
                </div>
                <Switch id="publicProfile" checked={settings.publicProfile} onCheckedChange={() => toggle("publicProfile")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="grid">
                  <Label htmlFor="activitySharing">Activity Sharing</Label>
                  <p className="text-sm text-muted-foreground">Share completions and badges.</p>
                </div>
                <Switch id="activitySharing" checked={settings.activitySharing} onCheckedChange={() => toggle("activitySharing")} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle className="h-4 w-4" /> Danger Zone</CardTitle>
              <CardDescription>These actions are irreversible. Proceed with caution.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <div className="grid">
                  <div className="font-medium">Delete Account</div>
                  <p className="text-sm text-muted-foreground">Permanently remove your account and data.</p>
                </div>
                <Button variant="destructive" disabled>Delete</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
