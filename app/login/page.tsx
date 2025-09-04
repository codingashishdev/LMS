"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

type LoginValues = {
  email: string
  password: string
  remember: boolean
}

export default function LoginPage() {
  const router = useRouter()
  const form = useForm<LoginValues>({
    defaultValues: { email: "", password: "", remember: true },
    mode: "onChange",
  })

  async function onSubmit(values: LoginValues) {
    await new Promise((r) => setTimeout(r, 500))
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <section className="hidden md:flex flex-col justify-center">
          <h1 className="text-pretty text-3xl font-semibold md:text-4xl text-foreground">Welcome back to LearnHub</h1>
          <p className="mt-3 text-muted-foreground">
            Pick up where you left off. Access your courses, track progress, and keep learning.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              Secure login with email and password
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              Remember me option for faster access
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              Forgot Password flow when you need it
            </li>
          </ul>
        </section>

        <section className="flex items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Use your email and password to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    name="email"
                    control={form.control}
                    rules={{
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} inputMode="email" placeholder="you@example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    rules={{
                      required: "Password is required",
                      minLength: { value: 6, message: "At least 6 characters" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input {...field} type="password" placeholder="Your password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <FormField
                      name="remember"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="remember"
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(Boolean(v))}
                          />
                          <Label htmlFor="remember" className="text-sm">
                            Remember me
                          </Label>
                        </div>
                      )}
                    />
                    <div className="text-sm">
                      New here?{" "}
                      <Link href="/register" className="text-primary underline underline-offset-2">
                        Create an account
                      </Link>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
