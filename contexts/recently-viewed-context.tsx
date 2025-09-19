"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useRef } from "react"
import type { Product } from "./cart-context"

interface RecentlyViewedContextType {
  recentlyViewed: Product[]
  addToRecentlyViewed: (product: Product) => void
  clearRecentlyViewed: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | null>(null)

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])
  const isInitialLoadRef = useRef(false)

  // Load recently viewed from localStorage on mount
  useEffect(() => {
    const saved = localStorage?.getItem("recentlyViewed")
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading recently viewed from localStorage:", error)
      }
    }
    isInitialLoadRef.current = true
  }, [])

  // Save recently viewed to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isInitialLoadRef.current) {
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))
    }
  }, [recentlyViewed])

  const addToRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      // Remove if already exists
      const filtered = prev.filter((item) => item.id !== product.id)
      // Add to beginning and limit to 10 items
      return [product, ...filtered].slice(0, 10)
    })
  }

  const clearRecentlyViewed = () => {
    setRecentlyViewed([])
  }

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (!context) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider")
  }
  return context
}
