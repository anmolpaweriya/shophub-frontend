"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import type { Product } from "@/contexts/cart-context"

interface ProductReviewsProps {
  product: Product
}

// Mock review data
const mockReviews = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent product!",
    content: "Really impressed with the quality and performance. Exactly what I was looking for.",
    verified: true,
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 4,
    date: "2024-01-10",
    title: "Good value for money",
    content: "Works well and arrived quickly. Minor issues with setup but overall satisfied.",
    verified: true,
  },
  {
    id: 3,
    author: "Mike R.",
    rating: 5,
    date: "2024-01-05",
    title: "Highly recommend",
    content: "Outstanding quality and customer service. Will definitely buy again.",
    verified: false,
  },
]

export function ProductReviews({ product }: ProductReviewsProps) {
  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 60 },
    { stars: 4, count: 20, percentage: 27 },
    { stars: 3, count: 8, percentage: 11 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ]

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-card-foreground">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-card-foreground">{product.rating}</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{product.reviews} reviews</p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-2 text-sm">
                  <span className="w-8">{rating.stars}★</span>
                  <Progress value={rating.percentage} className="flex-1" />
                  <span className="w-8 text-muted-foreground">{rating.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {mockReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.author}</span>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified Purchase</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold mb-2">{review.title}</h4>
                <p className="text-muted-foreground">{review.content}</p>
              </CardContent>
            </Card>
          ))}

          <div className="text-center">
            <Button variant="outline">Load More Reviews</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
