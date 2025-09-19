import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-card-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
      </div>

      <div className="space-y-4">
        <Link href="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
        <div className="text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
