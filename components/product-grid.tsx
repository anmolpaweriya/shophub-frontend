import { ProductCard } from "@/components/product-card"
import type { Product } from "@/contexts/cart-context"

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-card-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showDiscount />
      ))}
    </div>
  )
}
