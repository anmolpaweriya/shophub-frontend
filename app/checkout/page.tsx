"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { CheckoutSummary } from "@/components/checkout-summary"
import { RoleGuard } from "@/components/role-guard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CheckoutPage() {
  const { state } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (state.items.length === 0) {
      router.push("/cart")
    }
  }, [state.items.length, router])

  if (state.items.length === 0) {
    return null
  }

  return (
    <RoleGuard allowedRoles={["customer"]}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Checkout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-card-foreground">Checkout</h1>
            <p className="text-muted-foreground mt-2">Complete your order</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <CheckoutSummary />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </RoleGuard>
  )
}
