"use client"

import type React from "react"
import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import { useAuthRedirect } from "@/hooks/use-auth-redirect"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, MapPin, User, Link as LinkIcon } from "lucide-react"

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
  const { user, loading: authLoading } = useAuthRedirect()
  const [profile, setProfile] = useLocalStorage<Profile>("lms:profile", {
    ...defaults,
    name: user?.user_metadata?.name || user?.email?.split('@')[0] || "",
  })
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

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
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border bg-gradient-to-r from-accent/30 to-transparent p-6 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatarUrl || "/placeholder-user.jpg"} alt={profile.name || "User"} />
          <AvatarFallback>{(profile.name || "U").slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{profile.name || "Your Name"}</h1>
          </div>
          <p className="text-muted-foreground">
            {profile.headline || "Add a short headline to introduce yourself"}
          </p>
        </div>
        <Button variant="outline" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}>
          Edit Profile
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your public information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSave} className="grid gap-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="md:col-span-2 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full name</Label>
                      <Input id="name" value={profile.name} onChange={(e) => update("name", e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="headline">Headline</Label>
                      <Input id="headline" value={profile.headline} onChange={(e) => update("headline", e.target.value)} />
                    </div>
                  </div>
                  <div className="flex items-start justify-center">
                    <div className="grid place-items-center gap-3">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile.avatarUrl || "/placeholder-user.jpg"} alt="Avatar preview" />
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                      <div className="w-full grid gap-2">
                        <Label htmlFor="avatarUrl">Avatar URL</Label>
                        <Input
                          id="avatarUrl"
                          type="url"
                          value={profile.avatarUrl}
                          onChange={(e) => update("avatarUrl", e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={profile.bio} onChange={(e) => update("bio", e.target.value)} rows={5} />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" type="url" value={profile.website} onChange={(e) => update("website", e.target.value)} placeholder="https://example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={profile.location} onChange={(e) => update("location", e.target.value)} placeholder="City, Country" />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Preview</CardTitle>
              <CardDescription>How your profile appears to others.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{profile.name || "Your Name"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{profile.website || "No website added"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{profile.location || "No location"}</span>
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap">{profile.bio || "Write a short bio to tell others about yourself."}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
              <CardDescription>Add relevant links users can visit.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="website2">Personal site</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="website2" className="pl-9" placeholder="https://your-site.com" value={profile.website} onChange={(e) => update("website", e.target.value)} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location2">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="location2" className="pl-9" placeholder="City, Country" value={profile.location} onChange={(e) => update("location", e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
