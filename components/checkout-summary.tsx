"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"

export function CheckoutSummary() {
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
        {/* Order Items */}
        <div className="space-y-3">
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
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                  <span className="font-medium text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Totals */}
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

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground text-center pt-4">
          <p>🔒 Your payment information is secure and encrypted</p>
        </div>
      </CardContent>
    </Card>
  )
}
