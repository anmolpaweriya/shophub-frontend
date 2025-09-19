import { ProductCard } from "@/components/product-card"
import type { Product } from "@/contexts/cart-context"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-card-foreground">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showDiscount />
        ))}
      </div>
    </div>
  )
}
