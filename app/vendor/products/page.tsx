"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface VendorProduct {
  id: string
  name: string
  price: number
  category: string
  stock: number
  status: "active" | "inactive"
  image: string
  createdAt: string
}

export default function VendorProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<VendorProduct[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<VendorProduct[]>([])

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }, [products, searchQuery])

  const loadProducts = () => {
    const savedProducts = JSON.parse(localStorage.getItem("vendor_products") || "[]")
    setProducts(savedProducts)
  }

  const deleteProduct = (productId: string) => {
    const updatedProducts = products.filter((p) => p.id !== productId)
    setProducts(updatedProducts)
    localStorage.setItem("vendor_products", JSON.stringify(updatedProducts))
  }

  const toggleProductStatus = (productId: string) => {
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, status: p.status === "active" ? ("inactive" as const) : ("active" as const) } : p,
    )
    setProducts(updatedProducts)
    localStorage.setItem("vendor_products", JSON.stringify(updatedProducts))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-gray-600 mt-2">Manage your product listings</p>
          </div>
          <Button asChild>
            <Link href="/vendor/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="text-sm text-gray-500">
                {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
            <CardDescription>View and manage all your product listings</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredProducts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">
                              Added {new Date(product.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                          {product.stock} units
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={product.status === "active" ? "default" : "secondary"}
                          className={product.status === "active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/products/${product.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/vendor/products/${product.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleProductStatus(product.id)}>
                              {product.status === "active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteProduct(product.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery ? "Try adjusting your search terms" : "Get started by adding your first product"}
                </p>
                <Button asChild>
                  <Link href="/vendor/products/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Product
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
