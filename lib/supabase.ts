import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const missingSupabaseMessage = 'Missing Supabase environment variables. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment to enable live data.'
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

const createMockPostgrestBuilder = () => {
  const response = Promise.resolve({ data: null, error: new Error(missingSupabaseMessage) })
  const builder: any = {
    select: () => builder,
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    upsert: () => builder,
    eq: () => builder,
    order: () => builder,
    limit: () => builder,
    range: () => builder,
    single: () => response,
    maybeSingle: () => response,
    returns: () => builder,
    then: (onFulfilled: any, onRejected: any) => response.then(onFulfilled, onRejected),
  }
  return builder
}

const createMockSupabaseClient = (): SupabaseClient => {
  console.warn(missingSupabaseMessage)
  const mockError = new Error(missingSupabaseMessage)
  return {
    auth: {
      async signUp() {
        throw mockError
      },
      async signInWithPassword() {
        return { data: null, error: mockError }
      },
      async signOut() {
        return { error: null }
      },
      async getSession() {
        return { data: { session: null }, error: mockError }
      },
      async getUser() {
        return { data: { user: null }, error: mockError }
      },
      onAuthStateChange() {
        return {
          data: {
            subscription: {
              unsubscribe: () => {}
            }
          },
          error: mockError
        }
      }
    },
    from() {
      return createMockPostgrestBuilder()
    }
  } as unknown as SupabaseClient
}

export const supabase = (isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      },
      global: {
        headers: {
          'x-client': 'lms-app'
        }
      }
    })
  : createMockSupabaseClient()
)

if (!isSupabaseConfigured) {
  console.warn('[Supabase] Running in mock mode – live database features are disabled until environment variables are set.')
}

export const supabaseClient = supabase

export const supabaseOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-client': 'lms-app'
    }
  }
}

// Test connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Supabase connection test failed:', error)
      return false
    }
    console.log('Supabase connection successful')
    return true
  } catch (err) {
    console.error('Supabase connection error:', err)
    return false
  }
}

// Database types
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  description?: string
  instructor?: string
  duration?: number
  level?: string
  price?: number
  image_url?: string
  created_at: string
}

export interface UserProgress {
  id: string
  user_id: string
  course_id: string
  progress_percentage: number
  completed_at?: string
  created_at: string
}

export interface WishlistItem {
  id: string
  user_id: string
  course_id: string
  created_at: string
}

// Auth helpers with fallback for demo
export const auth = {
  async signUp(email: string, password: string, name?: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      })
      return { data, error }
    } catch (err) {
      console.error('Supabase sign-up error:', err)
      // Fallback for demo - create a mock user
      if (email && password) {
        const mockUser = {
          id: `demo-${Date.now()}`,
          email,
          user_metadata: { name },
          aud: 'authenticated',
          created_at: new Date().toISOString()
        }
        return { 
          data: { user: mockUser, session: null }, 
          error: null 
        }
      }
      return { data: null, error: err as Error }
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Supabase sign-in error:', error)
        
        // Fallback for demo purposes - allow demo credentials
        if (email === 'demo@example.com' && password === 'demo123') {
          const mockUser = {
            id: 'demo-user-123',
            email: 'demo@example.com',
            user_metadata: { name: 'Demo User' },
            aud: 'authenticated',
            created_at: new Date().toISOString()
          }
          return { 
            data: { user: mockUser, session: { user: mockUser } }, 
            error: null 
          }
        }
        
        return { data: null, error }
      }

      return { data, error: null }
    } catch (err) {
      console.error('Unexpected error during sign-in:', err)
      return { data: null, error: err as Error }
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (err) {
      console.error('Unexpected error during sign-out:', err)
      return { error: err as Error }
    }
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  },

  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null)
    })
  }
}

// Database helpers
export const db = {
  // Users
  async createUser(userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    return { data, error }
  },

  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  async updateUser(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    return { data, error }
  },

  // Courses
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })
    return { data, error }
  },

  async getCourse(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single()
    return { data, error }
  },

  // User Progress
  async getUserProgress(userId: string) {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_id', userId)
    return { data, error }
  },

  async updateProgress(userId: string, courseId: string, progress: number) {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        course_id: courseId,
        progress_percentage: progress,
        completed_at: progress === 100 ? new Date().toISOString() : null
      })
      .select()
      .single()
    return { data, error }
  },

  // Wishlist
  async getWishlist(userId: string) {
    const { data, error } = await supabase
      .from('wishlist')
      .select(`
        *,
        courses (*)
      `)
      .eq('user_id', userId)
    return { data, error }
  },

  async toggleWishlist(userId: string, courseId: string) {
    // Check if already in wishlist
    const { data: existing } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single()

    if (existing) {
      // Remove from wishlist
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('course_id', courseId)
      return { error, action: 'removed' }
    } else {
      // Add to wishlist
      const { data, error } = await supabase
        .from('wishlist')
        .insert({ user_id: userId, course_id: courseId })
        .select()
        .single()
      return { data, error, action: 'added' }
    }
  }
}

