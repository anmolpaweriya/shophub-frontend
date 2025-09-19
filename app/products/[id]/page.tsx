import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductReviews } from "@/components/product-reviews"
// import { RelatedProducts } from "@/components/related-products"
// import { RecentlyViewed } from "@/components/recently-viewed"
import { RecentlyViewedTracker } from "@/components/recently-viewed-tracker"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { notFound } from "next/navigation"
import products from "@/data/products.json"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <RecentlyViewedTracker product={product} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products?category=${product.category}`}>{product.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Product Reviews */}
        <ProductReviews product={product} />

        {/* Related Products */}
        {/* {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />} */}
      </main>

      {/* Recently Viewed */}
      {/* <RecentlyViewed /> */}

      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}
