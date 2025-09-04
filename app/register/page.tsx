"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type RegisterValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const router = useRouter()
  const form = useForm<RegisterValues>({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onChange",
  })

  async function onSubmit(values: RegisterValues) {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" })
      return
    }
    await new Promise((r) => setTimeout(r, 700))
    router.push("/dashboard")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <section className="flex items-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Create your account</CardTitle>
              <CardDescription>Join LearnHub to start learning and track your progress.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    name="name"
                    control={form.control}
                    rules={{ required: "Full name is required", minLength: { value: 2, message: "Too short" } }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ada Lovelace" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      name="password"
                      control={form.control}
                      rules={{
                        required: "Password is required",
                        minLength: { value: 8, message: "At least 8 characters" },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" placeholder="Create a strong password" />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">Use 8+ characters with letters and numbers.</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="confirmPassword"
                      control={form.control}
                      rules={{ required: "Please confirm your password" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" placeholder="Repeat your password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary underline underline-offset-2">
                      Sign in
                    </Link>
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>

        <section className="hidden md:flex flex-col justify-center">
          <h2 className="text-pretty text-3xl font-semibold md:text-4xl text-foreground">Your journey starts here</h2>
          <p className="mt-3 text-muted-foreground">
            Browse curated courses, learn from expert instructors, and visualize your progress with a simple, clear
            dashboard.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              Track completion and achievements
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              Personalized recommendations as you learn
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full bg-primary" />
              Learn at your own pace, anytime
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
