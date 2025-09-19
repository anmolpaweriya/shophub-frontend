"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function CartSummary() {
  const { state } = useCart()

  const subtotal = state.total
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal ({state.itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Free Shipping Notice */}
        {shipping > 0 && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
          </div>
        )}

        {/* Checkout Button */}
        <Link href="/checkout" className="block">
          <Button size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </Link>

        {/* Continue Shopping */}
        <Link href="/products" className="block">
          <Button variant="outline" size="lg" className="w-full bg-transparent">
            Continue Shopping
          </Button>
        </Link>

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground text-center pt-4">
          <p>🔒 Secure checkout with SSL encryption</p>
        </div>
      </CardContent>
    </Card>
  )
}
