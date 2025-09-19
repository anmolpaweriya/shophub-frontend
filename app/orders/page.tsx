"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { OrderHistory } from "@/components/order-history"
import { RoleGuard } from "@/components/role-guard"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function OrdersPage() {
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
                <BreadcrumbPage>Order History</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-card-foreground">Order History</h1>
            <p className="text-muted-foreground mt-2">Track and manage your orders</p>
          </div>

          <OrderHistory />
        </main>
        <Footer />
      </div>
    </RoleGuard>
  )
}
