import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import products from "@/data/products.json"

export function TrendingDeals() {
  // Get products with discounts as trending deals
  const trendingProducts = products.filter((product) => product.originalPrice && product.originalPrice > product.price)

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="destructive" className="text-sm px-3 py-1">
              Limited Time
            </Badge>
            <h2 className="text-3xl font-bold text-card-foreground">Trending Deals</h2>
          </div>
          <p className="text-muted-foreground text-lg">Don't miss out on these amazing offers</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} showDiscount />
          ))}
        </div>
      </div>
    </section>
  )
}
