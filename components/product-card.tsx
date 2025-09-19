"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import type { Product } from "@/contexts/cart-context"

interface ProductCardProps {
  product: Product
  showDiscount?: boolean
}

export function ProductCard({ product, showDiscount = false }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()

    if (user?.role === "vendor") {
      toast({
        title: "Action Not Available",
        description: "Vendors cannot add items to cart. Switch to customer account to shop.",
        variant: "destructive",
      })
      return
    }

    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      })
      return
    }
    addToCart(product)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()

    if (user?.role === "vendor") {
      toast({
        title: "Action Not Available",
        description: "Vendors cannot use wishlist. Switch to customer account to save favorites.",
        variant: "destructive",
      })
      return
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const isVendor = user?.role === "vendor"

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            />

            {/* Discount Badge */}
            {showDiscount && discountPercentage > 0 && (
              <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                -{discountPercentage}%
              </Badge>
            )}

            {/* Stock Status */}
            {!product.inStock && (
              <Badge variant="secondary" className="absolute top-2 right-2">
                Out of Stock
              </Badge>
            )}

            {!isVendor && (
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground">{product.brand}</p>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-card-foreground">${product.price.toFixed(2)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {!isVendor && (
              <Button className="w-full mt-4" onClick={handleAddToCart} disabled={!product.inStock}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
