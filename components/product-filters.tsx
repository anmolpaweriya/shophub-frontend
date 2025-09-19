"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import type { Product } from "@/contexts/cart-context"

interface ProductFiltersProps {
  filters: {
    category: string
    priceRange: number[]
    brands: string[]
    rating: number
    inStock: boolean
  }
  onFilterChange: (filters: any) => void
  products: Product[]
}

export function ProductFilters({ filters, onFilterChange, products }: ProductFiltersProps) {
  // Get unique categories and brands from products
  const categories = [...new Set(products.map((p) => p.category))]
  const brands = [...new Set(products.map((p) => p.brand))]

  const handleCategoryChange = (category: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === category ? "" : category,
    })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)

    onFilterChange({
      ...filters,
      brands: newBrands,
    })
  }

  const handlePriceRangeChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      priceRange: value,
    })
  }

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating,
    })
  }

  const handleStockChange = (checked: boolean) => {
    onFilterChange({
      ...filters,
      inStock: checked,
    })
  }

  const clearFilters = () => {
    onFilterChange({
      category: "",
      priceRange: [0, 1000],
      brands: [],
      rating: 0,
      inStock: false,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.category === category}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm font-normal cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Minimum Rating</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={() => handleRatingChange(rating)}
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm font-normal cursor-pointer flex items-center gap-1"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span>& up</span>
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" checked={filters.inStock} onCheckedChange={handleStockChange} />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
              In Stock Only
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
