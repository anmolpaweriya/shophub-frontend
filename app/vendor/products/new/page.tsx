"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Upload,
  Package,
  DollarSign,
  Tag,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useCategoriesData } from "@/contexts/catagory-context";
import { useAuth } from "@/contexts/auth-context";
import { useUserData } from "@/contexts/user-context";

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock: "",
    image: null as File | null,
  });

  // const categories = [
  //   "Electronics",
  //   "Clothing",
  //   "Home & Garden",
  //   "Sports & Outdoors",
  //   "Books",
  //   "Toys & Games",
  //   "Health & Beauty",
  //   "Automotive",
  // ];
  const { categories, refetchProducts } = useCategoriesData();
  const { user } = useUserData();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!formData.name.trim()) {
      setError("Product name is required");
      setIsLoading(false);
      return;
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      setError("Please enter a valid price greater than $0");
      setIsLoading(false);
      return;
    }

    if (!formData.category_id) {
      setError("Please select a product category");
      setIsLoading(false);
      return;
    }

    if (!formData.stock || Number.parseInt(formData.stock) < 0) {
      setError("Please enter a valid stock quantity (0 or greater)");
      setIsLoading(false);
      return;
    }

    try {
      let imageUrl = "";

      if (formData.image) {
        // Upload the image first
        const uploadFormData = new FormData();
        uploadFormData.append("image", formData.image);

        const uploadResponse = await fetch(
          process.env.NEXT_PUBLIC_AUTH_SERVICE_API_URL + "/auth/upload-file",
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.message || "Failed to upload image");
        }

        const uploadResult = await uploadResponse.json();

        imageUrl = uploadResult?.data?.data?.publicUrl;
      }

      // Now create the product
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        stock: parseInt(formData.stock, 10),
        images: [imageUrl], // send the URL instead of the file
        user_id: user?.id,
      };

      const response = await fetch(
        process.env.NEXT_PUBLIC_PRODUCT_SERVICE_API_URL + "/shop/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create product");
      }

      const newProduct = await response.json();
      setSuccess("Product created successfully!");

      setTimeout(() => {
        refetchProducts();
        router.push("/vendor/products");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <Link href="/vendor/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground tracking-tight">
              Add New Product
            </h1>
            <p className="text-lg text-muted-foreground">
              Create a professional product listing for your store
            </p>
          </div>
        </div>

        <Card className="shadow-lg border-border">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl">Product Details</CardTitle>
            </div>
            <CardDescription className="text-base">
              Fill in the information below to create your product listing. All
              required fields are marked with an asterisk (*).
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <Alert variant="destructive" className="border-destructive/50">
                  <AlertDescription className="font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500/50 bg-green-50 text-green-800">
                  <AlertDescription className="font-medium">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-base font-semibold flex items-center"
                    >
                      <Tag className="h-4 w-4 mr-2 text-primary" />
                      Product Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter a descriptive product name"
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-base font-semibold"
                    >
                      Category *
                    </Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category_id: value })
                      }
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select a product category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="price"
                        className="text-base font-semibold flex items-center"
                      >
                        <DollarSign className="h-4 w-4 mr-2 text-primary" />
                        Price ($) *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        placeholder="0.00"
                        className="h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="stock"
                        className="text-base font-semibold flex items-center"
                      >
                        <BarChart3 className="h-4 w-4 mr-2 text-primary" />
                        Stock *
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: e.target.value })
                        }
                        placeholder="0"
                        className="h-11"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-base font-semibold"
                    >
                      Product Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Provide a detailed description of your product, including key features and benefits..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Product Image
                    </Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        {formData.image ? (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground">
                              {formData.image.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Click to change image
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-foreground">
                              Click to upload product image
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-8 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  asChild
                  className="h-11 px-8 bg-transparent"
                >
                  <Link href="/vendor/products">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 px-8"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Product...
                    </>
                  ) : (
                    "Create Product"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
