"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, DollarSign, Eye, Plus, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
}

interface Order {
  id: string
  customerName: string
  items: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  date: string
}

export default function VendorDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "vendor") {
      router.push("/")
      return
    }

    // Load dashboard data
    loadDashboardData()
  }, [user, router])

  const loadDashboardData = () => {
    // Get vendor products
    const products = JSON.parse(localStorage.getItem("vendor_products") || "[]")
    const orders = JSON.parse(localStorage.getItem("vendor_orders") || "[]")

    // Calculate stats
    const totalRevenue = orders.reduce((sum: number, order: Order) => sum + order.total, 0)
    const pendingOrders = orders.filter((order: Order) => order.status === "pending").length

    setStats({
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
    })

    // Set recent orders (last 5)
    setRecentOrders(orders.slice(-5).reverse())
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <AlertCircle className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!user || user.role !== "vendor") {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}! Here's your business overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Gross revenue</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your store efficiently</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/vendor/products/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/vendor/products">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Products
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start bg-transparent">
                <Link href="/vendor/orders">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Manage Orders
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-gray-500">{order.items} items</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <Badge className={`text-xs ${getStatusColor(order.status)}`}>{order.status}</Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/vendor/orders">View All Orders</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                  <p className="text-sm text-gray-400">Orders will appear here once customers start buying</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
