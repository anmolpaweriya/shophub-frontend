import { ProductCard } from "@/components/product-card"
import { useRecentlyViewed } from "@/contexts/recently-viewed-context"

export function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed()

  if (recentlyViewed.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-card-foreground">Recently Viewed</h2>
          <p className="text-muted-foreground mt-2">Products you've looked at recently</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewed.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} showDiscount />
          ))}
        </div>
      </div>
    </section>
  )
}
