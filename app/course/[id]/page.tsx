import { CourseDetail } from "@/components/course-detail"
import { courses } from "@/lib/data/courses"
import { notFound } from "next/navigation"
// Header now handled globally by HeaderRouter
// import { DashboardHeader } from "@/components/dashboard-header"

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
        type: "video" as const,
        completed: true,
        description: "Introduction to React and its core concepts",
        content: "React is a JavaScript library for building user interfaces. Learn the fundamental concepts of React and why it has become so popular for front-end development.",
      },
      {
        id: 2,
        title: "Setting up Your Development Environment",
        duration: "15 min",
        type: "video" as const,
        completed: true,
        description: "Install Node.js, npm, and create your first React app",
        content: "Learn how to set up your development environment for React development including Node.js, npm, and Create React App.",
      },
      {
        id: 3,
        title: "Understanding JSX",
        duration: "18 min",
        type: "video" as const,
        completed: true,
        description: "Learn JSX syntax and how to write React components",
        content: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files.",
      },
      {
        id: 4,
        title: "Components and Props",
        duration: "22 min",
        type: "video" as const,
        completed: false,
        description: "Create reusable components and pass data with props",
        content: "Learn how to create reusable components and pass data between components using props.",
      },
      {
        id: 5,
        title: "State and Event Handling",
        duration: "25 min",
        type: "video" as const,
        completed: false,
        description: "Manage component state and handle user interactions",
        content: "Learn how to manage component state and handle user interactions in React applications.",
      },
      {
        id: 6,
        title: "Practice Exercise: Todo App",
        duration: "30 min",
        type: "exercise" as const,
        completed: false,
        description: "Build a simple todo application using React",
        content: "Apply what you've learned by building a simple todo application using React components, state, and event handling.",
      },
    ],
  },
  2: {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts, patterns, and modern ES6+ features",
    image: "/javascript-course-thumbnail.png",
    instructor: "Mike Chen",
    duration: "18 hours",
    level: "Advanced",
    rating: 4.9,
    students: 890,
    enrolled: true,
    progress: 30,
    lessons: [
      {
        id: 101,
        title: "ES6+ Features and Modern Syntax",
        duration: "25 min",
        type: "video" as const,
        completed: true,
        description: "Explore arrow functions, destructuring, template literals, and more",
        content: "Learn modern JavaScript features including arrow functions, destructuring, template literals, and other ES6+ syntax improvements.",
      },
      {
        id: 102,
        title: "Advanced Functions and Closures",
        duration: "30 min",
        type: "video" as const,
        completed: true,
        description: "Deep dive into closures, higher-order functions, and functional programming",
        content: "Explore advanced function concepts including closures, higher-order functions, and functional programming patterns in JavaScript.",
      },
      {
        id: 103,
        title: "Asynchronous JavaScript Mastery",
        duration: "35 min",
        type: "video" as const,
        completed: false,
        description: "Master promises, async/await, and advanced asynchronous patterns",
        content: "Master asynchronous JavaScript with promises, async/await, and advanced patterns for handling asynchronous operations.",
      },
      {
        id: 104,
        title: "Object-Oriented JavaScript and Prototypes",
        duration: "28 min",
        type: "video" as const,
        completed: false,
        description: "Understand prototypal inheritance, classes, and object creation patterns",
        content: "Learn about JavaScript's prototypal inheritance, ES6 classes, and various object creation patterns.",
      },
      {
        id: 105,
        title: "Advanced Array and Object Methods",
        duration: "22 min",
        type: "video" as const,
        completed: false,
        description: "Master map, reduce, filter, and advanced data manipulation techniques",
        content: "Master advanced array methods like map, reduce, filter, and other powerful techniques for data manipulation in JavaScript.",
      },
      {
        id: 106,
        title: "JavaScript Modules and Module Patterns",
        duration: "26 min",
        type: "video" as const,
        completed: false,
        description: "Learn ES6 modules, CommonJS, and modern bundling strategies",
        content: "Learn about JavaScript module systems including ES6 modules, CommonJS, and modern bundling strategies for organizing code.",
      },
      {
        id: 107,
        title: "Performance Optimization and Best Practices",
        duration: "24 min",
        type: "video" as const,
        completed: false,
        description: "Optimize JavaScript performance and follow industry best practices",
        content: "Learn JavaScript performance optimization techniques and industry best practices for writing efficient, maintainable code.",
      },
      {
        id: 108,
        title: "Practice Project: Advanced Todo Manager",
        duration: "45 min",
        type: "exercise" as const,
        completed: false,
        description: "Build a complex todo application using advanced JavaScript patterns",
        content: "Apply advanced JavaScript concepts by building a sophisticated todo manager with modern patterns and best practices.",
      },
    ],
  },
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  // First check if it's a course from our data file
  const catalogCourse = courses.find((c) => c.id === Number.parseInt(id))
  
  if (catalogCourse) {
    // Convert catalog course to detail format
    const detailedCourse = {
      id: catalogCourse.id,
      title: catalogCourse.title,
      description: catalogCourse.description,
      image: catalogCourse.image,
      instructor: catalogCourse.instructor,
      duration: catalogCourse.duration,
      level: catalogCourse.level,
      rating: catalogCourse.rating,
      students: catalogCourse.students,
      enrolled: false, // TODO: Check enrollment status from auth
      progress: 0,
      lessons: [
        {
          id: 1,
          title: `Introduction to ${catalogCourse.title}`,
          duration: "15 min",
          type: "video" as const,
          completed: false,
          description: `Get started with ${catalogCourse.title}`,
          content: catalogCourse.description,
        },
      ] as Array<{
        id: number
        title: string
        duration: string
        type: "video" | "exercise"
        completed: boolean
        description: string
        content: string
      }>,
    }
    
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <CourseDetail course={detailedCourse} />
        </main>
      </div>
    )
  }
  
  // Fall back to hardcoded data for specific course IDs
  const course = courseData[Number.parseInt(id) as keyof typeof courseData]

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <DashboardHeader /> */}
      <main className="container mx-auto px-4 py-8">
        <CourseDetail course={course} />
      </main>
    </div>
  )
}
