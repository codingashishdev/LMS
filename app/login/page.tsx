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
import { BookOpen, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

type LoginValues = {
  email: string
  password: string
  remember: boolean
}

export default function LoginPage() {
  const router = useRouter()
  const { signIn, user, loading } = useAuth()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  const form = useForm<LoginValues>({
    defaultValues: { email: "", password: "", remember: true },
    mode: "onChange",
  })

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading && mounted) {
      router.push("/dashboard")
    }
  }, [user, loading, router, mounted])

  async function onSubmit(values: LoginValues) {
    console.log('Attempting login with:', { email: values.email, passwordLength: values.password.length })

    const { error } = await signIn(values.email, values.password)

    if (error) {
      console.error('Login error details:', {
        message: error.message,
        status: error.status,
        name: error.name
      })

      // Handle specific error cases
      let errorMessage = error.message
      if (error.message.includes('Email not confirmed')) {
        errorMessage = "Please check your email and click the confirmation link, or disable email confirmation in your Supabase dashboard for development."
      } else if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Invalid email or password. Please check your credentials."
      } else if (error.message.includes('Email logins are disabled')) {
        errorMessage = "Email authentication is disabled in Supabase. Please enable it in your Supabase dashboard under Authentication → Providers."
      }

      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive"
      })
    } else {
      toast({
        title: "Welcome back!",
        description: "Login successful!",
      })
    }
  }

  if (!mounted || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <section className="hidden md:flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">LearnHub</h1>
            </div>
            <h2 className="text-4xl font-bold text-foreground">Welcome back!</h2>
            <p className="text-lg text-muted-foreground">
              Pick up where you left off. Access your courses, track progress, and keep learning.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Why learners choose us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Secure login with email and password</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Remember me option for faster access</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Forgot Password flow when you need it</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="flex items-center">
          <Card className="w-full shadow-strong hover-lift">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-bold">Sign in</CardTitle>
              <CardDescription className="text-base">
                Use your email and password to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" suppressHydrationWarning>
                  <FormField
                    name="email"
                    control={form.control}
                    rules={{
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email" 
                            inputMode="email" 
                            placeholder="you@example.com" 
                            autoComplete="email"
                            className="h-12"
                          />
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
                          <FormLabel className="text-sm font-semibold">Password</FormLabel>
                          <Link href="/forgot-password" className="text-sm text-primary hover:underline font-medium">
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="password" 
                            placeholder="Your password" 
                            autoComplete="current-password"
                            className="h-12"
                          />
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
                          <Label htmlFor="remember" className="text-sm font-medium">
                            Remember me
                          </Label>
                        </div>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full h-12 bg-gradient-primary hover:opacity-90 text-base font-semibold">
                    Sign In
                  </Button>
                  
                  <div className="text-center text-sm">
                    New here?{" "}
                    <Link href="/register" className="text-primary font-semibold hover:underline">
                      Create an account
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
