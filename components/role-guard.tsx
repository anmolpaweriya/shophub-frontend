"use client"

import type React from "react"

import { useAuth, type UserRole } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
  fallback?: React.ReactNode
}

export function RoleGuard({ children, allowedRoles, redirectTo = "/login", fallback }: RoleGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(redirectTo)
    } else if (!isLoading && user && !allowedRoles.includes(user.role)) {
      router.push("/")
    }
  }, [user, isLoading, allowedRoles, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      )
    )
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}
