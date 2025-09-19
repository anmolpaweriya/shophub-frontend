"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function CartItems() {
  const { state, updateQuantity, removeFromCart } = useCart()
  const { toast } = useToast()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      })
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id)
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  return (
    <div className="space-y-4">
      {state.items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Product Image */}
              <Link href={`/products/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition-opacity"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Link
                      href={`/products/${item.id}`}
                      className="font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{item.brand}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                    <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-semibold text-card-foreground">${(item.price * item.quantity).toFixed(2)}</div>
                    {item.quantity > 1 && (
                      <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
