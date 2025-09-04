import { LessonViewer } from "@/components/lesson-viewer"
// Header now handled globally by HeaderRouter
// import { DashboardHeader } from "@/components/dashboard-header"

// Mock lesson data
const lessonData = {
  1: {
    id: 1,
    title: "What is React?",
    duration: "12 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Welcome to React!</h2>
      <p>React is a JavaScript library for building user interfaces. It was created by Facebook and is now maintained by Meta and the open-source community.</p>
      
      <h3>Key Features of React:</h3>
      <ul>
        <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state</li>
        <li><strong>Declarative:</strong> React makes it painless to create interactive UIs</li>
        <li><strong>Learn Once, Write Anywhere:</strong> You can develop new features without rewriting existing code</li>
      </ul>
      
      <h3>Why Use React?</h3>
      <p>React allows developers to create large web applications that can change data, without reloading the page. The main purpose of React is to be fast, scalable, and simple.</p>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 2,
    prevLesson: null,
    completed: true,
  },
  2: {
    id: 2,
    title: "Setting up Your Development Environment",
    duration: "15 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>Development Environment Setup</h2>
      <p>Before we start building React applications, we need to set up our development environment.</p>
      
      <h3>Prerequisites:</h3>
      <ol>
        <li>Install Node.js (version 14 or higher)</li>
        <li>Install a code editor (VS Code recommended)</li>
        <li>Basic knowledge of HTML, CSS, and JavaScript</li>
      </ol>
      
      <h3>Creating Your First React App:</h3>
      <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
      
      <p>This will create a new React application and start the development server.</p>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 3,
    prevLesson: 1,
    completed: true,
  },
  4: {
    id: 4,
    title: "Components and Props",
    duration: "22 min",
    type: "video" as const,
    videoUrl: "/placeholder-video.mp4",
    content: `
      <h2>React Components and Props</h2>
      <p>Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.</p>
      
      <h3>Function Components:</h3>
      <pre><code>function Welcome(props) {
  return &lt;h1&gt;Hello, {props.name}!&lt;/h1&gt;;
}</code></pre>
      
      <h3>Props (Properties):</h3>
      <p>Props are how you pass data from parent components to child components. They are read-only and help make components reusable.</p>
      
      <h3>Example Usage:</h3>
      <pre><code>&lt;Welcome name="Sarah" /&gt;
&lt;Welcome name="Mike" /&gt;</code></pre>
    `,
    courseId: 1,
    courseTitle: "Introduction to React",
    nextLesson: 5,
    prevLesson: 3,
    completed: false,
  },
}

export default function LessonPage({
  params,
}: {
  params: { id: string; lessonId: string }
}) {
  const lesson = lessonData[Number.parseInt(params.lessonId) as keyof typeof lessonData]

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header rendered by layout */}
      {/* <DashboardHeader /> */}
      <LessonViewer lesson={lesson} />
    </div>
  )
}
