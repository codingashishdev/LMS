import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect("/login")
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold text-foreground mb-1">LearnHub</h1>
          <p className="text-muted-foreground">Your gateway to knowledge</p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Trusted by 50k+ learners</span>
            <span>•</span>
            <span>ISO 27001 Security</span>
            <span>•</span>
            <span>GDPR Compliant</span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to LearnHub</CardTitle>
            <CardDescription>Choose how you’d like to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button asChild size="lg" className="w-full">
                <Link href="/login" aria-label="Go to Sign in page">
                  Sign in
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full">
                <Link href="/register" aria-label="Go to Sign up page">
                  Create account
                </Link>
              </Button>
            </div>

            <div className="rounded-md border border-input p-3 text-xs text-muted-foreground space-y-2">
              <div className="grid md:grid-cols-3 gap-2">
                <div>
                  <div className="font-medium text-foreground mb-1">Need help?</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>
                      <a className="hover:underline" href="/help/reset-password">
                        Reset your password
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="/help/account-access">
                        Can't access account
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Why LearnHub?</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Hands-on projects</li>
                    <li>Instructor Q&amp;A</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-foreground mb-1">Resources</div>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>
                      <a className="hover:underline" href="/privacy">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="/terms">
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <p>By continuing, you agree to our Terms and acknowledge our Privacy Policy.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
