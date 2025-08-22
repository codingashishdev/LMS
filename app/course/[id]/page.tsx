import { CourseDetail } from "@/components/course-detail"
import { DashboardHeader } from "@/components/dashboard-header"

// Mock course data - in a real app this would come from a database
const courseData = {
  1: {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React development and build modern web applications",
    image: "/react-course-thumbnail.png",
    instructor: "Sarah Johnson",
    duration: "8 hours",
    level: "Beginner",
    rating: 4.8,
    students: 1250,
    enrolled: true,
    progress: 75,
    lessons: [
      {
        id: 1,
        title: "What is React?",
        duration: "12 min",
        type: "video",
        completed: true,
        description: "Introduction to React and its core concepts",
      },
      {
        id: 2,
        title: "Setting up Your Development Environment",
        duration: "15 min",
        type: "video",
        completed: true,
        description: "Install Node.js, npm, and create your first React app",
      },
      {
        id: 3,
        title: "Understanding JSX",
        duration: "18 min",
        type: "video",
        completed: true,
        description: "Learn JSX syntax and how to write React components",
      },
      {
        id: 4,
        title: "Components and Props",
        duration: "22 min",
        type: "video",
        completed: false,
        description: "Create reusable components and pass data with props",
      },
      {
        id: 5,
        title: "State and Event Handling",
        duration: "25 min",
        type: "video",
        completed: false,
        description: "Manage component state and handle user interactions",
      },
      {
        id: 6,
        title: "Practice Exercise: Todo App",
        duration: "30 min",
        type: "exercise",
        completed: false,
        description: "Build a simple todo application using React",
      },
    ],
  },
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const course = courseData[Number.parseInt(params.id) as keyof typeof courseData]

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <CourseDetail course={course} />
      </main>
    </div>
  )
}
