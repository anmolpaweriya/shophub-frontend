"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "/diverse-products-still-life.png",
  })

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Books",
    "Toys & Games",
    "Health & Beauty",
    "Automotive",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (Number.parseFloat(formData.price) <= 0) {
      setError("Price must be greater than 0")
      setIsLoading(false)
      return
    }

    if (Number.parseInt(formData.stock) < 0) {
      setError("Stock cannot be negative")
      setIsLoading(false)
      return
    }

    try {
      // Create new product
      const newProduct = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        category: formData.category,
        stock: Number.parseInt(formData.stock),
        status: "active" as const,
        image: formData.image,
        createdAt: new Date().toISOString(),
        vendorId: user?.id,
      }

      // Save to localStorage
      const existingProducts = JSON.parse(localStorage.getItem("vendor_products") || "[]")
      existingProducts.push(newProduct)
      localStorage.setItem("vendor_products", JSON.stringify(existingProducts))

      // Also add to main products list for customers to see
      const allProducts = JSON.parse(localStorage.getItem("products") || "[]")
      allProducts.push(newProduct)
      localStorage.setItem("products", JSON.stringify(allProducts))

      router.push("/vendor/products")
    } catch (err) {
      setError("Failed to create product. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/vendor/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Create a new product listing for your store</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Fill in the information below to create your product listing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock Quantity *</Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your product..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Product Image</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-500">Image upload coming soon. Using placeholder for now.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button type="button" variant="outline" asChild>
                  <Link href="/vendor/products">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
