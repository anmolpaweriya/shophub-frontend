"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { EmptyCart } from "@/components/empty-cart"
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

export default function CartPage() {
  const { state } = useCart()

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
                <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-card-foreground">Shopping Cart</h1>
            {state.itemCount > 0 && (
              <p className="text-muted-foreground mt-2">
                {state.itemCount} {state.itemCount === 1 ? "item" : "items"} in your cart
              </p>
            )}
          </div>

          {state.items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <CartItems />
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </RoleGuard>
  )
}
