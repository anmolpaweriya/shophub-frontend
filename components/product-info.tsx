"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import type { Product } from "@/contexts/cart-context"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }

    toast({
      title: "Added to Cart",
      description: `${quantity} ${product.name}${quantity > 1 ? "s" : ""} added to your cart.`,
    })
  }

  const handleWishlistToggle = () => {
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

  return (
    <div className="space-y-6">
      {/* Product Title and Brand */}
      <div>
        <p className="text-muted-foreground mb-2">{product.brand}</p>
        <h1 className="text-3xl font-bold text-card-foreground mb-4">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-card-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              <Badge variant="destructive">-{discountPercentage}%</Badge>
            </>
          )}
        </div>
        {product.originalPrice && product.originalPrice > product.price && (
          <p className="text-sm text-muted-foreground">
            You save ${(product.originalPrice - product.price).toFixed(2)}
          </p>
        )}
      </div>

      {/* Stock Status */}
      <div>
        {product.inStock ? (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            In Stock
          </Badge>
        ) : (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-muted-foreground">{product.description}</p>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-semibold mb-2">Key Features</h3>
        <ul className="space-y-1">
          {product.features.map((feature, index) => (
            <li key={index} className="text-muted-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      {/* Quantity and Actions */}
      <div className="space-y-4">
        {/* Quantity Selector */}
        <div className="flex items-center gap-4">
          <label className="font-semibold">Quantity:</label>
          <div className="flex items-center border border-border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
            <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} disabled={!product.inStock}>
              +
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
            <ShoppingCart className="h-5 w-5 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button variant="outline" size="lg" onClick={handleWishlistToggle}>
            <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>

        {product.inStock && (
          <Button variant="secondary" size="lg" className="w-full">
            Buy Now
          </Button>
        )}
      </div>

      {/* Shipping & Returns */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Free Shipping</p>
              <p className="text-sm text-muted-foreground">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">30-Day Returns</p>
              <p className="text-sm text-muted-foreground">Easy returns & exchanges</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Warranty</p>
              <p className="text-sm text-muted-foreground">1-year manufacturer warranty</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
