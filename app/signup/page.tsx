"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth, type UserRole } from "@/contexts/auth-context"
import { Loader2, ShoppingBag, Store, User } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<UserRole>("customer")
  const [error, setError] = useState("")
  const { signup, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    const result = await signup(email, password, name, role)
    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || "Signup failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <ShoppingBag className="h-12 w-12 text-cyan-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-cyan-600 hover:text-cyan-500">
              Sign in
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Join our marketplace</CardTitle>
            <CardDescription>Choose your account type and get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Create a password (min. 6 characters)"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Account Type</Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)} className="mt-2">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="customer" id="customer" />
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blue-600" />
                        <div>
                          <Label htmlFor="customer" className="font-medium cursor-pointer">
                            Customer
                          </Label>
                          <p className="text-sm text-gray-500">Browse and purchase products</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="vendor" id="vendor" />
                      <div className="flex items-center space-x-2">
                        <Store className="h-4 w-4 text-green-600" />
                        <div>
                          <Label htmlFor="vendor" className="font-medium cursor-pointer">
                            Vendor
                          </Label>
                          <p className="text-sm text-gray-500">Sell products and manage orders</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
