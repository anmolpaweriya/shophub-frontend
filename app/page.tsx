import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { TrendingDeals } from "@/components/trending-deals"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <TrendingDeals />
      </main>
      <Footer />
    </div>
  )
}
