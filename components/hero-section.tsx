"use client"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    title: "Premium Electronics",
    subtitle: "Up to 50% Off",
    description: "Discover the latest in technology with unbeatable prices on headphones, smartwatches, and more.",
    image: "/modern-electronics-hero-banner.jpg",
    cta: "Shop Electronics",
    link: "/products?category=Electronics",
    badge: "Limited Time",
  },
  {
    id: 2,
    title: "Sustainable Fashion",
    subtitle: "Eco-Friendly Choices",
    description: "Shop our collection of organic cotton clothing and sustainable fashion pieces for a better tomorrow.",
    image: "/sustainable-fashion-hero-banner.jpg",
    cta: "Shop Clothing",
    link: "/products?category=Clothing",
    badge: "New Collection",
  },
  {
    id: 3,
    title: "Home & Office",
    subtitle: "Comfort Meets Style",
    description:
      "Transform your space with ergonomic furniture and stylish home accessories that inspire productivity.",
    image: "/modern-home-office-hero-banner.jpg",
    cta: "Shop Furniture",
    link: "/products?category=Furniture",
    badge: "Best Sellers",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[600px] overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="relative h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className="flex h-full items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 text-center lg:text-left">
                    <div className="space-y-4">
                      <div className="flex items-center justify-center lg:justify-start">
                        <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                          {slide.badge}
                        </Badge>
                      </div>
                      <p className="text-primary font-semibold text-xl tracking-wide">{slide.subtitle}</p>
                      <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                        {slide.title}
                      </h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 text-pretty">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Link href={slide.link}>
                        <Button size="lg" className="text-lg px-8 py-6 group">
                          {slide.cta}
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                        Learn More
                      </Button>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.title}
                        className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-background/90 backdrop-blur-sm border-border/50 hover:bg-background shadow-lg"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-background/90 backdrop-blur-sm border-border/50 hover:bg-background shadow-lg"
          onClick={nextSlide}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-primary scale-125" : "bg-background/60 hover:bg-background/80"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
