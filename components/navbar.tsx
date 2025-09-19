"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  User,
  Menu,
  LogOut,
  Store,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "@/components/cart-drawer";
import { useWishlist } from "@/contexts/wishlist-context";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { USER_ROLE, useUserData } from "@/contexts/user-context";

export function Navbar() {
  const { wishlist } = useWishlist();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUserData();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-bold text-xl">
                S
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">ShopHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-11 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex items-center justify-between mb-6">
                  <Link href="/" className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        S
                      </span>
                    </div>
                    <span className="text-xl font-bold">ShopHub</span>
                  </Link>
                </div>

                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  {user ? (
                    <>
                      <div className="pb-4 border-b">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          {user.role === USER_ROLE.VENDOR
                            ? "Vendor"
                            : "Customer"}
                        </Badge>
                      </div>

                      {user.role === USER_ROLE.VENDOR ? (
                        <>
                          <Link
                            href="/vendor/dashboard"
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted"
                          >
                            <Store className="h-5 w-5" />
                            <span>Vendor Dashboard</span>
                          </Link>
                          <Link
                            href="/vendor/products"
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted"
                          >
                            <Package className="h-5 w-5" />
                            <span>Manage Products</span>
                          </Link>
                        </>
                      ) : (
                        <Link
                          href="/orders"
                          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted"
                        >
                          <Package className="h-5 w-5" />
                          <span>My Orders</span>
                        </Link>
                      )}

                      <button
                        onClick={logout}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted text-red-600 w-full text-left"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign out</span>
                      </button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <Button asChild className="w-full">
                        <Link href="/login">Sign in</Link>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full bg-transparent"
                      >
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="hidden md:flex items-center justify-center h-10 w-10 rounded-md hover:bg-muted transition-colors"
                  >
                    <User className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <Badge variant="secondary" className="w-fit text-xs mt-1">
                        {user.role === USER_ROLE.VENDOR ? "Vendor" : "Customer"}
                      </Badge>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {user.role === USER_ROLE.VENDOR ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/vendor/dashboard"
                          className="flex items-center"
                        >
                          <Store className="mr-2 h-4 w-4" />
                          Vendor Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/vendor/products"
                          className="flex items-center"
                        >
                          <Package className="mr-2 h-4 w-4" />
                          Manage Products
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}

            {/* Wishlist - only show for customers */}
            {(!user || user.role === USER_ROLE.CUSTOMER) && (
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {wishlist.length}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Shopping Cart Drawer - only show for customers */}
            {(!user || user.role === USER_ROLE.CUSTOMER) && <CartDrawer />}
          </div>
        </div>
      </div>
    </nav>
  );
}
