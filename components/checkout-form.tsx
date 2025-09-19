"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Truck, MapPin, User } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CheckoutData {
  // Shipping Address
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string

  // Billing
  sameAsShipping: boolean
  billingAddress: string
  billingCity: string
  billingState: string
  billingZipCode: string
  billingCountry: string

  // Payment
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string

  // Special Instructions
  specialInstructions: string
}

export function CheckoutForm() {
  const { clearCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState<CheckoutData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    sameAsShipping: true,
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZipCode: "",
    billingCountry: "United States",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    specialInstructions: "",
  })

  const handleInputChange = (field: keyof CheckoutData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()

    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })

    router.push("/checkout/success")
    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP Code *</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={formData.paymentMethod}
            onValueChange={(value) => handleInputChange("paymentMethod", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit/Debit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod">Cash on Delivery</Label>
            </div>
          </RadioGroup>

          {formData.paymentMethod === "card" && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label htmlFor="cardName">Name on Card *</Label>
                <Input
                  id="cardName"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange("cardName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {formData.paymentMethod === "paypal" && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                You will be redirected to PayPal to complete your payment.
              </p>
            </div>
          )}

          {formData.paymentMethod === "cod" && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Pay with cash when your order is delivered. Additional fees may apply.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Special Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Special Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="specialInstructions">Delivery Instructions (Optional)</Label>
          <Textarea
            id="specialInstructions"
            placeholder="Any special delivery instructions..."
            value={formData.specialInstructions}
            onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Place Order Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Place Order"}
      </Button>
    </form>
  )
}
