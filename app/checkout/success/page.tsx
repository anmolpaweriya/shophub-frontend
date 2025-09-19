"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RoleGuard } from "@/components/role-guard"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CheckoutSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    setOrderNumber(randomOrderNumber)
  }, [])

  return (
    <RoleGuard allowedRoles={["customer"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-8">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-card-foreground">Order Placed Successfully!</h1>
              <p className="text-xl text-muted-foreground">
                Thank you for your purchase. Your order has been confirmed.
              </p>
              {orderNumber && (
                <p className="text-lg">
                  Order Number: <span className="font-semibold text-primary">{orderNumber}</span>
                </p>
              )}
            </div>

            {/* Order Details Card */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">What happens next?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Confirmation Email</h3>
                    <p className="text-sm text-muted-foreground">You'll receive an order confirmation email shortly</p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Order Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll prepare your items for shipment within 1-2 business days
                    </p>
                  </div>
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">Delivery</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order will be delivered within 3-5 business days
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Track Your Order
                </Button>
              </Link>
            </div>

            {/* Support Information */}
            <div className="text-center pt-8 border-t">
              <p className="text-muted-foreground">
                Need help with your order?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </RoleGuard>
  )
}
