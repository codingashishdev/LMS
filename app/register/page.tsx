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
import { BookOpen, CheckCircle, Mail, Lock, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

type RegisterValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

export default function RegisterPage() {
  const router = useRouter()
  const { signUp, user, loading, isSigningIn } = useAuth()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  const form = useForm<RegisterValues>({
    defaultValues: { 
      name: "", 
      email: "", 
      password: "", 
      confirmPassword: "", 
      terms: false 
    },
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

  async function onSubmit(values: RegisterValues) {
    if (values.password !== values.confirmPassword) {
      form.setError('confirmPassword', { message: 'Passwords do not match' })
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      })
      return
    }

    if (!values.terms) {
      form.setError('terms', { message: 'You must accept the terms' })
      toast({
        title: "Terms required",
        description: "Please accept the terms and conditions.",
        variant: "destructive"
      })
      return
    }

    const { error } = await signUp(values.email, values.password, values.name)
    
    if (error) {
      // Handle specific registration errors
      let errorMessage = error.message
      if (error.message.includes('User already registered')) {
        errorMessage = "An account with this email already exists. Please sign in instead."
        form.setError('email', { message: 'Email already registered' })
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = "Password must be at least 6 characters long."
        form.setError('password', { message: 'Password too short' })
      } else if (error.message.includes('signup is disabled')) {
        errorMessage = "New user registration is currently disabled. Please contact support."
      } else if (error.message.includes('Unable to validate email address')) {
        errorMessage = "Please enter a valid email address."
        form.setError('email', { message: 'Invalid email format' })
      } else {
        errorMessage = "Registration failed. Please try again or contact support."
      }

      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive"
      })
    } else {
      toast({
        title: "Account created!",
        description: "Registration successful! You can now sign in."
      })
      router.push("/login")
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
            <h2 className="text-4xl font-bold text-foreground">Join thousands of learners!</h2>
            <p className="text-lg text-muted-foreground">
              Start your learning journey today and unlock your potential with expert-led courses.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Why join LearnHub?</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Access to 200+ expert-led courses</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Learn at your own pace</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-muted-foreground">Earn certificates and build your portfolio</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="flex items-center">
          <Card className="w-full shadow-strong hover-lift">
            <CardHeader className="space-y-2">
              <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
              <CardDescription className="text-base">
                Join our community of learners and start your journey today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" suppressHydrationWarning>
                  <FormField
                    name="name"
                    control={form.control}
                    rules={{
                      required: "Name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              {...field} 
                              placeholder="John Doe" 
                              className="pl-9 h-12"
                            />
                          </div>
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
                        <FormLabel className="text-sm font-semibold">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="john@example.com" 
                              className="pl-9 h-12"
                            />
                          </div>
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
                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                {...field} 
                                type="password" 
                                placeholder="••••••••" 
                                className="pl-9 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="confirmPassword"
                      control={form.control}
                      rules={{
                        required: "Please confirm your password",
                        validate: (value) => value === form.getValues("password") || "Passwords do not match"
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold">Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                {...field} 
                                type="password" 
                                placeholder="••••••••" 
                                className="pl-9 h-12"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    name="terms"
                    control={form.control}
                    rules={{
                      required: "You must accept the terms and conditions"
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(Boolean(v))}
                          />
                          <Label htmlFor="terms" className="text-sm">
                            I agree to the{" "}
                            <Link href="/terms" className="text-primary hover:underline">
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-primary hover:opacity-90 text-base font-semibold"
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? "Creating Account..." : "Create Account"}
                  </Button>
                  
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                      Sign in
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