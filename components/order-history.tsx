"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

// Mock order data
const mockOrders = [
  {
    id: "ORD-ABC123456",
    date: "2024-01-15",
    status: "delivered",
    total: 159.98,
    items: [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        image: "/placeholder.svg?height=80&width=80",
        price: 79.99,
        quantity: 2,
      },
    ],
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-DEF789012",
    date: "2024-01-10",
    status: "shipped",
    total: 224.99,
    items: [
      {
        id: "2",
        name: "Smart Fitness Watch",
        image: "/placeholder.svg?height=80&width=80",
        price: 199.99,
        quantity: 1,
      },
      {
        id: "3",
        name: "Organic Cotton T-Shirt",
        image: "/placeholder.svg?height=80&width=80",
        price: 24.99,
        quantity: 1,
      },
    ],
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-GHI345678",
    date: "2024-01-05",
    status: "processing",
    total: 319.99,
    items: [
      {
        id: "5",
        name: "Ergonomic Office Chair",
        image: "/placeholder.svg?height=80&width=80",
        price: 299.99,
        quantity: 1,
      },
      {
        id: "6",
        name: "Stainless Steel Water Bottle",
        image: "/placeholder.svg?height=80&width=80",
        price: 19.99,
        quantity: 1,
      },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    case "shipped":
      return <Truck className="h-4 w-4" />
    case "processing":
      return <Package className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800"
    case "shipped":
      return "bg-blue-100 text-blue-800"
    case "processing":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function OrderHistory() {
  if (mockOrders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-card-foreground mb-2">No orders yet</h2>
        <p className="text-muted-foreground mb-6">When you place your first order, it will appear here.</p>
        <Link href="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {mockOrders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{order.id}</CardTitle>
                <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
              </div>
              <div className="text-right">
                <Badge className={`${getStatusColor(order.status)} mb-2`}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </Badge>
                <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    Buy Again
                  </Button>
                )}
                {order.trackingNumber && (
                  <Button variant="outline" size="sm">
                    Track Package
                  </Button>
                )}
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    Write Review
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
