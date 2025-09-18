import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  Play, 
  Star,
  CheckCircle,
  TrendingUp,
  Clock,
  Shield,
  Globe
} from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with years of experience",
  },
  {
    icon: Users,
    title: "Interactive Learning",
    description: "Join a community of learners and collaborate on projects",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn recognized certificates upon course completion",
  },
  {
    icon: Play,
    title: "Hands-on Practice",
    description: "Apply your knowledge with real-world projects and exercises",
  },
]

const stats = [
  { label: "Active Learners", value: "50K+" },
  { label: "Courses Available", value: "200+" },
  { label: "Expert Instructors", value: "100+" },
  { label: "Completion Rate", value: "95%" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    content: "LearnHub transformed my career. The hands-on approach and expert guidance helped me land my dream job.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    content: "The quality of courses is outstanding. I've completed 5 courses and each one exceeded my expectations.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "UX Designer",
    content: "The community aspect is amazing. I've made valuable connections and learned so much from fellow students.",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-32">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 animate-fade-in">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trusted by 50,000+ learners worldwide
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-slide-up">
              Master New Skills with Expert-Led Courses
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Join thousands of learners advancing their careers with our comprehensive, 
              hands-on courses designed by industry experts.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-4 animate-slide-up">
              <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
                <Link href="/register">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/browse">
                  <Play className="mr-2 h-4 w-4" />
                  Browse Courses
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Global Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Self-Paced Learning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose LearnHub?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={feature.title} className="text-center hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/90">
            Join thousands of learners who are already advancing their careers
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              What Our Learners Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 border-t">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Start Learning Today
          </h2>
          <p className="mt-2 text-muted-foreground">
            Choose your path and begin your journey to mastery
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">
                Create Free Account
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/browse">
                Explore Courses
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
