"use client"

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { auth, db, supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  isSigningIn: boolean
  isSigningOut: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check for existing demo session
    const existingSession = localStorage.getItem('demo-auth-session')
    if (existingSession) {
      try {
        const session = JSON.parse(existingSession)
        if (session.expires_at && new Date().getTime() < session.expires_at) {
          setUser(session.user)
          setLoading(false)
          return
        } else {
          localStorage.removeItem('demo-auth-session')
        }
      } catch (error) {
        localStorage.removeItem('demo-auth-session')
      }
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Error getting initial session:', error)
        // Continue without error for demo mode
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)

        // Create user profile on sign up (only if Supabase is properly configured)
        if (event === 'SIGNED_IN' && session?.user && session.user.id !== 'demo-user-123') {
          try {
            const { error } = await db.createUser({
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0]
            })
            if (error && !error.message.includes('duplicate key')) {
              console.error('Error creating user profile:', error)
            }
          } catch (err) {
            console.error('Error creating user profile:', err)
            // Continue without error for demo mode
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = useCallback(async (email: string, password: string, name?: string) => {
    setIsSigningIn(true)
    try {
      // For demo purposes, allow demo email registration (but suggest using demo login instead)
      if (email === 'demo@example.com') {
        toast({
          title: "Demo account exists",
          description: "Please use the demo login instead of registering.",
          variant: "default",
        })
        return { error: { message: "Demo account already exists. Please use demo login." } }
      }

      const { error } = await auth.signUp(email, password, name)
      return { error }
    } finally {
      setIsSigningIn(false)
    }
  }, [toast])

  const signIn = useCallback(async (email: string, password: string) => {
    setIsSigningIn(true)
    try {
      // Check for demo credentials first - don't call Supabase
      if (email === 'demo@example.com' && password === 'demo123') {
        const demoUser = {
          id: 'demo-user-123',
          email: 'demo@example.com',
          user_metadata: { name: 'Demo User' },
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          role: 'authenticated',
          updated_at: new Date().toISOString()
        } as User

        // Save demo session to localStorage
        const demoSession = {
          user: demoUser,
          expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }
        localStorage.setItem('demo-auth-session', JSON.stringify(demoSession))
        
        // Set user immediately for demo
        setUser(demoUser)
        
        toast({
          title: "Demo login successful",
          description: "Welcome to the demo! Explore all features.",
          variant: "default",
        })

        return { error: null }
      }

      // For non-demo credentials, use Supabase
      const { error } = await auth.signIn(email, password)
      return { error }
    } finally {
      setIsSigningIn(false)
    }
  }, [toast])

  const signOut = useCallback(async () => {
    if (isSigningOut) return
    try {
      setIsSigningOut(true)
      
      // Clear demo session if it exists
      localStorage.removeItem('demo-auth-session')
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Explicitly clear local user state to avoid redirect loops (especially for demo sessions)
      setUser(null)
      
      router.push('/login')
      toast({
        title: "Signed out successfully",
        variant: "default",
      })
    } catch (error: any) {
      console.error('Sign out error:', error)
      // Even if Supabase fails, clear local state and redirect
      setUser(null)
      router.push('/login')
      toast({
        title: "Signed out",
        description: "You have been signed out.",
        variant: "default",
      })
    } finally {
      setIsSigningOut(false)
    }
  }, [router, toast, isSigningOut])

  const value = useMemo(() => ({
    user,
    loading,
    isSigningIn,
    isSigningOut,
    signUp,
    signIn,
    signOut
  }), [user, loading, isSigningIn, isSigningOut, signUp, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

