"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [productFound, setProductFound] = useState(true)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    status: "active",
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

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = () => {
    const products = JSON.parse(localStorage.getItem("vendor_products") || "[]")
    const product = products.find((p: any) => p.id === params.id)

    if (product) {
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        image: product.image,
        status: product.status,
      })
    } else {
      setProductFound(false)
    }
  }

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
      // Update vendor products
      const vendorProducts = JSON.parse(localStorage.getItem("vendor_products") || "[]")
      const updatedVendorProducts = vendorProducts.map((p: any) =>
        p.id === params.id
          ? {
              ...p,
              name: formData.name,
              description: formData.description,
              price: Number.parseFloat(formData.price),
              category: formData.category,
              stock: Number.parseInt(formData.stock),
              status: formData.status,
            }
          : p,
      )
      localStorage.setItem("vendor_products", JSON.stringify(updatedVendorProducts))

      // Update main products list
      const allProducts = JSON.parse(localStorage.getItem("products") || "[]")
      const updatedAllProducts = allProducts.map((p: any) =>
        p.id === params.id
          ? {
              ...p,
              name: formData.name,
              description: formData.description,
              price: Number.parseFloat(formData.price),
              category: formData.category,
              stock: Number.parseInt(formData.stock),
              status: formData.status,
            }
          : p,
      )
      localStorage.setItem("products", JSON.stringify(updatedAllProducts))

      router.push("/vendor/products")
    } catch (err) {
      setError("Failed to update product. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!productFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/vendor/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-2">Update your product information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Update the information below to modify your product listing</CardDescription>
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

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <p className="text-sm text-gray-500">Image upload coming soon. Using current image.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button type="button" variant="outline" asChild>
                  <Link href="/vendor/products">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
