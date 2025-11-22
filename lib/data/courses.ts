export type Course = {
  id: number
  slug: string
  title: string
  description: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  rating: number
  students: number
  lessons: number
  image: string
  instructor: string
  instructorId?: string
  price: number
  originalPrice: number
  tags: string[]
  language: string
  updatedAt: string
  featured?: boolean
  isPublished?: boolean
  prerequisites?: number[] // Course IDs that must be completed first
  completionCertificate?: boolean
  totalReviews?: number
  averageCompletionTime?: string
  skillLevel?: string[]
  objectives?: string[]
}

export const courses: Course[] = [
  {
    id: 101,
    slug: "complete-react-developer",
    title: "Complete React Developer",
    description: "Build production-ready React applications with hooks, context, and modern tooling.",
    category: "Web Development",
    level: "Intermediate",
    duration: "24 hours",
    rating: 4.9,
    students: 18230,
    lessons: 96,
    image: "/react-course-thumbnail.png",
    instructor: "Sarah Johnson",
    price: 129,
    originalPrice: 189,
    tags: ["react", "frontend", "hooks"],
    language: "English",
    updatedAt: "2024-11-01",
    featured: true,
    isPublished: true,
    completionCertificate: true,
    totalReviews: 3250,
    averageCompletionTime: "6 weeks",
    skillLevel: ["JavaScript", "HTML", "CSS"],
    objectives: [
      "Build modern React applications from scratch",
      "Master React Hooks and Context API",
      "Implement state management patterns",
      "Create reusable component libraries"
    ]
  },
  {
    id: 102,
    slug: "advanced-javascript-patterns",
    title: "Advanced JavaScript Patterns",
    description: "Master modern JavaScript concepts, performance patterns, and architecture decisions.",
    category: "Web Development",
    level: "Advanced",
    duration: "18 hours",
    rating: 4.8,
    students: 14210,
    lessons: 74,
    image: "/javascript-advanced-course-thumbnail.png",
    instructor: "Mike Chen",
    price: 119,
    originalPrice: 179,
    tags: ["javascript", "performance", "architecture"],
    language: "English",
    updatedAt: "2024-10-15",
    featured: true,
    isPublished: true,
    completionCertificate: true,
    totalReviews: 2840,
    averageCompletionTime: "5 weeks",
    objectives: [
      "Master advanced JavaScript patterns",
      "Optimize code performance",
      "Design scalable architecture",
      "Implement design patterns"
    ]
  },
  {
    id: 103,
    slug: "ui-ux-design-masterclass",
    title: "UI/UX Design Masterclass",
    description: "Create delightful user experiences with research-driven design systems.",
    category: "UI/UX Design",
    level: "Intermediate",
    duration: "16 hours",
    rating: 4.7,
    students: 12650,
    lessons: 64,
    image: "/ui-ux-design-course-thumbnail.png",
    instructor: "Emily Davis",
    price: 109,
    originalPrice: 169,
    tags: ["design", "figma", "research"],
    language: "English",
    updatedAt: "2024-09-10",
    featured: true,
    isPublished: true,
    completionCertificate: true,
    totalReviews: 2130,
    averageCompletionTime: "4 weeks",
    objectives: [
      "Conduct user research and testing",
      "Create design systems",
      "Master Figma and design tools",
      "Build accessible interfaces"
    ]
  },
  {
    id: 104,
    slug: "node-api-architecture",
    title: "Scalable Node.js APIs",
    description: "Design resilient Node.js backends with testing, observability, and deployment playbooks.",
    category: "Web Development",
    level: "Intermediate",
    duration: "20 hours",
    rating: 4.6,
    students: 9320,
    lessons: 58,
    image: "/nodejs-course-thumbnail.png",
    instructor: "Alex Rodriguez",
    price: 129,
    originalPrice: 189,
    tags: ["node", "api", "backend"],
    language: "English",
    updatedAt: "2024-07-20",
    isPublished: true,
    completionCertificate: true,
    totalReviews: 1820,
    averageCompletionTime: "5 weeks",
    prerequisites: [101], // Requires Complete React Developer
    objectives: [
      "Build RESTful and GraphQL APIs",
      "Implement authentication and authorization",
      "Design database schemas",
      "Deploy production-ready applications"
    ]
  },
  {
    id: 105,
    slug: "python-data-science",
    title: "Python for Data Science",
    description: "Analyze data with pandas, build visualizations, and ship ML prototypes.",
    category: "Data Science",
    level: "Beginner",
    duration: "22 hours",
    rating: 4.8,
    students: 20450,
    lessons: 72,
    image: "/python-data-science-course-thumbnail.png",
    instructor: "Dr. Priya Patel",
    price: 99,
    originalPrice: 149,
    tags: ["python", "analytics", "ml"],
    language: "English",
    updatedAt: "2024-12-05",
    isPublished: true,
    completionCertificate: true,
    totalReviews: 4120,
    averageCompletionTime: "6 weeks",
    objectives: [
      "Master Python for data analysis",
      "Work with pandas and NumPy",
      "Create data visualizations",
      "Build machine learning models"
    ]
  },
  {
    id: 106,
    slug: "ml-foundations",
    title: "Machine Learning Foundations",
    description: "Understand algorithms, evaluation, and deployment patterns for modern ML workloads.",
    category: "Machine Learning",
    level: "Intermediate",
    duration: "28 hours",
    rating: 4.9,
    students: 15780,
    lessons: 88,
    image: "/ai-machine-learning-course-thumbnail.jpg",
    instructor: "Dr. Amir Rahman",
    price: 149,
    originalPrice: 219,
    tags: ["ml", "ai", "python"],
    language: "English",
    updatedAt: "2025-01-18",
    isPublished: true,
    completionCertificate: true,
    totalReviews: 3080,
    averageCompletionTime: "8 weeks",
    prerequisites: [105], // Requires Python for Data Science
    objectives: [
      "Understand ML algorithms",
      "Implement classification and regression",
      "Evaluate model performance",
      "Deploy ML models to production"
    ]
  },
  {
    id: 107,
    slug: "devops-docker-kubernetes",
    title: "DevOps with Docker & Kubernetes",
    description: "Ship reliable microservices with containerization, CI/CD, and observability best practices.",
    category: "DevOps",
    level: "Advanced",
    duration: "26 hours",
    rating: 4.7,
    students: 11830,
    lessons: 76,
    image: "/devops-docker-kubernetes-course-thumbnail.jpg",
    instructor: "Grace Hopper",
    price: 139,
    originalPrice: 199,
    tags: ["devops", "kubernetes", "docker"],
    language: "English",
    updatedAt: "2024-08-08",
    isPublished: true,
    completionCertificate: true,
    totalReviews: 2350,
    averageCompletionTime: "7 weeks",
    objectives: [
      "Containerize applications with Docker",
      "Orchestrate with Kubernetes",
      "Implement CI/CD pipelines",
      "Monitor and troubleshoot systems"
    ]
  },
  {
    id: 108,
    slug: "secure-web-apps",
    title: "Cybersecurity for Web Apps",
    description: "Protect applications against OWASP threats with modern secure coding playbooks.",
    category: "Cybersecurity",
    level: "Advanced",
    duration: "18 hours",
    rating: 4.6,
    students: 8430,
    lessons: 48,
    image: "/placeholder.jpg",
    instructor: "Lena Fischer",
    price: 129,
    originalPrice: 189,
    tags: ["security", "owasp", "threat-modeling"],
    language: "English",
    updatedAt: "2024-06-12",
    isPublished: false, // Unpublished course - not accessible
    completionCertificate: true,
    totalReviews: 1520,
    averageCompletionTime: "5 weeks",
    objectives: [
      "Identify security vulnerabilities",
      "Implement secure coding practices",
      "Protect against OWASP Top 10",
      "Conduct security audits"
    ]
  },
  {
    id: 109,
    slug: "mobile-flutter-bootcamp",
    title: "Flutter Mobile Bootcamp",
    description: "Launch cross-platform mobile apps with Flutter, Firebase, and CI automation.",
    category: "Mobile Development",
    level: "Beginner",
    duration: "18 hours",
    rating: 4.5,
    students: 6780,
    lessons: 54,
    image: "/placeholder.svg",
    instructor: "Diego Morales",
    price: 89,
    originalPrice: 139,
    tags: ["flutter", "mobile", "firebase"],
    language: "English",
    updatedAt: "2024-05-22",
    isPublished: true,
    completionCertificate: true,
    totalReviews: 1280,
    averageCompletionTime: "5 weeks",
    objectives: [
      "Build cross-platform mobile apps",
      "Master Flutter framework",
      "Integrate Firebase services",
      "Publish to app stores"
    ]
  },
  {
    id: 110,
    slug: "cloud-architect-azure",
    title: "Azure Cloud Architect",
    description: "Design enterprise architectures leveraging Azure compute, storage, and networking patterns.",
    category: "DevOps",
    level: "Intermediate",
    duration: "32 hours",
    rating: 4.8,
    students: 9240,
    lessons: 90,
    image: "/placeholder-logo.png",
    instructor: "Nina Okafor",
    price: 159,
    originalPrice: 229,
    tags: ["cloud", "azure", "architecture"],
    language: "English",
    updatedAt: "2025-02-02",
    isPublished: true,
    completionCertificate: true,
    totalReviews: 1840,
    averageCompletionTime: "9 weeks",
    objectives: [
      "Design Azure cloud architectures",
      "Implement security best practices",
      "Optimize costs and performance",
      "Prepare for Azure certification"
    ]
  },
  {
    id: 111,
    slug: "data-visualization-d3",
    title: "Data Visualization with D3",
    description: "Tell compelling stories with bespoke charts, interactions, and accessibility-first techniques.",
    category: "Data Science",
    level: "Advanced",
    duration: "14 hours",
    rating: 4.5,
    students: 5620,
    lessons: 42,
    image: "/placeholder.svg",
    instructor: "Ravi Narayanan",
    price: 119,
    originalPrice: 169,
    tags: ["d3", "visualization", "accessibility"],
    language: "English",
    updatedAt: "2025-01-05",
    isPublished: false, // Unpublished course - not accessible
    completionCertificate: false,
    totalReviews: 920,
    averageCompletionTime: "4 weeks",
    prerequisites: [105], // Requires Python for Data Science
    objectives: [
      "Create interactive visualizations",
      "Master D3.js library",
      "Design accessible charts",
      "Tell data stories effectively"
    ]
  },
  {
    id: 112,
    slug: "product-management-ops",
    title: "Product Management Ops",
    description: "Operationalize discovery, delivery, and growth loops with metrics that matter.",
    category: "Product",
    level: "Intermediate",
    duration: "12 hours",
    rating: 4.4,
    students: 4320,
    lessons: 36,
    image: "/placeholder-logo.svg",
    instructor: "Hannah Lee",
    price: 99,
    originalPrice: 149,
    tags: ["product", "strategy", "ops"],
    language: "English",
    updatedAt: "2024-09-28",
    isPublished: true,
    completionCertificate: true,
    totalReviews: 850,
    averageCompletionTime: "3 weeks",
    objectives: [
      "Define product strategy",
      "Conduct user research",
      "Manage product roadmaps",
      "Measure product success"
    ]
  },
]
