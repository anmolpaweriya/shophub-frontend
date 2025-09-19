"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  sortBy: string
  onSortChange: (sort: string) => void
}

export function ProductSort({ sortBy, onSortChange }: ProductSortProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="popularity">Popularity</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="rating">Customer Rating</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
