import { ProductCard } from "@/components/product-card"
import products from "@/data/products.json"

export function FeaturedProducts() {
  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4)

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg">Handpicked products just for you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
