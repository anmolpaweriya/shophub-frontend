"use client"

import { useEffect } from "react"
import { useRecentlyViewed } from "@/contexts/recently-viewed-context"
import type { Product } from "@/contexts/cart-context"

interface RecentlyViewedTrackerProps {
  product: Product
}

export function RecentlyViewedTracker({ product }: RecentlyViewedTrackerProps) {
  const { addToRecentlyViewed } = useRecentlyViewed()

  useEffect(() => {
    addToRecentlyViewed(product)
  }, [product, addToRecentlyViewed])

  return null
}
