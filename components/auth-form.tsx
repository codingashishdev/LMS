"use client"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

type SignInValues = {
  email: string
  password: string
  remember: boolean
  has2fa: boolean
  otp?: string
}

type SignUpValues = {
  name: string
  email: string
  username?: string
  password: string
  confirmPassword: string
  role: "student" | "instructor" | ""
  terms: boolean
  marketing: boolean
}

const EMAIL_SUGGESTIONS = ["gmail.com", "outlook.com", "yahoo.com", "icloud.com", "proton.me"]

function passwordStrength(pw: string) {
  let score = 0
  const checks = {
    length: pw.length >= 8,
    lower: /[a-z]/.test(pw),
    upper: /[A-Z]/.test(pw),
    number: /\d/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
  }
  score = Object.values(checks).filter(Boolean).length
  const pct = Math.round((score / 5) * 100)
  let label = "Weak"
  if (pct >= 80) label = "Strong"
  else if (pct >= 60) label = "Good"
  else if (pct >= 40) label = "Fair"
  return { pct, label, checks }
}

export function AuthForm() {
  const router = useRouter()
  const [tab, setTab] = useState<"signin" | "signup">("signin")

  const [capsSignIn, setCapsSignIn] = useState(false)
  const [capsSignUp, setCapsSignUp] = useState(false)
  const [capsSignUpConfirm, setCapsSignUpConfirm] = useState(false)

  const [showSignInPw, setShowSignInPw] = useState(false)
  const [showSignUpPw, setShowSignUpPw] = useState(false)
  const [showSignUpConfirmPw, setShowSignUpConfirmPw] = useState(false)

  const [checkingUsername, setCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)

  const signInForm = useForm<SignInValues>({
    defaultValues: { email: "", password: "", remember: true, has2fa: false, otp: "" },
    mode: "onChange",
  })

  const onSubmitSignIn = async (values: SignInValues) => {
    await new Promise((r) => setTimeout(r, 800))
    router.push("/dashboard")
  }

  const signUpForm = useForm<SignUpValues>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
      terms: false,
      marketing: false,
    },
    mode: "onChange",
  })

  const pw = signUpForm.watch("password")
  const pwStats = useMemo(() => passwordStrength(pw || ""), [pw])

  const onSubmitSignUp = async (values: SignUpValues) => {
    if (values.password !== values.confirmPassword) {
      signUpForm.setError("confirmPassword", { message: "Passwords do not match" })
      return
    }
    if (!values.terms) {
      signUpForm.setError("terms", { message: "You must accept the Terms & Privacy Policy" })
      return
    }

    await new Promise((r) => setTimeout(r, 1000))
    router.push("/dashboard")
  }

  const signInEmail = signInForm.watch("email")
  const signUpEmail = signUpForm.watch("email")

  const emailSuggestions = (value: string) => {
    if (!value) return []
    const [name, domainPart = ""] = value.split("@")
    if (!name) return []
    if (value.includes("@") && domainPart.length > 0) {
      return EMAIL_SUGGESTIONS.filter((d) => d.startsWith(domainPart.toLowerCase()))
        .slice(0, 4)
        .map((d) => `${name}@${d}`)
    }
    return EMAIL_SUGGESTIONS.slice(0, 4).map((d) => `${name}@${d}`)
  }

  useEffect(() => {
    const username = signUpForm.getValues("username")?.trim()
    if (!username) {
      setUsernameAvailable(null)
      return
    }
    setCheckingUsername(true)
    const t = setTimeout(() => {
      setUsernameAvailable(!["admin", "test", "root"].includes(username.toLowerCase()) && username.length >= 4)
      setCheckingUsername(false)
    }, 500)
    return () => clearTimeout(t)
  }, [signUpForm.watch("username")])

  function CapsLockHint({ active }: { active: boolean }) {
    if (!active) return null
    return <p className="text-xs text-amber-600 dark:text-amber-400">Warning: Caps Lock is ON</p>
  }

  function EmailHelper({ value, onSelect }: { value: string; onSelect: (suggested: string) => void }) {
    const suggestions = emailSuggestions(value)
    if (suggestions.length === 0) return null
    return (
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="text-muted-foreground">Suggestions:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSelect(s)}
            className="rounded-md border border-input px-2 py-1 hover:bg-accent hover:text-accent-foreground"
          >
            {s}
          </button>
        ))}
      </div>
    )
  }

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      <TabsContent value="signin" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button type="button" variant="outline" className="w-full bg-transparent">
            <span aria-hidden="true" className="mr-2 inline-block size-4 rounded-sm bg-foreground" /> Google
          </Button>
          <Button type="button" variant="outline" className="w-full bg-transparent">
            <span aria-hidden="true" className="mr-2 inline-block size-4 rounded-sm bg-blue-500" /> Facebook
          </Button>
          <Button type="button" variant="outline" className="w-full bg-transparent">
            <span aria-hidden="true" className="mr-2 inline-block size-4 rounded-sm bg-black" /> GitHub
          </Button>
        </div>

        <Card className="border-dashed">
          <CardContent className="pt-6">
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(onSubmitSignIn)} className="space-y-4">
                <FormField
                  control={signInForm.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          inputMode="email"
                          placeholder="you@example.com"
                          onChange={(e) => {
                            field.onChange(e)
                            signInForm.clearErrors("email")
                          }}
                        />
                      </FormControl>
                      <EmailHelper
                        value={signInEmail}
                        onSelect={(s) => signInForm.setValue("email", s, { shouldValidate: true })}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signInForm.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <button
                          type="button"
                          className="text-xs text-muted-foreground hover:underline"
                          onClick={() => setShowSignInPw((s) => !s)}
                        >
                          {showSignInPw ? "Hide" : "Show"}
                        </button>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type={showSignInPw ? "text" : "password"}
                          placeholder="Your password"
                          onKeyUp={(e) => setCapsSignIn(e.getModifierState?.("CapsLock") ?? false)}
                        />
                      </FormControl>
                      <CapsLockHint active={capsSignIn} />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FormField
                            control={signInForm.control}
                            name="remember"
                            render={({ field: rb }) => (
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={rb.value}
                                  onCheckedChange={(v) => rb.onChange(Boolean(v))}
                                  id="remember"
                                />
                                <Label htmlFor="remember" className="text-sm">
                                  Remember me
                                </Label>
                              </div>
                            )}
                          />
                        </div>
                        <a href="/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signInForm.control}
                  name="has2fa"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="has2fa"
                          checked={field.value}
                          onCheckedChange={(v) => field.onChange(Boolean(v))}
                        />
                        <Label htmlFor="has2fa" className="text-sm">
                          I have a 2FA code
                        </Label>
                      </div>
                      <FormDescription>Check if your account uses two-factor authentication.</FormDescription>
                    </FormItem>
                  )}
                />

                {signInForm.watch("has2fa") && (
                  <FormField
                    control={signInForm.control}
                    name="otp"
                    rules={{ required: "Enter your 6-digit code" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>2FA Code</FormLabel>
                        <FormControl>
                          <Input {...field} inputMode="numeric" maxLength={6} placeholder="123456" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="rounded-md border border-input p-3 text-xs text-muted-foreground space-y-2">
                  <div className="font-medium text-foreground">Security tips</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Use a unique password for LearnHub</li>
                    <li>Enable 2FA for stronger protection</li>
                    <li>Beware of phishing links that ask for your credentials</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="signup" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button type="button" variant="outline" className="w-full bg-transparent">
            <span aria-hidden="true" className="mr-2 inline-block size-4 rounded-sm bg-foreground" /> Google
          </Button>
          <Button type="button" variant="outline" className="w-full bg-transparent">
            <span aria-hidden="true" className="mr-2 inline-block size-4 rounded-sm bg-blue-500" /> Facebook
          </Button>
          <Button type="button" variant="outline" className="w-full bg-transparent">
            <span aria-hidden="true" className="mr-2 inline-block size-4 rounded-sm bg-black" /> GitHub
          </Button>
        </div>

        <Card className="border-dashed">
          <CardContent className="pt-6">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(onSubmitSignUp)} className="space-y-4">
                <FormField
                  control={signUpForm.control}
                  name="name"
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

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            inputMode="email"
                            placeholder="you@example.com"
                            onChange={(e) => {
                              field.onChange(e)
                              signUpForm.clearErrors("email")
                            }}
                          />
                        </FormControl>
                        <EmailHelper
                          value={signUpEmail}
                          onSelect={(s) => signUpForm.setValue("email", s, { shouldValidate: true })}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="username"
                    rules={{ minLength: { value: 4, message: "At least 4 characters" } }}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Username</FormLabel>
                          <span className="text-xs text-muted-foreground">
                            {checkingUsername
                              ? "Checking..."
                              : usernameAvailable === null
                                ? ""
                                : usernameAvailable
                                  ? "Available"
                                  : "Taken"}
                          </span>
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="your-handle" />
                        </FormControl>
                        <FormDescription>Optional. Used for your public profile URL.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={signUpForm.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <button
                          type="button"
                          className="text-xs text-muted-foreground hover:underline"
                          onClick={() => setShowSignUpPw((s) => !s)}
                        >
                          {showSignUpPw ? "Hide" : "Show"}
                        </button>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type={showSignUpPw ? "text" : "password"}
                          placeholder="Create a strong password"
                          onKeyUp={(e) => setCapsSignUp(e.getModifierState?.("CapsLock") ?? false)}
                        />
                      </FormControl>
                      <CapsLockHint active={capsSignUp} />
                      <div className="space-y-2">
                        <Progress value={pwStats.pct} />
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Strength: {pwStats.label}</span>
                          <span className="text-muted-foreground">{pwStats.pct}%</span>
                        </div>
                        <ul className="grid grid-cols-2 gap-1 text-xs">
                          <li className={pwStats.checks.length ? "text-foreground" : "text-muted-foreground"}>
                            8+ characters
                          </li>
                          <li className={pwStats.checks.lower ? "text-foreground" : "text-muted-foreground"}>
                            Lowercase
                          </li>
                          <li className={pwStats.checks.upper ? "text-foreground" : "text-muted-foreground"}>
                            Uppercase
                          </li>
                          <li className={pwStats.checks.number ? "text-foreground" : "text-muted-foreground"}>
                            Number
                          </li>
                          <li className={pwStats.checks.special ? "text-foreground" : "text-muted-foreground"}>
                            Special char
                          </li>
                        </ul>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="confirmPassword"
                  rules={{ required: "Please confirm your password" }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Confirm Password</FormLabel>
                        <button
                          type="button"
                          className="text-xs text-muted-foreground hover:underline"
                          onClick={() => setShowSignUpConfirmPw((s) => !s)}
                        >
                          {showSignUpConfirmPw ? "Hide" : "Show"}
                        </button>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type={showSignUpConfirmPw ? "text" : "password"}
                          placeholder="Repeat your password"
                          onKeyUp={(e) => setCapsSignUpConfirm(e.getModifierState?.("CapsLock") ?? false)}
                        />
                      </FormControl>
                      <CapsLockHint active={capsSignUpConfirm} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="role"
                  rules={{ required: "Please select your role" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I am a...</FormLabel>
                      <FormControl>
                        <select {...field} className="w-full px-3 py-2 border border-input bg-background rounded-md">
                          <option value="">Select your role</option>
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-3 rounded-md border border-input p-3 text-xs">
                  <div className="font-medium text-sm text-foreground">Helpful tips</div>
                  <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                    <li>Pick a memorable username; avoid sensitive info.</li>
                    <li>Use a passphrase with multiple words for stronger security.</li>
                    <li>You can change role later in account settings.</li>
                  </ul>
                </div>

                <div className="grid gap-3">
                  <FormField
                    control={signUpForm.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="terms"
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(Boolean(v))}
                          />
                          <div className="space-y-1 leading-none">
                            <Label htmlFor="terms" className="text-sm">
                              I agree to the{" "}
                              <a href="/terms" className="text-primary underline">
                                Terms
                              </a>{" "}
                              and{" "}
                              <a href="/privacy" className="text-primary underline">
                                Privacy Policy
                              </a>
                              .
                            </Label>
                            <FormMessage />
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signUpForm.control}
                    name="marketing"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="marketing"
                            checked={field.value}
                            onCheckedChange={(v) => field.onChange(Boolean(v))}
                          />
                          <Label htmlFor="marketing" className="text-sm">
                            Send me product updates, tips, and special offers
                          </Label>
                        </div>
                        <FormDescription className="text-xs">
                          You can unsubscribe anytime from your profile.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>

                <div className="text-xs text-muted-foreground">
                  By creating an account you consent to data processing and agree to receive essential service emails.
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
