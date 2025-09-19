"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { ProductSort } from "@/components/product-sort"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import products from "@/data/products.json"
import type { Product } from "@/contexts/cart-context"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    priceRange: [0, 1000],
    brands: [] as string[],
    rating: 0,
    inStock: false,
  })
  const [sortBy, setSortBy] = useState("popularity")

  useEffect(() => {
    let filtered = [...products]

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) => filters.brands.includes(product.brand))
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => product.rating >= filters.rating)
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // For demo purposes, sort by id (assuming higher id = newer)
        filtered.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      default:
        // popularity - sort by reviews count
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredProducts(filtered)
  }, [filters, sortBy])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
  }

  return (
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
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
            {filters.category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{filters.category}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">
              {filters.category ? `${filters.category} Products` : "All Products"}
            </h1>
            <p className="text-muted-foreground mt-2">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ProductSort sortBy={sortBy} onSortChange={handleSortChange} />
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <ProductFilters filters={filters} onFilterChange={handleFilterChange} products={products} />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
