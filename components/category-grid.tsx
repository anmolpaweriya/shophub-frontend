import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Electronics",
    image: "/electronics-category.png",
    count: "1,234 items",
    link: "/products?category=Electronics",
  },
  {
    name: "Clothing",
    image: "/diverse-clothing-category.png",
    count: "856 items",
    link: "/products?category=Clothing",
  },
  {
    name: "Furniture",
    image: "/furniture-category.png",
    count: "432 items",
    link: "/products?category=Furniture",
  },
  {
    name: "Sports",
    image: "/sports-collage.png",
    count: "678 items",
    link: "/products?category=Sports",
  },
  {
    name: "Food",
    image: "/diverse-food-categories.png",
    count: "234 items",
    link: "/products?category=Food",
  },
  {
    name: "Books",
    image: "/books-category.png",
    count: "567 items",
    link: "/products?category=Books",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-card-foreground mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg">Discover products across all categories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.link}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
