"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Eye, Clock, AlertCircle, Truck, CheckCircle, Package } from "lucide-react"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
  updatedAt: string
}

export default function VendorOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    let filtered = orders

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchQuery, statusFilter])

  const loadOrders = () => {
    // Load orders from localStorage or create sample data
    const savedOrders = JSON.parse(localStorage.getItem("vendor_orders") || "[]")

    if (savedOrders.length === 0) {
      // Create sample orders for demo
      const sampleOrders: Order[] = [
        {
          id: "ORD-001",
          customerName: "John Doe",
          customerEmail: "john@example.com",
          items: [
            {
              id: "1",
              name: "Wireless Headphones",
              price: 99.99,
              quantity: 1,
              image: "/placeholder.svg",
            },
          ],
          total: 99.99,
          status: "pending",
          shippingAddress: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "USA",
          },
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "ORD-002",
          customerName: "Jane Smith",
          customerEmail: "jane@example.com",
          items: [
            {
              id: "2",
              name: "Smart Watch",
              price: 299.99,
              quantity: 1,
              image: "/placeholder.svg",
            },
          ],
          total: 299.99,
          status: "shipped",
          shippingAddress: {
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90210",
            country: "USA",
          },
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ]

      localStorage.setItem("vendor_orders", JSON.stringify(sampleOrders))
      setOrders(sampleOrders)
    } else {
      setOrders(savedOrders)
    }
  }

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order,
    )
    setOrders(updatedOrders)
    localStorage.setItem("vendor_orders", JSON.stringify(updatedOrders))
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
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
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
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrderTotal = (order: Order) => {
    return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">View and manage customer orders</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <div className="text-sm text-gray-500 flex items-center">
                {filteredOrders.length} of {orders.length} orders
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage your customer orders and update their status</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredOrders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>{order.items.length} item(s)</TableCell>
                      <TableCell className="font-medium">${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - {order.id}</DialogTitle>
                                <DialogDescription>Complete order information and status management</DialogDescription>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-6">
                                  {/* Customer Info */}
                                  <div>
                                    <h3 className="font-medium mb-2">Customer Information</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <p>
                                        <strong>Name:</strong> {selectedOrder.customerName}
                                      </p>
                                      <p>
                                        <strong>Email:</strong> {selectedOrder.customerEmail}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Shipping Address */}
                                  <div>
                                    <h3 className="font-medium mb-2">Shipping Address</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <p>{selectedOrder.shippingAddress.street}</p>
                                      <p>
                                        {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                                        {selectedOrder.shippingAddress.zipCode}
                                      </p>
                                      <p>{selectedOrder.shippingAddress.country}</p>
                                    </div>
                                  </div>

                                  {/* Order Items */}
                                  <div>
                                    <h3 className="font-medium mb-2">Order Items</h3>
                                    <div className="space-y-2">
                                      {selectedOrder.items.map((item) => (
                                        <div
                                          key={item.id}
                                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                        >
                                          <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                          </div>
                                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t">
                                      <span className="font-medium">Total:</span>
                                      <span className="font-bold text-lg">${selectedOrder.total.toFixed(2)}</span>
                                    </div>
                                  </div>

                                  {/* Status Update */}
                                  <div>
                                    <h3 className="font-medium mb-2">Update Status</h3>
                                    <Select
                                      value={selectedOrder.status}
                                      onValueChange={(value) =>
                                        updateOrderStatus(selectedOrder.id, value as Order["status"])
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-500">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Orders will appear here when customers make purchases"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
