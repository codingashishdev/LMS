import { supabase } from "../supabase"

export interface Enrollment {
  id: string
  user_id: string
  course_id: number
  enrolled_at: string
  progress: number
  completed: boolean
  completed_at?: string
  certificate_issued?: boolean
  last_accessed?: string
}

export interface EnrollmentWithCourse extends Enrollment {
  course_title: string
  course_image: string
  course_instructor: string
}

/**
 * Enroll a user in a course
 */
export async function enrollInCourse(courseId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // Check if already enrolled
  const { data: existingEnrollment } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single()

  if (existingEnrollment) {
    throw new Error("Already enrolled in this course")
  }

  const enrollmentData = {
    user_id: user.id,
    course_id: courseId,
    progress: 0,
    completed: false,
  }

  const { data, error } = await supabase
    .from("enrollments")
    .insert([enrollmentData])
    .select()
    .single()

  if (error) throw error
  return data as Enrollment
}

/**
 * Check if user is enrolled in a course
 */
export async function isEnrolledInCourse(courseId: number): Promise<boolean> {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single()

  if (error) return false
  return !!data
}

/**
 * Get user's enrollment for a specific course
 */
export async function getEnrollment(courseId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single()

  if (error) throw error
  return data as Enrollment
}

/**
 * Get all enrollments for current user
 */
export async function getUserEnrollments() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .order("enrolled_at", { ascending: false })

  if (error) throw error
  return data as Enrollment[]
}

/**
 * Update course progress
 */
export async function updateCourseProgress(courseId: number, progress: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const updateData: Partial<Enrollment> = {
    progress,
    last_accessed: new Date().toISOString(),
  }

  // Mark as completed if progress is 100%
  if (progress >= 100) {
    updateData.completed = true
    updateData.completed_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from("enrollments")
    .update(updateData)
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .select()
    .single()

  if (error) throw error
  return data as Enrollment
}

/**
 * Unenroll from a course
 */
export async function unenrollFromCourse(courseId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("user_id", user.id)
    .eq("course_id", courseId)

  if (error) throw error
  return true
}

/**
 * Get enrollment statistics for an instructor's course
 */
export async function getCourseEnrollmentStats(courseId: number) {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*")
    .eq("course_id", courseId)

  if (error) throw error

  const enrollments = data as Enrollment[]
  const totalEnrolled = enrollments.length
  const completed = enrollments.filter((e) => e.completed).length
  const avgProgress =
    enrollments.reduce((sum, e) => sum + e.progress, 0) / totalEnrolled || 0

  return {
    totalEnrolled,
    completed,
    inProgress: totalEnrolled - completed,
    avgProgress: Math.round(avgProgress),
    completionRate: totalEnrolled ? (completed / totalEnrolled) * 100 : 0,
  }
}

/**
 * Issue certificate for completed course
 */
export async function issueCertificate(courseId: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // Verify course is completed
  const enrollment = await getEnrollment(courseId)
  if (!enrollment.completed) {
    throw new Error("Course must be completed before issuing certificate")
  }

  const { data, error } = await supabase
    .from("enrollments")
    .update({ certificate_issued: true })
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .select()
    .single()

  if (error) throw error
  return data as Enrollment
}
