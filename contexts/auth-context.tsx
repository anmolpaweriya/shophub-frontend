"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

export type UserRole = "customer" | "vendor"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Get users from localStorage or create demo users
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Add demo users if none exist
    if (users.length === 0) {
      const demoUsers = [
        {
          id: "1",
          email: "vendor@demo.com",
          password: "password",
          name: "Demo Vendor",
          role: "vendor" as UserRole,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          email: "customer@demo.com",
          password: "password",
          name: "Demo Customer",
          role: "customer" as UserRole,
          createdAt: new Date().toISOString(),
        },
      ]
      localStorage.setItem("users", JSON.stringify(demoUsers))
      users.push(...demoUsers)
    }

    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return { success: true }
    } else {
      setIsLoading(false)
      return { success: false, error: "Invalid email or password" }
    }
  }, [])

  const signup = useCallback(async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      setIsLoading(false)
      return { success: false, error: "User with this email already exists" }
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))

    setIsLoading(false)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
