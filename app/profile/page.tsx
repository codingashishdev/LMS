"use client"

import type React from "react"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Profile = {
  name: string
  headline: string
  bio: string
  website: string
  location: string
  avatarUrl: string
}

const defaults: Profile = {
  name: "",
  headline: "",
  bio: "",
  website: "",
  location: "",
  avatarUrl: "",
}

export default function ProfilePage() {
  const [profile, setProfile] = useLocalStorage<Profile>("lms:profile", defaults)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  function update<K extends keyof Profile>(key: K, val: Profile[K]) {
    setProfile({ ...profile, [key]: val })
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 500))
    setSaving(false)
    toast({ title: "Profile saved", description: "Your profile was updated successfully." })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your public information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSave} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={profile.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" value={profile.headline} onChange={(e) => update("headline", e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" value={profile.bio} onChange={(e) => update("bio", e.target.value)} />
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={profile.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={profile.location} onChange={(e) => update("location", e.target.value)} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                type="url"
                value={profile.avatarUrl}
                onChange={(e) => update("avatarUrl", e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
