import { AuthForm } from "@/components/auth-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">LearnHub</h1>
          <p className="text-muted-foreground">Your gateway to knowledge</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to access your courses and continue learning</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
