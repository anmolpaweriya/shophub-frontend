import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { RecentlyViewedProvider } from "@/contexts/recently-viewed-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ShopHub - Your Ultimate Shopping Destination",
  description: "Discover amazing products at unbeatable prices. Shop electronics, clothing, furniture and more.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <RecentlyViewedProvider>
                  {children}
                  <Toaster />
                </RecentlyViewedProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
