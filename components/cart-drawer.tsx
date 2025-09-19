"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function CartDrawer() {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({state.itemCount})</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="py-4 space-y-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Link href="/cart" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Cart
                    </Button>
                  </Link>
                  <Link href="/checkout" className="block">
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
