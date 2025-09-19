import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Link from "next/link"

export function EmptyWishlist() {
  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-card-foreground mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground">Save items you love to your wishlist and shop them later.</p>
      </div>

      <div className="space-y-4">
        <Link href="/products">
          <Button size="lg">Discover Products</Button>
        </Link>
        <div className="text-sm text-muted-foreground">
          <p>Tip: Click the heart icon on any product to add it to your wishlist</p>
        </div>
      </div>
    </div>
  )
}
