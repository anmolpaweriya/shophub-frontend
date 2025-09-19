"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { EmptyWishlist } from "@/components/empty-wishlist"
import { RoleGuard } from "@/components/role-guard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useWishlist } from "@/contexts/wishlist-context"

export default function WishlistPage() {
  const { wishlist } = useWishlist()

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
                <BreadcrumbPage>Wishlist</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-card-foreground">My Wishlist</h1>
            {wishlist.length > 0 && (
              <p className="text-muted-foreground mt-2">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
              </p>
            )}
          </div>

          {wishlist.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} showDiscount />
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </RoleGuard>
  )
}
