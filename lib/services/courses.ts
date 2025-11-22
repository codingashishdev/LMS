import { supabase } from "../supabase"

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced"
export type CourseStatus = "Draft" | "Published" | "Archived"

export interface Course {
  id: string
  slug?: string
  title: string
  description?: string
  category?: string
  level: CourseLevel
  duration?: string
  rating: number
  students: number
  lessons: number
  image_url?: string
  instructor_id: string
  instructor_name?: string
  price: number
  original_price?: number
  tags?: string[]
  language: string
  status: CourseStatus
  featured: boolean
  created_at: string
  updated_at: string
}

export interface CreateCourseData {
  title: string
  description?: string
  category?: string
  level: CourseLevel
  duration?: string
  price: number
  original_price?: number
  tags?: string[]
  language?: string
  image_url?: string
}

export interface UpdateCourseData extends Partial<CreateCourseData> {
  status?: CourseStatus
  featured?: boolean
  rating?: number
  students?: number
  lessons?: number
}

/**
 * Create a new course
 */
export async function createCourse(data: CreateCourseData) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const courseData = {
    ...data,
    instructor_id: user.id,
    status: "Draft" as CourseStatus,
    rating: 0,
    students: 0,
    lessons: 0,
    featured: false,
    language: data.language || "English",
  }

  const { data: course, error } = await supabase
    .from("courses")
    .insert([courseData])
    .select()
    .single()

  if (error) throw error
  return course as Course
}

/**
 * Get all courses for the current instructor
 */
export async function getInstructorCourses() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("instructor_id", user.id)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Course[]
}

/**
 * Get a single course by ID
 */
export async function getCourseById(id: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single()

  if (error) throw error
  return data as Course
}

/**
 * Get a single course by slug
 */
export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) throw error
  return data as Course
}

/**
 * Update a course
 */
export async function updateCourse(id: string, data: UpdateCourseData) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // Verify the course belongs to the user
  const course = await getCourseById(id)
  if (course.instructor_id !== user.id) {
    throw new Error("Unauthorized to update this course")
  }

  const { data: updatedCourse, error } = await supabase
    .from("courses")
    .update(data)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return updatedCourse as Course
}

/**
 * Delete a course
 */
export async function deleteCourse(id: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // Verify the course belongs to the user
  const course = await getCourseById(id)
  if (course.instructor_id !== user.id) {
    throw new Error("Unauthorized to delete this course")
  }

  const { error } = await supabase.from("courses").delete().eq("id", id)

  if (error) throw error
  return true
}

/**
 * Publish a course (change status from Draft to Published)
 */
export async function publishCourse(id: string) {
  return updateCourse(id, { status: "Published" })
}

/**
 * Unpublish a course (change status from Published to Draft)
 */
export async function unpublishCourse(id: string) {
  return updateCourse(id, { status: "Draft" })
}

/**
 * Archive a course
 */
export async function archiveCourse(id: string) {
  return updateCourse(id, { status: "Archived" })
}

/**
 * Get all published courses (public)
 */
export async function getPublishedCourses(options?: {
  category?: string
  level?: CourseLevel
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from("courses")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false })

  if (options?.category) {
    query = query.eq("category", options.category)
  }

  if (options?.level) {
    query = query.eq("level", options.level)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Course[]
}

/**
 * Get featured courses
 */
export async function getFeaturedCourses(limit = 6) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "Published")
    .eq("featured", true)
    .order("rating", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as Course[]
}

/**
 * Search courses by title or description
 */
export async function searchCourses(searchTerm: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "Published")
    .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .order("rating", { ascending: false })

  if (error) throw error
  return data as Course[]
}
